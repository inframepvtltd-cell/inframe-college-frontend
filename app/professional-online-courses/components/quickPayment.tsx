import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
declare global {
    interface Window {
        Razorpay: any;
    }
}

interface QuickPaymentProps {
    price: string;
    courseName: string;
}

interface UserDetails {
    name: string;
    email: string;
    contact: string;
}

function QuickPayment({ price, courseName }: QuickPaymentProps) {
    const router = useRouter();

    const [showForm, setShowForm] = useState(false);
    const [user, setUser] = useState<UserDetails>({
        name: "",
        email: "",
        contact: "",
    });

    const [loading, setLoading] = useState(false);
    const [razorpayLoaded, setRazorpayLoaded] = useState(false);

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

    // RAZORPAY PAYMENT
    const handleBuyNow = async () => {
        if (!validateForm()) return;

        if (!razorpayLoaded)
            return alert("Payment gateway loading... try again.");

        setLoading(true);

        try {
            const amountInPaisa = Math.round(parseFloat(price) * 100);

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: amountInPaisa,
                currency: "INR",
                name: "Inframe College",
                description: "Course Payment",
                image: "/pixelcut-export4.png",

                handler: function (response: any) {
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

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setShowForm(false)
        // toast.loading("Verifying your details...", { id: "verify" });
        const toastId = toast.loading("Verifying your details...");

        await sendLeadEmail();

        const url = "https://script.google.com/macros/s/AKfycbyuRyKXdCQX-IEMbRLuJxEFbzx5Xeq0_OZcY_aWeJE_q4_AU8AaGP2BFsFhoJr7IHDx/exec"
        try {
            await fetch("/api/add-to-sheet", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: user.name,
                    email: user.email,
                    contact: user.contact,
                    courseName,
                    price,
                }),
            });

            // toast.success("Details verified. Redirecting to payment 🚀", {
            //     id: "verify",
            // });
            toast.success("Details verified. Redirecting to payment", {
                id: toastId,
            });
            setTimeout(handleBuyNow, 800);
            console.log("Data added to Google Sheet successfully");
        } catch (err) {
            // console.error("Failed to insert data into Google Sheet", err);
            toast.error("Verification failed. Please try again.", {
                id: toastId,
            });
        }

        // handleBuyNow();
    };


    return (
        <>
            {/* Buy Now Button */}
            <div className="text-center">
                <button
                    onClick={() => setShowForm(true)}
                    disabled={loading}
                    className="relative overflow-hidden bg-gradient-to-r 
          from-black via-gray-900 to-black text-white
          px-6 py-3 sm:px-8 sm:py-4 
          text-xl sm:text-3xl font-semibold border border-yellow-400 shadow-xl mb-4
          hover:scale-[1.03] active:scale-95 transition-all duration-300
          shine-btn"
                >

                    {loading ? "Opening Payment Gateway..." : `Proceed to Pay`}
                    {/* {loading ? "Processing..." : "Buy Now"} */}
                </button>
            </div>

            {/* Modal */}
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

                                className="w-full bg-yellow-500 text-black py-3 rounded-lg font-semibold"
                            >
                                {loading ? "Processing..." : `Proceed to Pay ₹${price}`}
                            </button>

                            <button
                                type="button"
                                onClick={() => setShowForm(false)}
                                className="w-full bg-gray-300 py-2 rounded-lg"
                            >
                                Cancel
                            </button>
                        </form>

                        {!razorpayLoaded && (
                            <p className="mt-4 text-center text-sm text-yellow-700">
                                Loading payment gateway...
                            </p>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

export default QuickPayment;

