import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import { SizeSelector } from "./sizeSelector";
import { ImageUploader } from "./imageUploader";
import {
  ColorVariant as ColorVariantType,
  Size,
} from "../../../../lib/FE/types/product";

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

interface ColorVariantProps {
  variant: ColorVariantType;
  onUpdate: (updatedVariant: ColorVariantType) => void;
  onRemove: () => void;
  handleImageUpload: (files: File[]) => Promise<string[]>;
}

export function ColorVariant({
  variant,
  onUpdate,
  onRemove,
  handleImageUpload,
}: ColorVariantProps) {
  const updateVariant = (updates: Partial<ColorVariantType>) => {
    onUpdate({ ...variant, ...updates });
  };

  const toggleSize = (size: string) => {
    const existingSize = variant.Sizes.find((s) => s.Size === size);
    const newSizes = existingSize
      ? variant.Sizes.map((s) =>
          s.Size === size ? { ...s, isDeleted: !s.isDeleted } : s
        )
      : [
          ...variant.Sizes,
          {
            Size: size,
            SizeId: "", // Empty string for new sizes
            Stock: 0,
            PriceAdjustment: 0,
            isDeleted: false,
          },
        ];
    updateVariant({ Sizes: newSizes });
  };

  const handleStockChange = (size: string, value: number) => {
    const newSizes = variant.Sizes.map((s) =>
      s.Size === size ? { ...s, Stock: value } : s
    );
    updateVariant({ Sizes: newSizes });
  };

  const handlePriceAdjustmentChange = (size: string, value: number) => {
    const newSizes = variant.Sizes.map((s) =>
      s.Size === size ? { ...s, PriceAdjustment: value } : s
    );
    updateVariant({ Sizes: newSizes });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-6 sm:p-8 space-y-6"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Color Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-slate-950 transition-all"
              placeholder="e.g., Royal Blue"
              value={variant.ColorName}
              onChange={(e) => updateVariant({ ColorName: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Color</label>
            <div className="flex gap-4 items-center">
              <input
                type="color"
                value={variant.ColorCode}
                onChange={(e) => updateVariant({ ColorCode: e.target.value })}
                className="h-10 w-20 rounded cursor-pointer"
              />
              <input
                type="text"
                value={variant.ColorCode}
                onChange={(e) => updateVariant({ ColorCode: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-slate-950 transition-all uppercase"
                placeholder="#000000"
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Available Sizes
        </label>
        <div className="flex flex-wrap gap-2">
          {SIZES.map((size) => (
            <SizeSelector
              key={size}
              size={size}
              selectedSize={variant.Sizes.find((s) => s.Size === size)}
              onSizeToggle={toggleSize}
              onStockChange={handleStockChange}
              onPriceAdjustmentChange={handlePriceAdjustmentChange}
            />
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Color Images</label>
        <ImageUploader
          images={variant.Images}
          onImagesChange={(images) => updateVariant({ Images: images })}
          variantKey={variant.ColorName}
          handleImageUpload={handleImageUpload}
        />
      </div>

      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        type="button"
        onClick={onRemove}
        className="w-full py-3 bg-red-50 dark:bg-red-500/10 text-red-500 rounded-lg font-medium hover:bg-red-100 dark:hover:bg-red-500/20 transition-colors flex items-center justify-center gap-2"
      >
        <Trash2 className="h-4 w-4" />
        Remove Color Variant
      </motion.button>
    </motion.div>
  );
}
