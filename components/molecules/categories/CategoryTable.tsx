"use client";

import { motion } from "framer-motion";
import { Edit, Eye, Trash2, X, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { deleteCategory } from "@/lib/FE/api";
import { useQueryClient } from "@tanstack/react-query";

interface Category {
  CategoryId: string;
  Name: string;
  createdAt: string;
  updatedAt: string;
}

interface CategoryTableProps {
  categories: Category[];
}

export function CategoryTable({ categories }: CategoryTableProps) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(
    null
  );
  const queryClient = useQueryClient();

  const handleDelete = async (category: Category) => {
    try {
      await deleteCategory(category.CategoryId);
      await queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Category deleted successfully");
      setShowDeleteModal(false);
    } catch (error) {
      toast.error("Failed to delete category");
    }
  };

  return (
    <>
      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white dark:bg-slate-900 rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                <h2 className="text-lg font-semibold">Delete Category</h2>
              </div>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="mb-6">
              Are you sure you want to delete {categoryToDelete?.Name}? This
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
                onClick={() =>
                  categoryToDelete && handleDelete(categoryToDelete)
                }
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 dark:bg-slate-800/50">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-medium text-slate-500">
                Category Name
              </th>
              <th className="text-right px-6 py-4 text-sm font-medium text-slate-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
            {categories.map((category) => (
              <motion.tr
                key={category.CategoryId}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                className="group"
              >
                <td className="px-6 py-4">
                  <span className="font-medium">{category.Name}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-3">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <button
                        onClick={() => {
                          setCategoryToDelete(category);
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
    </>
  );
}
