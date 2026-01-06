import ComboPack from "../../../../components/courseDetails/ComboPack";
import CourseHero from "../../../../components/courseDetails/courseDetails";
import CourseFeatures from "../../../../components/courseDetails/courseFeature";
import CustomizeCourse from "../../../../components/courseDetails/CustomizePack";
import WhyChooseUs from "../../../../components/courseDetails/WhyChooseUs";
import DreamsSection from "../../../../components/DreamSection";
import FAQSection from "../../../professional-online-courses/components/faq";
import FAQComponent from "../../../professional-online-courses/components/FaqComponent";

export const metadata = {
    title: "Photoshop Course: Expert Photo Editing & Design",
    description: "Learn Photoshop to master photo editing, graphic design, and digital art. Develop skills for retouching, compositing, and creating stunning visuals efficiently.",
};

function Page() {

    return (
        <div className="bg-white text-black mt-20">
            <CourseHero noOfHours="12.5" noOfLessons="26"   courseMetaContent="This Photoshop Course is designed to equip you with practical, industry-relevant skills to master image editing, retouching, and graphic design. You’ll learn how to use Photoshop tools effectively to create professional-grade visuals for digital and print media. The course covers everything from basic photo corrections to advanced techniques like masking, layers, and compositing. Whether you’re starting from scratch or looking to sharpen your existing skills, this course prepares you to work confidently on real projects and build a strong creative portfolio." courseName="Photoshop Course"  title="Interior designing" price="1499" offerPrice="699" />

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