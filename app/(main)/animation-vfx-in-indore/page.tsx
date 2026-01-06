import AnimationVFXComponent from "../../../components/cityComponents/AnimationVFXComponent";

export const metadata = {
    title: "Animation & VFX Course in Indore | Inframe School",
    description: "Learn animation and visual effects at Inframe School Indore with real-world projects and expert-led creative training."
};

function Page() {

    return (
        <div className="bg-white text-black mt-20">
            <AnimationVFXComponent
                title="Animation VFX Course"
                duration="4 Years Full-Time"
                content1="At Inframe, you have access to multiple Animation & VFX programs such as B.Des in Animation & VFX, BVOC, B.Sc, One-Year Diploma, and Three-Year Diploma. If you are looking for an Animation & VFX Course in Indore, these courses provide comprehensive training in animation, VFX, motion graphics, and digital content creation. By the end of the course, you will have a professional portfolio and the ability to create animations and visual-effects for a variety of media."
                content2="You will learn 2D/3D animation, VFX fundamentals, storyboarding, character and environment design, motion graphics, compositing, video editing, and storytelling. You will also get hands-on training with industry software like Adobe After Effects, Premiere Pro, Autodesk Maya, Blender, and other VFX/compositing tools. These skills make you eligible for roles like Animator, VFX Artist, Motion Graphic Designer, Compositor, or Multimedia Content Creator."
                description="Build confidence as you animate characters from sketch to screen.
"
                index={0}
                category=""
                software={["Photoshop", "Illustrator", "Corel Draw", "Maya", "After Effects", "Blender"]}
            />
        </div>
    );
}

export default Page;