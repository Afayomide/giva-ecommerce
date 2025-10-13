import { Request, Response } from "express";
import Order from "./models/order";

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY as string;
const PAYSTACK_BASE_URL = "https://api.paystack.co";

export const initiatePayment = async (req: Request, res: Response) => {
  try {
    if (!PAYSTACK_SECRET_KEY) {
      return res.status(500).json({ error: "Missing PAYSTACK_SECRET_KEY" });
    }

    const userId = (req as any).userId;
    const { email, amount, items, address } = req.body;

    if (!email || !amount || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "Invalid payment payload" });
    }

    const initializeResponse = await fetch(
      `${PAYSTACK_BASE_URL}/transaction/initialize`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          amount, // amount in kobo
          metadata: {
            userId,
            items,
            address,
          },
        }),
      }
    );

    const initializeJson = await initializeResponse.json();
    if (!initializeResponse.ok || !initializeJson?.status) {
      return res.status(502).json({
        error: initializeJson?.message || "Failed to initialize payment",
      });
    }

    const { authorization_url, reference } = initializeJson.data || {};
    if (!authorization_url || !reference) {
      return res
        .status(502)
        .json({ error: "Incomplete response from Paystack" });
    }

    await Order.create({
      user: userId,
      items: (items || []).map((i: any) => ({
        product: i.product,
        quantity: i.quantity,
        price: i.price,
        size: i.size,
        color: i.color,
      })),
      total: amount / 100,
      email,
      address,
      status: "pending",
      paymentReference: reference,
    });

    return res.json({
      status: "success",
      message: "Payment initiated",
      authorization_url,
      reference,
    });
  } catch (error: any) {
    console.error(error);
    res
      .status(500)
      .json({ error: error.message || "Payment initiation failed" });
  }
};

export const verifyPayment = async (req: Request, res: Response) => {
  try {
    if (!PAYSTACK_SECRET_KEY) {
      return res.status(500).json({ error: "Missing PAYSTACK_SECRET_KEY" });
    }

    const { reference } = req.body;
    if (!reference) return res.status(400).json({ error: "Missing reference" });

    const verifyResponse = await fetch(
      `${PAYSTACK_BASE_URL}/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        },
      }
    );
    const verifyJson = await verifyResponse.json();
    if (!verifyResponse.ok || !verifyJson?.status) {
      return res
        .status(502)
        .json({ error: verifyJson?.message || "Failed to verify payment" });
    }

    const status = verifyJson?.data?.status;
    if (status === "success") {
      await Order.updateOne(
        { paymentReference: reference },
        { $set: { status: "paid" } }
      );
      return res.json({
        status: "success",
        message: "Payment verified",
        reference,
      });
    }

    await Order.updateOne(
      { paymentReference: reference },
      { $set: { status: "failed" } }
    );
    return res
      .status(400)
      .json({ status: "failed", message: "Payment not successful", reference });
  } catch (error: any) {
    res
      .status(500)
      .json({ error: error.message || "Payment verification failed" });
  }
};
