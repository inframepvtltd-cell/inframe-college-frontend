"use client";
import React from "react";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const DownloadsLoading = () => {
  return (
    <div className={`w-full bg-white ${poppins.className}`}>
      {/* Hero Section Skeleton */}
      <div className="relative h-[75vh] bg-gradient-to-br from-gray-100 to-gray-200">
        <div className="absolute inset-0 z-20 flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <div className="max-w-3xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-1.5 h-12 bg-gray-300 rounded animate-pulse" />
                <div className="h-12 w-48 bg-gray-300 rounded animate-pulse" />
              </div>
              <div className="h-6 w-96 bg-gray-300 mb-4 rounded animate-pulse" />
              <div className="flex gap-6">
                <div className="h-4 w-32 bg-gray-300 rounded animate-pulse" />
                <div className="h-4 w-40 bg-gray-300 rounded animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Icons Skeleton */}
      <div className="container mx-auto -mt-16 relative z-20 px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg border border-yellow-100">
              <div className="w-14 h-14 bg-gray-200 rounded-full mb-3 animate-pulse" />
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-1" />
              <div className="h-3 w-16 bg-gray-100 rounded animate-pulse" />
            </div>
          ))}
        </div>

        {/* Content Skeleton */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12 border border-yellow-100">
          <div className="flex justify-between items-center mb-8">
            <div className="h-8 w-64 bg-gray-200 rounded animate-pulse" />
            <div className="h-6 w-32 bg-gray-100 rounded animate-pulse" />
          </div>
          
          {[...Array(5)].map((_, i) => (
            <div key={i} className="mb-4">
              <div className="h-12 w-full bg-gray-100 rounded-lg animate-pulse mb-2" />
              <div className="ml-4">
                {[...Array(3)].map((_, j) => (
                  <div key={j} className="h-16 w-full bg-gray-50 rounded-lg animate-pulse mb-2" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DownloadsLoading;