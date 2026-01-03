// app/(main)/aboutus/components/CoreValues.tsx
"use client";

import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { AboutSection, AboutSectionItem } from "../api/api";

interface CoreValuesProps {
  section: AboutSection | undefined;
  items: AboutSectionItem[];
}

const staticValues = [
  {
    title: "Innovation First",
    description: "At Inframe, we are committed to pushing boundaries through cutting-edge research and technology. Our students and faculty are constantly engaged in innovative projects that aim to transform industries and create lasting impact.",
    image: "/images/gallery/1721122517472.jpg",
  },
  {
    title: "Global Perspective",
    description: "Inframe fosters international collaboration and cultural exchange, offering a global platform for our students. With partnerships across the world, our community is enriched by diverse perspectives and experiences, preparing students for a global workforce.",
    image: "/images/gallery/1719471947426.jpg",
  },
  {
    title: "Sustainable Future",
    description: "We believe in the power of design and business to create a sustainable future. At Inframe, we lead initiatives that promote environmental sustainability and social responsibility, ensuring that our graduates are equipped to contribute to a better world.",
    image: "/images/gallery/1717571273328 - Copy.jpg",
  },
];

const CoreValues: React.FC<CoreValuesProps> = ({ section, items }) => {
  const displayItems = items.length >= 3 ? items : staticValues;

  return (
    <section className="py-20 bg-white text-black font-sans" data-aos="fade-up">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-16 text-center text-black">
          {section?.title || "OUR CORE VALUES"}
        </h2>
        <div className="grid md:grid-cols-3 gap-12">
          {displayItems.map((item, index) => {
            const isDbItem = 'id' in item;
            const staticItem = !isDbItem ? item : null;
            
            return (
              <Card key={isDbItem ? item.id : index} className="overflow-hidden border-none shadow-lg bg-zinc-100">
                <CardContent className="p-0">
                  <div className="h-48 relative">
                    <Image
                      src={isDbItem ? (item.image_urls?.[0] || staticValues[index]?.image) : staticItem?.image || ""}
                      alt={isDbItem ? (item.title || `Value ${index + 1}`) : staticItem?.title || ""}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 text-yellow-400">
                      {isDbItem ? (item.title || `Value ${index + 1}`) : staticItem?.title}
                    </h3>
                    <p className="text-black">
                      {isDbItem ? (item.content || "Description") : staticItem?.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CoreValues;