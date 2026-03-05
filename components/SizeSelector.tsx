
"use client";

import { useState } from "react";
import clsx from "clsx";

const SIZES = ["XS", "S", "M", "L"];

export default function SizeSelector() {
    const [selectedSize, setSelectedSize] = useState<string | null>(null);

    return (
        <div className="space-y-3">
            <div className="flex justify-between items-center text-xs">
                <span className="font-medium uppercase tracking-wide">Beden Seçenekleri</span>
                <button className="underline text-gray-500 hover:text-black">Beden Tablosu</button>
            </div>

            <div className="flex gap-2">
                {SIZES.map((size) => (
                    <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={clsx(
                            "w-12 h-10 flex items-center justify-center text-sm border transition-all",
                            selectedSize === size
                                ? "bg-black text-white border-black"
                                : "bg-white text-black border-gray-200 hover:border-black"
                        )}
                    >
                        {size}
                    </button>
                ))}
            </div>
        </div>
    );
}
