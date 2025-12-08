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
      <CourseHero offerPrice="699" courseMetaContent="This course trains students on Sketch, a popular design tool for macOS used in UI/UX design. Emphasizing vector editing, prototyping, and collaboration, students learn to produce intuitive digital products, from wireframes to fully interactive prototypes." courseName="Sketchup"  title="UIUX designing" price="1499" />
      <ComboPack />
      <CustomizeCourse courseTitle="UIUX Design"
      />       
      <CourseFeatures />
      <DreamsSection />
      <WhyChooseUs />
      <div className="my-12 sm:my-1 px-4 sm:px-0 lg:px-60">
        <FAQSection />
      </div>
    </div>
  );
}

export default CourseContent;