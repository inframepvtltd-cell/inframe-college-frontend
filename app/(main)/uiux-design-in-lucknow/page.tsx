import UIUXDesignComponent from "../../../components/cityComponents/uiuxDesignComponent";

export const metadata = {
    title: "UI UX Design Course in Lucknow | Inframe School",
    description: "Learn UI UX principles, design thinking, and prototyping with Inframe School’s UI UX Design Course in Lucknow."
};

function Page() {

    return (
        <div className="bg-white text-black mt-20">
            <UIUXDesignComponent
                title="UI/UX Design Course"
                duration="4 Years Full-Time"
                content1="At Inframe, multiple UI UX design programs such as B.Des, BVOC, B.Sc, One-Year Diploma, and Three-Year Diploma are available. If you are looking for a UI UX Design Course in Lucknow, these programs help you develop creative thinking, design strategy, and technical skills for the digital industry. You will graduate with a strong portfolio and the confidence to design digital products."
                content2="You will learn user research, wireframing, prototyping, visual design systems, typography, color psychology, and usability testing. The curriculum also includes hands-on training on Figma, Adobe XD, Sketch, Illustrator, and prototyping tools. These skills prepare you for roles such as UI Designer, UX Analyst, Product Designer, and Interaction Designer.
"
                description="Explore interaction design with an immersive UI UX Course.
"
                index={0}
                category=""
                software={["Photoshop", "Illustrator", "Corel Draw", "Maya", "After Effects", "Blender"]}
            />
        </div>
    );
}

export default Page;