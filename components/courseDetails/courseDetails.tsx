'use client'

import CourseContent from './courseContent';
import React, { useEffect } from 'react'
import { useRouter } from "next/navigation";
const CourseHero = ({ title, price }: { title: string, price: string }) => {
    const router = useRouter();
    console.log(title);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
    }, []);

    const handleBuyNow = async () => {
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
        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    const lectures = [
        { title: "Introduction", duration: "2:04", isPreview: true },
        {
            title: "What Is A Website And What Is Wordpress, It's Advantages, Etc",
            duration: "5:20",
            isPreview: true,
        },
        { title: "What Is Domain Name, Web Hosting & How To Buy", duration: "10:50" },
        { title: "C Panel Introduction, Business Email, SSL And WordPress Installation", duration: "12:04" },
        { title: "WordPress Installation", duration: "10:04" },
        { title: "Changing The Theme, Creating The Pages And Menus", duration: "30:04" },
        { title: "Astra Theme Sidebar Options", duration: "24:04" },
        { title: "Creating Content On The Homepage With Elementor", duration: "55:04" },
    ];
    // Static course data (can be replaced with API data later)
    const courseData = {
        title: "actively for free",
        description: "This course is presented to students to enhance more benefits of our available courses and you will also learn some new technologies to improve yourself.",
        price: "1200 Rs/-",
        originalPrice: "5000 Rs",
        discount: "76% OFF",
        features: [
            { title: 'Language - Hindi', icon: '🌐' },
            { title: 'Can Watch Anytime', icon: '⏰' },
            { title: 'Use On Desktop, Tablet & Mobile', icon: '📱' },
            { title: 'Full Lifetime Access', icon: '🎯' },
            { title: 'Certificate Of Completion', icon: '📜' },
            { title: '24 Lessons (6Hr. 0 Min.)', icon: '📚' },
            { title: 'Language - Hindi', icon: '🗣️' },
            { title: 'Learn At Your Own Pace', icon: '🚀' },
        ],
        videoThumbnail: "/api/placeholder/400/250", // You can replace this with actual image
        instructor: "John Doe",
        rating: 4.8,
        students: 12500,
        duration: "6 hours"
    };


    return (
        <div className="min-h-full bg-white">

            {/* Main Content */}
            <div className="container mx-auto px-2 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">

                    {/* Left Column - Video and Course Info */}
                    <div className="space-y-1">
                        {/* Video Card */}
                        {/* Video Player */}
                        <div className="w-full h-64 sm:h-80 bg-black rounded-lg overflow-hidden ">
                            <video
                                src="https://www.w3schools.com/html/mov_bbb.mp4"
                                controls
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Course Description */}
                        <div className="bg-gray-50 p-4  rounded-lg">
                            <h2 className="text-2xl  font-extrabold text-gray-800 mb-4">About this course</h2>
                            <div className="space-y-4 text-gray-600 text-justify">
                                <p>{courseData.description}</p>
                                <p>{courseData.description}</p>
                                <p>{courseData.description}</p>
                                <p>{courseData.description}</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Course Details and Actions */}
                    <div className="space-y-6">
                        {/* Course Header */}
                        <div className="text-justify p-2 w-full">
                            {/* Title */}
                            <h1 className="text-2xl   text-left sm:text-3xl md:text-4xl font-extrabold  text-gray-900 leading-tight mb-4">
                                {title} {courseData.title}
                            </h1>

                            {/* Price Section */}
                            <div className="flex flex-wrap items-center gap-4 ">
                                {/* Current Price */}
                                <span className="text-2xl sm:text-4xl font-bold text-yellow-500">
                                    ₹{courseData.price}
                                </span>

                                {/* Original Price */}
                                <span className="text-lg sm:text-xl text-gray-500 line-through">
                                    ₹{courseData.originalPrice}
                                </span>

                                {/* Discount Badge */}
                                <span className="bg-green-100 text-green-800 px-2 py-1.5 rounded-sm text-sm sm:text-base font-semibold shadow-sm">
                                    {title} {courseData.discount}% OFF
                                </span>
                            </div>
                        </div>


                        {/* Course Features Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
                            {courseData.features.map((feature, index) => (
                                <div key={index} className="flex items-center space-x-3 bg-white p-2 rounded-lg border border-gray-200">
                                    <span className="text-2xl">{feature.icon}</span>
                                    <span className="text-gray-700 font-medium">{feature.title}</span>
                                </div>
                            ))}
                        </div>


                        {/* Dynamic Purchase Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">

                            <button
                                onClick={handleBuyNow}
                                className="flex-1 px-8 py-4 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors text-lg"
                            >
                                Buy Now
                            </button>
                        </div>

                        {/* Additional Info */}
                        <div className="text-left lg:text-left text-gray-600">
                            <p>✅ Full lifetime access</p>
                            <p>✅ Access on mobile and TV</p>
                            <p>✅ Certificate of completion</p>
                        </div>
                    </div>
                </div>
            </div>


            <div className="max-w-7xl mx-auto py-0 px-2">
                <h1 className="text-2xl font-bold mb-6 text-gray-900">
                    Course Content
                </h1>
                <CourseContent
                    sectionTitle="Section 1"
                    totalLectures={24}
                    totalDuration="6Hr 0Min"
                    lectures={lectures}
                />
            </div>

        </div>
    );
};

export default CourseHero;