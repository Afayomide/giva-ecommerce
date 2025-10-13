import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { BrandName } from "@/components/brand-name"
import { Logo } from "@/components/logo"
import hat from "@/public/bucket-hat.jpg"
import pant from "@/public/cargo-trousers.jpg"
import shirt from "@/public/black-denim-shirt.jpg"
import Image from "next/image"

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden border-b border-border bg-background sm:mt-10 px-4">
        <div className="container mx-auto text-center">
          <div className="mb-8 flex justify-center">
            <Logo size={150} className="" />
          </div>
          <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight text-balance md:text-7xl lg:text-8xl">
            Define your style with <BrandName />
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground text-balance md:text-xl">
            Discover premium fashion essentials. From statement shirts to
            tailored trousers and iconic caps - elevate your wardrobe with
            pieces that speak to your style.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row lg:mb-10">
            <Button size="lg" asChild>
              <Link href="/products">
                Shop Collection
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="border-b border-border py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <h3 className="mb-2 text-4xl font-bold">Trendy</h3>
              <p className="text-sm text-muted-foreground">
                Latest fashion styles
              </p>
            </div>
            <div className="text-center">
              <h3 className="mb-2 text-4xl font-bold">Quality</h3>
              <p className="text-sm text-muted-foreground">
                Premium materials & craftsmanship
              </p>
            </div>
            <div className="text-center">
              <h3 className="mb-2 text-4xl font-bold">Versatile</h3>
              <p className="text-sm text-muted-foreground">
                Styles for every occasion
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold tracking-tight">
              Shop by Category
            </h2>
            <p className="text-muted-foreground">
              Explore our fashion collections
            </p>
          </div>

          {/* Category grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Shirts",
                slug: "shirts",
                image: shirt,
                alt: "linen-shirt",
              },
              {
                name: "Trousers",
                slug: "trousers",
                image: pant,
                alt: "cargo-trousers",
              },
              {
                name: "Caps",
                slug: "caps",
                image: hat,
                alt: "black-baseball-cap",
              },
            ].map((collection) => (
              <Link
                key={collection.slug}
                href={`/products?category=${collection.slug}`}
                className="group block overflow-hidden rounded-2xl bg-muted"
              >
                {/* Image */}
                <div className="relative aspect-square w-full">
                  <Image
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    src={collection.image}
                    alt={collection.alt}
                  />
                </div>

                {/* Text below image */}
                <div className="p-4 text-center">
                  <h3 className="text-xl font-bold">{collection.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground group-hover:text-foreground">
                    Shop Now →
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* View More Button */}
          <div className="mt-10 text-center">
            <Link
              href="/collections"
              className="inline-block rounded-full bg-primary px-6 py-3 text-sm font-semibold text-background shadow-md transition-all hover:bg-primary/90 hover:shadow-lg"
            >
              View More →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
