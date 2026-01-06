// import JeweleryDesignComponent from "../../../components/cityComponents/JeweleryDesignComponent";

import JewelleryDesignComponent from "../../../components/cityComponents/JewelleryDesignComponent";

export const metadata = {
    title: "Jewellery Design Course in Lucknow | Inframe School",
    description: "Learn traditional and modern jewellery design with Inframe School’s Jewellery Design Course in Lucknow. Build your creative future."
};



function Page() {

    return (
        <div className="bg-white text-black mt-20">
            <JewelleryDesignComponent
                title="Jewellery Design Course"
                duration="3 Years Full-Time"
                content1="At Inframe, you can choose from multiple Jewellery Design programs including B.Des in Jewellery Design, BVOC, B.Sc, One-Year Diploma, and Three-Year Diploma. If you want a Jewellery Design Course in Lucknow, these courses provide comprehensive training in jewellery design — combining traditional craftsmanship, contemporary design thinking, and digital design exposure. By the end of the course, you will have a polished portfolio and the confidence to design unique jewellery pieces."
                content2="You will learn jewellery sketching, gemstone and material study, metalwork fundamentals, design principles, jewellery fabrication, trend analysis, and accessory styling. The program also includes digital design training for mockups, mood boards, and presentation-ready designs. With these skills you can work as Jewellery Designer, CAD Jewellery Artist, Accessory Designer, or Gem & Metal Consultant.
"
                description="Sketch, craft, and shine through our Jewellery Design Course.
"
                index={0}
                category=""
                software={["Photoshop", "Illustrator", "Corel Draw", "Maya", "After Effects", "Blender"]}
            />
        </div>
    );
}


export default Page;