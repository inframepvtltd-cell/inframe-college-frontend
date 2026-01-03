// app/(main)/aboutus/components/AboutInframe.tsx
"use client";

import React, { useState, useEffect } from "react";
import { AboutSection, AboutSectionItem } from "../api/api";

interface AboutInframeProps {
  section: AboutSection | undefined;
  items: AboutSectionItem[];
}

const AboutInframe: React.FC<AboutInframeProps> = ({ section, items }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Format programs content from database (item at index 2 is Programs Offered)
  const getProgramsList = () => {
    if (items[2]?.content) {
      // Extract programs from content (assuming they're separated by ; or newline)
      const content = items[2].content;
      const programs = content
        .split(/[;\n]/)
        .map(p => p.trim())
        .filter(p => p.length > 0 && !p.includes("Degree") && !p.includes("Diploma") && !p.includes("Professional"));
      
      return programs.length > 0 ? programs : getDefaultPrograms();
    }
    return getDefaultPrograms();
  };

  const getDefaultPrograms = () => [
    "Interior Design", "Graphic Design", "Fine Arts", "UI/UX Design",
    "Digital Marketing", "Jewellery Design", "Animation & VFX", "Fashion Design"
  ];

  const programs = getProgramsList();

  return (
    <section className="w-full bg-gradient-to-br from-white to-gray-50 text-gray-800 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with Decorative Elements */}
        <div className="text-center mb-16 relative">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4 w-24 h-1 bg-yellow-400 rounded-full"></div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 relative inline-block">
            About <span className="text-yellow-600 relative">
              Inframe
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-yellow-400 transform scale-x-75"></div>
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            {section?.description || "Where Creativity Meets Innovation"}
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Text Content - Left Column */}
          <div className="space-y-8">
            {/* First item - Our Foundation */}
            {items[0] && (
              <div 
                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100"
                {...(isClient ? { 'data-aos': 'fade-right', 'data-aos-once': 'true' } : {})}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-yellow-100 rounded-xl">
                    <span className="text-2xl">{items[0].icon || "🎓"}</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      {items[0].title || "Our Foundation"}
                    </h3>
                    <p className="text-lg leading-relaxed text-gray-700">
                      {items[0].content || (
                        <>
                          <strong className="text-yellow-700">Inframe School of Art, Design and Business</strong> was established under the Rajasthan Societies Act 1958 by the Inframe Educational Society. Founded by eight experienced professionals with over 35 years of expertise in education, administration, and community development.
                        </>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Second item - Our Vision */}
            {items[1] && (
              <div 
                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100"
                {...(isClient ? { 'data-aos': 'fade-right', 'data-aos-delay': '100', 'data-aos-once': 'true' } : {})}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-yellow-100 rounded-xl">
                    <span className="text-2xl">{items[1].icon || "🌟"}</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      {items[1].title || "Our Vision"}
                    </h3>
                    <p className="text-lg leading-relaxed text-gray-700">
                      {items[1].content || "Our vision is to nurture creativity, innovation, and critical thinking while upholding the values of discipline, integrity, and social responsibility."}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Programs & Features - Right Column */}
          <div className="space-y-8">
            {/* Programs Offered - item at index 2 */}
            <div 
              className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-3xl p-8 shadow-lg border border-yellow-200"
              {...(isClient ? { 'data-aos': 'fade-left', 'data-aos-once': 'true' } : {})}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="p-2 bg-yellow-400 rounded-lg">📚</span>
                {items[2]?.title || "Programs Offered"}
              </h3>
              <p className="text-lg leading-relaxed text-gray-700 mb-4">
                {items[2]?.content ? (
                  // Show only the introductory part if it contains Degree info
                  items[2].content.includes("Degree") ? (
                    <>
                      We offer <strong className="text-yellow-700">Degree (B.Des, B.Voc, B.Sc), Diploma, and Short-Term Professional Courses</strong> across major creative fields:
                    </>
                  ) : items[2].content
                ) : (
                  "We offer Degree (B.Des, B.Voc, B.Sc), Diploma, and Short-Term Professional Courses across major creative fields:"
                )}
              </p>
              <div className="grid grid-cols-2 gap-3 mt-4">
                {programs.slice(0, 8).map((course, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">{course}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Career Support - item at index 3 */}
            {items[3] && (
              <div 
                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100"
                {...(isClient ? { 'data-aos': 'fade-left', 'data-aos-delay': '100', 'data-aos-once': 'true' } : {})}
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <span className="p-2 bg-yellow-400 rounded-lg">💼</span>
                  {items[3].title || "Career Support"}
                </h3>
                <p className="text-lg leading-relaxed text-gray-700">
                  {items[3].content || "Inframe ensures 100% placement assistance across India, supported by modern campus facilities including Wi-Fi, digital classrooms, library, and creative labs."}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutInframe;