type ApiCourse = {
  redirectUrl: string
  label: string
}

export const transformApiCoursesToCategories = (apiData: Record<string, ApiCourse[]>) => {
  return [
    {
      title: "Design",
      items: Object.entries(apiData).map(([parentSlug, courses]) => ({
        title: parentSlug
          .replace(/-/g, " ")
          .replace(/\b\w/g, l => l.toUpperCase()), // Animation Vfx
        category: "Design",
        image: "/images/default-course.jpg", // optional
        links: courses.map(course => ({
          text: course.label,
          href: course.redirectUrl,
        })),
      })),
    },
  ]
}
