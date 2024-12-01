// "use client";
// import { useEffect, useState } from "react";
// import ColorVariant from "./ColorVariant";
// import { useMutation } from "@tanstack/react-query";
// import { motion } from "framer-motion";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { Plus, Save } from "lucide-react";
// import { toast } from "sonner";
// import { ProductFormDataStep2, productSchemaStep2 } from "@/lib/FE/types/step2";
// import { saveProduct } from "@/lib/FE/api";

// function Step2({
//   productId,
//   initialValues,
//   router,
// }: {
//   productId: string;
//   initialValues: any;
//   router: any;
// }) {
//   const [colorVariants, setColorVariants] = useState<
//     {
//       ColorId: string;
//       ColorName: string;
//       ColorCode: string;
//       Images: string[];
//       Sizes: {
//         Size: string;
//         SizeId: string;
//         Stock: number;
//         PriceAdjustment: number;
//         isDeleted: boolean;
//       }[];
//     }[]
//   >(initialValues?.Colors || []);

//   useEffect(() => {
//     console.log(colorVariants);
//   }, [colorVariants]);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     setValue,
//   } = useForm<ProductFormDataStep2>({
//     resolver: zodResolver(productSchemaStep2),
//   });

//   const mutation = useMutation({
//     mutationFn: saveProduct,
//     onSuccess: (data) => {
//       if (!data.error) {
//         toast.info("form submitted");
//         router.push("/admin/products");
//       }
//       // Handle success (e.g., show notification, redirect)
//     },
//   });

//   const onSubmit = () => {
//     console.log(colorVariants, productId);
//     mutation.mutate({ step: 2, ProductId: productId, Colors: colorVariants });
//   };

//   const addColorVariant = () => {
//     setColorVariants((prev) => [
//       ...prev,
//       {
//         ColorName: "",
//         ColorId: "",
//         ColorCode: "#000000",
//         Images: [],
//         Sizes: [],
//       },
//     ]);
//   };

//   const removeColorVariant = (index: number) => {
//     setColorVariants((prev) => prev.filter((_, i) => i !== index));
//   };

//   useEffect(() => {
//     colorVariants.forEach((variant, index) => {
//       setValue(`Colors.${index}.ColorName`, variant.ColorName);
//       setValue(`Colors.${index}.ColorCode`, variant.ColorCode);
//       setValue(`Colors.${index}.Sizes`, variant.Sizes);
//       setValue(`Colors.${index}.Images`, variant.Images);
//     });
//   }, [colorVariants, setValue]);

//   return (
//     <>
//       {colorVariants.map((variant, index) => (
//         <ColorVariant
//           key={index.toString()}
//           variant={variant}
//           onRemove={() => removeColorVariant(index)}
//           register={register}
//           errors={errors}
//           onImageChange={(newImages) => {
//             setColorVariants((prev) =>
//               prev.map((v, i) =>
//                 i === index ? { ...v, Images: newImages } : v
//               )
//             );
//           }}
//         />
//       ))}
//       <br />
//       <motion.button
//         whileHover={{ scale: 1.01 }}
//         whileTap={{ scale: 0.99 }}
//         type="button"
//         onClick={addColorVariant}
//         className="w-full py-4 border-2 border-dashed border-slate-700 dark:border-slate-700 rounded-xl hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors flex items-center justify-center gap-2 text-slate-600 dark:text-slate-400 hover:text-indigo-500 dark:hover:text-indigo-400"
//       >
//         <Plus className="h-5 w-5" />
//         Add Color Variant
//       </motion.button>
//       <br />
//       <div className="flex gap-4">
//         <motion.button
//           whileHover={{ scale: 1.01 }}
//           whileTap={{ scale: 0.99 }}
//           type="button"
//           className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
//           disabled={mutation.isPending}
//           onClick={() => {
//             onSubmit();
//           }}
//         >
//           <Save className="h-4 w-4" />
//           {mutation.isPending ? "Saving..." : "Save Product"}
//         </motion.button>
//       </div>
//     </>
//   );
// }

// export default Step2;
import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Save } from "lucide-react";
import { toast } from "sonner";
import { ColorVariant } from "./ColorVariant/colorVariant";
import { handleImageUpload } from "@/lib/FE/api";
import {
  ColorVariant as ColorVariantType,
  ProductFormData,
} from "../../../lib/FE/types/product";

interface Step2Props {
  productId: string;
  initialValues: {
    Colors?: ColorVariantType[];
  };
  router: any;
  saveProduct: (data: ProductFormData) => Promise<any>;
}

export default function Step2({
  productId,
  initialValues,
  router,
  saveProduct,
}: Step2Props) {
  const [colorVariants, setColorVariants] = useState<ColorVariantType[]>(
    initialValues?.Colors || []
  );

  const handleSave = async () => {
    try {
      const response = await saveProduct({
        step: 2,
        ProductId: productId,
        Colors: colorVariants,
      });

      if (!response.error) {
        toast.success("Product saved successfully");
        router.push("/admin/products");
      } else {
        toast.error("Failed to save product");
      }
    } catch (error) {
      toast.error("An error occurred while saving");
    }
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

  const updateColorVariant = (
    index: number,
    updatedVariant: ColorVariantType
  ) => {
    setColorVariants((prev) =>
      prev.map((variant, i) => (i === index ? updatedVariant : variant))
    );
  };

  const removeColorVariant = (index: number) => {
    setColorVariants((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      {colorVariants.map((variant, index) => (
        <ColorVariant
          key={index}
          variant={variant}
          onUpdate={(updatedVariant) =>
            updateColorVariant(index, updatedVariant)
          }
          onRemove={() => removeColorVariant(index)}
          handleImageUpload={handleImageUpload}
        />
      ))}

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

      <div className="flex gap-4">
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          type="button"
          onClick={handleSave}
          className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
        >
          <Save className="h-4 w-4" />
          Save Product
        </motion.button>
      </div>
    </div>
  );
}
