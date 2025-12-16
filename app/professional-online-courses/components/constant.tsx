// FAQ data organized by course type
// const faqData: any = {
type CourseType = 'civil' | 'interior' | 'uiux' | 'motion' | 'digital' | 'fashion' | 'animation' | 'jewellery' | 'finearts' | 'graphic';

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
    rbg?: string;
}

export const themeClasses: Record<CourseType, CourseMeta> = {
    interior: {
        title: "Interior Design Course",
        text: "text-yellow-500",
        bg: "bg-yellow-500",
        rbg: "bg-gradient-to-b from-yellow-200 to-white-100",
        border: "border-yellow-500",
        hoverBorder: "hover:border-yellow-500",
        gradient: "from-yellow-400 to-yellow-600",
    },
    uiux: {
        title: "UI/UX Design Course",
        text: "text-blue-500",
        bg: "bg-blue-500",
        border: "border-blue-500",
        rbg: "bg-gradient-to-b from-purple-100 to-white-100",
        hoverBorder: "hover:border-blue-500",
        gradient: "from-blue-500 to-cyan-500",
    },
    motion: {
        title: "Motion Graphic Design Course",
        text: "text-orange-500",
        bg: "bg-orange-500",
        border: "border-orange-500",
        hoverBorder: "hover:border-orange-500",
        gradient: "from-orange-500 to-red-500",
    },
    digital: {
        title: "Digital Marketing Course",
        text: "text-green-500",
        bg: "bg-green-500",
        border: "border-green-500",
        hoverBorder: "hover:border-green-500",
        gradient: "from-green-500 to-emerald-500",
    },
    fashion: {
        title: "Fashion Design Course",
        text: "text-fuchsia-500",
        bg: "bg-fuchsia-500",
        border: "border-fuchsia-500",
        hoverBorder: "hover:border-fuchsia-500",
        gradient: "from-fuchsia-500 to-purple-500",
    },
    animation: {
        title: "Animation & VFX Course",
        text: "text-red-500",
        bg: "bg-red-500",
        border: "border-red-500",
        hoverBorder: "hover:border-red-500",
        gradient: "from-red-500 to-orange-500",
    },
    jewellery: {
        title: "Jewellery Design Course",
        text: "text-yellow-500",
        bg: "bg-yellow-500",
        border: "border-yellow-500",
        hoverBorder: "hover:border-yellow-500",
        gradient: "from-yellow-500 to-amber-500",
    },
    finearts: {
        title: "Fine Arts Course",
        text: "text-indigo-500",
        bg: "bg-indigo-500",
        border: "border-indigo-500",
        hoverBorder: "hover:border-indigo-500",
        gradient: "from-indigo-500 to-violet-500",
    },
    graphic: {
        title: "Graphic Design Course",
        text: "text-[#731e88]",
        bg: "bg-[#731e88]",
        border: "border-[#731e88]",
        hoverBorder: "hover:border-[#731e88]",
        gradient: "from-[#731e88] to-[#9b4db3]",
    },
    civil: {
        title: "Civil & Architecture Drawing Course (2D)",
        text: "text-[#731e88]",
        bg: "bg-[#731e88]",
        border: "border-[#731e88]",
        hoverBorder: "hover:border-[#731e88]",
        gradient: "from-[#731e88] to-[#9b4db3]",
    },
};

