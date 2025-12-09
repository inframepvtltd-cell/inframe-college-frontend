
import ComboPack from "../../../../components/courseDetails/ComboPack";
import CourseHero from "../../../../components/courseDetails/courseDetails";
import CourseFeatures from "../../../../components/courseDetails/courseFeature";
import CustomizeCourse from "../../../../components/courseDetails/CustomizePack";
import WhyChooseUs from "../../../../components/courseDetails/WhyChooseUs";
import PageClient from "../../../../components/demometa";
import DreamsSection from "../../../../components/DreamSection";
import FAQSection from "../../../professional-online-courses/components/faq";

export const metadata = {
    title: "Photoshop Course: Real Editing & Creative Skills",
    description: "Master practical Photoshop—retouching, composites, effects, and design workflows—so you can produce clean, professional visuals without relying on cheap presets.",
};

function CourseContent() {
    return (
        <div className="bg-white text-black mt-20">
            <CourseHero  noOfHours="12.5" noOfLessons="26"   courseMetaContent="Get hands-on expertise in Adobe Photoshop for photo editing, compositing, retouching, and digital art creation. Learn advanced techniques to transform images, create visual effects, and prepare assets for marketing and media."  courseName="Photoshop Course"   title="Fashion designing" price="1999" offerPrice="899" />
            <ComboPack />
            <CustomizeCourse
                courseTitle="Fashion Design" />
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