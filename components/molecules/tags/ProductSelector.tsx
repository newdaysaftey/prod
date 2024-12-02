"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

interface Product {
  ProductId: string;
  Name: string;
  Base_price: number;
}

interface ProductSelectorProps {
  products: Product[];
  selectedProducts: string[];
  onSelectionChange: (productIds: string[]) => void;
}

export function ProductSelector({
  products,
  selectedProducts,
  onSelectionChange,
}: ProductSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter((product) =>
    product.Name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCheckboxChange = (productId: string) => {
    const newSelection = selectedProducts.includes(productId)
      ? selectedProducts.filter((id) => id !== productId)
      : [...selectedProducts, productId];
    onSelectionChange(newSelection);
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-slate-950 transition-all"
        />
      </div>

      <div className="max-h-96 overflow-y-auto border border-slate-200 dark:border-slate-700 rounded-lg">
        {filteredProducts.map((product) => (
          <motion.div
            key={product.ProductId}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center space-x-3 p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700 last:border-b-0"
          >
            <input
              type="checkbox"
              id={product.ProductId}
              checked={selectedProducts.includes(product.ProductId)}
              onChange={() => handleCheckboxChange(product.ProductId)}
              className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label
              htmlFor={product.ProductId}
              className="flex-1 flex items-center justify-between cursor-pointer"
            >
              <span className="font-medium">{product.Name}</span>
              <span className="text-slate-500">
                ${product.Base_price.toFixed(2)}
              </span>
            </label>
          </motion.div>
        ))}
      </div>

      <div className="text-sm text-slate-500">
        {selectedProducts.length} products selected
      </div>
    </div>
  );
}