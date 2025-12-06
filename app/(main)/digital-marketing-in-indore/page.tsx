import DigitalMarketingComponent from "../../../components/cityComponents/digitalMarketingComponent";
import UIUXDesignComponent from "../../../components/cityComponents/uiuxDesignComponent";

export const metadata = {
    title: "Digital Marketing Course in Indore | Inframe School",
    description: "Learn SEO, PPC, and content strategy with Inframe School’s Digital Marketing Course in Indore for better job options."
};

function Page() {
    return (
        <div className="bg-white text-black mt-20">
            <DigitalMarketingComponent
                title="Digital Marketing Course"
                duration="4 Years Full-Time"
                content1="At Inframe, you have access to multiple Digital Marketing programs including B.Des (Digital Marketing), BVOC, B.Sc, One-Year Diploma, and Three-Year Diploma. If you are seeking a Digital Marketing Course in Indore, these programs aim to equip you with up-to-date digital marketing strategies, creative content skills, and technical marketing know-how. By the end of the course, you will have a professional portfolio and the capability to execute and manage effective digital campaigns."
                content2="You will learn SEO, social media marketing, content marketing, email marketing, PPC advertising, web analytics, brand building, and digital marketing strategy. You’ll also get training on tools like Google Analytics, Google Ads, Facebook/Instagram Ads Manager, SEO tools, and content-creation software — helping you design, run, and monitor campaigns. These skills prepare you for roles such as Digital Marketer, SEO Specialist, Social Media Manager, Content Strategist, or Performance Analyst."
                description="Explore performance marketing through a practical Digital Marketing Course.
"
                index={0}
                category=""
                software={["Photoshop", "Illustrator", "Corel Draw", "Maya", "After Effects", "Blender"]}
            />
        </div>
    );
}

export default Page;