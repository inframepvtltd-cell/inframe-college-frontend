import CoursePage from "../../../components/Courses/CoursePage";
import { courseTypes } from "../../../utils/courseTypes";
import Script from "next/script";

type ParamsType = Promise<{ category: string }>;

export default async function CategoryPage({ params }: { params: ParamsType }) {
  const { category } = await params;
  const categoryLower = category.toLowerCase();

  // Ensure only the 11 categories are included
  if (!courseTypes[categoryLower]) {
    return <div>Category not found</div>;
  }

  const categoryCourses = courseTypes[categoryLower];

  // Breadcrumb Schema for Category Pages
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.inframeschool.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: category,
        item: `https://www.inframeschool.com/${categoryLower}`,
      },
    ],
  };

  return (
    <>
      {/* Breadcrumb Schema for SEO */}
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Render the CoursePage Component */}
      <CoursePage courseType={categoryCourses} category={categoryLower} />
    </>
  );
}

// Generate Metadata for SEO
export async function generateMetadata({ params }: { params: ParamsType }) {
  const { category } = await params;
  return {
    title: `${category} Courses - Inframe School`,
    description: `Browse our ${category} courses and enhance your skills with Inframe School.`,
  };
}

// Generate Static Paths for Dynamic Routing
export async function generateStaticParams() {
  return Object.keys(courseTypes).map((category) => ({
    category,
  }));
}
