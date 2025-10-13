"use client";

import { useState, useEffect } from "react";
import { ProductGrid } from "@/components/product-grid";
import { ProductFilters } from "@/components/product-filters";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { getProducts, type Product } from "@/lib/api";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function ProductsPage() {
  var searchParams = useSearchParams();
  var searchTerm = searchParams.get("term");
  var [products, setProducts] = useState<Product[]>([]);
  var [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  var [loading, setLoading] = useState(true);
  var [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts(searchTerm);

        setProducts(data);
        setFilteredProducts(data);

        // ✅ Flatten all category arrays and deduplicate
        const uniqueCategories = Array.from(
          new Set(data.flatMap((p) => p.categories || []))
        );
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("[v0] Failed to load products:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, [searchTerm]);

  const handleFilterChange = ({
    category,
    priceRange,
    sortBy,
  }: {
    category: string;
    priceRange: [number, number];
    sortBy: string;
  }) => {
    var filtered = [...products];

    // ✅ Filter by selected category (check if category exists in product.categories array)
    if (category !== "all") {
      filtered = filtered.filter(
        (p) => p.categories && p.categories.includes(category)
      );
    }

    // ✅ Filter by price range
    filtered = filtered.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // ✅ Sorting
    switch (sortBy) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    setFilteredProducts(filtered);
  };

  if (loading) {
    return (
      <div className="container mx-auto flex min-h-[60vh] items-center justify-center px-4 py-12">
        <p className="text-muted-foreground">Loading products...</p>
      </div>
    );
  }

  if (!loading && products.length === 0) {
    return (
      <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 py-12 text-center">
        <h2 className="mb-2 text-2xl font-semibold">No products available</h2>
        <p className="text-muted-foreground">Please check back later.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">All Products</h1>
          <p className="mt-2 text-muted-foreground">
            {filteredProducts.length} products
          </p>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="lg:hidden bg-transparent">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <ProductFilters
                categories={categories}
                onFilterChange={handleFilterChange}
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="flex gap-8">
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-24">
            <ProductFilters
              categories={categories}
              onFilterChange={handleFilterChange}
            />
          </div>
        </aside>

        <div className="flex-1">
          <ProductGrid products={filteredProducts} />
        </div>
      </div>
    </div>
  );
}
