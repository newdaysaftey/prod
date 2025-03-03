import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Save } from "lucide-react";
import { toast } from "sonner";
import { ColorVariant } from "./ColorVariant/colorVariant";
import { handleImageUpload, removeColorVariantApi } from "@/lib/FE/api";
import {
  ColorVariant as ColorVariantType,
  ProductFormData,
} from "../../../lib/FE/types/product";
import {
  gloveSizes,
  helmetSizes,
  maskSizes,
  pantSizes,
  shirtPantSizes,
  shoeSizes,
} from "@/lib/enum";
import { useQueryClient } from "@tanstack/react-query";
type productType = "SHIRTS" | "HELMET" | "SHOES";

interface Step2Props {
  productId: string;
  initialValues: {
    ProductType: productType;
    Colors?: ColorVariantType[];
  };
  router: any;
  saveProduct: (data: ProductFormData) => Promise<any>;
  selectedProductType: any;
}

export default function Step2({
  productId,
  initialValues,
  router,
  saveProduct,
  selectedProductType,
}: Step2Props) {
  const [sizes, setSizes] = useState<string[]>([]);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (selectedProductType === "SHIRTS") {
      setSizes(shirtPantSizes);
    } else if (selectedProductType === "SHOES") {
      setSizes(shoeSizes);
    } else if (selectedProductType === "HELMET") {
      setSizes(helmetSizes);
    } else if (selectedProductType === "PANTS") {
      setSizes(pantSizes);
    } else if (selectedProductType === "MASK") {
      setSizes(maskSizes);
    } else if (selectedProductType === "GLOVES") {
      setSizes(gloveSizes);
    }
  }, [selectedProductType]);
  const [isPending, setIsPending] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [productType, setProductType] = useState(selectedProductType);
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
        await queryClient.invalidateQueries({
          queryKey: ["product", productId],
        });
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

  const removeColorVariant = async (colorId: string) => {
    try {
      if (!colorId) {
        // If colorId is empty, it's a new unsaved variant
        setColorVariants((prev) =>
          prev.filter((variant) => variant.ColorId !== colorId)
        );
        return;
      }

      const response = await removeColorVariantApi(productId, colorId);

      if (!response.error) {
        setColorVariants((prev) =>
          prev.filter((variant) => variant.ColorId !== colorId)
        );
        toast.success("Color variant removed successfully");
      } else {
        toast.error("Failed to remove color variant");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while removing the color variant");
    }
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
          onRemove={() => removeColorVariant(variant.ColorId)}
          handleImageUpload={handleMultipleImageUpload}
          SIZES={sizes}
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
