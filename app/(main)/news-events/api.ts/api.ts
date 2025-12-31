// app/news-events/api/api.ts
import axios from "axios";

// Types based on your backend structure
export interface ApiNewsEvent {
  id: string;
  title: string;
  description: string;
  type: "event" | "news";
  date?: string;
  start_time?: string;
  end_time?: string;
  category?: string;
  location?: string;
  image: string;
  is_active?: boolean;
  featured?: boolean;
  author?: string;
}

export interface ApiResponse {
  status: "success" | "error";
  message: string;
  data: ApiNewsEvent[];
}

export interface EventItem {
  id: string;
  title: string;
  category: "art" | "design" | "business" | "general";
  description: string;
  date: string | null;
  time: string | null;
  location: string | null;
  image: string;
  featured?: boolean;
  type: "event";
  isActive?: boolean;
}

export interface NewsItem {
  id: string;
  title: string;
  category: "art" | "design" | "business" | "general";
  summary: string;
  date: string | null;
  author: string | null;
  image: string;
  featured?: boolean;
  type: "news";
  isActive?: boolean;
}

const API_BASE = `${process.env.NEXT_PUBLIC_BASE_URL}`;

// Helper function to normalize category
const normalizeCategory = (
  category?: string
): "art" | "design" | "business" | "general" => {
  if (!category) return "general";

  const value = category.toLowerCase();
  if (
    value === "art" ||
    value === "design" ||
    value === "business" ||
    value === "general"
  ) {
    return value;
  }

  return "general";
};

// Transform API data to frontend format
const transformApiData = (apiData: ApiNewsEvent[]): {
  events: EventItem[];
  news: NewsItem[];
} => {
  const events: EventItem[] = [];
  const news: NewsItem[] = [];

  apiData.forEach((item) => {
    // Format date
    const formattedDate = item.date
      ? new Date(item.date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      : null;

    // Format time for events
    const formattedTime = 
      item.start_time && item.end_time 
        ? `${item.start_time} - ${item.end_time}`
        : null;

    if (item.type === "event") {
      events.push({
        id: item.id,
        title: item.title,
        category: normalizeCategory(item.category),
        description: item.description,
        date: formattedDate,
        time: formattedTime,
        location: item.location || null,
        image: item.image,
        featured: item.featured || false,
        type: "event",
        isActive: item.is_active
      });
    }

    if (item.type === "news") {
      news.push({
        id: item.id,
        title: item.title,
        category: normalizeCategory(item.category),
        summary: item.description, // Using description as summary
        date: formattedDate,
        author: item.author || "Admin",
        image: item.image,
        featured: item.featured || false,
        type: "news",
        isActive: item.is_active
      });
    }
  });

  return { events, news };
};

// GET: fetch all news and events (active only by default)
export const getAllNewsEvents = async (
  options: {
    type?: "event" | "news";
    is_active?: boolean;
  } = {}
): Promise<{
  events: EventItem[];
  news: NewsItem[];
}> => {
  try {
    // Your backend expects POST with body for filtering
    const res = await axios.post<ApiResponse>(
      `${API_BASE}/news_event/fetch`, // Adjust this endpoint based on your actual route
      {
        type: options.type,
        is_active: options.is_active ?? true // Default to active items only
      }
    );

    if (res.data.status !== "success") {
      throw new Error(res.data.message || "Failed to fetch data");
    }

    return transformApiData(res.data.data);
  } catch (error) {
    console.error("Error fetching news and events:", error);
    throw error;
  }
};

// GET: fetch only active events
export const getEvents = async (): Promise<EventItem[]> => {
  try {
    const { events } = await getAllNewsEvents({ type: "event", is_active: true });
    return events;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};

// GET: fetch only active news
export const getNews = async (): Promise<NewsItem[]> => {
  try {
    const { news } = await getAllNewsEvents({ type: "news", is_active: true });
    return news;
  } catch (error) {
    console.error("Error fetching news:", error);
    throw error;
  }
};

// GET: fetch single item by ID
export const getNewsEventById = async (
  id: string,
  type?: "event" | "news"
): Promise<EventItem | NewsItem | null> => {
  try {
    const res = await axios.post<ApiResponse>(
      `${API_BASE}/news_event/fetch`,
      {
        id,
        type,
        is_active: true
      }
    );

    if (res.data.status !== "success" || !res.data.data.length) {
      return null;
    }

    const { events, news } = transformApiData(res.data.data);
    
    if (events.length > 0) return events[0];
    if (news.length > 0) return news[0];
    
    return null;
  } catch (error) {
    console.error(`Error fetching item ${id}:`, error);
    throw error;
  }
};

// GET: fetch items by category
export const getItemsByCategory = async (
  category: "art" | "design" | "business" | "general",
  type?: "event" | "news"
): Promise<{
  events: EventItem[];
  news: NewsItem[];
}> => {
  try {
    const { events, news } = await getAllNewsEvents({ type, is_active: true });
    
    const filteredEvents = events.filter(event => event.category === category);
    const filteredNews = news.filter(item => item.category === category);
    
    return { events: filteredEvents, news: filteredNews };
  } catch (error) {
    console.error(`Error fetching ${category} items:`, error);
    throw error;
  }
};

// GET: fetch featured items
export const getFeaturedItems = async (): Promise<{
  events: EventItem[];
  news: NewsItem[];
}> => {
  try {
    const { events, news } = await getAllNewsEvents({ is_active: true });
    
    const featuredEvents = events.filter(event => event.featured);
    const featuredNews = news.filter(item => item.featured);
    
    return { events: featuredEvents, news: featuredNews };
  } catch (error) {
    console.error("Error fetching featured items:", error);
    throw error;
  }
};