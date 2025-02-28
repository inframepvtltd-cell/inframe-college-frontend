import Link from "next/link"
import Image from "next/image"
import { ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { courseData } from "../../utils/course-data"

interface CourseGridProps {
  category: "design" | "art" | "business"
}

export default function CourseGrid({ category }: CourseGridProps) {
  const categoryData = courseData[category]

  return (
    <div className="space-y-8">
      {Object.entries(categoryData).map(([subcategory, courses]) => (
        <div key={subcategory} className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold">{subcategory}</h3>
            <Button variant="ghost" size="sm" className="gap-1">
              See All <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {courses.map((course, index) => (
              <Card key={index} className="overflow-hidden transition-all hover:shadow-lg">
                <div className="aspect-video relative overflow-hidden">
                  <Image
                    src={`/placeholder.svg?height=200&width=400&text=${encodeURIComponent(subcategory)}`}
                    alt={course}
                    width={400}
                    height={200}
                    className="object-cover w-full h-full transition-transform hover:scale-105"
                  />
                  <Badge className="absolute top-2 right-2 bg-primary/90 hover:bg-primary">
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </Badge>
                </div>
                <CardHeader className="p-4">
                  <CardTitle className="line-clamp-1 text-lg">{course}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    Comprehensive program covering all aspects of {subcategory.toLowerCase()}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="p-4 pt-0 flex justify-between">
                  <Button variant="outline" size="sm" asChild>
                    <Link href="#">Learn More</Link>
                  </Button>
                  <Badge variant="outline">{course.includes("Diploma") ? "Diploma" : "Degree"}</Badge>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

