// app/news-events/components/EventCard.tsx
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { EventItem } from "../api.ts/api";
import { motion } from "framer-motion";

interface EventCardProps {
  event: EventItem;
  variants?: any;
}

const EventCard: React.FC<EventCardProps> = ({ event, variants }) => {
  return (
    <motion.div
      variants={variants}
      className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
    >
      <div className="relative h-48">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute top-4 left-4 flex space-x-2">
          <span className="bg-yellow-400 text-black text-xs font-medium px-2 py-1 rounded">
            EVENT
          </span>
          {event.category && (
            <span
              className={`text-xs font-medium px-2 py-1 rounded capitalize ${
                event.category === "art"
                  ? "bg-pink-100 text-pink-800"
                  : event.category === "design"
                  ? "bg-blue-100 text-blue-800"
                  : event.category === "business"
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {event.category}
            </span>
          )}
        </div>
      </div>
      <div className="p-6">
        <div className="flex flex-wrap gap-y-1 gap-x-4 text-gray-500 text-sm mb-3">
          {event.date && (
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{event.date}</span>
            </div>
          )}
          {event.time && (
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>{event.time}</span>
            </div>
          )}
        </div>
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">
          {event.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {event.description}
        </p>
        <div className="flex justify-between items-center">
          {event.location && (
            <span className="text-xs text-gray-500">{event.location}</span>
          )}
          <Link
            href={`/events/${event.id}`}
            className="inline-flex items-center text-sm font-medium text-black bg-transparent hover:bg-yellow-400 border border-yellow-400 py-2 px-4 rounded-md transition-all duration-300 group"
          >
            View Details
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default EventCard;