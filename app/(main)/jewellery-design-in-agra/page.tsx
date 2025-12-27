// import JewelleryDesignComponent from "../../../components/cityComponents/JewelleryDesignComponent";

import JewelleryDesignComponent from "../../../components/cityComponents/JewelleryDesignComponent";

export const metadata = {
    title: "Jewellery Design Course in Agra | Inframe School",
    description: "Join Inframe School’s Jewellery Design Course in Agra to gain practical design skills and start your jewellery design career."
};

function Page() {


    return (
        <div className="bg-white text-black mt-20">
            <JewelleryDesignComponent
                title="Jewellery Design Course"
                duration="3 Years Full-Time"
                content1="At Inframe, you can choose from various Jewellery Design programs such as B.Des in Jewellery Design, BVOC, B.Sc, One-Year Diploma, and Three-Year Diploma. If you are looking for a Jewellery Design Course in Agra, these courses aim to build your jewellery design skills, combine creativity with technical craftsmanship, and hone your understanding of materials and trends. By the end of the program, you will have a professional portfolio and the confidence to design bespoke jewellery pieces."
                content2="
You will study jewellery sketching, gemstone and metal selection, design fundamentals, jewellery fabrication techniques, accessory styling, and trend research. The course also offers digital design training to produce jewellery mockups, mood boards, and design presentations. These skills prepare you for careers like Jewellery Designer, Accessory Designer, CAD Jewellery Artist, or Gem & Metal Consultant."
                description="Discover the art of luxury craftsmanship with a Jewellery Design Course.
"
                index={0}
                category=""
                software={["Photoshop", "Illustrator", "Corel Draw", "Maya", "After Effects", "Blender"]}
            />
        </div>
    );
}

export default Page;