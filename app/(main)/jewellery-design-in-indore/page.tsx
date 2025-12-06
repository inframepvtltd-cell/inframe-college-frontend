// import JeweleryDesignComponent from "../../../components/cityComponents/JeweleryDesignComponent";

import JewelleryDesignComponent from "../../../components/cityComponents/JewelleryDesignComponent";

export const metadata = {
    title: "Jewellery Design Course in Indore | Inframe School",
    description: "Master jewellery design techniques with Inframe School’s Jewellery Design Course in Indore. Ideal for aspiring designers."
};

function Page() {

    return (
        <div className="bg-white text-black mt-20">
            <JewelleryDesignComponent
                title="Jewellery Design Course"
                duration="3 Years Full-Time"
                content1="At Inframe, you can choose from various Jewellery Design programs including B.Des in Jewellery Design, BVOC, B.Sc, One-Year Diploma, and Three-Year Diploma. If you are looking for a Jewellery Design Course in Indore, these programs offer comprehensive training in both traditional and contemporary jewellery design, combining craftsmanship with creative design thinking. By the end of the course, you will have a professional portfolio and confidence to design bespoke jewellery collections."
                content2="You will learn jewellery sketching, material and gemstone selection, metalwork techniques, design fundamentals, jewellery fabrication, accessory styling, and trend study. The course also trains you in digital design tools for creating jewellery mockups, mood boards, and design presentations. These skills open opportunities as Jewellery Designer, CAD Jewellery Artist, Accessory Designer, or Gem & Metal Consultant."
                description="Build a shining career with our Jewellery Design Course.
"
                index={0}
                category=""
                software={["Photoshop", "Illustrator", "Corel Draw", "Maya", "After Effects", "Blender"]}
            />
        </div>
    );
}


export default Page;