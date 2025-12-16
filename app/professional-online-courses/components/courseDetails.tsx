import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from "sonner";
import QuickPayment from './quickPayment';
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
const themes: any = {
    interior: 'yellow-400',
    graphic: '[#731e88]'
}
function CourseInfo({ courseType, percentageOff, projects, title, priceWithDiscount, originalPrice, theme }: { courseType: string, percentageOff: string, projects: string, title: string, priceWithDiscount: string, originalPrice: string, theme: string }) {
    const router = useRouter();
    const [showForm, setShowForm] = useState(false);
    const [user, setUser] = useState<UserDetails>({
        name: "",
        email: "",
        contact: "",
    });

    const [loading, setLoading] = useState(false);
    const [razorpayLoaded, setRazorpayLoaded] = useState(false);
    const features = [
        "Become an Interior Designer",
        "Master 4+ Industry Tools",
        `Work on ${projects}+ Hands-on Real Projects`,
        "Live Doubt Support on App",
        "Weekly Faculty Interaction via App",
        "Portfolio & Resume Building Support",
        "Learn from Industry Experts",
        "Job Assistance & Career Guidance",
        "Access to Downloadable Study Material",
        "Lifetime Access to Recorded Sessions"
    ];

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
                    price: priceWithDiscount,
                    courseName: title,
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
            const amountInPaisa = Math.round(parseFloat(priceWithDiscount) * 100);

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
                            duration: 5000,
                            position: 'top-center', // or 'bottom-center'
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

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setShowForm(false);

        // 🔄 Elegant loading toast
        const toastId = toast.loading(
            <div className="flex items-center gap-4">
                <div className="relative h-12 w-12">
                    <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
                    <div className="absolute inset-0 rounded-full border-4 border-yellow-400 border-t-transparent animate-spin"></div>
                </div>

                <div className="space-y-1">
                    <p className="font-semibold text-gray-900 text-lg">
                        Verifying your details
                    </p>
                    <p className="text-gray-600 text-sm">
                        Preparing payment for <span className="font-medium">{title}</span>
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
                        courseName: title,
                        price: priceWithDiscount,
                    }),
                }),
            ]);

            // ✅ Success toast
            toast.success(
                <div className="text-center space-y-1">
                    <p className="font-bold text-lg text-green-800">
                        🎉 Verification Complete
                    </p>
                    <p className="text-gray-700 text-sm">
                        Redirecting you to secure payment
                    </p>
                    <p className="text-green-700 font-semibold text-lg mt-1">
                        ₹{priceWithDiscount}
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

            setTimeout(handleBuyNow, 2200);

        } catch (err) {
            // ❌ Error toast
            toast.error(
                <div className="text-center space-y-1">
                    <p className="font-bold text-lg text-red-800">
                        ⚠️ Verification Failed
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


    return (
        <>
            <div className="w-full flex justify-center  bg-gradient-to-b from-purple-100 to-white-100">
                <div className="  border border-gray-200   bg-gradient-to-b from-purple-100 to-white-100

                    p-3 sm:p-3 max-w-7xl w-full">

                    {/* Header */}
                    <div className="text-center mb-6">

                        {/* Title Section */}
                        <div className="mb-4">
                            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 leading-tight">
                                {title}
                            </h2>
                            <p className={`text-xl sm:text-2xl text-${themes[courseType]} font-bold mt-2 flex items-center justify-center gap-2`}>
                                <span className="text-2xl">🎓</span>
                                Learn from Industry Masters
                                <span className="text-2xl">⚡</span>
                            </p>
                        </div>

                        {/* Compact Price Card */}
                        <div
                            className=
                            {`bg-gradient-to-br from-${themes[courseType]} to-${themes[courseType]} 
                                rounded-xl
                                p-4 md:p-6 lg:p-8
                                shadow-xl
                                border-2 border-gray-400
                                max-w-xl md:max-w-2xl mx-auto`}
                        >

                            <div className="flex items-center justify-between ">

                                {/* WAS */}
                                <div className="text-left text-white">
                                    <div className="text-xs md:text-sm opacity-90">WAS</div>
                                    <div className="text-lg md:text-2xl lg:text-3xl line-through opacity-80">
                                        ₹{originalPrice}
                                    </div>
                                </div>

                                {/* NOW ONLY */}
                                <div className="text-center ">
                                    <div className="text-xs md:text-sm opacity-90 text-white">NOW ONLY</div>
                                    <div className="text-3xl md:text-4xl lg:text-5xl font-black text-white">
                                        ₹{priceWithDiscount}
                                    </div>
                                    <div className="text-xs md:text-sm opacity-90 mt-1 text-white">Lifetime Access</div>

                                    <QuickPayment price={priceWithDiscount} courseName={title} />
                                </div>

                                {/* YOU SAVE */}
                                <div className="text-right text-white">
                                    <div className="text-xs md:text-sm opacity-90">YOU SAVE</div>
                                    <div className="text-lg md:text-2xl lg:text-3xl font-bold text-white-100">
                                        {percentageOff}
                                    </div>
                                </div>

                            </div>
                        </div>


                        {/* Urgency Indicator */}
                        <div className="mt-3 text-sm text-red-600 font-semibold animate-pulse">
                            ⏳ Offer ends soon! Limited seats available
                        </div>

                    </div>


                    {/* Features List - 2 Columns */}
                    <div>
                        <h3 className="text-2xl sm:text-3xl font-bold text-black text-center mb-8">
                            ✨ Course Features
                        </h3>

                        <div className="w-full flex justify-center">
                            <div className="grid grid-cols-1 sm:grid-cols-2  gap-2 sm:gap-3 max-w-full w-full">
                                {features.map((feature, index) => (
                                    <div
                                        key={index}
                                        className={`flex items-center bg-gradient-to-r from-${themes[courseType]} to-${themes[courseType]}
                p-2  border border-${themes[courseType]} 
                shadow-md hover:shadow-xl transition-all duration-200`}
                                    >
                                        <span className={`text-${themes[courseType]} mr-3 text-2xl`}>✅</span>
                                        <span className="font-semibold text-white text-base sm:text-lg">
                                            {feature}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                </div>
            </div>

            {/* Modal */}

        </>
    );




}

export default CourseInfo
