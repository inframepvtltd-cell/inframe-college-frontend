import ComboPack from "../../../../components/courseDetails/ComboPack";
import CourseHero from "../../../../components/courseDetails/courseDetails";
import CourseFeatures from "../../../../components/courseDetails/courseFeature";
import CustomizeCourse from "../../../../components/courseDetails/CustomizePack";
import WhyChooseUs from "../../../../components/courseDetails/WhyChooseUs";
import DreamsSection from "../../../../components/DreamSection";
import FAQSection from "../../../professional-online-courses/components/faq";
import FAQComponent from "../../../professional-online-courses/components/FaqComponent";

export const metadata = {
    title: "CorelDRAW Course: Master Vector Graphics & Branding",
    description: "Get hands-on with CorelDRAW—vector drawing, logo creation, and layout design—to produce clean, professional graphics that meet real-world branding and print needs.",
};

function CourseContent() {

    return (
        <div className="bg-white text-black mt-20">
            <CourseHero  noOfHours="12.5" noOfLessons="42"   courseMetaContent="Develop advanced skills in CorelDRAW for vector graphics, layout design, and branding. This course is suited for graphic designers who want to produce impactful print and digital media projects efficiently."  courseName="Corel Draw Course"   offerPrice="699" price="1499"  title="Fine Arts"  />

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