"use client";

import { motion } from "framer-motion";
import { ShoppingBag, CreditCard, Truck } from "lucide-react";
import type { Cart } from "@/lib/FE/types/cart";

interface CartSummaryProps {
  cart: Cart;
  onCheckout: () => void;
}

export function CartSummary({ cart, onCheckout }: CartSummaryProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 space-y-6"
    >
      <h2 className="text-xl font-semibold flex items-center gap-2">
        <ShoppingBag className="w-5 h-5" />
        Order Summary
      </h2>

      <div className="space-y-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500 dark:text-gray-400">
            Subtotal ({cart.cartItems.length}{" "}
            {cart.cartItems.length === 1 ? "item" : "items"})
          </span>
          <span>${cart.totalAmount.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-500 dark:text-gray-400">Shipping</span>
          <span className="text-green-500">Free</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-500 dark:text-gray-400">Tax</span>
          <span>${(cart.totalAmount * 0.1).toFixed(2)}</span>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>${(cart.totalAmount * 1.1).toFixed(2)}</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">Including 10% tax</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Truck className="w-4 h-4" />
          <span>Free shipping on all orders</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <CreditCard className="w-4 h-4" />
          <span>Secure payment processing</span>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onCheckout}
        className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-lg font-medium transition-colors"
      >
        Proceed to Checkout
      </motion.button>
    </motion.div>
  );
}
