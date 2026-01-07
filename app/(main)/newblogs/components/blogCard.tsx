"use client";

import Link from "next/link";
import Image from "next/image";
import { Calendar, ArrowRight } from "lucide-react";

interface BlogCardProps {
  blog: any;
}

export default function BlogCard({ blog }: BlogCardProps) {
  return (
    <article className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-blue-200 hover:shadow-xl transition-all duration-300 flex flex-col h-full">

      {/* Image */}
      <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
        <Image
          src={blog.heroImage}
          alt={blog.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col justify-between flex-1">

        <div>
          {/* Meta Info */}
          <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
            {blog.category && (
              <>
                <span className="px-3 py-1 bg-gray-100 rounded-full font-medium">
                  {blog.category}
                </span>
                <span className="text-gray-300">•</span>
              </>
            )}
            <div className="flex items-center gap-1">
              <Calendar size={14} />
              {new Date(blog.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {blog.title}
          </h3>

          {/* Excerpt */}
          <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
            {blog.excerpt}
          </p>
        </div>

        {/* Read More Button */}
        <div className="pt-4 mt-auto">
          <Link
            href={`/newblogs/${blog.slug}`}
            className="inline-flex items-center justify-center bg-black text-white px-4 py-2 rounded-md font-medium hover:bg-gray-800 transition-colors w-full"
          >
            <span>Continue reading</span>
            <ArrowRight
              size={16}
              className="ml-2 transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </article>
  );
}
