// app/(main)/aboutus/components/AboutPage.tsx - Complete updated version
"use client";

import React, { Suspense, lazy, useEffect, useState } from "react";
import { Poppins } from "next/font/google";
import { AboutSection, AboutSectionItem } from "../api/api";
import LoadingSpinner from "./LoadingSpinner";

// Lazy load components
const AboutHero = lazy(() => import("./AboutHero"));
const KeyHighlights = lazy(() => import("./KeyHighlights"));
const AboutInframe = lazy(() => import("./AboutInframe"));
const Affiliation = lazy(() => import("./Affiliation")); // Add this import
const CoreValues = lazy(() => import("./CoreValues"));
const CampusLife = lazy(() => import("./CampusLife"));
const FoundationalBeliefs = lazy(() => import("./FoundationalBeliefs"));
const IndustryPartners = lazy(() => import("./IndustryPartners"));

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

interface SectionWithItems {
  section: AboutSection;
  items: AboutSectionItem[];
}

interface AboutPageProps {
  sectionsWithItems: SectionWithItems[];
}

// Helper function to split text by new lines
const formatTextWithNewLines = (text: string | null) => {
  if (!text) return null;

  const paragraphs = text.split('\n').filter(p => p.trim());

  if (paragraphs.length === 1) {
    return <p className="text-lg font-sans leading-relaxed">{paragraphs[0]}</p>;
  }

  return paragraphs.map((para, index) => (
    <p key={index} className="text-lg font-sans leading-relaxed mb-4">
      {para}
    </p>
  ));
};

