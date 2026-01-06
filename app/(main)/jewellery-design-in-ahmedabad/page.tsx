// import JewelleryDesignComponent from "../../../components/cityComponents/JewelleryDesignComponent";

import JewelleryDesignComponent from "../../../components/cityComponents/JewelleryDesignComponent";

export const metadata = {
    title: "Jewellery Design Course in Ahmedabad | Inframe School",
    description: "Develop professional jewellery design skills with Inframe School’s Jewellery Design Course in Ahmedabad. Learn tools and techniques."
};

function Page() {


    return (
        <div className="bg-white text-black mt-20">
            <JewelleryDesignComponent
                title="Jewellery Design Course"
                duration="3 Years Full-Time"
                content1="At Inframe, you can choose from various Jewellery Design programs such as B.Des in Jewellery Design, BVOC, B.Sc, One-Year Diploma, and Three-Year Diploma. If you are looking for a Jewellery Design Course in Ahmedabad, these courses are designed to build your creative, technical, and design skills needed in jewellery and accessory industry. By the end of the course, you will have a professional portfolio and the confidence to design both traditional and modern jewellery pieces."
                content2="You will study jewellery sketching, gemstone and metal selection, material study, design theory, jewellery fabrication techniques, accessory styling, and trend research. The program also provides digital design training to create jewellery mockups, mood boards, and design presentations. After completion, you can work as Jewellery Designer, CAD Jewellery Artist, Accessory Designer, or Gem & Metal Consultant.
"
                description="Transform precious ideas into reality through a Jewellery Design Course.
"
                index={0}
                category=""
                software={["Photoshop", "Illustrator", "Corel Draw", "Maya", "After Effects", "Blender"]}
            />
        </div>
    );
}

export default Page;