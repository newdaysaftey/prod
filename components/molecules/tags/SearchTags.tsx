"use client";

import { Search } from "lucide-react";

interface SearchTagsProps {
  onSearch: (query: string) => void;
}

export function SearchTags({ onSearch }: SearchTagsProps) {
  return (
    <div className="p-6 border-b border-slate-200 dark:border-slate-700">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
        <input
          type="text"
          placeholder="Search tags..."
          onChange={(e) => onSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-slate-950 transition-all"
        />
      </div>
    </div>
  );
}