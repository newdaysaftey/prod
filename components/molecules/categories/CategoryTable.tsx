"use client";

import { motion } from "framer-motion";
import { Trash2, X, AlertTriangle, GripVertical } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { deleteCategory, updateCategorySequence } from "@/lib/FE/api";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Category {
  CategoryId: string;
  Name: string;
  createdAt: string;
  updatedAt: string;
}

interface CategoryTableProps {
  categories: Category[];
}

interface SortableRowProps {
  category: Category;
  onDeleteClick: (category: Category) => void;
}

function SortableRow({ category, onDeleteClick }: SortableRowProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: category.CategoryId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1 : 0,
    position: isDragging ? "relative" : "static",
    backgroundColor: isDragging ? "var(--bg-dragging)" : undefined,
  } as React.CSSProperties;

  return (
    <motion.tr
      ref={setNodeRef}
      style={style}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
      className={`group ${isDragging ? "shadow-lg" : ""}`}
    >
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <button
            {...attributes}
            {...listeners}
            className="touch-none p-1 text-slate-400 hover:text-slate-600 cursor-grab active:cursor-grabbing"
          >
            <GripVertical className="h-5 w-5" />
          </button>
          <span className="font-medium">{category.Name}</span>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center justify-end gap-3">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <button
              onClick={() => onDeleteClick(category)}
              className="p-2 text-slate-400 hover:text-red-500 transition-colors"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </motion.div>
        </div>
      </td>
    </motion.tr>
  );
}

export function CategoryTable({
  categories: initialCategories,
}: CategoryTableProps) {
  const [categories, setCategories] = useState(initialCategories || []);
  useEffect(() => {
    setCategories(initialCategories);
  }, initialCategories);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(
    null
  );
  const queryClient = useQueryClient();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

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

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = categories.findIndex(
      (cat) => cat.CategoryId === active.id
    );
    const newIndex = categories.findIndex((cat) => cat.CategoryId === over.id);

    const newOrder = arrayMove(categories, oldIndex, newIndex);
    setCategories(newOrder);

    try {
      const updateData = {
        categories: newOrder.map((cat: { CategoryId: any }, index: number) => ({
          CategoryId: cat.CategoryId,
          sequence: index + 1,
        })),
      };

      await updateCategorySequence(updateData);
      toast.success("Category order updated successfully");
      await queryClient.invalidateQueries({ queryKey: ["categories"] });
    } catch (error) {
      toast.error("Failed to update category order");
      setCategories(initialCategories); // Revert to original order on error
    }
  };

  return (
    <>
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
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={categories?.map((cat) => cat.CategoryId)}
              strategy={verticalListSortingStrategy}
            >
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {categories?.map((category) => (
                  <SortableRow
                    key={category.CategoryId}
                    category={category}
                    onDeleteClick={(cat) => {
                      setCategoryToDelete(cat);
                      setShowDeleteModal(true);
                    }}
                  />
                ))}
              </tbody>
            </SortableContext>
          </DndContext>
        </table>
      </div>
    </>
  );
}
