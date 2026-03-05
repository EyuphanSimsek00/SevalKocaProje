
"use client";

import { useState } from "react";
import Image from "next/image";
import clsx from "clsx";

interface ProductGalleryProps {
    images: string[];
}

export default function ProductGallery({ images }: ProductGalleryProps) {
    const [selectedImage, setSelectedImage] = useState(images[0]);

    // If no images provided, show placeholder
    if (!images || images.length === 0) {
        return <div className="bg-gray-100 w-full aspect-[3/4]"></div>;
    }

    return (
        <div className="flex flex-col gap-4">
            {/* Main Image */}
            <div className="relative w-full aspect-[3/4] bg-gray-50 overflow-hidden">
                <Image
                    src={selectedImage}
                    alt="Product Detail"
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105 cursor-zoom-in"
                    priority
                />
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                    {images.map((img, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedImage(img)}
                            className={clsx(
                                "relative flex-shrink-0 w-20 aspect-[3/4] overflow-hidden border transition-all",
                                selectedImage === img ? "border-black opacity-100" : "border-transparent opacity-60 hover:opacity-100"
                            )}
                        >
                            <Image
                                src={img}
                                alt={`View ${index + 1}`}
                                fill
                                className="object-cover"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
