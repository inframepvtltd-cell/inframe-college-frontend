'use client'

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, CheckCircle2, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../../../components/ui/button';
import { FaArrowRight } from 'react-icons/fa';
import DreamsSection from '../../../components/DreamSection';

// Define TypeScript types
type CourseType = 'interior' | 'uiux' | 'motion' | 'digital' | 'fashion' | 'animation' | 'jewellery' | 'finearts' | 'graphic';

interface FAQItem {
    question: string;
    answer: string;
}

// Update the FAQData interface
interface FAQData {
    interior: FAQItem[];
    uiux: FAQItem[];
    motion: FAQItem[];
    digital: FAQItem[];
    fashion: FAQItem[];
    animation: FAQItem[];
    jewellery: FAQItem[];
    finearts: FAQItem[];
    graphic: FAQItem[];
}

interface CourseMeta {
    title: string;
    color: string;
    badgeColor: string;
}

interface FAQComponentProps {
    courseType?: CourseType;
}

const FAQComponent: React.FC<FAQComponentProps> = ({ courseType = "interior" }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const [isFormOpen, setIsFormOpen] = useState(false);

    const handleApplyClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault();
        setIsFormOpen(true);
    };

    // FAQ data organized by course type
    const faqData: FAQData = {
        interior: [
            {
                question: "How do I enroll in the interior design course?",
                answer: "To enroll in the Interior Design course, open the Wereskill app, navigate to the 'Courses' section, find the Interior Design course, then tap the 'Enroll' or 'Buy Now' button. Complete the payment process, and once confirmed, you'll have instant access to the course materials."
            },
            {
                question: "What software/tools will I learn?",
                answer: "You'll master AutoCAD 2D & 3D, SketchUp, 3ds Max + V-Ray, Lumion, Revit, and D5 Render."
            },
            {
                question: "What is the course duration?",
                answer: "The course lasts until you complete all modules. You progress at your own pace; there's no fixed end date."
            },
            {
                question: "Will I get a certificate?",
                answer: "Yes, you'll receive an Authorised Certificate upon successful completion."
            },
            {
                question: "Are live classes included?",
                answer: "Yes, live interactive sessions are part of the curriculum."
            },
            {
                question: "Will I get internship and placement support?",
                answer: "After completion, you get a 3 to 4-month internship plus 100% placement support."
            },
            {
                question: "How much can I earn after completing the course?",
                answer: "Fresh interior designers in India typically start around ₹15,000–₹30,000 per month. With experience, especially after the internship, you can expect higher pay."
            }
        ],
        uiux: [
            {
                question: "What software will I actually learn in this bundle?",
                answer: "You'll learn all the main design tools used in UI/UX work, including Adobe Illustrator, Adobe Photoshop, Adobe InDesign, Adobe XD, Figma, and Sketch."
            },
            {
                question: "Is this course only for beginners?",
                answer: "No. It starts simple enough for beginners but goes deep enough for intermediate learners too."
            },
            {
                question: "Will I learn prototyping or just visual design?",
                answer: "Both. You'll learn visual design, wireframing, interaction flow, and full prototyping."
            },
            {
                question: "Are user research and UX fundamentals included?",
                answer: "Yes, the course covers research, personas, user flows, wireframes, usability testing, and core UX principles."
            },
            {
                question: "What job roles can I get after completing this?",
                answer: "You can apply for UI Designer, UX Designer, Product Designer, Interaction Designer, or UX Research Assistant roles."
            },
            {
                question: "Will I get internship and placement support?",
                answer: "Yes. You get a guaranteed internship, and we keep arranging interviews with tech companies and startups until you land a UI/UX job."
            },
            {
                question: "How long will it take to become job-ready?",
                answer: "Most learners become job-ready in 2–4 months, depending on practice."
            }
        ],
        motion: [
            {
                question: "What software/tools will I learn?",
                answer: "You'll learn Adobe Illustrator, Adobe InDesign, CorelDRAW, Adobe Photoshop, Adobe Premiere Pro, Adobe After Effects, Maya, and Blender."
            },
            {
                question: "What is the course duration?",
                answer: "Most programs run for 2–6 months. You can check the exact duration on the course page."
            },
            {
                question: "Are live classes included?",
                answer: "Yes, the course includes scheduled live classes where you can learn directly from instructors."
            },
            {
                question: "Will I get recordings of live classes?",
                answer: "Yes, all live sessions are recorded and added to your course."
            },
            {
                question: "Is there an internship and job guarantee?",
                answer: "Yes. You'll get a motion-design internship, and we continue sending your showreel to studios until you get hired."
            },
            {
                question: "What skills will I gain by course end?",
                answer: "You'll learn practical design, editing, animation, and project-building skills that match real industry requirements."
            }
        ],
        digital: [
            {
                question: "What platforms will I learn in this bundle?",
                answer: "Google Ads, Meta Ads, LinkedIn Ads, YouTube Ads, WhatsApp Marketing, SMS Marketing, Email Marketing, and Affiliate Marketing."
            },
            {
                question: "Will I learn how to set up paid campaigns from scratch?",
                answer: "Yes. You'll learn full campaign setup, targeting, bidding, creatives, tracking, and optimization."
            },
            {
                question: "Do you provide internship and placement support?",
                answer: "Yes. After completing the modules, you get a real internship, and we keep giving you company interviews until you're placed."
            },
            {
                question: "Can I start freelancing after this course?",
                answer: "Yes — if you complete the assignments and build sample campaigns. Clients expect real proof of work."
            },
            {
                question: "Will I learn proper conversion tracking?",
                answer: "Yes. You'll learn pixel setup, UTM tracking, event tracking, and analytics dashboards."
            },
            {
                question: "How long until I can start earning?",
                answer: "Most learners start earning in 2–3 months with consistent practice and real campaign execution."
            }
        ],
        fashion: [
            {
                question: "What software will I learn?",
                answer: "You'll use CorelDRAW, Adobe Illustrator, and Photoshop—these are the main tools for fashion design and digital art."
            },
            {
                question: "Do I need any design experience?",
                answer: "No experience needed, but be ready to work consistently. Fashion design takes time to learn."
            },
            {
                question: "Will I learn both creative and technical skills?",
                answer: "Yes, from sketching and digital art to fabric printing and technical designs."
            },
            {
                question: "Are live classes included?",
                answer: "Yes, you'll have live sessions with instructors."
            },
            {
                question: "Can I watch live class recordings?",
                answer: "If the instructor allows, recordings are available. Check course details."
            },
            {
                question: "Will I get internship and job support?",
                answer: "Yes. You get an industry internship, and we continue giving you placement opportunities with boutiques and brands until you secure a job."
            },
            {
                question: "What skills will I have by the end?",
                answer: "You'll be able to create fashion illustrations, digital textile designs, patterns, and build a strong portfolio."
            }
        ],
        animation: [
            {
                question: "What software will I learn?",
                answer: "You'll gain hands-on skills in Maya, Blender, Adobe Animate, Premiere Pro, and After Effects. This covers everything from 3D modeling and animation to video editing and VFX compositing."
            },
            {
                question: "Do I need prior animation experience?",
                answer: "No prior experience required. Be prepared for a challenging but rewarding learning process—animation demands patience and regular practice."
            },
            {
                question: "Will I learn both 2D and 3D animation?",
                answer: "Yes. Adobe Animate covers 2D animation, while Maya and Blender teach 3D modeling and animation."
            },
            {
                question: "Are live classes part of the course?",
                answer: "Yes, live sessions include interactive demos and real-time guidance."
            },
            {
                question: "Will I receive a certificate?",
                answer: "Yes, you'll earn an Authorized Certificate after completing the course."
            },
            {
                question: "Is there an internship and job guarantee?",
                answer: "Yes. You get a production-studio internship, and we keep pushing your profile to VFX and animation companies until you're hired."
            },
            {
                question: "What skills will I have after the course?",
                answer: "You'll be proficient in 3D modeling, rigging, 2D and 3D animation, VFX compositing, and video editing."
            }
        ],
        jewellery: [
            {
                question: "What software will I learn in this Jewellery Design Bundle?",
                answer: "CorelDRAW, Adobe Illustrator, Photoshop, and Rhino — all taught through hands-on, project-based lessons."
            },
            {
                question: "Do I need previous design experience before starting?",
                answer: "No, but expect a learning curve. These tools require patience and regular practice."
            },
            {
                question: "Will I get project files, templates, and design resources?",
                answer: "Yes, every module includes editable files, reference sheets, and practice designs."
            },
            {
                question: "Will I learn both digital sketching and CAD modeling?",
                answer: "Yes. Illustrator and Photoshop cover sketching and concept visuals; Rhino teaches CAD modeling."
            },
            {
                question: "Do I get a certificate after completing the bundle?",
                answer: "Yes, a digital certificate is awarded after you finish all modules."
            },
            {
                question: "Do you really offer placement and job guarantee for jewellery design?",
                answer: "Yes. After your design portfolio is complete, you get an internship, and we keep arranging interviews with jewellery studios and manufacturers until you're placed."
            },
            {
                question: "Will this course help me get freelance jewellery design work?",
                answer: "Yes, if you commit to practicing seriously. This bundle focuses on real, production-ready skills—not just theory."
            }
        ],
        finearts: [
            {
                question: "Who is this course suitable for?",
                answer: "Anyone who wants practical, skill-based training without pointless theory. If you're ready to learn by doing, it fits you."
            },
            {
                question: "Do I need any prior experience before starting this course?",
                answer: "No. But don't expect shortcuts — you'll need consistency and patience."
            },
            {
                question: "What software/tools will I learn in this course?",
                answer: "You'll work hands-on with Procreate for digital painting, Adobe Illustrator for vector design, CorelDRAW for layout and branding work, and Sketch for clean UI/UX visuals."
            },
            {
                question: "Are the lessons live or recorded?",
                answer: "Recorded. You learn at your own pace without waiting for a trainer."
            },
            {
                question: "Will this course help me build a portfolio?",
                answer: "Yes. Every major module includes project-based work you can showcase."
            },
            {
                question: "Will you help me get an internship and job in fine arts after the course?",
                answer: "Yes. You get an internship and continuous placement support, and we keep helping you until you secure a job in a studio, gallery, or creative company."
            },
            {
                question: "Does this course offer a certificate?",
                answer: "Yes. You receive a certificate after completing all lessons and tasks."
            }
        ],
        graphic: [
            {
                question: "Do I need any design background before joining this course?",
                answer: "No. Zero experience is fine. What you do need is consistency. If you expect to become a designer by watching videos without practicing, this course won't magically fix that."
            },
            {
                question: "What software do I need to install?",
                answer: "You'll need Adobe Illustrator, Adobe Photoshop, Adobe InDesign, and CorelDRAW. If your system can't run these, you'll struggle—these aren't lightweight apps."
            },
            {
                question: "Will this course actually make me job-ready?",
                answer: "If you practice, yes. If you just 'watch,' no. Skill comes from repetition, not just enrollment. The course gives you the tools, but you have to execute."
            },
            {
                question: "How long will it take me to learn everything?",
                answer: "A disciplined learner usually becomes comfortable in 6–8 weeks. Someone inconsistent takes months."
            },
            {
                question: "Will I get practical projects, not just theory?",
                answer: "Yes. Every module includes real-world design tasks—posters, logos, social media creatives, brand layouts, magazine designs, etc. If you skip them, don't expect real improvement."
            },
            {
                question: "Is this course good for freelancing?",
                answer: "Definitely. Illustrator + Photoshop alone can get you started. Add InDesign and CorelDRAW, and you're well above average. Just remember: freelancing requires skill and discipline."
            },
            {
                question: "Do you really provide placement and a job guarantee in graphic design?",
                answer: "Yes. Once your graphic design portfolio is ready, we arrange interviews for you and keep pushing your profile until you're placed — that's the job guarantee."
            }
        ]
    };

    // Course metadata for headers - explicitly typed
    const courseMeta: Record<CourseType, CourseMeta> = {
        interior: {
            title: "Interior Design Course",
            color: "from-purple-500 to-pink-500",
            badgeColor: "bg-purple-100 text-purple-800"
        },
        uiux: {
            title: "UI/UX Design Course",
            color: "from-blue-500 to-cyan-500",
            badgeColor: "bg-blue-100 text-blue-800"
        },
        motion: {
            title: "Motion Graphic Design Course",
            color: "from-orange-500 to-red-500",
            badgeColor: "bg-orange-100 text-orange-800"
        },
        digital: {
            title: "Digital Marketing Course",
            color: "from-green-500 to-emerald-500",
            badgeColor: "bg-green-100 text-green-800"
        },
        fashion: {
            title: "Fashion Design Course",
            color: "from-fuchsia-500 to-purple-500",
            badgeColor: "bg-fuchsia-100 text-fuchsia-800"
        },
        animation: {
            title: "Animation & VFX Course",
            color: "from-red-500 to-orange-500",
            badgeColor: "bg-red-100 text-red-800"
        },
        jewellery: {
            title: "Jewellery Design Course",
            color: "from-yellow-500 to-amber-500",
            badgeColor: "bg-yellow-100 text-yellow-800"
        },
        finearts: {
            title: "Fine Arts Course",
            color: "from-indigo-500 to-violet-500",
            badgeColor: "bg-indigo-100 text-indigo-800"
        },
        graphic: {
            title: "Graphic Design Course",
            color: "from-teal-500 to-blue-500",
            badgeColor: "bg-teal-100 text-teal-800"
        }
    };

    // Safe access with type assertion (since we know courseType is valid)
    const currentFAQs = faqData[courseType];
    const meta = courseMeta[courseType];

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="max-w-7xl mx-auto p-2 pb-10">

            {/* Header */}
            <div className="mb-10 text-center">
                <h1
                    className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent"
                >
                    {meta.title} FAQs
                </h1>
                <div className="w-24 h-1 mx-auto mt-3 bg-yellow-500 rounded-full"></div>

                <p className="text-gray-600 dark:text-gray-300 text-lg mt-4">
                    Everything you need to know about the course
                </p>
            </div>

            {/* FAQ List */}
            <div className="space-y-4">
                {currentFAQs.map((faq, index) => {
                    const isOpen = openIndex === index;

                    return (
                        <div
                            key={index}
                            className={`rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 
          transition-all duration-300 hover:shadow-md hover:border-yellow-400/50`}
                        >
                            {/* Header */}
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full p-5 flex justify-between items-center transition-colors"
                                aria-expanded={isOpen}
                            >
                                <span className="text-[16px] md:text-lg font-semibold text-gray-800 dark:text-white text-left flex-1 mr-4">
                                    {faq.question}
                                </span>

                                {/* Chevron */}
                                <div
                                    className={`p-2 rounded-full transition-all duration-500 ${isOpen
                                        ? "bg-yellow-500 text-white rotate-180"
                                        : "bg-gray-100 dark:bg-gray-800 text-gray-500"
                                        }`}
                                >
                                    <ChevronDown className="w-5 h-5" />
                                </div>
                            </button>

                            {/* Smooth Expand Section */}
                            <div
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
                                    }`}
                            >
                                <div className="p-5 pt-0">
                                    <div className="pl-4 border-l-2 border-yellow-500">
                                        <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                                            {faq.answer}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>

    );
};

export default FAQComponent;