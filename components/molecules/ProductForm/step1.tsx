import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown, Loader2 } from 'lucide-react';

const fetchCategories = async () => {
  const response = await fetch('http://localhost:3000/api/category/');
  const result = await response.json();
  return result.data;
};
const Step1 = ({
  register,
  errors,
  mutation,
  handleSubmit,
  onSubmit1,
  initialValues,
}: any) => {
    const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(
    initialValues?.Category?.CategoryId || ''
  );

  const { data: categories, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });
  return (
    <motion.div
      key="step1"
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -20, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-6 sm:p-8 space-y-6"
    >
      <div>
        <label className="block text-sm font-medium mb-2">Product Name</label>
        <input
          {...register("Name")}
          className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-slate-950 transition-all"
          placeholder="Enter product name"
          defaultValue={initialValues?.Name}
        />
        {errors.Name && (
          <p className="text-red-500 text-sm mt-1">{errors.Name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Description</label>
        <textarea
          {...register("Description")}
          className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-slate-950 transition-all min-h-[120px]"
          placeholder="Enter product description"
          defaultValue={initialValues?.Description}
        />
        {errors.Description && (
          <p className="text-red-500 text-sm mt-1">
            {errors.Description.message}
          </p>
        )}
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        <div>
          <label className="block text-sm font-medium mb-2">Base Price</label>
          <input
            type="number"
            step="0.01"
            {...register("Base_price", { valueAsNumber: true })}
            className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-slate-950 transition-all"
            placeholder="0.00"
            defaultValue={initialValues.Base_price}
          />
          {errors.Base_price && (
            <p className="text-red-500 text-sm mt-1">
              {errors.Base_price.message}
            </p>
          )}
        </div>

      </div>

      {/* <div>
        <label className="block text-sm font-medium mb-2">Category ID</label>
        <input
          {...register("CategoryId")}
          className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-slate-950 transition-all"
          placeholder="Enter category ID"
          defaultValue={initialValues?.Category?.CategoryId}
        />
        {errors.CategoryId && (
          <p className="text-red-500 text-sm mt-1">
            {errors.CategoryId.message}
          </p>
        )}
      </div> */}
            <div className="relative">
        <label className="block text-sm font-medium mb-2">Category</label>
        <div className="relative">
          <button 
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex items-center justify-between px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-slate-950 transition-all"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading categories...
              </div>
            ) : (
              <span>
                {selectedCategory 
                  ? categories?.find((c:any) => c.CategoryId === selectedCategory)?.Name 
                  : 'Select a category'}
              </span>
            )}
            <ChevronDown className="h-4 w-4" />
          </button>

          <input
            type="hidden"
            {...register("CategoryId")}
                      defaultValue={initialValues?.Category?.CategoryId}

            value={selectedCategory}
          />

          {isOpen && !isLoading && categories && (
            <ul className="absolute z-10 w-full mt-1 border rounded bg-white dark:bg-slate-900 shadow-lg max-h-60 overflow-y-auto">
              {categories.map((category:any) => (
                <li 
                  key={category.CategoryId}
                  onClick={() => {
                    setSelectedCategory(category.CategoryId);
                    setIsOpen(false);
                    console.log(selectedCategory,"from here man")
                  }}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 cursor-pointer"
                >
                  {category.Name}
                </li>
              ))}
            </ul>
          )}
        </div>
        {errors.CategoryId && (
          <p className="text-red-500 text-sm mt-1">
            {errors.CategoryId.message}
          </p>
        )}
      </div>

      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        type="button"
        className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
        disabled={mutation.isPending}
        onClick={() => {
          handleSubmit(onSubmit1)();
        }}
      >
        {mutation.isPending ? "Saving..." : "Continue to Color Variants"}
        <motion.span
          animate={{ x: [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          →
        </motion.span>
      </motion.button>
    </motion.div>
  );
};

export default Step1;
