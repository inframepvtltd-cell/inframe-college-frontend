import AnimationVFXComponent from "../../../components/cityComponents/AnimationVFXComponent";

export const metadata = {
    title: "Animation & VFX Course in Delhi | Inframe School",
    description: "Enhance your creative and technical skills with Inframe School’s Animation & VFX Course in Delhi for industry-ready careers."
};

function Page() {

    return (
        <div className="bg-white text-black mt-20">
            <AnimationVFXComponent
                title="Animation VFX Course"
                duration="4 Years Full-Time"
                content1="At Inframe, you can choose from multiple Animation & VFX programs including B.Des in Animation & VFX, BVOC, B.Sc, One-Year Diploma, and Three-Year Diploma. If you are considering an Animation & VFX Course in Delhi, these courses are tailored to develop your creative animation skills, technical VFX knowledge, and storytelling mastery for digital media and film industry. By the end of the course, you will have a strong portfolio and confidence to create animations, VFX and multimedia content."
                content2="The curriculum includes 2D and 3D animation, VFX fundamentals, storyboarding, character and environment design, motion graphics, compositing, video editing, and narrative visualization. You will also train in software like Adobe After Effects, Premiere Pro, Autodesk Maya, Blender, and other VFX/compositing tools — enabling you to produce professional animations and visual effects. These skills prepare you for jobs like Animator, VFX Artist, Motion Graphic Designer, Compositor, or Multimedia Content Creator."
                description="Turn creativity into stunning animated visuals and effects.
"
                index={0}
                category=""
                software={["Photoshop", "Illustrator", "Corel Draw", "Maya", "After Effects", "Blender"]}
            />
        </div>
    );
}

export default Page;