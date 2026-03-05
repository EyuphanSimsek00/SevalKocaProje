"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";

const CategoryCard = ({ title, image, href }: { title: string, image: string, href: string }) => (
  <Link href={href} className="group relative h-[600px] w-full block overflow-hidden bg-gray-100">
    <Image
      src={image}
      alt={title}
      fill
      className="object-cover transition-transform duration-700 group-hover:scale-105"
      sizes="(max-width: 768px) 100vw, 50vw"
    />
    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
    <div className="absolute bottom-10 left-10 z-10">
      <h3 className="text-white text-3xl font-serif tracking-widest uppercase drop-shadow-md">{title}</h3>
      <span className="text-white text-sm border-b border-white pb-1 mt-3 inline-block opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        KEŞFET
      </span>
    </div>
  </Link>
);

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products", { cache: 'no-store' });
        const data = await res.json();
        setProducts(data.reverse().slice(0, 4));
      } catch (error) {
        console.error("Hata:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  return (
    <main>
      <Header />

      {/* HERO BÖLÜMÜ - GÜNCELLENDİ (Yazı Sola Alındı) */}
      <section className="relative w-full h-screen flex flex-col justify-center overflow-hidden bg-white">
        
        {/* KATMAN 1: Resim */}
        <div className="absolute inset-0 z-0">
             <Image 
               src="/images/editorial-1.jpg"
               alt="Seval Koca Editorial" 
               fill 
               // object-right: Mankeni sağa yaslar, solda boşluk açar
               className="object-cover object-[75%_center] md:object-right" 
               priority
             />
        </div>

        {/* KATMAN 2: Yazı (SOL TARAFA ALINDI) */}
        {/* items-start: Sola hizalar, pl-*: Soldan boşluk bırakır */}
        <div className="relative z-10 flex flex-col items-start justify-center h-full px-4 md:pl-32 max-w-4xl"> 
          
          <h1 className="text-6xl md:text-9xl font-serif mb-6 tracking-tighter text-black leading-none text-left">
            SEVAL<br/>KOCA
          </h1>
          <p className="text-lg md:text-2xl font-light tracking-[0.4em] mb-10 uppercase text-gray-800 text-left pl-2">
            ZAMANSIZ ŞIKLIK
          </p>
          
          <div className="pl-2">
            <Link 
              href="/category/tum-urunler" 
              className="inline-block bg-black text-white px-12 py-4 text-sm font-bold tracking-[0.2em] hover:bg-gray-800 transition-all duration-300 uppercase shadow-xl"
            >
              KOLEKSİYONU İNCELE
            </Link>
          </div>
        </div>
      </section>

      {/* KATEGORİLER */}
      <section className="container mx-auto px-4 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CategoryCard title="ÜST GİYİM" image="/images/gomlek.jpg" href="/category/ust-giyim" />
            <CategoryCard title="ALT GİYİM" image="/images/takim.jpg" href="/category/alt-giyim" />
        </div>
      </section>

      {/* EN YENİLER */}
      <section className="bg-[#FAFAFA] py-24 border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-16">
            <h2 className="text-3xl font-serif tracking-wide text-gray-900">EN YENİLER</h2>
            <Link href="/category/tum-urunler" className="text-sm text-gray-500 hover:text-black border-b border-transparent hover:border-black transition-all pb-1">
              Tüm Ürünleri Gör
            </Link>
          </div>

          {loading ? (
             <div className="text-center py-20 text-gray-400 font-light">Koleksiyon Yükleniyor...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
              {products.map((product) => (
                <Link href={`/product/${product.ID}`} key={product.ID} className="group block cursor-pointer">
                  <div className="relative aspect-[3/4] mb-6 overflow-hidden bg-gray-200">
                    <Image
                      src={product.Image || "/images/ceket.jpg"}
                      alt={product.Name}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    {product.IsNew && (
                        <span className="absolute top-4 left-0 bg-white text-black text-[10px] px-3 py-2 font-bold tracking-widest uppercase shadow-sm">
                            YENİ
                        </span>
                    )}
                  </div>
                  <h3 className="text-base font-medium text-gray-900 mb-2 group-hover:text-gray-600 transition-colors">{product.Name}</h3>
                  <p className="text-sm font-light text-gray-500">{product.Price}₺</p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}