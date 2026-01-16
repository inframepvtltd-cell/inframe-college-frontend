"use client";

import { Suspense, lazy, useState } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { Poppins } from "next/font/google";
import "@components/style.css";
import { LifeSection, LifeSectionItem } from '../api/api';
import LoadingSpinner from './LoadingSpinner';
import ApplyNowForm from '@components/ApplyNowForm';

// Lazy load heavy components
const CampusLife = lazy(() => import('./CampusLife'));
const CampusGallery = lazy(() => import('./CampusGallery'));
const SportsArena = lazy(() => import('./SportsArena'));
const StudentClubs = lazy(() => import('./StudentClubs'));
const CampusTour = lazy(() => import('./CampusTour'));


const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
});

interface SectionWithItems {
  section: LifeSection;
  items: LifeSectionItem[];
}

interface LifeAtInframePageProps {
  sectionsWithItems: SectionWithItems[];
}

// Helper function to split text by new lines
const formatTextWithNewLines = (text: string | null) => {
  if (!text) return null;

  const paragraphs = text.split('\n').filter(p => p.trim());

  if (paragraphs.length === 1) {
    return <p className="text-lg mb-6 text-justify">{paragraphs[0]}</p>;
  }

  return paragraphs.map((para, index) => (
    <p key={index} className="text-lg mb-4 text-justify">
      {para}
    </p>
  ));
};

// Function to render icon based on icon string from database
const renderIcon = (icon: string | null) => {
  if (!icon) return null;

  // Check if icon is a shape name
  if (icon.toLowerCase() === 'circle') {
    return (
      <svg viewBox="0 0 24 24" className="w-full h-full">
        <circle cx="12" cy="12" r="10" fill="white" fillOpacity="0.2" />
      </svg>
    );
  }

  if (icon.toLowerCase() === 'square') {
    return (
      <svg viewBox="0 0 24 24" className="w-full h-full">
        <rect width="18" height="18" x="3" y="3" fill="white" fillOpacity="0.2" />
      </svg>
    );
  }

  if (icon.toLowerCase() === 'triangle') {
    return (
      <svg viewBox="0 0 24 24" className="w-full h-full">
        <polygon points="12 2 22 22 2 22" fill="white" fillOpacity="0.2" />
      </svg>
    );
  }

  // If it's an emoji or other icon
  return <div className="text-4xl">{icon}</div>;
};

// Colors for services cards
const serviceColors = ['bg-red-500', 'bg-blue-600', 'bg-green-600'];

