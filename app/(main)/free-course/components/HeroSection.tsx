"use client";

import Image from "next/image";
import { Clock, Monitor, Award, BarChart } from "lucide-react";

export default function HeroSection({
  course,
  onApply,
}: {
  course: any;
  onApply: () => void;
}) {
  return (
    <section className="relative min-h-[80vh] pt-[80px] flex items-center overflow-hidden">

      <Image
        src={course.thumbnail_url}
        alt={course.course_name}
        fill
        className="object-cover"
        priority
      />

      <div className="absolute inset-0 bg-black/60" />

      <div className="relative container mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-center">

          {/* LEFT */}
          <div className="lg:col-span-2 bg-white/10 backdrop-blur-md rounded-2xl p-8 text-white space-y-5">
            <span className="bg-green-500 px-4 py-1 rounded-full text-sm font-semibold">
              100% Free Course
            </span>

            <h1 className="text-3xl md:text-5xl font-bold">
              {course.course_name}
            </h1>

            <p className="text-lg text-gray-200">
              {course.description}
            </p>
          </div>

          {/* RIGHT */}
          <div className="bg-white rounded-2xl shadow-2xl p-6 space-y-6">
            <h3 className="text-xl font-semibold">Course Details</h3>

            <DetailItem icon={<Clock />} label="Duration" value={course.duration} />
            <DetailItem icon={<Monitor />} label="Mode" value={course.mode} />
            <DetailItem icon={<Award />} label="Certificate" value={course.certificate} />
            <DetailItem icon={<BarChart />} label="Level" value={course.course_level} />

            <button
              onClick={onApply}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 rounded-lg"
            >
              Apply Now
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}

const DetailItem = ({ icon, label, value }: any) => (
  <div className="flex items-center gap-4">
    <div className="text-yellow-500">{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  </div>
);
