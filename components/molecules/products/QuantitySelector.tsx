"use client";

import { motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";

interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  maxQuantity: number;
}

export function QuantitySelector({
  quantity,
  onQuantityChange,
  maxQuantity,
}: QuantitySelectorProps) {
  const handleIncrement = () => {
    if (quantity < maxQuantity) {
      onQuantityChange(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      onQuantityChange(quantity - 1);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      {/* <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleDecrement}
        disabled={quantity <= 1}
        className={`w-8 h-8 rounded-full flex items-center justify-center
          ${
            quantity <= 1
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-gray-200 text-gray-600 hover:bg-gray-300"
          }`}
      >
        <Minus className="w-4 h-4" />
      </motion.button> */}
      <span className="w-12 text-center font-medium"> Quantity: </span>

      <span className="w-12 text-center font-medium"> {quantity}</span>

      {/* <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleIncrement}
        disabled={quantity >= maxQuantity}
        className={`w-8 h-8 rounded-full flex items-center justify-center
          ${
            quantity >= maxQuantity
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-gray-200 text-gray-600 hover:bg-gray-300"
          }`}
      >
        <Plus className="w-4 h-4" />
      </motion.button> */}
    </div>
  );
}
