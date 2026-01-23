"use client";
import { Check } from "lucide-react";
import { ReactNode } from "react";

type SectionItem = {
  id: string;
  title: string;
  content: string;
  icon?: string;
  image_url?: string;
};

type Section = {
  section_id: string;
  section_type: string;
  section_title: string;
  description?: string;
  bg_image?: string;
  items: SectionItem[];
};

type FranchiseWhatsIncludedProps = {
  data: Section;
};

export default function FranchiseWhatsIncluded({ data }: FranchiseWhatsIncludedProps) {
  if (!data || !data.items?.length) return null;

  return (
    <section className="py-16 bg-yellow-50">
      {/* HERO SECTION */}
     <div className="relative w-full mb-12">
  <div className="text-center max-w-7xl mx-auto px-6">
    <p className="uppercase tracking-[0.35em] text-yellow-600 font-bold text-2xl mb-2">
      {data.section_type}
    </p>
    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-2">
      {data.section_title}
    </h2>
    {data.description && (
      <p className="text-gray-600 text-lg sm:text-xl max-w-2xl mx-auto">
        {data.description}
      </p>
    )}
  </div>
</div>


      {/* ITEMS SECTION */}
      <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {data.items.map((item) => (
            <div
              key={item.id}
              className="group flex items-start gap-3 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              <Check className="text-yellow-500 w-6 h-6 mt-1 shrink-0" />
              <span className="text-gray-800 font-semibold text-lg leading-relaxed group-hover:text-yellow-600">
                {item.content}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
