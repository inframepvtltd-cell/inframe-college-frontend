import DigitalMarketingComponent from "../../../components/cityComponents/digitalMarketingComponent";

export const metadata = {
    title: "Digital Marketing Course in Bhopal | Inframe School",
    description: "Master SEO and advertising with Inframe School’s Digital Marketing Course in Bhopal designed for digital careers."
};

function Page() {
    return (
        <div className="bg-white text-black mt-20">
            <DigitalMarketingComponent
                title="Digital Marketing Course"
                duration="4 Years Full-Time"
                content1="At Inframe, you can choose from multiple Digital Marketing courses such as B.Des (Digital Marketing), BVOC, B.Sc, One-Year Diploma, and Three-Year Diploma. If you are interested in a Digital Marketing Course in Bhopal, these programs are designed to develop your strategic thinking, creative marketing skills, and technical knowledge in digital tools. By the end of the course, you will have a robust portfolio and the confidence to lead marketing campaigns for web and mobile platforms."
                content2="You will learn search engine optimization, social media marketing, content marketing, email marketing, PPC advertising, analytics, branding, and digital strategy. The curriculum includes training on tools like Google Analytics, Google Ads, Facebook/Instagram Ads Manager, SEO tools, and content creation software — giving you practical hands-on experience. These skills open career paths such as Digital Marketer, SEO Specialist, Social Media Manager, Content Strategist, and Marketing Analyst."
                description="Step into the future of branding with a Digital Marketing Course.
"
                index={0}
                category=""
                software={["Photoshop", "Illustrator", "Corel Draw", "Maya", "After Effects", "Blender"]}
            />
        </div>
    );
}

export default Page;