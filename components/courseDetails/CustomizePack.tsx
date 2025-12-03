"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";
import { log } from "console";

interface Software {
    id: string
    name: string
    price: number
    category: string
}

interface CoursePackProps {
    courseTitle: string
    // availableSoftware: Software[]
}

interface CoursePackage {
    id: string
    title: string
    tag: string
    description: string
    refundPeriod: string
    originalPrice: number
    discountedPrice: number
    discountPercentage: number
    buttonText: string
    type: 'custom' | 'all-access'
}

interface Price {
    price: string
}

const AvailableSoftware = {
    graphic_design: [
        { id: "1", name: "Adobe Photoshop", price: 1999, category: "design" },
        { id: "2", name: "Adobe Illustrator", price: 1999, category: "design" },
        { id: "3", name: "Corel", price: 1599, category: "design" },
        { id: "4", name: "Adobe Indesign", price: 1499, category: "ui-ux" },
        { id: "5", name: "Maya", price: 999, category: "design" },
        { id: "6", name: "Blender", price: 999, category: "design" },
        { id: "7", name: "Adobe Animate", price: 999, category: "design" },
        { id: "8", name: "Adobe Audition", price: 999, category: "design" },
        { id: "9", name: "Adobe Premiere Pro", price: 999, category: "design" },
        { id: "10", name: "Adobe After Effects", price: 1799, category: "publishing" },
        { id: "11", name: "Nuke", price: 1799, category: "publishing" },
        { id: "12", name: "ZBrush Arnold", price: 1799, category: "publishing" },
        { id: "13", name: "Adobe XD", price: 1799, category: "design" }
    ],

    interior_design: [
        { id: "1", name: "Rhino", price: 1999, category: "design" },
        { id: "2", name: "Adobe Illustrator", price: 1999, category: "design" },
        { id: "3", name: "Adobe Photoshop", price: 1599, category: "design" },
        { id: "4", name: "Autocad", price: 1499, category: "ui-ux" },
        { id: "5", name: "3dsmax", price: 999, category: "design" },
        { id: "6", name: "Blender", price: 999, category: "design" },
        { id: "7", name: "Sketchup", price: 999, category: "design" },
        { id: "8", name: "Lumion", price: 999, category: "design" },
        { id: "9", name: "Vray", price: 999, category: "design" },
        { id: "10", name: "Corona", price: 1799, category: "publishing" },
        { id: "11", name: "Revit", price: 1799, category: "publishing" },
    ]
};



