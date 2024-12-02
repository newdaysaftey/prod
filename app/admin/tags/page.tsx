"use client";

import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getTags } from "@/lib/FE/api";
import { TagHeader } from "@/components/molecules/tags/TagHeader";
import { SearchTags } from "@/components/molecules/tags/SearchTags";
import { TagTable } from "@/components/molecules/tags/TagTable";

export default function TagsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading, error } = useQuery({
    queryKey: ["tags"],
    queryFn: getTags,
  });

  if (isLoading)
    return (
      <p className="min-h-screen bg-gradient-to-br max-w-7xl mx-auto">
        Loading...
      </p>
    );
  if (error) return <p>Error: {(error as Error).message}</p>;

  const filteredTags = data?.data?.filter((tag: any) =>
    tag.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br p-4 sm:p-8">
      <div className="w-[90%] mx-auto sm:w-[100%]">
        <TagHeader />

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl overflow-hidden"
        >
          <SearchTags onSearch={setSearchQuery} />
          <TagTable tags={filteredTags || []} />
        </motion.div>
      </div>
    </div>
  );
}
