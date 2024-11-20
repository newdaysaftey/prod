"use client";
import { Trash2, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { handleImageUpload } from "@/lib/FE/api";
import { FieldArrayWithId, UseFormRegister } from "react-hook-form";
import { ProductFormData } from "./step2";

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

interface ColorVariantProps {
  variant: {
    ColorName: string;
    ColorCode: string;
    Images: string[];
    Sizes: {
      Size: string;
      Stock: number;
      PriceAdjustment: number;
      isDeleted: boolean;
      SizeId?: string;
    }[];
  };
  onRemove: () => void;
  register: UseFormRegister<ProductFormData>;
  errors: {
    [x: string]: any;
  };
}

function ColorVariant({
  variant,
  onRemove,
  register,
  errors,
}: ColorVariantProps) {
  const handleMultipleImageUpload = async (
    files: File[]
  ): Promise<any> => {
    const imageUrls = await handleImageUpload(files);
    return imageUrls;
  };
  // Usage example
  const handleImageChangeInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const imageUrls = await handleMultipleImageUpload(Array.from(files));
      setImages((prev) => [...prev, ...imageUrls]);
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };
  const [images, setImages] = useState<string[]>(variant.Images || []);
  const [selectedColor, setSelectedColor] = useState(
    variant?.ColorCode || "#000000"
  );
  const [colorName, setColorName] = useState(variant?.ColorName || "");

  const [selectedSizes, setSelectedSizes] = useState<
    {
      Size: string;
      SizeId?: string;
      Stock: number;
      PriceAdjustment: number;
      isDeleted: boolean;
    }[]
  >(variant.Sizes);
  console.log(selectedSizes)

  const toggleSize = (size: string) => {
    // Check if the size is already in the selectedSizes array
    const existingSize = selectedSizes.find((s) => s.Size === size);

    if (existingSize) {
      // If the size is already in the array, update its properties
      setSelectedSizes((prevSizes) =>
        prevSizes.map((s) =>
          s.Size === size
            ? {
                ...s,
          
                isDeleted: !s.isDeleted,
              }
            : s
        )
      );
    } else {
      // If the size is not in the array, add a new object
      setSelectedSizes((prevSizes) => [
        ...prevSizes,
        {
          Size: size,
          Stock: 0,
          PriceAdjustment: 0,
          isDeleted: false,
          SizeId: "",
        },
      ]);
    }
  };
const handleStockChange = (size: string, value: number) => {
  setSelectedSizes((prevSizes) =>
    prevSizes.map((s) => 
      s.Size === size 
        ? { ...s, Stock: value } 
        : s
    )
  );
};

const handlePriceAdjustmentChange = (size: string, value: number) => {
  setSelectedSizes((prevSizes) =>
    prevSizes.map((s) =>
      s.Size === size 
        ? { ...s, PriceAdjustment: value } 
        : s
    )
  );
};

  useEffect(() => {
    variant["ColorName"] = colorName;
    variant["ColorCode"] = selectedColor;
    variant["Sizes"] = selectedSizes;
    variant[ "Images"] = images
    console.log(variant)
  }, [images, selectedColor, selectedSizes, setColorName]);

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
              value={colorName}
              onChange={(e) => setColorName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Color</label>
            <div className="flex gap-4 items-center">
              <input
                type="color"
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                className="h-10 w-20 rounded cursor-pointer"
              />
              <input
                type="text"
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
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
          {SIZES.map((size,index) => {
            const selectedSize = selectedSizes.find((s) => s.Size === size);
            console.log(selectedSize)

            return (
              <div className="w-[100%] items-center   flex gap-2" key={index}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  key={size}
                  type="button"
                  onClick={() => toggleSize(size)}
                  className={`w-12 h-12 rounded-lg font-medium transition-colors ${
                    selectedSize && !selectedSize.isDeleted
                      ? "bg-indigo-500 text-white"
                      : "border border-slate-200 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-500"
                  }`}
                >
                  {size}
                </motion.button>
                <div>
                  <input
                    type="number"
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-slate-950 transition-all"
                    placeholder="Price Adjustment"
                    value={selectedSize?.PriceAdjustment}
                    onChange={(e) =>
                      handlePriceAdjustmentChange(
                        size,
                        parseFloat(e.target.value)
                      )
                    }
                  />
                </div>
                <input
                  type="number"
                  placeholder="Stock"
                  value={selectedSize?.Stock}
                  className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-slate-950 transition-all"
                  onChange={(e) =>
                    handleStockChange(size, parseFloat(e.target.value))
                  }
                ></input>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Color Images</label>
        <div className="space-y-4">
          <label
            htmlFor="images"
            className="block border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl p-8 text-center cursor-pointer hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors"
          >
            <Upload className="mx-auto h-8 w-8 mb-2 text-slate-400" />
            <span className="text-sm text-slate-500">
              Click to upload images
            </span>
            <input
              id="images"
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleImageChangeInput}
            />
          </label>

          {images.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {images.map((image, index) => (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  key={index}
                  className="relative group rounded-lg overflow-hidden"
                >
                  <img
                    src={image}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-32 object-cover"
                  />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {e.preventDefault();removeImage(index)}}
                    className="absolute top-2 right-2 bg-white dark:bg-slate-800 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </motion.button>
                </motion.div>
              ))}
            </div>
          )}
        </div>
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
export default ColorVariant;
