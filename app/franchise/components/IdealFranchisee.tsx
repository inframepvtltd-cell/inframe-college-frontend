// "use client";
// import {
//   GraduationCap,
//   Briefcase,
//   HeartHandshake,
//   Clock,
//   Wallet,
//   Users,
// } from "lucide-react";

// export default function IdealFranchisee() {
//   const profileData = [
//     {
//       icon: <GraduationCap size={32} />,
//       title: "Education Background",
//       desc: "Preferred background in education, design, or management, but not mandatory for motivated entrepreneurs.",
//     },
//     {
//       icon: <Briefcase size={32} />,
//       title: "Business Mindset",
//       desc: "Strong entrepreneurial mindset with the ability to manage operations, teams, and growth strategies.",
//     },
//     {
//       icon: <HeartHandshake size={32} />,
//       title: "Passion for Education & Design",
//       desc: "Genuine interest in education, creativity, and skill development to drive student success.",
//     },
//     {
//       icon: <Clock size={32} />,
//       title: "Time Involvement",
//       desc: "Hands-on involvement required, especially during initial setup and operational phases.",
//     },
//     {
//       icon: <Wallet size={32} />,
//       title: "Financial Capability",
//       desc: "Adequate financial capacity to invest, sustain operations, and scale the business responsibly.",
//     },
//     {
//       icon: <Users size={32} />,
//       title: "Team Leadership Skills",
//       desc: "Ability to lead, mentor, and motivate a team to ensure operational efficiency and student success.",
//     },
//   ];

//   return (
//     <section className="bg-linear-to-br bg-yellow-50 py-16 sm:py-20 md:py-24">
//       <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
//         <div className="text-center mb-12 sm:mb-16 md:mb-20">
//           <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-widest text-gray-900">
//             IDEAL FRANCHISEE PROFILE
//           </h2>
//           <p className="mt-4 text-gray-700 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
//             We partner with individuals aligned in vision, commitment, and
//           </p>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
//           {profileData.map((item, idx) => (
//             <div
//               key={idx}
//               className="group bg-white/80 backdrop-blur-lg border border-white/40 rounded-2xl p-6 sm:p-7 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 cursor-pointer"
//             >
//               {/* ICON + HEADING */}
//               <div className="flex items-center gap-4 mb-3">
//                 <div className="w-14 h-14 flex items-center justify-center rounded-full bg-red-50 text-yellow-500 group-hover:scale-110 transition duration-500">
//                   {item.icon}
//                 </div>
//                 <h3 className="text-lg sm:text-xl font-semibold group-hover:text-yellow-600 leading-tight">
//                   {item.title}
//                 </h3>
//               </div>

//               {/* DESCRIPTION */}
//               <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
//                 {item.desc}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
"use client";
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
  bg_image?: string;
  items: SectionItem[];
};

type IdealFranchiseeProps = {
  data: Section;
};

export default function IdealFranchisee({ data }: IdealFranchiseeProps) {
  if (!data || !data.items?.length) return null;

  return (
    <section className="py-16 bg-yellow-50">
      {/* HERO SECTION */}
      <div className="relative w-full mb-12 text-center max-w-7xl mx-auto px-6">
        <p className="uppercase tracking-[0.35em] text-yellow-600 font-bold text-2xl mb-2">
          {data.section_type}
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-2">
          {data.section_title}
        </h2>
        {data.description && (
          <p className="text-gray-600 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            {data.description}
          </p>
        )}
      </div>

      {/* ITEMS GRID */}
      <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {data.items.map((item) => (
            <div
              key={item.id}
              className="group flex flex-col bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden"
            >
              {/* IMAGE */}
              {item.image_urls && item.image_urls.length > 0 && (
                <div className="w-full h-48 relative">
                  <Image
                    src={`${item.image_urls[0]}?t=${new Date().getTime()}`} // cache-busting
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              )}

              {/* ICON + CONTENT */}
              <div className="flex items-start gap-3 p-6">
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
