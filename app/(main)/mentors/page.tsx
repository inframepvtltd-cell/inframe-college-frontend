import { Poppins } from "next/font/google";
import MentorsHeader from "./components/MentorHeader";
import MentorsGrid from "./components/MentorGrid";
import MentorsCTA from "./components/MentorCTA";
import { fetchMentors } from "./api/api";
import type { Metadata } from "next";

// Define font
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

// Define metadata
export const metadata: Metadata = {
  title: "Meet Our Expert Mentors | Inframe School | Learn from Industry Leaders",
  description: "Meet Inframe School's expert mentors - industry leaders with years of experience, offering valuable guidance for your academic and professional success.",
  keywords: ["mentors", "industry experts", "guidance", "career development", "professional mentors"],
  openGraph: {
    title: "Meet Our Expert Mentors | Inframe School",
    description: "Learn from industry leaders who bring real-world experience and cutting-edge insights.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Meet Our Expert Mentors | Inframe School",
    description: "Learn from industry leaders who bring real-world experience and cutting-edge insights.",
  },
};

export default async function MentorsPage() {
  // Fetch mentors from API (server-side)
  const mentors = await fetchMentors();

  return (
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
  );
}