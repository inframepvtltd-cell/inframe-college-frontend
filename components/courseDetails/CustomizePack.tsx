"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";
import { OptimizedBottomBar, SoftwareCard } from "./CustmoizeModel";

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
const softwareIcons = {
    "AutoCAD": "/logos/pngegg (17).png",
    "V-Ray": "/logos/pngegg (20).png",
    "SketchUp": "/logos/pngegg (18).png",
    "3dsMax": "/logos/pngegg (19).png",
    "Rhino": "/logos/pngegg (23).png",
    "Photoshop": "/software logos/pngegg (24).png",
    "Adobe Illustrator": "/software logos/pngegg (25).png",
    "Figma": "/software logos/pngegg (31).png",
    "Adobe Photoshop": "/software logos/pngegg (24).png", // same icon for full name
};

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
    ],
    uiux_design: [
        { id: "1", name: "sketch", price: 1999, category: "design" },
        { id: "2", name: "Adobe Illustrator", price: 1999, category: "design" },
        { id: "3", name: "Adobe Photoshop", price: 1599, category: "design" },
        { id: "4", name: "Adobe Indesign", price: 1499, category: "ui-ux" },
        { id: "5", name: "Adobe XD", price: 999, category: "design" },
        { id: "6", name: "Figma", price: 999, category: "design" }
    ],
    digital_marketing: [
        { id: "1", name: "Google Ads", price: 1999, category: "design" },
        { id: "2", name: "Meta Ads", price: 1999, category: "design" },
        { id: "3", name: "Linkdin", price: 1599, category: "design" },
        { id: "4", name: "YouTube", price: 1499, category: "ui-ux" },
        { id: "5", name: "Whatsapp Marketing", price: 999, category: "design" },
        { id: "6", name: "SMS Marketing", price: 999, category: "design" },
        { id: "7", name: "Affiliate Marketing ", price: 999, category: "design" }
    ],
    fashion_design: [
        { id: "1", name: "Corel", price: 1999, category: "design" },
        { id: "2", name: "Adobe Illustrator", price: 1999, category: "design" },
        { id: "3", name: "Photoshop", price: 1599, category: "design" }
    ],
    jewellery_design: [
        { id: "1", name: "Corel", price: 1999, category: "design" },
        { id: "2", name: "Adobe Illustrator", price: 1999, category: "design" },
        { id: "3", name: "Photoshop", price: 1599, category: "design" },
        { id: "3", name: "Rhino", price: 1599, category: "design" }
    ]
};


export default function CustomizeCourse({ courseTitle }: CoursePackProps) {
    // -------------------- USING IT --------------------
    let course: keyof typeof AvailableSoftware | "" = "";
    if (courseTitle === "Graphic Design") {
        course = "graphic_design";
    } else if (courseTitle === "Interior Design") {
        course = "interior_design";
    } else if (courseTitle === "UIUX Design") {
        course = "uiux_design";
    } else if (courseTitle === "Digital Marketing") {
        course = "digital_marketing";
    } else if (courseTitle === "Fashion Design") {
        course = "fashion_design";
    } else if (courseTitle === "Jewellery Design") {
        course = "jewellery_design";
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
        description: "Choose Any Courses (2, 3 or more)",
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
                    <div className="absolute -inset-1  rounded-2xl opacity-70 group-hover:opacity-100 blur-xl transition-all duration-1000 animate-pulse-slow"></div>

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
                            <h3 className="text-3xl sm:text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-amber-400 via-yellow-600 to-yellow-600 bg-clip-text text-transparent leading-tight">
                                {coursePackage.title}
                            </h3>

                            {/* Tags & Badges */}
                            <div className="flex flex-wrap items-center gap-3 mb-6">
                                {/* <span className="px-4 py-2 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 font-semibold rounded-full text-sm border border-amber-200 shadow-sm">
                                    {coursePackage.tag}
                                </span> */}

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
                        <div className="mb-3 p-1 bg-gradient-to-r from-amber-50/50 to-orange-50/30 rounded-xl border border-amber-100">
                            <div className="flex items-start gap-4">
                                <div className="p-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg shadow-md">
                                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <p className="text-gray-800 text-sm leading-relaxed font-medium flex-1">
                                    {coursePackage.description}
                                </p>
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

            {showCustomizeModal && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4">
                    <div className="bg-white rounded-2xl w-full max-w-7xl max-h-[90vh] flex flex-col shadow-2xl border border-gray-100 overflow-hidden">
                        {/* Modal Header - Optimized */}
                        <div className="p-4 sm:p-6 border-b border-amber-200 bg-gradient-to-r from-yellow-500 to-amber-500 sticky top-0 z-10">
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
                                        <div className="flex items-center gap-2 flex-shrink-0">
                                            <div className="bg-white/20 p-2 rounded-full">
                                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </div>
                                            <h2 className="text-lg sm:text-xl font-extrabold text-white truncate">
                                                Customize Your Package
                                            </h2>
                                        </div>

                                        <div className="bg-black/10 px-3 py-2 rounded-lg border border-white/20 sm:ml-4 flex-shrink min-w-0">
                                            <p className="text-white/90 text-sm sm:text-base font-medium truncate">
                                                {courseTitle}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <svg className="w-4 h-4 text-white/80 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                        <p className="text-white/80 text-xs sm:text-sm truncate">
                                            Select your preferred software tools and build your perfect learning journey
                                        </p>
                                    </div>
                                </div>

                                {/* Close Button */}
                                <button
                                    onClick={() => setShowCustomizeModal(false)}
                                    className="relative group flex-shrink-0 ml-2"
                                    aria-label="Close modal"
                                >
                                    <div className="bg-white/20 w-10 h-10 rounded-full flex items-center justify-center border border-white/30 hover:border-white/50 transition-colors">
                                        <span className="text-white text-xl font-bold">×</span>
                                    </div>
                                </button>
                            </div>
                        </div>

                        {/* Virtualized Scrollable Content Area */}
                        <div className="flex-1 overflow-y-auto overscroll-contain"
                            style={{ willChange: 'transform', contain: 'content' }}>
                            <div className="p-4 sm:p-6">
                                {/* Software Selection - Optimized */}
                                <div className="mb-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-2">
                                            <div className="bg-yellow-100 p-2 rounded-lg flex-shrink-0">
                                                <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                                                </svg>
                                            </div>
                                            <h3 className="text-lg sm:text-xl font-bold text-gray-800">
                                                Available Software Tools
                                            </h3>
                                        </div>
                                        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full flex-shrink-0">
                                            {availableSoftware.length} tools
                                        </span>
                                    </div>

                                    {/* Virtualized Grid Container */}
                                    <div
                                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
                                        style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
                                    >
                                        {availableSoftware.map((software) => (
                                            <SoftwareCard
                                                key={software.id}
                                                software={software}
                                                isSelected={selectedSoftware.includes(software.id)}
                                                onToggle={() => toggleSoftware(software.id)}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Optimized Bottom Bar - Memoized Price Calculation */}
                        <OptimizedBottomBar
                            selectedCount={selectedSoftware.length}
                            totalPrice={calculateTotalPrice()}
                            discountedPrice={calculateDiscountPrice(calculateTotalPrice())}
                            onCancel={() => setShowCustomizeModal(false)}
                            onBuyNow={() => handleBuyNow(String(calculateTotalPrice()))}
                        />
                    </div>
                </div>
            )}
        </>
    );

}
