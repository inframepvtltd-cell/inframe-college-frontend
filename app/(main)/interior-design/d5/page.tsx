import ComboPack from "../../../../components/courseDetails/ComboPack";
import CourseHero from "../../../../components/courseDetails/courseDetails";
import CourseFeatures from "../../../../components/courseDetails/courseFeature";
import CustomizeCourse from "../../../../components/courseDetails/CustomizePack";
import WhyChooseUs from "../../../../components/courseDetails/WhyChooseUs";
import DreamsSection from "../../../../components/DreamSection";
import FAQSection from "../../../professional-online-courses/components/faq";

export const metadata = {
    title: "D5 Render Course: Fast & Realistic Visualization",
    description: "Master D5 Render to create high-quality, real-time architectural visualizations. Learn lighting, materials, and rendering techniques for stunning presentations.",
};

function Page() {

    return (
        <div className="bg-white text-black mt-20">
            <CourseHero noOfHours="12.5" noOfLessons="150"   courseMetaContent="The D5 Course is tailored to teach you cutting-edge real-time rendering and visualization techniques using D5 Render. You’ll learn how to create stunning, photorealistic 3D visuals quickly and efficiently, perfect for architects, designers, and visualization artists.

From lighting and materials to animation and VR integration, this course covers all the essential tools to bring your designs to life. Whether you want to impress clients or enhance your portfolio, mastering D5 Render will give you a powerful edge in the visualization industry." courseName="D5 Course"  title="Interior designing" price="1499"  offerPrice="699"/>

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