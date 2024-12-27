"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Package } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Step1 from "./step1";
import Step2 from "./step2";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { saveProduct } from "@/lib/FE/api";
import { productSchemaStep1, ProductFormDataStep1 } from "@/lib/FE/types/step1";

export function ProductForm({ initialValues }: any) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [colorVariants, setColorVariants] = useState([0]);
  console.log(initialValues?.ProductId);
  const [productId, setProductId] = useState(initialValues?.ProductId || "");
  // Form setup with react-hook-form and zod validation
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm<ProductFormDataStep1>({
    resolver: zodResolver(productSchemaStep1),
    defaultValues: {
      step: 1,
      ProductId: initialValues?.ProductId || "",
    },
    mode: "onBlur",
  });

  // Mutation for saving product
  const mutation = useMutation({
    mutationFn: saveProduct,
    onSuccess: (data) => {
      if (step === 1) {
        if (data.error) {
          toast.error(`something went wrong ${data.message}`);
        } else {
          setProductId(data.data.ProductId);
          setStep(2);
        }
      } else {
        // Handle success (e.g., show notification, redirect)
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onSubmit1 = (data: ProductFormDataStep1) => {
    console.log(data);
    mutation.mutate({
      ...data,
      step,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4 sm:p-0">
      <div className="w-[90%] mx-auto">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-6 sm:p-6 mb-8"
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
                setValue={setValue}
              ></Step1>
            ) : (
              <Step2
                productId={productId}
                initialValues={initialValues || {}}
                router={router}
                saveProduct={saveProduct}
              ></Step2>
            )}
          </AnimatePresence>
        </form>
      </div>
    </div>
  );
}
