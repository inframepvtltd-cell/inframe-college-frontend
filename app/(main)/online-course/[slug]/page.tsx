import { cache } from "react";
import ComboPack from "../../../../components/courseDetails/ComboPack";
import CourseHero from "../../../../components/courseDetails/courseDetails";
import CourseFeatures from "../../../../components/courseDetails/courseFeature";
import CustomizeCourse from "../../../../components/courseDetails/CustomizePack";
import WhyChooseUs from "../../../../components/courseDetails/WhyChooseUs";
import DreamsSection from "../../../../components/DreamSection";
import FAQSection from "../../../professional-online-courses/components/faq";
import FAQComponent from "../../../professional-online-courses/components/FaqComponent";
import { fetchCourseBySlug } from "../api/api";


// cache = prevents double API calls
const getCourse = cache(async (slug: string) => {
    const res = await fetchCourseBySlug(slug);
    console.log(res);

    return res
});

// extract category keyword from slug
const getCategoryFromSlug = (slug: string) => {
    if (!slug) return "";
    const parts = slug.split("-course-");
    return parts[0].split("-")[0];
}

// SEO (SERVER ONLY)
export async function generateMetadata({ params }: any) {
    const { slug } = await params;
    console.log(slug);
    const course = await getCourse(slug);
    console.log(course);

    return {
        title: course?.data.meta_title || "Inframe School",
        description: course?.data.meta_description || "",
    };
}


// export const metadata = {
//     title: "Adobe After Effects Course: Master Motion Graphics",
//     description: "Learn keyframe animation, visual effects, and compositing in Adobe After Effects to create professional motion graphics and stunning video effects efficiently.",
// };

// function CourseContent() {
export default async function CourseContent({ params }: any) {

    // PAGE (SERVER ONLY)

    const { slug } = await params;
    const course = await getCourse(slug);

    if (!course) {
        return <div className="mt-20 text-center">Not Found</div>;
    }

    const category = getCategoryFromSlug(course.data.course_slug);

    return (
        <div className="bg-white text-black mt-20">
            <CourseHero noOfHours="12.5" noOfLessons="21" courseMetaContent={course.data.overview}
                courseName={course.data.course_name} title={course.data.parent_course_name} price={String(course.data.price * 2.2)} offerPrice={String(Math.floor(Number(course.data.price)))} />
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

// brochure_url
// :
// ""
// course_description
// :
// "interior-design-bundle-course"
// course_name
// :
// "Interior Design Bundle Course"
// course_slug
// :
// "interior-design-bundle-course"
// created_at
// :
// "2026-01-02T11:07:32.354Z"
// cta_description
// :
// ""
// cta_title
// :
// ""
// id
// :
// "11099491-d158-4d6f-a187-a5b85b49b2b0"
// isSingleSoftwareCourse
// :
// null
// isactive
// :
// true
// meta_description
// :
// "test test test"
// meta_keywords
// :
// "test test test"
// meta_title
// :
// "test test test"
// mode
// :
// "online"
// overview
// :
// "This Interior Design Bundle Course is built for one purpose — to make you genuinely skilled, not just “certified.” You learn every software that real interior design studios use so you can handle complete projects from concept to final presentation.\r\n\r\nYou start with AutoCAD (2D & 3D) to create clean technical drawings that match industry standards.\r\n\r\nThen you move into SketchUp for fast and accurate 3D modeling.\r\n\r\nNext, you learn 3ds Max + V-Ray, where you create high-quality, photo-realistic interiors that actually look professional.\r\n\r\nAfter that, you work with Lumion and D5 Render to produce smooth, realistic walkthroughs and animations — exactly what clients expect today.\r\n\r\nYou also learn Revit, the most in-demand BIM software used by top studios for precise architectural and interior documentation.\r\n\r\nFinally, Photoshop helps you polish renders, build mood boards, and create client-ready presentation sheets.\r\n\r\nThis bundle gives you the complete workflow: Draft → Model → Render → Animate → Present.\r\n\r\nEverything you need to work confidently in interior design, land clients, or start your own practice.."
// page_type
// :
// "singleSoftware_course"
// parent_course_id
// :
// "9a159ad9-a0e3-4a1d-a1d3-d473f1d1012e"
// parent_course_name
// :
// null
// parent_course_slug
// :
// null
// parent_id
// :
// null
// price
// :
// "1499.00"
// pricing
// :
// "paid"
// theme
// :
// "blue"
// thumbnail_url
// :
// "https://res.cloudinary.com/denc4i3lt/video/upload/v1767425049/inframe_college/zmb7xbba8awyu7ngb6hi.mp4"
// updated_at
// :
// "2026-01-03T07:25:29.796Z"