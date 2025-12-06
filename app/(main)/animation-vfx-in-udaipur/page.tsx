import AnimationVFXComponent from "../../../components/cityComponents/AnimationVFXComponent";

export const metadata = {
    title: "Animation & VFX Course in Udaipur | Inframe School",
    description: "Learn Animation & VFX in Udaipur with Inframe School and get hands-on training in animation, motion graphics, and visual effects."
};

function Page() {

    return (
        <div className="bg-white text-black mt-20">
            <AnimationVFXComponent
                title="Animatino VFX Course"
                duration="4 Years Full-Time"
                content1="At Inframe, you can choose from multiple Animation & VFX programs such as B.Des in Animation & VFX, BVOC, B.Sc, One-Year Diploma, and Three-Year Diploma. If you are searching for an Animation & VFX Course in Udaipur, these courses aim to develop your creativity, technical animation skills, and visual storytelling abilities. Upon completion, you will have a professional portfolio and confidence to design animations, motion graphics, and visual-effects content for varied media platforms."
                content2="You will learn 2D/3D animation, VFX fundamentals, storyboarding, character and environment design, motion graphics, compositing, editing, and digital storytelling. The curriculum includes training on tools like Adobe After Effects, Premiere Pro, Autodesk Maya, Blender, and other VFX/compositing software — enabling you to deliver industry-standard animations and effects. These skills open up opportunities as Animator, VFX Artist, Motion Graphic Designer, Compositor, or Multimedia Designer."
                description="Turn your passion for animation into a professional career."
                index={0}
                category=""
                software={["Photoshop", "Illustrator", "Corel Draw", "Maya", "After Effects", "Blender"]}
            />
        </div>
    );
}

export default Page;