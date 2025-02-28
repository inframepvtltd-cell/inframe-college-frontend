import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"

export default function TipsAndTricks() {
  const articles = [
    {
      title: "10 Essential Color Theory Tips Every Designer Should Know",
      excerpt: "Master the fundamentals of color theory to create harmonious and impactful designs across any medium.",
      author: "Alex Rivera",
      date: "Feb 26, 2025",
      readTime: "7 min read",
      category: "Design Fundamentals",
      image: "https://www.qdigitizing.com/blog/wp-content/uploads/2015/04/colorwheel.jpg",
    },
    {
      title: "How to Create a Professional Portfolio That Stands Out",
      excerpt:
        "Learn the key elements of a compelling creative portfolio that will help you land your dream clients or jobs.",
      author: "Jessica Kim",
      date: "Feb 24, 2025",
      readTime: "9 min read",
      category: "Career Development",
      image: "https://d1q3gj91a17lu.cloudfront.net/wp-content/uploads/2023/07/21124810/how-to-create-professional-portfolio-poster.jpg",
    },
    {
      title: "5 Time-Saving Techniques for Digital Illustrators",
      excerpt: "Streamline your illustration workflow with these professional tips that will boost your productivity.",
      author: "Marcus Johnson",
      date: "Feb 22, 2025",
      readTime: "6 min read",
      category: "Digital Illustration",
      image: "https://i.ytimg.com/vi/ulZ0ZBNw0dU/sddefault.jpg",
    },
    {
      title: "Mastering Typography: Rules and When to Break Them",
      excerpt:
        "Discover the fundamental principles of typography and learn when creative rule-breaking leads to innovative design.",
      author: "Sophia Chen",
      date: "Feb 20, 2025",
      readTime: "8 min read",
      category: "Typography",
      image: "https://d3ui957tjb5bqd.cloudfront.net/uploads/images/4/40/40600.twitter.jpg?fmt=webp&1479733314",
    },
  ]

  return (
    <div className="space-y-6">
      {articles.map((article, index) => (
        <Card key={index} className="overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3">
              <div className="h-full">
                <Image
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  width={400}
                  height={240}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            <div className="md:w-2/3 p-5">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">{article.category}</Badge>
                <div className="text-xs text-muted-foreground flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {article.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {article.readTime}
                  </span>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2 hover:text-primary transition-colors">
                <Link href="#">{article.title}</Link>
              </h3>
              <p className="text-muted-foreground mb-4 line-clamp-2">{article.excerpt}</p>
              <div className="flex justify-between items-center">
                <div className="text-sm">By {article.author}</div>
                <Button variant="ghost" size="sm" className="gap-1" asChild>
                  <Link href="#">
                    Read More <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}

