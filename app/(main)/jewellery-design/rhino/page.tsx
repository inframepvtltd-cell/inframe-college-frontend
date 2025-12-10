import ComboPack from "../../../../components/courseDetails/ComboPack";
import CourseHero from "../../../../components/courseDetails/courseDetails";
import CourseFeatures from "../../../../components/courseDetails/courseFeature";
import CustomizeCourse from "../../../../components/courseDetails/CustomizePack";

import WhyChooseUs from "../../../../components/courseDetails/WhyChooseUs";

import DreamsSection from "../../../../components/DreamSection";
import FAQSection from "../../../professional-online-courses/components/faq";

export const metadata = {
  title: "Rhino Course: Precision 3D Modeling for Designers",
  description: "Learn Rhino’s powerful 3D modeling tools—surface creation, CAD integration, and complex designs—so you can produce accurate, industry-ready models efficiently.",
};

function CourseContent() {


  return (
    <div className="bg-white text-black mt-20">
      <CourseHero noOfHours="12.5" noOfLessons="150"   courseMetaContent="Master Rhino 3D modeling software for precision in product design, architecture, and engineering. This course teaches NURBS modeling, rendering, and CAD workflows critical for technical and creative projects."  courseName="Rhino Course"  title="Jewellery designing" price="2499" offerPrice="1499" />
    

      <ComboPack />
    

      <CustomizeCourse
        courseTitle="Jewellery Design"
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