"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { verifyPayment } from "@/lib/api"
import { useCart } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CheckCircle, Loader2 } from "lucide-react"

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { clearCart } = useCart()
  const [verifying, setVerifying] = useState(true)
  const [verified, setVerified] = useState(false)

  useEffect(() => {
    const reference = searchParams.get("reference")

    if (!reference) {
      router.push("/")
      return
    }

    async function verify() {
      try {
        console.log("[v0] Verifying payment reference:", reference)
        const response = await verifyPayment(reference)
        console.log("[v0] Verification response:", response)

        if (response.status === "success") {
          setVerified(true)
          clearCart()
        }
      } catch (error) {
        console.error("[v0] Verification error:", error)
      } finally {
        setVerifying(false)
      }
    }

    verify()
  }, [searchParams, router, clearCart])

  if (verifying) {
    return (
      <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 py-12">
        <Loader2 className="mb-4 h-12 w-12 animate-spin text-muted-foreground" />
        <p className="text-muted-foreground">Verifying your payment...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 py-12 text-center">
      <CheckCircle className="mb-6 h-20 w-20 text-green-500" />
      <h1 className="mb-4 text-4xl font-bold">Order Confirmed!</h1>
      <p className="mb-8 max-w-md text-muted-foreground">
        Thank you for your purchase. We've sent a confirmation email with your order details.
      </p>
      <div className="flex gap-4">
        <Button asChild>
          <Link href="/products">Continue Shopping</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  )
}
