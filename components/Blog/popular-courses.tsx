import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function PopularCourses() {
  const courses = [
    {
      title: "B. Des In Interior Design",
      category: "Interior Design",
      image: "/images/gallery/1717668148989.jpg",
    },
    {
      title: "B. Des In Fashion Design",
      category: "Fashion Design",
      image: "/placeholder.svg?height=60&width=60&text=FD",
    },
    {
      title: "B. Des in UI & UX Design",
      category: "UI/UX Design",
      image: "/placeholder.svg?height=60&width=60&text=UX",
    },
    {
      title: "B.VOC in Digital Marketing",
      category: "Digital Marketing",
      image: "/placeholder.svg?height=60&width=60&text=DM",
    },
  ]

  return (
    <div className="space-y-4">
      {courses.map((course, index) => (
        <div key={index} className="flex items-center gap-3 group">
          <div className="flex-shrink-0 w-12 h-12 rounded-md overflow-hidden">
            <Image
              src={course.image || "/placeholder.svg"}
              alt={course.title}
              width={60}
              height={60}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="flex-grow">
            <div className="text-sm font-medium group-hover:text-primary transition-colors">
              <Link href="#">{course.title}</Link>
            </div>
            <div className="text-xs text-muted-foreground">{course.category}</div>
          </div>
        </div>
      ))}
      <div className="pt-2">
        <Button variant="outline" size="sm" className="w-full" asChild>
          <Link href="#">
            View All Courses <ArrowRight className="ml-1 h-3.5 w-3.5" />
          </Link>
        </Button>
      </div>
    </div>
  )
}

