import ComboPack from "../../../../components/courseDetails/ComboPack";
import CourseHero from "../../../../components/courseDetails/courseDetails";
import CourseFeatures from "../../../../components/courseDetails/courseFeature";
import CustomizeCourse from "../../../../components/courseDetails/CustomizePack";
import WhyChooseUs from "../../../../components/courseDetails/WhyChooseUs";
import DreamsSection from "../../../../components/DreamSection";
import FAQSection from "../../../professional-online-courses/components/faq";
import FAQComponent from "../../../professional-online-courses/components/FaqComponent";

export const metadata = {
    title: "Master Graphic Design: Illustrator, InDesign & More",
    description: "Learn Adobe Illustrator, InDesign, CorelDRAW, and Photoshop with hands-on projects to build real-world graphic design skills from basics to advanced.",
};

function CourseContent() {

    return (
        <div className="bg-white text-black mt-20">
            <CourseHero noOfHours="12.5" noOfLessons="150"   courseMetaContent="This Graphic Design Bundle Course is designed to equip you with practical skills in industry-standard software — Adobe Illustrator, Adobe InDesign, CorelDRAW, and Adobe Photoshop. You’ll learn how to create stunning visuals, layouts, and graphics that meet professional design standards.

Whether you’re starting from scratch or want to sharpen your existing skills, this course offers hands-on projects and real-world applications to help you master each tool efficiently. By the end, you’ll have the confidence and competence to produce compelling designs for print, digital media, branding, and more." courseName="Graphic Design Bundle Course" title="Graphic Designing" price="5996"  offerPrice="1499"/>

            <ComboPack />

            <CustomizeCourse
                courseTitle="Graphic Design"
            />

            <CourseFeatures />
            < DreamsSection />

            <WhyChooseUs />

            <div className="my-12 sm:my-1 px-4 sm:px-0 lg:px-60">
                <FAQComponent courseType="graphic" />
            </div>
        </div>
    );
}

export default CourseContent;