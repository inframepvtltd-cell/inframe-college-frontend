"use client";
import React, { useEffect, useState } from "react";
import {
  FileDown,
  Calendar,
  BookOpen,
  NewspaperIcon,
  Building,
  Users,
  Award,
  FileText,
  Download as DownloadIcon,
  CalendarDays,
  BarChart3,
  Search,
  Filter,
} from "lucide-react";
import { Poppins } from "next/font/google";
import Image from "next/image";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Input } from "@components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import { DownloadItem, fetchDownloads, groupDownloadsByCategory, incrementDownloadCount, getUniqueCategories, sortDownloadsByDate } from "../api/api";
import DownloadsLoading from "./DownloadLoading";
import DownloadsEmptyState from "./DownloadsEmptyState";
import DreamsSection from "./DreamSection";
import FreeResourcesCTABanner from "./FreeResourcesCTABanner";
import ApplyNow from "@components/ApplyNow";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

// Category icons mapping
const categoryIcons: Record<string, React.ElementType> = {
  "Entrance Exam Schedule": Calendar,
  "Previous Year Sample Papers": BookOpen,
  Newsletters: NewspaperIcon,
  "Brochure/Prospectus": FileDown,
  "Placement Partner Documents": Building,
  "Club Documents": Users,
  "Scholarship and Discount": Award,
  "Others": FileText,
};

// Default categories to show even if empty
const defaultCategories = [
  "Entrance Exam Schedule",
  "Previous Year Sample Papers",
  "Newsletters",
  "Brochure/Prospectus",
  "Placement Partner Documents",
  "Club Documents",
  "Scholarship and Discount",
  "Others"
];

