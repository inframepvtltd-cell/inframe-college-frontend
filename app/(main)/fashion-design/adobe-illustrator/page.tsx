
import ComboPack from "../../../../components/courseDetails/ComboPack";
import CourseHero from "../../../../components/courseDetails/courseDetails";
import CourseFeatures from "../../../../components/courseDetails/courseFeature";
import CustomizeCourse from "../../../../components/courseDetails/CustomizePack";
import WhyChooseUs from "../../../../components/courseDetails/WhyChooseUs";
import DreamsSection from "../../../../components/DreamSection";
import FAQSection from "../../../professional-online-courses/components/faq";
import FAQComponent from "../../../professional-online-courses/components/FaqComponent";

export const metadata = {
    title: "Adobe Illustrator Course: Real Vector Design Skills",
    description: "Learn Illustrator the right way—shapes, paths, typography, branding, and clean vector workflows—so you can create professional designs that actually stand out.",
};

function CourseContent() {
    return (
        <div className="bg-white text-black mt-20">
            <CourseHero  noOfHours="12.5" noOfLessons="26"   courseMetaContent="Master Adobe Illustrator for precision vector art, icon design, typography, and complex illustrations. This course equips you with skills to deliver clean, scalable graphics for print, web, and multimedia projects." courseName="Adobe Illustrator Course"   title="Fashion designing" price="1999" offerPrice="899" />
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