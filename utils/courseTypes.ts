const API_BASE = `${process.env.NEXT_PUBLIC_BASE_URL}`

export type CourseCategory = {
  [key: string]: CourseType[];

};

export type SoftwareType = {
  name: string;
  src: string;
};

export type CurriculumType = {
  [year: string]: {
    image: string;
    imageAlt: string;
    [semester: string]: string[] | string;
  };
};

export type WhatLearn = {
  skill: string;
  description: string;
};
export type VideosType = {
  url: string;
};

export type CourseType = {
  redirectUrl: string;
  mainTitle?: string;
  value: string;
  label: string;
  title: string;
  duration: string;
  description: string;
  content: string;
  metaTitle?: string;
  metaDescription?: string;
  curriculum?: CurriculumType;
  software: SoftwareType[];
  whatYouWillLearn: WhatLearn[];
  videos: VideosType[];
};

const deepTrim = (value: any): any => {
  if (typeof value === 'string') {
    return value.trim();
  }

  if (Array.isArray(value)) {
    return value.map(deepTrim);
  }

  if (value !== null && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, val]) => [key, deepTrim(val)])
    );
  }

  return value;
};

// utils/server/courseTypes.ts
// export async function getCourseTypes() {
//   const res = await fetch(`${API_BASE}/courses/course-types`, {
//     cache: "no-store",
//   });

//   return res.json();
// }


const res = await fetch(`${API_BASE}/courses/course-types`);
const data = await res.json();

const trimmedCourseTypes = deepTrim(data);

export const courseTypes = trimmedCourseTypes;

