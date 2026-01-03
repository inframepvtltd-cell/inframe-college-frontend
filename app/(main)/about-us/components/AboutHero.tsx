// app/(main)/aboutus/components/AboutHero.tsx
"use client";

import React from "react";
import Image from "next/image";
import { AboutSection, AboutSectionItem } from "../api/api";

interface AboutHeroProps {
  section: AboutSection | undefined;
  items: AboutSectionItem[];
}

const studentImages = [
  "/campus-27.JPG",
  "/images/gallery/SKF02730.JPG",
  "/fashion-1.JPG",
  "/images/gallery/1722323502473.jpg",
  "/images/gallery/1721738128651.jpg",
  "/fashion-2.JPG",
  "/images/gallery/SKF02800.JPG",
  "/images/gallery/SKF02732.JPG",
  "/images/gallery/1721738005538.jpg",
  "/images/gallery/1719576914809_1.jpg",
  "/images/gallery/1717492692489 - Copy (2).jpg",
  "/images/gallery/DSC04267.JPG",
];

const AboutHero: React.FC<AboutHeroProps> = ({ section, items }) => {
  // Use images from database or static ones
  const displayImages = items.length > 0 
    ? items.flatMap(item => item.image_urls || [])
    : studentImages;

  // Get first item for title and content
  const firstItem = items.length > 0 ? items[0] : null;

  return (
    <section className="bg-yellow-400 text-white py-32">
      <div className="container mx-auto px-4">
        <div
          className="grid grid-cols-3 md:grid-cols-6 gap-2 mb-8"
          data-aos="fade-up"
        >
          {displayImages.slice(0, 12).map((imgUrl, i) => (
            <div key={i} className="aspect-square relative">
              <Image
                src={imgUrl}
                alt={`University Life ${i + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 33vw, 16vw"
              />
            </div>
          ))}
        </div>
        
        {/* Show first item's title if exists */}
        <h1 className="text-4xl md:text-5xl text-black font-bold mb-4">
          {firstItem?.title || "WHO WE ARE?"}
        </h1>
        
        {/* Show first item's content if exists */}
        <p className="text-lg md:text-xl text-black font-sans">
          {firstItem?.content || 
            "Inframe is an innovative platform that blends creativity with business, offering a dynamic space where art and design professionals come together to shape the future. With a vibrant and inclusive community, Inframe empowers creators to transform their passion into a successful career while fostering a collaborative environment where ideas thrive."}
        </p>
      </div>
    </section>
  );
};

export default AboutHero;