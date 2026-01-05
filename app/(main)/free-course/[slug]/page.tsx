import { getFreeCourseBySlug } from "../api/api";
import FreeCourseClient from "./FreeCourseClient";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const course = await getFreeCourseBySlug(params.slug);

  return {
    title: course?.meta_title || course?.course_name || "Inframe School",
    description: course?.meta_description || course?.description || "",
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
   const { slug } = await params;
   
    // const course = await getCourse(slug);
  const course = await getFreeCourseBySlug(slug);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Course not found
      </div>
    );
  }

  return <FreeCourseClient course={course} />;
}
