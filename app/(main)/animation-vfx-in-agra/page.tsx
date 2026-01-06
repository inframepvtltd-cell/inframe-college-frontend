import AnimationVFXComponent from "../../../components/cityComponents/AnimationVFXComponent";

export const metadata = {
    title: "Animation & VFX Course in Agra | Inframe School",
    description: "Join the Animation & VFX Course in Agra by Inframe School and learn advanced animation, VFX tools, and production techniques."
};

function Page() {

    return (
        <div className="bg-white text-black mt-20">
            <AnimationVFXComponent
                title="Animation VFX Course"
                duration="4 Years Full-Time"
                content1="At Inframe, you can choose from several Animation & VFX programs such as B.Des in Animation & VFX, BVOC, B.Sc, One-Year Diploma, and Three-Year Diploma. If you are searching for an Animation & VFX Course in Agra, these courses aim to provide you with creative, technical, and storytelling skills needed for animation and VFX industry. By the end of the course, you will have a professional portfolio and the capability to design animations, motion graphics, and visual-effects content for films, ads, and digital media."
                content2="You will learn 2D and 3D animation, VFX basics, storyboarding, character and background design, motion graphics, compositing, video editing, and digital storytelling. The course also includes hands-on training on software like Adobe After Effects, Premiere Pro, Autodesk Maya, Blender, and other VFX/compositing tools. These skills make you eligible for careers such as Animator, VFX Artist, Motion Graphic Designer, Compositor, or Multimedia Content Creator."
                description="Master the art of visual storytelling with our Animation & VFX course."
                index={0}
                category=""
                software={["Photoshop", "Illustrator", "Corel Draw", "Maya", "After Effects", "Blender"]}
            />
        </div>
    );
}

export default Page;