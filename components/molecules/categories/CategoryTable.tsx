"use client";

import { motion } from "framer-motion";
import { Edit, Eye } from "lucide-react";
import Link from "next/link";

interface Category {
  id: string;
  Name: string;
  createdAt: string;
  updatedAt: string;
}

interface CategoryTableProps {
  categories: Category[];
}

export function CategoryTable({ categories }: CategoryTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-slate-50 dark:bg-slate-800/50">
          <tr>
            <th className="text-left px-6 py-4 text-sm font-medium text-slate-500">
              Category Name
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
          {categories.map((category) => (
            <motion.tr
              key={category.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
              className="group"
            >
              <td className="px-6 py-4">
                <span className="font-medium">{category.Name}</span>
              </td>
              <td className="px-6 py-4">
                {/* <div className="flex items-center justify-end gap-3">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Link
                      href={`/admin/categories/${category.id}`}
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
                      href={`/admin/categories/${category.id}/edit`}
                      className="p-2 text-slate-400 hover:text-indigo-500 transition-colors"
                    >
                      <Edit className="h-5 w-5" />
                    </Link>
                  </motion.div>
                </div> */}
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
