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
            <CourseHero courseMetaContent="This Photoshop Course is designed to equip you with practical, industry-relevant skills to master image editing, retouching, and graphic design. You’ll learn how to use Photoshop tools effectively to create professional-grade visuals for digital and print media. The course covers everything from basic photo corrections to advanced techniques like masking, layers, and compositing. Whether you’re starting from scratch or looking to sharpen your existing skills, this course prepares you to work confidently on real projects and build a strong creative portfolio." courseName="Photoshop"  title="Interior designing" price="1499" offerPrice="699" />

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