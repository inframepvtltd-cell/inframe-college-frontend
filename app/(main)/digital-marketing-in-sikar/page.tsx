import DigitalMarketingComponent from "../../../components/cityComponents/digitalMarketingComponent";

export const metadata = {
    title: "Digital Marketing Course in Sikar | Inframe School",
    description: "Build digital skills with Inframe School’s Digital Marketing Course in Sikar covering SEO, ads, and analytics."
};

function Page() {
    return (
        <div className="bg-white text-black mt-20">
            <DigitalMarketingComponent
                title="Digital Marketing Course"
                duration="4 Years Full-Time"
                content1="At Inframe, you can choose from multiple Digital Marketing programs including B.Des (Digital Marketing), BVOC, B.Sc, One-Year Diploma, and Three-Year Diploma. If you are searching for a Digital Marketing Course in Sikar, these courses will help you build foundational and advanced skills in online marketing, combining creativity with data-driven strategy. By the end of the program, you will have a professional portfolio and the confidence to manage digital campaigns effectively."
                content2="The course covers SEO, social media marketing, content strategy and creation, email marketing, PPC advertising, analytics, branding, and digital marketing strategy. Students also get trained on tools such as Google Analytics, Google Ads, Facebook/Instagram Ads Manager, SEO tools, and content creation software to execute and monitor campaigns. After passing out, you can work as a Digital Marketer, SEO Specialist, Social Media Manager, Content Strategist, or Digital Marketing Analyst."
                description="Build expertise in ads, funnels, and automation via a Digital Marketing Course.
"
                index={0}
                category=""
                software={["Photoshop", "Illustrator", "Corel Draw", "Maya", "After Effects", "Blender"]}
            />
        </div>
    );
}

export default Page;