// import JewelleryDesignComponent from "../../../components/cityComponents/JewelleryDesignComponent";

import JewelleryDesignComponent from "../../../components/cityComponents/JewelleryDesignComponent";

export const metadata = {
    title: "Jewellery Design Course in Bhopal | Inframe School",
    description: "Learn modern jewellery design skills with Inframe School’s Jewellery Design Course in Bhopal. Start your creative career today."
};

function Page() {

    return (
        <div className="bg-white text-black mt-20">
            <JewelleryDesignComponent
                title="Jewellery Design Course"
                duration="3 Years Full-Time"
                content1="At Inframe, you can choose from several Jewellery Design programs such as B.Des in Jewellery Design, BVOC, B.Sc, One-Year Diploma, and Three-Year Diploma. If you are interested in a Jewellery Design Course in Bhopal, these courses help you build creative vision, technical skills, and design understanding necessary for jewellery design industry. By the end of the course, you will have a professional portfolio and the confidence to design jewellery pieces suitable for both fashion and traditional wear."
                content2="You will learn jewellery sketching, gemstone and material study, metalwork basics, design theory, jewellery fabrication, and trend research. The course also includes digital design training for jewellery mockups, mood boards, and design presentations. With these competencies, you can pursue careers as Jewellery Designer, Accessory Designer, CAD Jewellery Artist, or Gem & Metal Consultant."
                description="Create timeless pieces with an advanced Jewellery Design Course.
"
                index={0}
                category=""
                software={["Photoshop", "Illustrator", "Corel Draw", "Maya", "After Effects", "Blender"]}
            />
        </div>
    );
}


export default Page;