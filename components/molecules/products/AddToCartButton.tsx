"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Check } from "lucide-react";
import { addToCart } from "@/lib/FE/api";
import type { CartItem } from "../../../lib/FE/types/cart";

interface AddToCartButtonProps {
  disabled: boolean;
  productId: string;
  colorId: string;
  sizeId: string;
  price: number;
  quantity?: number;
}

export function AddToCartButton({
  disabled,
  productId,
  colorId,
  sizeId,
  price,
  quantity = 1,
}: AddToCartButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      const cartItem: CartItem = {
        productId,
        colorId,
        sizeId,
        quantity,
        priceAtTime: price,
      };

      await addToCart([cartItem]);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 2000);
    } catch (error) {
      console.error("Failed to add to cart:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      onClick={handleAddToCart}
      disabled={disabled || isLoading}
      className={`
        w-full px-6 py-3 rounded-lg font-medium 
        flex items-center justify-center gap-2
        transition-all duration-200
        ${
          disabled
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : isSuccess
            ? "bg-green-500 text-white"
            : "bg-indigo-500 text-white hover:bg-indigo-600"
        }
      `}
    >
      {isLoading ? (
        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
      ) : isSuccess ? (
        <>
          <Check className="w-5 h-5" />
          Added to Cart
        </>
      ) : (
        <>
          <ShoppingCart className="w-5 h-5" />
          Add to Cart
        </>
      )}
    </motion.button>
  );
}
