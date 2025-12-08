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
      <CourseHero  offerPrice="699"  courseMetaContent="Focused on Adobe Photoshop, this course teaches students how to manipulate, enhance, and creatively edit images. From photo retouching to digital painting and compositing, learners develop the skills needed for photography, advertising, and graphic design industries."  courseName="photoshop"  title="UIUX designing" price="1499" />
    

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