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
            <CourseHero courseMetaContent="This AutoCAD 2D & 3D Course gives you the skills to create precise technical drawings and solid 3D models used in real architectural and interior projects.
You learn drafting tools, layers, dimensioning, annotations, layouts, and complete 3D workflows without any unnecessary theory.
The course trains you to work exactly the way studios expect—clean drawings, accurate models, and professional presentation files." courseName="AutoCad 2D and 3D"  title="Interior designing" price="1499" offerPrice="699" />

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