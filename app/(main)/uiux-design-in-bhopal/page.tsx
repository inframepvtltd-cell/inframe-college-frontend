import UIUXDesignComponent from "../../../components/cityComponents/uiuxDesignComponent";

export const metadata = {
    title: "UI UX Design Course in Bhopal | Inframe School",
    description: "Learn UI and UX principles, design tools, and prototyping with Inframe School’s UI UX Design Course in Bhopal."
};

function Page() {

    return (
        <div className="bg-white text-black mt-20">
            <UIUXDesignComponent
                title="UI/UX Design Course"
                duration="4 Years Full-Time"
                content1="At Inframe, you can choose from multiple UI UX design programs including B.Des in UI UX Design, BVOC, B.Sc, One-Year Diploma, and Three-Year Diploma. If you are searching for a UI UX Design Course in Bhopal, these programs are designed to build your creative, analytical, and digital product design skills. By the end of the course, you will have a professional portfolio showcasing your interface and experience design abilities."
                content2="The curriculum includes user research, information architecture, wireframing, prototyping, visual design systems, typography, color psychology, and usability testing. Students also gain mastery in tools like Figma, Adobe XD, Sketch, Illustrator, and prototyping platforms. After completion, you can work as a UI Designer, UX Researcher, Product Designer, or Interaction Designer.
                "
                description="Craft digital experiences with our professional UI UX Course.
"
                index={0}
                category=""
                software={["Photoshop", "Illustrator", "Corel Draw", "Maya", "After Effects", "Blender"]}
            />
        </div>
    );
}

export default Page;