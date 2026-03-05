
import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/data";
import { ChevronRight } from "lucide-react";

export default function ProductList() {
    return (
        <div className="w-full px-4 md:px-8 py-12 bg-white">
            <h2 className="text-2xl font-light uppercase mb-8 flex items-center gap-2">
                En Yeniler
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
                {products.map((product) => (
                    <Link key={product.id} href={`/product/${product.id}`} className="group cursor-pointer">
                        <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-4">
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            {/* Quick Add Button on Hover (Bonus) */}
                            <div className="absolute bottom-4 right-4 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                <button className="bg-white p-3 rounded-full shadow-lg hover:bg-black hover:text-white transition-colors">
                                    <ChevronRight size={16} />
                                </button>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <h3 className="text-sm font-light text-gray-900 line-clamp-1 group-hover:underline decoration-gray-300 underline-offset-4">
                                {product.name}
                            </h3>
                            <p className="text-sm font-medium text-black">
                                {product.price.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}₺
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
