import ComboPack from "../../../../components/courseDetails/ComboPack";
import CourseHero from "../../../../components/courseDetails/courseDetails";
import CourseFeatures from "../../../../components/courseDetails/courseFeature";
import CustomizeCourse from "../../../../components/courseDetails/CustomizePack";

import WhyChooseUs from "../../../../components/courseDetails/WhyChooseUs";

import DreamsSection from "../../../../components/DreamSection";
import FAQSection from "../../../professional-online-courses/components/faq";
import FAQComponent from "../../../professional-online-courses/components/FaqComponent";

export const metadata = {
  title: "Adobe InDesign: Professional Layout & Design",
  description: "Learn Adobe InDesign to create stunning layouts for magazines, brochures, and ebooks. Master typography, page design, and publishing tools efficiently.",
};

function CourseContent() {


  return (
    <div className="bg-white text-black mt-20">
      <CourseHero noOfHours="12.5" noOfLessons="34"    offerPrice="699" courseMetaContent="This course teaches Adobe InDesign for professional page layout and design. Students learn how to create compelling brochures, magazines, eBooks, and other print and digital publications with a focus on typography, master pages, and prepress preparation." courseName="Adobe Indesign Course" title="UIUX designing" price="1499" />


      <ComboPack />


      <CustomizeCourse
        courseTitle="UIUX design"
      />
      <CourseFeatures />


      < DreamsSection />

      <WhyChooseUs />

      <div className="my-12 sm:my-1 px-4 sm:px-0 lg:px-60">
  <FAQComponent courseType="uiux" />
        </div>
    </div>
  );
}

export default CourseContent;