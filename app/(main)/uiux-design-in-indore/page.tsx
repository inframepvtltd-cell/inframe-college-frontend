import UIUXDesignComponent from "../../../components/cityComponents/uiuxDesignComponent";

export const metadata = {
    title: "UI UX Design Course in Indore | Inframe School",
    description: "Build app and web interface design skills with the UI UX Design Course in Indore by Inframe School."
};

function Page() {

    return (
        <div className="bg-white text-black mt-20">
            <UIUXDesignComponent
                title="UI/UX Design Course"
                duration="4 Years Full-Time"
                content1="At Inframe, you can choose from multiple UI UX programs such as B.Des in UI UX Design, BVOC, B.Sc, One-Year Diploma, and Three-Year Diploma. If you are looking for a UI UX Design Course in Indore, these programs provide strong design foundations along with advanced digital skills. By course completion, you will have a polished portfolio and the ability to design user-friendly digital interfaces."
                content2="You will study user research, wireframing, prototyping, information architecture, visual design, typography, color systems, and usability testing. You will also get hands-on training in software like Figma, Adobe XD, Sketch, Illustrator, and prototyping tools. These skills prepare you for careers such as UI Designer, UX Analyst, Product Designer, and Interaction Designer."
                description="Train with experts in a high-end UI UX Course.
"
                index={0}
                category=""
                software={["Photoshop", "Illustrator", "Corel Draw", "Maya", "After Effects", "Blender"]}
            />
        </div>
    );
}

export default Page;