export const categoryHeroImages: { [key: string]: string[] } = {
  "interior-design": [
    "https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=1600&q=80", // BDes
    "https://images.unsplash.com/photo-1618221381711-42ca8ab6e908?w=1600&q=80", // BVOC
    "https://images.unsplash.com/photo-1616048056617-93b94a339009?w=1600&q=80", // BSc
    "https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=1600&q=80", // 1 Year Diploma
    "https://images.unsplash.com/photo-1615876234886-fd9a39fda97f?w=1600&q=80", // 3 Year Diploma
  ],
  "fashion-design": [
    "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1600&q=80", // Fashion design studio
    "https://images.unsplash.com/photo-1537832816519-689ad163238b?w=1600&q=80", // Fashion showcase
    "https://images.unsplash.com/photo-1528459801416-a9241982fc8d?w=1600&q=80", // Design workshop
    "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=1600&q=80", // Fashion show
    "https://images.unsplash.com/photo-1544441893-675973e31985?w=1600&q=80", // Textile design
  ],

  "graphic-design": [
    "https://images.unsplash.com/photo-1626785774625-0b1c2c4efd7c?w=1600&q=80", // Design workspace
    "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1600&q=80", // Creative process
    "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=1600&q=80", // Digital art
    "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=1600&q=80", // Design tools
    "https://images.unsplash.com/photo-1558655146-d09347e92766?w=1600&q=80", // Typography work
  ],

  "uiux-design": [
    "https://images.unsplash.com/photo-1626785774625-0b1c2c4efd7c?w=1600&q=80", // Design workspace
    "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1600&q=80", // Creative process
    "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=1600&q=80", // Digital art
    "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=1600&q=80", // Design tools
    "https://images.unsplash.com/photo-1558655146-d09347e92766?w=1600&q=80", // Typography work
  ],

  // "ui-ux-design": [
  //   {
  //     "redirectUrl": "/ui-ux-design/bdes-in-ui-ux-design",
  //     "mainTitle": "ui-ux-design",
  //     "metaTitle": "UI/UX Design Course in Jodhpur | Inframe School of Art & Design",
  //     "metaDescription": "Join Inframe's UI/UX Design Course in Jodhpur. Learn to create intuitive digital experiences with industry-standard tools and methodologies.",
  //     "value": "bdes-in-ui-ux-design",
  //     "label": "B. Des in UI/UX Design",
  //     "title": "Bachelor of Design in UI/UX Design",
  //     "duration": "4 Years Full-Time",
  //     "description": "Master the art of creating intuitive digital experiences through our comprehensive UI/UX design program. Learn from industry experts and build a successful career in digital product design.",
  //     "content": "The Bachelor of Design (B.Des) in UI/UX Design is a four-year full-time program designed to develop professionals who can create intuitive and engaging digital experiences. This course combines visual design principles with user psychology and technical implementation. Students learn user research, wireframing, prototyping, and usability testing while mastering industry-standard design tools. The curriculum integrates theoretical knowledge with practical projects, preparing graduates for roles in UI design, UX design, product design, and interaction design.",
  //     "software": [
  //       { "name": "Figma", "src": "/software logos/figma-logo.png" },
  //       { "name": "Adobe XD", "src": "/software logos/adobe-xd-logo.png" },
  //       { "name": "Sketch", "src": "/software logos/sketch-logo.png" },
  //       { "name": "Photoshop", "src": "/software logos/pngegg (24).png" },
  //       { "name": "Illustrator", "src": "/software logos/illustrator-logo.png" }
  //     ],
  //     "videos": [
  //       { "url": "https://youtube.com/embed/dQw4w9WgXcQ" },
  //       { "url": "https://youtube.com/embed/dQw4w9WgXcQ" },
  //       { "url": "https://youtube.com/embed/dQw4w9WgXcQ" }
  //     ],
  //     "whatYouWillLearn": [
  //       {
  //         "skill": "User Research",
  //         "description": "Learn to conduct user interviews, surveys, and usability tests to inform design decisions"
  //       },
  //       {
  //         "skill": "UI Design",
  //         "description": "Master the principles of visual design, typography, color theory, and layout for digital interfaces"
  //       },
  //       {
  //         "skill": "UX Design",
  //         "description": "Understand user psychology, information architecture, and interaction design patterns"
  //       },
  //       {
  //         "skill": "Prototyping",
  //         "description": "Create interactive prototypes using industry-standard tools like Figma and Adobe XD"
  //       }
  //     ],
  //     "curriculum": {
  //       "1st Year": {
  //         "image": "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c",
  //         "imageAlt": "UI/UX design fundamentals workspace",
  //         "Semester 1": [
  //           "Introduction to Design Thinking",
  //           "Visual Design Fundamentals",
  //           "Digital Tools and Technology",
  //           "Typography and Layout",
  //           "Color Theory and Psychology",
  //           "Design History and Evolution"
  //         ],
  //         "Semester 2": [
  //           "User Interface Design Basics",
  //           "User Experience Principles",
  //           "Digital Design Tools",
  //           "Web Design Fundamentals",
  //           "Design Systems",
  //           "Interactive Design"
  //         ]
  //       },
  //       "2nd Year": {
  //         "image": "https://images.unsplash.com/photo-1559028012-481c04fa702d",
  //         "imageAlt": "Digital prototyping and wireframing",
  //         "Semester 3": [
  //           "User Research Methods",
  //           "Information Architecture",
  //           "Wireframing and Prototyping",
  //           "Interaction Design",
  //           "Mobile App Design",
  //           "Usability Testing"
  //         ],
  //         "Semester 4": [
  //           "Advanced UI Design",
  //           "UX Strategy",
  //           "Design Systems",
  //           "Responsive Design",
  //           "Motion Design",
  //           "Design Documentation"
  //         ]
  //       },
  //       "3rd Year": {
  //         "image": "https://images.unsplash.com/photo-1542744173-8e7e53415bb0",
  //         "imageAlt": "UI/UX team collaboration",
  //         "Semester 5": [
  //           "Advanced UX Research",
  //           "Service Design",
  //           "Design Leadership",
  //           "Design Systems at Scale",
  //           "Accessibility in Design",
  //           "Design Ethics"
  //         ],
  //         "Semester 6": [
  //           "Product Design",
  //           "Design Strategy",
  //           "Team Collaboration",
  //           "Design Operations",
  //           "Portfolio Development",
  //           "Industry Projects"
  //         ]
  //       },
  //       "4th Year": {
  //         "image": "https://images.unsplash.com/photo-1542744094-24638eff58bb",
  //         "imageAlt": "Professional UI/UX design workspace",
  //         "Semester 7": [
  //           "Advanced Product Design",
  //           "Design Management",
  //           "Emerging Technologies",
  //           "Cross-platform Design",
  //           "Design Research Project",
  //           "Industry Internship"
  //         ],
  //         "Semester 8": [
  //           "Capstone Project",
  //           "Professional Practice",
  //           "Portfolio Finalization",
  //           "Design Entrepreneurship",
  //           "Future of Design",
  //           "Final Thesis"
  //         ]
  //       }
  //     }
  //   }
  // ],

  "digital-marketing": [
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&q=80", // Digital analytics
    "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=1600&q=80", // Social media marketing
    "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=1600&q=80", // Content strategy
  ],
  "jewellery-design": [
    "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1600&q=80", // BVOC - Jewellery workshop
    "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=1600&q=80", // 1 Year Diploma - Diamond and jewellery design
    "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=1600&q=80", // CAD Jewellery - Digital design workspace
    "https://images.unsplash.com/photo-1590548784585-643d2b9f2925?w=1600&q=80", // 6 Month Certificate - Basic jewellery making
    "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1600&q=80", // 6 Month CAD Certificate - Modern jewellery design
  ],

  "animation-vfx": [
    "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=1600&q=80", // BDes - Animation workstation
    "https://images.unsplash.com/photo-1626785774625-0b1c2c4efd7c?w=1600&q=80", // BVOC - Creative workspace
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1600&q=80", // BSc - Technical setup
    "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1600&q=80", // 1 Year Diploma
    "https://images.unsplash.com/photo-1558655146-d09347e92766?w=1600&q=80", // 2 Year Diploma
    "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1600&q=80", // 3 Year Diploma
  ],

  "entrepreneurship-skill": [
    "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&q=80", // BVOC - Business planning and strategy
    "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1600&q=80", // 1 Year Diploma - Startup workspace
  ],

  "media-entertainment": [
    "https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=1600&q=80", // BVOC - Professional media studio
    "https://images.unsplash.com/photo-1524253482453-3fed8d2fe12b?w=1600&q=80", // 1 Year Diploma - Content creation setup
  ],

  "fine-arts": [
    "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=1600&q=80", // BFA Painting
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1600&q=80", // BFA Visual Communication
    "https://images.unsplash.com/photo-1544531586-fde5298cdd40?w=1600&q=80", // BFA Sculpture
    "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=1600&q=80", // BFA Applied
    "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1600&q=80", // BVOC Fine Arts
    "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=1600&q=80", // 1 Year Diploma Painting
    "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=1600&q=80", // 3 Year Diploma Fine Arts
  ],

  "advertising-marketing": [
    "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&q=80", // BBA - Marketing strategy and planning
  ],
};
