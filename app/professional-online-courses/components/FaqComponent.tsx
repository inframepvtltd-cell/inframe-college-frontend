'use client'

import React, { useState, useMemo } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQ_DATA, themeClasses } from './constant';

// Define TypeScript types
type CourseType = 'interior' | 'uiux' | 'motion' | 'digital' | 'fashion' | 'animation' | 'jewellery' | 'finearts' | 'graphic';

interface FAQItem {
    question: string;
    answer: string;
}

interface CourseMeta {
    title: string;
    text: string;
    bg: string;
    border: string;
    hoverBorder: string;
    gradient: string;
}

interface FAQComponentProps {
    courseType: CourseType;
}

const FAQComponent: React.FC<FAQComponentProps> = ({ courseType }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    // Theme configuration
    // const themeClasses: Record<CourseType, CourseMeta> = {
    //     interior: {
    //         title: "Interior Design Course",
    //         text: "text-yellow-500",
    //         bg: "bg-yellow-500",
    //         border: "border-yellow-500",
    //         hoverBorder: "hover:border-yellow-500",
    //         gradient: "from-yellow-400 to-yellow-600",
    //     },
    //     uiux: {
    //         title: "UI/UX Design Course",
    //         text: "text-blue-500",
    //         bg: "bg-blue-500",
    //         border: "border-blue-500",
    //         hoverBorder: "hover:border-blue-500",
    //         gradient: "from-blue-500 to-cyan-500",
    //     },
    //     motion: {
    //         title: "Motion Graphic Design Course",
    //         text: "text-orange-500",
    //         bg: "bg-orange-500",
    //         border: "border-orange-500",
    //         hoverBorder: "hover:border-orange-500",
    //         gradient: "from-orange-500 to-red-500",
    //     },
    //     digital: {
    //         title: "Digital Marketing Course",
    //         text: "text-green-500",
    //         bg: "bg-green-500",
    //         border: "border-green-500",
    //         hoverBorder: "hover:border-green-500",
    //         gradient: "from-green-500 to-emerald-500",
    //     },
    //     fashion: {
    //         title: "Fashion Design Course",
    //         text: "text-fuchsia-500",
    //         bg: "bg-fuchsia-500",
    //         border: "border-fuchsia-500",
    //         hoverBorder: "hover:border-fuchsia-500",
    //         gradient: "from-fuchsia-500 to-purple-500",
    //     },
    //     animation: {
    //         title: "Animation & VFX Course",
    //         text: "text-red-500",
    //         bg: "bg-red-500",
    //         border: "border-red-500",
    //         hoverBorder: "hover:border-red-500",
    //         gradient: "from-red-500 to-orange-500",
    //     },
    //     jewellery: {
    //         title: "Jewellery Design Course",
    //         text: "text-yellow-500",
    //         bg: "bg-yellow-500",
    //         border: "border-yellow-500",
    //         hoverBorder: "hover:border-yellow-500",
    //         gradient: "from-yellow-500 to-amber-500",
    //     },
    //     finearts: {
    //         title: "Fine Arts Course",
    //         text: "text-indigo-500",
    //         bg: "bg-indigo-500",
    //         border: "border-indigo-500",
    //         hoverBorder: "hover:border-indigo-500",
    //         gradient: "from-indigo-500 to-violet-500",
    //     },
    //     graphic: {
    //         title: "Graphic Design Course",
    //         text: "text-[#731e88]",
    //         bg: "bg-[#731e88]",
    //         border: "border-[#731e88]",
    //         hoverBorder: "hover:border-[#731e88]",
    //         gradient: "from-[#731e88] to-[#9b4db3]",
    //     },
    // };



    // Memoized values for performance
    const currentFAQs = useMemo(() => FAQ_DATA[courseType], [courseType]);
    const meta = useMemo(() => themeClasses[courseType], [courseType]);

    const toggleFAQ = (index: number) => {
        setOpenIndex(prevIndex => prevIndex === index ? null : index);
    };

    // Memoized FAQ item component
    const FAQItemComponent = React.useCallback(({ faq, index }: { faq: FAQItem; index: number }) => {
        const isOpen = openIndex === index;

        return (
            <div
                className={`rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900
                    transition-all duration-300 hover:shadow-md ${meta.hoverBorder}`}
            >
                <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full p-5 flex justify-between items-center transition-colors hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl"
                    aria-expanded={isOpen}
                    aria-label={`Toggle FAQ: ${faq.question}`}
                >
                    <span className="text-[16px] md:text-lg font-semibold text-gray-800 dark:text-white text-left flex-1 mr-4">
                        {faq.question}
                    </span>
                    <div
                        className={`p-2 rounded-full transition-all duration-500 flex-shrink-0 ${isOpen
                            ? `${meta.bg} text-white rotate-180`
                            : "bg-gray-100 dark:bg-gray-800 text-gray-500"
                            }`}
                    >
                        <ChevronDown className="w-5 h-5" />
                    </div>
                </button>
                <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                        }`}
                >
                    <div className="p-5 pt-0">
                        <div className={`pl-4 border-l-2 ${meta.border}`}>
                            <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                                {faq.answer}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }, [openIndex, meta]);

    return (
        <div className="max-w-7xl mx-auto p-0 pt-10 pb-10">
            {/* Header */}
            <div className="mb-10 text-center">
                <h1
                    className={`text-3xl md:text-5xl font-extrabold bg-gradient-to-r bg-clip-text  ${meta.gradient}`}
                >
                    {meta.title} FAQs
                </h1>
                <p className="text-gray-600 dark:text-gray-300 text-lg mt-4">
                    Everything you need to know about the course
                </p>
                <div className={`w-24 h-1 mx-auto mt-3 rounded-full ${meta.bg}`} />
            </div>

            {/* FAQ List */}
            <div className="space-y-4">
                {currentFAQs.map((faq, index) => (
                    <FAQItemComponent key={index} faq={faq} index={index} />
                ))}
            </div>
        </div>
    );
};

export default FAQComponent;