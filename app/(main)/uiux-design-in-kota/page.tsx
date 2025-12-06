import UIUXDesignComponent from "../../../components/cityComponents/uiuxDesignComponent";

export const metadata = {
    title: "UI UX Design Course in Kota | Inframe School",
    description: "Build strong UI and UX design skills with the UI UX Design Course in Kota. Learn tools, research, and interface design."
};

function Page() {

    return (
        <div className="bg-white text-black mt-20">
            <UIUXDesignComponent
                title="UI/UX Design Course"
                duration="4 Years Full-Time"
                content1="At Inframe, you can choose from multiple UI UX design programs such as B.Des in UI UX Design, BVOC, B.Sc, One-Year Diploma, and Three-Year Diploma. If you are searching for a UI UX Design Course in Kota, these programs help you build strong creative, analytical, and technical skills required for modern digital design. By the end of the course, you will have a professional portfolio and the confidence to design intuitive, user-friendly digital products."
                content2="You will learn user research, information architecture, wireframing, prototyping, visual design, typography, color theory, and usability testing. The course also provides hands-on training on Figma, Adobe XD, Sketch, Illustrator, and advanced prototyping tools to help you design intuitive interfaces and interactive user flows. These skills prepare you for careers such as UI Designer, UX Researcher, Product Designer, and Interaction Designer.
"
                description="Build job-ready skills with a practical UI UX Course.
"
                index={0}
                category=""
                software={["Photoshop", "Illustrator", "Corel Draw", "Maya", "After Effects", "Blender"]}
            />
        </div>
    );
}

export default Page;