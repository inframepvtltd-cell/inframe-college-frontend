// import JewelleryDesignComponent from "../../../components/cityComponents/JewelleryDesignComponent";

import JewelleryDesignComponent from "../../../components/cityComponents/JewelleryDesignComponent";

export const metadata = {
    title: "Jewellery Design Course in Bikaner | Inframe School",
    description: "Build your design career with the Jewellery Design Course in Bikaner by Inframe School. Gain hands-on training and real project exposure."
};



function Page() {

    return (
        <div className="bg-white text-black mt-20">
            <JewelleryDesignComponent
                title="Jewellery Design Course"
                duration="3 Years Full-Time"
                content1="At Inframe, you can choose from various Jewellery Design programs including B.Des in Jewellery Design, BVOC, B.Sc, One-Year Diploma, and Three-Year Diploma. If you are interested in a Jewellery Design Course in Bikaner, these courses aim to develop your creative imagination, technical know-how, and jewellery design sensibility. By course end, you will have a professional portfolio and confidence to design jewellery that balances traditional aesthetics with modern trends."
                content2="You will learn jewellery sketching, gemstone and metal selection, design fundamentals, metalwork techniques, accessory styling, and jewellery fabrication. The program also integrates digital design training to create jewellery mockups, mood boards, and presentation-ready designs. With these competencies, you can work as Jewellery Designer, CAD Jewellery Artist, Accessory Designer, or Gem & Metal Consultant."
                description="Step into fine artistry with our premium Jewellery Design Course.
"
                index={0}
                category=""
                software={["Photoshop", "Illustrator", "Corel Draw", "Maya", "After Effects", "Blender"]}
            />
        </div>
    );
}


export default Page;