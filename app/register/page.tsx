"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Kayıt işlemi başarısız oldu.");
      } else {
        // Başarılı olursa login sayfasına yönlendir. (Opsiyonel query ile mesaj verebiliriz)
        router.push("/login?registered=true");
      }
    } catch (err) {
      setError("Bağlantı hatası oluştu. Lütfen tekrar deneyin.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center bg-white px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
            <h1 className="text-3xl font-serif tracking-widest text-black mb-2">KAYIT OL</h1>
            <p className="text-xs tracking-widest text-gray-500 uppercase">Seval Koca Ailesine Katılın</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-50 text-red-600 text-xs tracking-widest border border-red-100 uppercase text-center animate-in fade-in">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Ad Soyad</label>
            <input 
              type="text" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full border-b border-black py-2 focus:outline-none focus:border-gray-500 transition-colors text-sm"
              placeholder="Adınız Soyadınız"
              required 
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">E-posta</label>
            <input 
              type="email" 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full border-b border-black py-2 focus:outline-none focus:border-gray-500 transition-colors text-sm"
              placeholder="E-posta adresiniz"
              required 
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Şifre</label>
            <input 
              type="password" 
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full border-b border-black py-2 focus:outline-none focus:border-gray-500 transition-colors text-sm"
              placeholder="Güvenli şifreniz"
              required 
              minLength={6}
            />
          </div>
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-black text-white text-sm tracking-widest py-4 mt-4 hover:bg-gray-800 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? "KAYDEDİLİYOR..." : "HESAP OLUŞTUR"}
          </button>
        </form>
        
        <div className="mt-8 text-center border-t border-gray-100 pt-6">
            <span className="text-xs text-gray-500 tracking-wider">ZATEN ÜYE MİSİNİZ? </span>
            <Link href="/login" className="text-xs text-black tracking-widest border-b border-black font-semibold hover:text-gray-600 transition-colors">
              GİRİŞ YAPIN
            </Link>
        </div>
      </div>
    </div>
  );
}
