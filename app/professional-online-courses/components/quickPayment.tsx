import React from 'react'
import { useRouter } from "next/navigation";

function QuickPayment() {
    const router = useRouter();

    const handleBuyNow = async () => {
        const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // 🔸 replace with your Razorpay test key
            amount: 100, // 149900  > amount in paise (166 × 100 = ₹166)
            currency: "INR",
            name: "Inframe College",
            description: "Interior Design Course Enrollment",
            image: "/pixelcut-export4.png",
            handler: function (response: { razorpay_payment_id: string; }) {
                alert("Payment successful! Payment ID: " + response.razorpay_payment_id);
                router.push("ThankYouPage");

            },
            method: {
                upi: true,
                card: true,
                netbanking: true,
                wallet: true,
            },

            prefill: {
                name: "",
                email: "",
                contact: "",
            },
            notes: {
                course: "Interior Design",
            },
            theme: {
                color: "#FACC15", // yellow theme
            },
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
    };
    return (
        <div className="text-center">
            <button
                onClick={handleBuyNow}
                className="bg-gradient-to-r from-black to-gray-800 text-white px-8 py-4 sm:px-12 sm:py-5 lg:px-16 lg:py-5 rounded-full text-xl sm:text-2xl font-bold hover:from-gray-800 hover:to-black transition-all duration-300 transform hover:scale-105 shadow-2xl border-2 border-yellow-500 hover:shadow-3xl mb-4"
            >
                Buy Now
            </button>
            <p className="text-base sm:text-lg text-gray-600 flex items-center justify-center gap-2">
                <span className="text-yellow-500">⚡</span>
                Limited time offer - Don't miss out!
            </p>
        </div>)
}

export default QuickPayment