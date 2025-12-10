import ComboPack from "../../../../components/courseDetails/ComboPack";
import CourseHero from "../../../../components/courseDetails/courseDetails";
import CourseFeatures from "../../../../components/courseDetails/courseFeature";
import CustomizeCourse from "../../../../components/courseDetails/CustomizePack";

import WhyChooseUs from "../../../../components/courseDetails/WhyChooseUs";

import DreamsSection from "../../../../components/DreamSection";
import FAQSection from "../../../professional-online-courses/components/faq";

export const metadata = {
  title: "Photoshop Course: Photo Editing & Graphic Design",
  description: "Master Photoshop to enhance photos and create stunning graphics. Learn essential tools for retouching, compositing, and digital artwork from scratch.",
};

function CourseContent() {


  return (
    <div className="bg-white text-black mt-20">
      <CourseHero  offerPrice="699"  noOfHours="12.5" noOfLessons="26"    courseMetaContent="Focused on Adobe Photoshop, this course teaches students how to manipulate, enhance, and creatively edit images. From photo retouching to digital painting and compositing, learners develop the skills needed for photography, advertising, and graphic design industries."  courseName="Photoshop Course"  title="UIUX designing" price="1499" />
    

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