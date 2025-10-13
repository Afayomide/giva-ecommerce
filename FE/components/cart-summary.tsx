"use client"

import { Button } from "./ui/button"
import { useCart } from "@/lib/cart-context"
import Link from "next/link"

interface CartSummaryProps {
  showCheckoutButton?: boolean
}

export function CartSummary({ showCheckoutButton = true }: CartSummaryProps) {
  const { total, items } = useCart()
  const shipping = total > 100 ? 0 : 10
  const tax = total * 0.08
  const finalTotal = total + shipping + tax

  return (
    <div className="space-y-4 rounded-none border border-border bg-card p-6">
      <h2 className="text-lg font-semibold">Order Summary</h2>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">
            Subtotal ({items.length} items)
          </span>
          <span>${total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Shipping</span>
          <span>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Tax</span>
          <span>₦{tax.toFixed(2)}</span>
        </div>
      </div>

      <div className="border-t border-border pt-4">
        <div className="flex justify-between text-lg font-semibold">
          <span>Total</span>
          <span>₦{finalTotal.toFixed(2)}</span>
        </div>
      </div>

      {showCheckoutButton && (
        <Button asChild className="w-full" size="lg">
          <Link href="/checkout">Proceed to Checkout</Link>
        </Button>
      )}

      {total < 100 && (
        <p className="text-center text-xs text-muted-foreground">
          Add ₦{(100 - total).toFixed(2)} more for free shipping
        </p>
      )}
    </div>
  );
}
