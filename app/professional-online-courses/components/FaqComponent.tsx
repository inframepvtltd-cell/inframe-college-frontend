'use client'

import React, { useState, useMemo, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQ_DATA, themeClasses } from './constant';

// Define TypeScript types
type CourseType = "Interior Design" | 'UIUX Design' | 'Motion Design' | 'Digital Marketing' | 'Fashion Design' | 'Animation VFX' | 'Jewellery Design' | 'Fine Arts' | 'Graphic Design';

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
                className={`group rounded-lg border transition-all duration-300 
                    ${isOpen
                        ? `border-gray-300 dark:border-gray-600 shadow-md ${meta.border} shadow-${meta.text.replace('text-', '')}/10`
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    } 
                    bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800/50`}
            >
                <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full p-4 sm:p-5 flex justify-between items-center gap-3 transition-colors"
                    aria-expanded={isOpen}
                    aria-label={`Toggle FAQ: ${faq.question}`}
                >
                    <span className={`text-[15px] sm:text-base font-semibold text-left flex-1 transition-colors
                        ${isOpen ? `text-gray-900 dark:text-white ${meta.text}` : 'text-gray-800 dark:text-gray-200'}`}>
                        {faq.question}
                    </span>
                    <div
                        className={`flex-shrink-0 p-1.5 rounded-full transition-all duration-300 
                            ${isOpen
                                ? `${meta.bg} text-white rotate-180 shadow-sm`
                                : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 group-hover:bg-gray-200 dark:group-hover:bg-gray-700'
                            }`}
                    >
                        <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                </button>
                <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out 
                        ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
                >
                    <div className="px-4 sm:px-5 pb-4 sm:pb-5">
                        <div className={`pl-3 border-l-2 ${meta.border} ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
                            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed pl-2">
                                {faq.answer}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }, [openIndex, meta]);

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
            {/* Header */}
            <div className="mb-8 sm:mb-10 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-gray-100 to-gray-50 
                    dark:from-gray-800 dark:to-gray-900 rounded-full mb-4">
                    <div className={`w-2 h-2 rounded-full ${meta.bg} animate-pulse`} />
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Frequently Asked Questions</span>
                </div>

                <h1 className={`text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r bg-clip-text text-transparent ${meta.gradient} mb-3`}>
                    {meta.title} FAQs
                </h1>

                <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base max-w-2xl mx-auto">
                    Find answers to common questions about our {meta.title.toLowerCase()}
                </p>

                <div className={`h-0.5 w-16 mx-auto mt-4 rounded-full ${meta.bg}`} />
            </div>

            {/* FAQ List */}
            <div className="space-y-3">
                {currentFAQs.map((faq: any, index: any) => (
                    <FAQItemComponent key={index} faq={faq} index={index} />
                ))}
            </div>


        </div>
    );
};

export default FAQComponent;