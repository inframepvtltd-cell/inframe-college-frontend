
"use client";
import { Check } from "lucide-react";

type SectionItem = {
  id: string;
  title: string;
  content?: string;
};

type Section = {
  section_id: string;
  section_type: string;
  section_title: string;
  description?: string;
  bg_image?: string; // hero background
  items: SectionItem[];
};

type WhyStudentsChooseProps = {
  data: Section;
};

export default function WhyStudentsChoose({ data }: WhyStudentsChooseProps) {
  if (!data || !data.items?.length) return null;

  return (
    <section className="relative py-16 bg-yellow-50 overflow-hidden">
      {/* HERO SECTION */}
      {data.bg_image && (
        <div className="absolute inset-0">
          <img
            src={`${data.bg_image}`}
            alt="Hero Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" /> {/* dark overlay */}
        </div>
      )}

      <div className="relative max-w-7xl mx-auto px-6 py-28 sm:py-36 text-center">
        <p className="uppercase tracking-[0.35em] text-yellow-400 text-2xl font-bold mb-4">
          {data.section_type}
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4">
          {data.section_title}
        </h2>
        {data.description && (
          <p className="text-white/90 text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
            {data.description}
          </p>
        )}
      </div>

      {/* ITEMS GRID */}
      <div className="relative max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {data.items.map((item) => (
            <div
              key={item.id}
              className="group flex items-start gap-3 p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              <Check className="text-yellow-500 w-6 h-6 mt-1 shrink-0" />
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
