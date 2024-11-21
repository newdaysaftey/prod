"use client";
import { motion } from "framer-motion";
import { Package, Plus, Search, Eye, Edit } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { getAdminProducts } from "@/lib/FE/api";
import Link from "next/link";

export function ProductList() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data, isLoading, error } = useQuery({
    queryKey: ["products", page, limit],
    queryFn: () => getAdminProducts(limit, page, ""),
  });

  if (isLoading)
    return (
      <p className="min-h-screen bg-gradient-to-br max-w-7xl mx-auto">
        Loading...
      </p>
    );
  if (error) return <p>Error: {error.message}</p>;

  const viewData = data?.data?.data.flatMap((e: any) => e.Products);

  return (
    <div className="min-h-screen bg-gradient-to-br p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-6 sm:p-8 mb-8"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
                <Package className="h-8 w-8 text-indigo-500" />
                Products
              </h1>
              <p className="text-slate-500 dark:text-slate-400">
                Manage your product inventory
              </p>
            </div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/admin/products/new"
                className="inline-flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                <Plus className="h-5 w-5" />
                Add Product
              </Link>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="p-6 border-b border-slate-200 dark:border-slate-700">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-slate-950 transition-all"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 dark:bg-slate-800/50">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-medium text-slate-500">
                    Product Name
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-slate-500">
                    Price
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-slate-500">
                    Stock
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-slate-500">
                    Variants
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-slate-500">
                    Status
                  </th>
                  <th className="text-right px-6 py-4 text-sm font-medium text-slate-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {viewData.map((product: any) => (
                  <motion.tr
                    key={product.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                    className="group"
                  >
                    <td className="px-6 py-4">
                      <span className="font-medium">{product.Name}</span>
                    </td>
                    <td className="px-6 py-4">${product.Base_price}</td>
                    <td className="px-6 py-4"> </td>
                    <td className="px-6 py-4">{product.Colors.length}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          product.status === "In Stock"
                            ? "bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-400"
                            : "bg-yellow-50 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400"
                        }`}
                      >
                        {product.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-3">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Link
                            href={`/admin/products/${product.ProductId}`}
                            className="p-2 text-slate-400 hover:text-indigo-500 transition-colors"
                          >
                            <Eye className="h-5 w-5" />
                          </Link>
                        </motion.div>
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Link
                            href={`/admin/products/${product.ProductId}/edit`}
                            className="p-2 text-slate-400 hover:text-indigo-500 transition-colors"
                          >
                            <Edit className="h-5 w-5" />
                          </Link>
                        </motion.div>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
