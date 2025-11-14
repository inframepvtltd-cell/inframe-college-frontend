"use client"

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from "next/navigation";
import HeroSection from '../components/heroSection';
import Footer from '../components/footer';
import QuickPayment from '../components/quickPayment';
import RelevantToolsAndFeatures from '../components/relevantToolsAndFeatures';
import Testimonials from '../components/testimonials';
import Carrousal from '../components/carrousal';
import CourseInfo from '../components/courseDetails';
import FAQSection from '../components/faq';
import StudentsWork from '../components/studentsWork';


function InteriorDesign() {

    const router = useRouter();

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
    }, []);

    const works = [
        "/landingImages/fainal nighat ji render 1.jpg",
        "/landingImages/2 daining render copy.jpg",
        "/landingImages/3d House 3 render.jpg",
        "/landingImages/3d render 2.jpg",
        "/landingImages/3d render 3.jpg",
        "/landingImages/nighat ji dining 1 render .jpg",
        "/landingImages/nighat ji second render copy.jpg",
        "/landingImages/open restaurant 2 3d.jpg",
        "/landingImages/open restaurant jalore 3d.jpg",
        "/landingImages/pawan ji   3d render.jpg",
        "/landingImages/resort 3d render 1 ..jpg",
        "/landingImages/SURESH JI  3D 2.jpg",
    ];

    const targetAudience = [
        "Furniture Experts",
        "Interior Enthusiasts",
        "10th Pass",
        "Professionals",
        "Vendors",
        "Carpenters",
        "Architects",
        "Interior Decorators",
        "Teachers"
    ];
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <HeroSection backgroundImage="/landingImages/course landscape-01-01.jpg" />

            {/* Course Details Section */}
            <div className="py-12 sm:py-16 lg:py-20 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-12">
                    <div className="max-w-6xl mx-auto">
                        {/* Main Course Info */}
                        <CourseInfo />


                        {/* pricing banner Section */}
                        <div className="relative w-full  bg-black overflow-hidden">
                            {/* Blurred Background */}
                            <div className="absolute inset-0">
                                <Image
                                    src={"/landingImages/course landscape-01-01.jpg"}
                                    alt="Blur Background"
                                    fill
                                    className="object-cover blur-xl opacity-40"
                                    priority
                                />
                            </div>

                            {/* Center Foreground Banner */}
                            <div className="relative z-10 w-full flex items-center justify-center py-6">
                                <Image
                                    src={"/landingImages/course landscape-01-01.jpg"}
                                    alt="Hero Banner"
                                    width={900}
                                    height={600}
                                    className="w-full max-w-[900px] h-auto object-contain"
                                    priority
                                />
                            </div>

                        </div>
                        {/* tools */}
                        <RelevantToolsAndFeatures />

                        {/* Who Should Join */}
                        <div className="mb-12 sm:mb-16">
                            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-8 sm:mb-10 text-center">👥 Who Should Join?</h3>
                            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8">
                                {targetAudience.map((audience, index) => (
                                    <div key={index} className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-6 py-4 sm:px-8 sm:py-5 rounded-full font-bold text-lg sm:text-xl border-2 border-black shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300">
                                        👨‍💼 {audience}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Projects Highlight */}
                        <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-6 sm:p-8 rounded-xl border-l-4 border-yellow-500 border-2 border-yellow-200 mb-12 sm:mb-16 text-center shadow-lg">
                            <p className="text-xl sm:text-2xl text-black font-bold">
                                🚀 Yes 4+ hands on projects that make your CV look great.
                            </p>
                        </div>

                        {/* Testimonials Section */}
                        {/* <Testimonials /> */}

                        {/* success student Section */}
                        <div className="relative w-full mb-10 bg-black overflow-hidden">
                            {/* Blurred Background */}
                            <div className="absolute inset-0">
                                <Image
                                    src={"/landingImages/12-01-2.jpg"}
                                    alt="Blur Background"
                                    fill
                                    className="object-cover blur-xl opacity-40"
                                    priority
                                />
                            </div>

                            {/* Center Foreground Banner */}
                            <div className="relative z-10 w-full flex items-center justify-center py-6">
                                <Image
                                    src={"/landingImages/12-02-1.jpg"}
                                    alt="Hero Banner"
                                    width={900}
                                    height={600}
                                    className="w-full max-w-[900px] h-auto object-contain"
                                    priority
                                />
                            </div>

                        </div>


                        <StudentsWork images={works} title={'Our Student Works'} />

                        {/* placement partners */}
                        <Carrousal />

                        {/* Final CTA Section */}
                        <div className="bg-gradient-to-r mt-10 from-yellow-400 to-yellow-500  p-8 sm:p-12 text-center shadow-2xl border-4 border-yellow-300 mb-12 sm:mb-16">
                            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-4">
                                🎁 Special New Year Offer!
                            </h3>
                            <p className="text-lg sm:text-xl text-black mb-6 font-semibold">
                                Enroll now and get exclusive benefits:
                            </p>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 max-w-2xl mx-auto">
                                <li className="flex items-center justify-center text-black font-semibold">
                                    <span className="text-green-600 mr-2">✓</span> Free Portfolio Building
                                </li>
                                <li className="flex items-center justify-center text-black font-semibold">
                                    <span className="text-green-600 mr-2">✓</span> 1-on-1 Career Guidance
                                </li>
                                <li className="flex items-center justify-center text-black font-semibold">
                                    <span className="text-green-600 mr-2">✓</span> Industry Certifications
                                </li>
                                <li className="flex items-center justify-center text-black font-semibold">
                                    <span className="text-green-600 mr-2">✓</span> Lifetime Access to Resources
                                </li>
                            </ul>
                        </div>

                        {/* CTA Button */}
                        <QuickPayment />

                        <FAQSection />
                    </div>
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
}

export default InteriorDesign