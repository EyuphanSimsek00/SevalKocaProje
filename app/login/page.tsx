"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/",
    });
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-sm">
        <h1 className="text-3xl font-serif text-center mb-8 tracking-widest text-black">GİRİŞ YAP</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">E-posta</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-b border-black py-2 focus:outline-none focus:border-gray-500 transition-colors text-sm"
              placeholder="E-posta adresiniz"
              required 
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Şifre</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-b border-black py-2 focus:outline-none focus:border-gray-500 transition-colors text-sm"
              placeholder="Şifreniz"
              required 
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-black text-white text-sm tracking-widest py-4 mt-6 hover:bg-gray-800 transition-colors"
          >
            GİRİŞ YAP
          </button>
        </form>

        <div className="mt-8 text-center border-t border-gray-100 pt-6">
            <span className="text-xs text-gray-500 tracking-wider">HESABINIZ YOK MU? </span>
            <Link href="/register" className="text-xs text-black tracking-widest border-b border-black font-semibold hover:text-gray-600 transition-colors">
              KAYIT OLUN
            </Link>
        </div>
      </div>
    </div>
  );
}
