// app/(main)/lifeatinframe/components/StudentClubs.tsx
"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { LifeSection, LifeSectionItem } from "../api/api";

interface StudentClubsProps {
  section: LifeSection;
  items: LifeSectionItem[];
}

const StudentClubs: React.FC<StudentClubsProps> = ({ section, items }) => {
  const categories = ['Creative', 'Sports', 'Academic', 'Cultural'];

  // If no items, use static data
  const displayItems = items.length > 0 ? items : [
    {
      id: '1',
      title: "Arts & Creative Club",
      content: "Unleash your creativity through various forms of art including painting, sketching, digital art, and creative writing. Our club provides a nurturing environment for aspiring artists to explore their talents, learn new techniques, and showcase their work through exhibitions and workshops.",
      image_urls: ["/students club/Screenshot 2025-02-06 163214.png"],
    },
    {
      id: '2',
      title: "Sports Club",
      content: "Join our dynamic sports community where fitness meets fun! From organizing inter-college tournaments to conducting regular training sessions, we promote physical fitness, team spirit, and sportsmanship. Participate in various sports including cricket, football, basketball, and athletics.",
      image_urls: ["/students club/Screenshot 2025-02-06 163141.png"],
    },
    {
      id: '3',
      title: "Academic Club",
      content: "Dive deep into intellectual pursuits with our academic club. We organize debate competitions, quiz events, research presentations, and academic workshops. This is your platform to enhance critical thinking, develop research skills, and excel in your academic journey.",
      image_urls: ["/students club/Screenshot 2025-02-06 163247.png"],
    },
    {
      id: '4',
      title: "Cultural Club",
      content: "Celebrate diversity and tradition through our cultural club. Experience the richness of various cultures through music, dance, festivals, and traditional art forms. We organize cultural fests, traditional day celebrations, and inter-cultural exchange programs.",
      image_urls: ["/students club/Screenshot 2025-02-06 163311.png"],
    },
  ] as LifeSectionItem[];

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Student Clubs & Societies
            </h2>
        
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover your passion and connect with like-minded individuals through our diverse range of student clubs. Each club offers unique opportunities for personal growth, leadership development, and unforgettable experiences.
            </p>
        </motion.div>

        {/* Clubs List */}
        <div className="space-y-12">
          {displayItems.slice(1).map((club, index) => (
            <motion.div
              key={club.id || index}
              className="bg-white overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg"
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="flex flex-col md:flex-row">
                {/* Text Content */}
                <div className="flex-1 p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <h3 className="text-2xl font-bold text-gray-900">
                      {club.title || `Student Club ${index + 1}`}
                    </h3>
                    <span className="bg-blue-100 text-blue-800 px-4 py-1 rounded-full text-sm font-semibold">
                      {categories[index % categories.length] || 'Club'}
                    </span>
                  </div>

                  {club.content && (
                    <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                      {club.content}
                    </p>
                  )}
                  
                  {club.extra_text && (
                    <p className="text-gray-600 text-sm">
                      {club.extra_text}
                    </p>
                  )}
                </div>

                {/* Image */}
                {club.image_urls?.[0] && (
                  <div className="md:w-2/5 relative">
                    <Image
                      src={club.image_urls[0]}
                      alt={club.title || 'Student club'}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 40vw"
                      priority={index === 0}
                    />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StudentClubs;