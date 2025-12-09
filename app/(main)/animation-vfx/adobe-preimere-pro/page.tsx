
import ComboPack from "../../../../components/courseDetails/ComboPack";
import CourseHero from "../../../../components/courseDetails/courseDetails";
import CourseFeatures from "../../../../components/courseDetails/courseFeature";
import CustomizeCourse from "../../../../components/courseDetails/CustomizePack";
import WhyChooseUs from "../../../../components/courseDetails/WhyChooseUs";
import PageClient from "../../../../components/demometa";
import DreamsSection from "../../../../components/DreamSection";
import FAQSection from "../../../professional-online-courses/components/faq";

export const metadata = {
    title: "Adobe Premiere Pro Course: Edit Like a Pro Fast",
    description: "Learn practical video editing with Adobe Premiere Pro—cutting, transitions, color grading, and export workflows—to create polished videos that stand out professionally.",
};

function CourseContent() {
    return (
        <div className="bg-white text-black mt-20">
            <CourseHero  noOfHours="12.5" noOfLessons="150"   courseMetaContent="Gain expertise in video editing and post-production with Adobe Premiere Pro. Learn timeline editing, color grading, audio mixing, and exporting to produce professional-quality videos for all platforms." offerPrice="1499" courseName="Adobe Preimere Pro Course"  title="Animation and VFX" price="2499" />
            <ComboPack />
            <CustomizeCourse
                courseTitle="Animation and VFX" />
            <CourseFeatures />
            <DreamsSection />

            <WhyChooseUs />

            <div className="my-12 sm:my-1 px-4 sm:px-0 lg:px-60">
                <FAQSection />
            </div>
        </div>
    );
}

export default CourseContent;