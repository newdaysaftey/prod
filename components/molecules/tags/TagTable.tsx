"use client";

import { motion } from "framer-motion";
import {
  Edit,
  Eye,
  Link as LinkIcon,
  Trash2,
  X,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { deleteTag } from "@/lib/FE/api";
import { useQueryClient } from "@tanstack/react-query";

interface Tag {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  products?: any[];
}

interface TagTableProps {
  tags: Tag[];
}

export function TagTable({ tags }: TagTableProps) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [tagToDelete, setTagToDelete] = useState<Tag | null>(null);
  const queryClient = useQueryClient();

  const handleDelete = async (tag: Tag) => {
    try {
      await deleteTag(tag.id);
      await queryClient.invalidateQueries({ queryKey: ["tags"] });
      toast.success("Tag deleted successfully");
      setShowDeleteModal(false);
    } catch (error) {
      toast.error("Failed to delete tag");
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
                <h2 className="text-lg font-semibold">Delete Tag</h2>
              </div>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="mb-6">
              Are you sure you want to delete {tagToDelete?.name}? This action
              cannot be undone.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => tagToDelete && handleDelete(tagToDelete)}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div>
        {/* Table View for Larger Screens */}
        <div className="sm:hidden overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 dark:bg-slate-800/50">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-500">
                  Tag Name
                </th>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-500">
                  Products
                </th>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-500">
                  Created At
                </th>
                <th className="text-right px-6 py-4 text-sm font-medium text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {tags.map((tag) => (
                <motion.tr
                  key={tag.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                  className="group"
                >
                  <td className="px-6 py-4">
                    <span className="font-medium">{tag.name}</span>
                  </td>
                  <td className="px-6 py-4">
                    {tag.products?.length || 0} products
                  </td>
                  <td className="px-6 py-4">
                    {new Date(tag.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-3">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Link
                          href={`/admin/tags/${tag.id}/link`}
                          className="p-2 text-slate-400 hover:text-indigo-500 transition-colors"
                        >
                          <LinkIcon className="h-5 w-5" />
                        </Link>
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <button
                          onClick={() => {
                            setTagToDelete(tag);
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

        {/* Card View for Mobile Screens */}
        <div className="sm:block hidden">
          {tags.map((tag) => (
            <motion.div
              key={tag.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white dark:bg-slate-950 shadow rounded-lg mb-4 p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-medium text-lg">{tag.name}</h2>
                <span className="text-sm text-slate-500">
                  {new Date(tag.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm text-slate-500 mb-3">
                {tag.products?.length || 0} products
              </p>
              <div className="flex items-center gap-3">
                <Link
                  href={`/admin/tags/${tag.id}/link`}
                  className="p-2 text-indigo-500 hover:text-indigo-600 transition-colors"
                >
                  <LinkIcon className="h-5 w-5" />
                </Link>
                <button
                  onClick={() => {
                    setTagToDelete(tag);
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
      </div>
    </>
  );
}
