import AnimationVFXComponent from "../../../components/cityComponents/AnimationVFXComponent";

export const metadata = {
    title: "Animation & VFX Course in Surat | Inframe School",
    description: "Master animation and VFX techniques with Inframe School’s Animation & VFX Course in Surat designed for modern creative careers."
};

function Page() {

    return (
        <div className="bg-white text-black mt-20">
            <AnimationVFXComponent
                title="Animatoin VFX Course"
                duration="4 Years Full-Time"
                content1="At Inframe, you can choose from multiple Animation & VFX programs such as B.Des in Animation & VFX, BVOC, B.Sc, One-Year Diploma, and Three-Year Diploma. If you are looking for a Animation & VFX Course in Surat, these courses are designed to develop your artistic creativity, technical animation skills, and digital storytelling capability. After completing the course, you will have a professional portfolio and the confidence to create animations, motion graphics, and visual-effects content for diverse media."
                content2="You will learn 2D and 3D animation, VFX basics, storyboarding, character and environment design, motion graphics, compositing, video editing, and visual storytelling. The program also provides training on industry software like Adobe After Effects, Premiere Pro, Autodesk Maya, Blender, and other compositing/animation tools — enabling you to produce professional-level animations and effects. With these skills, you can pursue careers such as Animator, VFX Artist, Motion Graphic Designer, Compositor, or Multimedia Content Creator."
                description="Develop studio-ready skills through guided training.
"
                index={0}
                category=""
                software={["Photoshop", "Illustrator", "Corel Draw", "Maya", "After Effects", "Blender"]}
            />
        </div>
    );
}

export default Page;