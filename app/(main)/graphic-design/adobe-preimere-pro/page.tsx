import ComboPack from "../../../../components/courseDetails/ComboPack";
import CourseHero from "../../../../components/courseDetails/courseDetails";
import CourseFeatures from "../../../../components/courseDetails/courseFeature";
import CustomizeCourse from "../../../../components/courseDetails/CustomizePack";
import WhyChooseUs from "../../../../components/courseDetails/WhyChooseUs";
import DreamsSection from "../../../../components/DreamSection";
import FAQSection from "../../../professional-online-courses/components/faq";
import FAQComponent from "../../../professional-online-courses/components/FaqComponent";

export const metadata = {
    title: "Adobe Premiere Pro: Video Editing Masterclass",
    description: "Learn Adobe Premiere Pro to edit professional videos with ease. Master cutting, transitions, effects, and color grading for high-quality video production.",
};

function CourseContent() {

    return (
        <div className="bg-white text-black mt-20">
            <CourseHero  noOfHours="12.5" noOfLessons="150"   courseMetaContent=" The Adobe Premiere Pro Course trains students in professional video editing techniques using this industry-leading software. Covering everything from basic editing workflows to color correction, sound editing, and effects, students gain the ability to produce polished video content for films, commercials, and online platforms."  courseName="Adobe Preimere Pro Course"  title="Graphic Designing" offerPrice="699"price="1499" />

            <ComboPack />

            <CustomizeCourse
                courseTitle="Graphic Design"
            />

            <CourseFeatures />
            < DreamsSection />

            <WhyChooseUs />

            <div className="my-12 sm:my-1 px-4 sm:px-0 lg:px-60">
                <FAQComponent courseType="graphic" />
            </div>
        </div>
    );
}

export default CourseContent;