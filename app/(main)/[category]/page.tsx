import CoursePage from "../../../components/Courses/CoursePage";
import { courseTypes } from "../../../utils/courseTypes";
import { metadata } from "../../../utils/metadata";

type CategoryKey = keyof typeof metadata;

export default function CategoryPage({ params }: { params: { category: string } }) {
  const categoryLower = params.category.toLowerCase();
  console.log(categoryLower);

  const categoryCourses = courseTypes[categoryLower];
  console.log(categoryCourses);

  return <CoursePage courseType={categoryCourses} category={categoryLower} />;
}

export function getMetadata({ params }: { params: { category: string } }) {
  const categoryLower = params.category.toLowerCase() as CategoryKey;
  const courseInfo = metadata[categoryLower];

  if (!courseInfo) {
    return {
      title: "Inframe School | Explore Our Courses",
      description: "Discover various courses at Inframe School and start your journey today.",
    };
  }

  return {
    title: courseInfo.metaTitle,
    description: courseInfo.metaDescription,
    keywords: ["design courses", "best courses", "art school"],
    openGraph: {
      title: courseInfo.metaTitle,
      description: courseInfo.metaDescription,
      url: `https://yourwebsite.com/${categoryLower}`,
      images: [
        {
          url: courseInfo.image || "/default-course-image.jpg",
          width: 1200,
          height: 630,
          alt: `${courseInfo.name} Course`,
        },
      ],
    },
  };
}

// Pre-generate static pages for each category
export async function generateStaticParams() {
  return Object.keys(courseTypes).map((category) => ({
    category,
  }));
}
