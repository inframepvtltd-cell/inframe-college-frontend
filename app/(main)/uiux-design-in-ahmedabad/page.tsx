
import UIUXDesignComponent from "../../../components/cityComponents/uiuxDesignComponent";

export const metadata = {
    title: "UI UX Design Course in Ahmedabad | Inframe School",
    description: "Learn digital product design, UI tools, and UX strategy with the UI UX Design Course in Ahmedabad."
};

function Page() {

    return (
        <div className="bg-white text-black mt-20">
            <UIUXDesignComponent
                title="UI/UX Design Course"
                duration="4 Years Full-Time"
                content1="At Inframe, you can select from B.Des in UI UX Design, BVOC, B.Sc, One-Year Diploma, and Three-Year Diploma programs. If you want a UI UX Design Course in Ahmedabad, these programs offer complete training to master digital product design, research, and prototyping. You will finish your course with a professional portfolio showcasing your skills."
                content2="The course covers user research, information architecture, wireframing, prototyping, visual design principles, typography, color theory, and usability testing. You will also train on advanced tools like Figma, Adobe XD, Sketch, Illustrator, and prototyping software. These abilities open career opportunities such as UI Designer, UX Researcher, Product Designer, and UX Strategist.
"
                description="Master interface design through an advanced UI UX Course.
"
                index={0}
                category=""
                software={["Photoshop", "Illustrator", "Corel Draw", "Maya", "After Effects", "Blender"]}
            />
        </div>
    );
}

export default Page;