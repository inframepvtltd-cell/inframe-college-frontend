import DigitalMarketingComponent from "../../../components/cityComponents/digitalMarketingComponent";

export const metadata = {
    title: "Digital Marketing Course in Surat | Inframe School",
    description: "Learn SEO, PPC, and social media skills with Inframe School’s Digital Marketing Course in Surat for career growth."
};

function Page() {
    return (
        <div className="bg-white text-black mt-20">
            <DigitalMarketingComponent
                title="Digital Marketing Course"
                duration="4 Years Full-Time"
                content1="At Inframe, you can choose from several Digital Marketing programs including B.Des (Digital Marketing), BVOC, B.Sc, One-Year Diploma, and Three-Year Diploma. If you are exploring a Digital Marketing Course in Surat, these courses will help you advance your creative, technical, and strategic skills needed in the online marketing world. Upon completion, you will have a professional portfolio and ability to plan and execute effective digital campaigns."
                content2="You will learn search engine optimization, social media marketing, content marketing, email marketing, PPC advertising, analytics, branding, and digital marketing strategy. The course also offers training on tools such as Google Analytics, Google Ads, Facebook/Instagram Ads Manager, SEO tools, and content-creation platforms — empowering you to manage and optimize campaigns. With these skills, you can pursue roles like Digital Marketer, SEO Specialist, Social Media Manager, Content Strategist, or Digital Marketing Analyst."
                description="Train with mentors in a premium Digital Marketing Course.
"
                index={0}
                category=""
                software={["Photoshop", "Illustrator", "Corel Draw", "Maya", "After Effects", "Blender"]}
            />
        </div>
    );
}

export default Page;