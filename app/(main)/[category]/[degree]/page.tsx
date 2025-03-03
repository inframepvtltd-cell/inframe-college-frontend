import { courseTypes } from "../../../../utils/courseTypes"

import { notFound } from "next/navigation"
import CoursePage from "../../../../components/Courses/CoursePage"
import { use } from 'react'

type ParamsType = { 
  category: string, 
  degree: string 
}

export default function DegreePage(props: { params: Promise<ParamsType> }) {
  const { category, degree } = use(props.params)
  const categoryLower = category.toLowerCase()

  if (!courseTypes[categoryLower]) {
    return notFound()
  }

  const categoryCourses = courseTypes[categoryLower]
  const selectedCourseIndex = categoryCourses.findIndex((course) => course.value === degree)

  if (selectedCourseIndex === -1) {
    return notFound()
  }

  const initialTabIndex = selectedCourseIndex



  return (
    <>
     
      <CoursePage courseType={categoryCourses} category={categoryLower} initialTabIndex={initialTabIndex} />
    </>
  )
}



// Generate Static Paths for Dynamic Routing
export async function generateStaticParams() {
  return Object.keys(courseTypes).map((category) => ({
    category,
    degree: courseTypes[category].map((course) => course.value)
  }))
}