// import JewelleryDesignComponent from "../../../components/cityComponents/JewelleryDesignComponent";

import JewelleryDesignComponent from "../../../components/cityComponents/JewelleryDesignComponent";

export const metadata = {
    title: "Jewellery Design Course in Ajmer | Inframe School",
    description: "Join Inframe School’s Jewellery Design Course in Ajmer to master modern tools, techniques, and design skills for a successful career."
};



function Page() {
    return (
        <div className="bg-white text-black mt-20">
            <JewelleryDesignComponent
                title="Jewellery Design Course"
                duration="3 Years Full-Time"
                content1="At Inframe, you can choose from multiple Jewellery Design programs such as B.Des in Jewellery Design, BVOC, B.Sc, One-Year Diploma, and Three-Year Diploma. If you are looking for a Jewellery Design Course in Ajmer, these courses are structured to build your creativity, technical skill, and design sensibility for jewellery and accessories. By course completion, you will have a polished portfolio and the confidence to design handcrafted and contemporary jewellery pieces."
                content2="You will learn jewellery sketching, material and gemstone study, metalwork basics, design principles, jewellery fabrication, trend research, and accessory styling. The program also includes digital design training to create jewellery mockups, mood boards, and design presentations. After finishing the course, you can work as a Jewellery Designer, CAD Jewellery Artist, Accessory Designer, or Gemstone & Metal Consultant."
                description="Master gemstones and metals with a professional Jewellery Design Course.
"
                index={0}
                category=""
                software={["Photoshop", "Illustrator", "Corel Draw", "Maya", "After Effects", "Blender"]}
            />
        </div>
    );
}


export default Page;