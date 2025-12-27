import ComboPack from "../../../../components/courseDetails/ComboPack";
import CourseHero from "../../../../components/courseDetails/courseDetails";
import CourseFeatures from "../../../../components/courseDetails/courseFeature";
import CustomizeCourse from "../../../../components/courseDetails/CustomizePack";
import WhyChooseUs from "../../../../components/courseDetails/WhyChooseUs";
import DreamsSection from "../../../../components/DreamSection";
import FAQSection from "../../../professional-online-courses/components/faq";
import FAQComponent from "../../../professional-online-courses/components/FaqComponent";

export const metadata = {
  title: "Sketch Course: Smart UI Design for Modern Creators",
  description: "This Sketch course focuses on practical UI design—symbols, grids, components, and responsive layouts so you can design cleaner, faster, and client-ready interfaces.",
};

function CourseContent() {
  return (
    <div className="bg-white text-black mt-20">
      <CourseHero noOfHours="12.5" noOfLessons="150" offerPrice="699" courseMetaContent="This course trains students on Sketch, a popular design tool for macOS used in UI/UX design. Emphasizing vector editing, prototyping, and collaboration, students learn to produce intuitive digital products, from wireframes to fully interactive prototypes." courseName="Sketchup Course" title="UIUX designing" price="1499" />
      <ComboPack />
      <CustomizeCourse courseTitle="UIUX Design"
      />
      <CourseFeatures />
      <DreamsSection />
      <WhyChooseUs />
      <div className="my-12 sm:my-1 px-4 sm:px-0 lg:px-60">
        <FAQComponent courseType="uiux" />      </div>
    </div>
  );
}

export default CourseContent;