"use client";

interface ProgramSelectionFormProps {
  data: any;
  onChange: (field: any, value: any) => void;
  onNext?: () => void;
  onBack?: () => void;
}

export default function ProgramSelectionForm({
  data,
  onChange,
  onNext,
  onBack,
}: ProgramSelectionFormProps) {
  const isValid =
    data.courseType &&
    data.campus &&
    data.programType;

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900">
          Program Selection
        </h3>
        <p className="text-sm text-gray-500">
          Select your course and campus preferences
        </p>
      </div>

      {/* Course Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Select Course Type *
        </label>
        <select
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-black focus:outline-none"
          value={data.courseType || ""}
          onChange={(e) => onChange("courseType", e.target.value)}
        >
          <option value="">Select</option>
          <option value="design">Design Course (₹1000)</option>
          <option value="development">Development Course</option>
          <option value="marketing">Marketing Course</option>
        </select>
      </div>

      {/* Campus */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Study Campus *
        </label>
        <select
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-black focus:outline-none"
          value={data.campus || ""}
          onChange={(e) => onChange("campus", e.target.value)}
        >
          <option value="">Select</option>
          <option value="main">Main Campus</option>
          <option value="city">City Campus</option>
        </select>
      </div>

      {/* Program Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Program Type *
        </label>
        <select
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-black focus:outline-none"
          value={data.programType || ""}
          onChange={(e) => onChange("programType", e.target.value)}
        >
          <option value="">Select</option>
          <option value="full-time">Full Time</option>
          <option value="part-time">Part Time</option>
        </select>
      </div>

      {/* Footer Buttons (like screenshot) */}
      <div className="flex items-center justify-between pt-6 border-t">
        <button
          type="button"
          onClick={onBack}
          className="px-4 py-2 text-sm rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
        >
          Previous
        </button>

        <button
          type="button"
          onClick={onNext}
          disabled={!isValid}
          className={`px-6 py-2 text-sm rounded-md font-medium text-white
            ${isValid
              ? "bg-black hover:bg-gray-800"
              : "bg-gray-400 cursor-not-allowed"
            }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
