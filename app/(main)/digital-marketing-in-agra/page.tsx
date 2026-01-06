import DigitalMarketingComponent from "../../../components/cityComponents/digitalMarketingComponent";

export const metadata = {
    title: "Digital Marketing Course in Agra | Inframe School",
    description: "Learn SEO, PPC, and analytics with Inframe School’s Digital Marketing Course in Agra for a strong digital career."
};

function Page() {
    return (
        <div className="bg-white text-black mt-20">
            <DigitalMarketingComponent
                title="Digital Marketing Course"
                duration="4 Years Full-Time"
                content1="At Inframe, you can choose from multiple Digital Marketing programs such as B.Des (Digital Marketing), BVOC, B.Sc, One-Year Diploma, and Three-Year Diploma. If you are interested in a Digital Marketing Course in Agra, these courses help you build strong strategic, creative, and technical skills required for success in online marketing. By the end of the course, you will have a professional portfolio and the ability to manage digital marketing for businesses, brands, and clients."
                content2="
You will learn search engine optimization, social media marketing, content marketing, email marketing, PPC advertising, analytics, branding, and comprehensive digital marketing strategy. The course also trains you on tools such as Google Analytics, Google Ads, Facebook/Instagram Ads Manager, SEO tools, and content-creation software for efficient campaign execution. With these skills, you can aim for roles like Digital Marketer, SEO Specialist, Social Media Manager, Content Strategist, or Marketing Analyst."
                description="Master modern strategies with a high-end Digital Marketing Course.
"
                index={0}
                category=""
                software={["Photoshop", "Illustrator", "Corel Draw", "Maya", "After Effects", "Blender"]}
            />
        </div>
    );
}

export default Page;