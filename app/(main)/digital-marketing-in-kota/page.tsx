import DigitalMarketingComponent from "../../../components/cityComponents/digitalMarketingComponent";
import UIUXDesignComponent from "../../../components/cityComponents/uiuxDesignComponent";

export const metadata = {
    title: "Digital Marketing Course in Kota | Inframe School",
    description: "Learn SEO, content, and PPC tools with Inframe School’s Digital Marketing Course in Kota to boost your career."
};

function Page() {
    return (
        <div className="bg-white text-black mt-20">
            <DigitalMarketingComponent
                title="Digital Marketing Course"
                duration="4 Years Full-Time"
                content1="At Inframe, you can choose from multiple Digital Marketing programs such as B.Des (Digital Marketing), BVOC, B.Sc, One-Year Diploma, and Three-Year Diploma. If you are looking for a Digital Marketing Course in Kota, these programs are crafted to help you develop strong digital marketing, analytical, and strategic skills demanded by businesses today. By the end of the course, you will have a professional portfolio and the confidence to plan and implement digital marketing solutions."
                content2="You will learn search engine optimization (SEO), social media marketing, content marketing, email marketing, PPC advertising, analytics, brand building, and online marketing strategy. The curriculum also includes hands-on training on tools like Google Analytics, Google Ads, Facebook/Instagram Ads Manager, SEO tools, and content creation software. These skills open career opportunities as Digital Marketer, SEO Specialist, Social Media Manager, Content Strategist, or Performance Analyst.
"
                description="Create impactful campaigns with a modern Digital Marketing Course.
"
                index={0}
                category=""
                software={["Photoshop", "Illustrator", "Corel Draw", "Maya", "After Effects", "Blender"]}
            />
        </div>
    );
}

export default Page;