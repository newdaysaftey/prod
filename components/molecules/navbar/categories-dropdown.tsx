"use client";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/lib/FE/api";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

interface CategoriesDropdownProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function CategoriesDropdown({
  isOpen,
  onToggle,
}: CategoriesDropdownProps) {
  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  return (
    <div className="hidden lg:relative lg:flex lg:items-center mr-4">
      <button
        onClick={onToggle}
        className="flex items-center space-x-1 px-4 py-2 hover:bg-background-700"
      >
        <span>Categories</span>
        <ChevronDown className="h-4 w-4" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 mt-1 w-48 rounded-md bg-white py-2 shadow-lg"
          >
          <div className="flex flex-col items-start">
            {isLoading ? (
              <div className="flex justify-center py-4">
                <LoadingSpinner />
              </div>
            ) : (
              
              
              categories?.data?.map((category: any) => (
                <button
                onClick={() => {
                  onToggle();
                }}
                >
                  <Link
                    key={category.Name}
                    href={"/products/?category=" + category.CategoryId}
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                    {category.Name}
                  </Link>
                </button>
              ))
            )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
