"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getCategories, Category } from "@/lib/api";

export default function CollectionsPage() {
  const [collections, setCollections] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCollections() {
      try {
        const data = await getCategories();
        setCollections(data);
      } catch (error) {
        console.error("Error fetching collections:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCollections();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

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
              key={collection._id}
              href={`/products?term=${encodeURIComponent(
                collection.name.toLowerCase()
              )}`}
              className="group relative overflow-hidden rounded-2xl bg-muted shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="relative w-full aspect-square">
                <Image
                  src={collection.image}
                  alt={collection.name}
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