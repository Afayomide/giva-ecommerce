import { Request, Response } from "express";
import Cart from "../models/cart";

export const getCart = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    let cart = await Cart.findOne({ user: userId }).populate("items.product");
    if (!cart) {
      cart = await Cart.create({ user: userId, items: [] });
    }
    res.json(cart);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to fetch cart" });
  }
};

export const addToCart = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const { productId, quantity = 1, size, color } = req.body;

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = await Cart.create({ user: userId, items: [] });
    }

    const existing = cart.items.find(
      (i) =>
        i.product.toString() === productId &&
        i.size === size &&
        i.color === color
    );
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity, size, color } as any);
    }

    await cart.save();
    await cart.populate("items.product");
    res.json(cart);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to add to cart" });
  }
};

export const updateCartItem = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const { itemId, quantity } = req.body;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    const item = (cart.items as any).id(itemId as any);
    if (!item) return res.status(404).json({ error: "Item not found" });
    if (quantity <= 0) {
      item.remove();
    } else {
      (item as any).quantity = quantity;
    }
    await cart.save();
    await cart.populate("items.product");
    res.json(cart);
  } catch (error: any) {
    res
      .status(500)
      .json({ error: error.message || "Failed to update cart item" });
  }
};

export const removeCartItem = async (req: Request, res: Response) => {
 try {
   const userId = (req as any).userId;
   const { itemId } = req.params;

   const cart = await Cart.findOne({ user: userId });
   if (!cart) return res.status(404).json({ error: "Cart not found" });

   const itemIndex = cart.items.findIndex(
     (item: any) => item.product.toString() === itemId
   );

   if (itemIndex === -1)
     return res.status(404).json({ error: "Item not found" });

   cart.items.splice(itemIndex, 1);

   await cart.save();

   await cart.populate("items.product");

   res.json(cart);
 } catch (error: any) {
   console.error(error);
   res
     .status(500)
     .json({ error: error.message || "Failed to remove cart item" });
 }
};

export const clearCart = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ error: "Cart not found" });
    cart.items = [] as any;
    await cart.save();
    res.json(cart);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to clear cart" });
  }
};
