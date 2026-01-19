"use client"

import { JSX, useEffect, useMemo, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FaArrowRight, FaPalette, FaPencilRuler, FaChartLine, FaPaintBrush, FaStar, FaChevronRight } from "react-icons/fa"
import { MdDesignServices, MdBusinessCenter } from "react-icons/md"
import { GiJewelCrown } from "react-icons/gi"
import { RiMovie2Line } from "react-icons/ri"
import Link from "next/link"
import { Poppins } from "next/font/google"
import { courseTypes } from "@utils/courseTypes"
import { transformApiCoursesToCategories } from "@utils/transFormCourse"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs"

export const COURSE_GROUP_MAP: Record<string, string[]> = {
  design: [
    "Interior Design",
    "Fashion Design",
    "Graphic Design",
    "UIUX-Design",
    "Animation-VFX",
    "Jewellery Design",
  ],
  art: ["Fine Arts"],
  business: [
    "Digital Marketing",
    "Entrepreneurship Skill",
    "Media-Entertainment",
  ],
}

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
})

/* ----------------------------------
   Icons Mapping
---------------------------------- */
const COURSE_ICONS: Record<string, JSX.Element> = {
  "Interior Design": <MdDesignServices className="text-2xl" />,
  "Fashion Design": <FaPencilRuler className="text-2xl" />,
  "Graphic Design": <FaPalette className="text-2xl" />,
  "UIUX-Design": <MdDesignServices className="text-2xl" />,
  "Animation-VFX": <RiMovie2Line className="text-2xl" />,
  "Jewellery Design": <GiJewelCrown className="text-2xl" />,
  "Fine Arts": <FaPaintBrush className="text-2xl" />,
  "Digital Marketing": <FaChartLine className="text-2xl" />,
  "Entrepreneurship Skill": <MdBusinessCenter className="text-2xl" />,
  "Media-Entertainment": <RiMovie2Line className="text-2xl" />,
}

const TAB_ICONS: Record<string, JSX.Element> = {
  all: <FaStar className="mr-2" />,
  design: <MdDesignServices className="mr-2" />,
  art: <FaPaintBrush className="mr-2" />,
  business: <MdBusinessCenter className="mr-2" />,
}

/* ----------------------------------
   Types
---------------------------------- */
interface ProgramLink {
  text: string
  href: string
}

interface CourseItem {
  title: string
  links: ProgramLink[]
}

interface Category {
  title: string
  items: CourseItem[]
}

/* ----------------------------------
   Animated Background Elements
---------------------------------- */
const AnimatedBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-amber-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
    <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
  </div>
)

