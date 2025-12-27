import DigitalMarketingComponent from "../../../components/cityComponents/digitalMarketingComponent";

export const metadata = {
    title: "Digital Marketing Course in Delhi | Inframe School",
    description: "Build practical digital skills with Inframe School’s Digital Marketing Course in Delhi covering SEO and social ads."
};

function Page() {
    return (
        <div className="bg-white text-black mt-20">
            <DigitalMarketingComponent
                title="Digital Marketing Course"
                duration="4 Years Full-Time"
                content1="At Inframe, you can choose from various Digital Marketing programs such as B.Des (Digital Marketing), BVOC, B.Sc, One-Year Diploma, and Three-Year Diploma. If you want a Digital Marketing Course in Delhi, these courses provide extensive training in all facets of online marketing — from strategy and content to analytics and campaign management. Once you complete the program, you’ll have a professionally curated portfolio and the confidence to manage digital marketing for brands and businesses."
                content2="
The course curriculum covers SEO, social media marketing, content marketing, email marketing, PPC advertising, web analytics, branding, and full-scale digital marketing strategy. Students get hands-on training using tools like Google Analytics, Google Ads, Facebook/Instagram Ads Manager, SEO tools, and content creation software to handle campaigns efficiently. These competencies enable you to take up roles like Digital Marketer, SEO Specialist, Social Media Manager, Content Strategist, or Digital Marketing Analyst."
                description="Transform your career with a next-gen Digital Marketing Course.
"
                index={0}
                category=""
                software={["Photoshop", "Illustrator", "Corel Draw", "Maya", "After Effects", "Blender"]}
            />
        </div>
    );
}

export default Page;