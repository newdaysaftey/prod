"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Package } from "lucide-react";
import { getProducts } from "@/lib/FE/api";
import { ProductGrid } from "./ProductGrid";
import type { Product } from "@/lib/FE/types/product";

interface ProductListProps {
  initialPage?: number;
  pageSize?: number;
  tags?: string;
  categoryId?: string;
}

export function ProductList({
  initialPage = 1,
  pageSize = 12,
  tags,
  categoryId,
}: ProductListProps) {
  const [page, setPage] = useState(initialPage);
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ["products", page, tags, categoryId],
    queryFn: () => getProducts(pageSize, page, tags, categoryId),
    // Replace onSuccess with a useEffect hook
  });

  useEffect(() => {
    if (data) {
      const newProducts = data.data.data.flatMap(
        (category: any) => category.Products
      );
      setAllProducts((prev) => [...prev, ...newProducts]);
    }
  }, [data]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Error: {(error as Error).message}
      </div>
    );
  }

  const hasMore = data?.data?.metadata?.hasNextPage || false;

  const handleLoadMore = () => {
    if (hasMore && !isFetching) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <div className="">
      <div className="max-w-7xl sm:w-[90%] mx-auto">
        {isLoading && !allProducts.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden"
              >
                <div className="aspect-square bg-gray-200 dark:bg-gray-700 animate-pulse" />
                <div className="p-4 space-y-3">
                  <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                  <div className="h-4 w-1/2 bg-gray-100 dark:bg-gray-800 rounded animate-pulse" />
                  <div className="h-4 w-1/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <ProductGrid
            products={allProducts}
            onLoadMore={handleLoadMore}
            hasMore={hasMore}
            isLoading={isFetching}
          />
        )}
      </div>
    </div>
  );
}
