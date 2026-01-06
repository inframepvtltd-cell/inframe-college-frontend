import ComboPack from "../../../../components/courseDetails/ComboPack";
import CourseHero from "../../../../components/courseDetails/courseDetails";
import CourseFeatures from "../../../../components/courseDetails/courseFeature";
import CustomizeCourse from "../../../../components/courseDetails/CustomizePack";
import WhyChooseUs from "../../../../components/courseDetails/WhyChooseUs";
import DreamsSection from "../../../../components/DreamSection";
import FAQSection from "../../../professional-online-courses/components/faq";
import FAQComponent from "../../../professional-online-courses/components/FaqComponent";

export const metadata = {
    title: "Sketch Course: Fast & Clean UI Design Techniques",
    description: "Learn Sketch essentials—symbols, artboards, and prototyping—to design intuitive, scalable user interfaces that are ready for real-world apps and websites.",
};

function CourseContent() {

    return (
        <div className="bg-white text-black mt-20">
            <CourseHero  noOfHours="12.5" noOfLessons="150"   offerPrice="699" price="1499" courseMetaContent="Learn Sketch, the industry-standard tool for UI/UX design, wireframing, and prototyping. This course emphasizes user-centered design principles and practical skills to create sleek, interactive digital interfaces." title="Fine Arts"  courseName="Sketch Course"  />

            <ComboPack />

            <CustomizeCourse
                courseTitle="Fine Arts"
            />

            <CourseFeatures />
            < DreamsSection />

            <WhyChooseUs />

            <div className="my-12 sm:my-1 px-4 sm:px-0 lg:px-60">
                <FAQComponent courseType="finearts" />
            </div>
        </div>
    );
}

export default CourseContent;