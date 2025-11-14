import React, { useState } from "react";
import Image from "next/image";

interface StudentsWorkProps {
    images: string[];
    title?: string;
}

function StudentsWork({ images, title = "Students' Work Showcase" }: StudentsWorkProps) {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const openImage = (src: string) => setSelectedImage(src);
    const closeImage = () => setSelectedImage(null);

    return (
        <>
            <div className="p-10 w-full">
                {/* Title */}
                <h2 className="text-center text-3xl sm:text-6xl font-bold text-gray-900 mb-6">
                    {title}
                </h2>

                {/* Grid Gallery */}
                <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 px-4">
                    {images.map((src, idx) => (
                        <div
                            key={idx}
                            className="relative w-full h-40 sm:h-48 md:h-56 overflow-hidden rounded-lg shadow-lg
                         transform hover:scale-105 transition-all duration-300 cursor-pointer"
                            onClick={() => openImage(src)}
                        >
                            <Image
                                src={src}
                                alt={`Student Work ${idx + 1}`}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 50vw,
                       (max-width: 1200px) 33vw,
                       25vw"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
                    onClick={closeImage}
                >
                    {/* Close button */}
                    <button
                        className="absolute top-4 right-4 text-white text-2xl font-bold hover:text-yellow-400"
                        onClick={(e) => {
                            e.stopPropagation(); // prevent modal from closing immediately
                            closeImage();
                        }}
                    >
                        &times;
                    </button>

                    {/* Image container */}
                    <div
                        className="relative max-w-4xl max-h-[80vh] w-full h-full flex items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={selectedImage}
                            alt="Enlarged view"
                            width={1200}
                            height={800}
                            className="object-contain rounded-lg shadow-2xl"
                        />
                    </div>
                </div>
            )}
        </>
    );
}

export default StudentsWork;
