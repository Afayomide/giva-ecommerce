"use client";

import type React from "react";

import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./auth-context";
import {
  getCart,
  addToCartAPI,
  updateCartItemAPI,
  removeCartItemAPI,
  clearCartAPI,
  type CartResponseItem,
} from "./api";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size?: string;
  color?: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (
    item: Omit<CartItem, "quantity"> & { quantity?: number; productId: string }
  ) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  loading: boolean;
  initialLoading: boolean;
  error: string | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Convert backend cart item to frontend cart item
const convertCartItem = (item: CartResponseItem): CartItem => ({
  id: item.product._id,
  name: item.product.name,
  price: item.product.price,
  quantity: item.quantity,
  image: item.product.image,
  size: item.size,
  color: item.colors,
});

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setItems(parsedCart);
      } catch (err) {
        console.error("Error parsing saved cart:", err);
        localStorage.removeItem("cart");
      }
    }
    setInitialLoading(false);
  }, []);

  // Save to localStorage when items change (for unauthenticated users)
  useEffect(() => {
    if (!isAuthenticated && !initialLoading) {
      localStorage.setItem("cart", JSON.stringify(items));
    }
  }, [items, isAuthenticated, initialLoading]);

  // Fetch cart from backend when user is authenticated
  const fetchCart = async () => {
    if (!isAuthenticated) {
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const cartResponse = await getCart();
      const convertedItems = cartResponse.items.map(convertCartItem);
      setItems(convertedItems);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch cart");
      console.error("Error fetching cart:", err);
    } finally {
      setLoading(false);
    }
  };

  // Sync localStorage cart with backend when user logs in
  const syncCartWithBackend = async () => {
    if (!isAuthenticated) return;

    const localCart = localStorage.getItem("cart");
    if (!localCart) {
      // No local cart, just fetch from backend
      await fetchCart();
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Get current backend cart
      const backendCartResponse = await getCart();
      const backendItems = backendCartResponse.items.map(convertCartItem);

      // Parse local cart
      const localItems: CartItem[] = JSON.parse(localCart);

      // Merge carts - backend takes priority for existing items
      const mergedItems = [...backendItems];
      const backendProductIds = new Set(backendItems.map((item) => item.id));

      // Add local items that don't exist in backend
      for (const localItem of localItems) {
        // Check if item exists in backend (by productId, not cart item id)
        const existsInBackend = backendItems.some(
          (backendItem) =>
            backendItem.name === localItem.name &&
            backendItem.size === localItem.size &&
            backendItem.color === localItem.color
        );

        if (!existsInBackend) {
          // Add local item to backend
          try {
            await addToCartAPI({
              productId: localItem.id, // For localStorage items, id is the product ID
              quantity: localItem.quantity,
              size: localItem.size,
              color: localItem.color,
            });
          } catch (err) {
            console.error("Failed to sync item:", err);
          }
        }
      }

      // Fetch updated cart from backend
      const updatedCartResponse = await getCart();
      const updatedItems = updatedCartResponse.items.map(convertCartItem);
      setItems(updatedItems);

      // Clear localStorage since we've synced
      localStorage.removeItem("cart");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to sync cart");
      console.error("Error syncing cart:", err);
    } finally {
      setLoading(false);
    }
  };

  // Handle authentication state changes
  useEffect(() => {
    if (initialLoading) return;

    if (isAuthenticated) {
      syncCartWithBackend();
    } else {
      // User logged out, clear cart and load from localStorage
      setItems([]);
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        try {
          const parsedCart = JSON.parse(savedCart);
          setItems(parsedCart);
        } catch (err) {
          console.error("Error parsing saved cart:", err);
          localStorage.removeItem("cart");
        }
      }
    }
  }, [isAuthenticated, initialLoading]);

  const addItem = async (
    item: Omit<CartItem, "quantity"> & { quantity?: number; productId: string }
  ) => {
    if (!isAuthenticated) {
      // Add to localStorage for unauthenticated users
      setItems((current) => {
        const existing = current.find(
          (i) =>
            i.id === item.id && i.size === item.size && i.color === item.color
        );
        if (existing) {
          return current.map((i) =>
            i.id === item.id && i.size === item.size && i.color === item.color
              ? { ...i, quantity: i.quantity + (item.quantity || 1) }
              : i
          );
        }
        return [...current, { ...item, quantity: item.quantity || 1 }];
      });
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const cartResponse = await addToCartAPI({
        productId: item.productId,
        quantity: item.quantity || 1,
        size: item.size,
        color: item.color,
      });
      console.log(cartResponse)
      const convertedItems = cartResponse.items.map(convertCartItem);
      setItems(convertedItems);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to add item to cart"
      );
      console.error("Error adding to cart:", err);
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (id: string) => {
    if (!isAuthenticated) {
      // Remove from localStorage for unauthenticated users
      setItems((current) => current.filter((item) => item.id !== id));
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const cartResponse = await removeCartItemAPI(id);
      console.log(cartResponse)
      const convertedItems = cartResponse.items.map(convertCartItem);
      setItems(convertedItems);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to remove item from cart"
      );
      console.error("Error removing from cart:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (id: string, quantity: number) => {
    if (!isAuthenticated) {
      // Update in localStorage for unauthenticated users
      if (quantity <= 0) {
        setItems((current) => current.filter((item) => item.id !== id));
        return;
      }
      setItems((current) =>
        current.map((item) => (item.id === id ? { ...item, quantity } : item))
      );
      return;
    }

    if (quantity <= 0) {
      await removeItem(id);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const cartResponse = await updateCartItemAPI({ itemId: id, quantity });
      const convertedItems = cartResponse.items.map(convertCartItem);
      setItems(convertedItems);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to update cart item"
      );
      console.error("Error updating cart item:", err);
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    if (!isAuthenticated) {
      // Clear localStorage for unauthenticated users
      setItems([]);
      localStorage.removeItem("cart");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await clearCartAPI();
      setItems([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to clear cart");
      console.error("Error clearing cart:", err);
    } finally {
      setLoading(false);
    }
  };

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        total,
        loading,
        initialLoading,
        error,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
