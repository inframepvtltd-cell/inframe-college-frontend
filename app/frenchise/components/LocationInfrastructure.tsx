
// "use client";
// import { useEffect, useState } from "react";
// import { MapPin, LayoutDashboard, Cpu, FileCheck2 } from "lucide-react";
// import { fetchSections, fetchSectionWithItems } from "../api";

// export default function LocationInfrastructure() {
//   const [heroSection, setHeroSection] = useState(null);
//   const [items, setItems] = useState([]);

//   // Static icons
//   const ICONS = [
//     <MapPin size={36} />,
//     <LayoutDashboard size={36} />,
//     <Cpu size={36} />,
//     <FileCheck2 size={36} />,
//   ];

//   useEffect(() => {
//     const loadSection = async () => {
//       try {
//         const sections = await fetchSections();
//         const section = sections.find(
//           (s) => s.section_type === "LOCATION"
//         );
//         if (!section) return;

//         setHeroSection(section);

//         const data = await fetchSectionWithItems(section.section_type);
//         setItems(data.items || []);
//       } catch (error) {
//         console.error("Error loading Location & Infrastructure section:", error);
//       }
//     };

//     loadSection();
//   }, []);

//   if (!heroSection) return null;

//   return (
//     <section className="relative py-16 sm:py-20 md:py-24 bg-yellow-50 overflow-hidden">
//       <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Section Header */}
//         <div className="text-center mb-12 sm:mb-16 md:mb-20">
//           <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-widest text-gray-800">
//             {heroSection.title}
//           </h2>
//           <p className="mt-4 text-gray-500 text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
//             {heroSection.description}
//           </p>
//         </div>

//         {/* Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
//           {items.map((item, idx) => (
//             <div
//               key={item.id}
//               className="group relative cursor-pointer bg-white/70 backdrop-blur-lg border border-white/40 p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition duration-500 hover:-translate-y-2 text-center"
//             >
//               {/* ICON */}
//               <div className="text-yellow-500 mb-4 sm:mb-6 flex justify-center">
//                 {ICONS[idx % ICONS.length]}
//               </div>

//               {/* TITLE */}
//               <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-gray-800 group-hover:text-yellow-600">
//                 {item.title}
//               </h3>

//               {/* DESCRIPTION */}
//               <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
//                 {item.content}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
"use client";
import { MapPin, LayoutDashboard, Cpu, FileCheck2 } from "lucide-react";

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

type LocationInfrastructureProps = {
  data: Section;
};

export default function LocationInfrastructure({
  data,
}: LocationInfrastructureProps) {
  if (!data || !data.items?.length) return null;

  const ICONS = [
    <MapPin size={36} />,
    <LayoutDashboard size={36} />,
    <Cpu size={36} />,
    <FileCheck2 size={36} />,
  ];

  return (
    <section className="relative py-16 sm:py-20 md:py-24 bg-yellow-50 overflow-hidden">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* SECTION HEADER */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <p className="uppercase tracking-[0.35em] text-yellow-600 font-bold text-xl mb-3">
            {data.section_type}
          </p>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-widest text-gray-800">
            {data.section_title}
          </h2>

          {data.description && (
            <p className="mt-4 text-gray-600 text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
              {data.description}
            </p>
          )}
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
          {data.items.map((item, idx) => (
            <div
              key={item.id}
              className="group cursor-pointer bg-white/80 backdrop-blur-lg border border-white/40 p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 text-center"
            >
              {/* ICON */}
              <div className="text-yellow-500 mb-4 sm:mb-6 flex justify-center group-hover:scale-110 transition duration-500">
                {ICONS[idx % ICONS.length]}
              </div>

              {/* TITLE */}
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-gray-800 group-hover:text-yellow-600 transition">
                {item.title}
              </h3>

              {/* DESCRIPTION */}
              {item.content && (
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  {item.content}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
