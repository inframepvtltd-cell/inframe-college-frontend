// import JeweleryDesignComponent from "../../../components/cityComponents/JeweleryDesignComponent";

import JewelleryDesignComponent from "../../../components/cityComponents/JewelleryDesignComponent";

export const metadata = {
    title: "Jewellery Design Course in Pali | Inframe School",
    description: "Start your creative journey with the Jewellery Design Course in Pali by Inframe School. Learn­­ practical skills and build a professional portfolio."
};


function Page() {

    return (
        <div className="bg-white text-black mt-20">
            <JewelleryDesignComponent
                title="Jewellery Design Course"
                duration="3 Years Full-Time"
                content1="At Inframe, you can choose from multiple Jewellery Design programs such as B.Des in Jewellery Design, BVOC, B.Sc, One-Year Diploma, and Three-Year Diploma. If you are searching for a Jewellery Design Course in Pali, these programs are designed to help you build strong creative, technical, and design skills required for the jewellery and accessory industry. By the end of the course, you will have a professional portfolio and the confidence to design unique and market-ready jewellery pieces."
                content2="You will learn jewellery sketching, gemstone selection, metal work, design theory, jewellery fabrication techniques, trend analysis, and accessory styling. The course also includes training on modern digital tools and design software to create digital jewellery designs, mood boards, and 3D mock-ups. These skills prepare you for careers as Jewellery Designer, Accessory Designer, CAD Jewellery Artist, or Gemstone Consultant."
                description="Discover creative expression with a luxury Jewellery Design Course.
"
                index={0}
                category=""
                software={["Photoshop", "Illustrator", "Corel Draw", "Maya", "After Effects", "Blender"]}
            />
        </div>
    );
}


export default Page;