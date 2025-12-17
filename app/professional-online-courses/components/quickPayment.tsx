import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import OrderConfirmationModal from "./orderConfirmation";
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

interface UserDetails {
    name: string;
    email: string;
    contact: string;
}

function QuickPayment({ className, price, courseName }: QuickPaymentProps) {
    const router = useRouter();

    // Add new state for order confirmation
    const [showOrderConfirmation, setShowOrderConfirmation] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [user, setUser] = useState<UserDetails>({
        name: "",
        email: "",
        contact: "",
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

    // ✅ FIXED — Correct email API call
    const sendLeadEmail = async () => {
        try {
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
                }),
            });

            const data = await res.json();
            console.log("Email Status:", data);
        } catch (err) {
            console.log("Email Error", err);
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

    // Handle form submission to show order confirmation
    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        // Show order confirmation page instead of immediately proceeding
        setShowForm(false);
        setShowOrderConfirmation(true);
    };

    // Proceed to payment after order confirmation
    const handleProceedToPayment = async () => {
        if (!razorpayLoaded) {
            return alert("Payment gateway loading... try again.");
        }

        setShowOrderConfirmation(false);
        setLoading(true);

        try {
            const subtotal = parseFloat(price);
            const tax = subtotal * 0.18;
            const total = subtotal + tax;

            // const amountInPaisa = Math.round(total * 100);
            const amountInPaisa = Math.round(parseFloat(price) * 100);


            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: amountInPaisa,
                currency: "INR",
                name: "Inframe College",
                description: `Course Payment: ${courseName}`,
                image: "/pixelcut-export4.png",

                handler: function (response: any) {//new meta...

                    if (typeof window !== "undefined" && (window as any).fbq) {
                        (window as any).fbq("track", "Purchase", {
                            currency: "INR",
                            value: Number(price),
                            content_name: courseName,
                        });
                    }

                    toast.success("Payment successful", {
                        description: "Thank you! Your course access will be activated shortly.",
                    });

                    setLoading(false);
                    router.push("/order-confirmation");
                },


                modal: {
                    ondismiss: function () {
                        toast.warning("Payment was cancelled", {
                            description: "No amount was charged. You can try again anytime.",
                            duration: 5000,
                            position: 'top-center',
                            classNames: {
                                toast: 'w-full max-w-md text-lg',
                                title: 'text-xl font-semibold',
                                description: 'text-base',
                            },
                            style: {
                                minWidth: '450px',
                                padding: '24px',
                                margin: '0 auto',
                            },
                        });
                        console.log("Razorpay closed by user");
                        setLoading(false);
                    },
                },
                prefill: {
                    name: user.name,
                    email: user.email,
                    contact: user.contact,
                },
                theme: { color: "#FACC15" },
            };

            const rzp = new window.Razorpay(options);

            rzp.on("payment.failed", function (response: any) {
                alert("Payment Failed");
                setLoading(false);
            });

            rzp.open();
        } catch (error: any) {
            console.error("Payment init error:", error);
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
                    }),
                }),
            ]);

            // ✅ Success toast
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
                    // onClick={() => setShowForm(true)}
                    onClick={() => {
                        if ((window as any).fbq) {
                            (window as any).fbq("track", "AddToCart", {
                                currency: "INR",
                                value: Number(price),
                                content_name: courseName,
                            });
                        }
                        setShowForm(true);
                    }}

                    // onClick={() => {
                    //     if (typeof window !== "undefined" && (window as any).fbq) {
                    //         (window as any).fbq("track", "AddToCart", {
                    //             currency: "INR",
                    //             value: Number(price),
                    //             content_name: courseName,
                    //         });
                    //     }

                    //     setShowForm(true); // your existing logic
                    // }}
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
                    user={user}
                    onConfirm={handlePlaceOrder}
                    onClose={() => setShowOrderConfirmation(false)}
                />
            )}
        </>
    );
}

export default QuickPayment;
