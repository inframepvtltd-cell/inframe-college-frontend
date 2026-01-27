
"use client";
import { Check } from "lucide-react";
import { useState } from "react";
import FranchiseEnquiryFormOnly from "./FranchiseEnquiryFormOnly";

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
  bg_image?: string; 
  items: SectionItem[];
};

type WhyStudentsChooseProps = {
  data: Section;
};

export default function WhyStudentsChoose({ data }: WhyStudentsChooseProps) {
  const [open, setOpen] = useState(false);

  if (!data || !data.items?.length) return null;

  return (
    <section className="relative">
      <div className="relative bg-yellow-50 py-16 md:py-24 overflow-hidden">
        {data.bg_image && (
          <div className="absolute inset-0 z-0">
            <img
              src={`${data.bg_image}`}
              alt="Hero Background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
        )}
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 sm:py-36 text-center">
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
      </div>

      <div className="relative bg-yellow-50">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 -mt-16 lg:-mt-20">
          {/* Grid Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
            {data.items.map((item) => (
              <div
                key={item.id}
                className="group flex flex-col items-start gap-3 p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-100 h-full"
              >
                <div className="flex items-start gap-3">
                  <div className="bg-yellow-50 p-2 rounded-lg shrink-0">
                    <Check className="text-yellow-600 w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-gray-900 font-bold text-lg group-hover:text-yellow-600 transition-colors">
                      {item.title}
                    </h3>
                    {item.content && (
                      <p className="text-gray-600 text-base leading-relaxed mt-2">
                        {item.content}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <button
              onClick={() => setOpen(true)} 
              className="mt-6 inline-block bg-yellow-500 text-black px-8 py-4 rounded-xl font-semibold hover:bg-yellow-600 transition cursor-pointer animate-pop-in delay-400"
            >
              Enquire Now
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="relative bg-white w-full max-w-xl rounded-2xl p-6 shadow-xl">
            {/* Close button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-black text-2xl"
            >
              ✕
            </button>

            <FranchiseEnquiryFormOnly
              enableDownload={false} 
              submitLabel="Enquiry Now"
              onClose={() => setOpen(false)}
            />
          </div>
        </div>
      )}
    </section>
  );
}