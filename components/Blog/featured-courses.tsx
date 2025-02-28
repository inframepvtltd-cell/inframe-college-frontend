import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"

export default function FeaturedCourses() {
  const featuredCourses = [
    {
      title: "B. Des In Interior Design",
      category: "Interior Design",
      description: "Learn to transform spaces with our comprehensive interior design program",
      image: "/placeholder.svg?height=300&width=500&text=Interior+Design",
      badge: "Popular",
    },
    {
      title: "B. Des In Fashion Design",
      category: "Fashion Design",
      description: "Develop your fashion sense and create stunning clothing designs",
      image: "/placeholder.svg?height=300&width=500&text=Fashion+Design",
      badge: "Trending",
    },
    {
      title: "B. Des in Animation and VFX",
      category: "Animation and VFX",
      description: "Master the art of animation and visual effects for film and games",
      image: "/placeholder.svg?height=300&width=500&text=Animation+VFX",
      badge: "New",
    },
    {
      title: "B.VOC in Digital Marketing",
      category: "Digital Marketing",
      description: "Learn modern digital marketing strategies to grow businesses online",
      image: "/placeholder.svg?height=300&width=500&text=Digital+Marketing",
      badge: "High Demand",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
      {featuredCourses.map((course, index) => (
        <Card key={index} className="overflow-hidden transition-all hover:shadow-lg">
          <div className="aspect-video relative overflow-hidden">
            <Image
              src={course.image || "/placeholder.svg"}
              alt={course.title}
              width={500}
              height={300}
              className="object-cover w-full h-full transition-transform hover:scale-105"
            />
            <Badge className="absolute top-2 right-2 bg-primary/90 hover:bg-primary">{course.badge}</Badge>
          </div>
          <CardHeader className="p-4">
            <div className="text-sm text-muted-foreground">{course.category}</div>
            <CardTitle className="line-clamp-1 text-lg mt-1">{course.title}</CardTitle>
            <CardDescription className="line-clamp-2">{course.description}</CardDescription>
          </CardHeader>
          <CardFooter className="p-4 pt-0">
            <Button className="w-full" asChild>
              <Link href="#">
                Explore Course <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

