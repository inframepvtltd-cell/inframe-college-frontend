import UIUXDesignComponent from "../../../components/cityComponents/uiuxDesignComponent";

export const metadata = {
    title: "UI UX Design Course in Delhi | Inframe School",
    description: "Learn UI UX tools, research, and interface design with Inframe School’s UI UX Design Course in Delhi."
};

function Page() {

    return (
        <div className="bg-white text-black mt-20">
            <UIUXDesignComponent
                title="UI/UX Design Course"
                duration="4 Years Full-Time"
                content1="At Inframe, you can choose from multiple UI UX programs such as B.Des in UI UX Design, BVOC, B.Sc, One-Year Diploma, and Three-Year Diploma. If you want a UI UX Design Course in Delhi, these programs offer complete training to develop creativity, problem-solving, and digital product design expertise. You will graduate with a strong portfolio and confidence to design modern digital experiences."
                content2="The course includes user research, wireframing, prototyping, visual design principles, typography, color theory, and usability testing. Students also learn industry tools like Figma, Adobe XD, Sketch, Illustrator, and prototyping software. These skills allow you to work in roles like UI Designer, UX Researcher, Product Designer, and UX Strategist.
"
                description="Create stunning interfaces with a curated UI UX Course.
"
                index={0}
                category=""
                software={["Photoshop", "Illustrator", "Corel Draw", "Maya", "After Effects", "Blender"]}
            />
        </div>
    );
}

export default Page;