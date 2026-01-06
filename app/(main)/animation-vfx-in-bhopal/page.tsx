import AnimationVFXComponent from "../../../components/cityComponents/AnimationVFXComponent";

export const metadata = {
    title: "Animation & VFX Course in Bhopal | Inframe School",
    description: "Start your creative journey with the Animation & VFX Course in Bhopal at Inframe School, featuring practical studio learning"
};

function Page() {

    return (
        <div className="bg-white text-black mt-20">
            <AnimationVFXComponent
                title="Animation VFX Course"
                duration="4 Years Full-Time"
                content1="At Inframe, you can choose from various Animation & VFX programs such as B.Des in Animation & VFX, BVOC, B.Sc, One-Year Diploma, and Three-Year Diploma. If you are interested in an Animation & VFX Course in Bhopal, these courses are designed to help you build strong technical animation skills, creative storytelling, and digital content creation capabilities. By the end of the course, you will have a professional portfolio and the ability to create animations, motion graphics, and visual-effects content for films, ads, and online media."
                content2="You will study 2D and 3D animation, VFX basics, storyboarding, character/background design, motion graphics, compositing, video editing, and visual storytelling. The program also includes practical training on software tools like Adobe After Effects, Premiere Pro, Autodesk Maya, Blender, and other VFX/compositing tools to produce high-quality animations and effects. After finishing the course, you can work as Animator, VFX Artist, Motion Graphic Designer, Compositor, or Multimedia Content Creator."
                description="Learn industry-standard tools used by top studios worldwide.
"
                index={0}
                category=""
                software={["Photoshop", "Illustrator", "Corel Draw", "Maya", "After Effects", "Blender"]}
            />
        </div>
    );
}

export default Page;