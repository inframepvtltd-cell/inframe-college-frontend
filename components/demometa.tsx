"use client";

import { useState } from "react";
import CourseHero from "./courseDetails/courseDetails";
import ComboPack from "./courseDetails/ComboPack";
import CourseFeatures from "./courseDetails/courseFeature";
import Customizecourse from "./courseDetails/CustomizePack";
import WhyChooseUs from "./courseDetails/WhyChooseUs";
import CustomizeCourse from "./courseDetails/CustomizePack";

export default function PageClient() {
    const [isFormOpen, setIsFormOpen] = useState(false);
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
            <CourseHero price="1499" />
            <ComboPack />
            <CourseFeatures />
 <CustomizeCourse
                      courseTitle="Graphic Design"
                      availableSoftware={graphicDesignSoftware}
                  />                  <WhyChooseUs />
        </div>
    );
}
