"use client"

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import HeroSection from './heroSection';
import Footer from './footer';
import QuickPayment from './quickPayment';
import Carrousal from './carrousal';
import CourseInfo from './courseDetails';
import StudentsWork from './studentsWork';
import FeaturesSection from './featureSection';
import TestimonialCarousel from '../../../components/TestimonialSection';
import FAQComponent from './FaqComponent';
import CertificateCard from './certificateComponent';

interface SoftwareTool {
    id: string;
    name: string;
    icon_url: string;
}

interface DeliveryFeature {
    title: string;
    icon: "Play" | "Users";
    points: string[];
}

interface HeroInfo {
  title: string;
  description: string;
  highlight: string;
}

interface OfferBenefit {
    title: string;
    description: string;
}

interface OfferSection {
    badge: string;
    title: string;
    benefits: OfferBenefit[];
}

interface KeyFeature {
    title: string;
    description: string;
}

interface CourseContent {
  heroInfo: HeroInfo;
  delivery: Record<string, DeliveryFeature>;
  additionalSupport: string[];
  targetAudience: string[];
  live?: unknown;
  offerSection: OfferSection;
  keyFeatures: KeyFeature[];
}


interface LandingPageData {
    hero_image_url: string;
    gallery_images: string[];
    gallery_description: string;
    course_title: string;
    software_tools: SoftwareTool[];
    offer_price: number;
    original_price: number;
    theme_color: string;
    pricing_banner_url: string;
    duration: string;
    course_type: string;
    admin_image: string;
    certificate_image: string;
    content: CourseContent;
}

interface LandingPageProps {
    data: LandingPageData;
}

