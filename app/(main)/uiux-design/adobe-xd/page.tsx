import ComboPack from "../../../../components/courseDetails/ComboPack";
import CourseHero from "../../../../components/courseDetails/courseDetails";
import CourseFeatures from "../../../../components/courseDetails/courseFeature";
import CustomizeCourse from "../../../../components/courseDetails/CustomizePack";

import WhyChooseUs from "../../../../components/courseDetails/WhyChooseUs";

import DreamsSection from "../../../../components/DreamSection";
import FAQSection from "../../../professional-online-courses/components/faq";

export const metadata = {
  title: "Adobe XD Course: UI/UX Design Essentials",
  description: "Learn Adobe XD to design and prototype user-friendly interfaces. Master wireframing, interactive design, and collaboration tools for seamless app and web projects.",
};

function CourseContent() {


  return (
    <div className="bg-white text-black mt-20">
      <CourseHero  offerPrice="699"  noOfHours="12.5" noOfLessons="150"   courseMetaContent="This course focuses on Adobe XD, a leading tool for UI/UX design and prototyping. Students learn how to design interactive web and mobile app interfaces, create wireframes, and develop prototypes to streamline the user experience design process." courseName="Adobe XD Course"   title="UIUX designing" price="1499" />
    

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