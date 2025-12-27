import { getBlogBySlug } from "../api";
import Image from "next/image";
import {
  Calendar,
  Clock,
  User,
  Tag,
  ArrowLeft,
  Share2,
  Bookmark,
  Quote,
  ChevronRight,
  CheckCircle,
  Facebook,
  Twitter,
  Linkedin,
  Link as LinkIcon
} from "lucide-react";
import Link from "next/link";

interface Props {
  params: { slug: string };
}

export default async function ViewBlogPage({ params }: Props) {
  const { slug } = await params;
  const response = await getBlogBySlug(slug);
  const blog = response.data;

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Blog Not Found</h1>
          <p className="text-gray-600 mb-6">The blog you're looking for doesn't exist.</p>
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft size={18} />
            Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  // Extract keywords
  const keywords = blog.meta_keywords
    ? blog.meta_keywords.split(',').map((k: string) => k.trim())
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Back Navigation */}
      <div className="mt-1 sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-4">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Blogs</span>
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 md:px-6 pt-8 md:pt-12 pb-12">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <ChevronRight size={14} />
            <Link href="/blogs" className="hover:text-blue-600 transition-colors">Blogs</Link>
            <ChevronRight size={14} />
            <span className="text-gray-700 font-medium truncate max-w-[200px]">{blog.title}</span>
          </div>

          {/* Category Badge */}
          {blog.category && (
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full mb-6">
              <Tag size={14} />
              <span className="font-medium">{blog.category}</span>
            </div>
          )}

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {blog.title}
          </h1>

          {/* Excerpt */}
          {blog.excerpt && (
            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl">
              {blog.excerpt}
            </p>
          )}

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 mb-8">
            {/* Author */}
            {blog.author && (
              <div className="flex items-center gap-3">
                {blog.author.image && (
                  <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-white shadow-lg">
                    <Image
                      src={blog.author.image}
                      alt={blog.author.name}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                )}
                <div>
                  <p className="font-semibold text-gray-800">{blog.author.name}</p>
                  <p className="text-sm text-gray-500">Author</p>
                </div>
              </div>
            )}

            {/* Date & Read Time */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar size={18} className="text-blue-500" />
                <span className="font-medium">
                  {new Date(blog.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric"
                  })}
                </span>
              </div>
              <div className="h-6 w-px bg-gray-300" />
              <div className="flex items-center gap-2 text-gray-600">
                <Clock size={18} className="text-purple-500" />
                <span className="font-medium">{blog.read_time} min read</span>
              </div>
            </div>
          </div>


        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Article Content */}
          <article className="lg:col-span-8">
            {/* Hero Image */}
            {blog.hero_image && (
              <div className="relative rounded-2xl overflow-hidden shadow-xl mb-10">
                <Image
                  src={blog.hero_image}
                  alt={blog.title}
                  width={1200}
                  height={630}
                  className="w-full h-auto object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            )}

            {/* Content Sections */}
            <div className="prose prose-lg max-w-none">
              {blog.sections?.map((section: any, index: number) => (
                <section
                  key={section.id || index}
                  className="mb-12 last:mb-0 scroll-mt-24"
                  id={`section-${index + 1}`}
                >
                  {/* Section Title */}
                  {section.title && (
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 pb-3 border-b border-gray-200">
                      {section.title}
                    </h2>
                  )}

                  {/* Highlight Title */}
                  {section.highlight_title && (
                    <div className="flex items-center gap-3 bg-gradient-to-r from-blue-50 to-indigo-50 p-5 rounded-xl mb-6">
                      <CheckCircle className="text-blue-600 flex-shrink-0" size={24} />
                      <h3 className="text-xl font-bold text-blue-700 m-0">
                        {section.highlight_title}
                      </h3>
                    </div>
                  )}

                  {/* Content */}
                  {section.content && (
                    <div className="text-gray-700 leading-relaxed text-lg mb-6">
                      <div className="whitespace-pre-line">
                        {section.content.split('\n').map((paragraph: string, idx: number) => (
                          paragraph.trim() ? (
                            <p key={idx} className="mb-4 last:mb-0">
                              {paragraph}
                            </p>
                          ) : null
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Section Image */}
                  {section.image && (
                    <figure className="my-8">
                      <div className="relative rounded-xl overflow-hidden shadow-lg">
                        <Image
                          src={section.image}
                          alt={section.title || "Section image"}
                          width={800}
                          height={450}
                          className="w-full h-auto object-cover"
                        />
                      </div>
                      {section.title && (
                        <figcaption className="text-center text-gray-500 text-sm mt-3">
                          {section.title}
                        </figcaption>
                      )}
                    </figure>
                  )}

                  {/* Highlights */}
                  {section.highlights?.length > 0 && (
                    <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-6 my-8">
                      <h4 className="text-lg font-semibold text-gray-800 mb-4">
                        Key Points
                      </h4>
                      <ul className="space-y-3">
                        {section.highlights.map((item: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <div className="w-2 h-2 rounded-full bg-blue-600" />
                            </div>
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Quote */}
                  {section.quote && (
                    <div className="my-10 p-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border-l-4 border-blue-500">
                      <Quote size={32} className="text-blue-400 mb-4" />
                      <blockquote className="text-2xl font-serif text-gray-800 italic leading-relaxed mb-4">
                        "{section.quote}"
                      </blockquote>
                      {section.quote_author && (
                        <p className="text-gray-600 font-medium">
                          — {section.quote_author}
                        </p>
                      )}
                    </div>
                  )}
                </section>
              ))}
            </div>

            {/* Tags */}
            {keywords.length > 0 && (
              <div className="mt-16 pt-8 border-t border-gray-200">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Tags
                </h3>
                <div className="flex flex-wrap gap-3">
                  {keywords.map((keyword: string, index: number) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors cursor-pointer text-sm font-medium"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Share Bottom Section */}
            <div className="mt-16 p-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Enjoyed this article?
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Share it with your network to help others discover it too!
              </p>
              <div className="flex justify-center gap-4">
                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  <Share2 size={18} className="inline mr-2" />
                  Share Article
                </button>
                <Link
                  href="/blogs"
                  className="px-6 py-3 bg-white text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
                >
                  Read More Articles
                </Link>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-4">
            <div className="sticky top-24 space-y-8">
              {/* Table of Contents */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 mb-4">
                  Table of Contents
                </h3>
                <nav className="space-y-2">
                  {blog.sections?.map((section: any, index: number) => (
                    section.title && (
                      <a
                        key={index}
                        href={`#section-${index + 1}`}
                        className="block py-2 px-3 rounded-lg hover:bg-gray-50 text-gray-600 hover:text-blue-600 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs flex items-center justify-center font-medium">
                            {index + 1}
                          </div>
                          <span className="font-medium">{section.title}</span>
                        </div>
                      </a>
                    )
                  ))}
                </nav>
              </div>

              {/* Author Card */}
              {blog.author && (
                <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-lg p-6 border border-gray-100">
                  <div className="text-center">
                    {blog.author.image && (
                      <div className="relative w-20 h-20 rounded-full overflow-hidden mx-auto mb-4 ring-4 ring-white shadow-lg">
                        <Image
                          src={blog.author.image}
                          alt={blog.author.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>
                    )}
                    <h4 className="text-xl font-bold text-gray-800 mb-2">
                      {blog.author.name}
                    </h4>
                    <p className="text-gray-600 mb-4">Author</p>
                    <button className="w-full py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                      Follow Author
                    </button>
                  </div>
                </div>
              )}

              {/* SEO Preview */}
              {(blog.meta_title || blog.meta_description) && (
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <span>SEO Preview</span>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      Optimized
                    </span>
                  </h3>
                  <div className="space-y-4">
                    {blog.meta_title && (
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Title</p>
                        <p className="text-blue-600 font-medium line-clamp-2">
                          {blog.meta_title}
                        </p>
                      </div>
                    )}
                    {blog.meta_description && (
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Description</p>
                        <p className="text-gray-700 line-clamp-3">
                          {blog.meta_description}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Related Posts Placeholder */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 mb-4">
                  You May Also Like
                </h3>
                <div className="space-y-4">
                  {/* Add related posts component here */}
                  <div className="text-center py-8 text-gray-500">
                    <p>Related articles coming soon!</p>
                    <Link
                      href="/blogs"
                      className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center gap-1 mt-2"
                    >
                      Browse all articles
                      <ChevronRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8 flex flex-col gap-3 z-20">
        <button className="w-12 h-12 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
          <Share2 size={20} />
        </button>
        <button className="w-12 h-12 bg-white text-gray-700 rounded-full shadow-lg hover:bg-gray-50 transition-colors flex items-center justify-center border border-gray-200">
          <ArrowLeft size={20} />
        </button>
      </div>
    </div>
  );
}