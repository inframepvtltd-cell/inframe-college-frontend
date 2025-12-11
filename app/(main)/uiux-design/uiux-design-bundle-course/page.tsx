import ComboPack from "../../../../components/courseDetails/ComboPack";
import CourseHero from "../../../../components/courseDetails/courseDetails";
import CourseFeatures from "../../../../components/courseDetails/courseFeature";
import CustomizeCourse from "../../../../components/courseDetails/CustomizePack";
import WhyChooseUs from "../../../../components/courseDetails/WhyChooseUs";
import DreamsSection from "../../../../components/DreamSection";
import FAQSection from "../../../professional-online-courses/components/faq";
import FAQComponent from "../../../professional-online-courses/components/FaqComponent";

export const metadata = {
  title: "UI/UX Design Bundle: Adobe & Figma Tools",
  description: "Learn UI/UX design using Adobe Illustrator, Photoshop, InDesign, XD, Figma, and Sketch in one easy-to-follow bundle. Perfect for creating modern digital designs.",
};

function CourseContent() {
  return (
    <div className="bg-white text-black mt-20">
      <CourseHero noOfHours="12.5" noOfLessons="150" offerPrice="1499" courseMetaContent="This UI/UX Design Bundle Course gives you the complete skillset to design modern, functional digital interfaces. You start with Adobe Illustrator and Photoshop to create icons, UI graphics, and clean visual assets. InDesign helps you build neat documentation and case-study layouts.

      Then you move into real product-design tools: Adobe XD for wireframes and interactive prototypes, Figma for interface design and team collaboration, and Sketch for Mac-based UI workflows.

      You finish with the ability to plan user flows, design polished screens, create components, and build interactive prototypes that look good and work smoothly — exactly what product teams expect from a UI/UX designer." courseName="UiUX Design Bundle Course" title="UIUX designing" price="8994" />

      <ComboPack />

      <CustomizeCourse courseTitle="UIUX Design" />

      <CourseFeatures />

      < DreamsSection />

      <WhyChooseUs />

      <div className="my-12 sm:my-1 px-4 sm:px-0 lg:px-60">
        <FAQComponent courseType="uiux" />      </div>
    </div>
  );
}

export default CourseContent;