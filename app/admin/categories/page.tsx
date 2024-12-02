"use client";

import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getCategories } from "@/lib/FE/api";
import { CategoryHeader } from "@/components/molecules/categories/CategoryHeader";
import { SearchCategories } from "@/components/molecules/categories/SearchCategories";
import { CategoryTable } from "@/components/molecules/categories/CategoryTable";

export default function CategoriesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading, error } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  if (isLoading)
    return (
      <p className="min-h-screen bg-gradient-to-br max-w-7xl mx-auto">
        Loading...
      </p>
    );
  if (error) return <p>Error: {(error as Error).message}</p>;

  const filteredCategories = data?.data?.filter((category: any) =>
    category.Name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br p-4 sm:p-8">
      <div className="w-[90%] mx-auto sm:w-[100%]">
        <CategoryHeader />

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl overflow-hidden"
        >
          <SearchCategories onSearch={setSearchQuery} />
          <CategoryTable categories={filteredCategories || []} />
        </motion.div>
      </div>
    </div>
  );
}
