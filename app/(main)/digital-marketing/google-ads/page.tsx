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
        title: "Google Ads Course: Master Real Campaign Strategy",
    description: "Learn how to build, optimize, and scale real Google Ads campaigns—from keyword research to smart bidding—so you stop wasting budget and start driving results.",
};

function CourseContent() {

    return (
        <div className="bg-white text-black mt-20">
            <CourseHero  noOfHours="12.5" noOfLessons="150"   courseMetaContent="Master the art of Google Ads to drive targeted traffic, boost conversions, and maximize ROI. Learn campaign setup, keyword research, ad copywriting, bidding strategies, and analytics to run profitable ads that get real business results."  courseName="Google Ads Course"   title="Digital Markteting" price="1999" offerPrice="899" />
            {/* <div className="w-44 mb-10 h-1 bg-gray-500 mx-auto rounded-full"></div> */}

            <ComboPack />
            {/* <div className="w-44 mb-10 h-1 bg-gray-500 mx-auto rounded-full"></div> */}

            <CustomizeCourse
                courseTitle="Graphic Design"
            // availableSoftware={graphicDesignSoftware}
            />

            <CourseFeatures />
            {/* <div className="w-44 mb-10 h-1 bg-gray-500 mx-auto rounded-full"></div> */}
            {/* < DreamsSection /> */}
            {/* <div className="w-44 mb-10 h-1 bg-gray-500 mx-auto rounded-full"></div> */}
            < DreamsSection />

            <WhyChooseUs />

            <div className="my-12 sm:my-1 px-4 sm:px-0 lg:px-60">
                <FAQComponent courseType="digital" />
            </div>
        </div>
    );
}

export default CourseContent;