"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Tag } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getAdminProducts, linkProductsToTag } from "@/lib/FE/api";
import { ProductSelector } from "@/components/molecules/tags/ProductSelector";

export default function LinkProductsToTagPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [error, setError] = useState("");

  const { data: productsData, isLoading: isLoadingProducts } = useQuery({
    queryKey: ["products"],
    queryFn: () => getAdminProducts(100, 1),
  });

  const linkMutation = useMutation({
    mutationFn: () => linkProductsToTag(params.id, selectedProducts),
    onSuccess: () => {
      router.push("/admin/tags");
    },
    onError: (err) => {
      setError(err instanceof Error ? err.message : "Failed to link products");
    },
  });

  if (isLoadingProducts) return <div>Loading products...</div>;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    linkMutation.mutate();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-6 sm:p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <Tag className="h-8 w-8 text-indigo-500" />
            <h1 className="text-3xl font-bold">Link Products to Tag</h1>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <ProductSelector
                products={
                  productsData?.data?.data?.flatMap((e: any) => e.Products) ||
                  []
                }
                selectedProducts={selectedProducts}
                onSelectionChange={setSelectedProducts}
              />
            </div>

            {error && <div className="mb-6 text-red-500 text-sm">{error}</div>}

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-3 rounded-lg font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={
                  linkMutation.isPending || selectedProducts.length === 0
                }
                className="px-6 py-3 rounded-lg font-medium bg-indigo-500 text-white hover:bg-indigo-600 transition-colors disabled:opacity-50"
              >
                {linkMutation.isPending ? "Linking..." : "Link Products"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
