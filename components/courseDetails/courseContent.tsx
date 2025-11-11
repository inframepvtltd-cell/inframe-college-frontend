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
}

const CourseContent: React.FC<CourseContentProps> = ({
  sectionTitle,
  totalLectures,
  totalDuration,
  lectures,
}) => {
  return (
    <div className="w-full border border-gray-200 rounded-xl overflow-hidden bg-white">
      {/* Header */}
      <div className="p-4 bg-gray-50 border-b border-gray-200 flex flex-wrap justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">
          {sectionTitle}
        </h2>
        <p className="text-sm text-gray-600">
          {totalLectures} Lectures &nbsp;|&nbsp; {totalDuration}
        </p>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-12 bg-gray-100 text-sm font-semibold text-gray-700 px-4 py-2">
        <div className="col-span-1">Play</div>
        <div className="col-span-7 sm:col-span-8">Course</div>
        <div className="col-span-2 text-center">Action</div>
        <div className="col-span-2 text-right">Duration</div>
      </div>

      {/* Lectures List */}
      <div>
        {lectures.map((lecture, idx) => (
          <div
            key={idx}
            className="grid grid-cols-12 items-center px-4 py-3 border-t border-gray-100 hover:bg-gray-50 transition"
          >
            <div className="col-span-1">
              <Play className="w-4 h-4 text-gray-600" />
            </div>
            <div className="col-span-7 sm:col-span-8 text-gray-800 text-sm">
              {lecture.title}
            </div>
            <div className="col-span-2 text-center">
              {lecture.isPreview ? (
                <button className="text-yellow-600 font-medium hover:underline">
                  Preview
                </button>
              ) : (
                <span className="text-gray-400">Locked</span>
              )}
            </div>
            <div className="col-span-2 text-right text-gray-600">
              {lecture.duration}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseContent;
