export interface Product {
    id: string;
    name: string;
    title: string; // compatibility with home.ts
    price: number;
    description: string;
    category: string;
    stock: number;
    images: string[];
    slug: string;
    badge?: string;
    discount?: number;
    specs?: { label: string; value: string }[];
}

export const products: Product[] = [
    {
        id: "1",
        name: "MacBook Pro 16 M3 Max",
        title: "MacBook Pro 16 M3 Max",
        price: 3499,
        description: "The most powerful MacBook Pro ever. With the lightning-fast M3 Max chip, advanced thermal architecture, and a stunning Liquid Retina XDR display, it's designed for those who demand the absolute best in performance and portability.",
        category: "Computers",
        stock: 5,
        images: [
            "https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80"
        ],
        slug: "macbook-pro-16-m3-max",
        badge: "Premium",
        discount: 5,
        specs: [
            { label: "Processor", value: "Apple M3 Max" },
            { label: "Memory", value: "32GB Unified" },
            { label: "Storage", value: "1TB SSD" },
            { label: "Display", value: "16.2-inch XDR" }
        ]
    },
    {
        id: "2",
        name: "Sony WH-1000XM5",
        title: "Sony WH-1000XM5",
        price: 399,
        description: "Industry-leading noise cancellation, exceptional sound quality, and crystal-clear hands-free calling. The WH-1000XM5 headphones rewrite the rules for distraction-free listening and ultra-clear call quality.",
        category: "Audio",
        stock: 12,
        images: [
            "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80"
        ],
        slug: "sony-wh-1000xm5",
        badge: "Bestseller",
        discount: 10,
        specs: [
            { label: "Battery Life", value: "Up to 30 hours" },
            { label: "Noise Cancelling", value: "Industry Leading" },
            { label: "Bluetooth", value: "v5.2" },
            { label: "Weight", value: "250g" }
        ]
    },
    {
        id: "3",
        name: "iPhone 15 Pro Max",
        title: "iPhone 15 Pro Max",
        price: 1199,
        description: "Forged in titanium. Featuring the groundbreaking A17 Pro chip, a customizable Action button, and the most powerful iPhone camera system ever. Experience the next level of mobile technology.",
        category: "Phones",
        stock: 0,
        images: [
            "https://images.unsplash.com/photo-1678652197831-2d180705cd2c?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&w=800&q=80"
        ],
        slug: "iphone-15-pro-max",
        badge: "New Arrival",
        discount: 0,
        specs: [
            { label: "Chip", value: "A17 Pro" },
            { label: "Camera", value: "48MP Main" },
            { label: "Material", value: "Titanium" },
            { label: "Size", value: "6.7-inch" }
        ]
    },
    {
        id: "4",
        name: "Logitech MX Master 3S",
        title: "Logitech MX Master 3S",
        price: 99,
        description: "An icon, remastered. Meet MX Master 3S – an iconic mouse remastered for ultimate tactility, performance, and flow. Feel every moment of your workflow with even more precision, tactility, and performance.",
        category: "Accessories",
        stock: 50,
        images: [
            "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1607677686474-ad91fe9da900?auto=format&fit=crop&w=800&q=80"
        ],
        slug: "logitech-mx-master-3s",
        badge: "Essential",
        discount: 0,
        specs: [
            { label: "DPI", value: "8000" },
            { label: "Buttons", value: "7 Programmable" },
            { label: "Battery", value: "Rechargeable" },
            { label: "Connectivity", value: "Logi Bolt / BT" }
        ]
    },
    {
        id: "5",
        name: "iPad Pro M2",
        title: "iPad Pro M2",
        price: 799,
        description: "Astonishing performance. Incredibly advanced displays. Superfast wireless connectivity. Next-level Apple Pencil features. Powerful new features in iPadOS. The ultimate iPad experience.",
        category: "Computers",
        stock: 15,
        images: [
            "https://images.unsplash.com/photo-1544244015-0cd4b3ffc6b0?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1511385348-a52b4a160dc2?auto=format&fit=crop&w=800&q=80"
        ],
        slug: "ipad-pro-m2",
        badge: "Pro",
        discount: 0,
        specs: [
            { label: "Chip", value: "Apple M2" },
            { label: "Display", value: "Liquid Retina" },
            { label: "Camera", value: "12MP Ultra Wide" },
            { label: "Storage", value: "256GB" }
        ]
    }
];

export const getProductBySlug = (slug: string) => products.find(p => p.slug === slug);
export const getRelatedProducts = (category: string, currentSlug: string) => 
    products.filter(p => p.category === category && p.slug !== currentSlug).slice(0, 4);
