
import ComboPack from "../../../../components/courseDetails/ComboPack";
import CourseHero from "../../../../components/courseDetails/courseDetails";
import CourseFeatures from "../../../../components/courseDetails/courseFeature";
import CustomizeCourse from "../../../../components/courseDetails/CustomizePack";
import WhyChooseUs from "../../../../components/courseDetails/WhyChooseUs";
import PageClient from "../../../../components/demometa";
import DreamsSection from "../../../../components/DreamSection";
import FAQSection from "../../../professional-online-courses/components/faq";

export const metadata = {
    title: "Sketchup Course | Inframe School",
    description: "Learn user experience and interface design with real projects.",
};

function CourseContent() {
    return (
        <div className="bg-white text-black mt-20">
            <CourseHero courseMetaContent="This Animation and VFX Bundle Course builds the core skills needed for 3D animation, motion graphics, and visual effects. You start with Maya to learn professional modeling, rigging, animation, and lighting workflows used in films and games. Then you work in Blender, where you practice 3D modeling, shading, rendering, and basic simulations.

You also train in Adobe Animate to create 2D animations and character movements. For video editing, you use Adobe Premiere Pro to cut scenes, adjust timing, add transitions, and prepare final outputs. Finally, Adobe After Effects teaches you compositing, motion graphics, tracking, and visual effects.

By the end, you can create, animate, edit, and composite complete animation and VFX projects — giving you the practical skills needed to work in production, freelance, or studio environments." courseName="Animation VFX bundle course"   title="Animation and VFX" price="12495" offerPrice="1499" />
            <ComboPack />
            <CustomizeCourse
                courseTitle="Animation and VFX" />
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