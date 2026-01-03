"use client";

import { useEffect, useState } from "react";
import { GraduationCap, Laptop, IndianRupee } from "lucide-react";
import { fetchAllPaidCourse } from "../../api";
// import { fetchAllPaidCourse } from "@/api/courses"; // adjust path

interface Course {
  id: number;
  course_name: string;
  course_slug: string;
  price: number;
}

interface ProgramSelectionFormProps {
  data: any;
  onChange: (field: string, value: any) => void;
}

export default function ProgramSelectionForm({
  data,
  onChange,
}: ProgramSelectionFormProps) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);

  /** Fetch paid courses */
  useEffect(() => {
    const loadCourses = async () => {
      try {
        setLoading(true);
        const res = await fetchAllPaidCourse();
        console.log(res);
        
        setCourses(res); // assuming API returns array
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, []);

  /** Find selected course */
  const selectedCourse = courses.find(
    (c) => c.course_slug === data.courseType
  );

  const fee = selectedCourse?.price || 0;

  const isValid =
    data.courseType &&
    data.studyMode &&
    data.programType &&
    (data.studyMode === "online" || data.campus);

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6 space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
          <GraduationCap className="w-5 h-5" />
          Program Selection
        </h3>
        <p className="text-sm text-gray-500">
          Choose your preferred course, mode, and campus
        </p>
      </div>

      {/* Course Type */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Course Type *
        </label>
        <select
          className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-black"
          value={data.courseType || ""}
          onChange={(e) => onChange("courseType", e.target.value)}
          disabled={loading}
        >
          <option value="">
            {loading ? "Loading courses..." : "Select Course"}
          </option>

          {courses.map((course) => (
            <option key={course.id} value={course.course_slug}>
              {course.course_name}
            </option>
          ))}
        </select>
      </div>

      {/* Study Mode */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Study Mode *
        </label>
        <div className="grid grid-cols-3 gap-3">
          {["online", "offline", "hybrid"].map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => onChange("studyMode", mode)}
              className={`border rounded-lg py-2 text-sm capitalize flex items-center justify-center gap-2
                ${
                  data.studyMode === mode
                    ? "bg-black text-white"
                    : "hover:bg-gray-50"
                }`}
            >
              <Laptop className="w-4 h-4" />
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Campus */}
      {data.studyMode !== "online" && (
        <div>
          <label className="block text-sm font-medium mb-1">
            Campus *
          </label>
          <select
            className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-black"
            value={data.campus || ""}
            onChange={(e) => onChange("campus", e.target.value)}
          >
            <option value="">Select Campus</option>
            <option value="main">Main Campus</option>
            <option value="city">City Campus</option>
          </select>
        </div>
      )}

      {/* Program Type */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Program Type *
        </label>
        <select
          className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-black"
          value={data.programType || ""}
          onChange={(e) => onChange("programType", e.target.value)}
        >
          <option value="">Select</option>
          <option value="full-time">Full Time</option>
          <option value="part-time">Part Time</option>
        </select>
      </div>

      {/* Fee Display */}
      {fee > 0 && (
        <div className="flex items-center justify-between bg-gray-50 border rounded-lg p-4">
          <div className="flex items-center gap-2 text-gray-700">
            <IndianRupee className="w-4 h-4" />
            <span className="font-medium">Application Fee</span>
          </div>
          <span className="text-lg font-semibold">₹{fee}</span>
        </div>
      )}

      {/* Validation Hint */}
      {!isValid && (
        <p className="text-xs text-red-500">
          Please complete all required fields to continue
        </p>
      )}
    </div>
  );
}
