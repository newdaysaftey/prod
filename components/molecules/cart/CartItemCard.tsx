"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import type { CartItemDetail } from "@/lib/FE/types/cart";
import { QuantitySelector } from "@/components/molecules/products/QuantitySelector";

interface CartItemCardProps {
  item: CartItemDetail;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemove: (itemId: string) => void;
}

export function CartItemCard({
  item,
  onUpdateQuantity,
  onRemove,
}: CartItemCardProps) {
  console.log(item);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
    >
      <div className="flex items-start p-4 gap-4">
        {/* Product Image */}
        <Link
          href={`/products/${item.productId}`}
          className="relative w-24 h-24 flex-shrink-0"
        >
          <Image
            src={item.Color.Images[0]}
            alt={item.Product.Name}
            fill
            className="object-cover rounded-lg hover:opacity-80 transition-opacity"
          />
        </Link>

        {/* Product Details */}
        <div className="flex-grow">
          <Link href={`/products/${item.productId}`}>
            <h3 className="font-semibold text-lg mb-1 hover:text-indigo-500 transition-colors">
              {item.Product.Name}
            </h3>
          </Link>
          <div className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
            <div className="flex items-center gap-2">
              <span>Color:</span>
              <div
                className="w-4 h-4 rounded-full border border-gray-200"
                style={{ backgroundColor: item.Color.ColorCode }}
              />
              <span>{item.Color.ColorName}</span>
            </div>
            <p>Size: {item.Size.Size}</p>
            <p>Price: ${item.priceAtTime.toFixed(2)}</p>
          </div>
        </div>

        {/* Quantity and Actions */}
        <div className="flex flex-col items-end gap-4">
          <QuantitySelector
            quantity={item.quantity}
            onQuantityChange={(quantity) =>
              onUpdateQuantity(item.productId, quantity)
            }
            maxQuantity={item.Size.Stock}
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onRemove(item.productId)}
            className="text-red-500 hover:text-red-600 p-2"
          >
            <Trash2 className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Subtotal */}
        <div className="text-right">
          <p className="text-sm text-gray-500 dark:text-gray-400">Subtotal</p>
          <p className="font-semibold">${item.subTotal.toFixed(2)}</p>
        </div>
      </div>
    </motion.div>
  );
}
