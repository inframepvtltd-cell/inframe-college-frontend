import Image from "next/image";

interface CertificateCardProps {
    title: string;
    subtitle?: string;
    imageUrl: string;
    themeColor?: string; // Optional theme color prop
}

export default function CertificateCard({
    title,
    subtitle,
    imageUrl,
    themeColor = "#731e88", // Default purple theme
}: CertificateCardProps) {
    return (
        <section className="w-full py-12 sm:py-16 lg:py-20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header Section */}
                <div className="text-center mb-10 lg:mb-12">
                    {/* Decorative badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full mb-6">
                        <div
                            className="w-2 h-2 rounded-full animate-pulse"
                            style={{ backgroundColor: themeColor }}
                        />
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                            CERTIFICATION
                        </span>
                    </div>

                    {/* Main Title */}
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        {title}
                    </h2>

                    {/* Subtitle */}
                    {subtitle && (
                        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                            {subtitle}
                        </p>
                    )}

                    {/* Decorative line */}
                    <div
                        className="h-1 w-16 mx-auto mt-6 rounded-full"
                        style={{ backgroundColor: themeColor }}
                    />
                </div>

                {/* Certificate Preview */}
                <div className="relative">
                    {/* Certificate Card Container */}
                    <div className="relative bg-white dark:bg-gray-900 rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8 border border-gray-200 dark:border-gray-700 max-w-4xl mx-auto">

                        {/* Certificate Badge */}
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                            <div
                                className="flex items-center gap-2 px-4 py-2 rounded-full shadow-lg"
                                style={{ backgroundColor: themeColor }}
                            >
                                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                <span className="text-white text-sm font-semibold">OFFICIAL CERTIFICATE</span>
                            </div>
                        </div>

                        {/* Certificate Image */}
                        <div className="relative overflow-hidden rounded-lg sm:rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 p-2">
                            <Image
                                src={imageUrl}
                                alt="Inframe College Certificate Preview"
                                width={900}
                                height={650}
                                className="rounded-lg object-contain w-full h-auto shadow-sm"
                            />

                            {/* Shine overlay effect */}
                            <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent pointer-events-none" />
                        </div>

                        {/* Certificate Info */}
                        <div className="mt-6 text-center">
                            <div className="inline-flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                                <div className="flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>Industry Recognized</span>
                                </div>
                                <div className="w-px h-4 bg-gray-300 dark:bg-gray-600" />
                                <div className="flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>Lifetime Validity</span>
                                </div>
                                <div className="w-px h-4 bg-gray-300 dark:bg-gray-600" />
                                <div className="flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <span>Shareable Online</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full bg-gradient-to-br from-gray-100 to-transparent dark:from-gray-800 dark:to-transparent blur-2xl opacity-50" />
                    <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-gradient-to-bl from-gray-100 to-transparent dark:from-gray-800 dark:to-transparent blur-2xl opacity-50" />
                </div>

                {/* CTA Section */}
                <div className="text-center mt-10 lg:mt-12">
                    <div className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                        <div className="text-left">
                            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                Why This Certification Matters
                            </h3>
                            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                                <li className="flex items-center gap-2">
                                    <div
                                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                                        style={{ backgroundColor: themeColor }}
                                    />
                                    <span>Validates your professional skills</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <div
                                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                                        style={{ backgroundColor: themeColor }}
                                    />
                                    <span>Enhances your career opportunities</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <div
                                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                                        style={{ backgroundColor: themeColor }}
                                    />
                                    <span>Recognized by industry employers</span>
                                </li>
                            </ul>
                        </div>

                        <div className="flex-shrink-0">
                            <button
                                className="group px-6 py-3 rounded-lg font-semibold text-white transition-all duration-300 hover:shadow-lg active:scale-95"
                                style={{ backgroundColor: themeColor }}
                            >
                                <div className="flex items-center gap-2">
                                    <span>Get Certified Today</span>
                                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </div>
                            </button>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                Complete the course to receive your certificate
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}