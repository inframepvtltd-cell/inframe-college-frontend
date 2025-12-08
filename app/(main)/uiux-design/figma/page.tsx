import ComboPack from "../../../../components/courseDetails/ComboPack";
import CourseHero from "../../../../components/courseDetails/courseDetails";
import CourseFeatures from "../../../../components/courseDetails/courseFeature";
import CustomizeCourse from "../../../../components/courseDetails/CustomizePack";

import WhyChooseUs from "../../../../components/courseDetails/WhyChooseUs";

import DreamsSection from "../../../../components/DreamSection";
import FAQSection from "../../../professional-online-courses/components/faq";

export const metadata = {
  title: "AutoCad Course | Inframe School",
  description: "Learn user experience and interface design with real projects.",
};

function CourseContent() {


  return (
    <div className="bg-white text-black mt-20">
      <CourseHero  offerPrice="699"  courseMetaContent="The Figma Course introduces learners to collaborative interface design using this cloud-based tool. Students master designing user interfaces, creating interactive prototypes, and working in teams remotely, making it essential for modern UX/UI projects."  courseName="Figma"  title="UIUX designing" price="1499" />
    

      <ComboPack />
    

      <CustomizeCourse
        courseTitle="UIUX design"
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