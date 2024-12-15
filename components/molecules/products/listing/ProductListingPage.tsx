"use client";

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '@/lib/FE/api';
import { CategorySidebar } from './CategorySidebar';
import { ProductListingContent } from './ProductListingContent';
import { ProductListingSkeleton } from './ProductListingSkeleton';

export function ProductListingPage() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const limit = 12;

  const { data, isLoading, error } = useQuery({
    queryKey: ['products', page, limit, selectedCategoryId, searchQuery],
    queryFn: () => getProducts(limit, page, undefined, selectedCategoryId || undefined),
  });

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Error: {(error as Error).message}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Left Panel - Categories */}
          <div className="w-64 flex-shrink-0">
            <CategorySidebar 
              selectedCategoryId={selectedCategoryId}
              onCategorySelect={setSelectedCategoryId}
            />
          </div>

          {/* Right Panel - Products */}
          <div className="flex-1">
            {isLoading ? (
              <ProductListingSkeleton />
            ) : (
              <ProductListingContent
                data={data?.data}
                onSearch={setSearchQuery}
                searchQuery={searchQuery}
                page={page}
                onPageChange={setPage}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}