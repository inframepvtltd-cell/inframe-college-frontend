"use client";

export default function MentorsHeader() {
  return (
    <div className="relative text-black py-24">
      <div className="absolute inset-0 bg-yellow-400" />
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[length:20px_20px]" />
      
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40" />
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30" />
      
      <div className="relative container mx-auto px-6">
        <div className="max-w-3xl">
          <h1 className="text-6xl font-bold mb-6 mt-10 leading-tight">Our Mentors</h1>
          <div className="w-24 h-1 bg-black mb-8"></div>
          <p className="text-xl text-black max-w-2xl">
            Learn directly from industry professionals who bring real-world experience
            and cutting-edge insights to guide your creative journey.
          </p>
        </div>
      </div>
    </div>
  );
}