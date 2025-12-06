import AnimationVFXComponent from "../../../components/cityComponents/AnimationVFXComponent";

export const metadata = {
    title: "Animation & VFX Course in Pali | Inframe School",
    description: "Join Inframe School for industry-focused Animation & VFX Course in Pali and build strong creative and technical skills for a successful career."
};

function Page() {

    return (
        <div className="bg-white text-black mt-20">
            <AnimationVFXComponent
                title="Animation VFX Course"
                duration="4 Years Full-Time"
                content1="At Inframe, you can choose from several Animation & VFX programs such as B.Des in Animation & VFX, BVOC, B.Sc, One-Year Diploma, and Three-Year Diploma. If you are searching for an Animation & VFX Course in Pali, these courses are intended to build your creative, technical, and visual storytelling capabilities. At the end of the course, you will have a professional portfolio and the ability to create high quality animations and visual effects for various media."
                content2="
You will study 2D/3D animation, VFX fundamentals, storyboarding, character and background design, motion graphics, compositing, video editing, and digital storytelling. You will also get hands-on training with software such as Adobe After Effects, Premiere Pro, Autodesk Maya, Blender, and other popular VFX/compositing tools. These skills prepare you for careers as Animator, VFX Artist, Motion Graphic Designer, Compositor, or Multimedia Content Creator."
                description="Bring characters, creatures, and environments to life.
"
                index={0}
                category=""
                software={["Photoshop", "Illustrator", "Corel Draw", "Maya", "After Effects", "Blender"]}
            />
        </div>
    );
}

export default Page;