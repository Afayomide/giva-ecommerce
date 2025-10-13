"use client";

import Image from "next/image";
import { Minus, Plus, X } from "lucide-react";
import { Button } from "./ui/button";
import { useCart, type CartItem as CartItemType } from "@/lib/cart-context";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  console.log(item)
  const { updateQuantity, removeItem, loading } = useCart();

  return (
    <div className="flex gap-4 border-b border-border py-6">
      <div className="relative h-24 w-24 shrink-0 overflow-hidden bg-muted">
        <Image
          src={item.image || "/placeholder.svg"}
          alt={item.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <div className="flex justify-between">
          <div>
            <h3 className="font-medium">{item.name}</h3>
            {item.size && (
              <p className="text-sm text-muted-foreground">Size: {item.size}</p>
            )}
            {item.color && (
              <p className="text-sm text-muted-foreground">
                Color: {item.color}
              </p>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => removeItem(item.id)}
            className="h-8 w-8"
            disabled={loading}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="h-8 w-8"
              disabled={loading}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-8 text-center text-sm">{item.quantity}</span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="h-8 w-8"
              disabled={loading}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          <p className="font-semibold">
            ₦{(item.price * item.quantity).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}
