// app/(main)/lifeatinframe/components/CampusGallery.tsx
"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { LifeSection, LifeSectionItem } from "../api/api";

interface CampusGalleryProps {
  section: LifeSection;
  items: LifeSectionItem[];
}

const CampusGallery: React.FC<CampusGalleryProps> = ({ section, items }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Combine all images from items
  const images = items.flatMap(item => 
    (item.image_urls || []).map((url, idx) => ({
      url,
      alt: item.title || `Gallery image ${idx + 1}`,
      size: getSizeClass(idx),
    }))
  );

  // If no images, use static fallback
  const displayImages = images.length > 0 ? images : [
    { url: "/campus-27.JPG", alt: "Pow Wow celebration", size: "large" },
    { url: "/fashion-2.JPG", alt: "Convocation ceremony", size: "tall" },
    { url: "/fashion-1.JPG", alt: "Students in knitting lab", size: "medium" },
    { url: "/images/gallery/1721738128651.jpg", alt: "Ethnic Day celebration", size: "medium" },
    { url: "/campus-32.JPG", alt: "Campus event", size: "medium" },
    { url: "/images/gallery/1721737896096.jpg", alt: "Campus activity", size: "medium" },
    { url: "/campus-29.jpg", alt: "Campus celebration", size: "tall" },
  ];

  function getSizeClass(index: number): string {
    const sizes = ['large', 'tall', 'medium', 'medium', 'medium', 'medium', 'tall'];
    return sizes[index % sizes.length];
  }

  const navigateGallery = (direction: number) => {
    if (selectedIndex !== null) {
      const newIndex = selectedIndex + direction;
      if (newIndex >= 0 && newIndex < displayImages.length) {
        setSelectedIndex(newIndex);
      }
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12">
      {/* Show section title if exists, otherwise static */}
      <h1 className="text-4xl font-bold mb-12">
        {section.title || "Gallery"}
      </h1>
      
      {/* Section description if exists */}
      {section.description && (
        <p className="text-lg text-gray-600 mb-8 max-w-3xl">
          {section.description}
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
        {displayImages.slice(0, 7).map((image, index) => (
          <div
            key={index}
            className={`${
              image.size === 'large'
                ? 'col-span-1 lg:col-span-2 aspect-[16/9]'
                : image.size === 'tall'
                ? 'aspect-[9/11]'
                : 'aspect-[4/3]'
            } relative group`}
          >
            <Image
              src={image.url}
              alt={image.alt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover rounded-lg cursor-pointer hover:scale-105 transition-transform duration-300"
              onClick={() => setSelectedIndex(index)}
              priority={index < 2}
            />
          </div>
        ))}
      </div>

      {/* Modal for fullscreen view */}
      {selectedIndex !== null && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-6xl">
            <Button
              variant="ghost"
              size="icon"
              className="absolute -top-16 right-0 text-white hover:bg-white/20 z-50"
              onClick={() => setSelectedIndex(null)}
            >
              <X className="h-6 w-6" />
            </Button>

            <div className="relative">
              <div className="relative w-full h-[80vh]">
                <Image
                  src={displayImages[selectedIndex].url}
                  alt={displayImages[selectedIndex].alt}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority
                />
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 disabled:opacity-50"
                onClick={() => navigateGallery(-1)}
                disabled={selectedIndex === 0}
              >
                <ChevronLeft className="h-8 w-8" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 disabled:opacity-50"
                onClick={() => navigateGallery(1)}
                disabled={selectedIndex === displayImages.length - 1}
              >
                <ChevronRight className="h-8 w-8" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampusGallery;