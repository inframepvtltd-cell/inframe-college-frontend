// app/(main)/aboutus/components/KeyHighlights.tsx
"use client";

import React from "react";
import Image from "next/image";
import { AboutSection, AboutSectionItem } from "../api/api";

interface KeyHighlightsProps {
  section: AboutSection | undefined;
  items: AboutSectionItem[];
}

const staticHighlights = [
  {
    title: "Research Excellence",
    count: "500+",
    desc: "Published Research Papers",
    image: "/images/gallery/1721123080085.jpg",
  },
  {
    title: "Global Network",
    count: "50+",
    desc: "International Partners",
    image: "/images/gallery/1719576914809_1.jpg",
  },
  {
    title: "Innovation Hub",
    count: "100+",
    desc: "Startup Incubations",
    image: "/images/gallery/1721112431013.jpg",
  },
];

const KeyHighlights: React.FC<KeyHighlightsProps> = ({ section, items }) => {
  // Use items from database or static data
  const displayItems = items.length >= 3 ? items.slice(0, 3) : staticHighlights;

  return (
    <section className="py-20 bg-yellow-50" data-aos="fade-down">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {displayItems.map((item, index) => {
            const isDbItem = 'id' in item;
            
            return (
              <div
                key={isDbItem ? item.id : index}
                className="group relative overflow-hidden rounded-xl"
              >
                <div className="relative w-full h-96">
                  <Image
                    src={isDbItem ? (item.image_urls?.[0] || staticHighlights[index].image) : item.image}
                    alt={isDbItem ? (item.title || `Highlight ${index + 1}`) : item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent flex flex-col justify-end p-6">
                  <span className="text-5xl font-bold text-yellow-400 mb-2">
                    {isDbItem ? (item.extra_text || `${index + 1}00+`) : item.count}
                  </span>
                  <h3 className="text-2xl font-semibold text-white mb-1">
                    {isDbItem ? (item.title || `Highlight ${index + 1}`) : item.title}
                  </h3>
                  <p className="text-gray-300">
                    {isDbItem ? (item.content || "Description") : item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default KeyHighlights;