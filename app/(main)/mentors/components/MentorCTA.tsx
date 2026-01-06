"use client";

export default function MentorsCTA() {
  return (
    <div className="bg-black text-white py-16 mt-12">
      <div className="container mx-auto px-6 text-center">
        <div className="relative">
          {/* Yellow accent shapes */}
          <div className="absolute top-0 left-1/4 w-20 h-20 bg-yellow-400 rounded-full mix-blend-screen opacity-20"></div>
          <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-yellow-400 rounded-full mix-blend-screen opacity-20"></div>
          
          <h2 className="text-3xl font-bold mb-4 relative z-10">Ready to elevate your skills?</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8 relative z-10">
            Our mentors are available for one-on-one sessions, workshops, and portfolio reviews.
            Take the next step in your creative journey with personalized guidance.
          </p>
          <button className="bg-yellow-400 text-black hover:bg-yellow-500 font-medium py-3 px-8 rounded-lg transition-colors duration-300 shadow-lg hover:shadow-xl relative z-10">
            Apply for Mentorship Program
          </button>
        </div>
      </div>
    </div>
  );
}