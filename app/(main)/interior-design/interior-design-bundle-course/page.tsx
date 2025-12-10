import ComboPack from "../../../../components/courseDetails/ComboPack";
import CourseHero from "../../../../components/courseDetails/courseDetails";
import CourseFeatures from "../../../../components/courseDetails/courseFeature";
import CustomizeCourse from "../../../../components/courseDetails/CustomizePack";
import WhyChooseUs from "../../../../components/courseDetails/WhyChooseUs";
import DreamsSection from "../../../../components/DreamSection";
import FAQSection from "../../../professional-online-courses/components/faq";

export const metadata = {
    title: "Interior Design Bundle: AutoCAD, SketchUp & More",
    description: "Get hands-on with AutoCAD 2D/3D, SketchUp, 3ds Max + V Ray, Lumion, Revit, D5, and Photoshop. Master all tools needed for professional interior design in one course.",
};

function Page() {

    return (
        <div className="bg-white text-black mt-20">
            <CourseHero  noOfHours="12.5" noOfLessons="150"   courseMetaContent="This Interior Design Bundle Course is built for one purpose — to make you genuinely skilled, not just “certified.” You learn every software that real interior design studios use so you can handle complete projects from concept to final presentation.

You start with AutoCAD (2D & 3D) to create clean technical drawings that match industry standards. Then you move into SketchUp for fast and accurate 3D modeling.

Next, you learn 3ds Max + V-Ray, where you create high-quality, photo-realistic interiors that actually look professional. After that, you work with Lumion and D5 Render to produce smooth, realistic walkthroughs and animations — exactly what clients expect today.

You also learn Revit, the most in-demand BIM software used by top studios for precise architectural and interior documentation. Finally, Photoshop helps you polish renders, build mood boards, and create client-ready presentation sheets.

This bundle gives you the complete workflow:
Draft → Model → Render → Animate → Present.
Everything you need to work confidently in interior design, land clients, or start your own practice." courseName="Interior Design Bundle Course" title="Interior designing" price="10493" offerPrice="1499"/>

            <ComboPack />

            <CustomizeCourse courseTitle="Interior Design" />
            <CourseFeatures />

            < DreamsSection />

            <WhyChooseUs />

            <div className="my-12 sm:my-1 px-4 sm:px-0 lg:px-60">
                <FAQSection />
            </div>
        </div>
    );
}

export default Page;