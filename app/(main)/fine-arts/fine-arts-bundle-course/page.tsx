import ComboPack from "../../../../components/courseDetails/ComboPack";
import CourseHero from "../../../../components/courseDetails/courseDetails";
import CourseFeatures from "../../../../components/courseDetails/courseFeature";
import CustomizeCourse from "../../../../components/courseDetails/CustomizePack";
import WhyChooseUs from "../../../../components/courseDetails/WhyChooseUs";
import DreamsSection from "../../../../components/DreamSection";
import FAQSection from "../../../professional-online-courses/components/faq";

export const metadata = {
    title: "Sketchup Course | Inframe School",
    description: "Learn user experience and interface design with real projects.",
};

function CourseContent() {

    return (
        <div className="bg-white text-black mt-20">
            <CourseHero courseName="Fine Arts bundle course" courseMetaContent="This Fine Arts Bundle Course is built to actually make you skilled, not just “familiar” with drawing apps. You’ll learn how to create professional-level artwork using Procreate, Adobe Illustrator, CorelDRAW, and traditional sketching techniques.

Instead of spoon-feeding theory, the course pushes you to practice real projects—digital illustrations, vector art, branding sketches, and hand-drawn concepts—so you build a portfolio that can actually get you work.

You’ll understand how each tool works in the real world: Procreate for digital painting, Illustrator for clean vector design, CorelDRAW for layout and graphics, and sketching to sharpen your core creative fundamentals. The goal is simple—turn you into someone who can draw, design, and present ideas with confidence." title="Fine Arts" offerPrice="1499" price="699" />

            <ComboPack />

            <CustomizeCourse
                courseTitle="Fine Arts"
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