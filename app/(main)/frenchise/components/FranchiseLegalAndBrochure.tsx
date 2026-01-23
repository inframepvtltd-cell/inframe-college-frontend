
// "use client";
// import { useEffect, useState } from "react";
// import { Scale, ShieldAlert, FileWarning, Download } from "lucide-react";
// import { fetchSections, fetchSectionWithItems } from "../api";

// export default function FranchiseLegalAndBrochure() {
//   const [legalSection, setLegalSection] = useState(null);
//   const [legalItems, setLegalItems] = useState([]);
//   const [academicSection, setAcademicSection] = useState(null);
// const [academicItems, setAcademicItems] = useState([]); // Add this

//   const ICONS = [
//     <Scale size={26} />,
//     <ShieldAlert size={26} />,
//     <FileWarning size={26} />,
//   ];

//   useEffect(() => {
//     const loadData = async () => {
//       const sections = await fetchSections();

//       // 🔹 LEGAL SECTION
//       const legal = sections.find(
//         s => s.section_type === "LEGAL and DISCLAIMER"
//       );
//       if (legal) {
//         setLegalSection(legal);
//         const legalData = await fetchSectionWithItems(legal.section_type);
//         setLegalItems(legalData.items || []);
//       }

//       // 🔹 ACADEMIC SECTION
//       const academic = sections.find(
//         s => s.section_type === "ACADEMIC"
//       );
//       if (academic) {
//   setAcademicSection(academic);
//   const academicData = await fetchSectionWithItems(academic.section_type);
//   setAcademicItems(academicData.items || []); // ✅ Set items
//   console.log("Acadmic Data",academicData.items)
// }
//     };

//     loadData();
//   }, []);
// return (
//   <section className="py-16 bg-yellow-50">
//     <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">

//       {/* ================= LEGAL & DISCLAIMER ================= */}
//       <div className="bg-white rounded-3xl p-8 shadow-lg">
//         <h2 className="text-2xl font-bold mb-8 tracking-widest">
//           {legalSection?.section_type}
//         </h2>

//         <div className="space-y-6">
//           {legalItems.map((item, idx) => (
//             <div key={item.id} className="flex gap-4">
//               <div className="text-yellow-500">
//                 {ICONS[idx % ICONS.length]}
//               </div>
//               <div>
//                 <h3 className="font-semibold">{item.title}</h3>
//                 <p className="text-gray-600">{item.content}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* ================= ACADEMIC SECTION ================= */}
//   <div className="flex flex-col gap-8">
//       {academicItems.map((item) => (
//         <div key={item.id} className="bg-white rounded-3xl p-8 text-center shadow-lg">
//           {/* Title & Description */}
//           <h2 className="text-2xl font-bold tracking-widest">{item.title}</h2>
//           <p className="text-gray-600 mt-4">{item.content}</p>

//           {/* PDF Download Button */}
//           {item.pdf_url && (
//             <a
//               href={item.pdf_url}
//               download
//               className="inline-flex mt-6 items-center gap-2 bg-yellow-400 text-white px-6 py-3 rounded-xl"
//             >
//               <Download size={20} />
//               Download PDF
//             </a>
//           )}

//           {/* Call Button */}
//           {item.call_number && (
//             <a
//               href={`tel:${item.call_number}`}
//               className="inline-block mt-4 bg-yellow-400 text-white px-6 py-3 rounded-xl"
//             >
//               Schedule a Call
//             </a>
//           )}
//         </div>
//       ))}
//     </div>
  



//     </div>
//   </section>
// );
// }
"use client";
import { Scale, ShieldAlert, FileWarning, Download } from "lucide-react";

type Item = {
  id?: string;
  title: string;
  content?: string;
  pdf_url?: string;
  image_urls?:string[];
  call_number?: string;
};

type Section = {
  section_title?: string;
  items?: Item[];
};

interface Props {
  legalSection: Section | null;
  academicSection: Section | null;
}

export default function FranchiseLegalAndBrochure({
  legalSection,
  academicSection,
}: Props) {
  const legalItems = legalSection?.items || [];
  const academicItems = academicSection?.items || [];

  const ICONS = [<Scale size={26} />, <ShieldAlert size={26} />, <FileWarning size={26} />];

  return (
  <section className="py-16 bg-yellow-50">
  <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">

    {/* ================= LEGAL & DISCLAIMER ================= */}
    {legalItems.length > 0 && (
      <div className="bg-white rounded-3xl p-8 shadow-lg">
        <h2 className="text-2xl font-bold mb-8 tracking-widest">
          {legalSection?.section_title || "LEGAL & DISCLAIMER"}
        </h2>

        <div className="space-y-6">
          {legalItems.map((item, idx) => (
            <div key={item.id || idx} className="flex gap-4">
              <div className="text-yellow-500 mt-1">
                {ICONS[idx % ICONS.length]}
              </div>
              <div>
                <h3 className="font-semibold">{item.title}</h3>
                {item.content && <p className="text-gray-600">{item.content}</p>}

                {/* Optional PDF & Call Buttons */}
                <div className="flex flex-col gap-2 mt-2">
                  {item.pdf_url && (
                    <a
                      href={item.pdf_url}
                      download
                      className="inline-flex mt-2 items-center gap-2 bg-yellow-400 text-white px-6 py-3 rounded-xl"
                    >
                      <Download size={20} /> Download PDF
                    </a>
                  )}
                
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )}

    {/* ================= ACADEMIC SECTION ================= */}
    {academicItems.length > 0 && (
      <div className="flex flex-col gap-8">
        {academicItems.map((item) => (
          <div key={item.id} className="bg-white rounded-3xl p-8 text-center shadow-lg">
            <h2 className="text-2xl font-bold tracking-widest">{item.title}</h2>
            {item.content && <p className="text-gray-600 mt-4">{item.content}</p>}

            {/* PDF Download Button */}
          {/* PDF Download Button */}
{item.image_urls && item.image_urls.length > 0 && (
  <a
    href={item.image_urls[0]} 
    download
    className="inline-flex mt-6 items-center gap-2 bg-yellow-400 text-white px-6 py-3 rounded-xl"
  >
    <Download size={20} /> Download PDF
  </a>
)}


            {/* Call Button */}
            {item.call_number && (
              <a
                href={`tel:${item.call_number}`}
                className="inline-block mt-4 bg-yellow-400 text-white px-6 py-3 rounded-xl"
              >
                Schedule a Call
              </a>
            )}
          </div>
        ))}
      </div>
    )}

  </div>
</section>

  );
}
