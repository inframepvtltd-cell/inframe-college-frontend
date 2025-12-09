// "use client"
// import { useEffect } from "react";
import ComboPack from "../../../../components/courseDetails/ComboPack";
import CourseHero from "../../../../components/courseDetails/courseDetails";
import CourseFeatures from "../../../../components/courseDetails/courseFeature";
import CustomizeCourse from "../../../../components/courseDetails/CustomizePack";
// import Customizecourse from "../../../../components/courseDetails/CustomizePack";
import WhyChooseUs from "../../../../components/courseDetails/WhyChooseUs";
import PageClient from "../../../../components/demometa";
import DreamsSection from "../../../../components/DreamSection";
import FAQSection from "../../../professional-online-courses/components/faq";

export const metadata = {
    title: "YouTube Ads & Marketing: Scale With Video Strategy",
    description: "This course shows you how to plan, create, and optimize YouTube ads—targeting, scripting, analytics, and scaling—so your videos actually convert, not just get views.",
};

function CourseContent() {

    return (
        <div className="bg-white text-black mt-20">
            <CourseHero noOfHours="12.5" noOfLessons="150"   courseMetaContent="Harness YouTube’s massive reach to promote products or services. Learn video ad creation, targeting, channel growth tactics, and conversion tracking to create campaigns that engage viewers and drive action." courseName="YouTube Ads And Marketibg Course"   title="Digital Markteting" price="1999" offerPrice="899" />

            <ComboPack />

            <CustomizeCourse
                courseTitle="Graphic Design"
           
            />

            <CourseFeatures />
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