/* ----------------------------------
   Card Component
---------------------------------- */
const CourseCard = ({ course }: { course: CourseItem }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Card
      className="relative overflow-hidden group hover:shadow-2xl transition-all duration-500 border border-yellow-100 hover:border-yellow-300 bg-gradient-to-br from-white to-yellow-50 min-h-[320px] flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated border effect */}
      <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-yellow-100 to-transparent transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ${isHovered ? 'opacity-30' : 'opacity-0'}`}></div>
      
      {/* Decorative corner accents */}
      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-yellow-400 to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-amber-400 to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>

      <CardContent className="p-6 flex-1 flex flex-col relative z-10">
        {/* Icon and Title Section */}
        <div className="mb-6">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
            {COURSE_ICONS[course.title] || <FaStar className="text-2xl text-white" />}
          </div>
          
          <h3 className="text-2xl font-bold mb-3 text-gray-800 group-hover:text-amber-700 transition-colors duration-300 leading-tight">
            {course.title}
          </h3>
          
          {/* Decorative underline */}
          <div className="w-12 h-1 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full transform origin-left group-hover:scale-x-150 transition-transform duration-300"></div>
        </div>

        {/* Programs List */}
        <div className="mb-6 flex-1">
          <p className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider">Programs Offered</p>
          <ul className="space-y-3">
            {course.links.map((program, idx) => (
              <li key={idx} className="group/item">
                <Link
                  href={program.href}
                  className="flex items-center text-gray-700 hover:text-amber-600 transition-colors duration-200"
                >
                  <div className="w-2 h-2 rounded-full bg-amber-400 mr-3 group-hover/item:scale-150 transition-transform duration-200"></div>
                  <span className="text-sm font-medium flex-1">{program.text}</span>
                  <FaChevronRight className="text-xs opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all duration-200" />
                </Link>
              </li>
            ))}
            
          </ul>
        </div>

        {/* CTA Button */}
        <Link
          href={`/${course.title.replace(/\s+/g, "-").toLowerCase()}`}
          className="block mt-auto"
        >
          <Button className="w-full group/btn relative overflow-hidden bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white font-bold py-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95">
            <span className="relative z-10 flex items-center justify-center gap-3">
              Explore Now
              <FaArrowRight className="group-hover/btn:translate-x-1 transition-transform duration-200" />
            </span>
            {/* Button shine effect */}
            <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}

/* ----------------------------------
   Card Section
---------------------------------- */
const CourseSection = ({ courses }: { courses: CourseItem[] }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
    {courses.map((course) => (
      <CourseCard key={course.title} course={course} />
    ))}
  </div>
)

/* ----------------------------------
   Main Catalog Component
---------------------------------- */
const CourseCatalog = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    const load = async () => {
      const data = await courseTypes
      const transformed = transformApiCoursesToCategories(data)
      setCategories(transformed)
    }
    load()
  }, [])

  /* Group courses by tab */
  const groupedCourses = useMemo(() => {
    const allItems = categories.flatMap(cat => cat.items)

    const result: Record<string, CourseItem[]> = {
      all: allItems,
    }

    Object.entries(COURSE_GROUP_MAP).forEach(([group, titles]) => {
      result[group] = allItems.filter(item =>
        titles.includes(item.title)
      )
    })

    return result
  }, [categories])

  return (
    <div className={`min-h-screen relative overflow-hidden ${poppins.className}`}>
      <AnimatedBackground />
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-amber-100 to-yellow-100 rounded-full mb-6">
            <span className="text-amber-700 font-bold text-sm uppercase tracking-wider">Industry-Focused Education</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-amber-800 to-gray-900 bg-clip-text text-transparent">
            Transform Your Career
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover our cutting-edge programs designed in collaboration with industry leaders to give you the skills that employers actually need.
          </p>
        </div>

        {/* Tab Navigation */}
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-12">
          <TabsList className="flex flex-wrap gap-2 mb-10 justify-center bg-gradient-to-r from-amber-50 to-yellow-50 p-2 rounded-2xl shadow-inner">
            {["all", "design", "art", "business"].map(tab => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="px-8 py-4 font-bold text-lg rounded-xl transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-yellow-500 data-[state=active]:text-white data-[state=active]:shadow-lg hover:scale-105 active:scale-95 flex items-center"
              >
                {TAB_ICONS[tab]}
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                <span className="ml-2 px-2 py-1 bg-white/20 rounded-lg text-sm">
                  {groupedCourses[tab]?.length || 0}
                </span>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Tab Content */}
          {Object.entries(groupedCourses).map(([key, courses]) => (
            <TabsContent key={key} value={key} className="animate-in fade-in duration-500">
              {courses.length > 0 ? (
                <>
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold text-gray-800">
                      {key === "all" ? "All Programs" : `${key.charAt(0).toUpperCase() + key.slice(1)} Programs`}
                    </h2>
                    <span className="px-4 py-2 bg-gradient-to-r from-amber-100 to-yellow-100 rounded-full font-semibold text-amber-800">
                      {courses.length} {courses.length === 1 ? 'Program' : 'Programs'}
                    </span>
                  </div>
                  <CourseSection courses={courses} />
                </>
              ) : (
                <div className="text-center py-16">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-amber-100 to-yellow-100 flex items-center justify-center">
                    <MdDesignServices className="text-3xl text-amber-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-700 mb-3">No programs available</h3>
                  <p className="text-gray-500">Check back soon for new program offerings!</p>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>

  
      </div>

      {/* Custom CSS for animations */}
      <style jsx global>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}

export default CourseCatalog