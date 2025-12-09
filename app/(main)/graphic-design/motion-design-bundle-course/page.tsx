import ComboPack from "../../../../components/courseDetails/ComboPack";
import CourseHero from "../../../../components/courseDetails/courseDetails";
import CourseFeatures from "../../../../components/courseDetails/courseFeature";
import CustomizeCourse from "../../../../components/courseDetails/CustomizePack";
import WhyChooseUs from "../../../../components/courseDetails/WhyChooseUs";
import PageClient from "../../../../components/demometa";
import DreamsSection from "../../../../components/DreamSection";
import FAQSection from "../../../professional-online-courses/components/faq";

export const metadata = {
    title: "Graphic Design Bundle: Adobe & 3D Tools",
    description: "Learn Adobe Illustrator, InDesign, CorelDRAW, Photoshop, Premiere Pro, After Effects, Maya, and Blender in one complete graphic design course.",
};

function CourseContent() {

    return (
        <div className="bg-white text-black mt-20">
            <CourseHero noOfHours="12.5" noOfLessons="150" courseMetaContent=" This Motion Design Bundle Course covers essential tools and techniques to master dynamic visual storytelling. You’ll learn Adobe Illustrator, InDesign, Corel Draw, and Photoshop for graphic creation, then dive into Adobe Premiere Pro and After Effects for powerful video editing and animation. Advanced 3D skills with Maya and Blender complete your skill set, preparing you to create stunning motion graphics and animations from start to finish." courseName="Motion Design Bundle Course"  title="Graphic Designing Course" offerPrice="699" price="11992" />

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