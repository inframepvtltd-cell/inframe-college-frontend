import ComboPack from "../../../../components/courseDetails/ComboPack";
import CourseHero from "../../../../components/courseDetails/courseDetails";
import CourseFeatures from "../../../../components/courseDetails/courseFeature";
import CustomizeCourse from "../../../../components/courseDetails/CustomizePack";
import WhyChooseUs from "../../../../components/courseDetails/WhyChooseUs";
import PageClient from "../../../../components/demometa";
import DreamsSection from "../../../../components/DreamSection";
import FAQSection from "../../../professional-online-courses/components/faq";

export const metadata = {
    title: "Adobe Photoshop Image Editing Essentials",
    description: "Learn pro-level photo editing, retouching, and compositing. Master layers, masks, color correction, and design tools through practical, real-project lessons.",
};

function CourseContent() {

    return (
        <div className="bg-white text-black mt-20">
            <CourseHero  noOfHours="12.5" noOfLessons="26"   courseMetaContent="
This course teaches you Photoshop the way professionals actually use it — editing images with precision, creating clean composites, retouching correctly, and building graphics that look polished instead of amateur.

You’ll learn the essentials: layers, masks, selection tools, retouching methods, color correction, smart objects, text design, and export workflows. Every lesson is practical and project-driven, so you build real skill instead of memorizing buttons.

If you want Photoshop skills that hold up in real client work, this course gives you exactly that — assuming you’re ready to practice and apply what you learn."offerPrice="699" courseName="Adobe Photoshop Course"  title="Graphic Designing" price="1499" />

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