import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, amount, items } = body

    console.log("[v0] Payment request received:", { email, amount, items })

    // In production, this would call the actual Paystack API
    // For now, return a mock response
    return NextResponse.json({
      status: "success",
      message: "Payment initiated",
      authorization_url: `/checkout/success?reference=mock_ref_${Date.now()}`,
      reference: `mock_ref_${Date.now()}`,
    })
  } catch (error) {
    console.error("[v0] Payment error:", error)
    return NextResponse.json({ error: "Payment failed" }, { status: 500 })
  }
}
