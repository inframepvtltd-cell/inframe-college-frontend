// app/(main)/aboutus/components/CampusLife.tsx
"use client";

import React from "react";
import Image from "next/image";
import { AboutSection, AboutSectionItem } from "../api/api";

interface CampusLifeProps {
  section: AboutSection | undefined;
  items: AboutSectionItem[];
}

const staticImages = [
  "/fashion/DSC03209.JPG",
  "/fashion/DSC04131.JPG",
  "/images/gallery/1721737896096.jpg",
  "/fine art/SKF09511.JPG",
  "/IMG-20230414-WA0011.jpg",
  "/fine art/SKF09513.JPG",
  "/IMG_8698.jpg",
  "/fashion/DSC03376.JPG",
  "/IMG_20230202_141256.jpg",
  "/IMG-20221021-WA0083.jpg",
  "/IMG-20221021-WA0033.jpg",
  "/IMG_20230304_151926.jpg",
  "/240008bb-a702-400d-b344-429884fda820.jpg",
];

const CampusLife: React.FC<CampusLifeProps> = ({ section, items }) => {
  // Use images from database or static ones
  const displayImages = items.length > 0 
    ? items.flatMap(item => item.image_urls || [])
    : staticImages;

  return (
    <section className="py-20 bg-yellow-50 text-black">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl leading-snug md:leading-none md:text-5xl font-bold mb-16 text-center">
          {section?.title || "EXPERIENCE CAMPUS LIFE"}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {displayImages.slice(0, 13).map((img, index) => (
            <div
              data-aos="flip-left"
              key={index}
              className={`relative overflow-hidden aspect-square ${
                index === 0 ? "md:col-span-2 md:row-span-2" : ""
              }`}
            >
              <Image
                src={img}
                alt={`Campus Life ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition-opacity duration-300 hover:bg-yellow-400/20" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CampusLife;