"use client";

import { motion } from "framer-motion";
import { Search, Package } from "lucide-react";
import { ProductGrid } from "../ProductGrid";
import { Pagination } from "./Pagination";

interface ProductListingContentProps {
  data: any;
  onSearch: (query: string) => void;
  searchQuery: string;
  page: number;
  onPageChange: (page: number) => void;
}

export function ProductListingContent({
  data,
  onSearch,
  searchQuery,
  page,
  onPageChange,
}: ProductListingContentProps) {
  const products =
    data?.data?.flatMap((category: any) => category.Products) || [];
  const metadata = data?.metadata;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 sm:flex-col sm:justify-start sm:items-start sm:ml-3">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Package className="w-6 h-6 text-indigo-500" />
            Our Products
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            {metadata?.totalItems || 0} products available
          </p>
        </div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative w-72"
        >
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-800"
          />
        </motion.div>
      </div>

      {/* Products Grid */}
      {products.length > 0 ? (
        <ProductGrid
          products={products}
          onLoadMore={() => {}}
          hasMore={false}
          isLoading={false}
        />
      ) : (
        <div className="text-center py-12">
          <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
            No products found
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Try adjusting your search or filter to find what you're looking for.
          </p>
        </div>
      )}

      {/* Pagination */}
      {metadata && (
        <Pagination
          currentPage={metadata.currentPage}
          totalPages={metadata.totalPages}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
}
