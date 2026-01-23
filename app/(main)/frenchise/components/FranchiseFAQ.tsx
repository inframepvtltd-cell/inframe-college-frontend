// "use client";

// import { ChevronDown } from "lucide-react";
// import { useState } from "react";

// export default function FranchiseFAQ() {
//   const faqs = [
//     {
//       q: "What is Inframe School?",
//       a: "Inframe School of Art, Design & Business is a creative education institute blending industry-relevant skills, hands-on learning, and career outcomes in design, business, and digital fields like UI/UX, interior, animation, graphic design, digital marketing, jewelry design, etc. ",
//     },
//     {
//       q: "What makes Inframe different from other design institutes?",
//       a: "Inframe isn't about certificates. It's about real skill development, portfolio building, industry partnerships, and placements. Students work with tools and projects that reflect real job requirements, not outdated theory.",
//     },
//     {
//       q: "How long has Inframe been operating — is this a new or established brand?",
//       a: "Inframe has been running long enough to build curriculum, industry ties, and student outcomes (operational since before franchise launch). It was established by the Inframe Educational Society under the Rajasthan Societies Act. ",
//     },
//     {
//       q: "Why choose Inframe over other education franchises",
//       a: "Because Inframe focuses on creative and career skills that are in demand. The curriculum is developed with industry partners, placements, internships, and real projects — not just classroom theory. That gives your center actual value in the market. ",
//     },
//     {
//       q: "Is there genuine market demand for Inframe's courses?",
//       a: "Yes — students enroll in degree, diploma, and professional programs spanning multiple design and digital fields. These skills are needed by studios, agencies, consultancies, and freelance markets.",
//     },
//     {
//       q: "What franchise formats are available",
//       a: "Inframe offers scalable models:\n\n• School Campus Model (full-scale with labs & classrooms)\n• Training Center Model (mid-scale)\n• Studio / Skill Hub Model (compact, lower investment)\n\nEach has different space & investment requirements.\nWell share specifics based on your city and budget.",
//     },
//     {
//       q: "How do I choose the right model for my city and budget?",
//       a: "We recommend based on your investment capacity, city profile, expected student demand, and your involvement level. We wont sell you the biggest model if it doesnt make financial sense.",
//     },
//     {
//       q: "What is the total investment range?",
//       a: "Typical investment ranges from ₹5 lakh to ₹10 lakh+, depending on model, space, equipment, and setup. This is approximate and will vary by city and infrastructure cost.",
//     },
//     {
//       q: "Are there franchise fees or royalties?",
//       a: "Yes — there's a franchise fee and ongoing fees tied to support systems and brand licensing. These cover academic updates, marketing support, technology platforms, and centralized resources. You get structure, not guesswork.",
//     },
//     {
//       q: "Do you provide exact cost figures upfront?",
//       a: "Yes. We will share detailed investment sheets when you apply — including setup, interiors, equipment, marketing, and working capital. No “contact us for details” placeholders.",
//     },
//     {
//       q: "What is a realistic break-even timeline?",
//       a: "Typically 12-24 months — it depends on location, marketing execution, admissions, and cost control. If someone promises ultra-fast break-even, treat that with skepticism.",
//     },
//     {
//       q: "What revenue streams does a franchise center have?",
//       a: "Multiple :\n\n• Degree, diploma & professional courses\n• Short-term certification programs\n• Workshops & skill programs\n• School & college tie-ups\n• Portfolio and specialization modules\n\nThis diversified structure ensures long-term sustainability.",
//     },
//     {
//       q: "Can I expand to multiple centers later?",
//       a: "Yes. If your first center performs consistently, you get priority rights for expansion into multiple cities or formats.",
//     },
//     {
//       q: "What kind of support do I actually get?",
//       a: "We provide :\n\n• Curriculum & syllabus frameworks\n• Faculty hiring guidelines\n• Marketing creatives & campaigns\n• LMS/CRM/technology setup\n• SOPs for admissions & operations\n• Ongoing mentoring and quality checks\n\n We don't just hand you a brand and disappear.",
//     },
//     {
//       q: "Will Inframe help with admissions and student outreach?",
//       a: "Yes — we support strategy, campaigns, materials, and enrollment systems. Execution still rests with your local team.",
//     },
//     {
//       q: "Do I need an education background?",
//       a: " No. But you must take education seriously, not treat it as a side hustle.",
//     },
//     {
//       q: "How involved do I need to be?",
//       a: "Initially, hands-on involvement is essential — especially on admissions, operations, faculty hiring, and early marketing. Distance owners usually underperform.",
//     },
//     {
//       q: "Who should NOT invest?",
//       a: "If you're looking for passive income, no involvement, or guaranteed enrollments, this isn't for you. Inframe wants partners who are committed to quality education and business discipline.",
//     },
//     {
//       q: "What are the space & infrastructure requirements?",
//       a: "Space requirements differ by model, but all centers must have:\n\n• Classrooms\n• Computer labs with design-capable systems\n• Reception & visibility area\n• Stable internet + power backup\n\nInframe provides detailed specs after your inquiry.",
//     },
//     {
//       q: "What software & hardware do I need?",
//       a: " Professional design software (Adobe, Autodesk, etc.) and capable workstations are essential. Cutting corners here directly hurts student experience and credibility. ",
//     },
//     {
//       q: "How do I apply?",
//       a: "It's a structured path:\n\n• Fill franchise enquiry form\n• Screening call\n• Detailed business discussion\n• Location feasibility review\n• Agreement & onboarding\n• Setup, training, launch\n\nNo endless loops — clarity at every step.",
//     },
//     {
//       q: "Is the franchise legally compliant?",
//       a: "Yes — brand usage, agreements, and operational standards are clearly defined. We protect both parties.",
//     },
//     {
//       q: "Are earnings guaranteed?",
//       a: "No. Anyone promising guaranteed income is selling fairy tales. Your financial outcome depends on execution, location, admissions, and quality delivery.",
//     },
//     {
//       q: "What benefits do students get?",
//       a: "Students gain:\n\n• Real industry-aligned curriculum\n• Project portfolios\n• Mentorship and workshops\n• Placement and internship assistance\n• Industry certifications\n\nThat's what creates meaningful value — and what sells enrollments.",
//     },
//     {
//       q: "Is placement genuinely supported?",
//       a: "Yes — Inframe provides placement assistance, backed by industry partnerships and networks.",
//     },
//     {
//       q: "Is creative education just a trend or a long-term business?",
//       a: "Short answer: long-term.\n\nDesign, digital media, UI/UX, animation, CAD, interior, and business design skills are now core requirements across industries. Traditional degrees alone aren't delivering employability—skills are. That gap isn't closing anytime soon.",
//     },
//     {
//       q: "What happens if a new competitor opens nearby?",
//       a: "Competition is inevitable. Weak institutes compete on price.\n\nInframe competes on outcomes, curriculum depth, brand positioning, and student trust. If your delivery quality drops, competition will beat you—brand won't save poor execution.",
//     },
//     {
//       q: "How dependent is the business on the local team?",
//       a: "Very.\n\nEducation is people-driven. Faculty quality, counsellor honesty, and daily discipline decide your success more than ads or hoardings. Inframe provides systems, but you must enforce standards locally.",
//     },
//     {
//       q: "Why would students choose an Inframe franchise over a local institute?",
//       a: "Because Inframe offers:\n\n• Structured curriculum (not random topics)\n• Industry exposure & workshops\n• Portfolio-centric learning\n• Career guidance & placement assistance\n• Brand credibility beyond one city\n\nParents don't trust unknown institutes easily. Brand matters.",
//     },
//     {
//       q: "Do students enroll for long-term programs or only short courses?",
//       a: "Both—and that's a strength.\n\n• Long-term programs build revenue stability\n• Short-term courses and workshops bring cash flow and lead generation\n\nBalanced centers survive downturns better.",
//     },
//     {
//       q: "How do you handle parents who only care about placements?",
//       a: "By being honest.\n\n• Placements depend on student performance + market conditions\n• Inframe supports placement assistance, not fake guarantees\n\nSerious parents respect transparency more than false promises.",
//     },
//     {
//       q: "How many staff members are typically required?",
//       a: "Depends on model, but usually:\n\n• 1-2 counsellors\n• 2-5 faculty (full-time + visiting)\n• 1 admin / coordinator\n\nUnderstaffing kills student experience. Overstaffing kills margins. Balance matters.",
//     },
//     {
//       q: "How hard is faculty hiring?",
//       a: "It's challenging everywhere—not just Inframe.\nThat's why we assist with:\n\n• Faculty profiles & hiring criteria\n• Interview guidance\n• Training & onboarding frameworks\n\nBut no brand can magically create good teachers. You must be selective.",
//     },
//     {
//       q: "What if faculty leaves suddenly?",
//       a: "That's reality in education.\nInframe mitigates risk through:\n\n• Curriculum continuity\n• Teaching SOPs\n• Backup faculty strategies\n\nYou still need contingency planning. This isn't a set-and-forget business.",
//     },
//     {
//       q: "What are the biggest mistakes new franchisees make?",
//       a: "Blunt list:\n\n• Overspending on interiors\n• Hiring weak counsellors\n• Expecting walk-in admissions\n• Underpricing courses\n• Treating education like retail\n\nAvoid these and you're already ahead of 60% of competitors.",
//     },
//     {
//       q: "Is discounting courses a good strategy?",
//       a: "Short-term? Maybe.\nLong-term? Dangerous.\nHeavy discounting:\n\n• Attracts unserious students\n• Devalues the brand\n• Burns faculty morale\n\nInframe encourages value-based pricing, not race-to-the-bottom tactics.",
//     },
//     {
//       q: "How seasonal is this business?",
//       a: "Admissions peak around:\n\n• Post-school results\n• College admission cycles\n• Skill-upgrade seasons\n\nThat's normal. Smart centers plan workshops, short courses, and corporate training during lean months.",
//     },
//     {
//       q: "Will Inframe open another franchise near my location?",
//       a: "No cannibalization games.\nTerritories and expansion policies are discussed upfront. High-performing centers are protected and often prioritized for growth.",
//     },
//     {
//       q: "How does Inframe maintain quality across franchises?",
//       a: "Through:\n• Academic audits\n• Curriculum updates\n• Faculty performance reviews\n• Brand SOP enforcement\n\nWeak centers damage the brand—so quality control is non-negotiable.",
//     },
//     {
//       q: "Can I customize courses locally?",
//       a: "Limited customization is allowed within brand guidelines.\nRandom syllabus changes hurt consistency and placements. Education isn't a playground for experiments.",
//     },
//     {
//       q: "What tech systems does Inframe provide?",
//       a: "Depending on model:\n• LMS for learning & assessments\n• CRM for leads & admissions\n• Reporting & performance tracking\n• Academic documentation systems\n\nThis reduces chaos and dependency on individuals.",
//     },
//     {
//       q: "Can I run blended or online programs from my center?",
//       a: "Yes. Hybrid models are supported where feasible. Offline credibility + online reach is a strong combination when executed properly",
//     },
//     {
//       q: "What if enrollments are slow in the first year?",
//       a: "That's common.\nEducation businesses compound, not explode. First year is about:\n• Brand establishment\n• Process correction\n• Market understanding\n• Panic decisions in year one usually cause failure.",
//     },
//     {
//       q: "What if I want to exit later?",
//       a: "Exit terms are clearly defined in the agreement. Education franchises aren't quick-flip assets. Enter only if you're thinking medium to long term.",
//     },
//     {
//       q: "What if I don't agree with a policy later?",
//       a: "Policies exist to protect the brand and all partners. Feedback is welcome, but unilateral decisions that affect quality or brand image aren't acceptable.",
//     },
//     {
//       q: "Is this franchise for investors or operators?",
//       a: "Primarily operators.\nPure investors struggle unless they hire strong managers and stay involved at decision level.",
//     },
//     {
//       q: "Who succeeds most with Inframe?",
//       a: "Partners who:\n• Respect education\n• Follow systems\n• Stay involved early\n• Focus on student outcomes\n• Think long-term, not quick profits",
//     },
//     {
//       q: "Should I apply right now?",
//       a: "Apply only if:\n• You're serious about running an education business\n• You have realistic financial expectations\n• You're ready to be involved\n• You care about student success, not just fees\n\nIf that's you—proceed.\nIf not—walk away now. It'll save both of us time.",
//     },
//   ];

