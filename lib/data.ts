
export interface Product {
    id: number;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    images?: string[];
    category: string;
    categorySlug: string;
    isNew?: boolean;
    description?: string;
    features?: string[];
}

export interface Category {
    id: number;
    name: string;
    image: string;
    slug: string;
}

export const categories: Category[] = [
    {
        id: 1,
        name: "Üst Giyim",
        image: "https://images.unsplash.com/photo-1551163943-3f6a29e39454?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        slug: "ust-giyim"
    },
    {
        id: 2,
        name: "Alt Giyim",
        image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        slug: "alt-giyim"
    },
    {
        id: 3,
        name: "Aksesuar",
        image: "https://images.unsplash.com/photo-1511405946472-a37e3b5ccd47?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        slug: "aksesuar"
    }
];

export const products: Product[] = [
    {
        id: 1,
        name: "Gri Kemerli Etek Şort",
        price: 1399.90,
        image: "https://images.unsplash.com/photo-1548624149-f3ca147943e7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        images: [
            "https://images.unsplash.com/photo-1548624149-f3ca147943e7?w=500&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1551163943-3f6a29e39454?w=500&auto=format&fit=crop&q=60"
        ],
        category: "Alt Giyim",
        categorySlug: "alt-giyim",
        isNew: true,
        description: "Modern kesimli, yüksek bel gri etek şort. Hem şık hem rahat bir kullanım sunar.",
        features: ["Yüksek Bel", "Kemer Detaylı", "Polyester Kumaş", "Astarlı"]
    },
    {
        id: 2,
        name: "Beyaz Dokulu Oversize Triko Bluz",
        price: 1100.00,
        image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        images: [
            "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&auto=format&fit=crop&q=60"
        ],
        category: "Üst Giyim",
        categorySlug: "ust-giyim",
        isNew: true,
        description: "Yumuşak dokulu, oversize kesim beyaz triko bluz. Günlük kullanım için ideal.",
        features: ["Oversize Kesim", "Yumuşak Doku", "%100 Pamuk", "Makinede Yıkanabilir"]
    },
    {
        id: 3,
        name: "Tek Omuz Örgü Detaylı Crop Top & Mini Etek İkili Takım",
        price: 899.90,
        image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        images: [
            "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&auto=format&fit=crop&q=60"
        ],
        category: "Takım",
        categorySlug: "ust-giyim",
        isNew: true,
        description: "Şık davetler için tasarlanmış, tek omuz detaylı crop top ve mini etek takımı.",
        features: ["İkili Takım", "Örgü Detay", "Slim Fit"]
    },
    {
        id: 4,
        name: "Pembe Çizgili Drapeli Mini Etek & Crop Vatkalı Gömlek İkili Takım",
        price: 2399.90,
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        images: [
            "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&auto=format&fit=crop&q=60"
        ],
        category: "Takım",
        categorySlug: "alt-giyim",
        isNew: true
    },
    // Upper Wear (Üst Giyim)
    {
        id: 5,
        name: "Modern Klasik: Çizgili Siyah İkili Takım",
        price: 1599.90,
        image: "https://images.unsplash.com/photo-1591369822096-35f96f21b65e?w=500&auto=format&fit=crop&q=60",
        images: [
            "https://images.unsplash.com/photo-1591369822096-35f96f21b65e?w=500&auto=format&fit=crop&q=60"
        ],
        category: "Üst Giyim",
        categorySlug: "ust-giyim"
    },
    {
        id: 6,
        name: "Yaratıcı Mizah: Beyaz Oversize Tişört",
        price: 649.90,
        image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500&auto=format&fit=crop&q=60",
        category: "Üst Giyim",
        categorySlug: "ust-giyim"
    },
    {
        id: 7,
        name: "Siyah Kısa Gömlek",
        price: 799.90,
        image: "https://images.unsplash.com/photo-1604176354204-9268737828c9?w=500&auto=format&fit=crop&q=60",
        images: [
            "https://images.unsplash.com/photo-1604176354204-9268737828c9?w=500&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&auto=format&fit=crop&q=60"
        ],
        category: "Üst Giyim",
        categorySlug: "ust-giyim",
        description: "Bu siyah kısa gömlek, şehirli tarzın modern yorumunu yansıtıyor. Net hatlara sahip kesimiyle güçlü bir duruş sergilerken, minimalist formu sayesinde zamansız bir şıklık sunuyor.",
        features: [
            "Renk: Mat Siyah",
            "Kumaş: Pamuk karışımlı, tok yapılı kumaş",
            "Kesim: Kısa (cropped) model",
            "Yaka: Klasik gömlek yakası",
            "Kollar: Uzun ve geniş kesim"
        ]
    },
    {
        id: 8,
        name: "Desenli Transparan Gömlek",
        price: 1099.90,
        image: "https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?w=500&auto=format&fit=crop&q=60",
        category: "Üst Giyim",
        categorySlug: "ust-giyim"
    },

    // Lower Wear (Alt Giyim)
    {
        id: 9,
        name: "Siyah Mini Etek",
        price: 899.90,
        image: "https://images.unsplash.com/photo-1582142407894-ec85f1260a46?w=500&auto=format&fit=crop&q=60",
        category: "Alt Giyim",
        categorySlug: "alt-giyim"
    },
    {
        id: 10,
        name: "Kot Pantolon",
        price: 1250.00,
        image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&auto=format&fit=crop&q=60",
        category: "Alt Giyim",
        categorySlug: "alt-giyim"
    },

    // Accessories (Aksesuar)
    {
        id: 11,
        name: "Beyaz Spor Çorap",
        price: 149.90,
        image: "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=500&auto=format&fit=crop&q=60",
        category: "Aksesuar",
        categorySlug: "aksesuar"
    },
    {
        id: 12,
        name: "İşlemeli Çorap",
        price: 199.90,
        image: "https://images.unsplash.com/photo-1631233857184-2f211516e87b?w=500&auto=format&fit=crop&q=60",
        category: "Aksesuar",
        categorySlug: "aksesuar"
    }
];
