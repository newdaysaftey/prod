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
  const [isPending, setIsPending] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const handleMultipleImageUpload = async (files: File[]): Promise<any> => {
    setUploadingImage(true);
    const imageUrls = await handleImageUpload(files);
    setUploadingImage(false);
    return imageUrls;
  };
  const [colorVariants, setColorVariants] = useState<ColorVariantType[]>(
    initialValues?.Colors || []
  );

  const handleSave = async () => {
    try {
      setIsPending(true);
      const response = await saveProduct({
        step: 2,
        ProductId: productId,
        Colors: colorVariants,
      });
      setIsPending(true);
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
          handleImageUpload={handleMultipleImageUpload}
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
          disabled={isPending}
          className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
        >
          <Save className="h-4 w-4" />
          {uploadingImage
            ? "Uploading Image please wait"
            : isPending
            ? "Saving..."
            : "Save Product"}
        </motion.button>
      </div>
      <br></br>
    </div>
  );
}
