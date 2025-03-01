import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown, Loader2 } from "lucide-react";
import { fetchCategories } from "@/lib/FE/api";
import { productTypes } from "@/lib/enum";

const Step1 = ({
  register,
  errors,
  mutation,
  handleSubmit,
  onSubmit1,
  initialValues,
  setValue,
  selectedProductType,
  setSelectedProductType,
}: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [productTypeIsOpen, setProductTypeIsOpen] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState<string>(
    initialValues?.Category?.CategoryId || ""
  );

  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  useEffect(() => {
    setValue("CategoryId", selectedCategory);
    setValue("ProductType", selectedProductType);
  }, [selectedCategory, selectedProductType]);

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setIsOpen(false);
  };
  const handleProductSelect = (productType: string) => {
    setSelectedProductType(productType);
    setProductTypeIsOpen(false);
  };
  return (
    <motion.div
      key="step1"
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -20, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-6 sm:p-8 space-y-6"
    >
      {/* Name Input */}
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

      {/* Description Input */}
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

      {/* Base Price Input */}
      <div className="grid gap-6 ">
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

      {/* Category Dropdown */}
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
                  ? categories?.data?.find(
                      (c: any) => c.CategoryId === selectedCategory
                    )?.Name || "Select a category"
                  : "Select a category"}
              </span>
            )}
            <ChevronDown className="h-4 w-4" />
          </button>

          <input
            type="hidden"
            {...register("CategoryId")}
            value={selectedCategory}
          />

          {isOpen && !isLoading && categories && (
            <ul className="absolute z-10 w-full mt-1 border rounded bg-white dark:bg-slate-900 shadow-lg max-h-60 overflow-y-auto">
              {categories?.data?.map((category: any) => (
                <li
                  key={category.CategoryId}
                  onClick={() => {
                    handleCategorySelect(category.CategoryId);
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

      <div className="relative">
        <label className="block text-sm font-medium mb-2">Product Type</label>
        <div className="relative">
          <button
            type="button"
            onClick={() => setProductTypeIsOpen(!productTypeIsOpen)}
            className="w-full flex items-center justify-between px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-slate-950 transition-all"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading Product Types...
              </div>
            ) : (
              <span>
                {selectedProductType
                  ? productTypes?.find((c: any) => c === selectedProductType) ||
                    "Select a Product Type"
                  : "Select a Product Type"}
              </span>
            )}
            <ChevronDown className="h-4 w-4" />
          </button>

          <input
            type="hidden"
            {...register("ProductType")}
            value={selectedProductType}
          />

          {productTypeIsOpen && !isLoading && categories && (
            <ul className="absolute z-10 w-full mt-1 border rounded bg-white dark:bg-slate-900 shadow-lg max-h-60 overflow-y-auto">
              {productTypes?.map((product: any, index: number) => (
                <li
                  key={index}
                  onClick={() => {
                    handleProductSelect(product);
                  }}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 cursor-pointer"
                >
                  {product}
                </li>
              ))}
            </ul>
          )}
        </div>
        {errors.ProductType && (
          <p className="text-red-500 text-sm mt-1">
            {errors.ProductType.message}
          </p>
        )}
      </div>

      {/* Continue Button */}
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
