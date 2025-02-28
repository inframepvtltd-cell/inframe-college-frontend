import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"

export default function RecentArticles() {
  const articles = [
    {
      title: "The Rise of Virtual Reality in Architecture Visualization",
      excerpt: "Discover how VR is transforming the way architects present their designs to clients.",
      author: "Alex Rivera",
      date: "Feb 28, 2025",
      readTime: "7 min read",
      category: "Architecture",
      image:
        "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmlydHVhbCUyMHJlYWxpdHl8ZW58MHx8MHx8fDA%3D",
    },
    {
      title: "Eco-Friendly Packaging Design: Balancing Aesthetics and Sustainability",
      excerpt: "Learn how designers are creating beautiful packaging solutions that are kind to the environment.",
      author: "Emma Johnson",
      date: "Feb 27, 2025",
      readTime: "9 min read",
      category: "Packaging Design",
      image:
        "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZWNvJTIwZnJpZW5kbHklMjBwYWNrYWdpbmd8ZW58MHx8MHx8fDA%3D",
    },
    {
      title: "The Psychology of Color in Digital Product Design",
      excerpt: "Explore how color choices impact user experience and brand perception in digital products.",
      author: "Michael Chen",
      date: "Feb 26, 2025",
      readTime: "8 min read",
      category: "UI/UX Design",
      image:
        "https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGNvbG9yJTIwcHN5Y2hvbG9neXxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      title: "Innovative Textile Design: Merging Technology and Traditional Crafts",
      excerpt:
        "Discover how designers are combining cutting-edge tech with age-old techniques to create unique textiles.",
      author: "Sarah Williams",
      date: "Feb 25, 2025",
      readTime: "10 min read",
      category: "Textile Design",
      image:
        "https://images.unsplash.com/photo-1594761049968-0eb6ca6e9085?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dGV4dGlsZSUyMGRlc2lnbnxlbnwwfHwwfHx8MA%3D%3D",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {articles.map((article, index) => (
        <Card
          key={index}
          className="overflow-hidden transition-all hover:shadow-lg flex flex-col h-full bg-white border-yellow-200"
        >
          <div className="flex flex-col md:flex-row h-full">
            <div className="md:w-2/5">
              <div className="h-full relative">
                <Image
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  width={400}
                  height={300}
                  className="object-cover w-full h-full"
                />
                <Badge className="absolute top-2 left-2 bg-yellow-500 text-black">{article.category}</Badge>
              </div>
            </div>
            <div className="md:w-3/5 p-5 flex flex-col">
              <CardHeader className="p-0 mb-2">
                <CardTitle className="text-lg font-bold mb-2 hover:text-yellow-600 transition-colors">
                  <Link href="#">{article.title}</Link>
                </CardTitle>
                <CardDescription className="line-clamp-2 text-gray-600">{article.excerpt}</CardDescription>
              </CardHeader>
              <div className="mt-auto flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{article.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{article.readTime}</span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-0 h-auto font-medium text-yellow-600 hover:text-yellow-700"
                >
                  Read More <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}

