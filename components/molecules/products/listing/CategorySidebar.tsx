"use client";

import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { FolderTree } from "lucide-react";
import { getCategories } from "@/lib/FE/api";

interface CategorySidebarProps {
  selectedCategoryId: string | null;
  onCategorySelect: (categoryId: string | null) => void;
}

export function CategorySidebar({
  selectedCategoryId,
  onCategorySelect,
}: CategorySidebarProps) {
  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 space-y-4">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        {Array(5).map((_, i) => (
          <div
            key={i}
            className="h-10 bg-gray-100 dark:bg-gray-700 rounded animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
        <FolderTree className="w-5 h-5 text-indigo-500" />
        Categories
      </h2>

      <div className="space-y-2">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onCategorySelect(null)}
          className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
            selectedCategoryId === null
              ? "bg-indigo-50 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400"
              : "hover:bg-gray-50 dark:hover:bg-gray-700/50"
          }`}
        >
          All Products
        </motion.button>

        {data?.data?.map((category: any) => (
          <motion.button
            key={category.CategoryId}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onCategorySelect(category.CategoryId)}
            className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
              selectedCategoryId === category.CategoryId
                ? "bg-indigo-50 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400"
                : "hover:bg-gray-50 dark:hover:bg-gray-700/50"
            }`}
          >
            {category.Name}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
