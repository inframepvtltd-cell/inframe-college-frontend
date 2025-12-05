// "use client"
// import { useEffect } from "react";
import ComboPack from "../../../../components/courseDetails/ComboPack";
import CourseHero from "../../../../components/courseDetails/courseDetails";
import CourseFeatures from "../../../../components/courseDetails/courseFeature";
import CustomizeCourse from "../../../../components/courseDetails/CustomizePack";
import Customizecourse from "../../../../components/courseDetails/CustomizePack";
import PageClient from "../../../../components/demometa";
import WhyChooseUs from "../../../../components/courseDetails/WhyChooseUs";
import DreamsSection from "../../../../components/DreamSection";
import FAQSection from "../../../professional-online-courses/components/faq";

export const metadata = {
  title: "AutoCad Course | Inframe School",
  description: "Learn user experience and interface design with real projects.",
};

function CourseContent() {
  // const [isFormOpen, setIsFormOpen] = useState(false);
  // useEffect(() => {
  //   const script = document.createElement("script");
  //   script.src = "https://checkout.razorpay.com/v1/checkout.js";
  //   script.async = true;
  //   document.body.appendChild(script);
  // }, []);
  const graphicDesignSoftware = [
    { id: "1", name: "Adobe Photoshop", price: 1999, category: "design" },
    { id: "2", name: "Adobe Illustrator", price: 1999, category: "design" },
    { id: "3", name: "Corel", price: 1599, category: "design" },
    { id: "4", name: "Adobe Indesign", price: 1499, category: "ui-ux" },

    { id: "5", name: "Maya", price: 999, category: "design" },
    { id: "6", name: "Blender", price: 999, category: "design" },
    { id: "7", name: "Adobe Animate", price: 999, category: "design" },
    { id: "8", name: "Adobe Audition", price: 999, category: "design" },
    { id: "9", name: "Adobe Premiere Pro", price: 999, category: "design" },

    { id: "10", name: "Adobe After Effects", price: 1799, category: "publishing" },
    { id: "11", name: "Nuke", price: 1799, category: "publishing" },
    { id: "12", name: "ZBrush Arnold", price: 1799, category: "publishing" },
    { id: "13", name: "Adobe XD", price: 1799, category: "design" },
  ];


  //   Adobe illustrator, Adobe indesign, Adobe photoshop, Corel, Maya , Blender, Adobe animate, adobe 
  // audition, Adobe preimere Pro, Adobe aftereffect, Nuke, Zbrush arnold, adobe xd.
  return (
    <div className="bg-white text-black mt-20">
      <CourseHero title="Interior design" price="1499" />
      {/* <div className="w-44 mb-10 h-1 bg-gray-500 mx-auto rounded-full"></div> */}

      <ComboPack />
      {/* <div className="w-44 mb-10 h-1 bg-gray-500 mx-auto rounded-full"></div> */}

      <CustomizeCourse
        courseTitle="Interior Design"
        // availableSoftware={graphicDesignSoftware}
      />            {/* <div className="w-44 mb-10 h-1 bg-gray-500 mx-auto rounded-full"></div> */}
      <CourseFeatures />
      {/* <div className="w-44 mb-10 h-1 bg-gray-500 mx-auto rounded-full"></div> */}
      {/* < DreamsSection /> */}

      < DreamsSection />

      <WhyChooseUs />

      <div className="my-12 sm:my-1 px-4 sm:px-0 lg:px-60">
        <FAQSection />
      </div>
    </div>
  );
}

export default CourseContent;