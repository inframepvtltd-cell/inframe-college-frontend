import { courseTypes } from "../../../../utils/courseTypes";
import { notFound } from "next/navigation";
import CoursePage from "../../../../components/Courses/CoursePage";

type ParamsType = {
  category: string;
  degree: string;
};

export default async function DegreePage({ params }: { params: ParamsType }) {
  const { category, degree } = await params;
  const categoryLower = category.toLowerCase();

  if (!courseTypes[categoryLower]) {
    return notFound();
  }

  const categoryCourses = courseTypes[categoryLower];
  const selectedCourseIndex = categoryCourses.findIndex((course: any) => course.value === degree);

  if (selectedCourseIndex === -1) {
    return notFound();
  }

  return <CoursePage courseType={categoryCourses} category={categoryLower} />;
}

export async function generateStaticParams(): Promise<ParamsType[]> {
  const paths: ParamsType[] = [];

  Object.entries(courseTypes as Record<string, any[]>).forEach(
    ([category, courses]) => {
      courses.forEach((course) => {
        paths.push({ category, degree: course.value });
      });
    }
  );


  return paths;
}
