import ComboPack from "../../../../components/courseDetails/ComboPack";
import CourseHero from "../../../../components/courseDetails/courseDetails";
import CourseFeatures from "../../../../components/courseDetails/courseFeature";
import CustomizeCourse from "../../../../components/courseDetails/CustomizePack";
import WhyChooseUs from "../../../../components/courseDetails/WhyChooseUs";
import DreamsSection from "../../../../components/DreamSection";
import FAQSection from "../../../professional-online-courses/components/faq";
import FAQComponent from "../../../professional-online-courses/components/FaqComponent";

export const metadata = {
    title: "Lumion Course: Real-Time 3D Visualization",
    description: "Master Lumion to create fast, realistic architectural visualizations. Learn rendering, lighting, and animation techniques for stunning presentations.",
};

function Page() {

    return (
        <div className="bg-white text-black mt-20">
            <CourseHero  noOfHours="12.5" noOfLessons="20"    courseMetaContent="Our Lumion Course is built for people who want to master real-time 3D visualization fast. We focus on practical skills that let you create stunning architectural renders and animations without wasting time on useless theory. From importing your models to applying materials, lighting, and effects, this course breaks down everything you need to deliver jaw-dropping presentations that impress clients and stakeholders.

No shortcuts, no fluff—just solid training with Lumion’s powerful tools, so you can turn your designs into vivid, lifelike experiences. Access the course anytime and get the skills that set you apart in the competitive world of architectural visualization." courseName="Lumion Course" title="Interior designing" price="1499"  offerPrice="699"/>

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