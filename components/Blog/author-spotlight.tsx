import { Twitter, Linkedin, Globe } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"

export default function AuthorSpotlight() {
  const authors = [
    {
      name: "Emma Johnson",
      role: "Interior Design Expert",
      bio: "Emma is a renowned interior designer with over 15 years of experience in creating stunning spaces for both residential and commercial clients.",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D",
      twitter: "https://twitter.com/emmajohnson",
      linkedin: "https://linkedin.com/in/emmajohnson",
      website: "https://emmajohnsondesign.com",
    },
    {
      name: "Michael Chen",
      role: "Creative Director",
      bio: "Michael is a multi-disciplinary designer specializing in branding and digital experiences. He leads a team of creatives at a top design agency.",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D",
      twitter: "https://twitter.com/michaelchen",
      linkedin: "https://linkedin.com/in/michaelchen",
      website: "https://michaelchendesign.com",
    },
    {
      name: "Sarah Williams",
      role: "Fashion Sustainability Advocate",
      bio: "Sarah is a fashion designer turned sustainability expert. She consults with major brands on implementing eco-friendly practices in their production processes.",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D",
      twitter: "https://twitter.com/sarahwilliams",
      linkedin: "https://linkedin.com/in/sarahwilliams",
      website: "https://sarahwilliamssustainability.com",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {authors.map((author, index) => (
        <Card key={index} className="bg-white border-yellow-200">
          <CardHeader className="text-center">
            <div className="flex justify-center">
             <Avatar className="w-24 h-24 mx-auto mb-4">
  <AvatarImage src={author.image} alt={author.name} />
  <AvatarFallback>
    {author.name
      .split(" ")
      .map((n) => n[0])
      .join("")}
  </AvatarFallback>
</Avatar>

            </div>
            <CardTitle className="text-xl font-bold text-black">{author.name}</CardTitle>
            <CardDescription className="text-yellow-600">{author.role}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 text-center">{author.bio}</p>
          </CardContent>
          <CardFooter className="flex justify-center space-x-4">
            <Button variant="ghost" size="icon" asChild>
              <a href={author.twitter} target="_blank" rel="noopener noreferrer">
                <Twitter className="h-5 w-5 text-yellow-600" />
                <span className="sr-only">Twitter</span>
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href={author.linkedin} target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-5 w-5 text-yellow-600" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href={author.website} target="_blank" rel="noopener noreferrer">
                <Globe className="h-5 w-5 text-yellow-600" />
                <span className="sr-only">Website</span>
              </a>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

