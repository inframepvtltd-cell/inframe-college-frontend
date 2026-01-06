// import JeweleryDesignComponent from "../../../components/cityComponents/JeweleryDesignComponent";

import JewelleryDesignComponent from "../../../components/cityComponents/JewelleryDesignComponent";

export const metadata = {
    title: "Jewellery Design Course in Delhi | Inframe School",
    description: "Build design expertise with the Jewellery Design Course in Delhi by Inframe School. Learn tools, techniques, and industry skills."
};



function Page() {
    return (
        <div className="bg-white text-black mt-20">
            <JewelleryDesignComponent
                title="Jewellery Design Course"
                duration="3 Years Full-Time"
                content1="At Inframe, you can choose from multiple Jewellery Design programs such as B.Des in Jewellery Design, BVOC, B.Sc, One-Year Diploma, and Three-Year Diploma. If you are seeking a Jewellery Design Course in Delhi, these courses are structured to give you in-depth design training, craftsmanship skills, and creative exposure for jewellery design. After completing the course, you will have a strong portfolio and confidence to design both traditional and modern jewellery pieces."
                content2="You will learn jewellery sketching, gemstone and material study, metalwork basics, design principles, jewellery fabrication, and trend analysis. The curriculum also includes digital design training to create jewellery mockups, mood boards, and presentation-ready designs. These competencies make you eligible for roles such as Jewellery Designer, CAD Jewellery Artist, Accessory Designer, or Gem & Metal Consultant."
                description="Learn design precision through a curated Jewellery Design Course.
"
                index={0}
                category=""
                software={["Photoshop", "Illustrator", "Corel Draw", "Maya", "After Effects", "Blender"]}
            />
        </div>
    );
}


export default Page;