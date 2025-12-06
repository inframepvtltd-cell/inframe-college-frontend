import AnimationVFXComponent from "../../../components/cityComponents/AnimationVFXComponent";

export const metadata = {
    title: "Animation & VFX Course in Jaisalmer | Inframe School",
    description: "Join Inframe School’s Animation & VFX Course in Jaisalmer and learn advanced filmmaking, animation, and visual effects skills."
};

function Page() {

    return (
        <div className="bg-white text-black mt-20">
            <AnimationVFXComponent
                title="Animation VFX Course"
                duration="4 Years Full-Time"
                content1="At Inframe, you can choose from multiple Animation & VFX programs including B.Des in Animation & VFX, BVOC, B.Sc, One-Year Diploma, and Three-Year Diploma. If you want an Animation & VFX Course in Jaisalmer, these courses are built to develop your storytelling, visual creativity and technical animation & VFX skills. By the end of the program, you will have a polished portfolio and the confidence to create animated and visual-effects driven content for films, ads, and digital media."
                content2="You will learn 2D and 3D animation, VFX principles, storyboarding, character and background design, motion graphics, compositing, video editing, and narrative visualization. The course includes training on industry software such as Adobe After Effects, Premiere Pro, Autodesk Maya, Blender, and other VFX tools, equipping you to deliver professional-grade animations and visual effects. These skills enable you to work as Animator, VFX Artist, Motion Graphic Designer, Compositor, or Multimedia Designer."
                description="Discover the power of lighting, texturing, and CGI.
"
                index={0}
                category=""
                software={["Photoshop", "Illustrator", "Corel Draw", "Maya", "After Effects", "Blender"]}
            />
        </div>
    );
}

export default Page;