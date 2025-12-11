
import ComboPack from "../../../../components/courseDetails/ComboPack";
import CourseHero from "../../../../components/courseDetails/courseDetails";
import CourseFeatures from "../../../../components/courseDetails/courseFeature";
import CustomizeCourse from "../../../../components/courseDetails/CustomizePack";
import WhyChooseUs from "../../../../components/courseDetails/WhyChooseUs";
import DreamsSection from "../../../../components/DreamSection";
import FAQSection from "../../../professional-online-courses/components/faq";
import FAQComponent from "../../../professional-online-courses/components/FaqComponent";

export const metadata = {
    title: "Fashion Design Bundle: Corel, Illustrator & Photoshop",
    description: "Learn fashion design using CorelDRAW, Adobe Illustrator, and Photoshop in one complete bundle. Create stunning fashion illustrations and graphics with expert tools.",
};

function CourseContent() {
    return (
        <div className="bg-white text-black mt-20">
            <CourseHero  noOfHours="12.5" noOfLessons="150"    courseName="Fashion Design Bundle Course" courseMetaContent="
This Fashion Design Bundle Course trains you in the essential digital tools used in modern fashion studios. You begin with CorelDRAW to create flat sketches, garment outlines, measurement sheets, and production-ready templates. Then you move into Adobe Illustrator, where you design vector illustrations, technical flats, trims, and clean line sheets used for professional fashion presentations.

You also learn Adobe Photoshop to create fabric textures, pattern repeats, print designs, and color variations. Photoshop also helps you edit images and build polished lookbooks and concept sheets.

By the end of this course, you can sketch, illustrate, edit, and prepare digital fashion designs that are ready for portfolios, clients, and production teams — giving you the core skills required in the fashion industry." title="Fashion designing" price="5997" offerPrice="1499"/>
            <ComboPack />
            <CustomizeCourse
                courseTitle="Fashion Design" />
            <CourseFeatures />
            <DreamsSection />

            <WhyChooseUs />

            <div className="my-12 sm:my-1 px-4 sm:px-0 lg:px-60">
                <FAQComponent courseType="fashion" />
            </div>
        </div>
    );
}

export default CourseContent;