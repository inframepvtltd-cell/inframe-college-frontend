
// "use client";
// import { useEffect, useState } from "react";
// import { TrendingUp, Award, BookOpen, Users, ShieldCheck } from "lucide-react";
// import { fetchSections, fetchSectionWithItems } from "../api";

// export default function WhyFranchise() {
//   const [sectionType, setSectionType] = useState(null);
//   const [heroSection, setHeroSection] = useState(null);
//   const [reasons, setReasons] = useState([]);
//   const [heroBg, setHeroBg] = useState(null);

//   const ICON_MAP = {
//     Award: <Award size={36} />,
//     BookOpen: <BookOpen size={36} />,
//     Users: <Users size={36} />,
//     ShieldCheck: <ShieldCheck size={36} />,
//     TrendingUp: <TrendingUp size={36} />,
//   };

//   useEffect(() => {
//     const loadSection = async () => {
//       const sections = await fetchSections();
//       console.log("Sections", sections);

//       const whyFranchiseSection = sections.find(
//         (s) => s.section_type === "Why Partner With Us"
//       );

//       if (whyFranchiseSection) {
//         setSectionType(whyFranchiseSection.section_type);
//         setHeroSection(whyFranchiseSection); // main title & description
//       }
//     };

//     loadSection();
//   }, []);

//   useEffect(() => {
//     if (!sectionType) return;

//     const loadItems = async () => {
//       const data = await fetchSectionWithItems(sectionType);

//       setReasons(data.items || []);

//           setHeroBg(data.section?.bg_image || null);

//     };

//     loadItems();
//   }, [sectionType]);

//   return (
//     <>
//       {/* ================= HERO IMAGE ================= */}
//       {heroSection && (
//         <section className="relative h-105 w-full overflow-hidden">
//           {heroBg && (
//             <img
//               src={heroBg}
//               alt="Why Franchise Inframe"
//               className="absolute inset-0 w-full h-full object-cover"
//             />
//           )}

//           <div className="absolute inset-0 bg-black/60" />

//           <div className="relative z-10 h-full flex items-center">
//             <div className="max-w-7xl mx-auto px-6">
//               <p className="text-yellow-600 font-bold uppercase tracking-wide text-xl mb-2">
//                 {heroSection.section_type}
//               </p>
//               <h2 className="text-4xl sm:text-5xl font-extrabold text-white max-w-3xl">
//                 {heroSection.title}
//               </h2>
//               <p className="text-white/90 max-w-2xl mt-4 text-lg">
//                 {heroSection.description}
//               </p>
//             </div>
//           </div>
//         </section>
//       )}

//       {/* ================= CONTENT SECTION ================= */}
//       <section className="py-16 bg-linear-to-br bg-yellow-50">
//         <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-8">
//             {reasons.map((item, idx) => (
//               <div
//                 key={idx}
//                 className="group flex items-start gap-3 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
//               >
//                 <div className="w-14 h-14 rounded-full bg-red-50 text-yellow-600 flex items-center justify-center shrink-0">
//                   {ICON_MAP[item.icon] || <Award size={36} />}
//                 </div>
//                 <div>
//                   <h3 className="text-lg sm:text-xl font-bold group-hover:text-yellow-600 mb-1">
//                     {item.title}
//                   </h3>
//                   <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
//                     {item.content}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }
"use client";
import { TrendingUp, Award, BookOpen, Users, ShieldCheck } from "lucide-react";
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

type WhyFranchiseProps = {
  data: Section;
};

export default function WhyFranchise({ data }: WhyFranchiseProps) {
  const ICON_MAP: Record<string, ReactNode> = {
    Award: <Award size={36} />,
    BookOpen: <BookOpen size={36} />,
    Users: <Users size={36} />,
    ShieldCheck: <ShieldCheck size={36} />,
    TrendingUp: <TrendingUp size={36} />,
  };

  if (!data || !data.items?.length) return null;

  return (
    <>
      {/* ================= HERO ================= */}
      <section className="relative h-105 w-full overflow-hidden">
        {data.bg_image && (
          <img
            src={data.bg_image}
            alt="Why Franchise Inframe"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6">
            <p className="text-yellow-600 font-bold uppercase tracking-wide text-xl mb-2">
              {data.section_type}
            </p>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white max-w-3xl">
              {data.section_title}
            </h2>
            {data.description && (
              <p className="text-white/90 max-w-2xl mt-4 text-lg">
                {data.description}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <section className="py-16 bg-linear-to-br bg-yellow-50">
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-8">
            {data.items.map((item) => (
              <div
                key={item.id}
                className="group flex items-start gap-3 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-full bg-red-50 text-yellow-600 flex items-center justify-center shrink-0">
                  {ICON_MAP[item.icon || ""] || <Award size={36} />}
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-bold group-hover:text-yellow-600 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                    {item.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
