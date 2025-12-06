import AnimationVFXComponent from "../../../components/cityComponents/AnimationVFXComponent";

export const metadata = {
    title: "Animation & VFX Course in Bikaner | Inframe School",
    description: "Build a strong creative career with the Animation & VFX Course in Bikaner offered by Inframe School. Learn industry-ready skills."
};

function Page() {

    return (
        <div className="bg-white text-black mt-20">
            <AnimationVFXComponent
                title="Animation VFX Course"
                duration="4 Years Full-Time"
                content1="At Inframe, you can choose from various Animation & VFX programs such as B.Des in Animation & VFX, BVOC, B.Sc, One-Year Diploma, and Three-Year Diploma. If you are looking for an Animation & VFX Course in Bikaner, these courses offer comprehensive training to build your creative imagination, technical animation skills and visual effects expertise. By the end of the course, you will hold a professional portfolio and be ready to create animations, effects and digital content for multiple platforms."
                content2="You will study 2D and 3D animation, VFX basics, storyboarding, character design, motion graphics, compositing, video editing, and digital storytelling. The program also includes training on software such as Adobe After Effects, Premiere Pro, Autodesk Maya, Blender, and other VFX/compositing tools to produce high-quality animations and effects. After completion, you can aim for careers like Animator, VFX Artist, Motion Graphic Designer, Compositor, or Content Creator.
"
                description="Learn how to animate emotions, actions, and expressions.
"
                index={0}
                category=""
                software={["Photoshop", "Illustrator", "Corel Draw", "Maya", "After Effects", "Blender"]}
            />
        </div>
    );
}

export default Page;