
import Link from "next/link";
import { Plus, Minus } from "lucide-react";

export default function Sidebar() {
    return (
        <aside className="w-64 flex-shrink-0 space-y-8 hidden md:block">
            {/* Browse Menu */}
            <div className="space-y-4 border-b border-gray-100 pb-8">
                <h3 className="font-medium text-lg">Göz At:</h3>
                <ul className="space-y-3 text-sm text-gray-600">
                    <li><Link href="/category/tum-urunler" className="hover:text-black hover:underline">Tüm Ürünler</Link></li>
                    <li><Link href="/category/ust-giyim" className="text-red-500 hover:text-red-600 font-medium">Üst Giyim</Link></li>
                    <li><Link href="/category/alt-giyim" className="hover:text-black hover:underline">Alt Giyim</Link></li>
                    <li><Link href="/category/aksesuar" className="hover:text-black hover:underline">Aksesuar</Link></li>
                    <li><Link href="#" className="hover:text-black hover:underline">İndirim</Link></li>
                </ul>
            </div>

            {/* Filters */}
            <div className="space-y-6">
                <h3 className="font-medium text-lg">Filtrele:</h3>

                {/* Price Slider mockup */}
                <div className="space-y-4 border-b border-gray-100 pb-6">
                    <div className="flex justify-between items-center cursor-pointer">
                        <span className="text-sm">Fiyat</span>
                        <Minus size={14} />
                    </div>
                    <div className="px-1">
                        <div className="h-1 bg-black w-full relative">
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-black rounded-full cursor-pointer"></div>
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-black rounded-full cursor-pointer"></div>
                        </div>
                        <div className="flex justify-between text-xs mt-3 text-gray-500">
                            <span>₺149</span>
                            <span>₺4.500</span>
                        </div>
                    </div>
                </div>

                {/* Colors mockup */}
                <div className="space-y-2 border-b border-gray-100 pb-6">
                    <div className="flex justify-between items-center cursor-pointer">
                        <span className="text-sm">Renk Seçenekleri</span>
                        <Plus size={14} />
                    </div>
                </div>

                {/* Sizes mockup */}
                <div className="space-y-2">
                    <div className="flex justify-between items-center cursor-pointer">
                        <span className="text-sm">Beden Seçenekleri</span>
                        <Plus size={14} />
                    </div>
                </div>
            </div>
        </aside>
    );
}
