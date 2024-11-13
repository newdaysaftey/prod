"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Package } from "lucide-react";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Step1 from "./step1";
import Step2 from "./step2";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// Zod schema for product form validation
const productSchema = z.object({
  Name: z.string().min(1, "Product name is required").optional(),
  Description: z.string().min(1, "Description is required").optional(),
  Base_price: z
    .number()
    .min(0.01, "Base price must be greater than 0")
    .optional(),
  Available: z.number().min(0, "Quantity must be non-negative").optional(),
  Tags: z.string().optional(),
  AverageRating: z.number().min(0).max(5).optional(),
  CategoryId: z.string().uuid("Invalid category ID"),
  ProductId: z.string().optional().default(""),
  step: z.number().optional(),
  discount: z.number().min(0).max(100).optional(),
});

export type ProductFormData = z.infer<typeof productSchema>;

const saveProduct = async (data: ProductFormData) => {
  console.log(data);
  const response = await fetch("http://localhost:3000/api/product/", {
    method: "POST",
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to save product");
  console.log(response);
  return await response.json();
};

export function ProductForm({ initialValues }: any) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [colorVariants, setColorVariants] = useState([0]);
  const [productId, setProductId] = useState("");
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
      ProductId: initialValues?.ProductId || "",
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
        if (data.error) {
          toast.error(`something went wrong ${data.message}`);
        } else {
          setProductId(data.data.ProductId);
        }
      } else {
        console.log("Product saved successfully:", data);
        // Handle success (e.g., show notification, redirect)
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onSubmit1 = (data: ProductFormData) => {
    mutation.mutate({
      ...data,
      step,
    });
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

        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <AnimatePresence mode="wait">
            {step === 1 ? (
              <Step1
                register={register}
                errors={errors}
                mutation={mutation}
                handleSubmit={handleSubmit}
                onSubmit1={onSubmit1}
                initialValues={initialValues || {}}
              ></Step1>
            ) : (
              <Step2
                productId={productId}
                initialValues={initialValues || {}}
                router={router}
              ></Step2>
            )}
          </AnimatePresence>
        </form>
      </div>
    </div>
  );
}
