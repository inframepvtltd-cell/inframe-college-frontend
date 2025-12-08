import ComboPack from "../../../../components/courseDetails/ComboPack";
import CourseHero from "../../../../components/courseDetails/courseDetails";
import CourseFeatures from "../../../../components/courseDetails/courseFeature";
import CustomizeCourse from "../../../../components/courseDetails/CustomizePack";
import WhyChooseUs from "../../../../components/courseDetails/WhyChooseUs";
import DreamsSection from "../../../../components/DreamSection";
import FAQSection from "../../../professional-online-courses/components/faq";

export const metadata = {
    title: "Revit Course | Inframe School",
    description: "Learn user experience and interface design with real projects.",
};

function Page() {

    return (
        <div className="bg-white text-black mt-20">
            <CourseHero courseMetaContent="This SketchUp Course teaches you how to create clean and accurate 3D models for interiors and architecture.
You learn essential tools, components, materials, scenes, and layout basics so you can build models quickly without confusion.
The course trains you to work with a studio-level workflow—organized files, efficient modeling, and presentation-ready outputs." courseName="Sketchup"  title="Interior designing"  offerPrice="699" price="1499" />

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