import UIUXDesignComponent from "../../../components/cityComponents/uiuxDesignComponent";

export const metadata = {
    title: "UI UX Design Course in Sikar | Inframe School",
    description: "Learn modern UI and UX skills with Inframe School’s UI UX Design Course in Sikar. Ideal for creative tech learners."
};

function Page() {

    return (
        <div className="bg-white text-black mt-20">
            <UIUXDesignComponent
                title="UI/UX Design Course"
                duration="4 Years Full-Time"
                content1="At Inframe, you can choose from multiple UI UX design programs such as B.Des in UI UX Design, BVOC, B.Sc, One-Year Diploma, and Three-Year Diploma. If you are searching for a UI UX Design Course in Sikar, these programs help you develop strong creative and problem-solving abilities in digital product design. By the end of the course, you will be ready to design real-world digital interfaces supported by a professional portfolio."
                content2="The curriculum includes user research, wireframing, information architecture, visual layout design, color theory, typography, prototyping, and usability testing. Students also gain expertise in tools like Figma, Adobe XD, Sketch, Illustrator, and prototyping software. After completing the course, you can work as a UI Designer, UX Researcher, Product Designer, or Interaction Designer."
                description="Shape digital products through a refined UI UX Course.
"
                index={0}
                category=""
                software={["Photoshop", "Illustrator", "Corel Draw", "Maya", "After Effects", "Blender"]}
            />
        </div>
    );
}

export default Page;