//   const [openIndex, setOpenIndex] = useState(null);

//   return (
//     <section className="py-16 sm:py-20 md:py-24 bg-yellow-50">
//       <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
//         <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-widest mb-10 sm:mb-12 text-center text-gray-800">
//           FREQUENTLY ASKED QUESTIONS
//         </h2>

//         {/* ✅ GRID BASED LAYOUT (FIXED) */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
//           {/* LEFT COLUMN */}
//           <div className="flex flex-col gap-6">
//             {faqs
//               .filter((_, i) => i % 2 === 0)
//               .map((faq, idx) => {
//                 const actualIndex = idx * 2;
//                 return (
//                   <FAQCard
//                     key={actualIndex}
//                     faq={faq}
//                     index={actualIndex}
//                     openIndex={openIndex}
//                     setOpenIndex={setOpenIndex}
//                   />
//                 );
//               })}
//           </div>

//           {/* RIGHT COLUMN */}
//           <div className="flex flex-col gap-6">
//             {faqs
//               .filter((_, i) => i % 2 === 1)
//               .map((faq, idx) => {
//                 const actualIndex = idx * 2 + 1;
//                 return (
//                   <FAQCard
//                     key={actualIndex}
//                     faq={faq}
//                     index={actualIndex}
//                     openIndex={openIndex}
//                     setOpenIndex={setOpenIndex}
//                   />
//                 );
//               })}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// /* 🔹 CARD COMPONENT */
// function FAQCard({ faq, index, openIndex, setOpenIndex }) {
//   const isOpen = openIndex === index;

