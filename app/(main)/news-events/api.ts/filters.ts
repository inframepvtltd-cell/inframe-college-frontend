// app/news-events/api/filters.ts
import { EventItem, NewsItem } from "./api";

// Filter items by search term
export const filterBySearch = <T extends EventItem | NewsItem>(
  items: T[],
  searchTerm: string
): T[] => {
  if (!searchTerm.trim()) return items;

  const term = searchTerm.toLowerCase();
  
  return items.filter((item) => {
    // Check title
    if (item.title.toLowerCase().includes(term)) return true;
    
    // Check description/summary based on type
    if ('description' in item) {
      return (item as EventItem).description.toLowerCase().includes(term);
    } else {
      return (item as NewsItem).summary.toLowerCase().includes(term);
    }
  });
};

// Filter items by category
export const filterByCategory = <T extends EventItem | NewsItem>(
  items: T[],
  category: string
): T[] => {
  if (category === "all") return items;
  return items.filter(item => item.category === category);
};

// Filter only active items
export const filterActiveItems = <T extends EventItem | NewsItem>(
  items: T[]
): T[] => {
  return items.filter(item => item.isActive !== false); // Include undefined as active
};

// Sort items by date (newest first)
export const sortByDate = <T extends EventItem | NewsItem>(
  items: T[],
  order: "asc" | "desc" = "desc"
): T[] => {
  return [...items].sort((a, b) => {
    const dateA = a.date ? new Date(a.date).getTime() : 0;
    const dateB = b.date ? new Date(b.date).getTime() : 0;
    
    return order === "desc" ? dateB - dateA : dateA - dateB;
  });
};

// Get upcoming events (future dates)
export const getUpcomingEvents = (events: EventItem[]): EventItem[] => {
  const now = new Date();
  
  return events.filter(event => {
    if (!event.date) return false;
    const eventDate = new Date(event.date);
    return eventDate >= now;
  });
};

// Get recent items (within last 30 days)
export const getRecentItems = <T extends EventItem | NewsItem>(
  items: T[]
): T[] => {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  return items.filter(item => {
    if (!item.date) return false;
    const itemDate = new Date(item.date);
    return itemDate >= thirtyDaysAgo;
  });
};