export const FAQ_DATA: Record<CourseType, FAQItem[]> = {
    interior: [
        {
            question: "How do I enroll in the interior design course?",
            answer:
                "To enroll in the Interior Design course, open the Wereskill app, go to the “Courses” section, find the Interior Design course, and tap the “Enroll” or “Buy Now” button. Complete the payment process, and once confirmed, you’ll get instant access to all course materials."
        },
        {
            question: "What software and tools will I learn?",
            answer:
                "You will master industry-standard tools including AutoCAD (2D & 3D), SketchUp, 3ds Max with V-Ray, Lumion, Revit, and D5 Render."
        },
        {
            question: "What is the course duration?",
            answer:
                "The course has no fixed end date. You can learn at your own pace and complete all modules comfortably according to your schedule."
        },
        {
            question: "Are live classes included?",
            answer:
                "Yes, live interactive classes are included as part of the curriculum to ensure real-time learning and interaction with instructors."
        },
        {
            question: "Will I get recordings of live classes?",
            answer:
                "Yes, recordings are provided whenever the instructor permits. Availability of recordings is mentioned in the course details."
        },
        {
            question: "Can I download lessons and watch them offline?",
            answer:
                "Yes, lessons that have a download option can be saved and watched offline through the app."
        },
        {
            question: "How are assignments submitted?",
            answer:
                "Assignments are submitted directly through the app using the Assignments section."
        },
        {
            question: "Are tests or quizzes included? How often?",
            answer:
                "Yes, tests and quizzes are conducted after each major module, usually on a weekly or bi-weekly basis."
        },
        {
            question: "Will I get a certificate after completing the course?",
            answer:
                "Yes, you will receive an Authorised Certificate upon successful completion of the course."
        },
        {
            question: "Can I extend my course validity?",
            answer:
                "The course remains accessible until you complete it. Extensions are generally not required."
        },
        {
            question: "What happens if I miss a live class?",
            answer:
                "If a recording is available, you can watch it later. Otherwise, you can continue learning through the recorded modules."
        },
        {
            question: "Is the course available in multiple languages?",
            answer:
                "Yes, the course is available in Hindi, English, and Hinglish."
        },
        {
            question: "What payment methods are accepted?",
            answer:
                "All major payment methods are accepted including UPI, debit/credit cards, net banking, wallets, and more."
        },
        {
            question: "Is customer support available? How fast is the response?",
            answer:
                "Yes, customer support is available through the app, with typical response times within 1 hour."
        },
        {
            question: "How many devices can I log in from at the same time?",
            answer:
                "You can log in on 1 mobile device and 1 laptop simultaneously. Sharing accounts beyond this may lead to account restrictions."
        },
        {
            question: "Can I apply coupon or referral codes?",
            answer:
                "Yes, coupon or referral codes can be applied on the payment screen before completing your purchase."
        },
        {
            question: "What skills will I gain by the end of the course?",
            answer:
                "You will gain strong skills in interior design fundamentals, space planning, 3D modeling, rendering, project execution, and professional client presentations."
        },
        {
            question: "Are doubt-clearing sessions included?",
            answer:
                "Yes, regular doubt-clearing sessions are conducted to ensure you understand every concept clearly."
        },
        {
            question: "What unique benefits does this course offer?",
            answer:
                "After completing the course, you receive a 3 to 4-month internship along with 100% placement support."
        },
        {
            question: "Is there a refund policy?",
            answer:
                "No refunds are provided. You can watch two short preview videos available in the app before purchasing to ensure the course suits you."
        },
        {
            question: "How much can I earn after completing the course?",
            answer:
                "Earnings depend on skills, location, and experience. Fresh interior designers in India usually start earning ₹15,000–₹30,000 per month. With experience and after the internship, earnings can increase significantly."
        },
        {
            question: "What will I become after completing the course?",
            answer:
                "You will become a qualified Interior Designer capable of handling real design projects, 3D modeling, visualizations, and client presentations using professional tools."
        },
        {
            question: "Are industrial or real-world assignments included?",
            answer:
                "Yes, real-world industrial assignments are included to simulate actual project work and help you build a strong portfolio."
        },
        {
            question: "Will I actually get an internship and job after this course?",
            answer:
                "Yes. You receive a confirmed internship, and we continuously provide placement opportunities until you secure a job in an interior design firm or studio."
        }
    ],
    uiux: [
        {
            question: "What software will I actually learn in this bundle?",
            answer:
                "You’ll learn all the main design tools used in UI/UX work, including Adobe Illustrator, Adobe Photoshop, Adobe InDesign, Adobe XD, Figma, and Sketch. Each tool is taught from the basics to practical, real-project use."
        },
        {
            question: "Is this course only for beginners?",
            answer:
                "No. The course starts simple enough for beginners but goes deep enough for intermediate learners as well."
        },
        {
            question: "Do I need a high-end laptop for UI/UX design?",
            answer:
                "No. Figma, XD, Sketch, and the Adobe tools in this bundle run smoothly on a normal laptop."
        },
        {
            question: "Are live UI/UX projects included?",
            answer:
                "Yes. You’ll work on real UI/UX projects so you can build strong portfolio-ready case studies."
        },
        {
            question: "Do I get templates and UI kits?",
            answer:
                "Yes. You get ready-to-use UI kits, templates, icons, components, and design assets."
        },
        {
            question: "Will I learn prototyping or just visual design?",
            answer:
                "Both. You’ll learn visual design, wireframing, interaction flow, user journeys, and full prototyping."
        },
        {
            question: "Are user research and UX fundamentals included?",
            answer:
                "Yes. The course covers user research, personas, user flows, wireframes, usability testing, and core UX principles."
        },
        {
            question: "Will I need to code?",
            answer:
                "No. Coding is not required. UI/UX design focuses on structure, logic, and user experience—not programming."
        },
        {
            question: "Do I get a certificate after completing the bundle?",
            answer:
                "Yes. You’ll receive an official completion certificate after finishing the bundle."
        },
        {
            question: "How are assignments reviewed?",
            answer:
                "Mentors personally review each assignment and provide clear, actionable improvement feedback."
        },
        {
            question: "Will I learn mobile UI, web UI, or both?",
            answer:
                "Both. You’ll design user interfaces for mobile applications as well as websites."
        },
        {
            question: "Do you teach design systems?",
            answer:
                "Yes. You’ll learn how to create full, professional design systems using Figma and Adobe XD."
        },
        {
            question: "Are Figma and Adobe XD both required?",
            answer:
                "No. You can work with either tool, but the course teaches both so you’re industry-ready."
        },
        {
            question: "Do I need drawing or artistic skills for UI/UX?",
            answer:
                "No. UI/UX design is about problem-solving, layout structure, and user thinking—not drawing skills."
        },
        {
            question: "What job roles can I apply for after completing this course?",
            answer:
                "You can apply for UI Designer, UX Designer, Product Designer, Interaction Designer, or UX Research Assistant roles."
        },
        {
            question: "Will I learn how to build professional UI/UX case studies?",
            answer:
                "Yes. You’ll create complete, interview-ready UI/UX case studies for your portfolio."
        },
        {
            question: "Are recordings available for live UI/UX classes?",
            answer:
                "Yes. All live sessions are recorded and uploaded so you can watch them anytime."
        },
        {
            question: "How long will it take to become job-ready?",
            answer:
                "Most learners become job-ready in 2–4 months, depending on consistency and practice."
        },
        {
            question: "Can I start freelancing after this course?",
            answer:
                "Yes. The skills and portfolio you build are enough to start taking freelance UI/UX design projects."
        },
        {
            question: "Will this course help me stand out in interviews?",
            answer:
                "Yes. Your portfolio, case studies, and strong tool knowledge give you a competitive edge."
        },
        {
            question: "Does this course offer internship and placement support?",
            answer:
                "Yes. You receive a guaranteed internship, 99% placement assistance, portfolio support, interview preparation, and continuous job referrals until you’re placed."
        }
    ]
    ,
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
            answer:
                "You’ll get hands-on training in Google Ads, Meta Ads (Facebook & Instagram), LinkedIn Ads, YouTube Ads, WhatsApp Marketing, SMS Marketing, Email Marketing, and Affiliate Marketing. Everything is taught with practical, real workflows—not theory-only."
        },
        {
            question: "Do I need prior marketing experience?",
            answer:
                "No. The course starts from the basics. However, digital marketing requires consistent practice, not just watching lessons."
        },
        {
            question: "Will I learn how to set up paid campaigns from scratch?",
            answer:
                "Yes. You’ll learn complete campaign setup including targeting, bidding, creatives, tracking, optimization, and real decision-making—not just clicking buttons."
        },
        {
            question: "Are real campaign case studies included?",
            answer:
                "Yes. You’ll study real campaigns from different industries to understand how ads perform in real markets."
        },
        {
            question: "Will I learn proper conversion tracking?",
            answer:
                "Yes. You’ll learn pixel setup, UTM tracking, event tracking, and analytics dashboards so you never run ads blindly."
        },
        {
            question: "Do you teach organic marketing along with paid ads?",
            answer:
                "Yes. You’ll learn both organic and paid strategies because strong marketing requires a combination of both."
        },
        {
            question: "Will I learn how to create ad creatives and write copy?",
            answer:
                "Yes. You’ll learn how to design effective creatives and write high-converting ad copy for Google, Meta, YouTube, and LinkedIn."
        },
        {
            question: "Is email marketing included with templates and automation?",
            answer:
                "Yes. You’ll learn email tools, automation, cold email systems, A/B testing, and how to avoid spam issues."
        },
        {
            question: "Do I get WhatsApp and SMS marketing training with tools?",
            answer:
                "Yes. You’ll learn broadcast tools, templates, automations, and best practices to avoid account blocks."
        },
        {
            question: "Are YouTube Ads taught separately from Meta Ads?",
            answer:
                "Yes. You’ll learn complete YouTube ad formats including in-stream ads, discovery ads, retargeting, and funnel-based campaigns."
        },
        {
            question: "Is affiliate marketing taught practically?",
            answer:
                "Yes. You’ll learn niche selection, product selection, funnels, paid ads for affiliate offers, tracking, and scaling."
        },
        {
            question: "Will I learn LinkedIn B2B marketing?",
            answer:
                "Yes. You’ll learn B2B lead generation, message ads, content strategy, and retargeting for professional audiences."
        },
        {
            question: "Do I need a website to run ads?",
            answer:
                "A website is not mandatory, but having a landing page improves conversions. You’ll also learn how to build effective landing funnels."
        },
        {
            question: "Are marketing automation tools included?",
            answer:
                "Yes. You’ll learn email automation, WhatsApp workflows, retargeting automations, and campaign scaling systems."
        },
        {
            question: "Can I start freelancing after this course?",
            answer:
                "Yes—if you complete assignments and build sample campaigns. Clients expect proof of results, not certificates."
        },
        {
            question: "Will this course help me run ads for my own business?",
            answer:
                "Yes. You’ll learn how to avoid wasting budget, fix non-performing ads, and scale profitable campaigns."
        },
        {
            question: "How long until I can start earning?",
            answer:
                "Most learners start earning within 2–3 months with consistent practice and real campaign execution."
        },
        {
            question: "Will I learn SEO in this bundle?",
            answer:
                "Yes. Basic SEO fundamentals are included, but the main focus is Ads, Automation, and Campaign Execution."
        },
        {
            question: "Do you teach retargeting and remarketing?",
            answer:
                "Yes. You’ll learn multi-level retargeting on Google, Meta, and YouTube to improve conversions."
        },
        {
            question: "Does this course cover analytics and reporting?",
            answer:
                "Yes. You’ll learn how to read performance data clearly and optimize campaigns with confidence."
        },
        {
            question: "Do you provide internship, placement, and job guarantee for digital marketing?",
            answer:
                "Yes. After completing the modules, you receive a real internship, and we keep arranging company interviews until you’re placed."
        }
    ],
    fashion: [
        {
            question: "What software will I learn?",
            answer:
                "You’ll use CorelDRAW, Adobe Illustrator, and Photoshop—these are the primary tools used in modern fashion design and digital art."
        },
        {
            question: "Do I need any design experience before starting?",
            answer:
                "No prior experience is required. However, fashion design takes time and consistency, so be prepared to practice regularly."
        },
        {
            question: "Will I learn both creative and technical skills?",
            answer:
                "Yes. The course covers creative sketching, digital fashion illustration, textile and fabric printing, and technical fashion designs."
        },
        {
            question: "Are live classes included?",
            answer:
                "Yes. Live interactive classes with instructors are part of the course."
        },
        {
            question: "Can I watch recordings of live classes?",
            answer:
                "Yes, recordings are available if the instructor permits. Please check course details for confirmation."
        },
        {
            question: "Can I download lessons to watch offline?",
            answer:
                "Yes. Lessons marked with a download option can be saved for offline viewing."
        },
        {
            question: "How do I submit assignments?",
            answer:
                "Assignments are submitted easily through the app’s Assignments section."
        },
        {
            question: "Are there tests or assessments? How often?",
            answer:
                "Yes. Tests are conducted after key modules, usually weekly or bi-weekly."
        },
        {
            question: "Will I get a certificate after completing the course?",
            answer:
                "Yes. You will receive an official certificate after successfully completing the course."
        },
        {
            question: "Can I extend access to the course?",
            answer:
                "You have access until you complete the course. Extensions are rarely required."
        },
        {
            question: "What happens if I miss a live class?",
            answer:
                "You can watch the recording if it’s available or catch up using the course materials."
        },
        {
            question: "Is the course available in multiple languages?",
            answer:
                "Yes. The course is available in Hindi, English, and Hinglish."
        },
        {
            question: "What payment methods are accepted?",
            answer:
                "All common payment methods are accepted, including UPI, debit/credit cards, net banking, and wallets."
        },
        {
            question: "How fast is customer support?",
            answer:
                "Customer support is available via the app, with responses typically within one hour."
        },
        {
            question: "How many devices can I use at the same time?",
            answer:
                "You can log in on one mobile and one laptop simultaneously. Using more devices may cause account issues."
        },
        {
            question: "Can I apply coupon or referral codes?",
            answer:
                "Yes. Coupon or referral codes can be applied on the payment screen before completing the purchase."
        },
        {
            question: "What skills will I have by the end of the course?",
            answer:
                "You’ll be able to create fashion illustrations, digital textile designs, patterns, and a strong professional portfolio."
        },
        {
            question: "Are doubt-clearing sessions included?",
            answer:
                "Yes. Regular doubt-clearing sessions are scheduled to help you resolve questions."
        },
        {
            question: "Are assignments practical and industry-focused?",
            answer:
                "Yes. Assignments are designed to simulate real-world fashion design work."
        },
        {
            question: "Is there a refund policy?",
            answer:
                "No refunds are provided. Please watch the preview videos before purchasing and proceed only if you’re confident."
        },
        {
            question: "Will you provide an internship and job support after the fashion design course?",
            answer:
                "Yes. You receive an industry internship, and we continue providing placement opportunities with boutiques and fashion brands until you secure a job."
        }
    ],
    animation: [
        {
            question: "What software will I learn?",
            answer:
                "You’ll gain hands-on skills in Maya, Blender, Adobe Animate, Premiere Pro, and After Effects. This covers 3D modeling, animation, video editing, and VFX compositing."
        },
        {
            question: "Do I need prior animation experience?",
            answer:
                "No prior experience is required. Be prepared for a challenging but rewarding learning process—animation demands patience and regular practice."
        },
        {
            question: "Will I learn both 2D and 3D animation?",
            answer:
                "Yes. Adobe Animate covers 2D animation, while Maya and Blender focus on 3D modeling and animation."
        },
        {
            question: "Are live classes part of the course?",
            answer:
                "Yes. Live sessions include interactive demonstrations and real-time guidance from instructors."
        },
        {
            question: "Can I access recordings of live classes?",
            answer:
                "Recordings are available if permitted by the instructor. Please check course details for availability."
        },
        {
            question: "Can I download lessons to watch offline?",
            answer:
                "Yes. Lessons marked as downloadable can be saved for offline viewing."
        },
        {
            question: "How do I submit assignments?",
            answer:
                "Assignments are submitted directly through the app’s Assignments section."
        },
        {
            question: "Are there tests or quizzes? How often?",
            answer:
                "Yes. Tests are conducted after major modules, usually on a weekly or bi-weekly basis."
        },
        {
            question: "Will I receive a certificate after completion?",
            answer:
                "Yes. You’ll earn an Authorized Certificate after successfully completing the course."
        },
        {
            question: "Can I extend my course access?",
            answer:
                "You have access until you complete the course. Extensions are rarely required but can be requested if needed."
        },
        {
            question: "What happens if I miss a live class?",
            answer:
                "You can catch up by watching the recording if available or reviewing the provided learning materials."
        },
        {
            question: "Is the course available in multiple languages?",
            answer:
                "Yes. The course is available in Hindi, English, and Hinglish."
        },
        {
            question: "What payment methods are accepted?",
            answer:
                "All major payment methods are accepted, including UPI, debit/credit cards, net banking, and wallets."
        },
        {
            question: "How quickly can I get customer support?",
            answer:
                "Customer support is available via the app, with responses typically within one hour."
        },
        {
            question: "How many devices can I use at the same time?",
            answer:
                "You can log in on one mobile device and one laptop simultaneously. Using more devices may cause access issues."
        },
        {
            question: "Can I apply coupon or referral codes?",
            answer:
                "Yes. Coupon or referral codes can be applied on the payment screen before completing your purchase."
        },
        {
            question: "What skills will I have after completing the course?",
            answer:
                "You’ll be proficient in 3D modeling, rigging, 2D and 3D animation, VFX compositing, and video editing."
        },
        {
            question: "Are doubt-clearing sessions included?",
            answer:
                "Yes. Regular doubt-clearing sessions are scheduled to address your questions."
        },
        {
            question: "Are assignments relevant to the industry?",
            answer:
                "Yes. Assignments are designed to simulate real-world animation and VFX projects and help build your portfolio."
        },
        {
            question: "What is the refund policy?",
            answer:
                "There is no refund policy. Please watch the preview videos before purchasing and proceed only if satisfied."
        },
        {
            question: "Is there an internship and job guarantee for Animation & VFX?",
            answer:
                "Yes. You receive a production-studio internship, and we continuously push your profile to animation and VFX companies until you’re hired."
        }
    ],
    jewellery: [
        {
            question: "What software will I learn in this Jewellery Design Bundle?",
            answer:
                "You’ll learn CorelDRAW, Adobe Illustrator, Photoshop, and Rhino — all taught through hands-on, project-based lessons."
        },
        {
            question: "Do I need previous design experience before starting?",
            answer:
                "No prior experience is required, but expect a learning curve. These tools demand patience and regular practice."
        },
        {
            question: "How do I access the Jewellery Design Bundle after purchase?",
            answer:
                "Once your payment is confirmed, the course unlocks instantly in your “My Courses” section."
        },
        {
            question: "Can I learn all four software tools on mobile?",
            answer:
                "Illustrator and Photoshop have mobile apps, but Rhino requires a desktop or laptop for full functionality."
        },
        {
            question: "Will I get project files, templates, and design resources?",
            answer:
                "Yes. Every module includes editable files, reference sheets, and practice designs."
        },
        {
            question: "Can I use the course on multiple devices?",
            answer:
                "You can log in on two devices, but not at the same time. Logging in on more devices may cause auto-logout."
        },
        {
            question: "What file types will I create for jewellery manufacturing?",
            answer:
                "You’ll work with vector files, high-resolution renders, technical drawings, and Rhino 3D CAD exports suitable for manufacturing."
        },
        {
            question: "How long does it take to finish the entire bundle?",
            answer:
                "It varies by learner, but most students complete the bundle in 4–8 weeks with consistent effort."
        },
        {
            question: "Will I learn both digital sketching and CAD modeling?",
            answer:
                "Yes. Illustrator and Photoshop cover sketching and concept visuals, while Rhino focuses on CAD modeling."
        },
        {
            question: "Do I get a certificate after completing the bundle?",
            answer:
                "Yes. A digital certificate is awarded after you successfully complete all modules."
        },
        {
            question: "Can I redo lessons or restart the course anytime?",
            answer:
                "Yes. You can replay lessons unlimited times while your course access remains active."
        },
        {
            question: "How do I extend my course validity?",
            answer:
                "Go to “My Courses,” select your Jewellery Design Bundle, and tap “Extend Validity.” Additional charges may apply."
        },
        {
            question: "Is support available if I get stuck with any software?",
            answer:
                "Yes. You can submit a ticket via the Helpdesk section. Adding screenshots helps resolve issues faster."
        },
        {
            question: "Can I apply discount coupons on this bundle?",
            answer:
                "Yes. Enter your coupon code during checkout before completing payment."
        },
        {
            question: "Will this course help me get freelance jewellery design work?",
            answer:
                "Yes, if you practice seriously. This bundle focuses on real, production-ready skills rather than just theory."
        },
        {
            question: "Are there real-world jewellery design projects included?",
            answer:
                "Absolutely. You’ll work on real client-style briefs, from concept development to final 3D models ready for manufacturing."
        },
        {
            question: "Do you really offer placement and job guarantee for jewellery design students?",
            answer:
                "Yes. Once your jewellery design portfolio is complete, you receive an internship, and we continuously arrange interviews with jewellery studios and manufacturers until you’re placed."
        }
    ],
    finearts: [
        {
            question: "Who is this course suitable for?",
            answer:
                "Anyone who wants practical, skill-based training without pointless theory. If you’re ready to learn by doing, this course fits you."
        },
        {
            question: "Do I need any prior experience before starting this course?",
            answer:
                "No prior experience is required. However, don’t expect shortcuts — consistency and patience are necessary to see real improvement."
        },
        {
            question: "What software/tools will I learn in this course?",
            answer:
                "You’ll work hands-on with Procreate for digital painting, Adobe Illustrator for vector design, CorelDRAW for layout and branding work, and Sketch for clean UI/UX visuals. Each tool serves a different purpose, and skipping any of them will limit your skill set."
        },
        {
            question: "Are the lessons live or recorded?",
            answer:
                "All lessons are recorded, allowing you to learn at your own pace without depending on live schedules."
        },
        {
            question: "How long does this course take to complete?",
            answer:
                "It depends on your discipline. Most learners complete the course within a few weeks when studying consistently."
        },
        {
            question: "What kind of projects will I build?",
            answer:
                "You’ll work on practical, portfolio-worthy projects that prove real understanding of the tools — not filler assignments."
        },
        {
            question: "Will I get downloadable resources?",
            answer:
                "Yes. Templates, project files, and supporting guides are provided wherever required."
        },
        {
            question: "Can I follow this course using a mobile device?",
            answer:
                "Yes, but for software-heavy lessons, using a laptop or PC is strongly recommended to avoid frustration."
        },
        {
            question: "Will this course help me get freelance work?",
            answer:
                "Yes, if you apply the skills and build a strong portfolio. The course provides the skills — results depend on your output."
        },
        {
            question: "Does this course offer a certificate?",
            answer:
                "Yes. You receive a certificate after completing all lessons and required tasks."
        },
        {
            question: "How many practice tasks or assignments are included?",
            answer:
                "There are enough assignments in every module to ensure proper learning. The exact number varies by module."
        },
        {
            question: "Will I get feedback on my projects?",
            answer:
                "Yes. Structured feedback is provided when you submit your tasks."
        },
        {
            question: "Is the course beginner-friendly?",
            answer:
                "Yes. The course starts with basics and gradually increases in complexity."
        },
        {
            question: "Will I be able to download course videos?",
            answer:
                "No. Videos remain inside the app to ensure content security and continuous updates."
        },
        {
            question: "What if I find the course too fast or too slow?",
            answer:
                "You control the pace. You can rewatch lessons, pause, or speed them up as needed."
        },
        {
            question: "Are updates added to the course?",
            answer:
                "Yes. New lessons and improved content are added regularly."
        },
        {
            question: "Can I switch to another course after buying this one?",
            answer:
                "No. Purchases apply only to the selected course, so choose carefully before enrolling."
        },
        {
            question: "Will this course help me build a portfolio?",
            answer:
                "Yes. Every major module includes project-based work suitable for showcasing in a portfolio."
        },
        {
            question: "Do I get lifetime access to the lessons?",
            answer:
                "Yes. Once purchased, you get permanent access to the full course."
        },
        {
            question: "What should I do if I don’t understand a topic?",
            answer:
                "Rewatch the lesson, revisit resources, and submit your doubts. Skipping concepts will only slow your progress later."
        },
        {
            question: "Will you help me get an internship and job in fine arts after the course?",
            answer:
                "Yes. You receive an internship along with continuous placement support until you secure a job in a studio, gallery, or creative company."
        }
    ],
    graphic: [
        {
            question: "Do I need any design background before joining this course?",
            answer:
                "No. Zero experience is absolutely fine. What you do need is consistency. If you expect to become a designer just by watching videos without practicing, this course won’t magically fix that."
        },
        {
            question: "What software do I need to install?",
            answer:
                "You need Adobe Illustrator, Adobe Photoshop, Adobe InDesign, and CorelDRAW. These are professional tools—not lightweight apps. If your system can’t run them smoothly, you may struggle."
        },
        {
            question: "Will this course actually make me job-ready?",
            answer:
                "If you practice consistently, yes. If you only watch lessons without applying them, no. Skill comes from repetition. The course provides direction and tools—you have to execute."
        },
        {
            question: "Can I learn all four software at the same time?",
            answer:
                "Yes, but it’s not recommended to jump randomly. Start with Illustrator or CorelDRAW for fundamentals, move to Photoshop, and then InDesign. A structured approach gives faster results."
        },
        {
            question: "Is this course suitable for absolute beginners?",
            answer:
                "Yes, but expect a learning curve. The course keeps concepts simple, but graphic design requires patience. If you quit whenever something feels complicated, this field may not be for you."
        },
        {
            question: "How long will it take me to learn everything?",
            answer:
                "It depends entirely on your consistency. A disciplined learner usually becomes comfortable in 6–8 weeks. Inconsistent learners may take several months."
        },
        {
            question: "Will I get practical projects or only theory?",
            answer:
                "Yes, this course is highly practical. Every module includes real-world design tasks like posters, logos, social media creatives, branding layouts, magazine designs, and more."
        },
        {
            question: "Is this course good for freelancing?",
            answer:
                "Absolutely. Illustrator and Photoshop alone can help you start freelancing. Adding InDesign and CorelDRAW puts you well above average. Freelancing success depends on skill and discipline."
        },
        {
            question: "Can I follow this course on a mobile phone?",
            answer:
                "You can watch lessons on mobile using the Wereskill app, but you cannot practice on mobile. Graphic design is a desktop-based skill—there are no shortcuts."
        },
        {
            question: "Will I receive a certificate after completing the course?",
            answer:
                "Yes, you will receive a Wereskill course completion certificate. However, clients hire based on your portfolio, not certificates. Strong projects matter more."
        },
        {
            question: "What if I get stuck while learning?",
            answer:
                "You can ask questions through the app’s support or community section. Don’t struggle silently—asking questions helps you move faster."
        },
        {
            question: "Does this course cover logo design, branding, posters, and social media ads?",
            answer:
                "Yes. Software training is combined with real design applications, including logos, branding, posters, social media creatives, advertisements, and layout designs."
        },
        {
            question: "Do I need a powerful computer?",
            answer:
                "You don’t need a gaming PC, but a weak system will struggle. Minimum requirements: 8GB RAM, Intel i3 / Ryzen 3 or higher, and an SSD is highly recommended."
        },
        {
            question: "Will I learn how to create a portfolio?",
            answer:
                "Yes. You’ll build a clean, beginner-friendly portfolio during the course. However, you must complete the projects—your portfolio won’t create itself."
        },
        {
            question: "Can I start earning after completing this course?",
            answer:
                "Yes, if you apply the skills. You can start with logo design, social media creatives, business cards, posters, flyers, magazine layouts, and basic UI elements. Skills first—earnings follow."
        },
        {
            question: "Does this course include internship, placement, or a job guarantee?",
            answer:
                "Yes. Wereskill provides internship opportunities, placement support, and a job guarantee program. However, your performance matters—assignments, practice, and portfolio completion decide results."
        },
        {
            question: "Do you really provide placement and a job guarantee in graphic design?",
            answer:
                "Yes. Once your graphic design portfolio is ready, we arrange interviews and continuously push your profile until you get placed. That’s how the job guarantee works."
        }
    ],
    civil: [
        {
            question: "Do I need any design background before joining this course?",
            answer:
                "No. Zero experience is absolutely fine. What you do need is consistency. If you expect to become a designer just by watching videos without practicing, this course won’t magically fix that."
        },
        {
            question: "What software do I need to install?",
            answer:
                "You need Adobe Illustrator, Adobe Photoshop, Adobe InDesign, and CorelDRAW. These are professional tools—not lightweight apps. If your system can’t run them smoothly, you may struggle."
        },
        {
            question: "Will this course actually make me job-ready?",
            answer:
                "If you practice consistently, yes. If you only watch lessons without applying them, no. Skill comes from repetition. The course provides direction and tools—you have to execute."
        },
        {
            question: "Can I learn all four software at the same time?",
            answer:
                "Yes, but it’s not recommended to jump randomly. Start with Illustrator or CorelDRAW for fundamentals, move to Photoshop, and then InDesign. A structured approach gives faster results."
        },
        {
            question: "Is this course suitable for absolute beginners?",
            answer:
                "Yes, but expect a learning curve. The course keeps concepts simple, but graphic design requires patience. If you quit whenever something feels complicated, this field may not be for you."
        },
        {
            question: "How long will it take me to learn everything?",
            answer:
                "It depends entirely on your consistency. A disciplined learner usually becomes comfortable in 6–8 weeks. Inconsistent learners may take several months."
        },
        {
            question: "Will I get practical projects or only theory?",
            answer:
                "Yes, this course is highly practical. Every module includes real-world design tasks like posters, logos, social media creatives, branding layouts, magazine designs, and more."
        },
        {
            question: "Is this course good for freelancing?",
            answer:
                "Absolutely. Illustrator and Photoshop alone can help you start freelancing. Adding InDesign and CorelDRAW puts you well above average. Freelancing success depends on skill and discipline."
        },
        {
            question: "Can I follow this course on a mobile phone?",
            answer:
                "You can watch lessons on mobile using the Wereskill app, but you cannot practice on mobile. Graphic design is a desktop-based skill—there are no shortcuts."
        },
        {
            question: "Will I receive a certificate after completing the course?",
            answer:
                "Yes, you will receive a Wereskill course completion certificate. However, clients hire based on your portfolio, not certificates. Strong projects matter more."
        },
        {
            question: "What if I get stuck while learning?",
            answer:
                "You can ask questions through the app’s support or community section. Don’t struggle silently—asking questions helps you move faster."
        },
        {
            question: "Does this course cover logo design, branding, posters, and social media ads?",
            answer:
                "Yes. Software training is combined with real design applications, including logos, branding, posters, social media creatives, advertisements, and layout designs."
        },
        {
            question: "Do I need a powerful computer?",
            answer:
                "You don’t need a gaming PC, but a weak system will struggle. Minimum requirements: 8GB RAM, Intel i3 / Ryzen 3 or higher, and an SSD is highly recommended."
        },
        {
            question: "Will I learn how to create a portfolio?",
            answer:
                "Yes. You’ll build a clean, beginner-friendly portfolio during the course. However, you must complete the projects—your portfolio won’t create itself."
        },
        {
            question: "Can I start earning after completing this course?",
            answer:
                "Yes, if you apply the skills. You can start with logo design, social media creatives, business cards, posters, flyers, magazine layouts, and basic UI elements. Skills first—earnings follow."
        },
        {
            question: "Does this course include internship, placement, or a job guarantee?",
            answer:
                "Yes. Wereskill provides internship opportunities, placement support, and a job guarantee program. However, your performance matters—assignments, practice, and portfolio completion decide results."
        },
        {
            question: "Do you really provide placement and a job guarantee in graphic design?",
            answer:
                "Yes. Once your graphic design portfolio is ready, we arrange interviews and continuously push your profile until you get placed. That’s how the job guarantee works."
        }
    ]
};


