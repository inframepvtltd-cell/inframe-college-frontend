// "use client"
// import { useEffect } from "react";
import ComboPack from "../../../../components/courseDetails/ComboPack";
import CourseHero from "../../../../components/courseDetails/courseDetails";
import CourseFeatures from "../../../../components/courseDetails/courseFeature";
import CustomizeCourse from "../../../../components/courseDetails/CustomizePack";
// import Customizecourse from "../../../../components/courseDetails/CustomizePack";
import WhyChooseUs from "../../../../components/courseDetails/WhyChooseUs";
import DreamsSection from "../../../../components/DreamSection";
import FAQSection from "../../../professional-online-courses/components/faq";
import FAQComponent from "../../../professional-online-courses/components/FaqComponent";

export const metadata = {
    title: "LinkedIn Marketing Course: Build Authority Fast",
    description: "Learn how to grow reach, generate leads, and position yourself as an industry authority on LinkedIn using smart content, targeting, and data-driven marketing.",
};

function CourseContent() {

    return (
        <div className="bg-white text-black mt-20">
            <CourseHero  noOfHours="12.5" noOfLessons="150"   courseMetaContent="Leverage LinkedIn’s professional network to build your brand, generate qualified leads, and grow business connections. Master profile optimization, content strategies, paid ads, and analytics tailored for B2B success."  courseName="Linkdin Marketing Course" offerPrice="899"  title="Digital Markteting" price="1999" />
            <ComboPack />

            <CustomizeCourse
                courseTitle="Graphic Design"
            />

            <CourseFeatures />
            < DreamsSection />

            <WhyChooseUs />

            <div className="my-12 sm:my-1 px-4 sm:px-0 lg:px-60">
                <FAQComponent courseType="digital" />
            </div>
        </div>
    );
}

export default CourseContent;