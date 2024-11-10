import { motion } from "framer-motion";
import { Package, Plus, Search, Eye, Edit } from "lucide-react";
import Link from "next/link";

// Dummy data for demonstration
const products = [
  {
    id: 1,
    name: "Classic White T-Shirt",
    price: 29.99,
    stock: 150,
    variants: 3,
    status: "In Stock",
  },
  {
    id: 2,
    name: "Denim Blue Jeans",
    price: 79.99,
    stock: 80,
    variants: 5,
    status: "Low Stock",
  },
  {
    id: 3,
    name: "Leather Jacket",
    price: 199.99,
    stock: 25,
    variants: 2,
    status: "In Stock",
  },
];

export function ProductList() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4 sm:p-8">
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
                {products.map((product) => (
                  <motion.tr
                    key={product.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                    className="group"
                  >
                    <td className="px-6 py-4">
                      <span className="font-medium">{product.name}</span>
                    </td>
                    <td className="px-6 py-4">${product.price.toFixed(2)}</td>
                    <td className="px-6 py-4">{product.stock}</td>
                    <td className="px-6 py-4">{product.variants}</td>
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
                            href={`/admin/products/${product.id}`}
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
                            href={`/admin/products/${product.id}/edit`}
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
