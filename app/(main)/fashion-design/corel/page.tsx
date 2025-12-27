
import ComboPack from "../../../../components/courseDetails/ComboPack";
import CourseHero from "../../../../components/courseDetails/courseDetails";
import CourseFeatures from "../../../../components/courseDetails/courseFeature";
import CustomizeCourse from "../../../../components/courseDetails/CustomizePack";
import WhyChooseUs from "../../../../components/courseDetails/WhyChooseUs";
import DreamsSection from "../../../../components/DreamSection";
import FAQSection from "../../../professional-online-courses/components/faq";
import FAQComponent from "../../../professional-online-courses/components/FaqComponent";

export const metadata = {
    title: "CorelDRAW Course: Sharp Design Skills for Real Work",
    description: "Learn practical CorelDRAW tools—vector design, logos, layouts, and print-ready artwork—so you can produce clean, professional designs without wasting time on guesswork.",
};

function CourseContent() {
    return (
        <div className="bg-white text-black mt-20">
            <CourseHero courseMetaContent="Learn CorelDRAW from the ground up to create professional vector graphics, logos, layouts, and illustrations. This course covers essential tools, design principles, and project workflows to make you job-ready for branding and digital design."  courseName="Corel Draw Course"  title="Fashion Designing" price="1999" offerPrice="899"  noOfHours="12.5" noOfLessons="42"  />
            <ComboPack />
            <CustomizeCourse
                courseTitle="Fashion Design" />
            <CourseFeatures />
            <DreamsSection />

            <WhyChooseUs />

            <div className="my-12 sm:my-1 px-4 sm:px-0 lg:px-60">
                <FAQComponent courseType="fashion" />
            </div>
        </div>
    );
}

export default CourseContent;