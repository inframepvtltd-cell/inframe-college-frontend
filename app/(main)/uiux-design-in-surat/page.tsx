import UIUXDesignComponent from "../../../components/cityComponents/uiuxDesignComponent";

export const metadata = {
    title: "UI UX Design Course in Surat | Inframe School",
    description: "Build practical UI and UX design skills with Inframe School’s UI UX Design Course in Surat. Perfect for tech creatives."
};

function Page() {

    return (
        <div className="bg-white text-black mt-20">
            <UIUXDesignComponent
                title="UI/UX Design Course"
                duration="4 Years Full-Time"
                content1="At Inframe, multiple UI UX design programs such as B.Des, BVOC, B.Sc, One-Year Diploma, and Three-Year Diploma are available. If you are searching for a UI UX Design Course in Surat, these programs help you build strong UI and UX design abilities for the digital industry. By the end of the program, you will have a strong portfolio and confidence to create user-friendly digital products."
                content2="Students learn user research, wireframing, prototyping, visual design systems, typography, color strategy, and usability testing. Hands-on training is provided in tools such as Figma, Adobe XD, Sketch, Illustrator, and prototyping platforms. These skills prepare you for roles like UI Designer, UX Analyst, Interaction Designer, and Product Designer."
                description="Create meaningful user journeys with a UI UX Course.
"
                index={0}
                category=""
                software={["Photoshop", "Illustrator", "Corel Draw", "Maya", "After Effects", "Blender"]}
            />
        </div>
    );
}

export default Page;