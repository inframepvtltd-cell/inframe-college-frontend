import { cache } from "react";
import { fetchCourseBySlug } from "../api/api";
import DigitalMarketingComponent from "../../../../components/cityComponents/digitalMarketingComponent";
import AnimationVFXComponent from "../../../../components/cityComponents/AnimationVFXComponent";
import InteriorDesignComponent from "../../../../components/cityComponents/InteriorDesignComponent";
import GraphicDesignComponent from "../../../../components/cityComponents/GraphicDesignComponent";
import FashionDesignComponent from "../../../../components/cityComponents/fashionDesignComponent";
import JewelleryDesignComponent from "../../../../components/cityComponents/JewelleryDesignComponent";
import UIUXDesignComponent from "../../../../components/cityComponents/uiuxDesignComponent";

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
    const parts = slug.split("-course-");
    return parts[0].split("-")[0];
}

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
                description={course.data.meta_keywords}
                index={0}
                category={category}
                software={course.data.software || ["Photoshop", "Illustrator"]}
            />
        </div>
    );
}
