import { Poppins } from "next/font/google";
import AdvisorsHeader from "./components/AdvisorsHeader";
import AdvisorsGrid from "./components/AdvisorsGrid";
import { fetchAdvisors } from "./api/api";
import type { Metadata } from "next";

// Define font
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

// Define metadata
export const metadata: Metadata = {
  title: "Meet Our Expert Advisors | Inframe School | Leadership & Guidance",
  description: "Meet Inframe School's expert advisors - industry leaders and visionaries who guide our institution with their expertise and shape the future of creative education.",
  keywords: ["advisors", "leadership", "guidance", "industry experts", "education"],
  openGraph: {
    title: "Meet Our Expert Advisors | Inframe School",
    description: "Meet the exceptional individuals who guide our institution with their expertise and vision.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Meet Our Expert Advisors | Inframe School",
    description: "Meet the exceptional individuals who guide our institution with their expertise and vision.",
  },
};

export default async function AdvisorsPage() {
  // Fetch advisors from API (server-side)
  const advisors = await fetchAdvisors();

  return (
    <div className={`w-full min-h-screen bg-zinc-100 ${poppins.className}`}>
      <AdvisorsHeader />

      {/* Diagonal Divider */}
      <div className="relative h-24 bg-zinc-100">
        <div className="absolute top-0 left-0 w-full h-24 bg-zinc-900 skew-y-3 transform origin-top-right z-0"></div>
      </div>

      {/* Advisors Grid */}
      <div className="container mx-auto px-6 py-16 -mt-12 relative z-10">
        <AdvisorsGrid advisors={advisors} />
      </div>
    </div>
  );
}