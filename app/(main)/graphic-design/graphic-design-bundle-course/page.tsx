import ComboPack from "../../../../components/courseDetails/ComboPack";
import CourseHero from "../../../../components/courseDetails/courseDetails";
import CourseFeatures from "../../../../components/courseDetails/courseFeature";
import CustomizeCourse from "../../../../components/courseDetails/CustomizePack";
import WhyChooseUs from "../../../../components/courseDetails/WhyChooseUs";
import PageClient from "../../../../components/demometa";
import DreamsSection from "../../../../components/DreamSection";
import FAQSection from "../../../professional-online-courses/components/faq";

export const metadata = {
    title: "Sketchup Course | Inframe School",
    description: "Learn user experience and interface design with real projects.",
};

function CourseContent() {

    return (
        <div className="bg-white text-black mt-20">
            <CourseHero courseMetaContent="This Graphic Design Bundle Course is designed to equip you with practical skills in industry-standard software — Adobe Illustrator, Adobe InDesign, CorelDRAW, and Adobe Photoshop. You’ll learn how to create stunning visuals, layouts, and graphics that meet professional design standards.

Whether you’re starting from scratch or want to sharpen your existing skills, this course offers hands-on projects and real-world applications to help you master each tool efficiently. By the end, you’ll have the confidence and competence to produce compelling designs for print, digital media, branding, and more." courseName="Graphic design bundle course" title="Graphic Designing" price="5996"  offerPrice="1499"/>

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