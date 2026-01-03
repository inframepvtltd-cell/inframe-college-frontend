// app/(main)/aboutus/components/IndustryPartners.tsx
"use client";

import React, { useEffect, useState } from "react";
import { fetchActivePlacementPartners } from "../api/api";
import { FaSpinner } from "react-icons/fa";

// Fallback to static logos if API fails
export const STATIC_LOGOS = [
  { src: "/company logo/logo (1).png", name: "OneClick" },
  { src: "/company logo/KA LOGO.png", name: "Kartik Acharya Architects" },
  { src: "/company logo/architect era logo.jpg", name: "Architect Era" },
  { src: "/company logo/Art Maker  2.png", name: "Art Maker" },
  { src: "/company logo/DesignDailyLandscape.png", name: "Design Daily Landscape" },
  { src: "/company logo/download (1).png", name: "Hunarship" },
  { src: "/company logo/download.png", name: "Being Nest" },
  { src: "/company logo/GM_Final-Logo02.png", name: "GM Final" },
  { src: "/company logo/hqdefault_live.jpg", name: "Paper Out Academy" },
  { src: "/company logo/images.jpg", name: "Shambhav" },
  { src: "/company logo/InFrame-Design-Institute.jpg", name: "InFrame Design Institute" },
  { src: "/company logo/InframeEntertainment5.jpg", name: "Inframe Entertainment" },
  { src: "/company logo/landscap-300x88.png", name: "Himalian" },
  { src: "/company logo/logo.png", name: "Prime Tech" },
  { src: "/company logo/prime tech logo.png", name: "Prime Tech" },
  { src: "/company logo/Urban Foundry_Logo.jpg", name: "Urban Foundry" },
];

interface LogoItem {
  src: string;
  name: string;
  website?: string;
  industry?: string;
}

const IndustryPartners: React.FC = () => {
  const [logos, setLogos] = useState<LogoItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPartners();
  }, []);

  const loadPartners = async () => {
    try {
      setLoading(true);
      const partners = await fetchActivePlacementPartners();
      
      if (partners.length > 0) {
        // Use dynamic partners from database
        const dynamicLogos: LogoItem[] = partners.map(partner => ({
          src: partner.logo,
          name: partner.name,
          website: partner.website || undefined,
          industry: partner.industry_type || undefined,
        }));
        
        setLogos(dynamicLogos);
      } else {
        // Fallback to static logos
        setLogos(STATIC_LOGOS);
      }
    } catch (error) {
      console.error("Error loading partners:", error);
      // Fallback to static logos on error
      setLogos(STATIC_LOGOS);
    } finally {
      setLoading(false);
    }
  };

  const scrollLogos = [...logos, ...logos]; 

  if (loading) {
    return (
      <section className="bg-yellow-400 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="inline-block p-4 bg-white rounded-full shadow-lg mb-6">
              <FaSpinner className="h-8 w-8 text-yellow-600 animate-spin" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Loading Partners...
            </h2>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-yellow-400 py-12 sm:py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            INDUSTRY & PLACEMENT PARTNERS
          </h2>
          
          <p className="text-lg text-gray-800 max-w-3xl mx-auto mb-8">
            Inframe's strong industry partnerships provide students with unparalleled career opportunities and real-world experience to excel in design and business.
          </p>
        </div>

        {/* Scrolling Logos Container */}
        <div className="relative">
          {/* Left gradient overlay */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r to-transparent z-10 pointer-events-none"></div>
          
          {/* Right gradient overlay */}
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l to-transparent z-10 pointer-events-none"></div>

          {/* Scrolling Logos */}
          <div className="flex animate-[scroll_40s_linear_infinite] space-x-8 sm:space-x-12 md:space-x-16 py-4">
            {scrollLogos.map((logo, index) => (
              <LogoCard key={`${logo.name}-${index}`} logo={logo} />
            ))}
          </div>
        </div>
      </div>

      {/* Add custom animation */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-50% - 1rem));
          }
        }
      `}</style>
    </section>
  );
};

// Individual Logo Card Component
const LogoCard: React.FC<{ logo: LogoItem }> = ({ logo }) => {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const handleClick = (e: React.MouseEvent) => {
    if (!logo.website) {
      e.preventDefault();
    }
  };

  return (
    <div 
      className="group flex-shrink-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Card - Clickable if website exists */}
      <div 
        className={`w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 bg-white rounded-xl shadow-lg transition-all duration-300 overflow-hidden border-2 ${
          logo.website ? 'cursor-pointer' : 'cursor-default'
        } ${
          isHovered ? 'shadow-2xl scale-105 border-yellow-300' : 'border-white'
        }`}
        onClick={handleClick}
      >
        {logo.website ? (
          <a
            href={logo.website}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full h-full"
          >
            <CardContent logo={logo} imageError={imageError} setImageError={setImageError} isHovered={isHovered} />
          </a>
        ) : (
          <CardContent logo={logo} imageError={imageError} setImageError={setImageError} isHovered={isHovered} />
        )}
      </div>
      
      {/* Partner Name */}
      <div className="mt-3 text-center">
        <p className="text-sm font-medium text-gray-900 truncate px-2">
          {logo.name}
        </p>
      </div>
    </div>
  );
};

// Separate content component for reusability
const CardContent: React.FC<{ 
  logo: LogoItem; 
  imageError: boolean; 
  setImageError: (value: boolean) => void;
  isHovered: boolean;
}> = ({ logo, imageError, setImageError, isHovered }) => {
  return (
    <>
      {/* Logo Image */}
      <div className="w-full h-full p-4 flex items-center justify-center">
        {!imageError ? (
          <img
            src={logo.src}
            alt={logo.name}
            onError={() => setImageError(true)}
            className={`object-contain w-full h-full transition-transform duration-300 ${
              isHovered ? 'scale-110' : ''
            }`}
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-400">
            <div className="text-2xl font-bold mb-1">{logo.name.charAt(0)}</div>
            <span className="text-xs text-center">{logo.name}</span>
          </div>
        )}
      </div>

      {/* Hover Overlay - Only show for clickable cards */}
      {logo.website && isHovered && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-4">
          <h3 className="text-white font-semibold text-sm mb-1 truncate">{logo.name}</h3>
          <div className="flex items-center gap-1 text-white text-xs mt-1">
            <span className="bg-yellow-500 px-2 py-1 rounded">Visit Website</span>
          </div>
        </div>
      )}
    </>
  );
};

export default IndustryPartners;