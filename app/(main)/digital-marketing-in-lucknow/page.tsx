import DigitalMarketingComponent from "../../../components/cityComponents/digitalMarketingComponent";

export const metadata = {
    title: "Digital Marketing Course in Lucknow | Inframe School",
    description: "Upgrade your skills with Inframe School’s Digital Marketing Course in Lucknow covering SEO and digital advertising."
};

function Page() {
    return (
        <div className="bg-white text-black mt-20">
            <DigitalMarketingComponent
                title="Digital Marketing Course"
                duration="4 Years Full-Time"
                content1="At Inframe, you have access to multiple Digital Marketing programs including B.Des (Digital Marketing), BVOC, B.Sc, One-Year Diploma, and Three-Year Diploma. If you are looking for a Digital Marketing Course in Lucknow, these courses are meant to equip you with the latest digital marketing strategies, content creation skills, analytics, and campaign management capabilities. By course completion, you will have a strong portfolio and the confidence to run digital marketing campaigns for a variety of clients."
                content2="You will study SEO, social media marketing, content marketing, email marketing, PPC advertising, analytics, branding, and digital marketing strategy. You will also get practical training using tools like Google Analytics, Google Ads, Facebook/Instagram Ads Manager, various SEO tools, and content-creation software — enabling you to design, execute, and measure campaigns. These skills prepare you for career roles such as Digital Marketer, SEO Specialist, Social Media Manager, Content Strategist, or Performance Analyst."
                description="Discover the power of digital platforms with our Digital Marketing Course.
"
                index={0}
                category=""
                software={["Photoshop", "Illustrator", "Corel Draw", "Maya", "After Effects", "Blender"]}
            />
        </div>
    );
}

export default Page;