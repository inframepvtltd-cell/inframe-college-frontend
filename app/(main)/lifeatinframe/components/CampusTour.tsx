// app/(main)/lifeatinframe/components/CampusTour.tsx
"use client";
import React, { useState, useEffect, useRef } from "react";
import { LifeSection, LifeSectionItem } from "../api/api";

interface CampusTourProps {
  section: LifeSection;
  items: LifeSectionItem[];
}

const CampusTour: React.FC<CampusTourProps> = ({ section, items }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Get video URL from database or use default
  const videoUrl = items[0]?.video_url || "https://res.cloudinary.com/demo/video/upload/sample.mp4";
  const mainItem = items[0];

  // Handle video events
  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Auto-play on component mount
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(console.error);
      setIsPlaying(true);
    }
  }, []);

  return (
    <section className="relative md:min-h-screen sm:mt-20 w-full">
      <div className="flex flex-col lg:flex-row">
        {/* Left Content */}
        <div className="w-full lg:w-1/2 flex items-center p-8 lg:p-16">
          <div className="max-w-xl">
            {/* SECTION TITLE - Use item title if exists */}
            {mainItem?.title ? (
              <h1 className="text-5xl font-light text-gray-900 mb-6">
                {mainItem.title}
              </h1>
            ) : (
              <h1 className="text-5xl font-light text-gray-900 mb-6">
                Inframe Campus Tour
              </h1>
            )}
            
            {/* Description */}
            {mainItem?.content ? (
              <p className="text-lg text-gray-600 mb-8 font-light">
                {mainItem.content}
              </p>
            ) : (
              <p className="text-lg text-gray-600 mb-8 font-light">
                Our virtual tour will take you around our 200-acre state-of-the-art residential campus, which features cutting-edge infrastructure, international sports facilities, and more.
              </p>
            )}
            
            <button className="inline-flex items-center px-8 py-3 bg-rose-500 hover:bg-rose-600 transition-colors rounded-full text-white text-sm font-light gap-2">
              Take our virtual tour
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Right Video Player */}
        <div className="w-full lg:w-1/2 relative p-8 lg:p-16">
          <div className="aspect-video w-full bg-black rounded-xl overflow-hidden shadow-2xl">
            {/* Cloudinary Video Player */}
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              controls={false}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              loop
              muted
              playsInline
            >
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Custom Video Controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <div className="flex items-center gap-4">
                {/* Play/Pause Button */}
                <button
                  onClick={handlePlayPause}
                  className="text-white hover:text-rose-400 transition-colors"
                >
                  {isPlaying ? (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </button>

                {/* Time Display */}
                <div className="text-white text-sm font-mono">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </div>

                {/* Progress Bar */}
                <div className="flex-1">
                  <input
                    type="range"
                    min="0"
                    max={duration}
                    value={currentTime}
                    onChange={handleSeek}
                    className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-rose-500"
                  />
                </div>

                {/* Volume and Fullscreen */}
                <button className="text-white hover:text-rose-400 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Play Button Overlay */}
            {!isPlaying && (
              <button
                onClick={handlePlayPause}
                className="absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity hover:bg-black/40"
              >
                <div className="w-20 h-20 bg-rose-500/90 rounded-full flex items-center justify-center hover:bg-rose-600 transition-colors">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </button>
            )}
          </div>

          {/* Video Info */}
          <div className="mt-4 text-center text-gray-600 text-sm">
            {mainItem?.extra_text || "Experience our campus through this immersive video tour"}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CampusTour;