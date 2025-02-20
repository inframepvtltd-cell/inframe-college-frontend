import CoursePage from "../../../components/Courses/CoursePage";
import { courseTypes } from "../../../utils/courseTypes";
import { metadata } from "../../../utils/metadata";

type CategoryPageProps = { params: { category: string } };
type CategoryKey = keyof typeof metadata;

export default function CategoryPage({ params }: CategoryPageProps) {
  const categoryLower = params.category.toLowerCase();
  console.log(categoryLower);

  const categoryCourses = courseTypes[categoryLower] || null;
  console.log(categoryCourses);

  return <CoursePage courseType={categoryCourses} category={categoryLower} />;
}

// ✅ Fix: Ensure generateMetadata has the correct type
export async function generateMetadata({ params }: CategoryPageProps) {
  const categoryLower = params.category.toLowerCase() as CategoryKey;
  const courseInfo = metadata[categoryLower] || null;

  if (!courseInfo) {
    return {
      title: "Inframe School | Explore Our Courses",
      description: "Discover various courses at Inframe School and start your journey today.",
    };
  }

  return {
    title: courseInfo.metaTitle || `${categoryLower} Courses | Inframe School`,
    description: courseInfo.metaDescription || `Enroll in our ${categoryLower} courses at Inframe School.`,
    openGraph: {
      title: courseInfo.metaTitle || `${categoryLower} Courses | Inframe School`,
      description: courseInfo.metaDescription || `Enroll in our ${categoryLower} courses at Inframe School.`,
      url: `https://yourwebsite.com/${categoryLower}`,
      images: [
        {
          url: courseInfo.image || "/default-course-image.jpg",
          width: 1200,
          height: 630,
          alt: `${categoryLower} Course`,
        },
      ],
    },
  };
}

// ✅ Fix: Ensure generateStaticParams returns an array of objects
export async function generateStaticParams() {
  return Object.keys(courseTypes).map((category) => ({
    category,
  }));
}
