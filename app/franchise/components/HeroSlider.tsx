

"use client";
import React, { useEffect, useState } from "react";
import FranchiseEnquiryFormOnly from "./FranchiseEnquiryFormOnly";

export interface SlideItem {
  image: string;
  title: string;
  description?: string;
}

interface HeroSliderSectionProps {
  slides: SlideItem[];
  interval?: number; // optional auto-slide interval
}

export const HeroSliderSection: React.FC<HeroSliderSectionProps> = ({
  slides,
  interval = 4000,
}) => {
  const [current, setCurrent] = useState(0);
  const [open, setOpen] = useState(false);

  // Slider auto-slide
  useEffect(() => {
    if (slides.length === 0) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, interval);

    return () => clearInterval(timer);
  }, [slides, interval]);

  if (slides.length === 0) return null;

  return (
    <section className="relative pt-16 h-screen overflow-hidden">
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Background Image */}
          <img
            src={slide.image}
            className="w-full h-full object-cover"
            alt={slide.title}
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50" />

          {/* Content */}
          <div className="absolute inset-0 flex items-center justify-start">
            <div className="max-w-2xl px-8 lg:px-12">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight animate-slide-in">
                {slide.title}
              </h1>

              {slide.description && (
                <p className="mt-4 text-lg sm:text-xl text-white/90 animate-fade-in delay-200">
                  {slide.description}
                </p>
              )}

              {/* Apply Now Button */}
              <button
                onClick={() => setOpen(true)} // just open modal
                className="mt-6 inline-block bg-yellow-500 text-black px-8 py-4 rounded-xl font-semibold hover:bg-yellow-600 transition cursor-pointer animate-pop-in delay-400"
              >
                Apply for Franchise
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* ================= MODAL ================= */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="relative bg-white w-full max-w-xl rounded-2xl p-6 shadow-xl">
            {/* Close button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-black text-2xl"
            >
              ✕
            </button>

            <FranchiseEnquiryFormOnly
              enableDownload={false} 
              submitLabel="Apply Now"
              onClose={() => setOpen(false)}
            />
          </div>
        </div>
      )}
    </section>
  );
};
