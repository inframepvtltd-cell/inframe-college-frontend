// app/(main)/aboutus/components/Affiliation.tsx
"use client";

import React, { useState, useEffect } from "react";
import { AboutSection, AboutSectionItem } from "../api/api";

interface AffiliationProps {
  section: AboutSection | undefined;
  items: AboutSectionItem[];
}

const Affiliation: React.FC<AffiliationProps> = ({ section, items }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Separate items: first 2 are affiliation, rest are features
  const affiliationItems = items.slice(0, 2);
  const featureItems = items.slice(2);

  // Default features if database doesn't have enough
  const defaultFeatures = [
    { icon: "🏢", title: "Modern Campus", desc: "Smart campus with digital classrooms, labs, and creative spaces" },
    { icon: "💼", title: "100% Placement", desc: "Comprehensive placement assistance across India" },
    { icon: "🌍", title: "Global Certifications", desc: "Adobe, Autodesk, and Meta certified programs" },
    { icon: "👨‍🏫", title: "Industry Experts", desc: "Learn from professionals with real-world experience" },
    { icon: "🚀", title: "Live Projects", desc: "Hands-on learning with real client projects" },
    { icon: "📱", title: "Flexible Learning", desc: "Online, offline, and recorded class options" }
  ];

  const displayFeatures = featureItems.length >= 6 ? featureItems : defaultFeatures;

  return (
    <>
      {/* Divider with Style */}
      <div className="relative my-20">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-6 text-2xl">✨</span>
        </div>
      </div>

      {/* Affiliation Section */}
      <div className="mb-20">
        <h3 className="text-4xl md:text-5xl font-bold text-center mb-16">
          Affiliation & <span className="text-yellow-600">Accreditation</span>
        </h3>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* University Partnerships - First item */}
          <div 
            className="bg-gradient-to-br from-gray-900 to-black text-white rounded-3xl p-8 shadow-2xl"
            {...(isClient ? { 'data-aos': 'fade-right', 'data-aos-once': 'true' } : {})}
          >
            {affiliationItems[0] && (
              <>
                <h4 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <span className="p-2 bg-yellow-400 rounded-lg text-black">
                    {affiliationItems[0].icon || "🏛️"}
                  </span>
                  {affiliationItems[0].title || "University Partnerships"}
                </h4>
                <div className="space-y-4">
                  <p className="text-lg leading-relaxed">
                    {affiliationItems[0].content || (
                      <>
                        Inframe is a vocational training partner of <strong className="text-yellow-300">Glocal University</strong> and <strong className="text-yellow-300">Sikkim Skill University (UGC Recognized)</strong>, offering Diploma, Advanced Diploma, Bachelor's, and Master's Degree programs.
                      </>
                    )}
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Industry Certifications - Second item */}
          <div 
            className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100"
            {...(isClient ? { 'data-aos': 'fade-left', 'data-aos-once': 'true' } : {})}
          >
            {affiliationItems[1] && (
              <>
                <h4 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <span className="p-2 bg-yellow-400 rounded-lg">
                    {affiliationItems[1].icon || "⭐"}
                  </span>
                  {affiliationItems[1].title || "Industry Certifications"}
                </h4>
                <div className="space-y-4">
                  {affiliationItems[1].content ? (
                    // Split content by newlines
                    affiliationItems[1].content.split('\n').filter(line => line.trim()).map((line, idx) => (
                      <p key={idx} className="text-lg leading-relaxed text-gray-700">
                        {line.includes("Training partner") ? (
                          <>
                            Training partner of <strong className="text-yellow-700">Career Point Institute of Skill Development (CPSID)</strong> affiliated with <strong className="text-yellow-700">NSDC</strong> and <strong className="text-yellow-700">Skill India</strong>.
                          </>
                        ) : line.includes("Officially certified") ? (
                          <>
                            Officially certified by <strong className="text-yellow-700">Adobe, Autodesk, and Meta</strong> for globally recognized professional certification programs.
                          </>
                        ) : (
                          line
                        )}
                      </p>
                    ))
                  ) : (
                    <>
                      <p className="text-lg leading-relaxed text-gray-700">
                        Training partner of <strong className="text-yellow-700">Career Point Institute of Skill Development (CPSID)</strong> affiliated with <strong className="text-yellow-700">NSDC</strong> and <strong className="text-yellow-700">Skill India</strong>.
                      </p>
                      <p className="text-lg leading-relaxed text-gray-700">
                        Officially certified by <strong className="text-yellow-700">Adobe, Autodesk, and Meta</strong> for globally recognized professional certification programs.
                      </p>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayFeatures.map((item, index) => {
          const isDbItem = 'id' in item;
          const staticItem = !isDbItem ? item : null;
          
          return (
            <div
              key={isDbItem ? item.id : index}
              className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100"
              {...(isClient ? { 
                'data-aos': 'fade-up', 
                'data-aos-delay': `${(index % 3) * 100}`,
                'data-aos-once': 'true' 
              } : {})}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-yellow-100 rounded-xl group-hover:bg-yellow-200 transition-colors duration-300">
                  <span className="text-2xl">
                    {isDbItem ? (item.icon || defaultFeatures[index]?.icon) : staticItem?.icon}
                  </span>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-yellow-700 transition-colors duration-300">
                    {isDbItem ? (item.title || `Feature ${index + 1}`) : staticItem?.title}
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {isDbItem ? (item.content || "Description") : staticItem?.desc}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA Section */}
      <div className="text-center mt-16">
        <div 
          className="bg-gradient-to-r from-yellow-400 to-amber-500 rounded-2xl p-8 shadow-2xl"
          {...(isClient ? { 'data-aos': 'fade-up', 'data-aos-once': 'true' } : {})}
        >
          <h3 className="text-3xl font-bold text-black mb-4">
            Ready to Start Your Creative Journey?
          </h3>
          <p className="text-lg text-gray-800 mb-6 max-w-2xl mx-auto">
            Join Inframe and transform your passion into a successful career with industry-leading education and global opportunities.
          </p>
          <button className="bg-black text-white px-8 py-4 rounded-xl font-bold hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 shadow-lg">
            Explore Programs
          </button>
        </div>
      </div>
    </>
  );
};

export default Affiliation;