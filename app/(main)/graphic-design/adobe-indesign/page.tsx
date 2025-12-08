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
            <CourseHero courseMetaContent="This course teaches InDesign the way it’s meant to be used — with precision, structure, and zero shortcuts. You’ll learn how to build professional layouts for magazines, brochures, portfolios, and digital publications without relying on guesswork or messy templates.

You’ll master the core tools: page grids, typography systems, styles, master pages, spacing logic, image placement, and print-ready export settings. Every lesson is project-focused, forcing you to design real layouts instead of passively watching tutorials.

If you want to handle layout design like a professional — not a hobbyist — this course gives you that skillset, provided you’re ready to put in the effort." courseName="Adobe Indesign" title="Graphic Designing" price="1499"  offerPrice="699"/>

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