"use client"

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from "next/navigation";

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
        <footer className="bg-gradient-to-b from-black to-gray-900 text-white py-8 sm:py-12 border-t-4 border-yellow-500">
            <div className="container mx-auto px-4 sm:px-6 text-center">
                <div className="mb-4 sm:mb-6 flex justify-center">
                    <Image
                        src="/pixelcut-export4.png"
                        alt="Inframe College Banner"
                        width={120}
                        height={50}
                        className="object-contain rounded-xl sm:w-40 sm:h-16"
                    />
                </div>
                <p className="text-lg sm:text-xl mb-3">© 2025 Inframe College. All rights reserved.</p>
                <p className="text-yellow-400 text-base sm:text-lg">🎨 Transform your career with expert-led interior design education</p>
                <div className="mt-6 flex justify-center space-x-6">
                    <span className="text-gray-400">📞 +91 9649 9649 37</span>
                    <span className="text-gray-400">📧 info@inframeschool.com</span>
                </div>
            </div>
        </footer>)
}

export default Footer