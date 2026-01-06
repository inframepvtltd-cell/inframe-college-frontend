import DigitalMarketingComponent from "../../../components/cityComponents/digitalMarketingComponent";

export const metadata = {
    title: "Digital Marketing Course in Ajmer | Inframe School",
    description: "Master SEO, PPC, and social media skills with Inframe School’s Digital Marketing Course in Ajmer for career growth."
};

function Page() {
    return (
        <div className="bg-white text-black mt-20">
            <DigitalMarketingComponent
                title="Digital Marketing Course"
                duration="4 Years Full-Time"
                content1="At Inframe, you can choose from multiple Digital Marketing programs such as B.Des (Digital Marketing), BVOC, B.Sc, One-Year Diploma, and Three-Year Diploma. If you are searching for a Digital Marketing Course in Ajmer, these programs help you build strong creative, analytical, and technical skills required for the digital marketing industry. By the end of the course, you will have a professional portfolio and the confidence to plan, execute, and analyze digital marketing campaigns across platforms."
                content2="
You will learn search engine optimization (SEO), social media marketing, content marketing, email marketing, pay-per-click (PPC) advertising, analytics, digital strategy, and online branding. The course also includes training on modern digital tools like Google Analytics, Google Ads, Facebook/Instagram Ads Manager, SEO tools, and content creation software to manage campaigns, track performance, and optimize results. These skills prepare you for careers like Digital Marketer, SEO Specialist, Social Media Manager, Content Strategist, and Performance Analyst.
"
                description="Learn SEO, ads, and analytics in a premium Digital Marketing Course.
"
                index={0}
                category=""
                software={["Photoshop", "Illustrator", "Corel Draw", "Maya", "After Effects", "Blender"]}
            />
        </div>
    );
}

export default Page;