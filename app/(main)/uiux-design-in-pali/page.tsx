import UIUXDesignComponent from "../../../components/cityComponents/uiuxDesignComponent";

export const metadata = {
    title: "UI UX Design Course in Pali | Inframe School",
    description: "Learn user interface and experience design with the UI UX Design Course in Pali by Inframe School. Build real-world design skills."
};

function Page() {

    return (
        <div className="bg-white text-black mt-20">
            <UIUXDesignComponent
                title="UI/UX Design Course"
                duration="4 Years Full-Time"
                content1="At Inframe, you can choose from multiple UI UX design programs such as B.Des in UI UX Design, BVOC, B.Sc, One-Year Diploma, and Three-Year Diploma. If you are looking for a UI UX Design Course in Pali, these programs are designed to enhance your creative and technical abilities for modern digital design. By the end of the course, you will have a strong portfolio and the confidence to build user-centered digital products."
                content2="You will study user research, information architecture, wireframing, prototyping, visual design principles, typography, color theory, and usability testing. You will also work with advanced tools including Figma, Adobe XD, Sketch, Illustrator, and prototyping platforms to create interactive digital experiences. After completion, you can choose career roles like UI Designer, UX Researcher, Product Designer, or Interaction Designer."
                description="Develop your design mindset in a UI UX Course.
"
                index={0}
                category=""
                software={["Photoshop", "Illustrator", "Corel Draw", "Maya", "After Effects", "Blender"]}
            />
        </div>
    );
}

export default Page;