// components/ReelCard.tsx - ONLY UPDATED PARTS
"use client";
import { Button } from "@components/ui/button";
import { Card } from "@components/ui/card";
import {
  ArrowLeft,
  Camera,
  Heart,
  MessageCircle,
  Send,
  MoreHorizontal,
  Instagram,
  Twitter,
  Youtube,
  Facebook,
  Tally1,
  Linkedin,
  Globe,
  Video as VideoIcon,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Poppins } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import { fetchContactInfo, type ContactInfoItem } from "../api/api";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

// Helper function to get social media URLs and videos - UPDATED
const getSocialMediaData = (contacts: ContactInfoItem[]) => {
  const getValue = (title: string): string | null => {
    const contact = contacts.find(c => c.title.toLowerCase() === title.toLowerCase());
    return contact?.value || null;
  };

  return {
    // Social Media Links
    instagram: getValue("instagram"),
    facebook: getValue("facebook"),
    twitter: getValue("twitter"),
    youtube: getValue("youtube"),
    linkedin: getValue("linkedin"),
    website: getValue("website"),
    pinterest: getValue("pinterest"),
    tiktok: getValue("tiktok"),
    
    // Videos - FIXED: Use 'promo_video' to match your database
    promoVideo1: getValue("promo_video_1"),
    promoVideo2: getValue("promo_video_2"),
    promoVideo3: getValue("promo_video_3"),
    reelVideo: getValue("reel_video"),
    promo_video: getValue("promo_video"), // This is what you have in DB
    
    // Profile Data
    profilePicture: getValue("profile_picture") || "/96252855_545538459478510_4060708075890278400_n.jpg", // Use default
    collegeName: getValue("name") || getValue("college_name"),
    
    // Check if any social links exist
    hasSocialLinks: function() {
      return !!(this.instagram || this.facebook || this.twitter || 
               this.youtube || this.linkedin || this.website);
    },
    
    // Check if any videos exist - FIXED: Use 'promo_video'
    hasVideos: function() {
      return !!(this.promoVideo1 || this.promoVideo2 || this.promoVideo3 || 
               this.reelVideo || this.promo_video);
    }
  };
};

