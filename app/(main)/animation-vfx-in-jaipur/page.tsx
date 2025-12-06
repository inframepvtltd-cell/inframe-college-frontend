import AnimationVFXComponent from "../../../components/cityComponents/AnimationVFXComponent";

export const metadata = {
    title: "Animation & VFX Course in Jaipur | Inframe School",
    description: "Kickstart your creative career with Inframe School’s Animation & VFX Course in Jaipur and gain industry-standard training."
};

function Page() {

    return (
        <div className="bg-white text-black mt-20">
            <AnimationVFXComponent
                title="Animation VFX Course"
                duration="4 Years Full-Time"
                content1="At Inframe, you can choose from a range of Animation & VFX programs including B.Des in Animation & VFX, BVOC, B.Sc, One-Year Diploma, and Three-Year Diploma. If you are considering an Animation & VFX Course in Jaipur, these programs offer a well-rounded curriculum combining creativity, technical skills and storytelling for animation, VFX and multimedia production. By the completion of the course, you will have a professional portfolio and the confidence to produce animations, motion graphics, and visual-effects content for film, web, and multimedia."
                content2="You will learn 2D and 3D animation, VFX basics, storyboarding, character and environment design, motion graphics, compositing, video editing, and visual storytelling. The program also includes training in software like Adobe After Effects, Premiere Pro, Autodesk Maya, Blender, and other VFX/compositing tools — enabling you to build professional-level animations and effects. These competencies prepare you for roles such as Animator, VFX Artist, Motion Graphic Designer, Compositor, or Multimedia Designer."
                description="Learn how professionals design effects for films, ads, and games.
"
                index={0}
                category=""
                software={["Photoshop", "Illustrator", "Corel Draw", "Maya", "After Effects", "Blender"]}
            />
        </div>
    );
}

export default Page;