//   return (
//     <div
//       className={`bg-white/80 p-3 sm:p-4 rounded-2xl shadow-lg cursor-pointer transition-shadow duration-500 ease-in-out
//       ${isOpen ? "shadow-2xl" : "hover:shadow-xl"}`}
//       onClick={() => setOpenIndex(isOpen ? null : index)}
//     >
//       <div className="group flex justify-between items-start gap-4">
//         <h3 className="text-base sm:text-lg font-semibold text-gray-800 group-hover:text-yellow-600">
//           {faq.q}
//         </h3>

//         <ChevronDown
//           className={`shrink-0 text-yellow-500 transition-transform duration-300 ${
//             isOpen ? "rotate-180" : ""
//           }`}
//         />
//       </div>

//       <div
//         className={`mt-2 overflow-hidden transition-all duration-400 ease-in-out
//         ${isOpen ? "max-h-250 opacity-100" : "max-h-0 opacity-0"}`}
//       >
//         <p className="text-sm sm:text-base text-gray-500 whitespace-pre-line">
//           {faq.a}
//         </p>
//       </div>
//     </div>
//   );
// }
"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

/* ================= TYPES ================= */
interface FAQ {
  q: string;
  a: string;
}

interface FAQCardProps {
  faq: FAQ;
  index: number;
  openIndex: number | null;
  setOpenIndex: (index: number | null) => void;
}