export default function CustomizeCourse({ courseTitle }: CoursePackProps) {
    // -------------------- USING IT --------------------
    let course: keyof typeof AvailableSoftware | "" = "";
    if (courseTitle === "Graphic Design") {
        course = "graphic_design";
    } else if (courseTitle === "Interior Design") {
        course = "interior_design";
    }
    const availableSoftware = AvailableSoftware[course as keyof typeof AvailableSoftware]

    const [selectedSoftware, setSelectedSoftware] = useState<string[]>([])
    const [showCustomizeModal, setShowCustomizeModal] = useState(false)
    const router = useRouter();

    const handleBuyNow = (price: string): void => {
        console.log(price)
        const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Razorpay test key
            amount: price + "00",//149900,
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
        console.log(options);

        const rzp = new (window as any).Razorpay(options);
        rzp.open();
    };

    const toggleSoftware = (softwareId: string) => {
        setSelectedSoftware(prev =>
            prev.includes(softwareId)
                ? prev.filter(id => id !== softwareId)
                : [...prev, softwareId]
        )
    }

    const calculateTotalPrice = () => {
        return selectedSoftware.reduce((total, softwareId) => {
            const software = availableSoftware.find(s => s.id === softwareId)
            return total + (software?.price || 0)
        }, 0)
    }

    const calculateDiscountPrice = (totalPrice: number) => {
        // Apply 45% discount for custom pack
        console.log(totalPrice);
        return totalPrice
    }


    const handleBuy = (pack: CoursePackage) => {
        if (pack.type === 'custom') {
            setShowCustomizeModal(true)
        } else {
            console.log("Purchasing all-access pack")
        }
    }
    const coursePackage: CoursePackage = {
        id: "1",
        title: "Customized Course Pack",
        tag: "New",
        description: "Choose Any Courses (2, 3, 4 or more)",
        refundPeriod: "1 year",
        originalPrice: 2796,
        discountedPrice: 1499,
        discountPercentage: 45,
        buttonText: "Customize Now",
        type: 'custom'
    };
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
    }, []);

    return (
        <>
            <div className="max-w-7xl mx-auto px-4 sm:px-3 lg:px-3">
                <div className="relative group">
                    {/* Animated gradient border effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 via-orange-500 to-yellow-500 rounded-2xl opacity-70 group-hover:opacity-100 blur-xl transition-all duration-1000 animate-pulse-slow"></div>

                    {/* Main Card with floating effect */}
                    <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 sm:p-8 border border-gray-100/50 shadow-2xl hover:shadow-3xl transition-all duration-500 group-hover:-translate-y-2 group-hover:scale-[1.005] backdrop-blur-sm">

                        {/* Ribbon Badge - Top Right */}
                        <div className="absolute -top-3 -right-3">
                            <div className="relative">
                                <div className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold text-sm rounded-lg shadow-lg">
                                    <span className="flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                                        </svg>
                                        MOST POPULAR
                                    </span>
                                </div>
                                <div className="absolute -bottom-1 right-0 w-3 h-3 bg-orange-700 transform rotate-45"></div>
                            </div>
                        </div>

                        {/* Header Section */}
                        <div className="mb-6">
                            {/* Title with gradient text */}
                            <h3 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-amber-400 via-yellow-600 to-yellow-600 bg-clip-text text-transparent leading-tight">
                                {coursePackage.title}
                            </h3>

                            {/* Tags & Badges */}
                            <div className="flex flex-wrap items-center gap-3 mb-6">
                                <span className="px-4 py-2 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 font-semibold rounded-full text-sm border border-amber-200 shadow-sm">
                                    {coursePackage.tag}
                                </span>

                                {/* Discount Badge with animation */}
                                <div className="relative overflow-hidden">
                                    <div className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-full text-sm shadow-lg animate-bounce-subtle">
                                        <span className="flex items-center gap-2">
                                            <svg className="w-4 h-4 animate-spin-slow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                            SAVE {coursePackage.discountPercentage}%
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Description with icon */}
                        <div className="mb-3 p-2 bg-gradient-to-r from-amber-50/50 to-orange-50/30 rounded-xl border border-amber-100">
                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg shadow-md">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <p className="text-gray-800 text-lg leading-relaxed font-medium flex-1">
                                    {coursePackage.description}
                                </p>
                            </div>
                        </div>

                        {/* Refund Banner with glow */}
                        <div className="mb-3 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 opacity-10 blur-xl"></div>
                            <div className="relative p-2 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-2 border-green-200/50 shadow-sm">
                                <div className="flex items-center justify-center gap-3 text-green-800 font-bold text-base">
                                    <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full shadow-md">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                    </div>
                                    <span className="text-center">
                                        🔒 100% Money-Back Guarantee for {coursePackage.refundPeriod}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Discount Progress Bar with animated fill */}
                        <div className="mb-4">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                    <svg className="w-5 h-5 text-amber-600" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                    </svg>
                                    <span className="text-gray-700 font-semibold">Limited Time Offer</span>
                                </div>
                                <div className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                                    {coursePackage.discountPercentage}% OFF
                                </div>
                            </div>

                            {/* Animated Progress Bar */}
                            <div className="relative h-3 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full overflow-hidden shadow-inner">
                                <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 opacity-30"></div>
                                <div
                                    className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 rounded-full transition-all duration-1500 ease-out"
                                    style={{ width: `${coursePackage.discountPercentage}%` }}
                                >
                                    {/* Progress bar shine effect */}
                                    <div className="absolute top-0 left-0 w-1/3 h-full bg-white/30 animate-shine rounded-full"></div>
                                </div>
                            </div>

                            {/* Progress indicators */}
                            <div className="flex justify-between mt-2 text-sm text-gray-600">
                                <span>Regular Price</span>
                                <span>Discounted Price</span>
                            </div>
                        </div>

                        {/* CTA Button Section */}
                        <div className="pt-8 border-t border-gray-200/50">
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                                {/* Timer/Countdown - Optional add */}
                                <div className="flex-1 text-center sm:text-left">
                                    {/* <div className="inline-flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-gray-900 to-black rounded-xl shadow-lg">
                                        <svg className="w-5 h-5 text-amber-400 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <div>
                                            <div className="text-xs text-gray-300">Offer ends in</div>
                                            <div className="text-lg font-bold text-white">24:59:59</div>
                                        </div>
                                    </div> */}
                                </div>

                                {/* Main CTA Button */}
                                <button
                                    onClick={() => handleBuy(coursePackage)}
                                    className="relative px-10 py-5 bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 
                            text-white font-bold text-lg rounded-xl shadow-2xl 
                            hover:shadow-3xl transition-all duration-300 hover:-translate-y-1
                            active:scale-95 group/btn overflow-hidden"
                                >
                                    {/* Button shine effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                            -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></div>

                                    <div className="relative flex items-center justify-center gap-3">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                        </svg>
                                        <span className="text-xl">Customize Now</span>
                                        <svg className="w-5 h-5 animate-bounce-horizontal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </div>

                                    {/* Button glow */}
                                    <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 via-orange-500 to-yellow-500 
                            rounded-xl opacity-20 blur-md -z-10 group-hover/btn:opacity-40 transition-opacity duration-300"></div>
                                </button>
                            </div>

                            {/* Trust Indicators */}
                            <div className="flex flex-wrap justify-center items-center gap-6 mt-8 pt-6 border-t border-gray-100 text-sm text-gray-500">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                    {/* <span>✅ {coursePackage.enrolled}+ Students Enrolled</span> */}
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                                    <span>⭐ 4.9/5 Rating</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                                    <span>🕒 Lifetime Access</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* Customize Modal */}
            {showCustomizeModal && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4">
                    <div className="bg-white rounded-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100">

                        {/* Modal Header */}
                        <div className="p-4 sm:p-6 border-b border-gray-200 bg-orange-50 sticky top-0 shadow-sm">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2 className="text-xl sm:text-2xl font-extrabold text-gray-800 flex items-center gap-2">
                                        <span className="text-amber-500">✨</span>
                                        Customize Your {courseTitle} Package
                                    </h2>
                                    <p className="text-gray-600 mt-1 text-xs sm:text-sm">
                                        Select the software tools you want to learn
                                    </p>
                                </div>
                                <button
                                    onClick={() => setShowCustomizeModal(false)}
                                    className="text-gray-500 hover:text-gray-700 text-2xl w-10 h-10 rounded-full hover:bg-gray-200 flex items-center justify-center transition-all"
                                >
                                    ×
                                </button>
                            </div>
                        </div>

                        {/* Software Selection */}
                        <div className="p-4 sm:p-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                                {availableSoftware.map((software) => (
                                    <div
                                        key={software.id}
                                        onClick={() => toggleSoftware(software.id)}
                                        className={`
                                        border-2 rounded-2xl p-4 cursor-pointer transition-all duration-300 
                                        hover:scale-[1.02] hover:shadow-lg bg-white
                                        ${selectedSoftware.includes(software.id)
                                                ? 'border-amber-400 ring-2 ring-amber-200 bg-amber-50 shadow-md'
                                                : 'border-gray-200'}
                                    `}
                                    >
                                        <div className="flex justify-between items-center">
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-gray-800 text-base sm:text-lg">{software.name}</h3>
                                                <p className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full inline-block mt-1">
                                                    {software.category}
                                                </p>
                                            </div>

                                            {/* Checkbox */}
                                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
                                            ${selectedSoftware.includes(software.id)
                                                    ? 'bg-amber-500 border-amber-500 text-white'
                                                    : 'border-gray-300 bg-white'}
                                        `}>
                                                {selectedSoftware.includes(software.id) && "✓"}
                                            </div>
                                        </div>

                                        <div className="text-right mt-2 text-amber-600 font-bold">
                                            ₹{software.price.toLocaleString()}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Price Summary */}
                            <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100 shadow-sm mb-6">
                                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                                    💰 Price Summary
                                    <span className="text-xs text-yellow-600">({selectedSoftware.length} selected)</span>
                                </h3>

                                <div className="border-t pt-3 flex justify-between text-lg font-bold">
                                    <span>Final Price</span>
                                    <span className="text-orange-600">
                                        ₹{calculateDiscountPrice(calculateTotalPrice()).toLocaleString()}
                                    </span>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button
                                    onClick={() => setShowCustomizeModal(false)}
                                    className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-100 transition-all"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={() => handleBuyNow(String(calculateTotalPrice()))}
                                    className="flex-1 px-6 py-3 bg-amber-500 text-white rounded-xl font-semibold hover:bg-amber-600 transition-all"
                                >
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );

}
