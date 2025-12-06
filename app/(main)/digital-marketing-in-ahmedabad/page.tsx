import DigitalMarketingComponent from "../../../components/cityComponents/digitalMarketingComponent";

export const metadata = {
    title: "Digital Marketing Course in Ahmedabad | Inframe School",
    description: "Gain job-ready SEO and ads skills with Inframe School’s Digital Marketing Course in Ahmedabad for career success."
};

function Page() {
    return (
        <div className="bg-white text-black mt-20">
            <DigitalMarketingComponent
                title="Digital Marketing Course"
                duration="4 Years Full-Time"
                content1="At Inframe, you can choose from multiple Digital Marketing courses such as B.Des (Digital Marketing), BVOC, B.Sc, One-Year Diploma, and Three-Year Diploma. If you want a Digital Marketing Course in Ahmedabad, these programs are designed to build a strong foundation in online marketing, content strategy, analytics, and campaign management. By the end, you will have a polished portfolio and strong confidence to manage digital marketing for brands and businesses."
                content2="The curriculum includes SEO, social media marketing, content creation and marketing, email marketing, PPC advertising, web analytics, branding, and comprehensive digital marketing strategy. Students are trained in tools such as Google Analytics, Google Ads, Facebook/Instagram Ads Manager, SEO software, and content-creation tools to run and optimize campaigns. These skills make you eligible for roles like Digital Marketer, SEO Specialist, Social Media Manager, Content Strategist, and Digital Marketing Analyst."
                description="Unlock online growth with a professional Digital Marketing Course.
"
                index={0}
                category=""
                software={["Photoshop", "Illustrator", "Corel Draw", "Maya", "After Effects", "Blender"]}
            />
        </div>
    );
}

export default Page;