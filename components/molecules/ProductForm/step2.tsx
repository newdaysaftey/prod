"use client";
import { useEffect, useState } from "react";
import ColorVariant from "./ColorVariant";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Plus, Package, ArrowLeft, Save } from "lucide-react";

// Zod schema for product form validation
const productSchema = z.object({
  ProductId: z.string(),
  step: z.number().optional(),
  Colors: z
    .array(
      z.object({
        ColorId: z.string().default(""),
        ColorName: z.string().min(1, "Color name is required").optional(),
        ColorCode: z
          .string()
          .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid color code")
          .optional(),
        Images: z.array(z.string().url("Invalid image URL")).optional(),
        Sizes: z.array(
          z
            .object({
              size: z.string().min(1, "Size is required"),
              stock: z.number().min(0, "Stock must be non-negative"),
              sizeId: z.string().default(""),
              isDeleted: z.boolean().optional(),
              priceAdjustment: z
                .number()
                .min(0, "Price adjustment must be non-negative"),
            })
            .optional()
        ),
      })
    )
    .optional(),
});

export type ProductFormData = z.infer<typeof productSchema>;

const saveProduct = async (data: ProductFormData) => {
  const response = await fetch("http://localhost:3000/api/product/", {
    method: "POST",
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to save product");
  return response.json();
};

function Step2({ productId }: { productId: string }) {
  const [colorVariants, setColorVariants] = useState<
    {
      ColorName: string;
      ColorCode: string;
      Images: string[];
      Sizes: {
        size: string;
        sizeId: string;
        stock: number;
        priceAdjustment: number;
        isDeleted: boolean;
      }[];
    }[]
  >([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  });

  const mutation = useMutation({
    mutationFn: saveProduct,
    onSuccess: (data) => {
      console.log("Product saved successfully:", data);
      // Handle success (e.g., show notification, redirect)
    },
  });

  const onSubmit = () => {
    mutation.mutate({ step: 2, ProductId: productId, Colors: colorVariants });
  };

  const addColorVariant = () => {
    setColorVariants((prev) => [
      ...prev,
      {
        ColorName: "",
        ColorId: "",
        ColorCode: "#000000",
        Images: [],
        Sizes: [],
      },
    ]);
  };

  const removeColorVariant = (index: number) => {
    setColorVariants((prev) => prev.filter((_, i) => i !== index));
  };
  useEffect(() => {
    console.log(colorVariants);
  }, [colorVariants]);

  return (
    <form>
      {colorVariants.map((variant, index) => (
        <ColorVariant
          key={index}
          variant={variant}
          onRemove={() => removeColorVariant(index)}
          register={register}
          errors={errors}
        />
      ))}
      <br />
      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        type="button"
        onClick={addColorVariant}
        className="w-full py-4 border-2 border-dashed border-slate-700 dark:border-slate-700 rounded-xl hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors flex items-center justify-center gap-2 text-slate-600 dark:text-slate-400 hover:text-indigo-500 dark:hover:text-indigo-400"
      >
        <Plus className="h-5 w-5" />
        Add Color Variant
      </motion.button>
      <br />
      <div className="flex gap-4">
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          type="button"
          className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
          disabled={mutation.isPending}
          onClick={() => {
            onSubmit();
          }}
        >
          <Save className="h-4 w-4" />
          {mutation.isPending ? "Saving..." : "Save Product"}
        </motion.button>
      </div>
    </form>
  );
}

export default Step2;
