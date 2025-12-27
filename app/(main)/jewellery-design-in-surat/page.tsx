// import JeweleryDesignComponent from "../../../components/cityComponents/JeweleryDesignComponent";

import JewelleryDesignComponent from "../../../components/cityComponents/JewelleryDesignComponent";

export const metadata = {
    title: "Jewellery Design Course in Surat | Inframe School",
    description: "Join Inframe School’s Jewellery Design Course in Surat to learn jewellery sketching, CAD design, and practical industry skills."
};



function Page() {

    return (
        <div className="bg-white text-black mt-20">
            <JewelleryDesignComponent
                title="Jewellery Design Course"
                duration="3 Years Full-Time"
                content1="At Inframe, you can choose from multiple Jewellery Design programs such as B.Des in Jewellery Design, BVOC, B.Sc, One-Year Diploma, and Three-Year Diploma. If you are searching for a Jewellery Design Course in Surat, these courses aim to develop your jewellery design sensibility, technical jewellery-making skills, and creative design thinking. By the end of the program, you will have a strong portfolio and the confidence to design contemporary and traditional jewellery pieces."
                content2="You will learn jewellery sketching, gemstone and material study, metalwork basics, design fundamentals, jewellery fabrication techniques, accessory styling, and trend research. The curriculum also includes digital design training to create jewellery mockups, mood boards, and presentation-ready designs. With these abilities, you can pursue careers like Jewellery Designer, Accessory Designer, CAD Jewellery Artist, or Gem & Metal Consultant.
"
                description="Shape elegant collections with a next-gen Jewellery Design Course.
"
                index={0}
                category=""
                software={["Photoshop", "Illustrator", "Corel Draw", "Maya", "After Effects", "Blender"]}
            />
        </div>
    );
}


export default Page;