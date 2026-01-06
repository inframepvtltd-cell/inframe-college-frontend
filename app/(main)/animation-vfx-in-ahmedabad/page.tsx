import AnimationVFXComponent from "../../../components/cityComponents/AnimationVFXComponent";

export const metadata = {
    title: "Animation & VFX Course in Ahmedabad | Inframe School",
    description: "Master user interface and experience design with the UI UX Design Course in Udaipur by Inframe School."
};

function Page() {

    return (
        <div className="bg-white text-black mt-20">
            <AnimationVFXComponent
                title="Animation VFX Course"
                duration="4 Years Full-Time"
                content1="At Inframe, you can choose from various Animation & VFX programs such as B.Des in Animation & VFX, BVOC, B.Sc, One-Year Diploma, and Three-Year Diploma. If you are interested in a Animation & VFX Course in Ahmedabad, these courses offer full-spectrum training in animation, VFX, motion graphics, and digital content creation. By the end of the course, you will have a strong portfolio and the skills to create animations and visual effects for films, ads and online platforms."
                content2="You will study 2D/3D animation, VFX fundamentals, storyboarding, character/background design, motion graphics, compositing, video editing, and digital storytelling. The curriculum includes hands-on training with software and tools like Adobe After Effects, Premiere Pro, Autodesk Maya, Blender, and other VFX/compositing tools — enabling you to deliver high-quality animations and effects. These skills make you eligible for career roles such as Animator, VFX Artist, Motion Graphic Designer, Compositor, or Multimedia Designer."
                description="Bring imagination to life through professional animation techniques.
"
                index={0}
                category=""
                software={["Photoshop", "Illustrator", "Corel Draw", "Maya", "After Effects", "Blender"]}
            />
        </div>
    );
}

export default Page;