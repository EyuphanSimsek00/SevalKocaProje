import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer"; 
import { CartProvider } from "@/context/CartContext"; // 1. BURA EKLENDİ

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Seval Koca",
  description: "Zamansız Şıklık",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        {/* 2. TÜM İÇERİK CARTPROVIDER İLE SARMALANDI */}
        <CartProvider>
          <div className="flex-grow">
              {children}
          </div>
          <Footer /> 
        </CartProvider>
      </body>
    </html>
  );
}