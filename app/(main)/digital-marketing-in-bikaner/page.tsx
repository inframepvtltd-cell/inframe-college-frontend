import DigitalMarketingComponent from "../../../components/cityComponents/digitalMarketingComponent";

export const metadata = {
    title: "Digital Marketing Course in Bikaner | Inframe School",
    description: "Learn SEO, PPC, and content skills with Inframe School’s Digital Marketing Course in Bikaner for better opportunities."
};

function Page() {
    return (
        <div className="bg-white text-black mt-20">
            <DigitalMarketingComponent
                title="Digital Marketing Course"
                duration="4 Years Full-Time"
                content1="At Inframe, you can choose from multiple Digital Marketing programs such as B.Des (Digital Marketing), BVOC, B.Sc, One-Year Diploma, and Three-Year Diploma. If you are searching for a Digital Marketing Course in Bikaner, these courses are designed to develop strong analytical, creative, and technical capabilities needed in the online marketing sector. By completion, you will have a professional portfolio and confidence to design and manage end-to-end digital campaigns."
                content2="You will learn search engine optimization (SEO), social media marketing, content marketing, email marketing, PPC advertising, analytics, digital strategy, and online branding. Training also covers tools like Google Analytics, Google Ads, Facebook/Instagram Ads Manager, SEO software and content creation tools to plan and track campaigns effectively. With these skills you can aim for roles such as Digital Marketer, SEO Specialist, Social Media Manager, Content Strategist, or Performance Analyst.
"
                description="Build real-world marketing skills with our Digital Marketing Course.
"
                index={0}
                category=""
                software={["Photoshop", "Illustrator", "Corel Draw", "Maya", "After Effects", "Blender"]}
            />
        </div>
    );
}

export default Page;