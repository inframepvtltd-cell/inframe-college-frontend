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
    title: "WhatsApp, SMS & Email Marketing with Design Skills",
    description: "Get sharp at high-converting messaging—WhatsApp, SMS, and email—plus the design basics needed to craft clean, persuasive campaigns that actually get clicks and responses.",
};

function CourseContent() {

    return (
        <div className="bg-white text-black mt-20">
            <CourseHero  noOfHours="12.5" noOfLessons="150"  courseMetaContent="WhatsApp, SMS, Email Marketing with Designing Course
Combine messaging marketing with effective design skills to create high-converting campaigns. Learn how to craft messages, automate workflows, and design visual content that grabs attention and drives sales across WhatsApp, SMS, and email platforms.z"  courseName="Whatsapp, Sms, Email Marketing With 
Designing Course"   title="Digital Markteting" price="1999" offerPrice="899" />
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