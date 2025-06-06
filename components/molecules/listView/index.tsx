"use client";
import { motion } from "framer-motion";
import {
  Package,
  Plus,
  Search,
  Eye,
  Edit,
  Trash2,
  X,
  AlertTriangle,
} from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { getAdminProducts, deleteProduct } from "@/lib/FE/api";
import Link from "next/link";
import { toast } from "sonner";

export function ProductList() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(1000);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState<any>(null);
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["products", page, limit],
    queryFn: () => getAdminProducts(limit, page, ""),
  });

  const handleDelete = async (product: any) => {
    try {
      await deleteProduct(product.ProductId);
      await queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product deleted successfully");
      setShowDeleteModal(false);
    } catch (error) {
      toast.error("Failed to delete product");
    }
  };
  const [searchQuery, setSearchQuery] = useState("");
  const [viewData, setProducts] = useState([]);

  useMemo(() => {
    // console.log("ehllo wold");
    const viewData = data?.data?.data?.flatMap((e: any) => e.Products);
    let x =
      viewData?.filter((category: { Name: string }) =>
        category.Name.toLowerCase().includes(searchQuery.toLowerCase())
      ) || [];
    setProducts(x);
  }, [searchQuery, data]);

  if (isLoading)
    return (
      <p className="min-h-screen bg-gradient-to-br max-w-7xl mr-2">
        Loading...
      </p>
    );
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white dark:bg-slate-900 rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                <h2 className="text-lg font-semibold">Delete Product</h2>
              </div>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="mb-6">
              Are you sure you want to delete {productToDelete?.Name}? This
              action cannot be undone.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => productToDelete && handleDelete(productToDelete)}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-gradient-to-br p-4 sm:p-0">
        <div className="sm:w-[100%] w-[90%] mx-auto ">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-6  mb-8"
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
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
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
            className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl overflow-hidden sm:w-[95%] mx-auto"
          >
            <div className="p-6 border-b border-slate-200 dark:border-slate-700">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-slate-950 transition-all"
                />
              </div>
            </div>

            {/* Table View for Larger Screens */}
            <div className="sm:hidden  overflow-x-auto">
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
                  {viewData?.map((product: any) => (
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
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <button
                              onClick={() => {
                                setProductToDelete(product);
                                setShowDeleteModal(true);
                              }}
                              className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </motion.div>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Card View for Mobile */}
            <div className="sm:block hidden">
              {viewData?.map((product: any) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white dark:bg-slate-950 shadow rounded-lg mb-4 p-4"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="font-medium">{product.Name}</h2>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        product.status === "In Stock"
                          ? "bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-400"
                          : "bg-yellow-50 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400"
                      }`}
                    >
                      {product.status}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 mb-3">
                    Price: ${product.Base_price}
                  </p>
                  <p className="text-sm text-slate-500 mb-3">
                    Variants: {product.Colors.length}
                  </p>
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/admin/products/${product.ProductId}`}
                      className="p-2 text-indigo-500 hover:text-indigo-600 transition-colors"
                    >
                      <Eye className="h-5 w-5" />
                    </Link>
                    <Link
                      href={`/admin/products/${product.ProductId}/edit`}
                      className="p-2 text-indigo-500 hover:text-indigo-600 transition-colors"
                    >
                      <Edit className="h-5 w-5" />
                    </Link>
                    <button
                      onClick={() => {
                        setProductToDelete(product);
                        setShowDeleteModal(true);
                      }}
                      className="p-2 text-red-500 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
