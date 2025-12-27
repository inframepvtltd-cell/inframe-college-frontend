import { cache } from "react";
import { fetchCourseBySlug } from "../api/api";
import DigitalMarketingComponent from "../../../../components/cityComponents/digitalMarketingComponent";
import AnimationVFXComponent from "../../../../components/cityComponents/AnimationVFXComponent";
import InteriorDesignComponent from "../../../../components/cityComponents/InteriorDesignComponent";
import GraphicDesignComponent from "../../../../components/cityComponents/GraphicDesignComponent";
import FashionDesignComponent from "../../../../components/cityComponents/fashionDesignComponent";
import JewelleryDesignComponent from "../../../../components/cityComponents/JewelleryDesignComponent";
import UIUXDesignComponent from "../../../../components/cityComponents/uiuxDesignComponent";

// mapping slug keywords to components
const courseComponents: Record<string, any> = {
    "animation": AnimationVFXComponent,
    "digital": DigitalMarketingComponent,
    "interior": InteriorDesignComponent,
    "graphic": GraphicDesignComponent,
    "fashion": FashionDesignComponent,
    "jewellery": JewelleryDesignComponent,
    "uiux": UIUXDesignComponent,
};

// cache = prevents double API calls
const getCourse = cache(async (slug: string) => {
    return fetchCourseBySlug(slug);
});

// extract category keyword from slug
const getCategoryFromSlug = (slug: string) => {
    if (!slug) return "";
    const parts = slug.split("-course-"); // e.g., "digital-marketing-course-in-ajmer" -> "digital-marketing"
    return parts[0].split("-")[0]; // take first part as main category, e.g., "digital"
};

// SEO (SERVER ONLY)
export async function generateMetadata({ params }: any) {
    const { slug } = await params;
    const course = await getCourse(slug);

    return {
        title: course?.data.meta_title || "Inframe School",
        description: course?.data.meta_description || "",
    };
}

// PAGE (SERVER ONLY)
export default async function Page({ params }: any) {
    const { slug } = await params;
    const course = await getCourse(slug);

    if (!course) {
        return <div className="mt-20 text-center">Not Found</div>;
    }

    const category = getCategoryFromSlug(course.data.course_slug);
    const CourseComponent = courseComponents[category];

    if (!CourseComponent) {
        return <div className="mt-20 text-center">Component not found for this course</div>;
    }

    return (
        <div className="bg-white text-black mt-20">
            <CourseComponent
                title={course.data.course_name}
                duration="4 Years Full-Time"
                content1={course.data.overview}
                content2={course.data.course_description}
                description={course.data.meta_description}
                index={0}
                category={category}
                software={course.data.software || ["Photoshop", "Illustrator"]}
            />
        </div>
    );
}



// import DigitalMarketingComponent from "../../../../components/cityComponents/digitalMarketingComponent";

// export const metadata = {
//     title: "Digital Marketing Course in Agra | Inframe School",
//     description: "Learn SEO, PPC, and analytics with Inframe School’s Digital Marketing Course in Agra for a strong digital career."
// };

// function Page() {
//     return (
//         <div className="bg-white text-black mt-20">
//             <DigitalMarketingComponent
//                 title="Digital Marketing Course"
//                 duration="4 Years Full-Time"
//                 content1="At Inframe, you can choose from multiple Digital Marketing programs such as B.Des (Digital Marketing), BVOC, B.Sc, One-Year Diploma, and Three-Year Diploma. If you are interested in a Digital Marketing Course in Agra, these courses help you build strong strategic, creative, and technical skills required for success in online marketing. By the end of the course, you will have a professional portfolio and the ability to manage digital marketing for businesses, brands, and clients."
//                 content2="
// You will learn search engine optimization, social media marketing, content marketing, email marketing, PPC advertising, analytics, branding, and comprehensive digital marketing strategy. The course also trains you on tools such as Google Analytics, Google Ads, Facebook/Instagram Ads Manager, SEO tools, and content-creation software for efficient campaign execution. With these skills, you can aim for roles like Digital Marketer, SEO Specialist, Social Media Manager, Content Strategist, or Marketing Analyst."
//                 description="Master modern strategies with a high-end Digital Marketing Course.
// "
//                 index={0}
//                 category=""
//                 software={["Photoshop", "Illustrator", "Corel Draw", "Maya", "After Effects", "Blender"]}
//             />
//         </div>
//     );
// }

// export default Page;