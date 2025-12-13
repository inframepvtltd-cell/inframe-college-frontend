import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

function CourseInfo({ title, priceWithDiscount, originalPrice }: { title: string, priceWithDiscount: string, originalPrice: string, }) {
    const router = useRouter();
    const features = [
        "Become an Interior Designer",
        "Master 4+ Industry Tools",
        "Work on 4+ Hands-on Real Projects",
        "Live Doubt Support on App",
        "Weekly Faculty Interaction via App",
        "Portfolio & Resume Building Support",
        "Learn from Industry Experts",
        "Job Assistance & Career Guidance",
        "Access to Downloadable Study Material",
        "Lifetime Access to Recorded Sessions"
    ];
    console.log(originalPrice);
    console.log(priceWithDiscount);



    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
    }, []);

    const handleBuyNow = async () => {
        const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Razorpay test key
            amount: priceWithDiscount + "00",//149900,
            currency: "INR",
            name: "Inframe College",
            description: "Interior Design Course Enrollment",
            image: "/pixelcut-export4.png",
            handler: function (response: { razorpay_payment_id: string; }) {
                // alert("Payment successful! Payment ID: " + response.razorpay_payment_id);
                router.push("/order-confirmation");
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
        <div className="w-full flex justify-center">
            <div className="bg-white shadow-2xl border border-gray-200 rounded-2xl 
                    p-3 sm:p-3 max-w-7xl w-full">

                {/* Header */}
                <div className="text-center mb-6">

                    {/* Title Section */}
                    <div className="mb-4">
                        <h2 className="text-4xl sm:text-5xl font-black text-gray-900 leading-tight">
                            {title}
                        </h2>
                        <p className="text-xl sm:text-2xl text-yellow-600 font-bold mt-2 flex items-center justify-center gap-2">
                            <span className="text-2xl">🎓</span>
                            Learn from Industry Masters
                            <span className="text-2xl">⚡</span>
                        </p>
                    </div>

                    {/* Compact Price Card */}
                    <div className="
    bg-gradient-to-br from-yellow-400 to-orange-500 
    rounded-xl 
    p-4 md:p-6 lg:p-8
    shadow-xl 
    border-2 border-yellow-300 
    max-w-xl md:max-w-2xl mx-auto
">
                        <div className="flex items-center justify-between text-white">

                            {/* WAS */}
                            <div className="text-left">
                                <div className="text-xs md:text-sm opacity-90">WAS</div>
                                <div className="text-lg md:text-2xl lg:text-3xl line-through opacity-80">
                                    ₹{originalPrice}
                                </div>
                            </div>

                            {/* NOW ONLY */}
                            <div className="text-center">
                                <div className="text-xs md:text-sm opacity-90">NOW ONLY</div>
                                <div className="text-3xl md:text-4xl lg:text-5xl font-black">
                                    ₹{priceWithDiscount}
                                </div>
                                <div className="text-xs md:text-sm opacity-90 mt-1">Lifetime Access</div>
                                <button
                                    onClick={handleBuyNow}
                                    className="relative overflow-hidden bg-gradient-to-r 
          from-black via-gray-900 to-black text-white
          px-2 py-3 sm:px-8 sm:py-4  rounded-lg
          text-lg sm:text-2xl font-semibold border border-yellow-400 shadow-xl mb-4
          hover:scale-[1.03] active:scale-95 transition-all duration-300
          shine-btn"
                                >
                                    Proceed To
                                </button>
                            </div>

                            {/* YOU SAVE */}
                            <div className="text-right">
                                <div className="text-xs md:text-sm opacity-90">YOU SAVE</div>
                                <div className="text-lg md:text-2xl lg:text-3xl font-bold text-green-100">
                                    70%
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
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 max-w-3xl w-full">
                            {features.map((feature, index) => (
                                <div
                                    key={index}
                                    className="flex items-center bg-gradient-to-r from-yellow-50 to-white
                p-2 rounded-xl border border-yellow-200
                shadow-md hover:shadow-xl transition-all duration-200"
                                >
                                    <span className="text-yellow-500 mr-3 text-2xl">✅</span>
                                    <span className="font-semibold text-gray-900 text-base sm:text-lg">
                                        {feature}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );




}

export default CourseInfo
