// app/news-events/components/NewsEvent.tsx
"use client";

import { useState, useEffect } from "react";
import { Poppins } from "next/font/google";
import { Tab } from "@headlessui/react";
import { motion } from "framer-motion";
import ApplyNowForm from "./ApplyNowForm";
import HeroSection from "./HeroSection";
import SearchFilter from "./SearchFilter";
import EventCard from "./EventCard";
import NewsCard from "./NewsCard";
import CategoryFilter from "./CategoryFilter";
import { Button } from "@headlessui/react";
import { 
  getAllNewsEvents, 
  EventItem, 
  NewsItem 
} from "../api.ts/api";
import { 
  filterBySearch, 
  filterByCategory, 
  filterActiveItems,
  getUpcomingEvents, 
  getRecentItems 
} from "../api.ts/filters";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const NewsAndEventsPage = () => {
  // State management
  const [activeTab, setActiveTab] = useState(0);
  const [allEvents, setAllEvents] = useState<EventItem[]>([]);
  const [allNews, setAllNews] = useState<NewsItem[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<EventItem[]>([]);
  const [filteredNews, setFilteredNews] = useState<NewsItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [hasData, setHasData] = useState(true);

  // Fetch data using the API
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        // Fetch only active items from backend
        const { events, news } = await getAllNewsEvents({ is_active: true });
        
        // Filter active items just in case
        const activeEvents = filterActiveItems(events);
        const activeNews = filterActiveItems(news);
        
        setAllEvents(activeEvents);
        setAllNews(activeNews);
        setFilteredEvents(activeEvents);
        setFilteredNews(activeNews);
        
        // Check if we have any data
        setHasData(activeEvents.length > 0 || activeNews.length > 0);
      } catch (error) {
        console.error("Error loading data:", error);
        // Set empty arrays on error
        setAllEvents([]);
        setAllNews([]);
        setFilteredEvents([]);
        setFilteredNews([]);
        setHasData(false);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Filter logic
  useEffect(() => {
    // Start with all items
    let filteredEventsResult = [...allEvents];
    let filteredNewsResult = [...allNews];
    
    // Apply search filter
    if (searchTerm.trim()) {
      filteredEventsResult = filterBySearch(filteredEventsResult, searchTerm);
      filteredNewsResult = filterBySearch(filteredNewsResult, searchTerm);
    }
    
    // Apply category filter
    if (selectedCategory !== "all") {
      filteredEventsResult = filterByCategory(filteredEventsResult, selectedCategory);
      filteredNewsResult = filterByCategory(filteredNewsResult, selectedCategory);
    }
    
    setFilteredEvents(filteredEventsResult);
    setFilteredNews(filteredNewsResult);
    
    // Check if any data remains after filtering
    const hasFilteredData = filteredEventsResult.length > 0 || filteredNewsResult.length > 0;
    setHasData(hasFilteredData);
  }, [searchTerm, selectedCategory, allEvents, allNews]);

  // Get data for current tab
  const getTabData = () => {
    let tabEvents: EventItem[] = [];
    let tabNews: NewsItem[] = [];
    
    switch (activeTab) {
      case 0: // All
        tabEvents = filteredEvents;
        tabNews = filteredNews;
        break;
      case 1: // Upcoming
        tabEvents = getUpcomingEvents(filteredEvents);
        tabNews = [];
        break;
      case 2: // Recent
        tabEvents = getRecentItems(filteredEvents);
        tabNews = getRecentItems(filteredNews);
        break;
      case 3: // Featured
        tabEvents = filteredEvents.filter(event => event.featured);
        tabNews = filteredNews.filter(item => item.featured);
        break;
      default:
        tabEvents = [];
        tabNews = [];
    }
    
    return {
      events: tabEvents,
      news: tabNews,
      hasData: tabEvents.length > 0 || tabNews.length > 0
    };
  };

  const { events, news, hasData: tabHasData } = getTabData();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const handleApplyClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    setIsFormOpen(true);
  };

  const renderEmptyState = (message: string) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="col-span-3 py-16 text-center"
    >
      <div className="flex flex-col items-center justify-center">
        <div className="w-24 h-24 mb-6">
          <svg className="w-full h-full text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <h3 className="text-2xl font-semibold text-gray-600 mb-2">Data Not Found</h3>
        <p className="text-gray-500 mb-6 max-w-md">{message}</p>
        {(searchTerm || selectedCategory !== "all") && (
          <Button
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("all");
            }}
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium px-6 py-2 rounded-lg transition-colors"
          >
            Clear Filters
          </Button>
        )}
      </div>
    </motion.div>
  );

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="col-span-3 py-16 text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-yellow-400 border-t-transparent"></div>
          <p className="text-gray-500 mt-4">Loading news and events...</p>
        </div>
      );
    }

    // Check if there's no data at all
    if (!hasData) {
      return renderEmptyState("No news or events available at the moment. Please check back later.");
    }

    // Check if current tab has no data
    if (!tabHasData) {
      let message = "";
      switch (activeTab) {
        case 0: // All
          message = searchTerm || selectedCategory !== "all" 
            ? `No items found matching "${searchTerm}" in ${selectedCategory !== "all" ? `the ${selectedCategory} category` : "your search"}.`
            : "No news or events available at the moment.";
          break;
        case 1: // Upcoming
          message = "No upcoming events scheduled at this time.";
          break;
        case 2: // Recent
          message = "No recent news or events found.";
          break;
        case 3: // Featured
          message = "No featured items available at the moment.";
          break;
        default:
          message = "No data found.";
      }
      return renderEmptyState(message);
    }

    return (
      <>
        {events.map((event) => (
          <EventCard key={`event-${event.id}`} event={event} variants={itemVariants} />
        ))}
        {news.map((newsItem) => (
          <NewsCard key={`news-${newsItem.id}`} news={newsItem} variants={itemVariants} />
        ))}
      </>
    );
  };

  return (
    <div className={`min-h-screen bg-white ${poppins.className}`}>
      <HeroSection />
      <SearchFilter searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      
      {/* Category Filter Component */}
      <CategoryFilter
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      
      {/* Description Section */}
      <div className="text-black-300 text-lg leading-relaxed max-w-8xl mt-10 mx-8 text-justify font-light">
        The Inframe School of Art, Design, and Business is a vibrant hub of
        creativity and innovation, hosting a diverse array of events throughout
        the year. From cutting-edge exhibitions showcasing student and faculty
        work to industry-led workshops connecting our community with leading
        professionals, there's always something inspiring happening on campus.
        Our lecture series brings renowned artists, designers, and business
        leaders to share their insights and experiences, while our annual
        festivals celebrate the intersection of creativity and entrepreneurship.
        Whether you're interested in our upcoming gallery openings, professional
        development seminars, or collaborative projects with community partners,
        this page will keep you informed about all the exciting opportunities to
        engage with our dynamic community. Check back regularly for updates on
        exhibition dates, workshop registration, guest speaker announcements,
        and student showcases.
      </div>
      
      {/* Gallery Image */}
      <div className="relative w-full mt-5 h-[300px] overflow-hidden">
        <img
          src="/images/gallery/1721738128651.jpg"
          alt="Design School Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <h1 className="text-white text-3xl sm:text-4xl font-bold">Explore the Events</h1>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="container mx-auto px-4 py-12">
        <Tab.Group onChange={setActiveTab} defaultIndex={0}>
          <Tab.List className="flex space-x-4 border-b border-gray-200 mb-8 overflow-x-auto">
            {["All", "Upcoming", "Recent", "Featured"].map((tab) => (
              <Tab
                key={tab}
                className={({ selected }) =>
                  `px-6 py-3 text-sm font-medium border-b-2 outline-none transition-colors whitespace-nowrap ${
                    selected
                      ? "text-black border-yellow-400"
                      : "text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300"
                  }`
                }
              >
                {tab}
              </Tab>
            ))}
          </Tab.List>

          <Tab.Panels>
            <Tab.Panel>
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={containerVariants}
                initial="hidden"
                animate="show"
              >
                {renderContent()}
              </motion.div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>

      {/* Only show CTA and Newsletter if there's data */}
      {hasData && (
        <>
          {/* CTA Section */}
          <div className="w-full bg-opacity-90 py-16 px-6 md:px-12">
            <div className="max-w-7xl mx-auto bg-black bg-opacity-90 rounded-2xl shadow-2xl border border-zinc-800 px-6 md:px-12 py-12">
              <div className="flex flex-col md:flex-row items-center justify-between gap-10">
                <div className="text-center md:text-left">
                  <h2 className="text-4xl font-extrabold text-white mb-6 leading-tight">
                    Ready to Join Our Creative Community?
                  </h2>
                  <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto md:mx-0">
                    Take the next step in your creative journey. Our programs offer
                    hands-on experience, industry connections, and the skills you
                    need to thrive in today's design landscape.
                  </p>
                </div>
                <div className="w-full md:w-auto flex flex-col items-center space-y-3">
                  <Button
                    onClick={handleApplyClick}
                    className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-4 px-10 rounded-xl shadow-md transition transform hover:-translate-y-1 hover:shadow-lg w-full md:w-auto text-lg"
                  >
                    Apply Now
                  </Button>
                  <ApplyNowForm
                    isFormOpen={isFormOpen}
                    setIsFormOpen={setIsFormOpen}
                    isScrolled={false}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="bg-black py-20">
            <div className="container mx-auto px-6">
              <div className="relative bg-zinc-900 rounded-3xl p-8 md:p-12 overflow-hidden shadow-xl border border-zinc-800">
                <div className="absolute top-0 right-0 w-80 h-80 bg-yellow-400 rounded-full opacity-5 blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-400 rounded-full opacity-5 blur-3xl transform -translate-x-1/3 translate-y-1/3"></div>
                <div className="absolute h-full w-1 bg-gradient-to-b from-yellow-400 via-yellow-500 to-transparent opacity-20 left-0 top-0 rounded-full"></div>

                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                  <div className="text-center md:text-left max-w-xl">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                      Stay <span className="text-yellow-400">Connected</span>
                    </h2>
                    <p className="text-gray-300 text-lg">
                      Get exclusive updates on upcoming events, exhibitions, and
                      opportunities delivered straight to your inbox.
                    </p>
                  </div>

                  <div className="w-full md:w-auto">
                    <form 
                      className="flex flex-col sm:flex-row gap-4 w-full"
                      onSubmit={(e) => {
                        e.preventDefault();
                        // Handle newsletter subscription
                        const form = e.target as HTMLFormElement;
                        const emailInput = form.querySelector('input[type="email"]') as HTMLInputElement;
                        if (emailInput) {
                          console.log('Subscribing email:', emailInput.value);
                          // Add your subscription logic here
                          emailInput.value = '';
                        }
                      }}
                    >
                      <div className="relative flex-grow">
                        <input
                          type="email"
                          placeholder="Enter your email"
                          className="w-full bg-zinc-800 text-white border border-zinc-700 px-5 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent placeholder-gray-500"
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-4 rounded-xl transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg"
                      >
                        Subscribe
                      </button>
                    </form>
                    <p className="text-zinc-500 text-sm mt-3 text-center sm:text-left">
                      We respect your privacy. Unsubscribe anytime.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NewsAndEventsPage;