// import JeweleryDesignComponent from "../../../components/cityComponents/JeweleryDesignComponent";

import JewelleryDesignComponent from "../../../components/cityComponents/JewelleryDesignComponent";

export const metadata = {
    title: "Jewellery Design Course in Sikar | Inframe School",
    description: "Learn jewellery crafting and digital design with Inframe School’s Jewellery Design Course in Sikar. Perfect for creative career growth."
};



function Page() {

    return (
        <div className="bg-white text-black mt-20">
            <JewelleryDesignComponent
                title="Jewellery Design Course"
                duration="3 Years Full-Time"
                content1="At Inframe, you can choose from many Jewellery Design programs such as B.Des in Jewellery Design, BVOC, B.Sc, One-Year Diploma, and Three-Year Diploma. If you are searching for a Jewellery Design Course in Sikar, these programs help you build strong creative and technical jewellery design skills. By the end of the program, you will have a professional portfolio and the confidence to create unique jewellery collections."
                content2="The curriculum covers jewellery sketching, gemstone and material study, metalwork techniques, design fundamentals, jewellery fabrication, and trend research. You will also get training on digital design tools for making jewellery designs, mood boards, and 3D mock-ups. These skills prepare you for roles such as Jewellery Designer, Accessory Designer, CAD Jewellery Artist, or Gemstone Consultant."
                description="Learn 3D modelling and CAD in a professional Jewellery Design Course."
                index={0}
                category=""
                software={["Photoshop", "Illustrator", "Corel Draw", "Maya", "After Effects", "Blender"]}
            />
        </div>
    );
}


export default Page;