import ComboPack from "../../../../components/courseDetails/ComboPack";
import CourseHero from "../../../../components/courseDetails/courseDetails";
import CourseFeatures from "../../../../components/courseDetails/courseFeature";
import CustomizeCourse from "../../../../components/courseDetails/CustomizePack";

import WhyChooseUs from "../../../../components/courseDetails/WhyChooseUs";

import DreamsSection from "../../../../components/DreamSection";
import FAQSection from "../../../professional-online-courses/components/faq";
import FAQComponent from "../../../professional-online-courses/components/FaqComponent";

export const metadata = {
  title: "Jewellery Design Bundle: Corel, Illustrator & Rhino",
  description: "Learn jewellery design with CorelDRAW, Adobe Illustrator, Photoshop, and Rhino in one complete bundle. Build skills to create detailed and professional designs.",
};

function CourseContent() {


  return (
    <div className="bg-white text-black mt-20">
      <CourseHero  noOfHours="12.5" noOfLessons="150"  courseMetaContent="This Jewellery Design Bundle Course builds the essential digital skills needed to create professional jewellery concepts and production-ready designs. You start with CorelDRAW to make clean sketches, technical drawings, stone settings, and layout sheets used by manufacturers. Then you move into Adobe Illustrator, where you create precise vector illustrations, motifs, and presentation boards for clients or portfolio work.

You also learn Adobe Photoshop to add textures, metal finishes, gemstone effects, lighting, and detailed product enhancements that make designs look realistic. Finally, you train in Rhino, the leading CAD software for jewellery, where you model rings, pendants, earrings, and intricate 3D designs that can be rendered or sent directly for manufacturing.

By the end of this course, you can sketch, illustrate, enhance, and model jewellery designs with industry-standard tools — giving you the practical skills needed to work with brands, clients, or production teams."   courseName="Jewellery Design bundle Course" title="Jewellery designing" price="9996" offerPrice="1499" />


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