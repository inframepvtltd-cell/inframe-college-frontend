// app/(main)/aboutus/components/FoundationalBeliefs.tsx
"use client";

import React from "react";
import Image from "next/image";
import { AboutSection, AboutSectionItem } from "../api/api";

interface FoundationalBeliefsProps {
  section: AboutSection | undefined;
  items: AboutSectionItem[];
}

const FoundationalBeliefs: React.FC<FoundationalBeliefsProps> = ({ section, items }) => {
  const defaultImages = [
    "/images/gallery/1719575193328.jpg",
    "/images/gallery/1719748180116.jpg"
  ];

  // Use images from database or default ones
  const image1 = items[0]?.image_urls?.[0] || defaultImages[0];
  const image2 = items[1]?.image_urls?.[0] || defaultImages[1];

  return (
    <section className="bg-white text-black py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 lg:gap-32 items-center">
          {/* Left side: Images */}
          <div data-aos="fade-right" className="flex flex-col sm:flex-row gap-6 justify-center">
            <div className="relative w-full sm:w-1/2 aspect-[3/4]">
              <Image
                src={image1}
                alt="Foundational Beliefs 1"
                fill
                className="rounded-lg shadow-lg object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="relative w-full sm:w-1/2 aspect-[3/4]">
              <Image
                src={image2}
                alt="Foundational Beliefs 2"
                fill
                className="rounded-lg shadow-lg object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Right side: Text */}
          <div data-aos="fade-left" className="text-center md:text-left">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              {section?.title || "FOUNDATIONAL BELIEFS"}
            </h2>
            {items[0]?.content ? (
              <div className="text-base sm:text-lg font-sans leading-relaxed text-justify">
                {items[0].content}
              </div>
            ) : (
              <p className="text-base sm:text-lg font-sans leading-relaxed text-justify">
                Inframe school of art, design and business inculcates design thinking in students which enables them to think from a different perspective and understand the needs and wants of the user. Our institute has developed a curriculum which not only focuses on the theoretical knowledge but also focuses on the practical learning and innovation. The school organises various workshops and internship opportunities for the students with the help of industry experts and glorified designers. With the main aim of "developing sustainable design for the people of tomorrow" our institute leads the students in the direction to the future of design and business. ICADB helps the students in learning design and business with the help of various practical projects so that students can actually understand how are such projects done in the real world and how to work in a team.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FoundationalBeliefs;