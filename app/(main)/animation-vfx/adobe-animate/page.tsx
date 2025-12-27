
import ComboPack from "../../../../components/courseDetails/ComboPack";
import CourseHero from "../../../../components/courseDetails/courseDetails";
import CourseFeatures from "../../../../components/courseDetails/courseFeature";
import CustomizeCourse from "../../../../components/courseDetails/CustomizePack";
import WhyChooseUs from "../../../../components/courseDetails/WhyChooseUs";
import DreamsSection from "../../../../components/DreamSection";
import FAQSection from "../../../professional-online-courses/components/faq";
import FAQComponent from "../../../professional-online-courses/components/FaqComponent";

export const metadata = {
        title: "Adobe Animate Course: Create Smooth & Engaging Animation.",
    description: "Master Adobe Animate for web and multimedia—frame-by-frame, motion tweens, and interactive content—so you produce clean, professional animations that grab attention.",
};

function CourseContent() {
    return (
        <div className="bg-white text-black mt-20">
            <CourseHero  noOfHours="12.5" noOfLessons="150"   courseMetaContent="Create interactive animations and multimedia content using Adobe Animate. This course teaches you how to design vector animations, develop web banners, and build engaging HTML5 content with practical workflows." courseName="Adobe Animate Course"   title="Animation and VFX" price="2499" offerPrice="1499" />
            <ComboPack />
            <CustomizeCourse
                courseTitle="Animation and VFX" />
            <CourseFeatures />
            <DreamsSection />

            <WhyChooseUs />

            <div className="my-12 sm:my-1 px-4 sm:px-0 lg:px-60">
                <FAQComponent courseType="animation" />
            </div>
        </div>
    );
}

export default CourseContent;