
import ComboPack from "../../../../components/courseDetails/ComboPack";
import CourseHero from "../../../../components/courseDetails/courseDetails";
import CourseFeatures from "../../../../components/courseDetails/courseFeature";
import CustomizeCourse from "../../../../components/courseDetails/CustomizePack";
import WhyChooseUs from "../../../../components/courseDetails/WhyChooseUs";
import DreamsSection from "../../../../components/DreamSection";
import FAQSection from "../../../professional-online-courses/components/faq";
import FAQComponent from "../../../professional-online-courses/components/FaqComponent";

export const metadata = {
    title: "Blender Course: Master 3D Modeling & Animation Fast",
    description: "Get hands-on with Blender—modeling, sculpting, texturing, and animation—to build professional 3D assets and animations without wasting time on unnecessary features.",
};

function CourseContent() {
    return (
        <div className="bg-white text-black mt-20">
            <CourseHero  noOfHours="12.5" noOfLessons="44"   courseMetaContent="Learn Blender’s powerful open-source 3D creation suite from modeling and sculpting to animation and video editing. This course is hands-on and project-focused, ideal for aspiring artists and designers who want full creative control." courseName="Blender Course"   title="Animation and VFX" price="2499" offerPrice="1499" />
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