"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function HeroSection({ backgroundImage = "/images/gallery/1721738128651.jpg" }) {
    const [timeLeft, setTimeLeft] = useState({
        hours: 3,
        minutes: 12,
        seconds: 0,
    });

    // TIMER LOGIC
    useEffect(() => {
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
    }, []);

    return (
        <div className="w-full  bg-black">

            {/* ===========================================================
               🔥 HEADER BAR (OFFER + SEATS + TIMER)
            ============================================================ */}
          <div className="w-full bg-white/10 backdrop-blur-2xl border-b border-yellow-400 shadow-[0_0_20px_rgba(255,215,0,0.3)] py-2 z-20 relative overflow-hidden">


                <div className="max-w-6xl mx-auto">
                    {/* MARQUEE WRAPPER */}
                    <div className="relative overflow-hidden">
                        {/* The track contains 2 copies of the same content for seamless loop */}
                        <div className="marquee-track">
                            {[0, 1].map((copy) => (
                                <div className="marquee-group" key={copy}>
                                    {/* You can create a small function to render the repeated block */}
                                    <div className="marquee-item">
                                        <span className="text-yellow-400 text-sm sm:text-lg font-bold animate-pulse">🎉 NEW YEAR 20% OFF 🎉</span>
                                    </div>

                                    <div className="marquee-item">
                                        <div className="flex items-center gap-2 text-yellow-400">
                                            <span className="text-xs text-white font-medium hidden sm:inline">Ends in:</span>
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
                                        </div>
                                    </div>

                                    <div className="marquee-item">
                                        <div className="px-3 py-1 text-white bg-white/10 border border-yellow-400 rounded-full text-xs sm:text-base font-semibold flex items-center gap-2">
                                            🎟 Only 4 Seats Left 🎟
                                        </div>
                                    </div>

                                    {/* small spacer to visually separate repeated blocks */}
                                    <div className="w-8" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* styled-jsx for keyframes and exact behavior */}
                <style jsx>{`
    .marquee-track {
      display: flex;
      gap: 2.5rem;
      align-items: center;
      /* track must be as wide as content; we animate translateX by 50% so duplication works */
      width: max-content;
      animation: marquee 18s linear infinite;
    }

    /* Each "group" is the one logical chunk that is duplicated */
    .marquee-group {
      display: flex;
      gap: 1.5rem;
      align-items: center;
      white-space: nowrap;
    }

    .marquee-item { display: flex; align-items: center; }

    /* Pause on hover to allow users to read */
    .marquee-track:hover {
      animation-play-state: paused;
    }

    /* Keyframes: translate left by 50% (one full first copy width) */
    @keyframes marquee {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }

    /* Responsive adjustments */
    @media (max-width: 640px) {
      .marquee-track { gap: 1rem; }
      .marquee-group { gap: 0.75rem; }
    }
  `}</style>
            </div>




            {/* ===========================================================
               📸 RESPONSIVE BACKGROUND IMAGE SECTION
            ============================================================ */}
            <div className="relative w-full  bg-black overflow-hidden">

                {/* Blurred Background */}
                <div className="absolute inset-0">
                    <Image
                        src={backgroundImage}
                        alt="Blur Background"
                        fill
                        className="object-cover blur-xl opacity-40"
                        priority
                    />
                </div>

                {/* Center Foreground Banner */}
                <div className="relative z-10 w-full flex items-center justify-center py-6">
                    <Image
                        src={backgroundImage}
                        alt="Hero Banner"
                        width={900}
                        height={600}
                        className="w-full max-w-[900px] h-auto object-contain"
                        priority
                    />
                </div>

            </div>



        </div>
    );
}
