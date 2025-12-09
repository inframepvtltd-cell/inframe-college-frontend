import ComboPack from "../../../../components/courseDetails/ComboPack";
import CourseHero from "../../../../components/courseDetails/courseDetails";
import CourseFeatures from "../../../../components/courseDetails/courseFeature";
import CustomizeCourse from "../../../../components/courseDetails/CustomizePack";

import WhyChooseUs from "../../../../components/courseDetails/WhyChooseUs";

import DreamsSection from "../../../../components/DreamSection";
import FAQSection from "../../../professional-online-courses/components/faq";

export const metadata = {
  title: "Adobe Illustrator: Vector Art & Logo Design",
  description: "Learn Adobe Illustrator to design clean vector graphics and logos. Master drawing tools, typography, and color techniques for professional creative projects.",
};

function CourseContent() {


  return (
    <div className="bg-white text-black mt-20">
      <CourseHero noOfHours="12.5" noOfLessons="26"    offerPrice="699"  courseMetaContent="This course provides comprehensive training in Adobe Illustrator, the industry standard for vector graphic design. Students learn to create logos, icons, typography, and complex illustrations with precision. The curriculum covers essential tools, advanced techniques, and workflow optimization for print and digital media projects." courseName="Adobe Illustrator Course" title="UIUX designing" price="1499" />


      <ComboPack />


      <CustomizeCourse
        courseTitle="UIUX Design"
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