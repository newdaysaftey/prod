"use client";

import { motion } from "framer-motion";

interface Size {
  SizeId: string;
  Size: string;
  Stock: number;
  PriceAdjustment: number;
  IsAvailable: boolean;
}

interface SizeSelectorProps {
  sizes: Size[];
  selectedSize: string;
  onSizeSelect: (sizeId: string) => void;
}

export function SizeSelector({
  sizes,
  selectedSize,
  onSizeSelect,
}: SizeSelectorProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => {
          const isAvailable = size.IsAvailable && size.Stock > 0;

          return (
            <motion.button
              key={size.SizeId}
              whileHover={isAvailable ? { scale: 1.05 } : {}}
              whileTap={isAvailable ? { scale: 0.95 } : {}}
              onClick={() => isAvailable && onSizeSelect(size.SizeId)}
              disabled={!isAvailable}
              className={`
                relative group px-4 py-2 rounded-lg font-medium transition-all
                ${
                  selectedSize === size.SizeId
                    ? "bg-gray-900 text-white ring-2 ring-gray-900"
                    : isAvailable
                    ? "bg-white hover:border-gray-900 border border-gray-200"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }
              `}
            >
              <span className="relative z-10">{size.Size}</span>

              {/* Price Adjustment */}
              {size.PriceAdjustment > 0 && (
                <span className="absolute -top-2 -right-2 bg-indigo-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                  +${size.PriceAdjustment}
                </span>
              )}

              {/* Stock Status */}
              {!isAvailable && (
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-max px-2 py-1 text-xs bg-gray-900 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  Out of Stock
                </span>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
