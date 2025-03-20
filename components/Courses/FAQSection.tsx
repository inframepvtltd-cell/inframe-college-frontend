import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { ChevronDown } from "lucide-react";

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-yellow-400/20">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center py-4 text-left"
      >
        <span className="text-lg hover:text-yellow-400 transition-colors">
          {title}
        </span>
        <ChevronDown
          className={`w-5 h-5 transition-transform duration-200 ${
            isOpen ? "transform rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ${
          isOpen ? "max-h-96 mb-4" : "max-h-0"
        }`}
      >
        <div className="text-black pt-2 pb-4">{children}</div>
      </div>
    </div>
  );
};

const FAQSection = () => (
  <Card className="bg-zinc-100 text-black border-none my-12">
    <CardHeader>
      <CardTitle className="text-3xl text-yellow-400">
        Frequently Asked Questions
      </CardTitle>
    </CardHeader>
    <CardContent className="text-black">
      <div className="space-y-4 text-black">
        <AccordionItem title="What are the admission requirements?">
          Admission requirements include a high school diploma or equivalent,
          portfolio of creative work (optional but recommended), and a personal
          interview. International students must demonstrate English language
          proficiency.
        </AccordionItem>
        <AccordionItem title="Are there internship opportunities?">
          Yes, we partner with leading design firms and architecture studios to
          provide internship opportunities during the final year of study. Many
          of our students secure positions through these internships.
        </AccordionItem>
        <AccordionItem title="What software will I learn to use?">
          Students learn industry-standard software including AutoCAD, SketchUp,
          3ds Max, V-Ray, Adobe Creative Suite, and Revit. Our curriculum is
          regularly updated to include the latest design technologies.
        </AccordionItem>
      </div>
    </CardContent>
  </Card>
);

export default FAQSection;
