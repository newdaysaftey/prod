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
          <div className="flex justify-center py-12">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full"
            />
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
