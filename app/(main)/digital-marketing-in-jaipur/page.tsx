import DigitalMarketingComponent from "../../../components/cityComponents/digitalMarketingComponent";
import UIUXDesignComponent from "../../../components/cityComponents/uiuxDesignComponent";

export const metadata = {
    title: "Digital Marketing Course in Jaipur | Inframe School",
    description: "Build strong digital skills with Inframe School’s Digital Marketing Course in Jaipur covering SEO and paid ads."
};

function Page() {
    return (
        <div className="bg-white text-black mt-20">
            <DigitalMarketingComponent
                title="Digital Marketing Course"
                duration="4 Years Full-Time"
                content1="At Inframe, you can choose from various Digital Marketing programs such as B.Des (Digital Marketing), BVOC, B.Sc, One-Year Diploma, and Three-Year Diploma. If you want a Digital Marketing Course in Jaipur, these courses are designed to build your marketing knowledge, digital strategy skills, and technical competence needed by modern businesses. Upon completion, you will have a polished portfolio and the confidence to run and manage full-scale digital marketing initiatives."
                content2="
You will learn search engine optimization, social media marketing, content creation and marketing, email marketing, PPC advertising, web analytics, digital branding, and overall marketing strategy. You will also get hands-on training on tools like Google Analytics, Google Ads, Facebook/Instagram Ads Manager, various SEO tools, and content-creation software. These competencies equip you for roles like Digital Marketer, Social Media Manager, SEO Specialist, Content Strategist, or Performance Analyst.
"
                description="Learn content and social strategy in our Digital Marketing Course.
"
                index={0}
                category=""
                software={["Photoshop", "Illustrator", "Corel Draw", "Maya", "After Effects", "Blender"]}
            />
        </div>
    );
}

export default Page;