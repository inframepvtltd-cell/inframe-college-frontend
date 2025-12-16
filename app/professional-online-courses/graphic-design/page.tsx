"use client"

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from "next/navigation";
import HeroSection from '../components/heroSection';
import Footer from '../components/footer';
import QuickPayment from '../components/quickPayment';
import Carrousal from '../components/carrousal';
import CourseInfo from '../components/courseDetails';
import FAQSection from '../components/faq';
import StudentsWork from '../components/studentsWork';
import TestimonialCarousel from '../../../components/TestimonialSection ';
import FeaturesSection from '../components/featureSection';
import { useRef } from "react";
import FAQComponent from '../components/FaqComponent';
import CertificateCard from '../components/certificateComponent';

export default function LandingPage() {
    const router = useRouter();
    const theme = '#731e88'
    const tools = [
        { name: "Photoshop", image: "/software logos/pngegg (24).png", color: "from-purple-100 to-pink-100", textColor: "text-purple-600" },
        { name: "Adobe Illustrator", image: "/software logos/pngegg (25).png", color: "from-blue-100 to-indigo-100", textColor: "text-blue-700" },
        { name: "Corel Draw", image: "/software logos/pngegg (26).png", color: "from-orange-100 to-yellow-100", textColor: "text-orange-600" },
        { name: "Adobe_InDesign", image: "/software logos/Adobe_InDesign-Logo.wine-removebg-preview.png", color: "from-pink-100 to-rose-100", textColor: "text-pink-600" },
    ];

    const works = [
        "/graphic-design/stickers.png",
        "/graphic-design/sahil raza pen tool bird design.jpg",
        "/graphic-design/sahil vector detailing image.jpg",
        "/graphic-design/polly art.jpg",
        "/graphic-design/neo geo.jpg",
        "/graphic-design/MENU.jpg",
        "/graphic-design/logo making.jpg",
        "/graphic-design/BANNER.jpg",
        "/graphic-design/1000045472.jpg",
        // "/graphic-design/61MEWLSO1tL._SL1080_.jpg",
        "/graphic-design/object design.jpg",
        "/graphic-design/watch design-01 - Copy.jpg",
        "/graphic-design/vector pen tool.jpg",
        // "/graphic-design/youtube thumnail.png",
    ];
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
    }, []);

    const targetAudience = [
        "Beginners Who Want to Learn Design",
        "Students (10th, 12th & College)",
        "Freelancers Wanting to Earn Online",
        "Working Professionals Looking to Switch Careers",
        "Business Owners Wanting to Create Their Own Designs",
        "Content Creators & Social Media Managers",
        "Marketing Professionals",
        "Aspiring UI/UX Designers",
        "Artists & Creative Enthusiasts"
    ];

    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    return (
        <>
            <HeroSection offPercentage="86%" />
            <div className="min-h-full min-w-full  bg-purple-100 pt-12 pb-24">
                {/* Hero Section */}
                {/* <div className="relative w-full h-[30vh] sm:h-[60vh] md:h-[70vh] lg:h-[94vh] overflow-hidden"> */}
                <div className="relative w-full h-[31vh] sm:h-[60vh] md:h-[70vh] lg:h-[96vh] overflow-hidden">

                    <Image
                        src="/landingImages/website1.png"
                        alt="Hero Banner"
                        fill
                        priority
                        className="object-contain sm:object-cover object-top animate-fade-in"
                    />
                </div>

                <div className="py-1 sm:py-12 min-w-full bg-white">
                    <div className="container mx-auto min-w-full px-4 sm:px-0">
                        <div className="min-w-full mx-auto ">
                            {/* Main Course Info */}
                            <CourseInfo theme="#731e88" percentageOff="86%" projects="50" title="Graphic Design Course" priceWithDiscount="1,499" originalPrice='5,996' courseType="graphic" />

                            {/* pricing banner Section */}
                            <div className="relative mt-5 w-full h-[25vh] sm:h-[45vh] md:h-[86vh] overflow-hidden">
                                <Image
                                    src={"/landingImages/Grap Landscape-01-01.jpg"}
                                    alt="Hero Banner"
                                    fill
                                    priority
                                    className="object-contain object-top  transition-transform duration-700"
                                />
                            </div>

                            {/* AI Description Section */}
                            <div className="my-2 px-0 sm:px-8 lg:px-20">
                                <div className="bg-gradient-to-r from-black via-gray-900 to-black 
                    text-white rounded shadow-2xl p-6 sm:p-10 
                    border border-yellow-500/30 relative overflow-hidden animate-fade-in-up">

                                    {/* Soft Glow Background */}
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.15),transparent_70%)]"></div>

                                    {/* Heading */}
                                    <h3 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-center mb-4 relative z-10">
                                        🤖 Learn Tools Faster with AI Assistant
                                    </h3>

                                    {/* Description */}
                                    <p className="text-sm sm:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto text-center relative z-10">
                                        Master industry-leading tools like
                                        <span className={`text-[${theme}] font-semibold`}> Photoshop</span>,
                                        <span className={`text-[${theme}] font-semibold`}> Illustrator</span>,
                                        <span className={`text-[${theme}] font-semibold`}> Corel Draw</span>,
                                        <span className={`text-[${theme}] font-semibold`}> InDesign</span>,
                                        and more — with the help of our intelligent
                                        <span className={`text-[${theme}] font-bold`}> AI-powered learning assistant.</span>
                                    </p>

                                    {/* Feature List */}
                                    <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-base font-semibold relative z-10 max-w-3xl mx-auto">
                                        {[
                                            { icon: "⚡", text: "Step-by-step tool explanations" },
                                            { icon: "🎯", text: "Personalized learning suggestions" },
                                            { icon: "💡", text: "Instant answers to all tool queries" },
                                            { icon: "🚀", text: "Learn 5× faster with AI support" }
                                        ].map((item, index) => (
                                            <li
                                                key={index}
                                                className="flex items-center gap-3 animate-slide-in-left"
                                                style={{ animationDelay: `${300 + index * 120}ms` }}
                                            >
                                                <span className="text-yellow-400 text-lg sm:text-xl">{item.icon}</span>
                                                <span className="text-sm sm:text-base">{item.text}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* Bottom Highlight Text */}
                                    <p className={`text-center text-[${theme}] mt-8 text-base sm:text-xl font-bold relative z-10`}>
                                        AI Assistant — Your Personal Guide for Every Software You Learn
                                    </p>
                                </div>
                            </div>

                            {/* Course Level & Online Mode Notice */}
                            <div className="px-0 sm:px-4 lg:px-0 my-6">
                                {/* Professional Education Card */}
                                <div className="relative">
                                    {/* Main Card */}
                                    <div className="bg-gradient-to-br from-[#731e88] via-[#5a176b] to-[#3a0f45] 
                    border border-[#8a2ca3]/30 
                    
                    px-6 sm:px-8 lg:px-10 py-8 sm:py-10 lg:py-12
                    shadow-xl
                    overflow-hidden">

                                        {/* Subtle background pattern */}


                                        {/* Content container */}
                                        <div className="relative">
                                            {/* Header with Icon */}
                                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
                                                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center border border-white/20">
                                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                            d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                                                    </svg>
                                                </div>

                                                <div className="text-center sm:text-left">
                                                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2">
                                                        Designed for Class 10+ Students & Career Beginners
                                                    </h3>
                                                    <div className="h-1 w-16 bg-gradient-to-r from-white/50 to-transparent rounded-full mx-auto sm:mx-0" />
                                                </div>
                                            </div>

                                            {/* Main Description */}
                                            <div className="max-w-4xl mx-auto">
                                                <p className="text-white/90 text-base sm:text-lg lg:text-xl leading-relaxed text-center">
                                                    This comprehensive program is delivered as a
                                                    <span className="relative mx-2">
                                                        <span className="text-white font-semibold bg-white/10 px-2 py-1 rounded">100% Online Course</span>
                                                        <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#ff6b6b] rounded-full animate-pulse" />
                                                    </span>
                                                    combining structured pre-recorded video lessons with interactive live sessions for optimal learning outcomes.
                                                </p>

                                                {/* Feature Highlights */}
                                                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    {/* Pre-Recorded Lessons */}
                                                    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-5 border border-white/10">
                                                        <div className="flex items-start gap-4">
                                                            <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-[#8a2ca3] to-[#5a176b] rounded-lg flex items-center justify-center">
                                                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                </svg>
                                                            </div>
                                                            <div>
                                                                <h4 className="text-white font-semibold text-lg mb-2">Pre-Recorded Video Lessons</h4>
                                                                <ul className="space-y-2">
                                                                    <li className="flex items-center gap-2 text-white/80 text-sm">
                                                                        <div className="w-1.5 h-1.5 bg-white/50 rounded-full" />
                                                                        Learn at your own pace and schedule
                                                                    </li>
                                                                    <li className="flex items-center gap-2 text-white/80 text-sm">
                                                                        <div className="w-1.5 h-1.5 bg-white/50 rounded-full" />
                                                                        Access course materials 24/7
                                                                    </li>
                                                                    <li className="flex items-center gap-2 text-white/80 text-sm">
                                                                        <div className="w-1.5 h-1.5 bg-white/50 rounded-full" />
                                                                        Revisit complex topics anytime
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Live Sessions */}
                                                    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-5 border border-white/10">
                                                        <div className="flex items-start gap-4">
                                                            <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-[#8a2ca3] to-[#5a176b] rounded-lg flex items-center justify-center">
                                                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                                </svg>
                                                            </div>
                                                            <div>
                                                                <h4 className="text-white font-semibold text-lg mb-2">Live Interactive Sessions</h4>
                                                                <ul className="space-y-2">
                                                                    <li className="flex items-center gap-2 text-white/80 text-sm">
                                                                        <div className="w-1.5 h-1.5 bg-white/50 rounded-full" />
                                                                        Weekly doubt-clearing with experts
                                                                    </li>
                                                                    <li className="flex items-center gap-2 text-white/80 text-sm">
                                                                        <div className="w-1.5 h-1.5 bg-white/50 rounded-full" />
                                                                        Real-time Q&A and discussions
                                                                    </li>
                                                                    <li className="flex items-center gap-2 text-white/80 text-sm">
                                                                        <div className="w-1.5 h-1.5 bg-white/50 rounded-full" />
                                                                        Peer collaboration opportunities
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Additional Benefits */}
                                                <div className="mt-8 pt-6 border-t border-white/10">
                                                    <h4 className="text-white font-semibold text-center mb-4">Additional Learning Support</h4>
                                                    <div className="flex flex-wrap justify-center gap-4">
                                                        {[
                                                            "Assignments with Feedback",
                                                            "Progress Tracking",
                                                            "Mentor Support",
                                                            "Certificate of Completion"
                                                        ].map((item, index) => (
                                                            <div key={index} className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full">
                                                                <svg className="w-4 h-4 text-white/70" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                                </svg>
                                                                <span className="text-white/80 text-sm">{item}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>


                                            </div>
                                        </div>
                                    </div>

                                    {/* Decorative corner accents */}

                                </div>
                            </div>

                            {/* ======== */}
                            {/* Icons Section */}
                            <section ref={sectionRef} className="py-16 bg-gradient-to-b from-purple-100 to-white-100">
                                <div className="text-center mb-10 px-4">
                                    <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                                        <span className="bg-gradient-to-r from-gray-700 via-gray-800 to-gray-600 bg-clip-text text-transparent bg-size-200 bg-pos-0 hover:bg-pos-100 transition-all duration-1000">
                                            Software You Will Master
                                        </span>
                                    </h2>
                                    <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                                        Master industry-leading tools and software that will elevate your creative and technical skills to professional levels.
                                    </p>
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 max-w-7xl mx-auto px-4">
                                    {tools.map((tool, index) => (
                                        <div key={index} className={`flex flex-col items-center p-6 rounded-2xl bg-gradient-to-br from-white to-gray-50 shadow-lg border border-gray-100 transition-all duration-300 ease-out hover:scale-105 hover:shadow-xl ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: isVisible ? `${index * 120}ms` : '0ms' }}>
                                            {/* <div className={`mb-4 p-6 rounded-full bg-gradient-to-r ${tool.color} flex items-center justify-center shadow-md animate-float`}>
                                        </div> */}
                                            <img src={tool.image} alt={tool.name} className="w-26 h-20 object-contain drop-shadow-lg" />

                                            <p className="font-semibold text-gray-900 text-center text-lg">{tool.name}</p>
                                            {/* <span className={`text-sm ${tool.textColor} font-medium mt-1`}>{tool.category}</span> */}
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <CertificateCard
                                courseType='graphic'
                                title="Become A Certified Digital Marketing Expert"
                                subtitle="Upon Successful Completion of the Course, You Will Receive Certification From Inframe a Renowned Institution That Adds Substantial Credibility to Your Certificate and Strengthens Your Resume"
                                imageUrl="/Certificate/inframe_certificate.png"//"/software logos/pngegg (24).png"
                            // imageUrl="/certificate.png"
                            />

                            {/* Who Should Join */}
                            <div className="my-3 pb-5">
                                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center mb-5 tracking-tight">
                                    <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                                        👥 Who Should Join This Course?
                                    </span>
                                </h3>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-7xl mx-auto px-2">
                                    {targetAudience.map((audience, index) => (
                                        <div
                                            key={index}
                                            className="
                                        bg-white
                                        border border-gray-300
                                        shadow-sm
                                        hover:shadow-xl
                                        transition-all duration-300
                                         p-4
                                        flex items-center gap-4
                                        hover:border-gray-400
                                        hover:-translate-y-1
                                        relative
                                        ">
                                            {/* Highlight Glow */}
                                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-200/40 via-yellow-200/40 to-orange-200/40 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

                                            {/* Icon */}
                                            <div className="w-6 h-6 rounded-xl bg-gray-100 flex items-center justify-center text-gray-800 text-xl shadow-inner">
                                                ⭐
                                            </div>

                                            {/* Text */}
                                            <p className="text-gray-900 font-semibold text-lg relative z-10">
                                                {audience}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                            </div>

                            {/* Projects Highlight */}
                            <div className={`bg-gradient-to-r from-purple-50 to-white-100 p-6 sm:p-8  border-l-4 border-purple-500 border-2 0 mb-8 sm:mb-16 text-center shadow-lg`}>

                                <p className="text-xl sm:text-4xl text-black font-bold`">
                                    🚀 Yes 50+ hands on projects that make your CV look great.
                                </p>
                            </div>

                            {/* success student Section */}
                            <div className="relative w-full mb-2 bg-black overflow-hidden">
                                {/* Blurred Background */}
                                <div className="absolute inset-0">
                                    <Image
                                        src={"/landingImages/12-03-1.jpg"}
                                        alt="Blur Background"
                                        fill
                                        className="object-cover blur-xl opacity-40"
                                        priority
                                    />
                                </div>

                                {/* Center Foreground Banner */}
                                <div className="relative z-10 w-full flex items-center justify-center py-6">
                                    <Image
                                        src={"/landingImages/12-03-1.jpg"}
                                        alt="Hero Banner"
                                        width={900}
                                        height={600}
                                        className="w-full max-w-[900px] h-auto object-contain"
                                        priority
                                    />
                                </div>

                            </div>

                            {/* Testimonials Section */}
                            {/* <Testimonials /> */}
                            <TestimonialCarousel />

                            <StudentsWork
                                images={works}
                                title="Our Students’ Creative Gallery"
                                description="This gallery showcases the creative thinking and visual communication skills of our Graphic Design students. The displayed works represent a wide range of design disciplines, including branding, typography, illustration, advertising, layout design, and digital media.

Each project reflects the student’s ability to translate ideas into impactful visual solutions, balancing creativity with clarity and purpose. Through thoughtful use of color, form, imagery, and typography, these designs communicate messages that are engaging, meaningful, and visually compelling."
                            />

                            <div className="w-44 mb-10 h-1 bg-yellow-500 mx-auto rounded-full"></div>


                            {/* Final CTA Section */}
                            <div className="mt-8 sm:mt-10 lg:mt-12 pb-2">
                                {/* Professional Offer Card */}
                                <div className="relative bg-gradient-to-br from-[#731e88] via-[#5a176b] to-[#3a0f45]  shadow-2xl overflow-hidden border border-[#8a2ca3]">

                                    {/* Subtle geometric pattern */}
                                    <div className="absolute inset-0 opacity-5">
                                        <div className="absolute top-0 left-0 w-64 h-64 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full" />
                                        <div className="absolute bottom-0 right-0 w-96 h-96 translate-x-1/3 translate-y-1/3 bg-white rounded-full" />
                                    </div>

                                    {/* Decorative corner accents */}
                                    <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-white/10 rounded-tl-xl" />
                                    <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-white/10 rounded-tr-xl" />
                                    <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-white/10 rounded-bl-xl" />
                                    <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-white/10 rounded-br-xl" />

                                    {/* Content container */}
                                    <div className="relative px-4 sm:px-6 md:px-8 lg:px-10 py-8 sm:py-10 md:py-12">

                                        {/* Limited Time Badge */}
                                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#8a2ca3] to-[#5a176b] rounded-full mb-8 border border-white/10 shadow-lg">
                                            <div className="w-2 h-2 bg-[#ff6b6b] rounded-full animate-pulse" />
                                            <span className="text-white font-semibold text-sm tracking-wide">LIMITED TIME OFFER</span>
                                        </div>

                                        {/* Heading */}
                                        <div className="mb-6">
                                            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
                                                New Year Enrollment Special
                                            </h3>
                                            <div className="h-1 w-20 bg-gradient-to-r from-white/50 to-transparent rounded-full" />
                                        </div>



                                        {/* Benefits Grid */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-2 md:mb-12">
                                            {[
                                                {
                                                    title: "Portfolio Development",
                                                    description: "Professional portfolio consultation and optimization"
                                                },
                                                {
                                                    title: "Career Guidance",
                                                    description: "Personalized 1-on-1 mentorship sessions"
                                                },
                                                {
                                                    title: "Certifications",
                                                    description: "Industry-recognized certification upon completion"
                                                },
                                                {
                                                    title: "Lifetime Access",
                                                    description: "Course material and future updates included"
                                                }
                                            ].map((benefit, index) => (
                                                <div
                                                    key={index}
                                                    className="group bg-white/5 backdrop-blur-sm rounded-lg p-2 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-300"
                                                >
                                                    <div className="flex items-start gap-4">
                                                        {/* Number indicator */}
                                                        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-[#8a2ca3] to-[#5a176b] rounded-lg flex items-center justify-center">
                                                            <span className="text-white font-bold text-sm">{index + 1}</span>
                                                        </div>

                                                        {/* Content */}
                                                        <div>
                                                            <h4 className="text-white font-semibold text-base md:text-lg mb-1 group-hover:text-white/90 transition-colors">
                                                                {benefit.title}
                                                            </h4>
                                                            <p className="text-white/70 text-sm md:text-base leading-relaxed">
                                                                {benefit.description}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    {/* Hover indicator line */}
                                                    <div className="h-0.5 bg-gradient-to-r from-transparent via-white/20 to-transparent w-0 group-hover:w-full transition-all duration-500 mt-4" />
                                                </div>
                                            ))}
                                        </div>

                                        {/* CTA Section */}
                                        <div className="text-center">
                                            {/* <button className="group relative inline-flex items-center gap-3 bg-white text-[#731e88] font-semibold px-8 py-4 rounded-lg text-lg hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 overflow-hidden">
                                            <span className="relative z-10">Secure Your Spot Now</span>
                                            <svg
                                                className="w-5 h-5 relative z-10 transform group-hover:translate-x-1 transition-transform"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>

                                            <div className="absolute inset-0 bg-gradient-to-r from-white via-gray-100 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                        </button> */}

                                            {/* Additional info */}
                                            {/* <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 text-white/80 text-sm">
                                            <div className="flex items-center gap-2">
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                                </svg>
                                                <span>Offer expires in: <span className="font-semibold text-white">2 days</span></span>
                                            </div>

                                            <div className="hidden sm:block w-px h-4 bg-white/30" />

                                            <div className="flex items-center gap-2">
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                                <span>No payment required today</span>
                                            </div>
                                        </div> */}

                                            {/* Stats bar (optional) */}
                                            {/* <div className="mt-8 pt-6 border-t border-white/10">
                                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-white/80">
                                                <div className="text-center">
                                                    <div className="text-2xl font-bold text-white mb-1">98%</div>
                                                    <div className="text-sm">Placement Rate</div>
                                                </div>
                                                <div className="text-center">
                                                    <div className="text-2xl font-bold text-white mb-1">500+</div>
                                                    <div className="text-sm">Students Enrolled</div>
                                                </div>
                                                <div className="text-center col-span-2 sm:col-span-1">
                                                    <div className="text-2xl font-bold text-white mb-1">4.8★</div>
                                                    <div className="text-sm">Student Rating</div>
                                                </div>
                                            </div>
                                        </div> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* placement partners */}
                            <Carrousal />
                            {/* CEO Banner Section */}
                            <div className="relative w-full h-[28vh] sm:h-[60vh] md:h-[50vh] lg:h-[84vh] overflow-hidden">
                                <Image
                                    src={"/landingImages/by fb sir.png"}
                                    alt="Hero Banner"
                                    fill
                                    priority
                                    className="object-contain sm:object-cover object-top animate-fade-in"
                                />
                            </div>

                            {/* Final CTA Section */}


                            <FeaturesSection courseType='graphic' />




                            <div className="w-full flex justify-center  bg-gradient-to-b from-purple-100 to-white-100">
                                {/* <div className="w-full max-w-4xl animate-slide-up-smooth"> */}
                                {/* <FAQSection /> */}
                                <FAQComponent courseType="graphic" />
                                {/* </div> */}
                            </div>
                        </div>
                    </div>
                </div>


                <div className="animate-fade-in-up ">
                    <Footer />
                </div>




                {/* Footer */}

            </div>
            <div className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-t border-gray-300 dark:border-gray-700 shadow-xl">
                <div className="max-w-6xl mx-auto px-3 py-2 sm:px-6 sm:py-4">
                    <div className="flex items-center justify-between gap-3 flex-nowrap">

                        {/* Price Info */}
                        <div className="flex items-center gap-2 sm:gap-4 whitespace-nowrap overflow-hidden">

                            <span className="text-sm sm:text-lg text-red-500 line-through">
                                ₹5,996
                            </span>

                            <span className="text-lg sm:text-3xl font-bold text-green-600">
                                ₹1,499
                            </span>

                            <span className="hidden sm:inline text-sm text-gray-600 dark:text-gray-300">
                                Lifetime Access
                            </span>

                            <span className="text-[10px] sm:text-sm font-bold text-white bg-green-600 px-2 py-0.5 sm:px-3 sm:py-1 rounded">
                                SAVE 86%
                            </span>
                        </div>

                        {/* CTA */}
                        <div className="shrink-0">
                            <QuickPayment price="1499" courseName="Graphic Design" />
                        </div>

                    </div>
                </div>
            </div>




        </>
    );
}
