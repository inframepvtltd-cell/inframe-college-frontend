"use client";

import React, { useEffect, useState } from "react";
import { Poppins } from "next/font/google";
import Image from "next/image";
import { Button } from "@/components/ui/button";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription
} from "../../../../components/ui/card";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "../../../../components/ui/tabs";
import { AlertCircle, Check, Upload, BookOpen, Users, Target, MapPin, Briefcase } from "lucide-react";
import { getAllCareers } from "../api.ts/api";
import { Badge } from "@/components/ui/badge";
import CareerApplicationForm from "./FormComponent";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

export default function CareersPage() {
    const [positions, setPositions] = useState<
        { id: string; label: string }[]
    >([]);

    const [careers, setCareers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadCareers() {
            try {
                const res = await getAllCareers();

                if (res.success) {
                    // 1️⃣ Filter active jobs
                    const activeJobs = res.data.filter((job: any) => job.is_active);

                    // 2️⃣ Careers list (for cards / modal)
                    const formattedCareers = activeJobs.map((job: any) => ({
                        id: job.id,
                        title: job.title,
                        description: job.description,
                        location: job.place,
                        requirements: job.requirements,
                        type: job.part_time ? "Part-time" : "Full-time",
                    }));

                    setCareers(formattedCareers);

                    // 3️⃣ Positions list (for dropdown)
                    const dropdownPositions = activeJobs.map((job: any) => ({
                        id: job.id,          // use DB id
                        label: job.title,    // job title as label
                    }));
                    console.log(dropdownPositions);

                    setPositions(dropdownPositions);
                }
            } catch (err) {
                console.error("Failed to fetch careers", err);
            } finally {
                setLoading(false);
            }
        }

        loadCareers();
    }, []);

    return (
        <div className={`min-h-screen bg-white ${poppins.className}`}>
            {/* Hero Section */}
            <div className="relative z-10">
                <div className="relative h-[80vh]">
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/65 to-transparent z-10" />
                    <Image
                        src="/images/gallery/1717485479751.jpg"
                        alt="Campus Life Hero Image"
                        fill
                        className="object-cover"
                        priority
                        sizes="100vw"
                        quality={85}
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx0fHRsdHSIfIR0jIyUkJSMiIiMlKy4wLisqMx8hJzQnKi46PT4+JSZHSUFQLTc6Tj7/2wBDARUXFx4bHt0dHT4qIio+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj7/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                    />
                    <div className="absolute inset-0 z-20 flex items-center">
                        <div className="max-w-7xl mx-auto px-4 w-full">
                            <div className="max-w-3xl">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-1.5 h-12 bg-yellow-400" />
                                    <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight">
                                        Join Our Team
                                    </h1>
                                </div>
                                <p className="text-xl text-white max-w-2xl">
                                    Join our team and build a career where creativity thrives.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <Tabs defaultValue="openings" className="w-full">
                    <TabsList className="grid w-full md:w-[400px] gap-3 grid-cols-2 mb-8 mx-auto">
                        <TabsTrigger
                            value="openings"
                            className="data-[state=active]:bg-yellow-500 border py-2 data-[state=active]:text-black"
                        >
                            Current Openings
                        </TabsTrigger>
                        <TabsTrigger
                            value="application"
                            className="data-[state=active]:bg-yellow-500 border py-2 data-[state=active]:text-black"
                        >
                            Apply Now
                        </TabsTrigger>
                    </TabsList>
                    <hr className="border-t-2 border-yellow-300 w-50 mx-auto mt-4" />

                    <TabsContent value="openings" className="space-y-8">
                        {/* Section Heading */}
                        <div className="text-start max-w-4xl  space-y-2 mt-10">
                            <h2 className="text-4xl font-extrabold text-gray-900">
                                Explore Career Opportunities
                            </h2>
                            <p className="text-gray-600 text-lg">
                                Join our team and grow with us! Check out the openings below and find the role that suits you best.
                            </p>
                        </div>

                        {/* Job Cards Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {careers.map((job) => (
                                <Card
                                    key={job.id}
                                    className="overflow-hidden border border-gray-200 rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-300 bg-white"
                                >
                                    <CardHeader className="bg-gradient-to-r from-yellow-50 to-yellow-200 pb-4 px-5">
                                        <div className="flex justify-between items-start">
                                            <CardTitle className="text-lg font-bold text-gray-900">
                                                {job.title}
                                            </CardTitle>
                                            <Badge
                                                variant="outline"
                                                className={`${job.type === "Full-time"
                                                    ? "bg-green-100 text-green-800 border-green-200"
                                                    : "bg-yellow-100 text-yellow-800 border-yellow-200"
                                                    } py-1 px-3 text-xs rounded-full font-medium`}
                                            >
                                                {job.type}
                                            </Badge>
                                        </div>
                                        <CardDescription className="flex items-center mt-2 text-gray-500 text-sm">
                                            <MapPin size={14} className="mr-1 text-gray-400" /> {job.location}
                                        </CardDescription>
                                    </CardHeader>

                                    <CardContent className="pt-4 px-5">
                                        <p className="text-sm text-gray-600 mb-4 line-clamp-3">{job.description}</p>

                                        <div className="space-y-2">
                                            <h4 className="text-sm font-semibold text-gray-800">Requirements:</h4>
                                            <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                                                {job.requirements.map((req: string, idx: number) => (
                                                    <li
                                                        key={idx}
                                                        className="flex items-start transition-all hover:text-yellow-600 hover:translate-x-1"
                                                    >
                                                        <Check size={16} className="text-yellow-500 mr-2 mt-0.5" />
                                                        <span>{req}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </CardContent>

                                    <div className="px-5 pb-5 pt-3 border-t border-gray-100 flex justify-center">
                                        <TabsList className="flex w-full justify-center gap-3">
                                            <TabsTrigger
                                                value="application"
                                                className="bg-yellow-500 text-white w-full max-w-[220px] py-2 rounded-lg hover:bg-yellow-600 transition-colors font-semibold shadow-sm"
                                            >
                                                Apply Now
                                            </TabsTrigger>
                                        </TabsList>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>



                    {/* form card */}
                    <TabsContent value="application">
                        <Card className="max-w-3xl mx-auto border border-gray-200">
                            <CardHeader className="bg-gray-50">
                                <CardTitle className="text-2xl text-black">Application Form</CardTitle>
                                <CardDescription>
                                    Complete the form below to apply for a position at Inframe
                                </CardDescription>
                            </CardHeader>


                            <CardContent>
                                <CareerApplicationForm positions={positions} />
                            </CardContent>

                        </Card>
                    </TabsContent>
                </Tabs>

                {/* Why Join Us Section */}
                <div className="mt-20">
                    <h2 className="text-3xl font-bold text-center text-black mb-12">Why Join Inframe?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Card className="border border-gray-200 hover:shadow-md transition-all">
                            <div className="h-1 bg-yellow-500"></div>
                            <CardHeader className="text-center">
                                <BookOpen className="w-10 h-10 mx-auto mb-4 text-yellow-500" />
                                <CardTitle className="text-xl text-black">Creative Environment</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600 text-center">Work alongside creative professionals and help shape the next generation of designers in a stimulating environment.</p>
                            </CardContent>
                        </Card>

                        <Card className="border border-gray-200 hover:shadow-md transition-all">
                            <div className="h-1 bg-yellow-500"></div>
                            <CardHeader className="text-center">
                                <Users className="w-10 h-10 mx-auto mb-4 text-yellow-500" />
                                <CardTitle className="text-xl text-black">Professional Growth</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600 text-center">Opportunities for continuous learning, industry connections, and career advancement in design education.</p>
                            </CardContent>
                        </Card>

                        <Card className="border border-gray-200 hover:shadow-md transition-all">
                            <div className="h-1 bg-yellow-500"></div>
                            <CardHeader className="text-center">
                                <Target className="w-10 h-10 mx-auto mb-4 text-yellow-500" />
                                <CardTitle className="text-xl text-black">Make an Impact</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600 text-center">Directly influence and inspire the next generation of creative professionals who will shape our visual world.</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Current Openings CTA Section */}
                <div className="mt-16 bg-black text-white p-8 rounded-md">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="mb-6 md:mb-0">
                            <h3 className="text-2xl font-bold mb-2">Ready to Join Our Team?</h3>
                            <p className="text-gray-300">Explore our current opportunities and apply today.</p>
                        </div>
                        <div className="flex items-center">
                            <Briefcase className="mr-3 text-yellow-500" />
                            <Button
                                onClick={() => {
                                    const applicationTab = document.querySelector('[data-value="application"]');
                                    if (applicationTab) {
                                        (applicationTab as HTMLElement).click();
                                    }
                                }}
                                className="bg-yellow-500 hover:bg-yellow-600 text-black"
                            >
                                View Positions
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}