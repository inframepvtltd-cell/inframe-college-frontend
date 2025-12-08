import ComboPack from "../../../../components/courseDetails/ComboPack";
import CourseHero from "../../../../components/courseDetails/courseDetails";
import CourseFeatures from "../../../../components/courseDetails/courseFeature";
import CustomizeCourse from "../../../../components/courseDetails/CustomizePack";
import WhyChooseUs from "../../../../components/courseDetails/WhyChooseUs";
import DreamsSection from "../../../../components/DreamSection";
import FAQSection from "../../../professional-online-courses/components/faq";

export const metadata = {
    title: "Sketchup Course | Inframe School",
    description: "Learn user experience and interface design with real projects.",
};

function CourseContent() {

    return (
        <div className="bg-white text-black mt-20">
            <CourseHero courseMetaContent="Unlock your digital drawing and painting potential with Procreate on iPad. This course focuses on brush techniques, layering, and creative workflows to develop professional-quality illustrations and concept art." offerPrice="699"  courseName="Fine Arts"   price="1499"  title="Fine Arts"  />

            <ComboPack />

            <CustomizeCourse
                courseTitle="Fine Arts"
            />

            <CourseFeatures />
            < DreamsSection />

            <WhyChooseUs />

            <div className="my-12 sm:my-1 px-4 sm:px-0 lg:px-60">
                <FAQSection />
            </div>
        </div>
    );
}

export default CourseContent;