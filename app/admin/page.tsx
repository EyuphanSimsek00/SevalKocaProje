"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Package, ShoppingCart, Users, LogOut, Plus, X, Trash2, Edit2 } from "lucide-react";

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [products, setProducts] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  
  // Form State
  const [formData, setFormData] = useState({
    Name: "",
    Price: "",
    Category: "Ust Giyim",
    Description: "",
  });
  
  // Dosya State
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Yetki Kontrolü
  useEffect(() => {
    if (status === "loading") return;
    if (!session || (session.user as any)?.role !== "admin") {
      router.replace("/");
    }
  }, [session, status, router]);

  // Ürünleri Çek (Gerçek Veri)
  useEffect(() => {
    if (status === "authenticated" && (session.user as any)?.role === "admin") {
      fetchProducts();
    }
  }, [status, session]);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (error) {
      console.error("Ürünler getirilirken hata oluştu:", error);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`'${name}' isimli ürünü silmek istediğinize emin misiniz?`)) {
      try {
        const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
        if (res.ok) {
          fetchProducts();
        } else {
          alert("Silme işlemi başarısız oldu.");
        }
      } catch (error) {
        alert("Bağlantı hatası oluştu.");
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const openAddModal = () => {
    setEditingProductId(null);
    setFormData({ Name: "", Price: "", Category: "Ust Giyim", Description: "" });
    setSelectedFile(null);
    setPreviewUrl(null);
    setIsModalOpen(true);
  };

  const openEditModal = (product: any) => {
    setEditingProductId(product.ID);
    setFormData({
      Name: product.Name,
      Price: product.Price.toString(),
      Category: product.Category,
      Description: product.Description || ""
    });
    setSelectedFile(null);
    setPreviewUrl(product.Image); // Mevcut görseli önizleme olarak ayarlıyoruz
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFile(null);
    setPreviewUrl(null);
    setFormData({ Name: "", Price: "", Category: "Ust Giyim", Description: "" });
    setEditingProductId(null);
  };

  const handleSubmitProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Eğer yeni eklemeyse ve dosya yoksa izin verme
    if (!editingProductId && !selectedFile) {
        alert("Lütfen bir ürün görseli seçiniz.");
        return;
    }
    
    setIsSubmitting(true);
    
    try {
      let imageUrl = previewUrl; // Varsayılan olarak mevcut görsel linki

      // Eğer formda yeni bir dosya seçilmişse
      if (selectedFile) {
        // Aşama 1: Yeni Dosyayı yükle
        const formDataUpload = new FormData();
        formDataUpload.append("file", selectedFile);
        
        const uploadRes = await fetch("/api/upload", {
            method: "POST",
            body: formDataUpload
        });
        
        if (!uploadRes.ok) {
            throw new Error("Görsel sunucuya yüklenemedi.");
        }
        
        const uploadData = await uploadRes.json();
        imageUrl = uploadData.url;
      }

      // Aşama 2: Ürünü kaydet (POST - Yeni) veya (PATCH - Düzenleme)
      const url = editingProductId ? `/api/products/${editingProductId}` : '/api/products';
      const method = editingProductId ? 'PATCH' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          Name: formData.Name,
          Price: Number(formData.Price),
          Category: formData.Category,
          Description: formData.Description,
          Image: imageUrl
        })
      });

      if (res.ok) {
        closeModal();
        fetchProducts(); // Sayfa yenilenmeden tabloyu güncelle
      } else {
        alert("Ürün kaydedilirken bir hata oluştu.");
      }
    } catch (error) {
      console.error("Gönderim hatası:", error);
      alert("Bağlantı veya sunucu hatası oluştu.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (status === "loading" || !session || (session.user as any)?.role !== "admin") {
    return (
      <div className="fixed inset-0 z-[100] bg-white flex items-center justify-center">
        <p className="text-gray-400 tracking-widest text-sm uppercase">Yükleniyor...</p>
      </div>
    );
  }

  return (
    <>
      <div className="fixed inset-0 z-[100] bg-[#fdfdfd] flex h-screen w-full overflow-hidden text-black font-sans">
        {/* Sol Kenar Çubuğu (Sidebar) */}
        <aside className="w-64 border-r border-gray-200 flex flex-col justify-between bg-white shrink-0">
          <div>
            <div className="h-20 flex flex-col items-center justify-center border-b border-gray-200 px-6">
              <h1 className="text-xl font-serif tracking-widest text-center mt-1">SEVAL KOCA</h1>
              <span className="text-[10px] uppercase tracking-widest text-gray-400 mt-1">Yönetici Paneli</span>
            </div>
            <nav className="p-4 flex flex-col gap-2">
              <Link href="#" className="flex items-center gap-3 px-4 py-3 bg-black text-white rounded text-sm font-medium tracking-wide">
                <Package size={18} /> Ürün Yönetimi
              </Link>
              <Link href="#" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded text-sm font-medium tracking-wide transition-colors">
                <ShoppingCart size={18} /> Siparişler
              </Link>
              <Link href="#" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded text-sm font-medium tracking-wide transition-colors">
                <Users size={18} /> Müşteriler
              </Link>
            </nav>
          </div>
          <div className="p-4 border-t border-gray-200">
            <button 
              onClick={() => signOut({ callbackUrl: '/' })} 
              className="flex items-center gap-3 px-4 py-3 w-full text-red-600 hover:bg-red-50 rounded text-sm font-medium tracking-wide transition-colors"
            >
              <LogOut size={18} /> Çıkış Yap
            </button>
          </div>
        </aside>

        {/* Sağ Ana İçerik Alanı */}
        <main className="flex-1 bg-white overflow-y-auto relative">
          <div className="h-20 border-b border-gray-200 flex items-center justify-between px-8 md:px-12 bg-white sticky top-0 z-10">
            <h2 className="text-lg font-medium tracking-wide">Ürün Listesi ({products.length})</h2>
            <button 
              onClick={openAddModal}
              className="bg-black text-white px-5 py-2.5 text-xs font-semibold tracking-widest flex items-center gap-2 hover:bg-gray-800 transition-colors rounded-sm shadow-sm"
            >
              <Plus size={16} /> YENİ ÜRÜN EKLE
            </button>
          </div>

          <div className="p-8 md:p-12">
            <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
              <table className="w-full text-left text-sm">
                <thead className="bg-[#fcfbf9] border-b border-gray-200 text-xs uppercase tracking-widest text-gray-500">
                  <tr>
                    <th className="px-6 py-4 font-medium">Ürün Adı</th>
                    <th className="px-6 py-4 font-medium">Kategori</th>
                    <th className="px-6 py-4 font-medium">Fiyat</th>
                    <th className="px-6 py-4 font-medium text-right">İşlem</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {products.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                        Henüz ürün bulunmuyor. Sağ üstten yeni ürün ekleyebilirsiniz.
                      </td>
                    </tr>
                  ) : (
                    products.map((product: any) => (
                      <tr key={product.ID} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-5 font-medium flex items-center gap-3">
                          {product.Image && (
                            <img src={product.Image} alt={product.Name} className="w-10 h-10 object-cover rounded bg-gray-100 border border-gray-200" />
                          )}
                          {product.Name}
                        </td>
                        <td className="px-6 py-5 text-gray-500">
                           {product.Category === 'ust-giyim' ? 'Üst Giyim' : product.Category === 'alt-giyim' ? 'Alt Giyim' : product.Category}
                        </td>
                        <td className="px-6 py-5">
                          {new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 2 }).format(product.Price)}₺
                        </td>
                        <td className="px-6 py-5 text-right flex justify-end items-center gap-4">
                          <button 
                            onClick={() => openEditModal(product)} 
                            className="text-gray-400 hover:text-black flex items-center gap-1 transition-colors"
                          >
                            <Edit2 size={16} /> Düzenle
                          </button>
                          <button 
                            onClick={() => handleDelete(product.ID, product.Name)} 
                            className="text-gray-400 hover:text-red-600 flex items-center gap-1 transition-colors"
                          >
                            <Trash2 size={16} /> Sil
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* YENİ/DÜZENLE ÜRÜN EKLE MODALI */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[110] bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="border-b border-gray-100 px-6 py-4 flex items-center justify-between">
              <h3 className="text-base font-medium tracking-wide">
                  {editingProductId ? "ÜRÜNÜ DÜZENLE" : "YENİ ÜRÜN EKLE"}
              </h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-black transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmitProduct} className="p-6 flex flex-col gap-5">
              
              {/* === Dosya Seçme ve Önizleme Alanı === */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Ürün Görseli</label>
                <div className="border border-dashed border-gray-300 rounded flex flex-col items-center justify-center p-4 min-h-[120px] bg-gray-50 relative hover:bg-gray-100 transition-colors">
                  {previewUrl ? (
                    <div className="relative w-full h-32 flex items-center justify-center">
                      <img src={previewUrl} alt="Preview" className="h-full object-contain rounded" />
                    </div>
                  ) : (
                    <div className="text-center text-gray-400">
                      <span className="text-sm">Görsel Seçmek İçin Tıklayın</span>
                      <p className="text-xs mt-1">PNG, JPG, JPEG veya WEBP</p>
                    </div>
                  )}
                  {/* Görünmez (opacity-0) input dosyayı yakalar ve tüm div'i tıklanabilir kılar */}
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    title=""
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Ürün Adı</label>
                <input 
                  type="text" 
                  value={formData.Name}
                  onChange={(e) => setFormData({...formData, Name: e.target.value})}
                  className="w-full border border-gray-200 rounded px-3 py-2 focus:outline-none focus:border-black transition-colors text-sm"
                  placeholder="Örn: Siyah İpek Gömlek"
                  required 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Fiyat (₺)</label>
                  <input 
                    type="number" 
                    step="0.01"
                    value={formData.Price}
                    onChange={(e) => setFormData({...formData, Price: e.target.value})}
                    className="w-full border border-gray-200 rounded px-3 py-2 focus:outline-none focus:border-black transition-colors text-sm"
                    placeholder="2500"
                    required 
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Kategori</label>
                  <select 
                    value={formData.Category}
                    onChange={(e) => setFormData({...formData, Category: e.target.value})}
                    className="w-full border border-gray-200 rounded px-3 py-2 focus:outline-none focus:border-black transition-colors text-sm bg-white"
                  >
                    <option value="ust-giyim">Üst Giyim</option>
                    <option value="alt-giyim">Alt Giyim</option>
                    <option value="dis-giyim">Dış Giyim</option>
                    <option value="aksesuar">Aksesuar</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Açıklama</label>
                <textarea 
                  value={formData.Description}
                  onChange={(e) => setFormData({...formData, Description: e.target.value})}
                  className="w-full border border-gray-200 rounded px-3 py-2 focus:outline-none focus:border-black transition-colors text-sm min-h-[80px]"
                  placeholder="Ürün açıklaması..."
                  required 
                />
              </div>

              <div className="pt-2">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-black text-white text-sm tracking-widest py-3 hover:bg-gray-800 transition-colors rounded disabled:opacity-50"
                >
                  {isSubmitting ? "YÜKLENİYOR..." : (editingProductId ? "GÜNCELLE" : "KAYDET")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
