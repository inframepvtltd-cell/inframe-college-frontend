
import Script from "next/script"
import { notFound } from "next/navigation"

import { Metadata } from "next"
import { courseTypes } from "../../../../utils/courseTypes";
import CoursePage from "../../../../components/Courses/CoursePage";

// Define the params type
type Params = {
  category: string;
  degree: string;
}

// Define the page component
export default function DegreePage({ 
  params 
}: { 
  params: Params 
}) {
  const { category, degree } = params
  const categoryLower = category.toLowerCase()
  
  // Ensure only the valid categories are included
  if (!courseTypes[categoryLower]) {
    notFound()
  }
  
  const categoryCourses = courseTypes[categoryLower]
  
  // Find the course that matches the degree parameter
  const selectedCourseIndex = categoryCourses.findIndex((course) => course.value === degree)
  
  // If degree not found, return 404
  if (selectedCourseIndex === -1) {
    notFound()
  }
  
  const initialTabIndex = selectedCourseIndex
  
  // Breadcrumb Schema for Degree Pages
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
        name: category
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" "),
        item: `https://www.inframeschool.com/${categoryLower}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: categoryCourses[initialTabIndex]?.label || degree,
        item: `https://www.inframeschool.com/${categoryLower}/${degree}`,
      },
    ],
  }
  
  return (
    <>
      {/* Breadcrumb Schema for SEO */}
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      
      {/* Render the CoursePage Component with initial tab selection */}
      <CoursePage courseType={categoryCourses} category={categoryLower} initialTabIndex={initialTabIndex} />
    </>
  )
}

// Generate Metadata for SEO
export async function generateMetadata(
  { params }: { params: { category: string, degree: string } }
): Promise<Metadata> {
  const { category, degree } = params;
  const categoryLower = category.toLowerCase();
  
  // Handle case where category doesn't exist
  if (!courseTypes[categoryLower]) {
    return {
      title: "Course Not Found - Inframe School",
      description: "The requested course could not be found.",
    }
  }
  
  const categoryCourses = courseTypes[categoryLower];
  const selectedCourse = categoryCourses.find((course) => course.value === degree);
  
  // Handle case where degree doesn't exist
  if (!selectedCourse) {
    return {
      title: `${category
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")} Courses - Inframe School`,
      description: `Browse our ${category.replace(/-/g, " ")} courses and enhance your skills with Inframe School.`,
    }
  }
  
  return {
    title: `${selectedCourse.title} - Inframe School`,
    description: selectedCourse.description,
  }
}

// Generate Static Paths for Dynamic Routing
export async function generateStaticParams() {
  const paths: { category: string; degree: string }[] = []
  
  Object.entries(courseTypes).forEach(([category, courses]) => {
    courses.forEach((course) => {
      paths.push({
        category,
        degree: course.value,
      })
    })
  })
  
  return paths
}