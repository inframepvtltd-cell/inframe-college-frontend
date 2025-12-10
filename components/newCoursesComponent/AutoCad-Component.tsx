"use client"
import { useEffect } from "react";
import ComboPack from "../courseDetails/ComboPack";
import CourseHero from "../courseDetails/courseDetails";
import CourseFeatures from "../courseDetails/courseFeature";
import Customizecourse from "../courseDetails/CustomizePack";
import WhyChooseUs from "../courseDetails/WhyChooseUs";
import FAQSection from "../Courses/FAQSection";
import DreamsSection from "../DreamSection";
import CustomizeCourse from "../courseDetails/CustomizePack";
// import ComboPack from "../../../../components/courseDetails/ComboPack";
// import CourseHero from "../../../../components/courseDetails/courseDetails";
// import CourseFeatures from "../../../../components/courseDetails/courseFeature";
// import Customizecourse from "../../../../components/courseDetails/CustomizePack";
// import WhyChooseUs from "../../../../components/courseDetails/WhyChooseUs";
// import PageClient from "../../../../components/demometa";
// import DreamsSection from "../../../../components/DreamSection";
// import FAQSection from "../../../professional-online-courses/components/faq";

// export const metadata = {
//   title: "AutoCad Course | Inframe School",
//   description: "Learn user experience and interface design with real projects.",
// };

function AutoCadComponent() {
  // const [isFormOpen, setIsFormOpen] = useState(false);
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);
  const graphicDesignSoftware = [
    { id: "1", name: "Adobe Photoshop", price: 1999, category: "design" },
    { id: "2", name: "Adobe Illustrator", price: 1999, category: "design" },
    { id: "3", name: "Figma", price: 1499, category: "ui-ux" },
    { id: "4", name: "Canva Pro", price: 999, category: "design" },
    { id: "5", name: "Adobe InDesign", price: 1799, category: "publishing" },
    { id: "6", name: "CorelDRAW", price: 1599, category: "design" }
  ]
  return (
    <div className="bg-white text-black mt-20">
 <h1>helloworld</h1>
    </div>
  );
}

export default AutoCadComponent;
