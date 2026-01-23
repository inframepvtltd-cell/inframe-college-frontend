
// "use client";
// import { useEffect, useState } from "react";
// import { TrendingUp, IndianRupee, Layers, GitBranch } from "lucide-react";
// import { fetchSections, fetchSectionWithItems } from "../api";

// export default function ReturnsGrowth() {
//   const [heroSection, setHeroSection] = useState(null);
//   const [items, setItems] = useState([]);

//   // Static icon mapping for known items
//   const ICON_MAP = {
//     "Break-even Period": <TrendingUp size={36} />,
//     "Average ROI": <IndianRupee size={36} />,
//     "Revenue Streams": <Layers size={36} />,
//     "Expansion Opportunities": <GitBranch size={36} />,
//   };

//   useEffect(() => {
//     const loadSection = async () => {
//       try {
//         // 1️⃣ Fetch all sections
//         const sections = await fetchSections();

//         // 2️⃣ Find the Returns & Growth section dynamically
//         const returnsSection = sections.find(
//           s => s.section_type === "RETURNS and GROWTH POTENTIAL"
//         );

//         if (!returnsSection) return;

//         // 3️⃣ Set hero section data
//         setHeroSection(returnsSection);

//         const data = await fetchSectionWithItems(returnsSection.section_type);
//         setItems(data.items || []);
//       } catch (error) {
//         console.error("Error loading Returns & Growth section:", error);
//       }
//     };

//     loadSection();
//   }, []);

//   if (!heroSection) return null; // wait for data

//   return (
//     <section className="relative py-16 sm:py-20 md:py-24 bg-yellow-50 overflow-hidden">
//       {/* Decorative background blobs */}
//       <div className="absolute -top-24 -left-24 w-72 h-72 sm:w-96 sm:h-96 rounded-full blur-3xl opacity-30" />
//       <div className="absolute bottom-0 -right-24 w-72 h-72 sm:w-96 sm:h-96 rounded-full blur-3xl opacity-20" />

//       {/* Hero / Section Header */}
//       <div className="relative max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
//         <div className="text-center mb-12 sm:mb-16 md:mb-20">
//           <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-widest text-gray-900">
//             {heroSection.title}
//           </h2>
//           <p className="mt-4 text-gray-700 text-base sm:text-lg md:text-xl">
//             {heroSection.description}
//           </p>
//         </div>

//         {/* Items / Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10">
//           {items.map(item => (
//             <div
//               key={item.id}
//               className="group relative cursor-pointer
//                 bg-white/70 backdrop-blur-lg
//                 border border-white/40
//                 rounded-3xl p-5 sm:p-6 md:p-8
//                 shadow-lg hover:shadow-2xl
//                 transition-all duration-500
//                 hover:-translate-y-2 hover:scale-105
//                 text-center"
//             >
//               <div className="flex justify-center text-yellow-500 mb-4 sm:mb-6 relative z-10">
//                 {ICON_MAP[item.title] || <TrendingUp size={36} />}
//               </div>

//               <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-4 text-gray-800 relative z-10 group-hover:text-yellow-600">
//                 {item.title}
//               </h3>

//               <p className="text-gray-700 text-sm sm:text-base md:text-base leading-relaxed relative z-10">
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
import { TrendingUp, IndianRupee, Layers, GitBranch } from "lucide-react";
import { ReactNode } from "react";

type SectionItem = {
  id: string;
  title: string;
  content: string;
  icon?: string;
};

type Section = {
  section_id: string;
  section_type: string;
  section_title: string;
  description?: string;
  items: SectionItem[];
};

type ReturnsGrowthProps = {
  data: Section;
};

export default function ReturnsGrowth({ data }: ReturnsGrowthProps) {
  const ICON_MAP: Record<string, ReactNode> = {
    "Break-even Period": <TrendingUp size={36} />,
    "Average ROI": <IndianRupee size={36} />,
    "Revenue Streams": <Layers size={36} />,
    "Expansion Opportunities": <GitBranch size={36} />,
  };

  if (!data || !data.items?.length) return null;

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-yellow-50">
      {/* Section Header */}
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 text-center mb-12 sm:mb-16 md:mb-20">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-widest text-gray-900">
          {data.section_title}
        </h2>
        {data.description && (
          <p className="mt-4 text-gray-700 text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
            {data.description || "irfan"}
          </p>
        )}
      </div>

      {/* Items / Cards */}
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10">
        {data.items.map((item) => (
          <div
            key={item.id}
            className="group relative cursor-pointer
              bg-white/70 backdrop-blur-lg
              border border-white/40
              rounded-3xl p-5 sm:p-6 md:p-8
              shadow-lg hover:shadow-2xl
              transition-all duration-500
              hover:-translate-y-2 hover:scale-105
              text-center"
          >
            <div className="flex justify-center text-yellow-500 mb-4 sm:mb-6">
              {ICON_MAP[item.title] || <TrendingUp size={36} />}
            </div>

            <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-4 text-gray-800 group-hover:text-yellow-600">
              {item.title}
            </h3>

            <p className="text-gray-700 text-sm sm:text-base md:text-base leading-relaxed">
              {item.content}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
