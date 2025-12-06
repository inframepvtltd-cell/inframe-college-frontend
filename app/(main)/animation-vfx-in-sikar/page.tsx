import AnimationVFXComponent from "../../../components/cityComponents/AnimationVFXComponent";

export const metadata = {
    title: "Animation & VFX Course in Sikar | Inframe School",
    description: "Learn Animation & VFX in Sikar at Inframe School with professional training, studio tools, and hands-on project experience."
};

function Page() {

    return (
        <div className="bg-white text-black mt-20">
            <AnimationVFXComponent
                title="Animation VFX Course"
                duration="4 Years Full-Time"
                content1="At Inframe, you can choose from multiple Animation & VFX programs such as B.Des in Animation & VFX, BVOC, B.Sc, One-Year Diploma, and Three-Year Diploma. If you are searching for an Animation & VFX Course in Sikar, these courses help you build robust creative, technical and storytelling skills relevant to modern animation and VFX industry. After finishing the course, you will have a polished portfolio and the capability to design animations, motion graphics, and visual effects for diverse platforms."
                content2="
You will study 2D/3D animation, VFX fundamentals, storyboarding, character and environment design, motion graphics, compositing, video editing, and digital storytelling. You will also receive training on industry tools including Adobe After Effects, Premiere Pro, Autodesk Maya, Blender, and other compositing/animation software. These skills make you eligible for career roles like Animator, VFX Artist, Motion Graphic Designer, Compositor, or Multimedia Content Creator.
"
                description="Transform raw footage with advanced VFX workflows.
"
                index={0}
                category=""
                software={["Photoshop", "Illustrator", "Corel Draw", "Maya", "After Effects", "Blender"]}
            />
        </div>
    );
}

export default Page;