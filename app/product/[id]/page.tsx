"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import { useCart } from "@/context/CartContext";

// Whatsapp İkonu
const WhatsappIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" className="mr-2">
    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-2.846-.848-.907-.386-1.527-.817-1.527-.817-.059-.08-1.07-1.423-1.07-2.713 0-1.29.672-1.922.906-2.181.234-.259.613-.316.816-.316.203 0 .406.003.585.012.19.01.45.074.693.655.242.58.825 2.016.897 2.164.072.148.12.321.024.512-.096.191-.144.309-.287.472-.144.163-.302.361-.432.485-.143.136-.312.285-.133.589.179.304.793 1.309 1.706 2.122 1.183 1.054 2.179 1.39 2.487 1.543.308.152.489.126.671-.084.182-.211.782-.909.99-1.221.209-.312.417-.259.702-.154.285.105 1.805.851 2.114 1.006.309.154.515.23.588.357.073.127.073.736-.07 1.141z"/>
  </svg>
);

interface Product {
  ID: number;
  Name: string;
  Price: number;
  Description: string;
  Image: string;
  Category: string;
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Sepet State ve Fonksiyonları
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>(""); 

  // Veriyi Çek
  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch("/api/products", { cache: 'no-store' });
        const data = await res.json();
        const foundProduct = data.find((p: any) => p.ID.toString() === id);
        setProduct(foundProduct);
      } catch (error) {
        console.error("Hata:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  // SEPETE EKLE FONKSİYONU DÜZELTİLDİ
  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Lütfen sepete eklemeden önce bir beden seçiniz.");
      return;
    }

    if (product) {
      addToCart({
        id: product.ID,
        name: product.Name,
        price: product.Price,
        image: product.Image || "/images/placeholder.jpg",
        size: selectedSize,
        quantity: 1
      });
      alert(`${product.Name} (${selectedSize}) başarıyla sepete eklendi!`);
    }
  };

  if (loading) return <div className="text-center py-20">Yükleniyor...</div>;
  if (!product) return <div className="text-center py-20">Ürün Bulunamadı!</div>;

  const formatCategory = (cat: string) => {
    if (cat === "ust-giyim") return "Üst Giyim";
    if (cat === "alt-giyim") return "Alt Giyim";
    return cat.charAt(0).toUpperCase() + cat.slice(1);
  };

  // WhatsApp Mesajı Oluşturma
  const phoneNumber = "905362538401"; 
  const whatsappMessage = `Merhaba, ${product.Name} (Fiyat: ${product.Price}₺) ürünü hakkında bilgi almak istiyorum.`;
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />

      <main className="container mx-auto px-4 md:px-8 py-6">
        
        <div className="text-xs text-gray-500 mb-8 flex items-center gap-2">
          <Link href="/" className="hover:text-black">Ana Sayfa</Link>
          <span>{'>'}</span>
          <Link href={`/category/${product.Category}`} className="hover:text-black">
            {formatCategory(product.Category)}
          </Link>
          <span>{'>'}</span>
          <span className="text-black font-medium">{product.Name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          <div className="relative aspect-[4/5] bg-[#F5F5F5]">
            <Image
              src={product.Image || "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f"}
              alt={product.Name}
              fill
              className="object-cover mix-blend-multiply"
              priority
            />
          </div>

          <div className="flex flex-col pt-2">
            
            <h1 className="text-3xl md:text-4xl font-light mb-4">{product.Name}</h1>
            <p className="text-2xl font-bold mb-6">
              {new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 2 }).format(product.Price)}₺
            </p>

            <p className="text-gray-600 text-sm leading-relaxed mb-10">
              {product.Description}
            </p>

            {/* BEDEN SEÇİMİ */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-bold tracking-wider uppercase">
                  BEDEN SEÇENEKLERİ {selectedSize && <span className="text-black ml-2">({selectedSize})</span>}
                </span>
                <button className="text-xs text-gray-500 underline hover:text-black">Beden Tablosu</button>
              </div>
              <div className="flex gap-2">
                {['XS', 'S', 'M', 'L'].map((size) => (
                  <button 
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`
                      w-12 h-12 border text-sm transition-all duration-200
                      ${selectedSize === size 
                        ? 'bg-black text-white border-black'  
                        : 'bg-white text-black border-gray-200 hover:border-black' 
                      }
                    `}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* SEPETE EKLE BUTONLARI */}
            <div className="flex gap-4 mb-4">
              <button 
                onClick={handleAddToCart} // BURASI GERÇEK FONKSİYONA BAĞLANDI
                className="flex-1 bg-black text-white py-4 text-xs font-bold tracking-widest hover:bg-gray-800 transition-colors uppercase"
              >
                SEPETE EKLE
              </button>
              <button className="flex-1 border border-black bg-white text-black py-4 text-xs font-bold tracking-widest hover:bg-gray-50 transition-colors uppercase">
                HEMEN AL
              </button>
            </div>

            {/* WHATSAPP BUTONU */}
            <a 
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full border border-[#25D366] text-[#25D366] py-4 flex items-center justify-center gap-2 hover:bg-[#25D366] hover:text-white transition-colors duration-300 cursor-pointer"
            >
              <WhatsappIcon />
              <span className="text-xs font-bold tracking-widest uppercase">WHATSAPP SİPARİŞ HATTI</span>
            </a>

          </div>
        </div>
      </main>
    </div>
  );
}