"use client";

import { useState, useEffect } from "react";
import { X, Search as SearchIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Arama ekranı açıldığında ürünleri veritabanından çek
  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      fetch("/api/products")
        .then((res) => res.json())
        .then((data) => {
          setProducts(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
        
      setQuery(""); // Ekran açıldığında eski aramayı temizle
    }
  }, [isOpen]);

  // Kullanıcı yazı yazdıkça ürünleri filtrele
  useEffect(() => {
    if (query.trim() === "") {
      setFilteredProducts([]);
    } else {
      const lowerQuery = query.toLowerCase();
      const results = products.filter(
        (p) =>
          p.Name.toLowerCase().includes(lowerQuery) ||
          p.Category.toLowerCase().includes(lowerQuery)
      );
      setFilteredProducts(results);
    }
  }, [query, products]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white z-[80] flex flex-col transition-all duration-300 animate-in fade-in zoom-in-95">
      
      {/* Üst Kısım: Arama Çubuğu */}
      <div className="px-6 md:px-12 py-6 flex justify-between items-center border-b border-gray-100">
        <div className="flex-1 flex items-center gap-4">
          <SearchIcon size={28} className="text-gray-400" />
          <input
            type="text"
            placeholder="Ne aramıştınız? (Örn: Elbise, Gömlek, Takım...)"
            className="w-full text-xl md:text-3xl font-light outline-none bg-transparent placeholder-gray-300 text-black"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <button onClick={onClose} className="p-3 hover:bg-gray-100 rounded-full transition-colors ml-4 text-black">
          <X size={28} strokeWidth={1.5} />
        </button>
      </div>

      {/* Alt Kısım: Arama Sonuçları */}
      <div className="flex-1 overflow-y-auto px-6 md:px-12 py-8 bg-[#FAFAFA]">
        {loading && <p className="text-gray-500 text-center mt-10">Ürünler yükleniyor...</p>}
        
        {!loading && query.trim() !== "" && filteredProducts.length === 0 && (
          <p className="text-gray-500 text-center mt-10 text-lg font-light">
            "{query}" için herhangi bir sonuç bulunamadı.
          </p>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-10">
          {filteredProducts.map((product) => (
            <Link 
              href={`/product/${product.ID}`} 
              key={product.ID} 
              onClick={onClose} // Ürüne tıklayınca arama ekranını kapat
              className="group cursor-pointer"
            >
              <div className="relative aspect-[3/4] bg-gray-200 mb-4 overflow-hidden">
                <Image 
                  src={product.Image || "/images/placeholder.jpg"} 
                  alt={product.Name} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-700" 
                />
              </div>
              <h3 className="text-sm font-medium text-gray-900 truncate group-hover:text-gray-600 transition-colors">
                {product.Name}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                {new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 2 }).format(product.Price)}₺
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}