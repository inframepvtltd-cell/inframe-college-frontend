// import JeweleryDesignComponent from "../../../components/cityComponents/JeweleryDesignComponent";

import JewelleryDesignComponent from "../../../components/cityComponents/JewelleryDesignComponent";

export const metadata = {
    title: "Jewellery Design Course in Jaisalmer | Inframe School",
    description: "Explore creative learning with Inframe School’s Jewellery Design Course in Jaisalmer. Learn essential tools, skills, and industry techniques."
};



function Page() {

    return (
        <div className="bg-white text-black mt-20">
            <JewelleryDesignComponent
                title="Jewellery Design Course"
                duration="3 Years Full-Time"
                content1="At Inframe, you can choose from multiple Jewellery Design programs such as B.Des in Jewellery Design, BVOC, B.Sc, One-Year Diploma, and Three-Year Diploma. If you want a Jewellery Design Course in Jaisalmer, these courses provide training in creative jewellery design, technical fabrication, and aesthetic sensibility tailored for accessories and fashion jewellery. By the end of the course, you will have a strong portfolio and the confidence to design beautiful jewellery collections."
                content2="You will study jewellery sketching, gemstone and material selection, metalwork basics, design principles, trend study, and jewellery fabrication. The curriculum also includes digital design aspects to create jewellery mockups, mood boards, and design presentations. These skills open up career opportunities as Jewellery Designer, Accessory Designer, CAD Jewellery Artist, or Gemstone Consultant."
                description="Explore heritage and innovation via our Jewellery Design Course."
                index={0}
                category=""
                software={["Photoshop", "Illustrator", "Corel Draw", "Maya", "After Effects", "Blender"]}
            />
        </div>
    );
}


export default Page;