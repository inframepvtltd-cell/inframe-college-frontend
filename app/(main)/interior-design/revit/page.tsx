import ComboPack from "../../../../components/courseDetails/ComboPack";
import CourseHero from "../../../../components/courseDetails/courseDetails";
import CourseFeatures from "../../../../components/courseDetails/courseFeature";
import CustomizeCourse from "../../../../components/courseDetails/CustomizePack";
import WhyChooseUs from "../../../../components/courseDetails/WhyChooseUs";
import DreamsSection from "../../../../components/DreamSection";
import FAQSection from "../../../professional-online-courses/components/faq";

export const metadata = {
    title: "Revit Course: BIM Modeling & Design Essentials",
    description: "Learn Revit for Building Information Modeling (BIM). Master 3D architectural design, documentation, and collaboration tools used by professionals worldwide.",
};

function Page() {

    return (
        <div className="bg-white text-black mt-20">
            <CourseHero  noOfHours="12.5" noOfLessons="38"   courseMetaContent="Our Revit Course is designed to equip you with practical skills in Building Information Modeling (BIM) using Autodesk Revit. You’ll learn how to create detailed 3D architectural models, collaborate on complex projects, and improve your efficiency in design and construction workflows.

This course covers everything from the basics to advanced tools, helping you gain hands-on experience and confidence to work on real-world projects. Whether you’re a beginner or looking to upskill, this course will help you master Revit and boost your career prospects in architecture, engineering, and construction." courseName="Revit Course"  title="Interior  designing" price="1499" offerPrice="699" />

            <ComboPack />

            <CustomizeCourse courseTitle="Interior Design" />
            <CourseFeatures />

            < DreamsSection />

            <WhyChooseUs />

            <div className="my-12 sm:my-1 px-4 sm:px-0 lg:px-60">
                <FAQSection />
            </div>
        </div>
    );
}

export default Page;