const LifeAtInframePage: React.FC<LifeAtInframePageProps> = ({ sectionsWithItems }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Helper function to get section by type
  const getSectionByType = (type: string): SectionWithItems | undefined => {
    return sectionsWithItems.find(s => s.section.section_type === type);
  };

  const handleApplyClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    setIsFormOpen(true);
  };

  // Get data for each section
  const heroSection = getSectionByType('life_hero');
  const welcomeSection = getSectionByType('life_welcome');
  const servicesSection = getSectionByType('life_student_services');
  const campusLifeSection = getSectionByType('life_campus_life');
  const studentClubsSection = getSectionByType('life_student_clubs');
  const sportsArenaSection = getSectionByType('life_sports_arena');
  const campusTourSection = getSectionByType('life_campus_tour');
  const eventsSection = getSectionByType('life_events_activities');
  const gallerySection = getSectionByType('life_gallery');
  const ctaSection = getSectionByType('life_cta');

  // Static fallback data (if database has no data)
  const defaultHeroImage = "/images/gallery/1721738128651.jpg";

  return (
    <div className={`min-h-screen ${poppins.className}`}>
      {/* Hero Section */}
      <div className="relative z-10">
        <div className="relative h-screen">
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-transparent z-10" />

          {/* Hero Image */}
          <Image
            src={
              heroSection?.items?.[0]?.image_urls?.[0] || defaultHeroImage
            }
            alt={heroSection?.items?.[0]?.title || "Campus Life Hero Image"}
            fill
            className="object-cover"
            priority
            sizes="100vw"
            quality={85}
          />

          {/* Content */}
          <div className="absolute inset-0 z-20 flex items-center">
            <div className="max-w-7xl mx-auto px-4 w-full">
              <div className="max-w-3xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-1.5 h-12 bg-yellow-500" />
                  <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight">
                    {heroSection?.items?.[0]?.title || "LIFE @ INFRAME"}
                  </h1>
                </div>

                <p className="text-xl text-white/80 max-w-2xl">
                  {heroSection?.items?.[0]?.content ||
                    "Discover a vibrant community where learning, innovation, and personal growth intersect"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Welcome Section */}
      <section className="w-full py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              {/* SECTION TITLE HIDDEN - Only show item title if exists */}
              {welcomeSection?.items[0]?.title ? (
                <h2 className="text-4xl font-bold mb-6 text-black shad">
                  {welcomeSection.items[0].title}
                </h2>
              ) : (
                <h2 className="text-4xl font-bold mb-6 text-black">
                  Welcome to Campus Life
                </h2>
              )}

              {/* Content with new line formatting */}
              {welcomeSection?.items[0]?.content && (
                <div className="mb-6 text-black">
                  {formatTextWithNewLines(welcomeSection.items[0].content)}
                </div>
              )}

              {/* Extra text if exists */}
              {welcomeSection?.items[0]?.extra_text && (
                <div className="mb-6 text-black">
                  {formatTextWithNewLines(welcomeSection.items[0].extra_text)}
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              {/* First image */}
              <div className="relative w-full h-64">
                {welcomeSection?.items[0]?.image_urls?.[0] ? (
                  <Image
                    src={welcomeSection.items[0].image_urls[0]}
                    alt="Campus view 1"
                    fill
                    className="object-cover rounded-lg"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={85}
                    loading="lazy"
                  />
                ) : (
                  <Image
                    src="/fashion-1.JPG"
                    alt="Campus view 1"
                    fill
                    className="object-cover rounded-lg"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={85}
                    loading="lazy"
                  />
                )}
              </div>

              {/* Second image */}
              <div className="relative w-full h-64 mt-8">
                {welcomeSection?.items[1]?.image_urls?.[0] ? (
                  <Image
                    src={welcomeSection.items[1].image_urls[0]}
                    alt="Campus view 2"
                    fill
                    className="object-cover rounded-lg"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={85}
                    loading="lazy"
                  />
                ) : (
                  <Image
                    src="/images/gallery/1721366034581.jpg"
                    alt="Campus view 2"
                    fill
                    className="object-cover rounded-lg"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={85}
                    loading="lazy"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Student Services Section */}
      <section className="w-full py-24">
        <div className="max-w-7xl mx-auto px-4">
          {/* SECTION TITLE HIDDEN - Only show if items have content */}

          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-black">
              Comprehensive Student Services
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We provide extensive support services to ensure your academic journey is smooth and successful.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* If database has services, use them */}
            {servicesSection && servicesSection.items.length > 0 ? (
              servicesSection.items.map((service, index) => {
                const color = serviceColors[index % serviceColors.length];

                return (
                  <Card
                    key={service.id}
                    className={`${color} text-white hover:scale-105 transition-transform duration-300`}
                  >
                    <CardContent className="p-8">
                      <div className="h-16 w-16 mb-6">
                        {renderIcon(service.icon)}
                      </div>
                      {service.title && (
                        <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                      )}
                      {service.content && (
                        <div className="mb-6 text-white">
                          {formatTextWithNewLines(service.content)}
                        </div>
                      )}
                      <Button
                        variant="outline"
                        className="text-white border-white bg-transparent hover:bg-white/20 w-full"
                      >
                        Learn More <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                );
              })
            ) : (
              // Static fallback services
              [
                {
                  title: "Academic Support",
                  description: "Access tutoring services, writing centers, and academic advisors who are committed to helping you achieve your educational goals.",
                  icon: "circle",
                },
                {
                  title: "Career Development",
                  description: "Prepare for your future career with our comprehensive career services including resume workshops and job fairs.",
                  icon: "square",
                },
                {
                  title: "Student Wellness",
                  description: "Take care of your physical and mental well-being with our comprehensive wellness programs and health services.",
                  icon: "triangle",
                },
              ].map((service, index) => (
                <Card
                  key={index}
                  className={`${serviceColors[index]} text-white hover:scale-105 transition-transform duration-300`}
                >
                  <CardContent className="p-8">
                    <div className="h-16 w-16 mb-6">
                      {renderIcon(service.icon)}
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                    <p className="mb-6 text-justify">{service.description}</p>
                    <Button
                      variant="outline"
                      className="text-white border-white bg-transparent hover:bg-white/20 w-full"
                    >
                      Learn More <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </section>

      <div className="bg bg1"></div>

      {/* Campus Life Gallery */}
      {campusLifeSection && (
        <Suspense fallback={<LoadingSpinner />}>
          <CampusLife
            section={campusLifeSection.section}
            items={campusLifeSection.items}
          />
        </Suspense>
      )}

      {/* Student Clubs */}
      {studentClubsSection && (
        <Suspense fallback={<LoadingSpinner />}>
          <StudentClubs
            section={studentClubsSection.section}
            items={studentClubsSection.items}
          />
        </Suspense>
      )}

      <div className="bg bg2" />

      {/* Sports Arena */}
      {sportsArenaSection && (
        <Suspense fallback={<LoadingSpinner />}>
          <SportsArena
            section={sportsArenaSection.section}
            items={sportsArenaSection.items}
          />
        </Suspense>
      )}

      {/* Campus Tour */}
      {campusTourSection && (
        <Suspense fallback={<LoadingSpinner />}>
          <CampusTour
            section={campusTourSection.section}
            items={campusTourSection.items}
          />
        </Suspense>
      )}

      {/* Events & Activities Section */}
      <section className="w-full pb-10">
        <div className="max-w-7xl mx-auto px-4">
          {/* SECTION TITLE HIDDEN - Only show if items have content */}
         
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6 text-black">
                Campus Events & Activities
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Immerse yourself in a diverse range of events and activities that make campus life exciting and memorable.
              </p>
            </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* If database has events, use them */}
            {eventsSection && eventsSection.items.length > 0 ? (
              eventsSection.items.map((event, index) => (
                <Card key={event.id} className="hover:shadow-xl transition-shadow duration-300">
                  {event.image_urls?.[0] && (
                    <div className="relative h-56 w-full">
                      <Image
                        src={event.image_urls[0]}
                        alt={event.title || 'Event image'}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                        quality={85}
                        loading="lazy"
                      />
                    </div>
                  )}
                  <CardContent className="p-8">
                    {event.title && (
                      <h3 className="text-2xl font-bold mb-4">{event.title}</h3>
                    )}
                    {event.content && (
                      <div className="mb-6">
                        {formatTextWithNewLines(event.content)}
                      </div>
                    )}
                    <Button variant="outline" className="w-full">
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))
            ) : (
              // Static fallback events
              [
                {
                  title: "Arts & Culture",
                  description: "Express yourself through our vibrant arts and culture scene. Participate in theatrical productions and music concerts.",
                  image: "/fine art/SKF09513.JPG",
                },
                {
                  title: "Sports & Recreation",
                  description: "Stay active and competitive with our comprehensive sports programs for all skill levels.",
                  image: "/IMG_8698.jpg",
                },
                {
                  title: "Student Organizations",
                  description: "Find your community in our diverse student organizations. From academic clubs to special interest groups.",
                  image: "/images/gallery/1717492692489 - Copy (2).jpg",
                },
              ].map((event, index) => (
                <Card key={index} className="hover:shadow-xl transition-shadow duration-300">
                  <div className="relative h-56 w-full">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      quality={85}
                      loading="lazy"
                    />
                  </div>
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold mb-4">{event.title}</h3>
                    <p className="text-gray-600 mb-6">{event.description}</p>
                    <Button variant="outline" className="w-full">
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </section>

      <div className="bg bg3" />

      {/* Campus Gallery */}
      {gallerySection ? (
        <Suspense fallback={<LoadingSpinner />}>
          <CampusGallery
            section={gallerySection.section}
            items={gallerySection.items}
          />
        </Suspense>
      ) : (
        <Suspense fallback={<LoadingSpinner />}>
          <CampusGallery
            section={{
              id: 'static-gallery',
              title: 'Gallery',
              section_type: 'gallery',
              description: null,
              order_num: 1,
              max_images: 10,
              has_title: true,
              has_content: true,
              has_extra_text: false,
              has_icon: false,
              has_video: false,
              supports_multiple_images: true,
              is_active: true,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            }}
            items={[]}
          />
        </Suspense>
      )}

      {/* CTA Section */}
      <section className="w-full py-24 my-10 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          {ctaSection?.items[0]?.title || ctaSection?.section.title ? (
            <h2 className="text-4xl font-bold mb-6">
              {ctaSection?.items[0]?.title || ctaSection?.section.title || 'Begin Your Journey'}
            </h2>
          ) : (
            <h2 className="text-4xl font-bold mb-6">Begin Your Journey</h2>
          )}

          {ctaSection?.items[0]?.content || ctaSection?.section.description ? (
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              {ctaSection?.items[0]?.content || ctaSection?.section.description}
            </p>
          ) : (
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Ready to become part of our vibrant campus community? Take the first step towards your future today.
            </p>
          )}

          <div className="flex gap-6 justify-center">
            <Button
              onClick={handleApplyClick}
              className="bg-yellow-400 text-black px-24 py-8 font-bold text-lg hover:bg-yellow-500 relative z-50"
            >
              Apply Now
            </Button>
            <ApplyNowForm
              isFormOpen={isFormOpen}
              setIsFormOpen={setIsFormOpen}
              isScrolled={false}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default LifeAtInframePage;