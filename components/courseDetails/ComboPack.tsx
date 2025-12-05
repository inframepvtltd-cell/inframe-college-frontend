"use client";
import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRouter } from "next/navigation";
// import { useRouter } from "next/router";

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


export default function ComboPack() {
    const router = useRouter();

    const courseTitle = "Graphic Design"
    let course: keyof typeof AvailableSoftware | "" = "";
    if (courseTitle === "Graphic Design") {
        course = "graphic_design";
    } else if (courseTitle === "Interior Design") {
        course = "interior_design";
    }
    const availableSoftware = AvailableSoftware[course as keyof typeof AvailableSoftware]

    const [selectedSoftware, setSelectedSoftware] = useState<string[]>([])
    const [showCustomizeModal, setShowCustomizeModal] = useState(false)
    let comboData = [
        {
            image: "https://storage.googleapis.com/test694/Images/Main1-svg.webp",
            heading: "Creative Designer Combo pack",
            content: [
                {
                    smallImg: "https://storage.googleapis.com/test694/Images/Icon11.webp",
                    content: "Adobe Illustrator",
                },
                {
                    smallImg: "https://storage.googleapis.com/test694/Images/Icon12.webp",
                    content: "Adobe Photoshop",
                },
                {
                    smallImg: "https://storage.googleapis.com/test694/Images/Icon13.webp",
                    content: "UI/UX",
                },
                {
                    smallImg: "https://storage.googleapis.com/test694/Images/user.webp",
                    content: "UX Research",
                },
            ],
        },
        {
            image: "https://storage.googleapis.com/test694/Images/Main1-svg.webp",
            heading: "Creative Designer Combo pack",
            content: [
                {
                    smallImg: "https://storage.googleapis.com/test694/Images/Icon11.webp",
                    content: "Adobe Illustrator",
                },
                {
                    smallImg: "https://storage.googleapis.com/test694/Images/Icon12.webp",
                    content: "Adobe Photoshop",
                },
                {
                    smallImg: "https://storage.googleapis.com/test694/Images/Icon13.webp",
                    content: "UI/UX",
                },
                {
                    smallImg: "https://storage.googleapis.com/test694/Images/user.webp",
                    content: "UX Research",
                },
            ],
        },
        {
            image: "https://storage.googleapis.com/test694/Images/Main1-svg.webp",
            heading: "Creative Designer Combo pack",
            content: [
                {
                    smallImg: "https://storage.googleapis.com/test694/Images/Icon11.webp",
                    content: "Adobe Illustrator",
                },
                {
                    smallImg: "https://storage.googleapis.com/test694/Images/Icon12.webp",
                    content: "Adobe Photoshop",
                },
                {
                    smallImg: "https://storage.googleapis.com/test694/Images/Icon13.webp",
                    content: "UI/UX",
                },
                {
                    smallImg: "https://storage.googleapis.com/test694/Images/user.webp",
                    content: "UX Research",
                },
            ],
        },
        {
            image: "https://storage.googleapis.com/test694/Images/Main1-svg.webp",
            heading: "Creative Designer Combo pack",
            content: [
                {
                    smallImg: "https://storage.googleapis.com/test694/Images/Icon11.webp",
                    content: "Adobe Illustrator",
                },
                {
                    smallImg: "https://storage.googleapis.com/test694/Images/Icon12.webp",
                    content: "Adobe Photoshop",
                },
                {
                    smallImg: "https://storage.googleapis.com/test694/Images/Icon13.webp",
                    content: "UI/UX",
                },
                {
                    smallImg: "https://storage.googleapis.com/test694/Images/user.webp",
                    content: "UX Research",
                },
            ],
        },
        {
            image: "https://storage.googleapis.com/test694/Images/Main1-svg.webp",
            heading: "Creative Designer Combo pack",
            content: [
                {
                    smallImg: "https://storage.googleapis.com/test694/Images/Icon11.webp",
                    content: "Adobe Illustrator",
                },
                {
                    smallImg: "https://storage.googleapis.com/test694/Images/Icon12.webp",
                    content: "Adobe Photoshop",
                },
                {
                    smallImg: "https://storage.googleapis.com/test694/Images/Icon13.webp",
                    content: "UI/UX",
                },
                {
                    smallImg: "https://storage.googleapis.com/test694/Images/user.webp",
                    content: "UX Research",
                },
            ],
        },
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 700,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3500,
        cssEase: "cubic-bezier(0.22, 0.61, 0.36, 1)", // smooth effect
        centerMode: true,
        centerPadding: "0px",
        pauseOnHover: true,

        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    centerPadding: "20px"
                }
            },
            {
                breakpoint: 700,
                settings: {
                    slidesToShow: 1,
                    centerMode: false
                }
            }
        ]
    };


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

    const calculateTotalPrice = () => {
        return selectedSoftware.reduce((total, softwareId) => {
            const software = availableSoftware.find(s => s.id === softwareId)
            return total + (software?.price || 0)
        }, 0)
    }
    return (
        <div className="w-full lg:p-0 bg-gradient-to-b from-white to-amber-50/30 py-8 lg:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-2">
                {/* Header Section */}
                <div className="text-center mb-4 lg:mb-4">
                    <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                        Interested In Our{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-500 to-yellow-500">
                            Combo Pack?
                        </span>
                    </h3>
                    <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                        Get the best value with our specially curated packages designed to maximize your learning experience
                    </p>
                </div>

                <Slider {...settings}>
                    {comboData.map((item, index) => (
                        <div key={index} className="px-2 sm:px-3">
                            <div className="group bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-amber-300 h-full relative">

                                {/* Card Header with Gradient */}
                                <div className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 p-5 relative">
                                    {/* Pattern overlay */}
                                    <div className="absolute inset-0 opacity-10">
                                        <div className="absolute inset-0" style={{
                                            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.3) 2px, transparent 2px)`,
                                            backgroundSize: '20px 20px'
                                        }}></div>
                                    </div>

                                    <div className="flex items-center justify-between relative z-10">
                                    
                                        <div className="flex flex-col items-end">
                                            {/* Rating */}
                                            <div className="flex items-center bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                                                <div className="flex">
                                                    {[...Array(5)].map((_, i) => (
                                                        <svg
                                                            key={i}
                                                            className="w-4 h-4 text-white"
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                        >
                                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                        </svg>
                                                    ))}
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <h2 className="text-2xl font-bold text-white mt-4 relative z-10">{item.heading}</h2>

                                </div>

                                {/* Content Section */}
                                <div className="p-3">

                                    <div className="p-1">
                                        <div className="space-y-4 mb-3">
                                            {item.content.map((subItem, idx) => (
                                                <div
                                                    key={idx}
                                                    className="flex items-center p-3 bg-gradient-to-r from-gray-50 to-gray-50 rounded-xl hover:from-gray-100 hover:to-gray-100 transition-colors duration-200"
                                                >
                                                    <div className="flex-shrink-0">
                                                        <img
                                                            className="w-12 h-12 object-cover rounded-lg"
                                                            src={subItem.smallImg}
                                                            alt=""
                                                        />
                                                    </div>
                                                    <p className="ml-4 text-gray-700 font-medium">{subItem.content}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Additional Features */}
                                    <div className="space-y-2 mb-6">

                                        <div className="flex items-center text-gray-700">
                                            <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            <span className="text-sm">Certificate of Completion</span>
                                        </div>
                                        <div className="flex items-center text-gray-700">
                                            <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            <span className="text-sm">24/7 Support</span>
                                        </div>
                                    </div>

                                    {/* Price & Button Section */}
                                    <div className=" bg-gradient-to-r from-gray-50 to-gray-50 rounded-xl p-2 mb-0 border border-amber-200">
                                        <div className="flex items-center justify-between mb-3">
                                            <div>
                                                <div className="text-3xl font-bold text-gray-900">₹2,999</div>
                                                <div className="flex items-center mt-1">
                                                    <span className="text-gray-500 line-through text-sm">₹6,999</span>
                                                    <span className="ml-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                                        Save 57%
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-sm text-gray-600">Limited Time Offer</div>
                                                <div className="text-amber-600 font-bold text-sm">Ends in 2 days</div>
                                            </div>
                                        </div>

                                        {/* Buy Now Button */}
                                        <button
                                            onClick={() => handleBuyNow(String(calculateTotalPrice()))}
                                            className="w-full bg-gradient-to-r  from-yellow-400 via-yellow-500 to-yellow-500 hover:from-amber-500 hover:via-yellow-600 hover:to-yellow-600 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-lg group/btn relative overflow-hidden">
                                            <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></span>
                                            <span className="relative flex items-center justify-center">
                                                Buy Now
                                                <svg className="w-5 h-5 ml-2 transform group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                </svg>
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div >
    );
}
