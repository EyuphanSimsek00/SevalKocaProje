
import Link from "next/link";
import Image from "next/image";

export default function HeroSlider() {
    return (
        <div className="relative w-full h-[80vh] bg-gray-100 overflow-hidden">
            {/* We use a static image for the 'slider' as per the prompt requirements for a demo */}
            <Image
                src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop"
                alt="Hero Fashion"
                fill
                className="object-cover object-center"
                priority
            />

            {/* Overlay Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <h1 className="text-5xl md:text-7xl font-serif text-black italic mb-8 drop-shadow-sm">
                    Bu Haftaya Özel
                </h1>
                <Link
                    href="/products"
                    className="px-8 py-3 bg-white/10 backdrop-blur-sm border border-black/20 hover:bg-black hover:text-white transition-all duration-300 text-black uppercase tracking-widest text-sm font-medium"
                >
                    Göz At
                </Link>
            </div>
        </div>
    );
}
