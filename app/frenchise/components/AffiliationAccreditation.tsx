"use client";
import React from "react";
import { Check } from "lucide-react";
import Image from "next/image";

type SectionItem = {
  id: string;
  title: string;
  content?: string;
  image_urls?: string[];
};

type Section = {
  section_id: string;
  section_type: string;
  section_title: string;
  description?: string;
  items: SectionItem[];
};

type AffiliationAccreditationProps = {
  data: Section;
};

export default function AffiliationAccreditation({ data }: AffiliationAccreditationProps) {
  if (!data || !data.items?.length) return null;

  return (
    <section className="relative py-16 bg-yellow-50">
      {/* Background blobs */}
      <div className="absolute -top-24 -left-24 w-56 sm:w-80 h-56 sm:h-80 rounded-full blur-3xl opacity-30" />
      <div className="absolute bottom-0 -right-24 w-56 sm:w-80 h-56 sm:h-80 rounded-full blur-3xl opacity-20" />

      {/* HERO SECTION */}
      <div className="relative w-full mb-12 text-center max-w-7xl mx-auto px-6">
        <p className="uppercase tracking-[0.35em] text-yellow-600 font-bold text-2xl mb-2">
          {data.section_type}
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-2">
          {data.section_title}
        </h2>
        {data.description && (
          <p className="text-gray-600 text-lg sm:text-xl max-w-2xl mx-auto">
            {data.description}
          </p>
        )}
      </div>

      {/* ITEMS GRID */}
      <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
          {data.items.map(item => (
            <div
              key={item.id}
              className="group flex flex-col bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden"
            >
              {/* IMAGE */}
              {item.image_urls && item.image_urls.length > 0 && (
                <div className="w-full h-48 relative">
                  <Image
                    src={`${item.image_urls[0]}`} 
                    alt={item.title}
                    fill
    className="object-contain transition-transform duration-500 group-hover:scale-105 p-4"
                  />
                </div>
              )}

              {/* ICON + CONTENT */}
              {/* <div className="flex items-start gap-3 p-6">
                {(!item.image_urls || item.image_urls.length === 0) && (
                  <Check className="text-yellow-500 w-6 h-6 mt-1 shrink-0" />
                )}
                <div className="flex flex-col">
                  <h3 className="text-gray-800 font-bold text-lg group-hover:text-yellow-600">
                    {item.title}
                  </h3>
                  {item.content && (
                    <p className="text-gray-700 text-base leading-relaxed mt-1">
                      {item.content}
                    </p>
                  )}
                </div>
              </div> */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
