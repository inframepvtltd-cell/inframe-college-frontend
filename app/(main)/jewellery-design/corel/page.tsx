import ComboPack from "../../../../components/courseDetails/ComboPack";
import CourseHero from "../../../../components/courseDetails/courseDetails";
import CourseFeatures from "../../../../components/courseDetails/courseFeature";
import CustomizeCourse from "../../../../components/courseDetails/CustomizePack";

import WhyChooseUs from "../../../../components/courseDetails/WhyChooseUs";

import DreamsSection from "../../../../components/DreamSection";
import FAQSection from "../../../professional-online-courses/components/faq";

export const metadata = {
  title: "CorelDRAW Course: Expert Vector & Layout Design Skills",
  description: "Master CorelDRAW for vector art, branding, and print design with practical projects that teach you to create precise, professional-quality graphics from start to finish.",
};

function CourseContent() {


  return (
    <div className="bg-white text-black mt-20">
      <CourseHero noOfHours="12.5" noOfLessons="42"   courseMetaContent="Master CorelDRAW and Corel PHOTO-PAINT tools for vector illustration and photo editing. This course is designed for graphic designers and marketers aiming for precision in branding, print, and digital media projects." courseName="Corel Draw  Course"   title="Jewellery designing" offerPrice="1499" price="2499" />
    

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