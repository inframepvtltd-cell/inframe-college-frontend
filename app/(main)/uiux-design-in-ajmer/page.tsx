import UIUXDesignComponent from "../../../components/cityComponents/uiuxDesignComponent";

export const metadata = {
    title: "UI UX Design Course in Ajmer | Inframe School",
    description: "Master UI and UX tools, wireframes, and prototypes with Inframe School’s UI UX Design Course in Ajmer."
};

function Page() {

    return (
        <div className="bg-white text-black mt-20">
            <UIUXDesignComponent
                title="UI/UX Design Course"
                duration="4 Years Full-Time"
                content1="At Inframe, you can choose from multiple UI UX design programs such as B.Des in UI UX Design, BVOC, B.Sc, One-Year Diploma, and Three-Year Diploma. If you are searching for a UI UX Design Course in Ajmer, these programs are designed to help you build strong creative, analytical, and technical skills required in the digital design industry. By the end of the course, you will have a professional portfolio and the confidence to design user-friendly digital experiences for websites, mobile apps, and software products."
                content2="You will learn user research, information architecture, wireframing, prototyping, visual design, typography, color theory, and usability testing. The course also includes advanced training on modern digital tools like Figma, Adobe XD, Sketch, Illustrator, and prototyping software to create intuitive interfaces, interactive prototypes, and user journey flows. These skills prepare you to work confidently as a UI Designer, UX Researcher, Product Designer, or Interaction Designer in leading companies."
                description="Learn user psychology with a modern UI UX Course.
"
                index={0}
                category=""
                software={["Photoshop", "Illustrator", "Corel Draw", "Maya", "After Effects", "Blender"]}
            />
        </div>
    );
}

export default Page;