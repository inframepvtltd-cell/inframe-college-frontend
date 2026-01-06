// import JeweleryDesignComponent from "../../../components/cityComponents/JeweleryDesignComponent";

import JewelleryDesignComponent from "../../../components/cityComponents/JewelleryDesignComponent";

export const metadata = {
    title: "Jewellery Design Course in Jaipur | Inframe School",
    description: "Learn jewellery artistry with Inframe School’s Jewellery Design Course in Jaipur. Perfect for beginners and aspiring professionals."
};



function Page() {

    return (
        <div className="bg-white text-black mt-20">
            <JewelleryDesignComponent
                title="Jewellery Design Course"
                duration="3 Years Full-Time"
                content1="At Inframe, you can choose from a range of Jewellery Design programs such as B.Des in Jewellery Design, BVOC, B.Sc, One-Year Diploma, and Three-Year Diploma. If you are considering a Jewellery Design Course in Jaipur, these programs aim to refine your artistic sensibilities, technical craftsmanship, and jewellery design knowledge. By the end of the course, you will have a strong portfolio and the confidence to design custom jewellery, contemporary accessories, and traditional pieces."
                content2="You will learn jewellery sketching, gemstone and material study, metalwork basics, design theory, jewellery fabrication, and trend study. The course also includes digital design training for creating jewellery mockups, mood boards, and design presentations. After graduation, you can work as a Jewellery Designer, Accessory Designer, CAD Jewellery Artist, or Gem & Metal Consultant."
                description="Train in modern tools through a digital Jewellery Design Course.
"
                index={0}
                category=""
                software={["Photoshop", "Illustrator", "Corel Draw", "Maya", "After Effects", "Blender"]}
            />
        </div>
    );
}


export default Page;