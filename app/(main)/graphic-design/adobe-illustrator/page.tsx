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
            <CourseHero courseMetaContent="This course cuts straight to the point. You’ll learn Illustrator the way professionals actually use it — creating clean vector graphics, logos, icons, and brand assets through hands-on, structured projects. No fluff, no pointless theory.

You’ll work through the essentials: shapes, paths, typography, color systems, gradients, brushes, and export workflows. Every lesson builds practical skill, so by the end you can produce client-ready designs with confidence instead of guessing your way through the software.

If you’re serious about learning Illustrator properly, this course gives you the skills — as long as you’re willing to practice and push yourself."  courseName="Adobe Illustrator"  title="Graphic Designing" price="1499" offerPrice="699" />
      

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