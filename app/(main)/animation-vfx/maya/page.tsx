
import ComboPack from "../../../../components/courseDetails/ComboPack";
import CourseHero from "../../../../components/courseDetails/courseDetails";
import CourseFeatures from "../../../../components/courseDetails/courseFeature";
import CustomizeCourse from "../../../../components/courseDetails/CustomizePack";
import WhyChooseUs from "../../../../components/courseDetails/WhyChooseUs";
import PageClient from "../../../../components/demometa";
import DreamsSection from "../../../../components/DreamSection";
import FAQSection from "../../../professional-online-courses/components/faq";

export const metadata = {
    title: "Maya Course: Pro-Level 3D Modeling & Animation",
    description: "Learn Maya with a focus on real production skills—modeling, texturing, rigging, and animation—so you can create clean, studio-ready 3D work without guesswork.",
};

function CourseContent() {
    return (
        <div className="bg-white text-black mt-20">
            <CourseHero  noOfHours="12.5" noOfLessons="42"   courseMetaContent="Master industry-standard 3D modeling, animation, and rendering techniques with Autodesk Maya. This course covers character rigging, texturing, and visual effects, preparing you for professional work in film, games, and animation studios." courseName="Maya Course"   title="Animation and VFX" price="2499" offerPrice="1499" />
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