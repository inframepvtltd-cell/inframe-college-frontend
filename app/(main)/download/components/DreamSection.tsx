"use client"
import React, { useState } from "react";
import { ArrowRight } from "lucide-react"; // Lucide icons
import { Poppins } from "next/font/google"; // Importing Google Fonts via next/font

import { FaArrowRight } from "react-icons/fa";
import { Button } from "@components/ui/button";
import ApplyNowForm from "@components/ApplyNowForm";

// Using the Poppins font
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"], // Including various font weights
});

const DreamsSection = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleApplyClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    setIsFormOpen(true);
  };
  return (
    <div className={`max-w-7xl mx-auto px-4 my-6 ${poppins.className}`}>
      <div className="bg-gradient-to-r from-yellow-600 to-yellow-400 text-gray-900 shadow-xl p-6 lg:p-10 flex flex-col lg:flex-row items-center justify-between rounded-xl">

        {/* Text Section */}
        <div className="space-y-3 text-center lg:text-left flex-1">
          <h2 className="text-2xl lg:text-4xl font-bold flex items-center gap-2 justify-center lg:justify-start">
            <span>✨</span> Now Make Your Dreams Come True
          </h2>
          <p className="text-sm lg:text-lg opacity-90 flex items-center justify-center lg:justify-start gap-2">
            Free Counseling. No Registration Fees
            <ArrowRight size={20} className="text-gray-900" />
          </p>
        </div>

        {/* Button Section */}
        <div className="flex-shrink-0 mt-6 lg:mt-0 flex items-center gap-4">
          <Button
            onClick={handleApplyClick}
            className="inline-flex items-center gap-2 py-3 px-8 bg-black text-yellow-500 font-semibold text-sm lg:text-base rounded-lg shadow-xl transform transition-all duration-300 hover:scale-105 hover:bg-yellow-500 hover:text-black"
          >
            Apply Now
            <FaArrowRight size={20} />
          </Button>

          {/* Optional: small note or icon next to button */}
          <ApplyNowForm
            isFormOpen={isFormOpen}
            setIsFormOpen={setIsFormOpen}
            isScrolled={false}
          />
        </div>
      </div>
    </div>

  );
};

export default DreamsSection;
