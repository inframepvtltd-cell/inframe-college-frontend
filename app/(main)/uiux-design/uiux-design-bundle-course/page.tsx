import ComboPack from "../../../../components/courseDetails/ComboPack";
import CourseHero from "../../../../components/courseDetails/courseDetails";
import CourseFeatures from "../../../../components/courseDetails/courseFeature";
import CustomizeCourse from "../../../../components/courseDetails/CustomizePack";
import Customizecourse from "../../../../components/courseDetails/CustomizePack";
import WhyChooseUs from "../../../../components/courseDetails/WhyChooseUs";
import PageClient from "../../../../components/demometa";
import DreamsSection from "../../../../components/DreamSection";
import FAQSection from "../../../professional-online-courses/components/faq";

export const metadata = {
  title: "AutoCad Course | Inframe School",
  description: "Learn user experience and interface design with real projects.",
};

function CourseContent() {



  return (
    <div className="bg-white text-black mt-20">
      <CourseHero offerPrice="1499" courseMetaContent="This UI/UX Design Bundle Course gives you the complete skillset to design modern, functional digital interfaces. You start with Adobe Illustrator and Photoshop to create icons, UI graphics, and clean visual assets. InDesign helps you build neat documentation and case-study layouts.

Then you move into real product-design tools: Adobe XD for wireframes and interactive prototypes, Figma for interface design and team collaboration, and Sketch for Mac-based UI workflows.

You finish with the ability to plan user flows, design polished screens, create components, and build interactive prototypes that look good and work smoothly — exactly what product teams expect from a UI/UX designer." courseName="UiUX design bundle" title="UIUX designing" price="8994" />
      {/* <div className="w-44 mb-10 h-1 bg-gray-500 mx-auto rounded-full"></div> */}

      <ComboPack />
      {/* <div className="w-44 mb-10 h-1 bg-gray-500 mx-auto rounded-full"></div> */}

      <CustomizeCourse
        courseTitle="UIUX Design"
      // availableSoftware={graphicDesignSoftware}
      />         {/* <div className="w-44 mb-10 h-1 bg-gray-500 mx-auto rounded-full"></div> */}
      <CourseFeatures />
      {/* <div className="w-44 mb-10 h-1 bg-gray-500 mx-auto rounded-full"></div> */}
      {/* < DreamsSection /> */}

      < DreamsSection />

      <WhyChooseUs />

      <div className="my-12 sm:my-1 px-4 sm:px-0 lg:px-60">
        <FAQSection />
      </div>
    </div>
  );
}

export default CourseContent;