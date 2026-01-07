// app/components/CourseContent.tsx
"use client";

import { Play } from "lucide-react";

interface Lecture {
  title: string;
  duration: string;
  isPreview?: boolean;
}

interface CourseContentProps {
  sectionTitle: string;
  totalLectures: number;
  totalDuration: string;
  lectures: Lecture[];
  noOfLessons: string;
}

const CourseContent: React.FC<CourseContentProps> = ({
  sectionTitle,
  totalLectures,
  totalDuration,
  lectures,
  noOfLessons,
}) => {
  return (
    <div className="w-full rounded-xl overflow-hidden bg-white border border-gray-200 shadow-sm">

      {/* Header */}
      <div className="p-4 bg-black/5 border-b border-gray-200 flex flex-wrap justify-between items-center">
        <h2 className="text-lg font-bold text-gray-900">
          {sectionTitle}
        </h2>
        <p className="text-sm text-gray-600">
          {noOfLessons} Lectures
        </p>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-12 bg-gray-100 text-xs sm:text-sm font-semibold text-gray-700 px-4 py-2 uppercase">
        <div className="col-span-1">Play</div>
        <div className="col-span-7 sm:col-span-8">Course</div>
        <div className="col-span-2 text-center">Preview</div>
        {/* <div className="col-span-2 text-right">Duration</div> */}
      </div>

      {/* Lectures */}
      <div>
        {lectures.map((lecture, idx) => (
          <div
            key={idx}
            className="grid grid-cols-12 items-center px-4 py-3 border-t border-gray-100 
          hover:bg-yellow-50 transition group cursor-pointer"
          >
            {/* Play Icon */}
            <div className="col-span-1">
              <Play className="w-4 h-4 text-gray-500 group-hover:text-yellow-600" />
            </div>

            {/* Title */}
            <div className="col-span-7 sm:col-span-8 text-gray-800 text-sm font-medium">
              {lecture.title}
            </div>

            {/* Action */}
            <div className="col-span-2 text-center">
              {lecture.isPreview ? (
                <button className="text-yellow-600 font-semibold hover:underline">
                  Preview
                </button>
              ) : (
                <span className="text-gray-400">Locked</span>
              )}
            </div>

            {/* Duration */}
            <div className="col-span-2 text-right text-gray-600 text-sm">
              {/* {lecture.duration} */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

};

export default CourseContent;