const DownloadsSection = () => {
  const [downloads, setDownloads] = useState<DownloadItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"date" | "downloads">("date");

  useEffect(() => {
    loadDownloads();
  }, []);

  const loadDownloads = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchDownloads();
      const sortedData = sortDownloadsByDate(data);
      setDownloads(sortedData);
    } catch (err) {
      setError("Failed to load downloads. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (item: DownloadItem) => {
    try {
      // Open file in new tab
      window.open(item.file_url, '_blank', 'noopener,noreferrer');
      
      // Increment download count
      await incrementDownloadCount(item.id);
      
      // Update local state
      setDownloads(prev => prev.map(d => 
        d.id === item.id ? { ...d, download_count: d.download_count + 1 } : d
      ));
    } catch (error) {
      console.error('Error handling download:', error);
    }
  };

  // Filter and sort downloads
  const filteredDownloads = downloads.filter(item => {
    const matchesSearch = searchTerm === "" || 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Sort downloads
  const sortedDownloads = [...filteredDownloads].sort((a, b) => {
    if (sortBy === "date") {
      return new Date(b.upload_date).getTime() - new Date(a.upload_date).getTime();
    } else {
      return b.download_count - a.download_count;
    }
  });

  const groupedDownloads = groupDownloadsByCategory(sortedDownloads);
  const uniqueCategories = getUniqueCategories(downloads);
  const totalDownloads = downloads.reduce((sum, item) => sum + item.download_count, 0);

  if (loading) {
    return <DownloadsLoading />;
  }

  return (
    <div className={`w-full bg-white ${poppins.className}`}>
      {/* Hero Section */}
      <div className="relative z-10">
        <div className="relative h-[75vh]">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/65 to-transparent z-10" />
          <Image
            src="/images/gallery/1721366034581.jpg"
            alt="Campus Life Hero Image"
            fill
            className="object-cover"
            priority
            sizes="100vw"
            quality={85}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXbhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx0fHRsdHSIfIR0jIyUkJSMiIiMlKy4wLisqMx8hJzQnKi46PT4+JSZHSUFQLTc6Tj7/2wBDARUXFx4bHt0dHT4qIio+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj7/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
          />
          <div className="absolute inset-0 z-20 flex items-center">
            <div className="max-w-7xl mx-auto px-4 w-full">
              <div className="max-w-3xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-1.5 h-12 bg-yellow-400" />
                  <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight">
                    Downloads
                  </h1>
                </div>
                <p className="text-xl text-white max-w-2xl">
                  Access all your essential documents and resources in one place
                </p>
                {downloads.length > 0 && (
                  <div className="flex items-center gap-6 mt-6">
                    <div className="flex items-center gap-2 text-white">
                      <FileDown className="w-5 h-5 text-yellow-300" />
                      <span className="text-lg">{downloads.length} Resources</span>
                    </div>
                    <div className="flex items-center gap-2 text-white">
                      <DownloadIcon className="w-5 h-5 text-yellow-300" />
                      <span className="text-lg">{totalDownloads.toLocaleString()} Total Downloads</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Icons */}
      <div className="container mx-auto -mt-16 relative z-20 px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          {defaultCategories.map((category) => {
            const Icon = categoryIcons[category];
            const categoryItems = groupedDownloads[category] || [];
            const itemCount = categoryItems.length;
            
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category === selectedCategory ? "all" : category)}
                className={`flex flex-col items-center p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border ${
                  selectedCategory === category 
                    ? 'border-yellow-400 bg-yellow-50 transform scale-[1.02]' 
                    : 'border-yellow-100 bg-white'
                }`}
              >
                <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-3 ${
                  selectedCategory === category ? 'bg-yellow-100' : 'bg-yellow-50'
                }`}>
                  <Icon className={`w-7 h-7 ${
                    selectedCategory === category ? 'text-yellow-700' : 'text-yellow-600'
                  }`} />
                </div>
                <span className="text-sm font-medium text-center text-gray-700 mb-1">
                  {category}
                </span>
                <Badge variant={itemCount > 0 ? "default" : "outline"} className="text-xs">
                  {itemCount} {itemCount === 1 ? 'item' : 'items'}
                </Badge>
              </button>
            );
          })}
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-yellow-100">
          <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search downloads by title or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-yellow-200 focus:border-yellow-400"
                />
              </div>
            </div>
            
            <div className="flex gap-3">
              <Select value={sortBy} onValueChange={(value: "date" | "downloads") => setSortBy(value)}>
                <SelectTrigger className="w-[180px] border-yellow-200">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <SelectValue placeholder="Sort by" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4" />
                      Sort by Date
                    </div>
                  </SelectItem>
                  <SelectItem value="downloads">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="h-4 w-4" />
                      Sort by Popularity
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[180px] border-yellow-200">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <SelectValue placeholder="All Categories" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {uniqueCategories.map(category => (
                    <SelectItem key={category} value={category}>
                      <div className="flex items-center gap-2">
                        {React.createElement(categoryIcons[category] || FileText, {
                          className: "h-4 w-4"
                        })}
                        {category}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {searchTerm || selectedCategory !== "all" ? (
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Showing {filteredDownloads.length} of {downloads.length} downloads
                {searchTerm && ` for "${searchTerm}"`}
                {selectedCategory !== "all" && ` in "${selectedCategory}"`}
              </p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                }}
                className="text-yellow-600 hover:text-yellow-700"
              >
                Clear Filters
              </Button>
            </div>
          ) : null}
        </div>

        <DreamsSection />

        {/* Download Sections */}
        {downloads.length === 0 ? (
          <DownloadsEmptyState onRetry={loadDownloads} />
        ) : filteredDownloads.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">No matching downloads found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search or filter criteria
            </p>
            <Button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
              }}
              className="bg-yellow-600 hover:bg-yellow-700"
            >
              Show All Downloads
            </Button>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-12 border border-yellow-100">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-800">
                  Download Center
                </h2>
                <p className="text-gray-600 mt-2">
                  Browse and download resources by category
                </p>
              </div>
              <div className="flex items-center gap-4 mt-4 md:mt-0">
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">{filteredDownloads.length}</div>
                  <div className="text-sm text-gray-600">Files</div>
                </div>
                <div className="h-8 w-px bg-gray-200"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">
                    {filteredDownloads.reduce((sum, item) => sum + item.download_count, 0).toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Total Downloads</div>
                </div>
              </div>
            </div>
            
            <Accordion 
              type="single" 
              collapsible 
              className="w-full"
              defaultValue={selectedCategory !== "all" ? selectedCategory : undefined}
            >
              {Object.entries(groupedDownloads).map(([category, items]) => (
                <AccordionItem
                  key={category}
                  value={category}
                  id={category === "Brochure/Prospectus" ? "brochure-section" : undefined}
                >
                  <AccordionTrigger className="px-4 hover:bg-yellow-50 rounded-xl transition-all duration-300 group">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center group-hover:bg-yellow-200 transition-colors">
                          {React.createElement(categoryIcons[category] || FileDown, {
                            className: "w-5 h-5 text-yellow-700",
                          })}
                        </div>
                        <div className="text-left">
                          <span className="text-lg font-medium text-gray-700">
                            {category}
                          </span>
                          <div className="flex items-center gap-3 mt-1">
                            <Badge variant="secondary" className="text-xs">
                              {items.length} {items.length === 1 ? 'file' : 'files'}
                            </Badge>
                            <span className="text-xs text-gray-500 flex items-center gap-1">
                              <DownloadIcon className="w-3 h-3" />
                              {items.reduce((sum, item) => sum + item.download_count, 0).toLocaleString()} downloads
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 px-4 pt-4">
                      {items.map((item) => (
                        <div
                          key={item.id}
                          className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-yellow-50 rounded-xl hover:bg-yellow-100 transition-all duration-300 group/item"
                        >
                          <div className="flex-1 mb-3 md:mb-0">
                            <div className="flex items-start gap-3">
                              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                                <FileText className="w-5 h-5 text-yellow-600" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-gray-800 mb-1 group-hover/item:text-yellow-700 transition-colors">
                                  {item.title}
                                </h3>
                                <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                                  {item.description}
                                </p>
                                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                                  <span className="flex items-center gap-1">
                                    <CalendarDays className="w-3 h-3" />
                                    {new Date(item.upload_date).toLocaleDateString('en-US', {
                                      year: 'numeric',
                                      month: 'short',
                                      day: 'numeric'
                                    })}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <DownloadIcon className="w-3 h-3" />
                                    {item.download_count} downloads
                                  </span>
                                  <Badge variant="outline" className="text-xs">
                                    {item.file_name.split('.').pop()?.toUpperCase()}
                                  </Badge>
                                  <Badge variant="outline" className="text-xs">
                                    {(item.file_url.includes('drive.google.com') || item.file_url.includes('dropbox')) 
                                      ? 'Cloud File' 
                                      : 'Direct Download'}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          </div>
                          <Button
                            onClick={() => handleDownload(item)}
                            className="bg-yellow-600 hover:bg-yellow-700 text-white whitespace-nowrap"
                          >
                            <FileDown className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            
            {/* Summary */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <FileDown className="w-5 h-5 text-yellow-700" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total Resources</p>
                      <p className="text-xl font-bold text-gray-800">{downloads.length}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <DownloadIcon className="w-5 h-5 text-blue-700" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total Downloads</p>
                      <p className="text-xl font-bold text-gray-800">{totalDownloads.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <CalendarDays className="w-5 h-5 text-green-700" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Last Updated</p>
                      <p className="text-xl font-bold text-gray-800">
                        {downloads.length > 0 
                          ? new Date(Math.max(...downloads.map(d => new Date(d.updated_at).getTime())))
                              .toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
                          : 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <FreeResourcesCTABanner />
      <ApplyNow />
    </div>
  );
};

export default DownloadsSection;