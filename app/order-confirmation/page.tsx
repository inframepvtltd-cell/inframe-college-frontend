"use client";

import { useEffect, useState } from "react";

export default function ThankYouPage() {
    const PLAY_STORE_URL =
        "https://play.google.com/store/apps/details?id=com.wereskill.app";

    const [secondsLeft, setSecondsLeft] = useState(10);

    // ✅ PURCHASE EVENT — FIRES ONLY ON SUCCESS PAGE
    useEffect(() => {
        if (typeof window !== "undefined" && (window as any).fbq) {
            (window as any).fbq("track", "Purchase", {
                value: 1499, // 🔴 replace with actual course price
                currency: "INR",
            });
        }
    }, []);

    //  Countdown + redirect
    useEffect(() => {
        if (secondsLeft === 0) {
            window.location.href = PLAY_STORE_URL;
            return;
        }

        const timer = setTimeout(() => {
            setSecondsLeft((prev) => prev - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [secondsLeft]);

    return (
        <section className="min-h-screen flex flex-col items-center justify-center 
                            bg-gray-50 px-4 sm:px-6 text-center">

            {/* Success Icon */}
            <div className="w-20 h-20 bg-green-100 rounded-full 
                            flex items-center justify-center mb-8">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
            </div>

            {/* Heading */}
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Payment Successful 🎉
            </h1>

            {/* Description */}
            <p className="text-lg text-gray-700 max-w-xl mb-6">
                Your enrollment is confirmed. You now have full access to the course.
                Please download our app to continue your learning journey.
            </p>

            {/* QR Code Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                <p className="font-semibold text-gray-800 mb-3">
                    Scan to Download the App
                </p>

                <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
                        PLAY_STORE_URL
                    )}`}
                    alt="Download App QR Code"
                    className="mx-auto"
                />
            </div>

            {/* Countdown */}
            <p className="text-gray-700 text-lg mb-6">
                Redirecting to Play Store in{" "}
                <span className="font-bold text-blue-600">
                    {secondsLeft}s
                </span>
                …
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                <a
                    href={PLAY_STORE_URL}
                    className="bg-blue-600 text-white px-8 py-4 rounded-xl 
                               text-lg font-semibold hover:bg-blue-700 transition"
                >
                    Open App Now
                </a>

                <a
                    href="/"
                    className="bg-white text-gray-900 px-8 py-4 rounded-xl 
                               text-lg font-semibold border border-gray-300 
                               hover:bg-gray-50 transition"
                >
                    Back to Home
                </a>
            </div>

            {/* Support */}
            <div className="mt-12 pt-6 border-t border-gray-200 max-w-md">
                <p className="text-gray-600 text-sm">
                    Need help?{" "}
                    <a href="/contact-us" className="text-blue-600 font-medium hover:underline">
                        Contact support
                    </a>
                </p>
            </div>
        </section>
    );
}
