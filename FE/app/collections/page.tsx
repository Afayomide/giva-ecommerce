"use client";

import Image from "next/image";
import Link from "next/link";
import hat from "@/public/bucket-hat.jpg";
import pant from "@/public/cargo-trousers.jpg";
import shirt from "@/public/black-denim-shirt.jpg";
import sneakers from "@/public/striped-casual-shirt.jpg";
import Jackets from "@/public/black-denim-shirt.jpg";
import sweatShirts from "@/public/linen-shirt.jpg";
import shorts from "@/public/beige-chino-trousers.jpg";
import shoes from "@/public/striped-casual-shirt.jpg";
import gowns from "@/public/black-silk-tie.jpg";
import hoodies from "@/public/black-wool-blazer.jpg";
import headwear from "@/public/bucket-hat.jpg";
import accessories from "@/public/watch-side-view.jpg"

// Example collection data — you can later fetch this dynamically from MongoDB
var collections = [
  { name: "Shirts", image: shirt, alt: "Shirts" },
  {
    name: "Trousers",
    image: pant,
    alt: "Trousers",
  },
  { name: "Caps", image: hat, alt: "Caps" },
  {
    name: "Sneakers",
    image: sneakers,
    alt: "Sneakers",
  },
  { name: "Jackets", image: Jackets, alt: "Jackets" },
  {
    name: "Sweatshirts",
    image: sweatShirts,
    alt: "Sweatshirts",
  },
  { name: "Shorts", image: shorts, alt: "Shorts" },
  { name: "Shoes", image: shoes, alt: "Shoes" },
  { name: "Hoodies", image: hoodies, alt: "Hoodies" },
  { name: "Gowns", image: gowns, alt: "Gowns" },
  {
    name: "Headwear",
    image: headwear,
    alt: "Headwear",
  },
  {
    name: "Accessories",
    image: accessories,
    alt: "Accessories",
  },
];

export default function CollectionsPage() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold tracking-tight">
            Shop Collections
          </h2>
          <p className="text-muted-foreground">
            Discover our full fashion range
          </p>
        </div>

        {/* Responsive grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
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
                <h3 className="text-lg sm:text-xl font-bold">
                  {collection.name}
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 group-hover:text-white">
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