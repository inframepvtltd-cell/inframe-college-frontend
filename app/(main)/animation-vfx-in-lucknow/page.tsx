import AnimationVFXComponent from "../../../components/cityComponents/AnimationVFXComponent";

export const metadata = {
    title: "Animation & VFX Course in Lucknow | Inframe School",
    description: "Build a strong creative portfolio with Inframe School’s Animation & VFX Course in Lucknow and gain hands-on studio skills."
};

function Page() {

    return (
        <div className="bg-white text-black mt-20">
            <AnimationVFXComponent
                title="Animation VFX Course"
                duration="4 Years Full-Time"
                content1="At Inframe, you can choose from multiple Animation & VFX programs including B.Des in Animation & VFX, BVOC, B.Sc, One-Year Diploma, and Three-Year Diploma. If you are looking for an Animation & VFX Course in Lucknow, these courses are structured to build your animation creativity, VFX skills, and digital storytelling ability. Upon completion, you will have a professional portfolio and the confidence to create animations, motion graphics, and visual-effects content for various media platforms."
                content2="You will learn 2D and 3D animation, VFX fundamentals, storyboarding, character and environment design, motion graphics, compositing, video editing, and visual storytelling. The program also includes training on software such as Adobe After Effects, Premiere Pro, Autodesk Maya, Blender, and other VFX/compositing tools — equipping you to produce professional standard animations and effects. After graduation, you can seek roles as Animator, VFX Artist, Motion Graphic Designer, Compositor, or Multimedia Content Creator."
                description="Learn to blend creativity with technical precision.
"
                index={0}
                category=""
                software={["Photoshop", "Illustrator", "Corel Draw", "Maya", "After Effects", "Blender"]}
            />
        </div>
    );
}

export default Page;