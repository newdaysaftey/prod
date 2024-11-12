"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Package, ArrowLeft, Save } from "lucide-react";
import { ColorVariant } from "./ColorVariant";
import { z } from "zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Zod schema for product form validation
const productSchema = z.object({
  Name: z.string().min(1, "Product name is required"),
  Description: z.string().min(1, "Description is required"),
  Base_price: z.number().min(0.01, "Base price must be greater than 0"),
  Available: z.number().min(0, "Quantity must be non-negative").optional(),
  Tags: z.string().optional(),
  AverageRating: z.number().min(0).max(5).optional(),
  CategoryId: z.string().uuid("Invalid category ID"),
  ProductId: z.string().optional().default(""),
  step: z.number().optional(),
  discount: z.number().min(0).max(100).optional(),
});

type ProductFormData = z.infer<typeof productSchema>;

const saveProduct = async (data: ProductFormData) => {
  console.log(data);
  const response = await fetch("http://localhost:3000/api/product/", {
    method: "POST",
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to save product");
  return response.json();
};

export function ProductForm({ productId }: { productId?: string }) {
  const [step, setStep] = useState(1);
  const [colorVariants, setColorVariants] = useState([0]);

  // Form setup with react-hook-form and zod validation
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      step: 1,
      AverageRating: 0,
      discount: 0,
    },
    mode: "all",
  });

  // Mutation for saving product
  const mutation = useMutation({
    mutationFn: saveProduct,
    onSuccess: (data) => {
      if (step === 1) {
        setStep(2);
        console.log(data);
      } else {
        console.log("Product saved successfully:", data);
        // Handle success (e.g., show notification, redirect)
      }
    },
  });

  const onSubmit1 = (data: ProductFormData) => {
    mutation.mutate({
      ...data,
      step,
    });
  };

  const addColorVariant = () => {
    setColorVariants((prev) => [...prev, prev.length]);
  };

  const removeColorVariant = (index: number) => {
    setColorVariants((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-6 sm:p-8 mb-8"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
                <Package className="h-8 w-8 text-indigo-500" />
                {productId ? "Edit Product" : "Add New Product"}
              </h1>
              <p className="text-slate-500 dark:text-slate-400">
                Complete the form below to {productId ? "update" : "add"} a
                product to your store
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex gap-2 bg-slate-100 dark:bg-slate-800 p-2 rounded-lg">
                <div
                  className={`h-2 w-16 rounded-full transition-colors ${
                    step === 1
                      ? "bg-indigo-500"
                      : "bg-slate-300 dark:bg-slate-600"
                  }`}
                />
                <div
                  className={`h-2 w-16 rounded-full transition-colors ${
                    step === 2
                      ? "bg-indigo-500"
                      : "bg-slate-300 dark:bg-slate-600"
                  }`}
                />
              </div>
              <span className="text-sm font-medium">Step {step} of 2</span>
            </div>
          </div>
        </motion.div>

        <form>
          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div
                key="step1"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-6 sm:p-8 space-y-6"
              >
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Product Name
                  </label>
                  <input
                    {...register("Name")}
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-slate-950 transition-all"
                    placeholder="Enter product name"
                  />
                  {errors.Name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.Name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Description
                  </label>
                  <textarea
                    {...register("Description")}
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-slate-950 transition-all min-h-[120px]"
                    placeholder="Enter product description"
                  />
                  {errors.Description && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.Description.message}
                    </p>
                  )}
                </div>

                <div className="grid gap-6 sm:grid-cols-3">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Base Price
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      {...register("Base_price", { valueAsNumber: true })}
                      className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-slate-950 transition-all"
                      placeholder="0.00"
                    />
                    {errors.Base_price && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.Base_price.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Discount (%)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      {...register("discount", { valueAsNumber: true })}
                      className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-slate-950 transition-all"
                      placeholder="0"
                    />
                    {errors.discount && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.discount.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Initial Quantity
                    </label>
                    <input
                      type="number"
                      min="0"
                      {...register("Available", { valueAsNumber: true })}
                      className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-slate-950 transition-all"
                      placeholder="0"
                    />
                    {errors.Available && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.Available.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Category ID
                  </label>
                  <input
                    {...register("CategoryId")}
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-slate-950 transition-all"
                    placeholder="Enter category ID"
                  />
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
                  {mutation.isPending
                    ? "Saving..."
                    : "Continue to Color Variants"}
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    →
                  </motion.span>
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                key="step2"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 20, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {colorVariants.map((_, index) => (
                  <ColorVariant
                    key={index}
                    onRemove={() => removeColorVariant(index)}
                  />
                ))}

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="button"
                  onClick={addColorVariant}
                  className="w-full py-4 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors flex items-center justify-center gap-2 text-slate-600 dark:text-slate-400 hover:text-indigo-500 dark:hover:text-indigo-400"
                >
                  <Plus className="h-5 w-5" />
                  Add Color Variant
                </motion.button>

                <div className="flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 border border-slate-200 dark:border-slate-700 py-3 rounded-lg font-medium transition-colors hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-center gap-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Previous Step
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    type="submit"
                    className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                    disabled={mutation.isPending}
                  >
                    <Save className="h-4 w-4" />
                    {mutation.isPending ? "Saving..." : "Save Product"}
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>
    </div>
  );
}
