import React, { useState, useEffect } from "react";
import { usePathname } from 'next/navigation';
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import OrderConfirmationModal from "./orderConfirmation";
import { validateUtmFromUrl } from "@utils/validateUTMFromUrl";

declare global {
    interface Window {
        Razorpay: any;
    }
}

interface QuickPaymentProps {
    price: string;
    courseName: string;
    className?: string;
}

function QuickPayment({ className, price, courseName }: QuickPaymentProps) {
    const STATE_CITY_MAP: Record<string, string[]> = {
        "Andhra Pradesh": [
            "Visakhapatnam", "Vijayawada", "Guntur", "Nellore",
            "Kurnool", "Rajahmundry", "Tirupati", "Kadapa"
        ],

        "Arunachal Pradesh": [
            "Itanagar", "Naharlagun", "Pasighat", "Tawang"
        ],

        "Assam": [
            "Guwahati", "Dibrugarh", "Silchar", "Jorhat",
            "Tezpur", "Nagaon"
        ],

        "Bihar": [
            "Patna", "Gaya", "Bhagalpur", "Muzaffarpur",
            "Darbhanga", "Purnia"
        ],

        "Chhattisgarh": [
            "Raipur", "Bhilai", "Durg", "Bilaspur",
            "Korba", "Raigarh"
        ],

        "Goa": [
            "Panaji", "Margao", "Vasco da Gama", "Mapusa"
        ],

        "Gujarat": [
            "Ahmedabad", "Surat", "Vadodara", "Rajkot",
            "Bhavnagar", "Jamnagar"
        ],

        "Haryana": [
            "Gurgaon", "Faridabad", "Panipat", "Ambala",
            "Hisar", "Karnal"
        ],

        "Himachal Pradesh": [
            "Shimla", "Solan", "Dharamshala", "Mandi",
            "Kullu", "Una"
        ],

        "Jharkhand": [
            "Ranchi", "Jamshedpur", "Dhanbad", "Bokaro",
            "Hazaribagh"
        ],

        "Karnataka": [
            "Bengaluru", "Mysuru", "Mangaluru", "Hubballi",
            "Belagavi", "Shivamogga", "Davangere"
        ],

        "Kerala": [
            "Thiruvananthapuram", "Kochi", "Kozhikode",
            "Thrissur", "Kannur", "Alappuzha"
        ],

        "Madhya Pradesh": [
            "Bhopal", "Indore", "Jabalpur", "Gwalior",
            "Ujjain", "Sagar"
        ],

        "Maharashtra": [
            "Mumbai", "Pune", "Nagpur", "Nashik",
            "Thane", "Aurangabad", "Kolhapur", "Solapur"
        ],

        "Manipur": [
            "Imphal", "Thoubal", "Churachandpur"
        ],

        "Meghalaya": [
            "Shillong", "Tura", "Jowai"
        ],

        "Mizoram": [
            "Aizawl", "Lunglei", "Champhai"
        ],

        "Nagaland": [
            "Kohima", "Dimapur", "Mokokchung"
        ],

        "Odisha": [
            "Bhubaneswar", "Cuttack", "Rourkela",
            "Sambalpur", "Balasore"
        ],

        "Punjab": [
            "Chandigarh", "Ludhiana", "Amritsar",
            "Jalandhar", "Patiala", "Bathinda"
        ],

        "Rajasthan": [
            "Jaipur", "Jodhpur", "Udaipur", "Ajmer",
            "Bikaner", "Kota", "Alwar"
        ],

        "Sikkim": [
            "Gangtok", "Namchi", "Gyalshing"
        ],

        "Tamil Nadu": [
            "Chennai", "Coimbatore", "Madurai",
            "Tiruchirappalli", "Salem", "Erode",
            "Tirunelveli"
        ],

        "Telangana": [
            "Hyderabad", "Warangal", "Karimnagar",
            "Nizamabad", "Khammam", "Mahbubnagar"
        ],

        "Tripura": [
            "Agartala", "Udaipur", "Dharmanagar"
        ],

        "Uttar Pradesh": [
            "Lucknow", "Kanpur", "Noida", "Ghaziabad",
            "Agra", "Meerut", "Varanasi", "Prayagraj",
            "Bareilly", "Aligarh"
        ],

        "Uttarakhand": [
            "Dehradun", "Haridwar", "Roorkee",
            "Haldwani", "Rudrapur"
        ],

        "West Bengal": [
            "Kolkata", "Howrah", "Durgapur",
            "Asansol", "Siliguri", "Malda"
        ],

        /* ----------- UNION TERRITORIES ----------- */

        "Andaman and Nicobar Islands": [
            "Port Blair"
        ],

        "Chandigarh": [
            "Chandigarh"
        ],

        "Dadra and Nagar Haveli and Daman and Diu": [
            "Daman", "Silvassa"
        ],

        "Delhi": [
            "New Delhi", "Delhi", "Dwarka", "Rohini",
            "Saket", "Karol Bagh"
        ],

        "Jammu and Kashmir": [
            "Srinagar", "Jammu", "Anantnag", "Baramulla"
        ],

        "Ladakh": [
            "Leh", "Kargil"
        ],

        "Lakshadweep": [
            "Kavaratti"
        ],

        "Puducherry": [
            "Puducherry", "Karaikal", "Mahe", "Yanam"
        ]
    };

    const pathname = usePathname();
    const router = useRouter();
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [showOrderConfirmation, setShowOrderConfirmation] = useState(false);
    const [showForm, setShowForm] = useState(false);

    const [user, setUser] = useState({
        name: "",
        email: "",
        contact: "",
        state: "",
        city: ""
    });

    const [loading, setLoading] = useState(false);
    const [razorpayLoaded, setRazorpayLoaded] = useState(false);
    const [orderDetails, setOrderDetails] = useState({
        subtotal: "0",
        tax: "0",
        total: "0"
    });

    // Calculate order details
    useEffect(() => {
        const amount = parseFloat(price);

        setOrderDetails({
            subtotal: amount.toFixed(2),
            tax: "0.00",
            total: amount.toFixed(2),
        });
    }, [price]);


    // Load Razorpay script
    useEffect(() => {
        if (typeof window !== "undefined" && window.Razorpay) {
            setRazorpayLoaded(true);
            return;
        }

        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        script.onload = () => setRazorpayLoaded(true);
        script.onerror = () => {
            console.error("Failed to load Razorpay script");
            alert("Payment gateway failed to load. Please refresh.");
        };
        document.body.appendChild(script);
    }, []);


    const sendLeadEmail = async () => {
        try {

            const startTime = Date.now();
            const res = await fetch("/api/send-payment-intent-email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: user.name,
                    email: user.email,
                    contact: user.contact,
                    price,
                    courseName,
                    state: user.state,
                    city: user.city,
                }),
            });

            const responseTime = Date.now() - startTime;

            if (!res.ok) {
                let errorData;
                try {
                    errorData = await res.json();
                } catch {
                    errorData = { message: await res.text() };
                }

                throw new Error(`Email failed: ${res.status} ${JSON.stringify(errorData)}`);
            }

            const data = await res.json();
            console.log("Email API response:", data);
            return data;
        } catch (err) {
            console.error("Email sending error:", err);
            return { success: false, error: err };
        }
    };

    const sendWhatsApp = async (
        phoneNumber: string,
        studentName: string,
        price: string,
        courseName: string
    ) => {
        try {
            const res = await fetch("/api/send-whatsapp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ phoneNumber, courseName }),
            });

            const data = await res.json();
            if (!res.ok || data.status !== "1") {
                throw new Error(JSON.stringify(data));
            }

            console.log("WhatsApp sent successfully:", data);
            return data;
        } catch (err) {
            console.error("WhatsApp error:", err);
            return { success: false, error: err };
        }
    };

    const sendToPrivyr = async () => {
        const PRIVYR_URL =
            "https://www.privyr.com/api/v1/incoming-leads/0vZfjMQw/iQR8c5Xr#generic-webhook";

        try {
            const leadData = {
                name: user.name,
                email: user.email,
                phone_number: user.contact,
                course_name: courseName,
                price,
                currency: "INR",
                source: "Enroll Now Page",
                device: navigator.userAgent,
                city: user.city,
                state: user.state,
            };

            // Final payload
            const payload = {
                // REQUIRED
                name: user.name,
                display_name: user.name,

                // CONTACT
                phone: user.contact,
                mobile_number: user.contact,
                whatsapp_number: user.contact,
                email_address: user.email,

                // BUSINESS FIELDS
                lead_stage: "New Enrollment",
                price: price,
                course_name: courseName,
                city: user.city,
                state: user.state,
                webhook_source: "Website Frontend - Professional Course",
            };

            const res = await fetch(PRIVYR_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const errorText = await res.text();
            } else {
                const successText = await res.text();
            }

        } catch (err) {
            console.error(err);
        }
    };

    // VALIDATION
    const validateForm = () => {
        if (!user.name.trim()) return alert("Enter your name"), false;
        if (!user.email.trim()) return alert("Enter your email"), false;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(user.email)) return alert("Invalid email"), false;

        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(user.contact)) return alert("Invalid phone"), false;

        return true;
    };

    const saveLeadDataSilently = async () => {
        const { state, city } = user;
        try {
            await Promise.all([
                sendLeadEmail(),
                fetch("/api/add-to-sheet", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        name: user.name,
                        email: user.email,
                        contact: user.contact,
                        courseName,
                        price,
                        state,
                        city,
                    }),
                }),
                sendToPrivyr(),
                sendWhatsApp(user.contact, user.name, price, courseName),

            ]);

            console.log("Lead data saved silently");
        } catch (err) {
            console.error("Lead save failed", err);
            // ❌ DO NOT block user
        }
    };
    // Handle form submission to show order confirmation
    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;
        setShowForm(false);
        setShowOrderConfirmation(true);
        await saveLeadDataSilently();
    };

    // Proceed to payment after order confirmation
    const handleProceedToPayment = async () => {
        if (!razorpayLoaded) {
            alert("Payment gateway loading...");
            return;
        }

        setLoading(true);

        try {
            const amountInPaisa = Math.round(Number(price) * 100);

            const orderRes = await fetch("/api/order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount: amountInPaisa }),
            });

            const { orderId } = await orderRes.json();

            if (!orderId) {
                throw new Error("Order creation failed");
            }

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                order_id: orderId, // 🔥 THIS STOPS REFUND
                amount: amountInPaisa,
                currency: "INR",
                name: "Inframe College",
                description: `Course Payment: ${courseName}`,
                image: "/pixelcut-export4.png",


                handler: function () {
                    sessionStorage.setItem("purchase_amount", String(price));
                    sessionStorage.setItem("purchase_event_id", crypto.randomUUID());
                    router.push("/order-confirmation");
                },


                prefill: {
                    name: user.name,
                    email: user.email,
                    contact: user.contact,
                },

                theme: { color: "#FACC15" },
                modal: {
                    ondismiss: () => {
                        setLoading(false);

                        toast.dismiss(); // close processing toast
                        toast.info("Payment cancelled", {
                            position: "top-center",
                        });
                    },
                },
            };

            const rzp = new (window as any).Razorpay(options);

            rzp.on("payment.failed", () => {
                toast.error("Payment failed");
                setLoading(false);
            });

            // if ((window as any).fbq) {
            //     (window as any).fbq("track", "InitiateCheckout", {
            //         currency: "INR",
            //         value: Number(price),
            //         content_name: courseName,
            //     });
            // }
            if ((window as any).fbq && validateUtmFromUrl(pathname)) {
                (window as any).fbq('track', 'InitiateCheckout', {
                    currency: 'INR',
                    value: Number(price),
                    content_name: courseName,
                });
            }

            rzp.open();
        } catch (err) {
            console.error(err);
            alert("Payment failed to start");
            setLoading(false);
        }
    };


    // Submit data to backend APIs
    const submitUserData = async () => {
        const toastId = toast.loading(
            <div className={className ? "flex items-center gap-4" : "text-center flex flex-col items-center gap-4"}>
                <div className="relative h-12 w-12">
                    <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
                    <div className="absolute inset-0 rounded-full border-4 border-yellow-400 border-t-transparent animate-spin"></div>
                </div>

                <div className="space-y-1">
                    <p className="font-semibold text-gray-900 text-lg">
                        Processing your order
                    </p>
                    <p className="text-gray-600 text-sm">
                        Please wait while we prepare your payment
                    </p>
                </div>
            </div>,
            {
                position: "top-center",
                duration: Infinity,
                style: {
                    minWidth: "360px",
                    padding: "22px 26px",
                    borderRadius: "18px",
                    background: "#ffffff",
                    boxShadow: "0 25px 70px rgba(0,0,0,0.18)",
                },
            }
        );

        try {
            //  Success toast
            toast.success(
                <div className="text-center space-y-1">
                    <p className="font-bold text-lg text-green-800">
                        🎉 Order Processed
                    </p>
                    <p className="text-gray-700 text-sm">
                        Redirecting to secure payment
                    </p>
                </div>,
                {
                    id: toastId,
                    duration: 2200,
                    position: "top-center",
                    style: {
                        minWidth: "360px",
                        padding: "22px 26px",
                        borderRadius: "18px",
                        background: "#ecfdf5",
                        border: "2px solid #6ee7b7",
                    },
                }
            );

            setTimeout(handleProceedToPayment, 2200);

        } catch (err) {
            // ❌ Error toast
            toast.error(
                <div className="text-center space-y-1">
                    <p className="font-bold text-lg text-red-800">
                        ⚠️ Order Processing Failed
                    </p>
                    <p className="text-gray-700 text-sm">
                        Please try again or contact support
                    </p>
                </div>,
                {
                    id: toastId,
                    duration: 4000,
                    position: "top-center",
                    style: {
                        minWidth: "360px",
                        padding: "22px 26px",
                        borderRadius: "18px",
                        background: "#fef2f2",
                        border: "2px solid #fca5a5",
                    },
                }
            );
        }
    };

    // Handle Place Order button click
    const handlePlaceOrder = () => {
        setShowOrderConfirmation(false);
        submitUserData();
    };

    return (
        <>
            {/* Buy Now Button */}
            <div className="text-center">
                <button
                    onClick={() => {
                        if ((window as any).fbq && validateUtmFromUrl(pathname)) {
                            (window as any).fbq('track', 'AddToCart', {
                                currency: 'INR',
                                value: Number(price),
                                content_name: courseName,
                            });
                        }

                        setShowForm(true);
                    }}

                    disabled={loading}
                    className="relative overflow-hidden bg-gradient-to-r 
                            from-black via-gray-900 to-black text-white
                            px-6 py-3 sm:px-8 sm:py-4 
                            text-xl sm:text-3xl font-semibold border border-yellow-400 shadow-xl mb-0
                            hover:scale-[1.03] active:scale-95 transition-all duration-300
                            shine-btn"
                >
                    {loading ? "Processing..." : `Enroll Now`}
                </button>
            </div>

            {/* User Details Form Modal */}
            {showForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={() => !loading && setShowForm(false)}
                    />

                    <div className="relative bg-white p-6 rounded-xl shadow-xl w-full max-w-md animate-fadeIn">
                        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
                            Enter Your Details
                        </h2>

                        <form onSubmit={handleFormSubmit} className="space-y-4">
                            <input
                                type="text"
                                placeholder="Full Name *"
                                required
                                className="w-full border p-3 rounded-lg"
                                value={user.name}
                                onChange={(e) => setUser({ ...user, name: e.target.value })}
                                disabled={loading}
                            />

                            <input
                                type="email"
                                placeholder="Email *"
                                required
                                className="w-full border p-3 rounded-lg"
                                value={user.email}
                                onChange={(e) => setUser({ ...user, email: e.target.value })}
                                disabled={loading}
                            />

                            <input
                                type="tel"
                                placeholder="Phone Number (10 digits) *"
                                required
                                className="w-full border p-3 rounded-lg"
                                value={user.contact}
                                onChange={(e) =>
                                    setUser({
                                        ...user,
                                        contact: e.target.value.replace(/\D/g, "").slice(0, 10),
                                    })
                                }
                                disabled={loading}
                            />

                            <select
                                required
                                className="w-full border p-3 rounded-lg"
                                value={user.state}
                                onChange={(e) =>
                                    setUser({
                                        ...user,
                                        state: e.target.value,
                                        city: ""
                                    })
                                }
                                disabled={loading}
                            >
                                <option value="">Select State *</option>
                                {Object.keys(STATE_CITY_MAP).map((state) => (
                                    <option key={state} value={state}>
                                        {state}
                                    </option>
                                ))}
                            </select>

                            <select
                                required
                                className="w-full border p-3 rounded-lg"
                                value={user.city}
                                onChange={(e) =>
                                    setUser({ ...user, city: e.target.value })
                                }
                                disabled={loading || !user.state}
                            >
                                <option value="">
                                    {user.state ? "Select City *" : "Select State First"}
                                </option>

                                {user.state &&
                                    STATE_CITY_MAP[user.state]?.map((city: string) => (
                                        <option key={city} value={city}>
                                            {city}
                                        </option>
                                    ))}
                            </select>


                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-yellow-500 text-black py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-colors"
                            >
                                Review Order
                            </button>

                            <button
                                type="button"
                                onClick={() => setShowForm(false)}
                                className="w-full bg-gray-300 hover:bg-gray-400 py-2 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Order Confirmation Modal */}
            {showOrderConfirmation && (

                <OrderConfirmationModal
                    open={showOrderConfirmation}
                    loading={loading}
                    courseName={courseName}
                    price={price}
                    orderDetails={orderDetails}
                    paymentSuccess={paymentSuccess}
                    user={user}
                    onConfirm={handlePlaceOrder}
                    onClose={() => setShowOrderConfirmation(false)}
                />
            )}
        </>
    );
}

export default QuickPayment;
