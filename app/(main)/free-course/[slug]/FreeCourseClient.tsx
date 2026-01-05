"use client";

import { useState } from "react";
import Image from "next/image";
// import HeroSection from "./components/HeroSection";
// import CourseOverviewSection from "./components/CourseOverviewSection";
import ApplyNowForm from "../../../../components/ApplyNowForm";
import HeroSection from "../components/HeroSection";
import CourseOverviewSection from "../components/CourseOverviewSection";
import Carrousal from "../../../professional-online-courses/components/carrousal";

export default function FreeCourseClient({ course }: any) {
    const [isFormOpen, setIsFormOpen] = useState(false);

    return (
        <>
 
            <HeroSection
                course={course}
                onApply={() => setIsFormOpen(true)}
            />

            <CourseOverviewSection
                overview={course.overview}
                description={course.course_description}
            />

            <ApplyNowForm
                isFormOpen={isFormOpen}
                setIsFormOpen={setIsFormOpen}
                isScrolled={false}
            />

            <Carrousal />
            {/* CEO Banner Section */}
            <div className="relative w-full h-[28vh] sm:h-[60vh] md:h-[50vh] lg:h-[84vh] overflow-hidden">
                <Image
                    src={"/landingImages/by fb sir.png"}
                    alt="Hero Banner"
                    fill
                    priority
                    className="object-contain sm:object-cover object-top animate-fade-in"
                />
            </div>
        </>
    );
}
