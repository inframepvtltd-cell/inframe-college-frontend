import ComboPack from "../../../../components/courseDetails/ComboPack";
import CourseHero from "../../../../components/courseDetails/courseDetails";
import CourseFeatures from "../../../../components/courseDetails/courseFeature";
import CustomizeCourse from "../../../../components/courseDetails/CustomizePack";
import WhyChooseUs from "../../../../components/courseDetails/WhyChooseUs";
import DreamsSection from "../../../../components/DreamSection";
import FAQSection from "../../../professional-online-courses/components/faq";

export const metadata = {
    title: "Adobe After Effects: Motion Graphics & VFX",
    description: "Master Adobe After Effects to create stunning motion graphics and visual effects. Learn animation, compositing, and video enhancement techniques for dynamic content.",
};

function CourseContent() {

    return (
        <div className="bg-white text-black mt-20">
            <CourseHero noOfHours="12.5" noOfLessons="21" courseMetaContent="This course focuses on motion graphics and visual effects using Adobe After Effects. Students learn how to create dynamic animations, motion titles, and cinematic visual effects. The program is tailored to prepare learners for roles in film production, video marketing, and multimedia storytelling." courseName="Adobe Aftereffect Course" title="Graphic Designing" price="1499" offerPrice="699" />

            <ComboPack />

            <CustomizeCourse
                courseTitle="Graphic Design"
            />

            <CourseFeatures />
            < DreamsSection />

            <WhyChooseUs />

            <div className="my-12 sm:my-1 px-4 sm:px-0 lg:px-60">
                <FAQSection />
            </div>
        </div>
    );
}

export default CourseContent;