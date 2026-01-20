import { Poppins } from "next/font/google";
import MentorsHeader from "./components/MentorHeader";
import MentorsGrid from "./components/MentorGrid";
import MentorsCTA from "./components/MentorCTA";
import { fetchMentors } from "./api/api";
import type { Metadata } from "next";
import PageMetaData from '../page_meta/components/PageMetaData';

// Define font
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});


// Single export default function
export default async function MentorsPage() {
  // Fetch mentors from API (server-side)
  const mentors = await fetchMentors();

  return (
    <>
      {/* This will dynamically update meta tags - CLIENT COMPONENT */}
      <PageMetaData 
        slug="mentors"
        fallbackTitle="Meet Our Expert Mentors | Inframe School"
        fallbackDescription="Learn from industry leaders at Inframe School"
      />
      
      {/* Your page content */}
      <div className={`w-full min-h-screen bg-white ${poppins.className}`}>
        <MentorsHeader />
        
        {/* Curved Divider */}
        <div className="relative h-16">
          <svg className="absolute bottom-0 w-full h-16 fill-white" preserveAspectRatio="none" viewBox="0 0 1440 54">
            <path d="M0 0L1440 0C1440 0 1440 54 720 54C0 54 0 0 0 0Z"></path>
          </svg>
        </div>

        {/* Mentors Section */}
        <div className="container mx-auto px-6 py-16 -mt-8">
          <MentorsGrid mentors={mentors} />
        </div>
        
        <MentorsCTA />
      </div>
    </>
  );
}