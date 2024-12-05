"use client";

import { motion } from "framer-motion";
import { ProductCard } from "./ProductCard";
import type { Product } from "@/lib/FE/types/product";

interface ProductGridProps {
  products: Product[];
  onLoadMore: () => void;
  hasMore: boolean;
  isLoading: boolean;
}

export function ProductGrid({
  products,
  onLoadMore,
  hasMore,
  isLoading,
}: ProductGridProps) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.ProductId} product={product} />
        ))}
      </div>

      {/* See More Button */}
      {hasMore && (
        <div className="flex justify-center pt-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onLoadMore}
            disabled={isLoading}
            className="px-6 py-3 bg-indigo-500 text-white rounded-lg font-medium hover:bg-indigo-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
                Loading...
              </>
            ) : (
              "See More Products"
            )}
          </motion.button>
        </div>
      )}
    </div>
  );
}
