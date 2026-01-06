import AnimationVFXComponent from "../../../components/cityComponents/AnimationVFXComponent";

export const metadata = {
    title: "Animation & VFX Course in Ajmer | Inframe School",
    description: "Upgrade your creative skills with Inframe School’s Animation & VFX Course in Ajmer designed for modern production and studio careers."
};

function Page() {

    return (
        <div className="bg-white text-black mt-20">
            <AnimationVFXComponent
                title="Animation VFX Course"
                duration="4 Years Full-Time"
                content1="At Inframe, you can choose from multiple Animation & VFX programs such as B.Des in Animation & VFX, BVOC, B.Sc, One-Year Diploma, and Three-Year Diploma. If you are searching for an Animation & VFX Course in Ajmer, these programs are designed to help you build strong creative, technical, and storytelling skills needed in animation, visual effects, and multimedia industry. By the end of the course, you will have a professional portfolio and the confidence to create animations, visual effects, and multimedia content for film, web, and digital platforms."
                content2="You will learn 2D animation, 3D animation, VFX fundamentals, storyboarding, character design, motion graphics, compositing, video editing, and visual storytelling. The course also includes training on leading software and tools like Adobe After Effects, Premiere Pro, Autodesk Maya, Blender, and other VFX/compositing tools to create professional-level animations and effects. With these skills you can work as Animator, VFX Artist, Motion Graphic Designer, Compositor, or Multimedia Content Creator.
"
                description="Create cinematic effects that transform ordinary scenes into magic.
"
                index={0}
                category=""
                software={["Photoshop", "Illustrator", "Corel Draw", "Maya", "After Effects", "Blender"]}
            />
        </div>
    );
}

export default Page;