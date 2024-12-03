"use client";

import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';

export function EmptyCart() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen flex flex-col items-center justify-center gap-6 px-4"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <ShoppingCart className="w-24 h-24 text-gray-300" />
      </motion.div>
      
      <div className="text-center">
        <h1 className="text-2xl font-semibold mb-2">Your cart is empty</h1>
        <p className="text-gray-500 mb-6">Looks like you haven't added anything to your cart yet</p>
        
        <Link href="/products">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Start Shopping
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
}