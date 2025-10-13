import { NextResponse } from "next/server"

const mockProducts = [
  {
    id: "1",
    name: "Classic White Oxford Shirt",
    description:
      "Timeless white oxford shirt crafted from premium cotton. Features a button-down collar and tailored fit. Perfect for both office and casual occasions.",
    price: 79.99,
    image: "/white-oxford-shirt.jpg",
    images: ["/white-oxford-shirt.jpg", "/white-oxford-detail.jpg"],
    category: "Shirts",
    inStock: true,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["White", "Light Blue", "Pink"],
  },
  {
    id: "2",
    name: "Black Denim Shirt",
    description:
      "Modern black denim shirt with a slim fit. Made from premium stretch denim for comfort and style. Versatile piece that pairs well with any outfit.",
    price: 89.99,
    image: "/black-denim-shirt.jpg",
    images: ["/black-denim-shirt.jpg"],
    category: "Shirts",
    inStock: true,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Dark Blue", "Grey"],
  },
  {
    id: "3",
    name: "Striped Casual Shirt",
    description:
      "Contemporary striped shirt with a relaxed fit. Breathable cotton blend fabric perfect for warm weather. Effortlessly stylish for weekend wear.",
    price: 69.99,
    image: "/striped-casual-shirt.jpg",
    category: "Shirts",
    inStock: true,
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: "4",
    name: "Slim Fit Chino Trousers",
    description:
      "Essential slim fit chino trousers in versatile beige. Premium cotton twill construction with a modern tapered leg. Perfect for smart-casual styling.",
    price: 99.99,
    image: "/beige-chino-trousers.jpg",
    images: ["/beige-chino-trousers.jpg", "/chino-detail.jpg"],
    category: "Trousers",
    inStock: true,
    sizes: ["28", "30", "32", "34", "36", "38"],
    colors: ["Beige", "Navy", "Black", "Olive"],
  },
  {
    id: "5",
    name: "Black Tailored Trousers",
    description:
      "Sharp tailored trousers in classic black. Wool blend fabric with a comfortable stretch. Features pressed creases and a regular fit for a polished look.",
    price: 129.99,
    image: "/black-tailored-trousers.jpg",
    category: "Trousers",
    inStock: true,
    sizes: ["28", "30", "32", "34", "36", "38"],
    colors: ["Black", "Charcoal", "Navy"],
  },
  {
    id: "6",
    name: "Cargo Trousers",
    description:
      "Utility-inspired cargo trousers with multiple pockets. Durable cotton canvas construction with a relaxed fit. Perfect for casual streetwear looks.",
    price: 89.99,
    image: "/cargo-trousers.jpg",
    category: "Trousers",
    inStock: true,
    sizes: ["28", "30", "32", "34", "36"],
    colors: ["Khaki", "Black", "Olive"],
  },
  {
    id: "7",
    name: "Classic Baseball Cap",
    description:
      "Timeless baseball cap with an adjustable strap. Made from premium cotton twill with embroidered detailing. Essential accessory for any casual outfit.",
    price: 34.99,
    image: "/black-baseball-cap.jpg",
    images: ["/black-baseball-cap.jpg", "/cap-side-view.jpg"],
    category: "Caps",
    inStock: true,
    colors: ["Black", "Navy", "White", "Grey"],
  },
  {
    id: "8",
    name: "Snapback Cap",
    description:
      "Modern snapback cap with flat brim. Features structured crown and breathable mesh back panels. Perfect for streetwear enthusiasts.",
    price: 39.99,
    image: "/snapback-cap.jpg",
    category: "Caps",
    inStock: true,
    colors: ["Black/White", "Navy/White", "Grey/Black"],
  },
  {
    id: "9",
    name: "Bucket Hat",
    description:
      "Trendy bucket hat in premium cotton canvas. Reversible design offers two looks in one. Ideal for festival season and summer adventures.",
    price: 44.99,
    image: "/bucket-hat.jpg",
    category: "Caps",
    inStock: true,
    colors: ["Black", "Beige", "Olive"],
  },
  {
    id: "10",
    name: "Linen Blend Shirt",
    description:
      "Lightweight linen blend shirt perfect for summer. Breathable fabric with a relaxed fit and natural texture. Effortlessly cool and comfortable.",
    price: 94.99,
    image: "/linen-shirt.jpg",
    category: "Shirts",
    inStock: true,
    sizes: ["S", "M", "L", "XL"],
    colors: ["White", "Light Blue", "Beige"],
  },
  {
    id: "11",
    name: "Jogger Trousers",
    description:
      "Contemporary jogger trousers with tapered fit. Soft cotton blend with elasticated waistband and cuffs. Perfect blend of comfort and style.",
    price: 79.99,
    image: "/jogger-trousers.jpg",
    category: "Trousers",
    inStock: true,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Grey", "Navy"],
  },
  {
    id: "12",
    name: "Dad Cap",
    description:
      "Unstructured dad cap with curved brim. Soft cotton construction with vintage-inspired design. Comfortable everyday essential.",
    price: 29.99,
    image: "/dad-cap.jpg",
    category: "Caps",
    inStock: true,
    colors: ["Black", "White", "Beige", "Navy"],
  },
]

export async function GET() {
  return NextResponse.json(mockProducts)
}
