
import Link from "next/link";
import Image from "next/image";
import { categories } from "@/lib/data";

export default function CategoryGrid() {
    return (
        <div className="w-full px-4 md:px-8 py-12">
            <div className="flex items-center gap-2 mb-6">
                <Link href="/categories" className="text-lg underline underline-offset-4 font-light hover:text-gray-600 transition-colors">
                    Kategoriler
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {categories.map((category) => (
                    <Link
                        key={category.id}
                        href={`/category/${category.slug}`}
                        className="group relative h-[600px] overflow-hidden bg-gray-100"
                    >
                        <Image
                            src={category.image}
                            alt={category.name}
                            fill
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        <div className="absolute bottom-8 left-8">
                            <span className="text-white/90 text-sm font-medium uppercase tracking-wide bg-black/20 backdrop-blur-sm px-4 py-2 rounded-sm">
                                {category.name}
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
