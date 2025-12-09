import ComboPack from "../../../../components/courseDetails/ComboPack";
import CourseHero from "../../../../components/courseDetails/courseDetails";
import CourseFeatures from "../../../../components/courseDetails/courseFeature";
import CustomizeCourse from "../../../../components/courseDetails/CustomizePack";
import WhyChooseUs from "../../../../components/courseDetails/WhyChooseUs";
import PageClient from "../../../../components/demometa";
import DreamsSection from "../../../../components/DreamSection";
import FAQSection from "../../../professional-online-courses/components/faq";

export const metadata = {
    title: "Maya Course: 3D Modeling & Animation Basics",
    description: "Learn Autodesk Maya to create 3D models and animations. Master essential tools for character design, rigging, and visual effects in film and games.",
};

function CourseContent() {

    return (
        <div className="bg-white text-black mt-20">
            <CourseHero courseMetaContent="The Maya Course offers in-depth training in 3D modeling, animation, and rendering with Autodesk Maya. Students will develop skills in character rigging, texturing, lighting, and simulation, enabling them to create high-quality assets for films, games, and visual effects industries."  noOfHours="12.5" noOfLessons="42"  courseName="Maya Course"  title="Graphic Designing Course" offerPrice="699" price="1499" />

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