"use client";

import { motion } from "framer-motion";
import { FolderTree, Plus } from "lucide-react";
import Link from "next/link";

export function CategoryHeader() {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-6 sm:p-8 mb-8"
    >
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <FolderTree className="h-8 w-8 text-indigo-500" />
            Categories
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Manage your product categories
          </p>
        </div>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Link
            href="/admin/categories/new"
            className="inline-flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            <Plus className="h-5 w-5" />
            Add Category
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
