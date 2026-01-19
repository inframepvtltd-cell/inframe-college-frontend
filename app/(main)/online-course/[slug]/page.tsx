import { cache } from "react";
import ComboPack from "../../../../components/courseDetails/ComboPack";
import CourseHero from "../../../../components/courseDetails/courseDetails";
import CourseFeatures from "../../../../components/courseDetails/courseFeature";
import CustomizeCourse from "../../../../components/courseDetails/CustomizePack";
import WhyChooseUs from "../../../../components/courseDetails/WhyChooseUs";
import DreamsSection from "../../../../components/DreamSection";
import FAQComponent from "../../../professional-online-courses/components/FaqComponent";
import { fetchCourseBySlug } from "../api/api";


const getCourse = cache(async (slug: string) => {
    const res = await fetchCourseBySlug(slug);
    console.log(res);

    return res
});

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

export default async function CourseContent({ params }: any) {

    const { slug } = await params;
    const course = await getCourse(slug);

    if (!course) {
        return <div className="mt-20 text-center">Not Found</div>;
    }

    const category = getCategoryFromSlug(course.data.course_slug);

    return (
        <div className="bg-white text-black mt-20">
            {/* <CourseHero noOfHours="12.5" noOfLessons="21" courseMetaContent={course.data.overview, course.data.description} category={category}
                courseName={course.data.course_name} title={course.data.parent_course_name} price={String(Math.round(course.data.price * 2.2))} offerPrice={String(Math.floor(Number(course.data.price)))} /> */}
            <CourseHero
                noOfHours="12.5"
                noOfLessons="21"
                courseMetaContent={{
                    overview: course.data.overview,
                    description: course.data.description,
                }}
                courseName={course.data.course_name}
                title={course.data.parent_course_name}
                price={String(Math.round(course.data.price * 2.2))}
                offerPrice={String(Math.floor(Number(course.data.price)))}
            />

            <ComboPack />
            <CustomizeCourse
                courseTitle={course.data.parent_course_name} />
            <CourseFeatures />
            <DreamsSection />

            <WhyChooseUs />

            <div className="my-12 sm:my-1 px-4 sm:px-0 lg:px-60">
                <FAQComponent courseType={course.data.parent_course_name} />
            </div>
        </div>
    );
}
