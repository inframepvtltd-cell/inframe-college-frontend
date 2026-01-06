import ComboPack from "../../../../components/courseDetails/ComboPack";
import CourseHero from "../../../../components/courseDetails/courseDetails";
import CourseFeatures from "../../../../components/courseDetails/courseFeature";
import CustomizeCourse from "../../../../components/courseDetails/CustomizePack";

import WhyChooseUs from "../../../../components/courseDetails/WhyChooseUs";

import DreamsSection from "../../../../components/DreamSection";
import FAQSection from "../../../professional-online-courses/components/faq";
import FAQComponent from "../../../professional-online-courses/components/FaqComponent";

export const metadata = {
  title: "Adobe Illustrator Course: Precision Vector Design Skills",
  description: "Master Adobe Illustrator essentials—vector creation, typography, and branding—to produce sharp, scalable designs that meet professional standards without wasting time.",
};

function CourseContent() {


  return (
    <div className="bg-white text-black mt-20">
      <CourseHero  noOfHours="12.5" noOfLessons="21"   courseMetaContent="Learn vector-based design with Adobe Illustrator, focusing on logo creation, typography, and complex illustrations. This course prepares you for creating scalable graphics that work across print and digital platforms." courseName="Adobe Illustrator"   title="Jewellery designing Course" offerPrice="1499" price="2499"/>
    

      <ComboPack />
    

      <CustomizeCourse
        courseTitle="Jewellery Design"
      />       
      <CourseFeatures />


      < DreamsSection />

      <WhyChooseUs />

      <div className="my-12 sm:my-1 px-4 sm:px-0 lg:px-60">
        <FAQComponent courseType="jewellery" />
      </div>
    </div>
  );
}

export default CourseContent;