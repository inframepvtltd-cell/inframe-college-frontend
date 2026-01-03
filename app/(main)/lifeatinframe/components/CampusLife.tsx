// app/(main)/lifeatinframe/components/CampusLife.tsx
"use client";

import { Poppins } from 'next/font/google';
import Image from 'next/image';
import React from 'react';
import { LifeSection, LifeSectionItem } from '../api/api';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

interface CampusLifeProps {
  section: LifeSection;
  items: LifeSectionItem[];
}

const CampusLife: React.FC<CampusLifeProps> = ({ section, items }) => {
  // Combine all images from all items
  const allImages = items.flatMap(item => item.image_urls || []);
  
  // If no images from DB, use static ones
  const displayImages = allImages.length > 0 ? allImages : [
    "/images/gallery/1721366034581.jpg",
    "/images/gallery/1721725542112.jpg",
    "/images/gallery/1721737896096.jpg",
    "/images/gallery/1721738128651.jpg",
    "/images/gallery/1717492692489 - Copy (2).jpg",
  ];

  return (
    <section className="py-20 bg-yellow-50 text-black">
      <div className="container mx-auto px-4">
        {/* SECTION TITLE HIDDEN - Use item title if exists */}
        {items[0]?.title ? (
          <h2 className={`text-4xl leading-snug md:leading-none md:text-5xl font-bold mb-16 text-center ${poppins.className}`}>
            {items[0].title}
          </h2>
        ) : (
          <h2 className={`text-4xl leading-snug md:leading-none md:text-5xl font-bold mb-16 text-center ${poppins.className}`}>
            EXPERIENCE CAMPUS LIFE
          </h2>
        )}
        
        {/* Description if exists */}
        {items[0]?.content && (
          <p className="text-lg text-center mb-8 max-w-3xl mx-auto">
            {items[0].content}
          </p>
        )}
        
        {/* Image Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {displayImages.map((img, index) => (
            <div
              key={`${img}-${index}`}
              className={`relative overflow-hidden aspect-square ${
                index === 0 ? 'md:col-span-2 md:row-span-2' : ''
              }`}
            >
              <Image
                src={img}
                alt={`Campus Life ${index + 1}`}
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 50vw, 25vw"
                priority={index < 2}
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