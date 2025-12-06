import DigitalMarketingComponent from "../../../components/cityComponents/digitalMarketingComponent";

export const metadata = {
    title: "Digital Marketing Course in Pali | Inframe School",
    description: "Learn SEO, ads, and social media with Inframe School’s Digital Marketing Course in Pali and start your digital career."
};

function Page() {
    return (
        <div className="bg-white text-black mt-20">
            <DigitalMarketingComponent
                title="Digital Marketing Course"
                duration="4 Years Full-Time"
                content1="At Inframe, you can choose from multiple Digital Marketing programs such as B.Des (Digital Marketing), BVOC, B.Sc, One-Year Diploma, and Three-Year Diploma. If you are looking for a Digital Marketing Course in Pali, these programs are structured to enhance your creative thinking, technical skills, and marketing strategy knowledge. By the end of the course, you will possess a professional portfolio and the confidence to strategize and implement digital marketing for online platforms."
                content2="You will learn SEO, social media marketing, content marketing, email marketing, PPC advertising, web analytics, digital branding and marketing strategy. The course also includes training on tools like Google Analytics, Google Ads, Facebook/Instagram Ads Manager, SEO software and content creation tools. These skills prepare you for careers as Digital Marketer, SEO Specialist, Social Media Manager, Content Strategist, or Performance Analyst."
                description="Learn growth-driven techniques in a professional Digital Marketing Course.
"
                index={0}
                category=""
                software={["Photoshop", "Illustrator", "Corel Draw", "Maya", "After Effects", "Blender"]}
            />
        </div>
    );
}

export default Page;