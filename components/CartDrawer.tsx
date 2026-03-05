"use client";

import { X, Trash2, Tag, Minus, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

  return (
    <>
      {/* Arka plan karartması */}
      <div 
        className={`fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}
        onClick={onClose}
      />

      {/* Sağdan açılan çekmece */}
      <div className={`fixed top-0 right-0 h-full w-[400px] max-w-full bg-white z-[70] transform transition-transform duration-300 flex flex-col ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
        
        {/* Üst Başlık */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-medium">Sepet <span className="text-gray-500 text-sm">({cartItems.length} öge)</span></h2>
          <button onClick={onClose} className="hover:bg-gray-100 p-2 rounded-full transition-colors">
            <X size={24} strokeWidth={1.5} />
          </button>
        </div>

        {/* Ürün Listesi */}
        <div className="flex-1 overflow-y-auto p-6">
          {cartItems.length === 0 ? (
            <div className="text-center text-gray-500 mt-10">Sepetiniz şu an boş.</div>
          ) : (
            cartItems.map((item) => (
              <div key={`${item.id}-${item.size}`} className="flex gap-4 mb-6">
                <div className="relative w-24 h-32 bg-gray-100 flex-shrink-0">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                
                <div className="flex-1 flex flex-col">
                  <div className="flex justify-between items-start">
                    <h3 className="text-sm font-medium pr-4 leading-tight">{item.name}</h3>
                    <button onClick={() => removeFromCart(item.id, item.size)} className="text-gray-400 hover:text-red-500 transition-colors">
                      <Trash2 size={18} strokeWidth={1.5} />
                    </button>
                  </div>
                  
                  <div className="mt-2 text-sm font-bold">₺{item.price.toFixed(2)}</div>
                  {item.color && <div className="text-xs text-gray-500 mt-1">Renk: {item.color}</div>}
                  <div className="text-xs text-gray-500 mt-1">Beden: {item.size}</div>
                  
                  <div className="flex justify-between items-center mt-auto pt-4">
                    <div className="flex items-center border border-gray-300 rounded-sm">
                      <button onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)} className="px-2 py-1 hover:bg-gray-100 text-gray-600"><Minus size={14}/></button>
                      <span className="px-4 text-sm">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)} className="px-2 py-1 hover:bg-gray-100 text-gray-600"><Plus size={14}/></button>
                    </div>
                    <span className="text-sm font-medium">₺{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Alt Toplam ve Butonlar */}
        <div className="p-6 border-t border-gray-200 bg-gray-50/50">
          <div className="border-t border-gray-200 pt-4 mb-6">
            <div className="flex justify-between items-center text-lg">
              <span className="font-light">Tahmini toplam</span>
              <span className="font-medium">₺{cartTotal.toFixed(2)}</span>
            </div>
          </div>
          
          <div className="space-y-3">
            <button className="w-full py-4 border border-black text-black text-sm font-medium hover:bg-gray-100 transition-colors tracking-wide disabled:opacity-50" disabled={cartItems.length === 0}>
              Ödeme
            </button>
            <Link href="/cart" onClick={onClose} className="w-full py-4 block text-center bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors tracking-wide">
              Sepeti Görüntüle
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}