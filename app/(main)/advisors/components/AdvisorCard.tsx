"use client";

import Image from "next/image";

interface AdvisorCardProps {
  advisor: {
    id: string;
    name: string;
    role: string;
    description: string;
    image: string;
  };
}

export default function AdvisorCard({ advisor }: AdvisorCardProps) {
  return (
    <div className="group relative bg-white rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl border-b border-l border-zinc-200">
      <div className="absolute top-0 left-0 w-1 h-full bg-amber-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
      <div className="absolute bottom-0 right-0 w-full h-1 bg-amber-500 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
      
      <div className="flex flex-col md:flex-row">
        {/* Image consistently positioned on the left */}
        <div className="md:w-40 h-56 md:h-auto flex-shrink-0 relative overflow-hidden">
          <Image
            src={advisor.image}
            alt={advisor.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 160px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        
        <div className="p-8 flex flex-col flex-grow">
          <div>
            <div className="flex items-center mb-3">
              <div className="w-6 h-px bg-amber-500 mr-3"></div>
              <span className="text-xs font-semibold text-zinc-500 tracking-widest uppercase">
                Advisor
              </span>
            </div>
            <h2 className="text-xl font-bold text-zinc-900 mb-2 group-hover:text-amber-600 transition-colors duration-300">
              {advisor.name}
            </h2>
            <h3 className="text-xs font-semibold text-zinc-600 mb-5 uppercase tracking-wider">
              {advisor.role}
            </h3>
            <p className="text-zinc-600 text-sm leading-relaxed">
              {advisor.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}