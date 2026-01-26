

"use client";
import { FolderOpen } from "lucide-react";

type Item = {
  id?: string;
  title: string;
  content?: string;
  extra_text?: string;
};

type Section = {
  section_title?: string;
  title:string;
  description?:string;
  items?: Item[];
};

interface Props {
  applicationProcess: Section | null;
  requiredDetails: Section | null;
}

export default function ApplicationProcess({
  applicationProcess,
  requiredDetails,
}: Props) {
  const steps = applicationProcess?.items || [];
  const documents = requiredDetails?.items || [];

  return (
    <section className="relative py-16 sm:py-20 md:py-24 bg-yellow-50">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-widest text-gray-800">
            {applicationProcess?.section_title || "APPLICATION PROCESS"}
          </h2>
          <p className="mt-4 text-gray-500 text-base sm:text-lg">
           {applicationProcess?.title}
          </p>
        </div>

        {/* APPLICATION PROCESS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-16">
          {steps.map((item, index) => (
            <div
              key={item.id || index}
              className="group bg-white/70 border border-white/40 rounded-3xl shadow-lg p-4 sm:p-6 transition-all duration-500"
            >
              <div className="flex items-center gap-4 sm:gap-6 mb-3">
                <div className="text-xl sm:text-2xl font-bold text-yellow-500">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 group-hover:text-yellow-600">
                    {item.title}
                  </h3>

                  {item.extra_text && (
                    <span className="text-sm text-gray-500">
                      {item.extra_text}
                    </span>
                  )}
                </div>
              </div>

              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                {item.content}
              </p>
            </div>
          ))}
        </div>

        {/* REQUIRED DETAILS */}
        {documents.length > 0 && (
          <div className="bg-white/70 backdrop-blur-lg border border-white/40 rounded-3xl shadow-lg p-8 sm:p-10">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-widest text-gray-800 mb-6">
              {requiredDetails?.section_title || "REQUIRED DETAILS"}
            </h3>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-lg sm:text-xl text-gray-700">
              {documents.map((item, index) => (
                <li key={item.id || index} className="flex items-center gap-3">
                  <FolderOpen size={20} className="text-yellow-500" />
                  {item.title}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
