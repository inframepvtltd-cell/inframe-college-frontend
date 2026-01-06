
import ComboPack from "../../../../components/courseDetails/ComboPack";
import CourseHero from "../../../../components/courseDetails/courseDetails";
import CourseFeatures from "../../../../components/courseDetails/courseFeature";
import CustomizeCourse from "../../../../components/courseDetails/CustomizePack";
import WhyChooseUs from "../../../../components/courseDetails/WhyChooseUs";
import DreamsSection from "../../../../components/DreamSection";
import FAQSection from "../../../professional-online-courses/components/faq";
import FAQComponent from "../../../professional-online-courses/components/FaqComponent";

export const metadata = {
    title: "Adobe After Effects Course: Master Motion Graphics",
    description: "Learn keyframe animation, visual effects, and compositing in Adobe After Effects to create professional motion graphics and stunning video effects efficiently.",
};

function CourseContent() {
    return (
        <div className="bg-white text-black mt-20">
            <CourseHero  noOfHours="12.5" noOfLessons="21"   courseMetaContent="Dive into motion graphics and visual effects with Adobe After Effects. This course covers keyframing, compositing, 3D effects, and animation to help you produce cinematic effects and dynamic motion design."          courseName="Adobe AfterEffect Course"   title="Animation and VFX" price="2499" offerPrice="1499" />
            <ComboPack />
            <CustomizeCourse
                courseTitle="Animation and VFX" />
            <CourseFeatures />
            <DreamsSection />

            <WhyChooseUs />

            <div className="my-12 sm:my-1 px-4 sm:px-0 lg:px-60">
                <FAQComponent courseType="animation" />
            </div>
        </div>
    );
}

export default CourseContent;