const ReelCard = () => {
  const [videoIndex, setVideoIndex] = useState(0);
  const [isredHeart, setIsredHeart] = useState(false);
  const [socialData, setSocialData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [hasReelSection, setHasReelSection] = useState(false);

  // Fetch all data from database
  useEffect(() => {
    const loadSocialData = async () => {
      try {
        const data = await fetchContactInfo();
        const socialData = getSocialMediaData(data);
        console.log("Fetched social data:", socialData);
        console.log("Has videos:", socialData.hasVideos());
        console.log("Available videos:", getAvailableVideos(socialData));
        
        setSocialData(socialData);
        
        // Check if we have enough data to show reel section
        // Updated condition: Need video OR profile picture + social links
        const hasVideo = socialData.hasVideos();
        const hasProfile = !!socialData.profilePicture;
        const hasSocial = socialData.hasSocialLinks();
        
        // Show reel section if we have video OR (profile + social links)
        setHasReelSection((hasVideo || hasProfile) && hasSocial);
      } catch (error) {
        console.error("Error loading social data:", error);
        setSocialData({
          instagram: null,
          facebook: null,
          twitter: null,
          youtube: null,
          linkedin: null,
          website: null,
          hasSocialLinks: () => false,
          hasVideos: () => false,
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadSocialData();
  }, []);

  // Get all available videos - UPDATED
  const getAvailableVideos = (data = socialData) => {
    if (!data) return [];
    
    const videos = [];
    if (data.promo_video) videos.push(data.promo_video); // Changed from promotional_video
    if (data.reelVideo) videos.push(data.reelVideo);
    if (data.promoVideo1) videos.push(data.promoVideo1);
    if (data.promoVideo2) videos.push(data.promoVideo2);
    if (data.promoVideo3) videos.push(data.promoVideo3);
    
    console.log("Available videos:", videos);
    return videos;
  };

  const handleVideoEnd = () => {
    const videos = getAvailableVideos();
    if (videos.length > 0) {
      setVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
    }
  };

  // Get Instagram username from URL for display
  const getInstagramUsername = () => {
    if (!socialData?.instagram) return "inframecollege";
    try {
      const url = new URL(socialData.instagram);
      return url.pathname.replace('/', '') || "inframecollege";
    } catch {
      return "inframecollege";
    }
  };

  // Get current video to display
  const getCurrentVideo = () => {
    const videos = getAvailableVideos();
    return videos.length > 0 ? videos[videoIndex] : null;
  };

  // Render social media links section - SIMPLIFIED
  const renderSocialLinksSection = () => {
    if (!socialData || !socialData.hasSocialLinks()) return null;

    return (
      <div className="text-center mb-12">
        <h1
          className={`text-white text-5xl lg:text-6xl font-extrabold mb-6 ${poppins.className}`}
        >
          Follow Us on Social Media
        </h1>
        <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
          Stay updated with the latest trends, reels, and stories by following
          our social media channels.
        </p>
        
        <div className="flex flex-wrap justify-center gap-6 mt-6">
          {socialData.instagram && (
            <a
              href={socialData.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
              title="Instagram"
            >
              <Instagram className="text-white w-12 h-12 hover:text-pink-500 transition-colors duration-300" />
            </a>
          )}
          
          {socialData.facebook && (
            <a
              href={socialData.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
              title="Facebook"
            >
              <Facebook className="text-white w-12 h-12 hover:text-blue-500 transition-colors duration-300" />
            </a>
          )}
          
          {socialData.twitter && (
            <a
              href={socialData.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
              title="Twitter"
            >
              <Twitter className="text-white w-12 h-12 hover:text-blue-400 transition-colors duration-300" />
            </a>
          )}
          
          {socialData.youtube && (
            <a
              href={socialData.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
              title="YouTube"
            >
              <Youtube className="text-white w-12 h-12 hover:text-red-600 transition-colors duration-300" />
            </a>
          )}
          
          {socialData.linkedin && (
            <a
              href={socialData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
              title="LinkedIn"
            >
              <Linkedin className="text-white w-12 h-12 hover:text-blue-700 transition-colors duration-300" />
            </a>
          )}
          
          {socialData.website && (
            <a
              href={socialData.website}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
              title="Website"
            >
              <Globe className="text-white w-12 h-12 hover:text-gray-300 transition-colors duration-300" />
            </a>
          )}
        </div>
      </div>
    );
  };

  // Render Reel Card Section - SIMPLIFIED
  const renderReelCardSection = () => {
    if (!hasReelSection) return null;
    
    const currentVideo = getCurrentVideo();
    const profilePic = socialData.profilePicture || "/96252855_545538459478510_4060708075890278400_n.jpg";

   return (
  <section className="my-10 flex justify-center">
    <div
      className={`${
        currentVideo
          ? "grid grid-cols-1 md:grid-cols-2 gap-6"
          : "flex justify-center"
      }`}
    >
      {/* ================= VIDEO CARD ================= */}
      {currentVideo && (
        <Card className="relative w-[354px] h-[629px] rounded-2xl shadow-2xl overflow-hidden border border-gray-800">
          <video
            className="absolute top-0 left-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            onEnded={handleVideoEnd}
          >
            <source src={currentVideo} type="video/mp4" />
          </video>

          {/* Gradient overlay */}
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-0"></div>

          {/* Header */}
          <div className="flex justify-between items-center mb-4 p-4 relative z-10">
            <div className="flex items-center">
              <Button
                size="sm"
                variant="ghost"
                className="text-white hover:bg-white/10"
                onClick={() => {
                  const videos = getAvailableVideos();
                  if (videos.length > 0) {
                    setVideoIndex(
                      (prev) => (prev - 1 + videos.length) % videos.length
                    );
                  }
                }}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <p className="text-white font-semibold text-lg ml-2">
                Reels{" "}
                {getAvailableVideos().length > 0 &&
                  `(${videoIndex + 1}/${getAvailableVideos().length})`}
              </p>
            </div>
            <Button
              size="sm"
              variant="ghost"
              className="text-white hover:bg-white/10"
            >
              <Camera className="h-5 w-5" />
            </Button>
          </div>

          {/* Footer */}
          <div className="flex justify-between pb-[5.5rem] items-end h-full relative z-10 px-4">
            {/* Left Content */}
            <div className="flex flex-col mb-4 text-white">
              <div className="flex items-center mb-3">
                <Image
                  src={profilePic}
                  alt="Profile Picture"
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full border-2 border-gray-800 object-cover"
                />
                <div className="ml-3">
                  <p className="font-semibold">
                    {getInstagramUsername()}
                  </p>
                  {socialData.collegeName && (
                    <p className="text-xs text-gray-300">
                      {socialData.collegeName}
                    </p>
                  )}
                  <Button
                    size="sm"
                    className="mt-1 text-black bg-white hover:bg-gray-200 text-xs"
                  >
                    Follow
                  </Button>
                </div>
              </div>

              <p className="text-sm bg-black/30 p-2 rounded-lg">
                Check out our latest promotional content!
              </p>
            </div>

            {/* Right Icons */}
            <div className="flex flex-col items-center space-y-4">
              <Heart className="h-6 w-6 text-white" />
              <MessageCircle className="h-6 w-6 text-white" />
              <Send className="h-6 w-6 text-white" />
              <MoreHorizontal className="h-6 w-6 text-white" />
            </div>
          </div>
        </Card>
      )}

      {/* ================= SOCIAL CARD ================= */}
      <Card className="w-[354px] h-[629px] rounded-2xl shadow-2xl border border-gray-800 flex flex-col justify-center items-center text-center">
        <Image
          src={profilePic}
          alt="Profile"
          width={80}
          height={80}
          className="rounded-full border-2 border-gray-700"
        />

        <p className="mt-4 text-white font-semibold text-xl">
          {getInstagramUsername()}
        </p>

        {socialData.collegeName && (
          <p className="text-gray-400 text-sm">
            {socialData.collegeName}
          </p>
        )}

        <div className="flex gap-4 mt-6">
          {socialData.instagram && (
            <Link href={socialData.instagram}>
              <Button>Instagram</Button>
            </Link>
          )}
          {socialData.youtube && (
            <Link href={socialData.youtube}>
              <Button variant="outline">YouTube</Button>
            </Link>
          )}
        </div>
      </Card>
    </div>
  </section>
);

  };

  if (loading) {
    return (
      <div className="bg-gradient-to-b from-black via-gray-900 to-black min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
          <p className="text-white">Loading social media...</p>
        </div>
      </div>
    );
  }

  // Check if we have any content to show at all
  const hasSocialLinks = socialData?.hasSocialLinks();
  const hasAnyContent = hasSocialLinks || hasReelSection;

  if (!hasAnyContent) {
    return null; // Don't render anything if no content
  }

  return (
    <div className="bg-gradient-to-b from-black via-gray-900 to-black min-h-screen flex flex-col items-center py-10">
      <div className="w-full max-w-7xl px-6">
        {/* Simple layout - social links on top, reel card below */}
        {renderSocialLinksSection()}
        {renderReelCardSection()}
      </div>
    </div>
  );
};

export default ReelCard;