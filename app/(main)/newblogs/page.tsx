
import { Button } from "@/components/ui/button";
import { getAllBlogs } from "./api";
import BlogCard from "./components/blogCard";
import { Search } from "lucide-react";
import Image from "next/image"
import { Head } from "next/document";

export default async function BlogsPage() {
  const blogs = await getAllBlogs();

  return (
    <>
   
      <main className="min-h-screen bg-white">
        <div className="relative z-10">
          <div className="relative h-[80vh]">
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/10 to-transparent z-10" />
            <Image
              src="/images/gallery/DSC04232.JPG"
              alt="Inframe School - Best Design School in Rajasthan - Campus Life"
              fill
              className="object-cover"
              priority
              sizes="100vw"
              quality={90}
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx0fHRsdHSIfIR0jIyUkJSMiIiMlKy4wLisqMx8hJzQnKi46PT4+JSZHSUFQLTc6Tj7/2wBDARUXFx4bHt0dHT4qIio+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj7/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
            />
            <div className="absolute inset-0 z-20 flex items-center">
              <div className="max-w-7xl mx-auto px-4 w-full">
                <div className="max-w-3xl">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-1.5 h-12 bg-yellow-500" />
                    <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight">
                      Inframe School Blog
                    </h1>
                  </div>
                  <p className="text-xl text-white/90 max-w-2xl mb-8">
                    Insights, stories, and inspiration from the top design school in Rajasthan focused on creating future-ready creative professionals
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-grow max-w-lg">
                      <input
                        type="text"
                        placeholder="Search articles, topics, keywords..."
                        className="w-full py-3 px-4 pl-12 rounded-md text-black"
                        aria-label="Search blog posts"
                      />
                      <Search className="absolute left-3 top-3 text-gray-500" size={20} />
                    </div>
                    <Button className="bg-yellow-400 text-black hover:bg-yellow-500 px-6 py-6">
                      Search
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 py-16">
          {/* Section Header */}
          <div className="text-start mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Latest Blogs</h1>
            <p className="text-gray-600 max-w-4xl ">
              Stay updated with our latest insights, tips, and guides on interior design, lifestyle, and more. Explore in-depth articles, curated advice, and practical tips from our experts to inspire your creativity.
            </p>
          </div>

          {/* Blog Grid */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {blogs.length > 0 ? (
              blogs.map((blog: any) => <BlogCard key={blog.id} blog={blog} />)
            ) : (
              <p className="text-center text-gray-500 col-span-full">
                No blogs available at the moment. Please check back later.
              </p>
            )}
          </div>
        </div>

      </main>
    </>
  );
}



  {/* <Head> */}
        {/* Schema.org JSON-LD structured data for better SEO */}
        {/* <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Blog",
              "name": "Inframe School Blog",
              "description": "Insights, stories, and information about the best design school in Rajasthan",
              "url": "https://inframeschool.edu.in/blog",
              "publisher": {
                "@type": "Organization",
                "name": "Inframe School",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://inframeschool.edu.in/logo.png"
                }
              },
              "blogPost": blogPosts.map(post => ({
                "@type": "BlogPosting",
                "headline": post.title,
                "description": post.excerpt,
                "keywords": post.keywords,
                "datePublished": post.date,
                "image": post.image
              }))
            })
          }}
        /> */}
      {/* </Head> */}