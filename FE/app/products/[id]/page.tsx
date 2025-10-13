"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getProduct, type Product } from "@/lib/api";
import { ProductImageGallery } from "@/components/product-image-gallery";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, ShoppingCart, Loader2 } from "lucide-react";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addItem, loading: cartLoading } = useCart();
  const { toast } = useToast();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");

  useEffect(() => {
    async function loadProduct() {
      try {
        const data = await getProduct(params.id as string);
        setProduct(data);
        if (data.sizes && data.sizes.length > 0) {
          setSelectedSize(data.sizes[0]);
        }
        if (data.colors && data.colors.length > 0) {
          setSelectedColor(data.colors[0]);
        }
      } catch (error) {
        console.error("[v0] Failed to load product:", error);
        toast({
          title: "Error",
          description: "Failed to load product details",
          variant: "destructive",
        });
        router.push("/products");
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
  }, [params.id, router, toast]);

  const handleAddToCart = () => {
    if (!product) return;

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize,
      productId: product.id,
      color: selectedColor,
    });

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto flex min-h-[60vh] items-center justify-center px-4 py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!product) {
    return null;
  }

  const images =
    product.images && product.images.length > 0
      ? product.images
      : [product.image];

  return (
    <div className="container mx-auto px-4 py-12">
      <Button variant="ghost" asChild className="mb-8">
        <Link href="/products">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Products
        </Link>
      </Button>

      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <ProductImageGallery images={images} productName={product.name} />
        </div>

        <div className="space-y-6">
          <div>
            <p className="mb-2 text-sm text-muted-foreground">
              {product.category}
            </p>
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-balance">
              {product.name}
            </h1>
            <p className="text-3xl font-bold">₦{product.price.toFixed(2)}</p>
          </div>

          <div className="border-y border-border py-6">
            <p className="leading-relaxed text-muted-foreground">
              {product.description}
            </p>
          </div>

          {product.sizes && product.sizes.length > 0 && (
            <div>
              <Label className="mb-3 block text-sm font-semibold">Size</Label>
              <RadioGroup value={selectedSize} onValueChange={setSelectedSize}>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <div key={size}>
                      <RadioGroupItem
                        value={size}
                        id={`size-${size}`}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={`size-${size}`}
                        className="flex h-10 w-16 cursor-pointer items-center justify-center border border-border bg-background text-sm font-medium transition-colors peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground hover:bg-accent"
                      >
                        {size}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>
          )}

          {product.colors && product.colors.length > 0 && (
            <div>
              <Label className="mb-3 block text-sm font-semibold">Color</Label>
              <RadioGroup
                value={selectedColor}
                onValueChange={setSelectedColor}
              >
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <div key={color}>
                      <RadioGroupItem
                        value={color}
                        id={`color-${color}`}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={`color-${color}`}
                        className="flex h-10 cursor-pointer items-center justify-center border border-border bg-background px-4 text-sm font-medium transition-colors peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground hover:bg-accent"
                      >
                        {color}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>
          )}

          <div className="space-y-3">
            <Button
              size="lg"
              className="w-full"
              onClick={handleAddToCart}
              disabled={
                product.quantity < 0 ||
                product.status == "out of stock" ||
                cartLoading
              }
            >
              {cartLoading ? (
                <>
                  <div className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  Adding...
                </>
              ) : product.quantity > 0 || product.status == "in stock" ? (
                <>
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </>
              ) : (
                "Out of Stock"
              )}
            </Button>
            {product.inStock && (
              <Button
                size="lg"
                variant="outline"
                className="w-full bg-transparent"
                asChild
              >
                <Link href="/checkout">Buy Now</Link>
              </Button>
            )}
          </div>

          <div className="space-y-2 border-t border-border pt-6 text-sm text-muted-foreground">
            <p>• Free shipping on orders over ₦20,000</p>
            <p>• 30-day return policy</p>
            <p>• Secure payment processing</p>
            <p>• Ships within 2-3 business days</p>
          </div>
        </div>
      </div>
    </div>
  );
}
