"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import { Search, ChevronDown, X, GraduationCap, Sparkles } from "lucide-react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import Link from "next/link"
import { Poppins } from "next/font/google"
import { FaArrowRight } from "react-icons/fa"
import { transformApiCoursesToCategories } from "../../utils/transFormCourse"
import { courseTypes } from "../../utils/courseTypes"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

const CATEGORY_MAP: Record<string, string[]> = {
  All: [],
  Design: ["Animation Vfx", "Digital Marketing", "Entrepreneurship Skill", "Fashion Design", "Fine Arts", "Graphic Design", "Interior Design", "Jewellery Design", "Media Entertainment"],
  Business: ["Digital Marketing", "Entrepreneurship Skill"],
  Art: ["Animation Vfx", "Fine Arts"],
}

const StudyDropDown = () => {
  const [categories, setCategories] = useState<any[]>([])
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev)
  const handleLinkClick = () => setIsDropdownOpen(false)

  // Fetch courses on mount
  useEffect(() => {
    const fetchCourses = async () => {
      const data = await courseTypes
      const transformed = transformApiCoursesToCategories(data)
      setCategories(transformed)
    }
    fetchCourses()
  }, [])

  // Detect mobile screen size
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024)
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Close when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleOutsideClick)
    return () => document.removeEventListener("mousedown", handleOutsideClick)
  }, [])

  const allCategories = useMemo(() => {
    if (!categories.length) return ["All"]

    const categoriesSet = new Set<string>(["All"])

    // real API categories
    categories.forEach(cat => {
      if (cat.title) categoriesSet.add(cat.title)
    })

    return Array.from(categoriesSet)
  }, [categories])

  // Sort links by priority: Bachelor's degrees first, then Diplomas, then others
  const sortLinksByPriority = (links: any[]) => {
    if (!links || !links.length) return []
    
    return [...links].sort((a, b) => {
      const textA = a.text?.toLowerCase() || ''
      const textB = b.text?.toLowerCase() || ''
      
      // Priority 1: Bachelor's degrees
      const isBachelorA = textA.includes('bachelor') || textA.includes('b.sc') || textA.includes('b.voc') || textA.includes('b.des')
      const isBachelorB = textB.includes('bachelor') || textB.includes('b.sc') || textB.includes('b.voc')
      
      if (isBachelorA && !isBachelorB) return -1
      if (!isBachelorA && isBachelorB) return 1
      
      // Priority 2: Diplomas
      const isDiplomaA = textA.includes('diploma')
      const isDiplomaB = textB.includes('diploma')
      
      if (isDiplomaA && !isDiplomaB) return -1
      if (!isDiplomaA && isDiplomaB) return 1
      
      // Priority 3: Certificate courses (shorter names first)
      if (textA.length !== textB.length) {
        return textA.length - textB.length
      }
      
      // Alphabetical for everything else
      return textA.localeCompare(textB)
    })
  }

  // Filtered categories logic - Simplified to always show cards
  const filteredItems = useMemo(() => {
    if (!categories.length) return []

    // When "All" is selected, show all categories with their items filtered by search
    if (selectedCategory === "All") {
      return categories
        .map(category => ({
          ...category,
          items: category.items.filter((item: any) =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase())
          ),
        }))
        .filter(category => category.items.length > 0)
    }

    // For virtual categories (Design, Business, Art)
    if (["Design", "Business", "Art"].includes(selectedCategory)) {
      const allowedTitles = CATEGORY_MAP[selectedCategory] || []
      
      // Get all matching items from all categories
      const allMatchingItems = categories
        .flatMap(category => 
          category.items
            .filter((item: any) => 
              allowedTitles.includes(item.title) &&
              item.title.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((item: any) => ({
              ...item,
              originalCategory: category.title // Keep track of original category
            }))
        )

      // Group by original category for better organization
      const groupedByCategory = allMatchingItems.reduce((acc: any, item) => {
        if (!acc[item.originalCategory]) {
          acc[item.originalCategory] = []
        }
        acc[item.originalCategory].push(item)
        return acc
      }, {})

      // Convert to array format
      return Object.entries(groupedByCategory).map(([category, items]) => ({
        title: category,
        items: items
      }))
    }

    // For other specific categories
    const specificCategory = categories.find(cat => cat.title === selectedCategory)
    if (specificCategory) {
      return [{
        title: selectedCategory,
        items: specificCategory.items.filter((item: any) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase())
        ),
      }]
    }

    return []
  }, [categories, selectedCategory, searchQuery])

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Enhanced Toggle Button */}
      <Button
        className="hover:text-white relative bg-gradient-to-br from-amber-300 via-yellow-400 to-orange-400 hover:from-amber-400 hover:via-yellow-500 hover:to-orange-500 text-gray-900 font-bold px-3 py-5 rounded-xl border-2 border-white/30 shadow-lg hover:shadow-xl hover:shadow-amber-200/50 transition-all duration-300 group overflow-hidden active:scale-95"
        onClick={toggleDropdown}
        aria-expanded={isDropdownOpen}
        aria-haspopup="true"
      >
        {/* Shine effect */}
        <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>

        {/* Inner glow */}
        <span className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent rounded-xl"></span>

        <span className="relative flex items-center justify-center">
          Study Programs
          <ChevronDown
            className={`h-5 w-5 ml-3 transition-all duration-300 ${isDropdownOpen ? "rotate-180" : ""} group-hover:translate-y-0.5`}
          />
        </span>
      </Button>

      {/* Desktop Dropdown */}
      {!isMobile && isDropdownOpen && (
        <div className="absolute left-0 mt-3 z-50 w-screen max-w-[1200px] bg-white/95 backdrop-blur-xl shadow-2xl rounded-2xl border border-gray-200 p-8 max-h-[85vh] overflow-y-auto animate-in fade-in-0 zoom-in-95 duration-300">
          <DropdownContent
            allCategories={allCategories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filteredItems={filteredItems}
            handleLinkClick={handleLinkClick}
            sortLinksByPriority={sortLinksByPriority}
            isVirtualCategory={["Design", "Business", "Art"].includes(selectedCategory)}
          />
        </div>
      )}

      {/* Mobile Fullscreen Drawer */}
      {isMobile && isDropdownOpen && (
        <div className="fixed inset-0 z-50 bg-gradient-to-br from-white to-gray-50 flex flex-col h-screen overflow-hidden animate-in slide-in-from-top duration-300">
          <div className="flex justify-between items-center p-6 border-b bg-white/80 backdrop-blur-sm shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-400 rounded-lg">
                <GraduationCap className="h-6 w-6 text-black" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Study Programs</h2>
                <p className="text-sm text-gray-600">Explore our courses</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsDropdownOpen(false)}
              aria-label="Close"
              className="rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            <DropdownContent
              allCategories={allCategories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              filteredItems={filteredItems}
              handleLinkClick={handleLinkClick}
              sortLinksByPriority={sortLinksByPriority}
              isVirtualCategory={["Design", "Business", "Art"].includes(selectedCategory)}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default StudyDropDown

/* --------------------------
 *   Enhanced Dropdown Content
 * -------------------------- */
const DropdownContent = ({
  allCategories,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
  filteredItems,
  handleLinkClick,
  sortLinksByPriority,
  isVirtualCategory
}: any) => {
  const allItems = useMemo(() => {
    return filteredItems.flatMap((category: any) => category.items)
  }, [filteredItems])

  return (
    <>
      {/* Enhanced Search Input */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between lg:gap-6 mb-8">
        <div className="relative flex-1 mb-4 lg:mb-0">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Search courses, programs, degrees..."
            className="pl-12 pr-4 py-3 text-lg border-2 border-gray-200 focus:border-yellow-400 rounded-xl bg-gray-50/50 focus:bg-white transition-all duration-300"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Results Counter */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Sparkles className="h-4 w-4 text-yellow-500" />
          <span>
            {allItems.length}
            {allItems.length === 1 ? " program found" : " programs found"}
          </span>
        </div>
      </div>

      {/* Enhanced Category Buttons */}
      <div className="flex flex-wrap gap-3 mb-8 overflow-x-auto pb-2">
        {allCategories.map((category: string) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="lg"
            onClick={() => setSelectedCategory(category)}
            className={`rounded-full px-6 py-2 font-semibold transition-all duration-300 flex-shrink-0 ${selectedCategory === category
              ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-black shadow-lg border-yellow-300"
              : "border-2 border-gray-200 hover:border-yellow-300 hover:bg-yellow-50 text-gray-700"
              }`}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Dynamic Grid Layout */}
      {allItems.length > 0 ? (
        /* CARD GRID LAYOUT for all views */
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {allItems.map((item: any, index: number) => {
            const mainLink = `/${item.title?.replace(/\s+/g, "-").toLowerCase()}` || "#"
            const sortedLinks = sortLinksByPriority(item.links || [])
            const itemCategory = item.originalCategory || filteredItems.find((cat: any) => 
              cat.items.some((i: any) => i.title === item.title)
            )?.title || "Course"

            return (
              <div
                key={`${item.title}-${index}`}
                className="group rounded-2xl border-2 border-gray-100 bg-white p-6 hover:border-yellow-300 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 flex flex-col h-full"
              >
                {/* Category Badge */}
                <div className="inline-block mb-4">
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                    {itemCategory}
                  </span>
                </div>

                {/* Course Header */}
                <Link href={mainLink} onClick={handleLinkClick} className="block mb-4">
                  <h4 className="text-xl font-bold text-gray-900 leading-tight group-hover:text-yellow-600 transition-colors duration-300 mb-3">
                    {item.title}
                  </h4>
                </Link>

                {/* Program Links - Sorted by priority */}
                <div className="space-y-3 mb-6 flex-1">
                  {sortedLinks.length > 0 ? (
                    sortedLinks.map((link: any, idx: number) => {
                      const isBachelor = link.text?.toLowerCase().includes('bachelor') || 
                                         link.text?.toLowerCase().includes('b.sc') || 
                                         link.text?.toLowerCase().includes('b.voc')
                      const isDiploma = link.text?.toLowerCase().includes('diploma')
                      
                      return (
                        <div key={idx} className="flex items-center gap-3 group/link">
                          <div className={`w-2 h-2 rounded-full flex-shrink-0 group-hover/link:scale-125 transition-transform duration-300 ${
                            isBachelor ? 'bg-green-500' : 
                            isDiploma ? 'bg-blue-500' : 
                            'bg-yellow-400'
                          }`} />
                          <Link
                            className={`text-sm transition-colors duration-300 font-medium flex-1 truncate ${
                              isBachelor ? 'text-gray hover:text-green-800 font-semibold' :
                              isDiploma ? 'text-blue-700 hover:text-blue-800 font-medium' :
                              'text-gray-700 hover:text-yellow-600'
                            } hover:underline`}
                            href={`${link.href
                              ?.replace(/\s+/g, "-")
                              ?.replace(/\./g, "")
                              ?.toLowerCase()}`}
                            onClick={handleLinkClick}
                          >
                            {link.text}
                          </Link>
                        </div>
                      )
                    })
                  ) : (
                    <div className="text-gray-500 text-sm italic py-2">
                      No programs available
                    </div>
                  )}
                </div>

                {/* Explore Button */}
                <Link href={mainLink} onClick={handleLinkClick} className="block mt-auto">
                  <Button
                    className={`w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-semibold flex items-center justify-center space-x-2 px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${poppins.className}`}
                  >
                    <span>Explore Now</span>
                    <FaArrowRight className="text-black group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </Link>
              </div>
            )
          })}
        </div>
      ) : (
        <NoResults
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setSelectedCategory={setSelectedCategory}
        />
      )}
    </>
  )
}

/* --------------------------
 *   No Results Component
 * -------------------------- */
const NoResults = ({
  searchQuery,
  setSearchQuery,
  setSelectedCategory
}: {
  searchQuery: string,
  setSearchQuery: (query: string) => void,
  setSelectedCategory: (category: string) => void
}) => (
  <div className="text-center py-16">
    <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
      <Search className="h-10 w-10 text-gray-400" />
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-2">No programs found</h3>
    <p className="text-gray-600 mb-6">
      {searchQuery ? `No results for "${searchQuery}"` : "Try adjusting your filter criteria"}
    </p>
    <Button
      onClick={() => {
        setSearchQuery("")
        setSelectedCategory("All")
      }}
      className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-semibold px-8 py-3 rounded-full"
    >
      Reset Filters
    </Button>
  </div>
)