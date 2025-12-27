"use client";

import Image from "next/image";
import { FaCalendarAlt, FaStar, FaLightbulb, FaGraduationCap } from "react-icons/fa";

interface MentorCardProps {
  mentor: {
    id: string;
    name: string;
    role: string;
    description: string;
    image: string;
    expertise: string[];
  };
}

export default function MentorCard({ mentor }: MentorCardProps) {
  const hasExpertise = mentor.expertise && mentor.expertise.length > 0;

  return (
    <div className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-yellow-400 shadow-sm hover:shadow-xl transition-all duration-300 relative flex flex-col h-full">
      {/* Hover accent */}
      <div className="absolute inset-0 border-2 border-yellow-400 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-95 group-hover:scale-100"></div>
      
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={mentor.image}
          alt={mentor.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h2 className="text-xl font-bold text-white">{mentor.name}</h2>
          <h3 className="text-sm font-medium text-yellow-300">{mentor.role}</h3>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Expertise Section - HIGHLIGHTED */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-3">
            {hasExpertise ? (
              <>
                <FaStar className="h-4 w-4 text-yellow-500" />
                <h4 className="text-sm font-semibold text-gray-800">Areas of Expertise</h4>
              </>
            ) : (
              <>
                <FaLightbulb className="h-4 w-4 text-gray-400" />
                <h4 className="text-sm font-semibold text-gray-500">Expertise</h4>
              </>
            )}
          </div>
          
          {hasExpertise ? (
            // Expertise tags with highlight effect
            <div className="flex flex-wrap gap-2">
              {mentor.expertise.map((skill, i) => (
                <span 
                  key={i}
                  className="text-xs font-medium bg-gradient-to-r from-yellow-100 to-yellow-50 text-gray-900 py-1.5 px-3 rounded-full border border-yellow-200 shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            // No expertise message
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
              <div className="flex items-center gap-2 text-gray-600">
                <FaGraduationCap className="h-4 w-4" />
                <p className="text-sm italic">
                  Expertise details not  mention
                </p>
              </div>
            </div>
          )}
        </div>
        
        {/* Description */}
        <div className="mb-4 flex-grow">
          <p className="text-gray-700 text-sm leading-relaxed">
            {mentor.description}
          </p>
        </div>
        
        {/* Stats/Info Bar */}
        <div className="flex items-center justify-between text-xs text-gray-500 border-t border-gray-100 pt-4 mt-2">
          <div className="flex items-center gap-2">
            <div className={`h-2 w-2 rounded-full ${hasExpertise ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`}></div>
            <span>{hasExpertise ? `${mentor.expertise.length} skills` : 'No skills listed'}</span>
          </div>
          <span className="text-gray-400">Available</span>
        </div>
        
        {/* Connect button */}
        <button className="mt-4 text-sm font-medium bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-2.5 px-4 rounded-lg hover:from-yellow-600 hover:to-yellow-700 flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-md group-hover:shadow-lg">
          <FaCalendarAlt className="mr-2 h-4 w-4" />
          Schedule a Session
        </button>
      </div>
    </div>
  );
}