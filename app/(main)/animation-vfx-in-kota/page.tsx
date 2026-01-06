import AnimationVFXComponent from "../../../components/cityComponents/AnimationVFXComponent";

export const metadata = {
    title: "Animation & VFX Course in Kota | Inframe School",
    description: "Master animation tools and VFX production with Inframe School’s Animation & VFX Course in Kota designed for career growth."
};

function Page() {

    return (
        <div className="bg-white text-black mt-20">
            <AnimationVFXComponent
                title="Animation VFX Course"
                duration="4 Years Full-Time"
                content1="At Inframe, you can choose from various Animation & VFX programs such as B.Des in Animation & VFX, BVOC, B.Sc, One-Year Diploma, and Three-Year Diploma. If you are looking for an Animation & VFX Course in Kota, these courses are designed to strengthen your creative thinking, technical animation skills, and storytelling capability. By the end of the program, you will own a professional portfolio and the confidence to create animations and visual effects for films, advertisements, and digital media."
                content2="You will learn 2D and 3D animation, VFX basics, storyboarding, character and background design, motion graphics, compositing, video editing, and narrative design. Training is provided on software like Adobe After Effects, Premiere Pro, Autodesk Maya, Blender, and other VFX/compositing tools to help you create professional-grade animations and visual effects. These skills prepare you for roles like Animator, VFX Artist, Motion Graphic Designer, Compositor, or Multimedia Content Creator.
"
                description="Understand the pipeline from concept art to final render.
"
                index={0}
                category=""
                software={["Photoshop", "Illustrator", "Corel Draw", "Maya", "After Effects", "Blender"]}
            />
        </div>
    );
}

export default Page;