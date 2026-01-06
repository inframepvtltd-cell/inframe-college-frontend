// app/news-events/components/HeroSection.tsx
import React from "react";

const HeroSection: React.FC = () => {
  return (
    <div className="relative py-28 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1503387837-b154d5074bd2?q=80&w=2071&auto=format&fit=crop"
          alt="Design School Background"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black opacity-60"></div>

        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNNjAgMEgwdjYwaDYwVjB6TTMwIDMwaDMwVjBoLTMwdjMwek0wIDMwaDMwdjMwSDBWMzB6IiBmaWxsPSIjMjEyMTIxIiBmaWxsLW9wYWNpdHk9Ii4wMyIvPjwvZz48L3N2Zz4=')] opacity-30"></div>

        {/* Accent line */}
        <div className="absolute left-0 top-1/2 h-px w-full bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-20"></div>
      </div>
      <div className="relative container mx-auto px-6 z-10">
        <div className="flex flex-col max-w-5xl">
          {/* Section indicator */}
          <div className="inline-flex items-center space-x-2 mb-6">
            <div className="w-6 h-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-yellow-400"
              >
                <path d="M16.881 4.346A23.112 23.112 0 018.25 6H7.5a5.25 5.25 0 00-.88 10.427 21.593 21.593 0 001.378 3.94c.464 1.004 1.674 1.32 2.582.796l.657-.379c.88-.508 1.165-1.592.772-2.468a17.116 17.116 0 01-.628-1.607c1.918.258 3.76.75 5.5 1.446A21.727 21.727 0 0018 11.25c0-2.413-.393-4.735-1.119-6.904zM18.26 3.74a23.22 23.22 0 011.24 7.51 23.22 23.22 0 01-1.24 7.51c-.055.161-.111.322-.17.482a.75.75 0 101.409.516 24.555 24.555 0 001.415-6.43 2.992 2.992 0 00.836-2.078c0-.806-.319-1.54-.836-2.078a24.65 24.65 0 00-1.415-6.43.75.75 0 10-1.409.516c.059.16.115.321.17.483z" />
              </svg>
            </div>
            <span className="text-yellow-400 uppercase tracking-wider font-medium text-sm">
              Latest Updates
            </span>
          </div>

          {/* Main heading with animated typing effect style */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            News &{" "}
            <span className="text-yellow-400 relative">
              Events
              <span className="absolute -bottom-1 left-0 w-full h-1 bg-yellow-400 transform scale-x-100 origin-left"></span>
            </span>
          </h1>

          {/* Description with better typography */}
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl leading-relaxed mb-8">
            Discover the latest happenings, exhibitions, workshops, and
            announcements from the School of Art, Design, and Business.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;