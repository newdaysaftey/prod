"use client";

import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { getCategories } from "@/lib/FE/api";
import { CategoryHeader } from "@/components/molecules/categories/CategoryHeader";
import { SearchCategories } from "@/components/molecules/categories/SearchCategories";
import { CategoryTable } from "@/components/molecules/categories/CategoryTable";

export default function CategoriesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCategories, setFilteredCategories] = useState([]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  useMemo(() => {
    let x =
      data?.data?.filter((category: { Name: string }) =>
        category.Name.toLowerCase().includes(searchQuery.toLowerCase())
      ) || [];
    setFilteredCategories(x);
  }, [searchQuery, data]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <p>Error: {error instanceof Error ? error.message : "Unknown error"}</p>
    );
  }

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
          <CategoryTable categories={filteredCategories} />
        </motion.div>
      </div>
    </div>
  );
}
