import ComboPack from "../../../../components/courseDetails/ComboPack";
import CourseHero from "../../../../components/courseDetails/courseDetails";
import CourseFeatures from "../../../../components/courseDetails/courseFeature";
import CustomizeCourse from "../../../../components/courseDetails/CustomizePack";
import WhyChooseUs from "../../../../components/courseDetails/WhyChooseUs";
import PageClient from "../../../../components/demometa";
import DreamsSection from "../../../../components/DreamSection";
import FAQSection from "../../../professional-online-courses/components/faq";

export const metadata = {
    title: "CorelDRAW Vector & Layout Design Course",
    description: "Master CorelDRAW through hands-on projects. Learn vector design, logos, layouts, and print-ready exports with clear, practical lessons built for real-world work.",
};

function CourseContent() {

    return (
        <div className="bg-white text-black mt-20">
            <CourseHero noOfHours="12.5" noOfLessons="42"   courseMetaContent="This course teaches you CorelDRAW through practical, real design work. You’ll learn to create vector graphics, logos, layouts, and branding assets with clear, step-by-step lessons. No filler, no wasted time.

You’ll build skills in shapes, curves, typography, color control, tracing, and proper export settings — everything needed to produce professional-quality designs on your own.

If you want solid CorelDRAW skills that actually hold up in real projects, this course gives you exactly that — as long as you put in the effort."
                courseName="Corel Draw Course" title="Graphic Designing" price="1499" offerPrice="699" />

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