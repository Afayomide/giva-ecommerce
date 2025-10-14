import { Request, Response } from "express";
import Order from "../models/order";

export const createOrder = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const { items, total, email, address, paymentReference } = req.body;
    const order = await Order.create({
      user: userId,
      items,
      total,
      email,
      address,
      status: paymentReference ? "paid" : "pending",
      paymentReference,
    });
    res.status(201).json(order);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to create order" });
  }
};

export const getUserOrders = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to load orders" });
  }
};
