import ComboPack from "../../../../components/courseDetails/ComboPack";
import CourseHero from "../../../../components/courseDetails/courseDetails";
import CourseFeatures from "../../../../components/courseDetails/courseFeature";
import CustomizeCourse from "../../../../components/courseDetails/CustomizePack";
import WhyChooseUs from "../../../../components/courseDetails/WhyChooseUs";
import DreamsSection from "../../../../components/DreamSection";
import FAQSection from "../../../professional-online-courses/components/faq";
import FAQComponent from "../../../professional-online-courses/components/FaqComponent";

export const metadata = {
    title: "SketchUp Course: 3D Modeling Made Simple",
    description: "Master SketchUp for fast and accurate 3D modeling. Learn essential tools to design architectural, interior, and product models with ease and precision.",
};

function Page() {

    return (
        <div className="bg-white text-black mt-20">
            <CourseHero noOfHours="12.5" noOfLessons="26"   courseMetaContent="This SketchUp Course teaches you how to create clean and accurate 3D models for interiors and architecture.
You learn essential tools, components, materials, scenes, and layout basics so you can build models quickly without confusion.
The course trains you to work with a studio-level workflow—organized files, efficient modeling, and presentation-ready outputs." courseName="Sketchup Course"  title="Interior designing"  offerPrice="699" price="1499" />

            <ComboPack />

            <CustomizeCourse courseTitle="Interior Design" />
            <CourseFeatures />

            < DreamsSection />

            <WhyChooseUs />

            <div className="my-12 sm:my-1 px-4 sm:px-0 lg:px-60">
                <FAQComponent courseType="interior" />
            </div>
        </div>
    );
}

export default Page;