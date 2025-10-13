"use client"

import { useCart } from "@/lib/cart-context"
import { useAuth } from "@/lib/auth-context"
import { CheckoutForm } from "@/components/checkout-form"
import { CartSummary } from "@/components/cart-summary"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function CheckoutPage() {
  const { items } = useCart()
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
      return
    }
    if (items.length === 0) {
      router.push("/cart")
    }
  }, [items, isAuthenticated, router])

  if (!isAuthenticated || items.length === 0) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Button variant="ghost" asChild className="mb-8">
        <Link href="/cart">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Cart
        </Link>
      </Button>

      <h1 className="mb-8 text-4xl font-bold tracking-tight">Checkout</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <CheckoutForm />
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <CartSummary showCheckoutButton={false} />
            <div className="mt-6 space-y-2 text-xs text-muted-foreground">
              <p>• Secure payment processing via Paystack</p>
              <p>• Your payment information is encrypted</p>
              <p>• Free returns within 30 days</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
