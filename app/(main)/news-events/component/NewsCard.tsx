// app/news-events/components/NewsCard.tsx
import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import { NewsItem } from "../api.ts/api";
import { motion } from "framer-motion";

interface NewsCardProps {
  news: NewsItem;
  variants?: any;
}

const NewsCard: React.FC<NewsCardProps> = ({ news, variants }) => {
  return (
    <motion.div
      variants={variants}
      className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
    >
      <div className="relative h-48">
        <Image
          src={news.image}
          alt={news.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute top-4 left-4 flex space-x-2">
          <span className="bg-black text-yellow-400 text-xs font-medium px-2 py-1 rounded">
            NEWS
          </span>
          <span
            className={`text-xs font-medium px-2 py-1 rounded capitalize ${
              news.category === "art"
                ? "bg-pink-100 text-pink-800"
                : news.category === "design"
                ? "bg-blue-100 text-blue-800"
                : news.category === "business"
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {news.category}
          </span>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between text-sm mb-3">
          <div className="flex items-center text-gray-500">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{news.date}</span>
          </div>
          <span className="text-xs text-gray-500">By {news.author}</span>
        </div>
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">
          {news.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {news.summary}
        </p>
        <Link
          href={`/news/${news.id}`}
          className="inline-flex items-center text-sm font-medium text-black bg-transparent hover:bg-yellow-400 border border-yellow-400 py-2 px-4 rounded-md transition-all duration-300 group"
        >
          Read More
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.div>
  );
};

export default NewsCard;