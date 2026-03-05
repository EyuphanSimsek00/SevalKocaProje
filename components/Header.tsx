"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ShoppingBag, User, Menu, X, ChevronDown } from "lucide-react";
// YENİ EKLENENLER: Sepet bağlamı, arama çubuğu ve bileşeni
import CartDrawer from "./CartDrawer";
import { useCart } from "@/context/CartContext";
import SearchOverlay from "./SearchOverlay";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false); // Sepet açma/kapama durumu
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const { cartItems } = useCart(); // Sepet verilerini çekiyoruz
  // Sepetteki toplam ürün sayısını buluyoruz (Badge için)
  const totalItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="w-full relative z-50">
      {/* 1. Kayan Yazı (Top Bar) */}
      <div className="bg-[#f8f5f0] text-sm py-2 overflow-hidden relative whitespace-nowrap z-50">
        <div className="animate-marquee inline-block text-black">
          <span className="mx-8">2500₺ ve üzeri alışverişlerinizde kargo bedava</span>
          <span className="mx-8">♦</span>
          <span className="mx-8">2500₺ ve üzeri alışverişlerinizde kargo bedava</span>
          <span className="mx-8">♦</span>
          <span className="mx-8">2500₺ ve üzeri alışverişlerinizde kargo bedava</span>
        </div>
      </div>

      {/* 2. Ana Header */}
      <div className="bg-white px-4 md:px-8 py-6 flex items-center justify-between border-b border-gray-100 relative z-50">
        
        {/* Sol Alan: Kategori Menüsü (Masaüstü) / Hamburger (Mobil) */}
        <div className="flex-1 flex items-center">
          <button 
            className="md:hidden p-2 -ml-2 hover:bg-gray-100 rounded-full"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>

          <div className="hidden md:block relative group">
            <button className="text-sm font-medium hover:underline flex items-center gap-1 py-4">
              Tüm Ürünler <ChevronDown size={14} className="transition-transform group-hover:rotate-180" />
            </button>
            <div className="absolute top-full left-0 w-48 bg-white shadow-lg rounded-b-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
              <div className="py-2 flex flex-col text-sm text-gray-700">
                <Link href="/category/tum-urunler" className="px-5 py-3 hover:bg-gray-50 hover:text-black">Tüm Ürünler</Link>
                <Link href="/category/ust-giyim" className="px-5 py-3 hover:bg-gray-50 hover:text-black">Üst Giyim</Link>
                <Link href="/category/alt-giyim" className="px-5 py-3 hover:bg-gray-50 hover:text-black">Alt Giyim</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Orta Alan: LOGO */}
        <div className="flex-1 flex justify-center">
          <Link href="/" className="text-3xl md:text-4xl font-serif tracking-widest text-black">
            SEVAL KOCA
          </Link>
        </div>

        {/* SAĞ ALAN: İKONLAR (Görseldeki sıralama korundu) */}
        <div className="flex-1 flex items-center justify-end gap-4 md:gap-6 text-black">
          <Link href="#" className="hidden md:block text-sm font-medium hover:text-gray-600 transition-colors">
            GİRİŞ YAP
          </Link>
          
          <button className="hover:text-gray-500 transition-colors">
            <User size={22} />
          </button>
          
          <button 
           onClick={() => setIsSearchOpen(true)} 
           className="hover:text-gray-500 transition-colors">
            <Search size={22} />
            </button>
          
          {/* Sepet İkonu ve Bildirim Sayısı */}
          <button 
            onClick={() => setIsCartOpen(true)} 
            className="relative hover:text-gray-500 transition-colors"
          >
            <ShoppingBag size={22} />
            {totalItemsCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {totalItemsCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Sepet Çekmecesi Bileşenini Çağırıyoruz */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      {/* YENİ EKLENEN: Arama Ekranı */}
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Mobil Menü */}
      {isMobileMenuOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-[60]"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed top-0 left-0 h-full w-[80%] max-w-sm bg-white z-[70] transform transition-transform duration-300 translate-x-0">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <span className="text-xl font-serif tracking-widest">MENÜ</span>
              <button onClick={() => setIsMobileMenuOpen(false)}>
                <X size={24} />
              </button>
            </div>
            <div className="flex flex-col p-6 gap-4">
              <Link href="/" className="text-lg pb-4 border-b border-gray-100" onClick={() => setIsMobileMenuOpen(false)}>Ana Sayfa</Link>
              <Link href="/category/tum-urunler" className="text-lg pb-4 border-b border-gray-100" onClick={() => setIsMobileMenuOpen(false)}>Tüm Ürünler</Link>
              <Link href="/category/ust-giyim" className="text-lg pb-4 border-b border-gray-100" onClick={() => setIsMobileMenuOpen(false)}>Üst Giyim</Link>
              <Link href="/category/alt-giyim" className="text-lg pb-4 border-b border-gray-100" onClick={() => setIsMobileMenuOpen(false)}>Alt Giyim</Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}