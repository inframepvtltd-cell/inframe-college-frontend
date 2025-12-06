import UIUXDesignComponent from "../../../components/cityComponents/uiuxDesignComponent";

export const metadata = {
    title: "UI UX Design Course in Agra | Inframe School",
    description: "Build UI and UX design skills with the UI UX Design Course in Agra. Learn wireframes, prototypes, and user testing."
};

function Page() {

    return (
        <div className="bg-white text-black mt-20">
            <UIUXDesignComponent
                title="UI/UX Design Course"
                duration="4 Years Full-Time"
                content1="At Inframe, you can choose from various UI UX programs including B.Des in UI UX Design, BVOC, B.Sc, One-Year Diploma, and Three-Year Diploma. If you are searching for a UI UX Design Course in Agra, these programs help you build strong digital design and user experience skills. By the end of the course, you will have a professional portfolio and the ability to design user-focused digital solutions."
                content2="You will study user research, information architecture, wireframing, prototyping, visual design, typography, color structure, and usability testing. Training includes tools such as Figma, Adobe XD, Sketch, Illustrator, and advanced prototyping software. These skills open career paths like UI Designer, UX Researcher, Interaction Designer, and Product Designer."
                description="Design world-class user experiences with a premium UI UX Course."
                index={0}
                category=""
                software={["Photoshop", "Illustrator", "Corel Draw", "Maya", "After Effects", "Blender"]}
            />
        </div>
    );
}

export default Page;