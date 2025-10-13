"use client";

import Image from "next/image";
import Link from "next/link";

// Example collection data — you can later fetch this dynamically from MongoDB
var collections = [
  { name: "Shirts", image: "/images/categories/shirt.jpg", alt: "Shirts" },
  {
    name: "Trousers",
    image: "/images/categories/trousers.jpg",
    alt: "Trousers",
  },
  { name: "Caps", image: "/images/categories/caps.jpg", alt: "Caps" },
  {
    name: "Sneakers",
    image: "/images/categories/sneakers.jpg",
    alt: "Sneakers",
  },
  { name: "Jackets", image: "/images/categories/jackets.jpg", alt: "Jackets" },
  {
    name: "Sweatshirts",
    image: "/images/categories/sweatshirts.jpg",
    alt: "Sweatshirts",
  },
  { name: "Shorts", image: "/images/categories/shorts.jpg", alt: "Shorts" },
  { name: "Ankara", image: "/images/categories/ankara.jpg", alt: "Ankara" },
  { name: "Aso Oke", image: "/images/categories/aso-oke.jpg", alt: "Aso Oke" },
  { name: "Lace", image: "/images/categories/lace.jpg", alt: "Lace" },
  { name: "Shoes", image: "/images/categories/shoes.jpg", alt: "Shoes" },
  { name: "Hoodies", image: "/images/categories/hoodies.jpg", alt: "Hoodies" },
  { name: "Gowns", image: "/images/categories/gowns.jpg", alt: "Gowns" },
  {
    name: "Headwear",
    image: "/images/categories/headwear.jpg",
    alt: "Headwear",
  },
  {
    name: "Accessories",
    image: "/images/categories/accessories.jpg",
    alt: "Accessories",
  },
];

export default function CollectionsPage() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold tracking-tight">
            Shop Collections
          </h2>
          <p className="text-muted-foreground">
            Discover our full fashion range
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {collections.map((collection) => (
            <Link
              key={collection.name}
              href={`/products?term=${encodeURIComponent(
                collection.name.toLowerCase()
              )}`}
              className="group relative overflow-hidden rounded-2xl bg-muted shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="relative w-full aspect-square">
                <Image
                  src={collection.image}
                  alt={collection.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-70 group-hover:opacity-60 transition-opacity"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-center text-white">
                <h3 className="text-xl font-bold">{collection.name}</h3>
                <p className="text-sm text-gray-300 group-hover:text-white">
                  Shop Now →
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
