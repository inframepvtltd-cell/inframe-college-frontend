import UIUXDesignComponent from "../../../components/cityComponents/uiuxDesignComponent";

export const metadata = {
    title: "UI UX Design Course in Jaisalmer | Inframe School",
    description: "Learn wireframing, prototyping, and digital interface design with Inframe School’s UI UX Design Course in Jaisalmer"
};

function Page() {

    return (
        <div className="bg-white text-black mt-20">
            <UIUXDesignComponent
                title="UI/UX Design Course"
                duration="4 Years Full-Time"
                content1="At Inframe, you can choose from multiple UI UX design programs such as B.Des in UI UX Design, BVOC, B.Sc, One-Year Diploma, and Three-Year Diploma. If you are searching for a UI UX Design Course in Jaisalmer, these programs help you build strong creative, analytical, and technical skills required in today’s digital world. By the end of the course, you will have a professional portfolio and the confidence to create user-friendly digital experiences across websites and mobile apps."
                content2="You will learn user research, information architecture, wireframing, prototyping, visual design, typography, color strategy, and usability testing. The program also offers training on industry tools such as Figma, Adobe XD, Sketch, Illustrator, and prototyping software, enabling you to design intuitive interfaces and interactive prototypes. These skills open opportunities as a UI Designer, UX Researcher, Product Designer, or Interaction Designer."
                description="Understand users deeply through our UI UX Course.
"
                index={0}
                category=""
                software={["Photoshop", "Illustrator", "Corel Draw", "Maya", "After Effects", "Blender"]}
            />
        </div>
    );
}

export default Page;