import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { reference } = body

    console.log("[v0] Verifying payment reference:", reference)

    // In production, this would verify with Paystack API
    // For now, return a mock success response
    return NextResponse.json({
      status: "success",
      message: "Payment verified",
      reference,
    })
  } catch (error) {
    console.error("[v0] Verification error:", error)
    return NextResponse.json({ error: "Verification failed" }, { status: 500 })
  }
}