const AboutPage: React.FC<AboutPageProps> = ({ sectionsWithItems }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    // AOS ko dynamically import karein
    const initAos = async () => {
      if (typeof window !== 'undefined') {
        const Aos = (await import('aos')).default;
        Aos.init({
          duration: 1000,
          easing: "ease-in-out",
          once: true,
        });
      }
    };

    initAos();
  }, []);

  // Helper function to get section by type
  const getSectionByType = (type: string): SectionWithItems | undefined => {
    return sectionsWithItems.find(s => s.section.section_type === type);
  };

  // Get all sections
  const heroSection = getSectionByType('hero');
  const aboutSection = getSectionByType('about');
  const counterSection = getSectionByType('counter');
  const visionSection = getSectionByType('vision');
  const aboutInframeSection = getSectionByType('about_inframe');
  const affiliationSection = getSectionByType('affiliation'); // Add this line
  const coreValuesSection = getSectionByType('core_values');
  const missionSection = getSectionByType('mission');
  const campusLifeSection = getSectionByType('campus_life');
  const foundationalBeliefsSection = getSectionByType('foundational_beliefs');

  // Server-side pe AOS classes add na hone dein
  const getAosProps = (animation: string, delay?: number) => {
    if (!isClient) return {};
    return {
      'data-aos': animation,
      'data-aos-once': 'true',
      ...(delay && { 'data-aos-delay': delay.toString() })
    };
  };

  return (
    <div className={`min-h-screen bg-white ${poppins.className}`}>
      {/* Hero Section */}
      <Suspense fallback={<LoadingSpinner />}>
        <AboutHero
          section={heroSection?.section}
          items={heroSection?.items || []}
        />
      </Suspense>

      {/* About Section */}
      {aboutSection && aboutSection.items.length > 0 && (
        <section className="bg-white text-black py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              {/* Left side: Image */}
              <div {...getAosProps('fade-right')}>
                {aboutSection.items[0]?.image_urls?.[0] ? (
                  <img
                    src={aboutSection.items[0].image_urls[0]}
                    alt={aboutSection.items[0].title || "About Us"}
                    className="w-full h-auto rounded-lg shadow-lg"
                  />
                ) : (
                  <img
                    src={"/images/gallery/1719304885452_1.jpg"}
                    alt={"Cultural Event"}
                    className="w-full h-auto rounded-lg shadow-lg"
                  />
                )}
              </div>

              {/* Right side: Text */}
              <div {...getAosProps('fade-left')}>
                <h2 className="text-4xl font-bold mb-6">
                  {aboutSection.items[0]?.title || "About Us"}
                </h2>
                {aboutSection.items[0]?.content && (
                  <div className="text-justify">
                    {formatTextWithNewLines(aboutSection.items[0].content)}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Key Highlights Section */}
      <Suspense fallback={<LoadingSpinner />}>
        <KeyHighlights
          section={counterSection?.section}
          items={counterSection?.items || []}
        />
      </Suspense>

      {/* Vision Section */}
      {visionSection && visionSection.items.length > 0 && (
        <section className="bg-white text-black py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div {...getAosProps('fade-left')}>
                <h2 className="text-4xl font-bold mb-6">
                  {visionSection.items[0]?.title || "VISION"}
                </h2>
                {visionSection.items[0]?.content && (
                  <div className="text-justify">
                    {formatTextWithNewLines(visionSection.items[0].content)}
                  </div>
                )}
              </div>

              {/* Right side: Image */}
              <div {...getAosProps('fade-right')}>
                {visionSection.items[0]?.image_urls?.[0] ? (
                  <img
                    src={visionSection.items[0].image_urls[0]}
                    alt={visionSection.items[0].title || "Vision"}
                    className="w-full h-auto rounded-lg shadow-lg"
                  />
                ) : (
                  <img
                    src={"/images/gallery/IMG_20240605_124215.jpg"}
                    alt={"Cultural Event"}
                    className="w-full h-auto rounded-lg shadow-lg"
                  />
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* About Inframe Section */}
      <Suspense fallback={<LoadingSpinner />}>
        <AboutInframe
          section={aboutInframeSection?.section}
          items={aboutInframeSection?.items || []}
        />
      </Suspense>

      {/* Affiliation Section */}
      {affiliationSection && (
        <section className="w-full bg-gradient-to-br from-white to-gray-50 text-gray-800 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <Suspense fallback={<LoadingSpinner />}>
              <Affiliation
                section={affiliationSection?.section}
                items={affiliationSection?.items || []}
              />
            </Suspense>
          </div>
        </section>
      )}

      {/* Core Values Section */}
      <Suspense fallback={<LoadingSpinner />}>
        <CoreValues
          section={coreValuesSection?.section}
          items={coreValuesSection?.items || []}
        />
      </Suspense>

      {/* Mission Section */}
      {missionSection && missionSection.items.length > 0 && (
        <section className="bg-white text-black py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-20 items-center">
              {/* Left side: Image */}
              <div {...getAosProps('fade-right')}>
                {missionSection.items[0]?.image_urls?.[0] ? (
                  <img
                    src={missionSection.items[0].image_urls[0]}
                    alt={missionSection.items[0].title || "Mission"}
                    className="w-full h-auto rounded-lg shadow-lg"
                  />
                ) : (
                  <img
                    src={"/images/gallery/1721366668571.jpg"}
                    alt="Cultural Event"
                    className="w-full h-auto rounded-lg shadow-lg"
                  />
                )}
              </div>

              {/* Right side: Text */}
              <div {...getAosProps('fade-left')}>
                <h2 className="text-4xl font-bold mb-6">
                  {missionSection.items[0]?.title || "MISSION"}
                </h2>
                {missionSection.items[0]?.content && (
                  <div className="text-justify">
                    {formatTextWithNewLines(missionSection.items[0].content)}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Campus Life Section */}
      <Suspense fallback={<LoadingSpinner />}>
        <CampusLife
          section={campusLifeSection?.section}
          items={campusLifeSection?.items || []}
        />
      </Suspense>

      {/* Foundational Beliefs Section */}
      <Suspense fallback={<LoadingSpinner />}>
        <FoundationalBeliefs
          section={foundationalBeliefsSection?.section}
          items={foundationalBeliefsSection?.items || []}
        />
      </Suspense>

      {/* Industry Partners Section - Static */}
      <Suspense fallback={<LoadingSpinner />}>
        <IndustryPartners />
      </Suspense>
    </div>
  );
};

export default AboutPage;