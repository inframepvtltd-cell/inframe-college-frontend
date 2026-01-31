"use client";
import React, { useState } from "react";
import FranchiseEnquiryFormOnly from "./FranchiseEnquiryFormOnly";

export const BottomEnrollFooter: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-300 shadow-lg">
        <div
          className="
            max-w-6xl mx-auto
            px-3 sm:px-4
            py-2 sm:py-3
            flex items-center
            justify-between
            gap-3
            pb-[env(safe-area-inset-bottom)]
          "
        >
          <div className="flex items-center whitespace-nowrap">
            <span
              className="
                text-sm sm:text-2xl lg:text-3xl
                text-yellow-600
                font-bold
              "
            >
              Become our partner right now
            </span>
          </div>

          {/* ✅ APPLY NOW → MODAL OPEN */}
          <button
            onClick={() => setOpen(true)}
            className="relative overflow-hidden bg-black text-white px-4 sm:px-7 py-2 sm:py-3 text-sm sm:text-2xl font-semibold border
             border-yellow-600 shadow-md transition-all duration-300 hover:scale-[1.03] active:scale-95 apply-shine-btn min-w-35 cursor-pointer sm:min-w-0"
          >
            Apply Now
          </button>
        </div>

        <style>{`
          .apply-shine-btn::before {
            content: "";
            position: absolute;
            top: -60%;
            left: -160%;
            width: 320%;
            height: 320%;
            background: linear-gradient(
              60deg,
              transparent 35%,
              rgba(255, 230, 0, 0.45),
              transparent 65%
            );
            transform: rotate(25deg);
            animation: shineAnim 1.2s linear infinite;
          }

          @keyframes shineAnim {
            0% {
              transform: translateX(-120%) rotate(25deg);
            }
            100% {
              transform: translateX(120%) rotate(25deg);
            }
          }
        `}</style>
      </div>

      {/* ================= MODAL ================= */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="relative bg-white w-full max-w-xl rounded-2xl p-6 shadow-xl">
            {/* Close button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-black text-2xl"
            >
              ✕
            </button>

            <FranchiseEnquiryFormOnly
              enableDownload={false}
              submitLabel="Apply Now"
              onClose={() => setOpen(false)}
            />
          </div>
        </div>
      )}
    </>
  );
};

