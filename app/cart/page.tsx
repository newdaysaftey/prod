"use client";

import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { CartItemCard } from "@/components/molecules/cart/CartItemCard";
import { CartSummary } from "@/components/molecules/cart/CartSummary";
import { EmptyCart } from "@/components/molecules/cart/EmptyCart";
import { useCart } from "@/lib/FE/hooks/useCart";
import { Toaster } from "sonner";

export default function CartPage() {
  const { cart, isLoading, error, updateQuantity, removeItem } = useCart();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Error: {(error as Error).message}
      </div>
    );
  }

  if (!cart?.cartItems?.length) {
    return <EmptyCart />;
  }

  const handleCheckout = () => {
    // TODO: Implement checkout logic
    console.log("Proceed to checkout");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <Toaster />
      <div className="max-w-7xl mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold mb-8 flex items-center gap-3"
        >
          <ShoppingCart className="w-8 h-8 text-indigo-500" />
          Shopping Cart
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.cartItems.map((item: any) => (
              <CartItemCard
                key={`${item.ProductId}-${item.ColorId}-${item.SizeId}`}
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemove={removeItem}
              />
            ))}
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <CartSummary cart={cart} onCheckout={handleCheckout} />
          </div>
        </div>
      </div>
    </div>
  );
}
