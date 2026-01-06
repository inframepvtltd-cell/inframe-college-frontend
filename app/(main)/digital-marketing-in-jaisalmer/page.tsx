import DigitalMarketingComponent from "../../../components/cityComponents/digitalMarketingComponent";

export const metadata = {
    title: "Digital Marketing Course in Jaisalmer | Inframe School",
    description: "Gain SEO and advertising skills with Inframe School’s Digital Marketing Course in Jaisalmer for digital career growth."
};

function Page() {
    return (
        <div className="bg-white text-black mt-20">
            <DigitalMarketingComponent
                title="Digital Marketing Course"
                duration="4 Years Full-Time"
                content1="At Inframe, you can choose from multiple Digital Marketing programs such as B.Des (Digital Marketing), BVOC, B.Sc, One-Year Diploma, and Three-Year Diploma. If you are interested in a Digital Marketing Course in Jaisalmer, these programs help you build essential skills in digital marketing — combining creativity, analytics, and strategy. By the end of the course, you will have a well-designed portfolio and the confidence to handle online marketing campaigns for brands and businesses."
                content2="You will learn SEO, social media marketing, content marketing, email marketing, PPC advertising, web analytics, digital strategy and online branding. The curriculum also includes training on tools like Google Analytics, Google Ads, Facebook/Instagram Ads Manager, SEO tools, and content-creation software to execute and monitor campaigns. These skills make you eligible for jobs like Digital Marketer, Social Media Manager, SEO Specialist, Content Strategist, and Digital Marketing Analyst."
                description="Gain industry insights through a well-structured Digital Marketing Course.
"
                index={0}
                category=""
                software={["Photoshop", "Illustrator", "Corel Draw", "Maya", "After Effects", "Blender"]}
            />
        </div>
    );
}

export default Page;