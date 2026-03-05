"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header"; 

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. Verileri API'den Çek (Veritabanı Bağlantısı)
  useEffect(() => {
    async function fetchProducts() {
      try {
        // Tarayıcıdaki API adresine istek atıyoruz
        const res = await fetch("/api/products", { cache: 'no-store' });
        if (!res.ok) throw new Error("Veri çekilemedi");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Hata:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  // 2. Kategoriye Göre Filtrele
  const filteredProducts =
    slug === "tum-urunler"
      ? products
      : products.filter(
          (p) =>
             // Veritabanındaki kategori ile URL'deki kategoriyi eşleştir
            p.Category?.toLowerCase().trim() === slug.toLowerCase().trim()
        );

  const formatTitle = (slug: string) => {
    if (slug === "tum-urunler") return "Tüm Ürünler";
    if (slug === "ust-giyim") return "Üst Giyim";
    if (slug === "alt-giyim") return "Alt Giyim";
    return slug.charAt(0).toUpperCase() + slug.slice(1);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Yan Menü (Filtreler) */}
          <aside className="w-full md:w-64 space-y-6">
            <h2 className="font-serif text-2xl mb-4">{formatTitle(slug)}</h2>
            <div className="text-sm text-gray-500 mb-4">{filteredProducts.length} ürün</div>
            
            <div className="space-y-2 flex flex-col">
                <Link href="/category/tum-urunler" className={`hover:text-black ${slug === 'tum-urunler' ? 'font-bold' : 'text-gray-600'}`}>Tüm Ürünler</Link>
                <Link href="/category/ust-giyim" className={`hover:text-black ${slug === 'ust-giyim' ? 'font-bold' : 'text-gray-600'}`}>Üst Giyim</Link>
                <Link href="/category/alt-giyim" className={`hover:text-black ${slug === 'alt-giyim' ? 'font-bold' : 'text-gray-600'}`}>Alt Giyim</Link>
                <Link href="/category/aksesuar" className={`hover:text-black ${slug === 'aksesuar' ? 'font-bold' : 'text-gray-600'}`}>Aksesuar</Link>
            </div>
          </aside>

          {/* Ürün Listesi */}
          <div className="flex-1">
            {loading ? (
              <p className="text-center py-10">Ürünler Yükleniyor...</p>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <Link href={`/product/${product.ID}`} key={product.ID} className="group cursor-pointer">
                    <div className="relative aspect-[3/4] mb-4 overflow-hidden bg-gray-100">
                      <Image
                        src={product.Image || "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f"}
                        alt={product.Name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <h3 className="text-sm font-medium text-gray-900">{product.Name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{product.Price}₺</p>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 border border-dashed rounded-lg">
                <p className="text-gray-500">Bu kategoride ürün bulunamadı.</p>
                <p className="text-xs text-gray-400 mt-2">Aranan Kategori: {slug}</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}