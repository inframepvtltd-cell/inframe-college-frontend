"use client";

export default function AdvisorsHeader() {
  return (
    <div className="relative text-white py-32">
      <div className="absolute inset-0 bg-zinc-900" />
      <div className="absolute inset-0 opacity-10 bg-[url('/grid-pattern.png')] bg-repeat" />
      <div className="absolute left-0 right-0 h-1 bottom-0 bg-amber-500" />
      <div className="absolute top-0 left-0 w-24 h-24 border-t-4 border-l-4 border-amber-500 opacity-50" />
      <div className="absolute bottom-0 right-0 w-24 h-24 border-b-4 border-r-4 border-amber-500 opacity-50" />
      
      <div className="relative container mx-auto px-6">
        <div className="max-w-3xl">
          <span className="inline-block py-1 px-3 border border-amber-500 text-amber-500 text-sm font-medium tracking-wider mb-4">
            LEADERSHIP
          </span>
          <h1 className="text-6xl font-bold mb-6 leading-tight">Our Advisors</h1>
          <div className="w-24 h-1 bg-amber-500 mb-8"></div>
          <p className="text-xl text-zinc-300 max-w-2xl">
            Meet the exceptional individuals who guide our institution with
            their expertise and vision, shaping the future of creative education.
          </p>
        </div>
      </div>
    </div>
  );
}