export default function LandingPageComponent({ data }: LandingPageProps) {
    const {
        hero_image_url,
        gallery_images,
        gallery_description,
        course_title,
        software_tools,
        offer_price,
        theme_color,
        pricing_banner_url,
        original_price,
        duration,
        course_type,
        content,
        admin_image,
        certificate_image
    } = data;

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
    }, []);

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

    const { heroInfo, delivery, additionalSupport, targetAudience, live, offerSection, keyFeatures } = content;

    return (
        <>
            <HeroSection offPercentage="75%" />
            <div className="min-h-full min-w-full   pt-11 pb-5">

                {/* Hero Banner Image */}
                <div className="relative w-full h-[26vh] sm:h-[60vh] md:h-[70vh] lg:h-[94vh] overflow-hidden">
                    <Image
                        src={hero_image_url}
                        alt="Hero Banner"
                        fill
                        priority
                        className="object sm:object-cover object-top animate-fade-in"
                    />
                </div>

                {/* Course Details Section */}
                <div className="py-1 sm:py-12 min-w-full bg-white">
                    <div className="container mx-auto min-w-full px-4 sm:px-0">
                        <div className="min-w-full mx-auto">
                            {/* Main Course Info */}
                            <div className="animate-slide-up">
                                <CourseInfo 
                                    courseType="interior" 
                                    theme="yellow" 
                                    projects="8" 
                                    title={course_type} 
                                    priceWithDiscount={offer_price} 
                                    originalPrice={original_price} 
                                />
                            </div>

                            {/* Pricing Banner Section */}
                            <div className="relative mt-5  w-full h-[27vh] sm:h-[45vh] md:h-[85vh] overflow-hidden">
                                <Image
                                    src={pricing_banner_url}
                                    alt="Hero Banner"
                                    fill
                                    priority
                                    className="object-strech object-top  transition-transform duration-700"
                                />
                            </div>

                            {/* AI Description Section */}
                            <div className="my-0 px-0 pt-1 sm:px-8 lg:px-0 ">
                                <div className="bg-gradient-to-r from-black via-gray-900 to-black 
                            text-white  shadow-2xl p-6 sm:p-10 
                            border border-yellow-500/30 relative overflow-hidden animate-fade-in-up">

                                    {/* Soft Glow Background */}
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.15),transparent_70%)]"></div>

                                    {/* Heading */}
                                    <h3 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-center mb-4 relative z-10">
                                        🤖 Learn Tools Faster with AI Assistant
                                    </h3>

                                    {/* Description */}
                                    <p className="text-sm sm:text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto text-center relative z-10">
                                        Master industry-leading tools like{" "}
                                        {software_tools.map((tool, index) => (
                                            <span key={tool.id}>
                                                <span className="text-yellow-400 font-semibold">
                                                    {tool.name}
                                                </span>
                                                {index < software_tools.length - 1 && ", "}
                                            </span>
                                        ))}
                                        {" "}— with the help of our intelligent{" "}
                                        <span className="text-yellow-400 font-bold">
                                            AI-powered learning assistant.
                                        </span>
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
                                    <p className="text-center text-yellow-400 mt-8 text-base sm:text-lg font-bold relative z-10">
                                        AI Assistant — Your Personal Guide for Every Software You Learn
                                    </p>
                                </div>
                            </div>


                            {/* Course Level & Online Mode Notice */}
                            <div className="px-0 sm:px-4 lg:px-0 my-6">
                                {/* Professional Education Card */}
                                <div className="relative">
                                    {/* Main Card */}
                                    <div className=" bg-yellow-400
                                                    border border-yellow-400/30 
                                                    px-6 sm:px-8 lg:px-10 py-8 sm:py-10 lg:py-12
                                                    shadow-xl
                                                    overflow-hidden">

                                        {/* Subtle background pattern */}
                                        <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-white/15 to-transparent rounded-full -translate-y-24 translate-x-12" />
                                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-white/10 to-transparent rounded-full translate-y-12 -translate-x-8" />

                                        {/* Content container */}
                                        <div className="relative ">
                                            {/* Header with Icon */}
                                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
                                                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center border border-white/30 shadow-sm">
                                                    <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                            d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                                                    </svg>
                                                </div>

                                                <div className="text-center sm:text-left">
                                                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                                                        {heroInfo.title}
                                                    </h3>
                                                    <div className="h-1 w-16 bg-gradient-to-r from-gray-900/50 to-transparent rounded-full mx-auto sm:mx-0" />
                                                </div>
                                            </div>

                                            {/* Main Description */}
                                            <div className="max-w-4xl mx-auto">
                                                <p className="text-gray-800 text-base sm:text-lg lg:text-xl leading-relaxed text-center font-medium"> {heroInfo.description}
                                                    {/* This comprehensive program is delivered as a */}
                                                    <span className="relative mx-2">
                                                        <span className="text-gray-900 font-bold bg-white/50 px-3 py-1.5 rounded-md shadow-sm border border-white/50">{heroInfo.highlight}</span>
                                                        <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                                                    </span>
                                                </p>

                                                {/* Feature Highlights */}
                                                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    {Object.values(delivery).map((feature, index) => {
                                                        const isPlayIcon = feature.icon === "Play";
                                                        
                                                        return (
                                                            <div
                                                                key={index}
                                                                className="bg-white/50 backdrop-blur-sm rounded-lg p-5 border border-white/70 shadow-sm"
                                                            >
                                                                <div className="flex items-start gap-4">
                                                                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-[#e6d219] to-[#cfb817] rounded-lg flex items-center justify-center shadow-sm">
                                                                        {isPlayIcon ? (
                                                                            <svg
                                                                                className="w-5 h-5 text-white"
                                                                                fill="none"
                                                                                stroke="currentColor"
                                                                                viewBox="0 0 24 24"
                                                                            >
                                                                                <path
                                                                                    strokeLinecap="round"
                                                                                    strokeLinejoin="round"
                                                                                    strokeWidth={2}
                                                                                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                                                                                />
                                                                                <path
                                                                                    strokeLinecap="round"
                                                                                    strokeLinejoin="round"
                                                                                    strokeWidth={2}
                                                                                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                                                />
                                                                            </svg>
                                                                        ) : (
                                                                            <svg
                                                                                className="w-5 h-5 text-white"
                                                                                fill="none"
                                                                                stroke="currentColor"
                                                                                viewBox="0 0 24 24"
                                                                            >
                                                                                <path
                                                                                    strokeLinecap="round"
                                                                                    strokeLinejoin="round"
                                                                                    strokeWidth={2}
                                                                                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2
                                                                                        c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857
                                                                                        M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0
                                                                                        M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                                                                                />
                                                                            </svg>
                                                                        )}
                                                                    </div>

                                                                    <div>
                                                                        <h4 className="text-gray-900 font-semibold text-lg mb-2">
                                                                            {feature.title}
                                                                        </h4>

                                                                        <ul className="space-y-2">
                                                                            {feature.points.map((point, idx) => (
                                                                                <li
                                                                                    key={idx}
                                                                                    className="flex items-center gap-2 text-gray-700 text-sm"
                                                                                >
                                                                                    <div className="w-1.5 h-1.5 bg-gray-800/60 rounded-full" />
                                                                                    {point}
                                                                                </li>
                                                                            ))}
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>

                                                {/* Additional Benefits */}
                                                <div className="mt-8 pt-6 border-t border-white/30">
                                                    <h4 className="text-gray-900 font-semibold text-center mb-4">
                                                        Additional Learning Support
                                                    </h4>

                                                    <div className="flex flex-wrap justify-center gap-4">
                                                        {additionalSupport.map((item, index) => (
                                                            <div
                                                                key={index}
                                                                className="flex items-center gap-2 px-4 py-2 bg-white/70 rounded-full shadow-sm border border-white/50"
                                                            >
                                                                <svg className="w-4 h-4 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path
                                                                        fillRule="evenodd"
                                                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                                        clipRule="evenodd"
                                                                    />
                                                                </svg>
                                                                <span className="text-gray-800 text-sm font-medium">{item}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            {/* ======== */}
                            {/* Icons Section */}
                            <section ref={sectionRef} className="py-6 bg-gradient-to-b from-yellow-300 to-white">
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
                                    {software_tools.map((tool, index) => (
                                        <div
                                            key={tool.id}
                                            className={`flex flex-col items-center p-6 rounded-2xl bg-gradient-to-br from-white to-gray-50 shadow-lg border border-gray-100 transition-all duration-300 ease-out hover:scale-105 hover:shadow-xl ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                                                }`}
                                            style={{
                                                transitionDelay: isVisible ? `${index * 120}ms` : "0ms",
                                            }}
                                        >
                                            <img
                                                src={tool.icon_url}
                                                alt={tool.name}
                                                className="w-26 h-20 object-contain drop-shadow-lg"
                                            />

                                            <p className="font-semibold text-gray-900 text-center text-lg">
                                                {tool.name}
                                            </p>
                                        </div>
                                    ))}

                                </div>
                            </section>

                            <CertificateCard
                                courseType='Interior Design'
                                title="Become A Certified Interior Design Expert"
                                subtitle="Upon Successful Completion of the Course, You Will Receive Certification From Inframe a Renowned Institution That Adds Substantial Credibility to Your Certificate and Strengthens Your Resume"
                                imageUrl={certificate_image}
                                themeColor="yellow"
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
                            <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-6 sm:p-8  border-l-4 border-yellow-500 border-2 0 mb-12 sm:mb-16 text-center shadow-lg">
                                <p className="text-xl sm:text-4xl text-black font-bold">
                                    🚀 Yes 8+ hands on projects that make your CV look great.
                                </p>
                            </div>


                            {/* Success Student Section */}
                            <div className="relative w-full mb-8 bg-black overflow-hidden animate-zoom-in">
                                <div className="absolute inset-0">
                                    <Image
                                        src={"/landingImages/12-01-4.jpg"}
                                        alt="Blur Background"
                                        fill
                                        className="object-cover blur-xl opacity-40"
                                        priority
                                    />
                                </div>
                                <div className="relative z-10 w-full flex items-center justify-center py-4">
                                    <Image
                                        src={"/landingImages/12-01-4.jpg"}
                                        alt="Hero Banner"
                                        width={900}
                                        height={600}
                                        className="w-full max-w-[900px] h-auto object-contain hover:scale-105 transition-transform duration-500"
                                        priority
                                    />
                                </div>
                            </div>

                            {/* Testimonials Section */}
                            <TestimonialCarousel />

                            <StudentsWork
                                images={gallery_images}
                                title={course_title}
                                description={gallery_description}
                            />

                            <div className="w-44 mb-10 h-1 bg-yellow-500 mx-auto rounded-full"></div>
                            {/* Placement Partners */}
                            <Carrousal />

                            {/* CEO Banner Section */}
                            <div className="relative w-full h-[28vh] sm:h-[60vh] md:h-[50vh] lg:h-[84vh] overflow-hidden">
                                <Image
                                    src={admin_image}
                                    alt="Hero Banner"
                                    fill
                                    priority
                                    className="object-contain sm:object-cover object-top animate-fade-in"
                                />
                            </div>

                            {/* Final CTA Section */}
                            <div className="mt-8 sm:mt-10 lg:mt-12 pb-2">
                                {/* Professional Offer Card */}
                                <div className="relative bg-gradient-to-br 
                                            from-yellow-400
                                            via-yellow-500
                                            to-amber-500
                                            shadow-2xl
                                            overflow-hidden
                                            border border-yellow-500/60">


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
                                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#141350] to-[#13285556]  mb-8 border border-white/10 shadow-lg">
                                            <div className="w-2 h-2 bg-[#fd0000] rounded-full animate-pulse" />
                                            <span className="text-white font-semibold text-sm tracking-wide">{offerSection.badge}</span>
                                        </div>

                                        {/* Heading */}
                                        <div className="mb-6">
                                            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
                                                {offerSection.title}
                                            </h3>
                                            <div className="h-1 w-20 bg-gradient-to-r from-white/50 to-transparent rounded-full" />
                                        </div>



                                        {/* Benefits Grid */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-2 md:mb-12">
                                            {offerSection.benefits.map((benefit, index) => (
                                                <div
                                                    key={index}
                                                    className="group bg-white/5 backdrop-blur-sm rounded-lg p-2 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-300"
                                                >
                                                    <div className="flex items-start gap-4">
                                                        {/* Number indicator */}
                                                        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-[#8a2ca3] to-[#5a176b] rounded-lg flex items-center justify-center">
                                                            <span className="text-white font-bold text-lg">{index + 1}</span>
                                                        </div>

                                                        {/* Content */}
                                                        <div>
                                                            <h4 className="text-white font-semibold text-base md:text-lg mb-1 group-hover:text-white/90 transition-colors">
                                                                {benefit.title}
                                                            </h4>
                                                            <p className="text-white text-sm md:text-base leading-relaxed">
                                                                {benefit.description}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    {/* Hover indicator line */}
                                                    <div className="h-0.5 bg-gradient-to-r from-transparent via-white/20 to-transparent w-0 group-hover:w-full transition-all duration-500 mt-4" />
                                                </div>
                                            ))}
                                        </div>


                                    </div>
                                </div>
                            </div>

                            {/* Features Section */}
                            <FeaturesSection keyFeatures={keyFeatures} />

                            {/* FAQ Section */}
                            <div className="w-full flex justify-center">
                                <div className="w-full max-w-4xl animate-slide-up-smooth">
                                    <FAQComponent courseType="Interior Design" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="animate-fade-in-up">
                    <Footer />
                </div>

            </div>


            <div className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-t border-gray-300 dark:border-gray-700 shadow-xl">
                <div className="max-w-6xl mx-auto px-3 py-2 sm:px-6 sm:py-4">
                    <div className="flex items-center justify-between gap-3 flex-nowrap">

                        {/* Price Info */}
                        <div className="flex items-center gap-2 sm:gap-4 whitespace-nowrap overflow-hidden">

                            <span className="text-xl sm:text-lg text-red-500 line-through">
                                ₹{original_price}
                            </span>

                            <span className="text-2xl sm:text-3xl font-bold text-green-600">
                                ₹{offer_price}
                            </span>

                            <span className="hidden sm:inline text-sm text-gray-600 dark:text-gray-300">
                                Lifetime Access
                            </span>

                            <span className="text-[12px] sm:text-sm font-bold text-white bg-green-600 px-2 py-0.5 sm:px-3 sm:py-1 rounded">
                                SAVE 86%
                            </span>
                        </div>

                        {/* CTA */}
                        <div className="shrink-0">
                                                        <QuickPayment price={String({original_price})} courseName={course_title} />

                            {/* <QuickPayment price=" ₹{original_price}" courseName="Interior Design" /> */}
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

// "use client"

// import { useState, useEffect, useRef } from 'react';
// import Image from 'next/image';
// import HeroSection from './heroSection';
// import Footer from './footer';
// import QuickPayment from './quickPayment';
// import Carrousal from './carrousal';
// import CourseInfo from './courseDetails';
// import StudentsWork from './studentsWork';
// import FeaturesSection from './featureSection';
// import TestimonialCarousel from '../../../components/TestimonialSection';
// import FAQComponent from './FaqComponent';
// import CertificateCard from './certificateComponent';

// interface SoftwareTool {
//     id: string;
//     name: string;
// }
// interface DeliveryFeature {
//     title: string;
//     icon: "Play" | "Users";
//     points: string[];
// }

// interface HeroInfo {
//   title: string;
//   description: string;
//   highlight: string;
// }


// interface CourseContent {
//   heroInfo: HeroInfo;
//   delivery: any;
//   additionalSupport?: unknown;
//   targetAudience?: unknown;
//   live?: unknown;
//   offerSection?: unknown;
//   keyFeatures?: unknown;
// }


// interface LandingPageData {
//     hero_image_url: string;
//     gallery_images: string[];
//     gallery_description: string;
//     course_title: string;
//     software_tools: SoftwareTool[];
//     offer_price: number;
//     original_price: number;
//     theme_color: string;
//     pricing_banner_url: string;
//     duration: string;
//     course_type: string;
//     admin_image: string;
//     certificate_image: string;
//     content: CourseContent;
// }

// interface LandingPageProps {
//     data: LandingPageData;
// }

// // export default function LandingPageComponent({ data }) {
// export default function LandingPageComponent({ data }: LandingPageProps) {


//     const {
//         hero_image_url,
//         gallery_images,
//         gallery_description,
//         course_title,
//         software_tools,
//         offer_price,
//         theme_color,
//         pricing_banner_url,
//         original_price,
//         duration,
//         course_type,
//         content,
//         admin_image,
//         certificate_image
//     } = data;

//     console.clear();
//     console.log(data);

//     useEffect(() => {
//         const script = document.createElement("script");
//         script.src = "https://checkout.razorpay.com/v1/checkout.js";
//         script.async = true;
//         document.body.appendChild(script);
//     }, []);

//     const [isVisible, setIsVisible] = useState(false);
//     const sectionRef = useRef<HTMLDivElement>(null);

//     useEffect(() => {
//         const observer = new IntersectionObserver(
//             ([entry]) => {
//                 if (entry.isIntersecting) {
//                     setIsVisible(true);
//                 }
//             },
//             { threshold: 0.1 }
//         );

//         if (sectionRef.current) {
//             observer.observe(sectionRef.current);
//         }

//         return () => {
//             if (sectionRef.current) {
//                 observer.unobserve(sectionRef.current);
//             }
//         };
//     }, []);

//     const { heroInfo, delivery, additionalSupport, targetAudience, live, offerSection, keyFeatures } = content;
//     console.clear();
//     console.log(targetAudience);

//     const isPlayIcon = feature.icon === "Play";

//     return (
//         <>
//             <HeroSection offPercentage="75%" />
//             {/* <div className="min-h-screen min-w-full bg-white"> */}
//             <div className="min-h-full min-w-full   pt-11 pb-5">

//                 {/* Hero Banner Image */}
//                 <div className="relative w-full h-[26vh] sm:h-[60vh] md:h-[70vh] lg:h-[94vh] overflow-hidden">
//                     <Image
//                         src={hero_image_url}
//                         alt="Hero Banner"
//                         fill
//                         priority
//                         className="object sm:object-cover object-top animate-fade-in"
//                     />
//                 </div>

//                 {/* Course Details Section */}
//                 <div className="py-1 sm:py-12 min-w-full bg-white">
//                     <div className="container mx-auto min-w-full px-4 sm:px-0">
//                         <div className="min-w-full mx-auto">
//                             {/* Main Course Info */}
//                             <div className="animate-slide-up">
//                                 <CourseInfo courseType="interior" theme="yellow" projects="8" title={course_type} priceWithDiscount={offer_price} originalPrice={original_price} />
//                             </div>

//                             {/* Pricing Banner Section */}
//                             <div className="relative mt-5  w-full h-[27vh] sm:h-[45vh] md:h-[85vh] overflow-hidden">
//                                 <Image
//                                     src={pricing_banner_url}
//                                     alt="Hero Banner"
//                                     fill
//                                     priority
//                                     className="object-strech object-top  transition-transform duration-700"
//                                 />
//                             </div>

//                             {/* AI Description Section */}
//                             <div className="my-0 px-0 pt-1 sm:px-8 lg:px-0 ">
//                                 <div className="bg-gradient-to-r from-black via-gray-900 to-black 
//                             text-white  shadow-2xl p-6 sm:p-10 
//                             border border-yellow-500/30 relative overflow-hidden animate-fade-in-up">

//                                     {/* Soft Glow Background */}
//                                     <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.15),transparent_70%)]"></div>

//                                     {/* Heading */}
//                                     <h3 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-center mb-4 relative z-10">
//                                         🤖 Learn Tools Faster with AI Assistant
//                                     </h3>

//                                     {/* Description */}
//                                     <p className="text-sm sm:text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto text-center relative z-10">
//                                         Master industry-leading tools like{" "}
//                                         {/* {software_tools.map((tool: any, index: any) =>  */}
//                                         {software_tools.map((tool, index) =>
//                                         (
//                                             <span key={tool.id}>
//                                                 <span className="text-yellow-400 font-semibold">
//                                                     {tool.name}
//                                                 </span>
//                                                 {index < software_tools.length - 1 && ", "}
//                                             </span>
//                                         ))}
//                                         {" "}— with the help of our intelligent{" "}
//                                         <span className="text-yellow-400 font-bold">
//                                             AI-powered learning assistant.
//                                         </span>
//                                     </p>


//                                     {/* Feature List */}
//                                     <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-base font-semibold relative z-10 max-w-3xl mx-auto">
//                                         {[
//                                             { icon: "⚡", text: "Step-by-step tool explanations" },
//                                             { icon: "🎯", text: "Personalized learning suggestions" },
//                                             { icon: "💡", text: "Instant answers to all tool queries" },
//                                             { icon: "🚀", text: "Learn 5× faster with AI support" }
//                                         ].map((item, index) => (
//                                             <li
//                                                 key={index}
//                                                 className="flex items-center gap-3 animate-slide-in-left"
//                                                 style={{ animationDelay: `${300 + index * 120}ms` }}
//                                             >
//                                                 <span className="text-yellow-400 text-lg sm:text-xl">{item.icon}</span>
//                                                 <span className="text-sm sm:text-base">{item.text}</span>
//                                             </li>
//                                         ))}
//                                     </ul>

//                                     {/* Bottom Highlight Text */}
//                                     <p className="text-center text-yellow-400 mt-8 text-base sm:text-lg font-bold relative z-10">
//                                         AI Assistant — Your Personal Guide for Every Software You Learn
//                                     </p>
//                                 </div>
//                             </div>


//                             {/* Course Level & Online Mode Notice */}
//                             <div className="px-0 sm:px-4 lg:px-0 my-6">
//                                 {/* Professional Education Card */}
//                                 <div className="relative">
//                                     {/* Main Card */}
//                                     <div className=" bg-yellow-400
//                                                     border border-yellow-400/30 
//                                                     px-6 sm:px-8 lg:px-10 py-8 sm:py-10 lg:py-12
//                                                     shadow-xl
//                                                     overflow-hidden">

//                                         {/* Subtle background pattern */}
//                                         <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-white/15 to-transparent rounded-full -translate-y-24 translate-x-12" />
//                                         <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-white/10 to-transparent rounded-full translate-y-12 -translate-x-8" />

//                                         {/* Content container */}
//                                         <div className="relative ">
//                                             {/* Header with Icon */}
//                                             <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
//                                                 <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center border border-white/30 shadow-sm">
//                                                     <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
//                                                             d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
//                                                     </svg>
//                                                 </div>

//                                                 <div className="text-center sm:text-left">
//                                                     <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
//                                                         {heroInfo.title}
//                                                     </h3>
//                                                     <div className="h-1 w-16 bg-gradient-to-r from-gray-900/50 to-transparent rounded-full mx-auto sm:mx-0" />
//                                                 </div>
//                                             </div>

//                                             {/* Main Description */}
//                                             <div className="max-w-4xl mx-auto">
//                                                 <p className="text-gray-800 text-base sm:text-lg lg:text-xl leading-relaxed text-center font-medium"> {heroInfo.description}
//                                                     {/* This comprehensive program is delivered as a */}
//                                                     <span className="relative mx-2">
//                                                         <span className="text-gray-900 font-bold bg-white/50 px-3 py-1.5 rounded-md shadow-sm border border-white/50">{heroInfo.highlight}</span>
//                                                         <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
//                                                     </span>
//                                                 </p>

//                                                 {/* Feature Highlights */}
//                                                 <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
//                                                     {Object.values(delivery).map((feature, index) => (
                                                        
//                                                         <div
//                                                             key={index}
//                                                             className="bg-white/50 backdrop-blur-sm rounded-lg p-5 border border-white/70 shadow-sm"
//                                                         >
//                                                             <div className="flex items-start gap-4">
//                                                                 <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-[#e6d219] to-[#cfb817] rounded-lg flex items-center justify-center shadow-sm">
//                                                                     {feature.icon === "Play" ? (
//                                                                         <svg
//                                                                             className="w-5 h-5 text-white"
//                                                                             fill="none"
//                                                                             stroke="currentColor"
//                                                                             viewBox="0 0 24 24"
//                                                                         >
//                                                                             <path
//                                                                                 strokeLinecap="round"
//                                                                                 strokeLinejoin="round"
//                                                                                 strokeWidth={2}
//                                                                                 d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
//                                                                             />
//                                                                             <path
//                                                                                 strokeLinecap="round"
//                                                                                 strokeLinejoin="round"
//                                                                                 strokeWidth={2}
//                                                                                 d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                                                                             />
//                                                                         </svg>
//                                                                     ) : (
//                                                                         <svg
//                                                                             className="w-5 h-5 text-white"
//                                                                             fill="none"
//                                                                             stroke="currentColor"
//                                                                             viewBox="0 0 24 24"
//                                                                         >
//                                                                             <path
//                                                                                 strokeLinecap="round"
//                                                                                 strokeLinejoin="round"
//                                                                                 strokeWidth={2}
//                                                                                 d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2
//                                                                                     c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857
//                                                                                     M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0
//                                                                                     M15 7a3 3 0 11-6 0 3 3 0 016 0z"
//                                                                             />
//                                                                         </svg>
//                                                                     )}
//                                                                 </div>

//                                                                 <div>
//                                                                     <h4 className="text-gray-900 font-semibold text-lg mb-2">
//                                                                         {feature.title}
//                                                                     </h4>

//                                                                     <ul className="space-y-2">
//                                                                         {feature.points.map((point, idx) => (
//                                                                             <li
//                                                                                 key={idx}
//                                                                                 className="flex items-center gap-2 text-gray-700 text-sm"
//                                                                             >
//                                                                                 <div className="w-1.5 h-1.5 bg-gray-800/60 rounded-full" />
//                                                                                 {point}
//                                                                             </li>
//                                                                         ))}
//                                                                     </ul>
//                                                                 </div>
//                                                             </div>
//                                                         </div>
//                                                     ))}
//                                                 </div>

//                                                 {/* Additional Benefits */}
//                                                 <div className="mt-8 pt-6 border-t border-white/30">
//                                                     <h4 className="text-gray-900 font-semibold text-center mb-4">
//                                                         Additional Learning Support
//                                                     </h4>

//                                                     <div className="flex flex-wrap justify-center gap-4">
//                                                         {additionalSupport.map((item: any, index: any) => (
//                                                             <div
//                                                                 key={index}
//                                                                 className="flex items-center gap-2 px-4 py-2 bg-white/70 rounded-full shadow-sm border border-white/50"
//                                                             >
//                                                                 <svg className="w-4 h-4 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
//                                                                     <path
//                                                                         fillRule="evenodd"
//                                                                         d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                                                                         clipRule="evenodd"
//                                                                     />
//                                                                 </svg>
//                                                                 <span className="text-gray-800 text-sm font-medium">{item}</span>
//                                                             </div>
//                                                         ))}
//                                                     </div>
//                                                 </div>

//                                             </div>
//                                         </div>
//                                     </div>

//                                 </div>
//                             </div>
//                             {/* ======== */}
//                             {/* Icons Section */}
//                             <section ref={sectionRef} className="py-6 bg-gradient-to-b from-yellow-300 to-white">
//                                 <div className="text-center mb-10 px-4">
//                                     <h2 className="text-4xl sm:text-5xl font-bold mb-6">
//                                         <span className="bg-gradient-to-r from-gray-700 via-gray-800 to-gray-600 bg-clip-text text-transparent bg-size-200 bg-pos-0 hover:bg-pos-100 transition-all duration-1000">
//                                             Software You Will Master
//                                         </span>
//                                     </h2>
//                                     <p className="text-gray-600 max-w-2xl mx-auto text-lg">
//                                         Master industry-leading tools and software that will elevate your creative and technical skills to professional levels.
//                                     </p>
//                                 </div>
//                                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 max-w-7xl mx-auto px-4">
//                                     {software_tools.map((tool: any, index: any) => (
//                                         <div
//                                             key={tool.id} // ✅ use id, not index
//                                             className={`flex flex-col items-center p-6 rounded-2xl bg-gradient-to-br from-white to-gray-50 shadow-lg border border-gray-100 transition-all duration-300 ease-out hover:scale-105 hover:shadow-xl ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
//                                                 }`}
//                                             style={{
//                                                 transitionDelay: isVisible ? `${index * 120}ms` : "0ms",
//                                             }}
//                                         >
//                                             <img
//                                                 src={tool.icon_url} // ✅ correct field
//                                                 alt={tool.name}
//                                                 className="w-26 h-20 object-contain drop-shadow-lg"
//                                             />

//                                             <p className="font-semibold text-gray-900 text-center text-lg">
//                                                 {tool.name}
//                                             </p>
//                                         </div>
//                                     ))}

//                                 </div>
//                             </section>

//                             <CertificateCard
//                                 courseType='Interior Design'
//                                 title="Become A Certified Interior Design Expert"
//                                 subtitle="Upon Successful Completion of the Course, You Will Receive Certification From Inframe a Renowned Institution That Adds Substantial Credibility to Your Certificate and Strengthens Your Resume"
//                                 imageUrl={certificate_image}
//                                 themeColor="yellow"
//                             />

//                             {/* Who Should Join */}
//                             <div className="my-3 pb-5">
//                                 <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center mb-5 tracking-tight">
//                                     <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
//                                         👥 Who Should Join This Course?
//                                     </span>
//                                 </h3>

//                                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-7xl mx-auto px-2">
//                                     {targetAudience.map((audience: string, index: any) => (
//                                         <div
//                                             key={index}
//                                             className="
//                                         bg-white
//                                         border border-gray-300
//                                         shadow-sm
//                                         hover:shadow-xl
//                                         transition-all duration-300
//                                          p-4
//                                         flex items-center gap-4
//                                         hover:border-gray-400
//                                         hover:-translate-y-1
//                                         relative
//                                         ">
//                                             {/* Highlight Glow */}
//                                             <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-200/40 via-yellow-200/40 to-orange-200/40 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

//                                             {/* Icon */}
//                                             <div className="w-6 h-6 rounded-xl bg-gray-100 flex items-center justify-center text-gray-800 text-xl shadow-inner">
//                                                 ⭐
//                                             </div>

//                                             {/* Text */}
//                                             <p className="text-gray-900 font-semibold text-lg relative z-10">
//                                                 {audience}
//                                             </p>
//                                         </div>
//                                     ))}
//                                 </div>

//                             </div>

//                             {/* Projects Highlight */}
//                             <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-6 sm:p-8  border-l-4 border-yellow-500 border-2 0 mb-12 sm:mb-16 text-center shadow-lg">
//                                 <p className="text-xl sm:text-4xl text-black font-bold">
//                                     🚀 Yes 8+ hands on projects that make your CV look great.
//                                 </p>
//                             </div>


//                             {/* Success Student Section */}
//                             <div className="relative w-full mb-8 bg-black overflow-hidden animate-zoom-in">
//                                 <div className="absolute inset-0">
//                                     <Image
//                                         src={"/landingImages/12-01-4.jpg"}
//                                         alt="Blur Background"
//                                         fill
//                                         className="object-cover blur-xl opacity-40"
//                                         priority
//                                     />
//                                 </div>
//                                 <div className="relative z-10 w-full flex items-center justify-center py-4">
//                                     <Image
//                                         src={"/landingImages/12-01-4.jpg"}
//                                         alt="Hero Banner"
//                                         width={900}
//                                         height={600}
//                                         className="w-full max-w-[900px] h-auto object-contain hover:scale-105 transition-transform duration-500"
//                                         priority
//                                     />
//                                 </div>
//                             </div>

//                             {/* Testimonials Section */}
//                             {/* <Testimonials /> */}
//                             <TestimonialCarousel />

//                             <StudentsWork
//                                 images={gallery_images}
//                                 title={course_title}
//                                 description={gallery_description}
//                             />

//                             <div className="w-44 mb-10 h-1 bg-yellow-500 mx-auto rounded-full"></div>
//                             {/* Placement Partners */}
//                             <Carrousal />

//                             {/* CEO Banner Section */}
//                             <div className="relative w-full h-[28vh] sm:h-[60vh] md:h-[50vh] lg:h-[84vh] overflow-hidden">
//                                 <Image
//                                     src={admin_image}
//                                     alt="Hero Banner"
//                                     fill
//                                     priority
//                                     className="object-contain sm:object-cover object-top animate-fade-in"
//                                 />
//                             </div>

//                             {/* Final CTA Section */}
//                             <div className="mt-8 sm:mt-10 lg:mt-12 pb-2">
//                                 {/* Professional Offer Card */}
//                                 <div className="relative bg-gradient-to-br 
//                                             from-yellow-400
//                                             via-yellow-500
//                                             to-amber-500
//                                             shadow-2xl
//                                             overflow-hidden
//                                             border border-yellow-500/60">


//                                     {/* Subtle geometric pattern */}
//                                     <div className="absolute inset-0 opacity-5">
//                                         <div className="absolute top-0 left-0 w-64 h-64 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full" />
//                                         <div className="absolute bottom-0 right-0 w-96 h-96 translate-x-1/3 translate-y-1/3 bg-white rounded-full" />
//                                     </div>

//                                     {/* Decorative corner accents */}
//                                     <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-white/10 rounded-tl-xl" />
//                                     <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-white/10 rounded-tr-xl" />
//                                     <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-white/10 rounded-bl-xl" />
//                                     <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-white/10 rounded-br-xl" />

//                                     {/* Content container */}
//                                     <div className="relative px-4 sm:px-6 md:px-8 lg:px-10 py-8 sm:py-10 md:py-12">

//                                         {/* Limited Time Badge */}
//                                         <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#141350] to-[#13285556]  mb-8 border border-white/10 shadow-lg">
//                                             <div className="w-2 h-2 bg-[#fd0000] rounded-full animate-pulse" />
//                                             <span className="text-white font-semibold text-sm tracking-wide">{offerSection.badge}</span>
//                                         </div>

//                                         {/* Heading */}
//                                         <div className="mb-6">
//                                             <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
//                                                 {offerSection.title}
//                                             </h3>
//                                             <div className="h-1 w-20 bg-gradient-to-r from-white/50 to-transparent rounded-full" />
//                                         </div>



//                                         {/* Benefits Grid */}
//                                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-2 md:mb-12">
//                                             {offerSection.benefits.map((benefit: any, index: any) => (
//                                                 <div
//                                                     key={index}
//                                                     className="group bg-white/5 backdrop-blur-sm rounded-lg p-2 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-300"
//                                                 >
//                                                     <div className="flex items-start gap-4">
//                                                         {/* Number indicator */}
//                                                         <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-[#8a2ca3] to-[#5a176b] rounded-lg flex items-center justify-center">
//                                                             <span className="text-white font-bold text-lg">{index + 1}</span>
//                                                         </div>

//                                                         {/* Content */}
//                                                         <div>
//                                                             <h4 className="text-white font-semibold text-base md:text-lg mb-1 group-hover:text-white/90 transition-colors">
//                                                                 {benefit.title}
//                                                             </h4>
//                                                             <p className="text-white text-sm md:text-base leading-relaxed">
//                                                                 {benefit.description}
//                                                             </p>
//                                                         </div>
//                                                     </div>

//                                                     {/* Hover indicator line */}
//                                                     <div className="h-0.5 bg-gradient-to-r from-transparent via-white/20 to-transparent w-0 group-hover:w-full transition-all duration-500 mt-4" />
//                                                 </div>
//                                             ))}
//                                         </div>


//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Features Section */}

//                             <FeaturesSection keyFeatures={keyFeatures} />

//                             {/* FAQ Section */}
//                             <div className="w-full flex justify-center">
//                                 <div className="w-full max-w-4xl animate-slide-up-smooth">
//                                     {/* <FAQSection /> */}
//                                     <FAQComponent courseType="Interior Design" />
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Footer */}
//                 <div className="animate-fade-in-up">
//                     <Footer />
//                 </div>

//             </div>


//             <div className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-t border-gray-300 dark:border-gray-700 shadow-xl">
//                 <div className="max-w-6xl mx-auto px-3 py-2 sm:px-6 sm:py-4">
//                     <div className="flex items-center justify-between gap-3 flex-nowrap">

//                         {/* Price Info */}
//                         <div className="flex items-center gap-2 sm:gap-4 whitespace-nowrap overflow-hidden">

//                             <span className="text-xl sm:text-lg text-red-500 line-through">
//                                 ₹10,493
//                             </span>

//                             <span className="text-2xl sm:text-3xl font-bold text-green-600">
//                                 ₹1,499
//                             </span>

//                             <span className="hidden sm:inline text-sm text-gray-600 dark:text-gray-300">
//                                 Lifetime Access
//                             </span>

//                             <span className="text-[12px] sm:text-sm font-bold text-white bg-green-600 px-2 py-0.5 sm:px-3 sm:py-1 rounded">
//                                 SAVE 86%
//                             </span>
//                         </div>

//                         {/* CTA */}
//                         <div className="shrink-0">
//                             <QuickPayment price="1499" courseName="Interior Design" />
//                         </div>

//                     </div>
//                 </div>
//             </div>


//         </>

//     );
// }

