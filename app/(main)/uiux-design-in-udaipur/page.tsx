import UIUXDesignComponent from "../../../components/cityComponents/uiuxDesignComponent";

export const metadata = {
    title: "UI UX Design Course in Udaipur | Inframe School",
    description: "Master user interface and experience design with the UI UX Design Course in Udaipur by Inframe School."
};

function Page() {

    return (
        <div className="bg-white text-black mt-20">
            <UIUXDesignComponent
                title="UI/UX Design Course"
                duration="4 Years Full-Time"
                content1="At Inframe, you can choose from multiple UI UX design programs such as B.Des in UI UX Design, BVOC, B.Sc, One-Year Diploma, and Three-Year Diploma. If you are looking for a UI UX Design Course in Udaipur, these programs are designed to strengthen your creative thinking, problem-solving ability, and digital design expertise. By the end of the course, you will build a strong professional portfolio and confidently design digital experiences for apps and websites."
                content2="The course covers user research, wireframing, prototyping, typography, color theory, information architecture, and usability testing. You will also learn leading design tools like Figma, Adobe XD, Sketch, Illustrator, and prototyping software for building interactive designs and user-centered interfaces. These skills open opportunities in roles like UI Designer, UX Researcher, Product Designer, and UX Analyst.
"
                description="Build confidence through a guided UI UX Course.
"
                index={0}
                category=""
                software={["Photoshop", "Illustrator", "Corel Draw", "Maya", "After Effects", "Blender"]}
            />
        </div>
    );
}

export default Page;