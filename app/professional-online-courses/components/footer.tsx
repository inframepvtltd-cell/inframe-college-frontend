"use client"

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from "next/navigation";
import Link from 'next/link';

function Footer() {

    const [timeLeft, setTimeLeft] = useState({
        hours: 24,
        minutes: 0,
        seconds: 0
    });
    const router = useRouter();

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
    }, []);


    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prevTime => {
                if (prevTime.seconds > 0) {
                    return { ...prevTime, seconds: prevTime.seconds - 1 };
                } else if (prevTime.minutes > 0) {
                    return { ...prevTime, minutes: prevTime.minutes - 1, seconds: 59 };
                } else if (prevTime.hours > 0) {
                    return { ...prevTime, hours: prevTime.hours - 1, minutes: 59, seconds: 59 };
                } else {
                    clearInterval(timer);
                    return prevTime;
                }
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <footer className="bg-gradient-to-b from-black to-gray-900 text-white border-t-4 border-yellow-500">
            <div className="container mx-auto px-6 py-10 sm:py-5 text-center">

                {/* Main Description */}
                <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-4xl mx-auto">
                    © 2025 <span className="font-semibold text-white">Inframe School of Art, Design & Business</span>
                    <br className="hidden sm:block" />
                    A unit of <span className="font-semibold">Inframe Educational Society</span>, registered under the Rajasthan Society Act.
                </p>

                {/* GST Info */}
                <p className="mt-3 text-sm sm:text-base text-gray-400 max-w-3xl mx-auto">
                    We are a registered society and do not charge GST on our courses.
                    Therefore, GST is not applicable.
                </p>

                {/* Tagline */}
                <p className="mt-6 text-yellow-400 text-base sm:text-lg font-medium">
                    🎨 Transform your career with expert-led design education
                </p>

                {/* Divider */}
                <div className="my-8 h-px w-full max-w-xl mx-auto bg-gradient-to-r from-transparent via-gray-600 to-transparent" />

                {/* Contact Section */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm sm:text-base">

                    <span className="text-gray-300 hover:text-white transition">
                        📞 +91 9649 9649 37
                    </span>

                    <Link
                        href="https://www.inframeschool.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2 rounded-full border border-yellow-400 text-yellow-400 
                   hover:bg-yellow-400 hover:text-black transition font-medium"
                    >
                        Visit Inframe School
                    </Link>

                    <span className="text-gray-300 hover:text-white transition">
                        📧 info@inframeschool.com
                    </span>

                </div>
            </div>
        </footer>
    )
}

export default Footer