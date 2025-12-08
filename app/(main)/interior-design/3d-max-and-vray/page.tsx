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
            <CourseHero courseMetaContent="
Our 3ds Max + V-Ray course is designed to turn beginners into skilled 3D artists who can confidently create professional-quality 3D models and realistic visualizations. We cut the fluff and focus on industry-standard techniques and workflows used by top studios worldwide. Whether you're aiming for architectural visualization, game design, or product rendering, this course gives you practical skills with hands-on projects and clear instructions.

We don’t promise empty certifications — we deliver real skills that employers and clients demand. Learn modeling, texturing, lighting, and rendering with V-Ray at your own pace, backed by lifetime access and expert suppor" courseName="3D Max and Vray" title="Interior designing" price="1499" offerPrice="699"/>

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