import ComboPack from "../../../../components/courseDetails/ComboPack";
import CourseHero from "../../../../components/courseDetails/courseDetails";
import CourseFeatures from "../../../../components/courseDetails/courseFeature";
import CustomizeCourse from "../../../../components/courseDetails/CustomizePack";

import WhyChooseUs from "../../../../components/courseDetails/WhyChooseUs";

import DreamsSection from "../../../../components/DreamSection";
import FAQSection from "../../../professional-online-courses/components/faq";
import FAQComponent from "../../../professional-online-courses/components/FaqComponent";

export const metadata = {
  title: "Photoshop Course: Advanced Editing & Creative Mastery",
  description: "Dive deep into Photoshop techniques—retouching, compositing, color correction, and design—to create polished, professional images that go beyond basic edits.",
};

function CourseContent() {


  return (
    <div className="bg-white text-black mt-20">
      <CourseHero  noOfHours="12.5" noOfLessons="26"  courseMetaContent="Get skilled in Adobe Photoshop for photo editing, compositing, and digital painting. This course covers essential tools, retouching techniques, and creative workflows for photographers, designers, and artists."  courseName="Photoshop Course"  title="Jewellery designing" offerPrice="1499" price="2499" />
    

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