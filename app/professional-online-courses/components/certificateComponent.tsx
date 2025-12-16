import Image from "next/image";
import { themeClasses } from "./constant";
import { useMemo } from "react";

interface CertificateCardProps {
    title: string;
    subtitle?: string;
    imageUrl: string;
    themeColor?: string; // Optional theme color prop
    courseType: CourseType;
}
type CourseType = 'interior' | 'uiux' | 'motion' | 'digital' | 'fashion' | 'animation' | 'jewellery' | 'finearts' | 'graphic';


export default function CertificateCard({
    courseType,
    title,
    subtitle,
    imageUrl,
    themeColor = "#731e88", // Default purple theme
}: CertificateCardProps) {

    const meta = useMemo(() => themeClasses[courseType], [courseType]);
    return (
        <section className={`w-full py-8 sm:py-12 md:py-16 lg:py-10 ${meta.rbg}`}>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="text-center mb-8 sm:mb-10 lg:mb-12">
                    {/* Decorative badge - Responsive padding */}
                    <div className={`inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 ${meta.bg} dark:bg-gray-800 rounded-full mb-4 sm:mb-6`}>
                        <div
                            className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full animate-pulse flex-shrink-0"
                            style={{ backgroundColor: themeColor }}
                            aria-hidden="true"
                        />
                        <span className={`text-xs sm:text-sm  text-white font-bold dark:text-gray-300`}>
                            CERTIFICATION
                        </span>
                    </div>

                    {/* Main Title - Responsive font sizes */}
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
                        {title}
                    </h2>

                    {/* Subtitle */}
                    {subtitle && (
                        <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-4 sm:px-0 leading-relaxed">
                            {subtitle}
                        </p>
                    )}



                    {/* Decorative line */}
              
                </div>

                {/* Certificate Preview */}
                <div className="relative">
                    {/* Certificate Card Container - Responsive padding */}
                    <div className="relative bg-white dark:bg-gray-900 rounded-lg sm:rounded-xl lg:rounded-2xl shadow-lg p-3 sm:p-4 md:p-6 lg:p-5 border border-gray-200 dark:border-gray-700 max-w-4xl mx-auto">
                        {/* Certificate Badge */}
                        <div className="absolute -top-2 sm:-top-3 left-1/2 transform -translate-x-1/2 z-10">
                            <div
                                className={`flex items-center justify-center w-8 h-8 sm:w-auto sm:h-auto sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-lg  ${meta.bg}`}
                                // style={{ backgroundColor: themeColor }}
                                aria-label="Official Certificate Badge"
                            >
                                <svg
                                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    aria-hidden="true"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                        </div>

                        {/* Certificate Image Container */}
                        <div className="relative overflow-hidden rounded sm:rounded-lg md:rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 p-1.5 sm:p-2">
                            {/* Optimized Image with priority loading for above the fold */}
                            <div className="relative aspect-[4/3] md:aspect-[16/10] lg:aspect-[900/650]">
                                <Image
                                    src={imageUrl}
                                    alt={`${title} Certificate Preview`}
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 800px"
                                    className="rounded object-contain"
                                    priority={true}
                                    quality={85}
                                    loading="eager"
                                />
                            </div>
                            {/* Shine overlay effect */}
                            <div
                                className="absolute inset-0 bg-gradient-to-t from-white/10 via-transparent to-transparent pointer-events-none"
                                aria-hidden="true"
                            />
                        </div>

                        {/* Certificate Info - Responsive layout */}
                        <div className="mt-4 sm:mt-6 text-center">
                            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                                <div className="flex items-center gap-1.5 sm:gap-2">
                                    <svg
                                        className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    <span className="truncate">Industry Recognized</span>
                                </div>

                                <div className="hidden sm:block w-px h-4 bg-gray-300 dark:bg-gray-600" />

                                <div className="flex items-center gap-1.5 sm:gap-2">
                                    <svg
                                        className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    <span className="truncate">Lifetime Validity</span>
                                </div>

                                <div className="hidden sm:block w-px h-4 bg-gray-300 dark:bg-gray-600" />

                                <div className="flex items-center gap-1.5 sm:gap-2">
                                    <svg
                                        className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                        />
                                    </svg>
                                    <span className="truncate">Shareable Online</span>
                                </div>
                            </div>
                        </div>


                        
                    {/* Certification Benefits */}
             <div className="mt-6 sm:mt-8 border-t border-gray-200 dark:border-gray-700 pt-5 sm:pt-7">
    <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white text-center mb-5">
        Why This Certification Matters
    </h3>

    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-10 max-w-3xl mx-auto">
        {[
            "Recognized certification",
            "Enhance your professional credibility",
            "Stand out in job applications",
            "Digital certificate for LinkedIn profile",
        ].map((item) => (
            <li
                key={item}
                className="flex items-start justify-center"
            >
                {/* Fixed-width wrapper for perfect alignment */}
                <div className="flex items-center gap-3 max-w-[320px] text-center">
                    {/* <span
                        className={`w-2 h-2 rounded-full flex-shrink-0 ${meta.bg}`}
                        aria-hidden="true"
                    /> */}
                    <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-snug">
                        {item}
                    </span>
                </div>
            </li>
        ))}
    </ul>
</div>


                    </div>

                    <div
                        className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 w-12 h-12 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-gray-100 to-transparent dark:from-gray-800 dark:to-transparent blur-xl opacity-30 sm:opacity-50 pointer-events-none"
                        aria-hidden="true"
                    />
                    <div
                        className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-14 h-14 sm:w-24 sm:h-24 rounded-full bg-gradient-to-bl from-gray-100 to-transparent dark:from-gray-800 dark:to-transparent blur-xl opacity-30 sm:opacity-50 pointer-events-none"
                        aria-hidden="true"
                    />
                </div>



            </div>
        </section>
    );
}