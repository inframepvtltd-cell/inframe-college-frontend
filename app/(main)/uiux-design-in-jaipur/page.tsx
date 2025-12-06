import UIUXDesignComponent from "../../../components/cityComponents/uiuxDesignComponent";

export const metadata = {
    title: "UI UX Design Course in Jaipur | Inframe School",
    description: "Master user interface and experience design with the UI UX Design Course in Udaipur by Inframe School."
};

function Page() {

    return (
        <div className="bg-white text-black mt-20">
            <UIUXDesignComponent
                title="UI/UX Design Course"
                duration="4 Years Full-Time"
                content1="At Inframe, you can choose from multiple UI UX design programs such as B.Des in UI UX Design, BVOC, B.Sc, One-Year Diploma, and Three-Year Diploma. If you want a UI UX Design Course in Jaipur, these programs offer complete training to build your creative, analytical, and digital design skills. By the end of the course, you will have a professional portfolio and the capability to design high-quality digital products."
                content2="
                You will learn user research, wireframing, prototyping, information architecture, visual design systems, typography, color psychology, and usability testing. The course also includes hands-on training on Figma, Adobe XD, Sketch, Illustrator, and other industry tools, helping you create engaging user interfaces and interactive prototypes. These skills prepare you for careers like UI Designer, UX Analyst, Product Designer, and Interaction Designer.
"
                description="Learn Figma and prototyping in a next-gen UI UX Course.
"
                index={0}
                category=""
                software={["Photoshop", "Illustrator", "Corel Draw", "Maya", "After Effects", "Blender"]}
            />
        </div>
    );
}

export default Page;