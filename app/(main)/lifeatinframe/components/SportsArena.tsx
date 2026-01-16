"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { LifeSection, LifeSectionItem } from "../api/api";

interface SportsArenaProps {
  section: LifeSection;
  items: LifeSectionItem[];
}

const SportsArena: React.FC<SportsArenaProps> = ({ section, items }) => {
  // Get all images from items
  const images = items.flatMap(item => 
    (item.image_urls || []).map((url, idx) => ({
      src: url,
      alt: item.title || `Sports image ${idx + 1}`,
      className: getGridClass(idx),
    }))
  );

  // If no images from DB, use static ones
  const displayImages = images.length > 0 ? images : [
    {
      src: "/sports day/IMG_8860.jpg",
      alt: "Snooker Room",
      className: "h-64",
    },
    {
      src: "/sports day/IMG_8865.jpg",
      alt: "Indoor Gym",
      className: "h-64",
    },
    {
      src: "/sports day/IMG_8829.jpg",
      alt: "Cricket Stadium",
      className: "h-[32rem] md:row-span-2",
    },
    {
      src: "/sports day/IMG_8851.jpg",
      alt: "Badminton Courts",
      className: "h-64 md:col-span-2",
    },
    {
      src: "/sports day/IMG_8777.jpg",
      alt: "Football Ground",
      className: "h-64",
    },
    {
      src: "/sports day/IMG_8871.jpg",
      alt: "Fitness Center",
      className: "h-64",
    },
    {
      src: "/sports day/IMG_8854.jpg",
      alt: "Sports Training",
      className: "h-64",
    },
  ];

  function getGridClass(index: number): string {
    const classes = [
      'h-64',
      'h-64',
      'h-[32rem] md:row-span-2',
      'h-64 md:col-span-2',
      'h-64',
      'h-64',
      'h-64',
    ];
    return classes[index % classes.length];
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-24">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start mb-12">
        <div className="max-w-3xl">
          {/* SECTION TITLE HIDDEN - Use item content if exists */}
          {items[0]?.title ? (
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              {items[0].title}
            </h2>
          ) : (
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Sports Arena
            </h2>
          )}
          
          {/* Description */}
          {items[0]?.content ? (
            <p className="text-lg text-gray-600 leading-relaxed">
              {items[0].content}
            </p>
          ) : (
            <p className="text-lg text-gray-600 leading-relaxed">
              Whilst conquering new levels in our academics, we find it essential to strike a balance with sports too, for it is true that a fit mind and a fit body go together.{" "}
              <span className="font-semibold text-gray-900">
                The International Sports Arena – The League
              </span>{" "}
              has been established with an Olympic vision to rouse the champion in students, covering a wide array of sporting facilities.
            </p>
          )}
        </div>
        <a
          href="#"
          className="text-red-500 font-semibold hover:underline mt-4 md:mt-0"
        >
          Read More &gt;
        </a>
      </div>

      {/* Image Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {displayImages.slice(0, 7).map((image, index) => (
          <div key={index} className={`relative ${image.className}`}>
            <Image
              src={image.src}
              alt={image.alt}
              className="rounded-lg object-cover hover:scale-105 transition-transform duration-300"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              priority={index < 3}
            />
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default SportsArena;