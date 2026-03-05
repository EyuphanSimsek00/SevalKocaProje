import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-16 mt-auto border-t border-gray-900">
      <div className="container mx-auto px-4 text-center">
        <h4 className="text-3xl font-serif mb-8 tracking-widest">SEVAL KOCA</h4>
        <div className="flex justify-center gap-8 mb-8 text-sm text-gray-400 font-light">
          <Link href="/" className="hover:text-white transition-colors uppercase tracking-wider">Ana Sayfa</Link>
          <Link href="/category/tum-urunler" className="hover:text-white transition-colors uppercase tracking-wider">Koleksiyon</Link>
          <Link href="#" className="hover:text-white transition-colors uppercase tracking-wider">İletişim</Link>
        </div>
        <div className="border-t border-gray-800 pt-8 w-1/2 mx-auto">
             <p className="text-xs font-light tracking-[0.2em] text-gray-500">© 2026 SEVAL KOCA. ALL RIGHTS RESERVED.</p>
        </div>
      </div>
    </footer>
  );
}