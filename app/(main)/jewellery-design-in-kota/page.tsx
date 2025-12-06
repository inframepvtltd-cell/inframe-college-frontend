// import JeweleryDesignComponent from "../../../components/cityComponents/JeweleryDesignComponent";

import JewelleryDesignComponent from "../../../components/cityComponents/JewelleryDesignComponent";

export const metadata = {
    title: "Jewellery Design Course in Kota | Inframe School",
    description: "Join the Jewellery Design Course in Kota by Inframe School to learn professional jewellery design, tools, and modern techniques."
};



function Page() {

    return (
        <div className="bg-white text-black mt-20">
            <JewelleryDesignComponent
                title="Jewellery Design Course"
                duration="3 Years Full-Time"
                content1="At Inframe, you can choose from multiple Jewellery Design programs such as B.Des in Jewellery Design, BVOC, B.Sc, One-Year Diploma, and Three-Year Diploma. If you are searching for a Jewellery Design Course in Kota, these courses are structured to build your design creativity, technical skills, and jewellery craftsmanship. Upon completion, you will have a professional portfolio and the confidence to design fashionable and market-ready jewellery."
                content2="You will learn jewellery sketching, gemstone and metalwork study, design fundamentals, jewellery fabrication techniques, accessory styling, and trend analysis. The course also provides digital design training for jewellery mockups, mood boards, and presentations. These skills prepare you for roles like Jewellery Designer, CAD Jewellery Artist, Accessory Designer, or Gem & Metal Consultant."
                description="Develop artisan-level skills with a detailed Jewellery Design Course.
"
                index={0}
                category=""
                software={["Photoshop", "Illustrator", "Corel Draw", "Maya", "After Effects", "Blender"]}
            />
        </div>
    );
}


export default Page;