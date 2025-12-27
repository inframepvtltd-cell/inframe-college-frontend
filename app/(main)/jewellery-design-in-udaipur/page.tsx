
import JewelleryDesignComponent from "../../../components/cityComponents/JewelleryDesignComponent";

export const metadata = {
    title: "Jewellery Design Course in Udaipur | Inframe School",
    description: "Build creative design skills with the Jewellery Design Course in Udaipur by Inframe School. Hands-on learning for a successful career."
};

function Page() {

    return (
        <div className="bg-white text-black mt-20">
            <JewelleryDesignComponent
                title="Jewellery Design Course"
                duration="3 Years Full-Time"
                content1="At Inframe, you can choose from multiple Jewellery Design programs including B.Des in Jewellery Design, BVOC, B.Sc, One-Year Diploma, and Three-Year Diploma. If you are looking for a Jewellery Design Course in Udaipur, these programs are designed to build your creativity, technical skill, and design sensibility tailored for jewellery and accessories. By course completion, you will have a professional portfolio and confidence to design unique jewellery pieces — both traditional and modern."
                content2="You will learn jewellery sketching, gemstone and metal selection, material study, jewellery fabrication techniques, design principles, and accessory styling. The program also offers digital design training to create jewellery mockups, mood boards, and presentation-ready designs. These skills prepare you for careers like Jewellery Designer, CAD Jewellery Artist, Accessory Designer, or Gem & Metal Consultant."
                description="Build mastery with hands-on practice in our Jewellery Design Course.
"
                index={0}
                category=""
                software={["Photoshop", "Illustrator", "Corel Draw", "Maya", "After Effects", "Blender"]}
            />
        </div>
    );
}


export default Page;