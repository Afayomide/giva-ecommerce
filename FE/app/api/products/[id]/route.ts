import { NextResponse } from "next/server"

const mockProducts = [
  {
    id: "1",
    name: "Premium Leather Wallet",
    description:
      "Handcrafted from the finest Italian leather, this wallet combines timeless elegance with modern functionality. Features multiple card slots and a spacious bill compartment.",
    price: 129.99,
    image: "/luxury-black-leather-wallet.jpg",
    images: ["/luxury-black-leather-wallet.jpg", "/leather-wallet-interior.jpg", "/leather-wallet-detail.jpg"],
    category: "Accessories",
    inStock: true,
    colors: ["Black", "Brown", "Navy"],
  },
  {
    id: "2",
    name: "Minimalist Watch",
    description:
      "A sophisticated timepiece featuring a sleek design with a stainless steel case and genuine leather strap. Swiss movement ensures precision and reliability.",
    price: 299.99,
    image: "/minimalist-black-watch.jpg",
    images: ["/minimalist-black-watch.jpg", "/watch-side-view.jpg"],
    category: "Watches",
    inStock: true,
    colors: ["Silver", "Black", "Gold"],
  },
  {
    id: "3",
    name: "Designer Sunglasses",
    description:
      "Protect your eyes in style with these premium sunglasses. UV400 protection and polarized lenses provide superior clarity and comfort.",
    price: 189.99,
    image: "/designer-black-sunglasses.jpg",
    category: "Accessories",
    inStock: true,
  },
  {
    id: "4",
    name: "Cashmere Scarf",
    description:
      "Luxuriously soft 100% cashmere scarf that adds warmth and sophistication to any outfit. Perfect for both casual and formal occasions.",
    price: 159.99,
    image: "/black-cashmere-scarf.jpg",
    category: "Apparel",
    inStock: false,
  },
  {
    id: "5",
    name: "Leather Briefcase",
    description:
      "Professional full-grain leather briefcase with padded laptop compartment and multiple organizational pockets. Built to last a lifetime.",
    price: 449.99,
    image: "/black-leather-briefcase.jpg",
    category: "Bags",
    inStock: true,
  },
  {
    id: "6",
    name: "Silk Tie",
    description:
      "Elegant 100% silk tie with a subtle pattern. Hand-finished with meticulous attention to detail for the discerning professional.",
    price: 79.99,
    image: "/black-silk-tie.jpg",
    category: "Accessories",
    inStock: true,
  },
  {
    id: "7",
    name: "Leather Belt",
    description:
      "Classic full-grain leather belt with a polished buckle. Versatile design works with both business and casual attire.",
    price: 89.99,
    image: "/black-leather-belt.png",
    category: "Accessories",
    inStock: true,
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "8",
    name: "Wool Blazer",
    description:
      "Tailored wool blazer with a modern slim fit. Premium construction and timeless design make this a wardrobe essential.",
    price: 399.99,
    image: "/black-wool-blazer.jpg",
    category: "Apparel",
    inStock: true,
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
]

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const product = mockProducts.find((p) => p.id === params.id)

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 })
  }

  return NextResponse.json(product)
}
