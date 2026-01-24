"use client";

import { useState, useEffect } from "react";

interface HeroSectionProps {
    offPercentage: string;
}

export default function HeroSection({ offPercentage }: HeroSectionProps) {
    const [mounted, setMounted] = useState(false);

    const [timeLeft, setTimeLeft] = useState({
        hours: 3,
        minutes: 12,
        seconds: 0,
    });

    // Ensure hydration match
    useEffect(() => {
        setMounted(true);
    }, []);

    // TIMER LOGIC
    useEffect(() => {
        if (!mounted) return;

        const interval = setInterval(() => {
            setTimeLeft((prev) => {
                let { hours, minutes, seconds } = prev;

                if (seconds > 0) return { ...prev, seconds: seconds - 1 };
                if (minutes > 0) return { hours, minutes: minutes - 1, seconds: 59 };
                if (hours > 0) return { hours: hours - 1, minutes: 59, seconds: 59 };
                return prev;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [mounted]);

    return (
        // <div className="w-full bg-black  ">
        <div className="fixed top-0 left-0 right-0 z-50 bg-black dark:bg-gray-900 border-t border-gray-300 dark:border-gray-700 shadow-xl ">
            <div className="w-full bg-white/10 backdrop-blur-2xl border-b border-yellow-400 shadow-[0_0_20px_rgba(255,215,0,0.3)] py-2 z-20 relative overflow-hidden">

                <div className="max-w-6xl mx-auto">
                    <div className="relative overflow-hidden">
                        <div className="marquee-track">
                            {[0, 1].map((copy) => (
                                <div className="marquee-group" key={copy}>

                                    <div className="marquee-item">
                                        <span className="text-yellow-400 text-sm sm:text-lg font-bold animate-pulse">
                                            🎉 Republic Day Offer {offPercentage} OFF 🎉
                                        </span>
                                    </div>

                                    <div className="marquee-item">
                                        <div className="flex items-center gap-2 text-yellow-400">
                                            <span className="text-xs text-white font-medium hidden sm:inline">Ends in:</span>

                                            {mounted ? (
                                                <>
                                                    <span className="text-lg sm:text-2xl font-bold">
                                                        {timeLeft.hours.toString().padStart(2, "0")}
                                                    </span>
                                                    <span className="text-lg sm:text-2xl font-bold">:</span>
                                                    <span className="text-lg sm:text-2xl font-bold">
                                                        {timeLeft.minutes.toString().padStart(2, "0")}
                                                    </span>
                                                    <span className="text-lg sm:text-2xl font-bold">:</span>
                                                    <span className="text-lg sm:text-2xl font-bold">
                                                        {timeLeft.seconds.toString().padStart(2, "0")}
                                                    </span>
                                                </>
                                            ) : (
                                                <>
                                                    <span className="text-lg sm:text-2xl font-bold">03</span>
                                                    <span className="text-lg sm:text-2xl font-bold">:</span>
                                                    <span className="text-lg sm:text-2xl font-bold">12</span>
                                                    <span className="text-lg sm:text-2xl font-bold">:</span>
                                                    <span className="text-lg sm:text-2xl font-bold">00</span>
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    <div className="marquee-item">
                                        <div className="px-3 py-1 text-white bg-white/10 border border-yellow-400 rounded-full text-xs sm:text-base font-semibold flex items-center gap-2">
                                            🎟 Only 4 Seats Left 🎟
                                        </div>
                                    </div>

                                    <div className="w-8" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
