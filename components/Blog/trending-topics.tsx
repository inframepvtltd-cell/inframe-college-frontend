import Link from "next/link"
import Image from "next/image"
import { ArrowRight, TrendingUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"

export default function TrendingTopics() {
  const trends = [
    {
      title: "Biophilic Design: Bringing Nature Indoors",
      description: "How incorporating natural elements in interior design improves wellbeing and productivity.",
      image: "/placeholder.svg?height=300&width=500&text=Biophilic+Design",
      category: "Interior Design",
    },
    {
      title: "Digital Fashion: Virtual Clothing in the Metaverse",
      description: "Exploring the growing market for digital-only fashion items and virtual wardrobes.",
      image: "/placeholder.svg?height=300&width=500&text=Digital+Fashion",
      category: "Fashion Design",
    },
    {
      title: "Generative Design: AI as a Creative Partner",
      description: "How designers are using AI tools to expand creative possibilities and streamline workflows.",
      image: "/placeholder.svg?height=300&width=500&text=Generative+Design",
      category: "Graphic Design",
    },
    {
      title: "Micro-Animations: Enhancing User Experience",
      description: "Small, purposeful animations that guide users and add personality to digital interfaces.",
      image: "/placeholder.svg?height=300&width=500&text=Micro+Animations",
      category: "UI/UX Design",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {trends.map((trend, index) => (
        <Card key={index} className="overflow-hidden transition-all hover:shadow-lg">
          <div className="aspect-[5/3] relative overflow-hidden">
            <Image
              src={trend.image || "/placeholder.svg"}
              alt={trend.title}
              width={500}
              height={300}
              className="object-cover w-full h-full transition-transform hover:scale-105"
            />
            <div className="absolute top-3 left-3 flex items-center gap-2">
              <Badge className="bg-primary/90 hover:bg-primary">
                <TrendingUp className="mr-1 h-3 w-3" />
                Trending
              </Badge>
            </div>
          </div>
          <CardHeader className="p-4">
            <div className="text-sm text-muted-foreground">{trend.category}</div>
            <CardTitle className="line-clamp-2 text-lg mt-1">
              <Link href="#" className="hover:text-primary transition-colors">
                {trend.title}
              </Link>
            </CardTitle>
            <CardDescription className="line-clamp-3 mt-1">{trend.description}</CardDescription>
          </CardHeader>
          <CardFooter className="p-4 pt-0">
            <Button variant="ghost" className="p-0 h-auto font-medium" asChild>
              <Link href="#">
                Read More <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

