
"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";

interface AccordionProps {
    title: string;
    children: React.ReactNode;
    defaultOpen?: boolean;
}

export default function Accordion({ title, children, defaultOpen = false }: AccordionProps) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="border-b border-gray-200">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-4 flex justify-between items-center text-left hover:text-black transition-colors"
            >
                <span className="text-sm font-medium uppercase tracking-wide">{title}</span>
                <ChevronDown
                    size={16}
                    className={clsx("transition-transform duration-300", {
                        "rotate-180": isOpen,
                    })}
                />
            </button>
            <div
                className={clsx("overflow-hidden transition-all duration-300 ease-in-out", {
                    "max-h-96 opacity-100 mb-4": isOpen,
                    "max-h-0 opacity-0": !isOpen,
                })}
            >
                <div className="text-sm text-gray-600 leading-relaxed font-light">
                    {children}
                </div>
            </div>
        </div>
    );
}
