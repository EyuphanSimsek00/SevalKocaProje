
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbProps {
    current: string;
}

export default function Breadcrumb({ current }: BreadcrumbProps) {
    return (
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
            <Link href="/" className="hover:text-black">Ana Sayfa</Link>
            <ChevronRight size={14} />
            <span className="text-black font-medium text-transform: capitalize">{current}</span>
        </nav>
    );
}
