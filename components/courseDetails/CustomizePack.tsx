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
                        <div className="pt-6 sm:pt-8 border-t border-gray-200/50">
                            <div className="flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8">
                                {/* Left Column - Trust Indicators for Desktop */}
                                <div className="hidden lg:block flex-1">
                                    <div className="grid grid-cols-3 gap-4 sm:gap-6 max-w-md mx-auto">
                                        <div className="text-center">
                                            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
                                                5,000+
                                            </div>
                                            <div className="text-gray-600 text-sm sm:text-base mt-1">Happy Students</div>
                                        </div>

                                        <div className="text-center relative">
                                            <div className="absolute inset-0 w-px h-full bg-gradient-to-b from-transparent via-gray-300 to-transparent left-0"></div>
                                            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
                                                4.8/5
                                            </div>
                                            <div className="text-gray-600 text-sm sm:text-base mt-1">Average Rating</div>
                                            <div className="absolute inset-0 w-px h-full bg-gradient-to-b from-transparent via-gray-300 to-transparent right-0"></div>
                                        </div>

                                        <div className="text-center">
                                            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
                                                98%
                                            </div>
                                            <div className="text-gray-600 text-sm sm:text-base mt-1">Satisfaction</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Center Column - Main CTA Button */}
                                <div className="w-full lg:w-auto">
                                    <button
                                        onClick={() => handleBuy(coursePackage)}
                                        className="relative w-full lg:w-auto px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 
                                                bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 
                                                text-white font-bold text-base sm:text-lg lg:text-xl rounded-lg sm:rounded-xl 
                                                shadow-lg sm:shadow-xl lg:shadow-2xl 
                                                hover:shadow-2xl sm:hover:shadow-3xl 
                                                transition-all duration-300 hover:-translate-y-0.5 sm:hover:-translate-y-1
                                                active:scale-95 group/btn overflow-hidden"
                                    >
                                        {/* Button shine effect */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                     -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></div>

                                        <div className="relative flex items-center justify-center gap-2 sm:gap-3">
                                            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                            </svg>
                                            <span className="text-base sm:text-lg lg:text-xl">Customize Now</span>
                                            <svg className="w-4 h-4 sm:w-5 sm:h-5 animate-bounce-horizontal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </div>

                                        {/* Button glow */}
                                        <div className="absolute -inset-0.5 sm:-inset-1 bg-gradient-to-r from-amber-400 via-orange-500 to-yellow-500 
                     rounded-lg sm:rounded-xl opacity-20 blur-md -z-10 group-hover/btn:opacity-40 transition-opacity duration-300"></div>
                                    </button>
                                </div>

                                {/* Right Column - Mobile Trust Indicators */}
                                <div className="lg:hidden w-full">
                                    <div className="grid grid-cols-3 gap-3 sm:gap-4">
                                        <div className="text-center p-3 bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-xl border border-gray-200">
                                            <div className="text-xl sm:text-2xl font-bold text-gray-900">5,000+</div>
                                            <div className="text-gray-600 text-xs sm:text-sm mt-1">Students</div>
                                        </div>

                                        <div className="text-center p-3 bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-xl border border-gray-200">
                                            <div className="text-xl sm:text-2xl font-bold text-gray-900">4.8/5</div>
                                            <div className="text-gray-600 text-xs sm:text-sm mt-1">Rating</div>
                                        </div>

                                        <div className="text-center p-3 bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-xl border border-gray-200">
                                            <div className="text-xl sm:text-2xl font-bold text-gray-900">98%</div>
                                            <div className="text-gray-600 text-xs sm:text-sm mt-1">Satisfaction</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Trust Badges Row - Always Visible */}
                            <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 md:gap-6 mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-100 text-xs sm:text-sm text-gray-500">
                                <div className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 bg-gradient-to-r from-green-50 to-emerald-50 rounded-full border border-green-100">
                                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse"></div>
                                    <span className="font-medium">✅ 5,000+ Enrolled</span>
                                </div>

                                <div className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-full border border-blue-100">
                                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full animate-pulse"></div>
                                    <span className="font-medium">⭐ 4.9/5 Rating</span>
                                </div>

                                <div className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-full border border-amber-100">
                                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                                    <span className="font-medium">🕒 Lifetime Access</span>
                                </div>

                                <div className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 bg-gradient-to-r from-purple-50 to-pink-50 rounded-full border border-purple-100">
                                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-500 rounded-full animate-pulse"></div>
                                    <span className="font-medium">📱 Mobile Friendly</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* Customize Modal */}
            {showCustomizeModal && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4">
                    <div className="bg-white rounded-2xl max-w-7xl w-full max-h-full flex flex-col shadow-2xl border border-gray-100 overflow-hidden">
                        {/* Modal Header */}
                        <div className="p-5 sm:p-4 border-b border-amber-200 bg-gradient-to-r from-yellow-500 via-yellow-500 to-yellow-500 sticky top-0 z-10 shadow-lg">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                    {/* Animated Icon Badge */}



                                    {/* Text Content */}
                                    <div>
                                        <h2 className="text-xl sm:text-xl lg:text-2xl font-extrabold text-white flex items-center gap-1">
                                            Customize Your{" "}
                                            <span className="text-white bg-black/20 px-3 py-1 rounded-full border border-white/30">
                                                {courseTitle}
                                            </span>{" "}
                                            Package
                                        </h2>
                                        <p className="text-white/90 mt-2 text-sm sm:text-base flex items-center gap-2">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                            Select your preferred software tools and build your perfect learning journey
                                        </p>
                                    </div>
                                </div>

                                {/* Close Button with Animation */}
                                <button
                                    onClick={() => setShowCustomizeModal(false)}
                                    className="relative group"
                                >
                                    <div className="absolute -inset-1 bg-white/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <div className="relative bg-white/20 backdrop-blur-sm w-10 h-10 rounded-full flex items-center justify-center border-2 border-white/30 hover:border-white/50 transition-all duration-300 group-hover:scale-110 group-hover:rotate-90">
                                        <span className="text-white text-2xl font-bold group-hover:scale-110 transition-transform duration-300">
                                            ×
                                        </span>
                                    </div>
                                    <div className="absolute -top-8 right-0 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                                        Close
                                    </div>
                                </button>
                            </div>


                        </div>

                        {/* Scrollable Content Area */}
                        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                            {/* Software Selection */}
                            <div className="mb-6">
                                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                    <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                                    </svg>
                                    Available Software Tools
                                </h3>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {availableSoftware.map((software) => (
                                        <div
                                            key={software.id}
                                            onClick={() => toggleSoftware(software.id)}
                                            className={`
                                                    border-2 rounded-2xl p-4 cursor-pointer transition-all duration-300 
                                                    hover:scale-[1.02] hover:shadow-lg bg-white group
                                                    ${selectedSoftware.includes(software.id)
                                                    ? 'border-gray-400 ring-2 ring-gray-200 bg-gradient-to-br from-gray-50 to-gray-100 shadow-md'
                                                    : 'border-gray-200 hover:border-gray-300'}
                `}
                                        >
                                            <div className="flex items-start gap-3">
                                                {/* Software Icon */}
                                                {/* <div className={`p-3 rounded-xl ${selectedSoftware.includes(software.id)
                                                    ? 'bg-gradient-to-br from-yellow-400 to-yellow-500'
                                                    : 'bg-gradient-to-br from-gray-100 to-gray-200'
                                                    }`}>
                                                    {software.icon || getSoftwareIcon(software.name)}
                                                </div> */}

                                                <div className="flex-1">
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <h3 className="font-semibold text-gray-800 text-base sm:text-lg">{software.name}</h3>
                                                            <p className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full inline-block mt-1">
                                                                {software.category}
                                                            </p>
                                                        </div>

                                                        {/* Checkbox */}
                                                        <div className={`
                        w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all
                        ${selectedSoftware.includes(software.id)
                                                                ? 'bg-yellow-500 border-yellow-500 text-white transform scale-110'
                                                                : 'border-gray-300 bg-white group-hover:border-yellow-400'}
                      `}>
                                                            {selectedSoftware.includes(software.id) && (
                                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                                                </svg>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* Description */}
                                                    <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                                                        {/* {software.description || `Learn professional ${software.name} skills`} */}
                                                    </p>

                                                    {/* Price */}
                                                    <div className="flex justify-between items-center mt-3">
                                                        <span className="text-amber-600 font-bold text-lg">
                                                            ₹{software.price.toLocaleString()}
                                                        </span>
                                                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                                            {/* {software.duration || "30+ hours"} */}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Price Summary */}
                            <div className="bg-gradient-to-r from-gray-50 to-gray-50 rounded-2xl p-5 border border-amber-100 shadow-sm mb-6">
                                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Price Summary
                                    <span className="text-xs bg-yellow-500 text-white px-2 py-1 rounded-full">
                                        {selectedSoftware.length} {selectedSoftware.length === 1 ? 'software' : 'softwares'} selected
                                    </span>
                                </h3>

                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-700">Individual Software Total</span>
                                        <span className="font-medium">₹{calculateTotalPrice().toLocaleString()}</span>
                                    </div>

                                    <div className="flex justify-between items-center text-green-600">
                                        <span>Package Discount (30%)</span>
                                        <span className="font-medium">-₹{(calculateTotalPrice() * 0.3).toLocaleString()}</span>
                                    </div>

                                    <div className="border-t border-amber-200 pt-3 mt-3">
                                        <div className="flex justify-between items-center text-lg font-bold">
                                            <div className="flex items-center gap-2">
                                                <span>Final Price</span>
                                                {selectedSoftware.length > 1 && (
                                                    <span className="text-xs bg-gradient-to-r from-green-500 to-emerald-500 text-white px-2 py-1 rounded-full">
                                                        Save ₹{(calculateTotalPrice() * 0.3).toLocaleString()}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="text-right">
                                                <div className="text-orange-600 text-2xl">
                                                    ₹{calculateDiscountPrice(calculateTotalPrice()).toLocaleString()}
                                                </div>
                                                {selectedSoftware.length > 1 && (
                                                    <div className="text-gray-500 text-sm line-through">
                                                        ₹{calculateTotalPrice().toLocaleString()}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Fixed Action Buttons at Bottom */}
                        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 sm:p-6 shadow-lg">
                            <div className="flex flex-col sm:flex-row gap-4 max-w-5xl mx-auto w-full">
                                <button
                                    onClick={() => setShowCustomizeModal(false)}
                                    className="flex-1 px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 flex items-center justify-center gap-2 hover:border-gray-400 group"
                                >
                                    <svg className="w-5 h-5 group-hover:rotate-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    Cancel
                                </button>

                                <button
                                    onClick={() => handleBuyNow(String(calculateTotalPrice()))}
                                    className="flex-1 px-2 py-4 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-xl font-bold hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 transform hover:-translate-y-1 group shadow-lg"
                                >
                                    <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                    Buy Now
                                    <span className="ml-1 bg-white/20 px-2 py-1 rounded-full text-xs">
                                        ₹{calculateDiscountPrice(calculateTotalPrice()).toLocaleString()}
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );

}
