import ComboPack from "../../../../components/courseDetails/ComboPack";
import CourseHero from "../../../../components/courseDetails/courseDetails";
import CourseFeatures from "../../../../components/courseDetails/courseFeature";
import CustomizeCourse from "../../../../components/courseDetails/CustomizePack";
import WhyChooseUs from "../../../../components/courseDetails/WhyChooseUs";
import DreamsSection from "../../../../components/DreamSection";
import FAQSection from "../../../professional-online-courses/components/faq";
import FAQComponent from "../../../professional-online-courses/components/FaqComponent";

export const metadata = {
    title: "Blender Course: 3D Modeling & Animation Skills",
    description: "Master Blender to create 3D models, animations, and visual effects. Learn powerful tools for sculpting, rendering, and game design in one complete course.",
};

function CourseContent() {

    return (
        <div className="bg-white text-black mt-20">
            <CourseHero courseName="Blender Course" courseMetaContent="This course covers Blender, the powerful open-source 3D creation suite. Students learn modeling, sculpting, animation, texturing, and rendering workflows. The course aims to provide a complete foundation for creating professional 3D art and animations for various industries, including gaming, film, and digital media." title="Graphic Designing" price="1499" offerPrice="699"  noOfHours="12.5" noOfLessons="44"  />

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