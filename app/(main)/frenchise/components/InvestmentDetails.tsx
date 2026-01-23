
// "use client";

// export default function InvestmentDetails({ data }) {
//   if (!data || !data.items) return null;

//   const { section_title, description, bg_image, items } = data;

//   return (
//     <section className="relative bg-yellow-50 py-12 sm:py-16 md:py-20 overflow-hidden">
//       {/* BACKGROUND IMAGE */}
//       {bg_image && (
//         <>
//           <img
//             src={bg_image}
//             alt={section_title || "Investment Plan"}
//             className="absolute inset-0 w-full h-full object-cover"
//           />
//           <div className="absolute inset-0 bg-black/40" />
//         </>
//       )}

//       {/* CONTENT */}
//       <div className="relative z-10 w-full max-w-screen-2xl mx-auto px-6 sm:px-8 md:px-12">
//         {/* SECTION HEADER */}
//         <div className="mb-12 sm:mb-16 text-center">
//           <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4">
//             {section_title}
//           </h1>
//           {description && (
//             <p className="text-white/90 text-lg sm:text-xl max-w-2xl mx-auto">
//               {description}
//             </p>
//           )}
//         </div>

//         {/* CARDS */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 md:gap-8">
//           {items.map((card) => (
//             <div
//               key={card.id}
//               className="group bg-white/85 backdrop-blur-lg border border-white/40
//               rounded-2xl p-5 sm:p-6 shadow-md hover:shadow-xl
//               transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03]"
//             >
//               <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 text-gray-800 group-hover:text-yellow-600">
//                 {card.title}
//               </h3>
//               <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed">
//                 {card.content}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
"use client";

interface InvestmentItem {
  id: number | string;
  title: string;
  content: string;
}

interface InvestmentDetailsData {
  section_title?: string;
  description?: string;
  bg_image?: string;
  items: InvestmentItem[];
}

interface InvestmentDetailsProps {
  data?: InvestmentDetailsData;
}

export default function InvestmentDetails({ data }: InvestmentDetailsProps) {
  if (!data || !data.items) return null;

  const { section_title, description, bg_image, items } = data;

  return (
    <section className="relative bg-yellow-50 py-12 sm:py-16 md:py-20 overflow-hidden">
      {/* BACKGROUND IMAGE */}
      {bg_image && (
        <>
          <img
            src={bg_image}
            alt={section_title || "Investment Plan"}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </>
      )}

      {/* CONTENT */}
      <div className="relative z-10 w-full max-w-screen-2xl mx-auto px-6 sm:px-8 md:px-12">
        {/* SECTION HEADER */}
        <div className="mb-12 sm:mb-16 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4">
            {section_title}
          </h1>

          {description && (
            <p className="text-white/90 text-lg sm:text-xl max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 md:gap-8">
          {items.map((card) => (
            <div
              key={card.id}
              className="group bg-white/85 backdrop-blur-lg border border-white/40
              rounded-2xl p-5 sm:p-6 shadow-md hover:shadow-xl
              transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03]"
            >
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 text-gray-800 group-hover:text-yellow-600">
                {card.title}
              </h3>
              <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed">
                {card.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