/* ================= MAIN COMPONENT ================= */
export default function FranchiseFAQ() {
  const faqs: FAQ[] = [
    { q: "What is Inframe School?", a: "Inframe School of Art, Design & Business is a creative education institute blending industry-relevant skills, hands-on learning, and career outcomes in design, business, and digital fields like UI/UX, interior, animation, graphic design, digital marketing, jewelry design, etc." },
    { q: "What makes Inframe different from other design institutes?", a: "Inframe isn't about certificates. It's about real skill development, portfolio building, industry partnerships, and placements. Students work with tools and projects that reflect real job requirements, not outdated theory." },
    { q: "How long has Inframe been operating — is this a new or established brand?", a: "Inframe has been running long enough to build curriculum, industry ties, and student outcomes (operational since before franchise launch). It was established by the Inframe Educational Society under the Rajasthan Societies Act." },
    { q: "Why choose Inframe over other education franchises", a: "Because Inframe focuses on creative and career skills that are in demand. The curriculum is developed with industry partners, placements, internships, and real projects — not just classroom theory. That gives your center actual value in the market." },
    { q: "Is there genuine market demand for Inframe's courses?", a: "Yes — students enroll in degree, diploma, and professional programs spanning multiple design and digital fields. These skills are needed by studios, agencies, consultancies, and freelance markets." },
    { q: "What franchise formats are available", a: "Inframe offers scalable models:\n• School Campus Model (full-scale with labs & classrooms)\n• Training Center Model (mid-scale)\n• Studio / Skill Hub Model (compact, lower investment)\nEach has different space & investment requirements. We'll share specifics based on your city and budget." },
    { q: "How do I choose the right model for my city and budget?", a: "We recommend based on your investment capacity, city profile, expected student demand, and your involvement level. We won't sell you the biggest model if it doesn't make financial sense." },
    { q: "What is the total investment range?", a: "Typical investment ranges from ₹5 lakh to ₹10 lakh+, depending on model, space, equipment, and setup. This is approximate and will vary by city and infrastructure cost." },
    { q: "Are there franchise fees or royalties?", a: "Yes — there's a franchise fee and ongoing fees tied to support systems and brand licensing. These cover academic updates, marketing support, technology platforms, and centralized resources. You get structure, not guesswork." },
    { q: "Do you provide exact cost figures upfront?", a: "Yes. We will share detailed investment sheets when you apply — including setup, interiors, equipment, marketing, and working capital. No “contact us for details” placeholders." },
    { q: "What is a realistic break-even timeline?", a: "Typically 12-24 months — it depends on location, marketing execution, admissions, and cost control. If someone promises ultra-fast break-even, treat that with skepticism." },
    { q: "What revenue streams does a franchise center have?", a: "Multiple :\n• Degree, diploma & professional courses\n• Short-term certification programs\n• Workshops & skill programs\n• School & college tie-ups\n• Portfolio and specialization modules\nThis diversified structure ensures long-term sustainability." },
    { q: "Can I expand to multiple centers later?", a: "Yes. If your first center performs consistently, you get priority rights for expansion into multiple cities or formats." },
    { q: "What kind of support do I actually get?", a: "We provide :\n• Curriculum & syllabus frameworks\n• Faculty hiring guidelines\n• Marketing creatives & campaigns\n• LMS/CRM/technology setup\n• SOPs for admissions & operations\n• Ongoing mentoring and quality checks\nWe don't just hand you a brand and disappear." },
    { q: "Will Inframe help with admissions and student outreach?", a: "Yes — we support strategy, campaigns, materials, and enrollment systems. Execution still rests with your local team." },
    { q: "Do I need an education background?", a: "No. But you must take education seriously, not treat it as a side hustle." },
    { q: "How involved do I need to be?", a: "Initially, hands-on involvement is essential — especially on admissions, operations, faculty hiring, and early marketing. Distance owners usually underperform." },
    { q: "Who should NOT invest?", a: "If you're looking for passive income, no involvement, or guaranteed enrollments, this isn't for you. Inframe wants partners who are committed to quality education and business discipline." },
    { q: "What are the space & infrastructure requirements?", a: "Space requirements differ by model, but all centers must have:\n• Classrooms\n• Computer labs with design-capable systems\n• Reception & visibility area\n• Stable internet + power backup\nInframe provides detailed specs after your inquiry." },
    { q: "What software & hardware do I need?", a: "Professional design software (Adobe, Autodesk, etc.) and capable workstations are essential. Cutting corners here directly hurts student experience and credibility." },
    { q: "How do I apply?", a: "It's a structured path:\n• Fill franchise enquiry form\n• Screening call\n• Detailed business discussion\n• Location feasibility review\n• Agreement & onboarding\n• Setup, training, launch\nNo endless loops — clarity at every step." },
    { q: "Is the franchise legally compliant?", a: "Yes — brand usage, agreements, and operational standards are clearly defined. We protect both parties." },
    { q: "Are earnings guaranteed?", a: "No. Anyone promising guaranteed income is selling fairy tales. Your financial outcome depends on execution, location, admissions, and quality delivery." },
    { q: "What benefits do students get?", a: "Students gain:\n• Real industry-aligned curriculum\n• Project portfolios\n• Mentorship and workshops\n• Placement and internship assistance\n• Industry certifications\nThat's what creates meaningful value — and what sells enrollments." },
    { q: "Is placement genuinely supported?", a: "Yes — Inframe provides placement assistance, backed by industry partnerships and networks." },
    { q: "Is creative education just a trend or a long-term business?", a: "Short answer: long-term.\nDesign, digital media, UI/UX, animation, CAD, interior, and business design skills are now core requirements across industries. Traditional degrees alone aren't delivering employability—skills are. That gap isn't closing anytime soon." },
    { q: "What happens if a new competitor opens nearby?", a: "Competition is inevitable. Weak institutes compete on price.\nInframe competes on outcomes, curriculum depth, brand positioning, and student trust. If your delivery quality drops, competition will beat you—brand won't save poor execution." },
    { q: "How dependent is the business on the local team?", a: "Very.\nEducation is people-driven. Faculty quality, counsellor honesty, and daily discipline decide your success more than ads or hoardings. Inframe provides systems, but you must enforce standards locally." },
    { q: "Why would students choose an Inframe franchise over a local institute?", a: "Because Inframe offers:\n• Structured curriculum (not random topics)\n• Industry exposure & workshops\n• Portfolio-centric learning\n• Career guidance & placement assistance\n• Brand credibility beyond one city\nParents don't trust unknown institutes easily. Brand matters." },
    { q: "Do students enroll for long-term programs or only short courses?", a: "Both—and that's a strength.\n• Long-term programs build revenue stability\n• Short-term courses and workshops bring cash flow and lead generation\nBalanced centers survive downturns better." },
    { q: "How do you handle parents who only care about placements?", a: "By being honest.\n• Placements depend on student performance + market conditions\n• Inframe supports placement assistance, not fake guarantees\nSerious parents respect transparency more than false promises." },
    { q: "How many staff members are typically required?", a: "Depends on model, but usually:\n• 1-2 counsellors\n• 2-5 faculty (full-time + visiting)\n• 1 admin / coordinator\nUnderstaffing kills student experience. Overstaffing kills margins. Balance matters." },
    { q: "How hard is faculty hiring?", a: "It's challenging everywhere—not just Inframe.\nThat's why we assist with:\n• Faculty profiles & hiring criteria\n• Interview guidance\n• Training & onboarding frameworks\nBut no brand can magically create good teachers. You must be selective." },
    { q: "What if faculty leaves suddenly?", a: "That's reality in education.\nInframe mitigates risk through:\n• Curriculum continuity\n• Teaching SOPs\n• Backup faculty strategies\nYou still need contingency planning. This isn't a set-and-forget business." },
    { q: "What are the biggest mistakes new franchisees make?", a: "Blunt list:\n• Overspending on interiors\n• Hiring weak counsellors\n• Expecting walk-in admissions\n• Underpricing courses\n• Treating education like retail\nAvoid these and you're already ahead of 60% of competitors." },
    { q: "Is discounting courses a good strategy?", a: "Short-term? Maybe.\nLong-term? Dangerous.\nHeavy discounting:\n• Attracts unserious students\n• Devalues the brand\n• Burns faculty morale\nInframe encourages value-based pricing, not race-to-the-bottom tactics." },
    { q: "How seasonal is this business?", a: "Admissions peak around:\n• Post-school results\n• College admission cycles\n• Skill-upgrade seasons\nThat's normal. Smart centers plan workshops, short courses, and corporate training during lean months." },
    { q: "Will Inframe open another franchise near my location?", a: "No cannibalization games.\nTerritories and expansion policies are discussed upfront. High-performing centers are protected and often prioritized for growth." },
    { q: "How does Inframe maintain quality across franchises?", a: "Through:\n• Academic audits\n• Curriculum updates\n• Faculty performance reviews\n• Brand SOP enforcement\nWeak centers damage the brand—so quality control is non-negotiable." },
    { q: "Can I customize courses locally?", a: "Limited customization is allowed within brand guidelines.\nRandom syllabus changes hurt consistency and placements. Education isn't a playground for experiments." },
    { q: "What tech systems does Inframe provide?", a: "Depending on model:\n• LMS for learning & assessments\n• CRM for leads & admissions\n• Reporting & performance tracking\n• Academic documentation systems\nThis reduces chaos and dependency on individuals." },
    { q: "Can I run blended or online programs from my center?", a: "Yes. Hybrid models are supported where feasible. Offline credibility + online reach is a strong combination when executed properly" },
    { q: "What if enrollments are slow in the first year?", a: "That's common.\nEducation businesses compound, not explode. First year is about:\n• Brand establishment\n• Process correction\n• Market understanding\n• Panic decisions in year one usually cause failure." },
    { q: "What if I want to exit later?", a: "Exit terms are clearly defined in the agreement. Education franchises aren't quick-flip assets. Enter only if you're thinking medium to long term." },
    { q: "What if I don't agree with a policy later?", a: "Policies exist to protect the brand and all partners. Feedback is welcome, but unilateral decisions that affect quality or brand image aren't acceptable." },
    { q: "Is this franchise for investors or operators?", a: "Primarily operators.\nPure investors struggle unless they hire strong managers and stay involved at decision level." },
    { q: "Who succeeds most with Inframe?", a: "Partners who:\n• Respect education\n• Follow systems\n• Stay involved early\n• Focus on student outcomes\n• Think long-term, not quick profits" },
    { q: "Should I apply right now?", a: "Apply only if:\n• You're serious about running an education business\n• You have realistic financial expectations\n• You're ready to be involved\n• You care about student success, not just fees\nIf that's you—proceed.\nIf not—walk away now. It'll save both of us time." },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-yellow-50">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-widest mb-10 sm:mb-12 text-center text-gray-800">
          FREQUENTLY ASKED QUESTIONS
        </h2>

        {/* GRID LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* LEFT COLUMN */}
          <div className="flex flex-col gap-6">
            {faqs
              .filter((_, i) => i % 2 === 0)
              .map((faq, idx) => {
                const actualIndex = idx * 2;
                return (
                  <FAQCard
                    key={actualIndex}
                    faq={faq}
                    index={actualIndex}
                    openIndex={openIndex}
                    setOpenIndex={setOpenIndex}
                  />
                );
              })}
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col gap-6">
            {faqs
              .filter((_, i) => i % 2 === 1)
              .map((faq, idx) => {
                const actualIndex = idx * 2 + 1;
                return (
                  <FAQCard
                    key={actualIndex}
                    faq={faq}
                    index={actualIndex}
                    openIndex={openIndex}
                    setOpenIndex={setOpenIndex}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= CARD COMPONENT ================= */
function FAQCard({ faq, index, openIndex, setOpenIndex }: FAQCardProps) {
  const isOpen = openIndex === index;

  return (
    <div
      className={`bg-white/80 p-3 sm:p-4 rounded-2xl shadow-lg cursor-pointer transition-shadow duration-500 ease-in-out
      ${isOpen ? "shadow-2xl" : "hover:shadow-xl"}`}
      onClick={() => setOpenIndex(isOpen ? null : index)}
    >
      <div className="group flex justify-between items-start gap-4">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 group-hover:text-yellow-600">
          {faq.q}
        </h3>

        <ChevronDown
          className={`shrink-0 text-yellow-500 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      <div
        className={`mt-2 overflow-hidden transition-all duration-400 ease-in-out
        ${isOpen ? "max-h-250 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <p className="text-sm sm:text-base text-gray-500 whitespace-pre-line">
          {faq.a}
        </p>
      </div>
    </div>
  );
}
