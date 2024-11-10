import { Trash2, Upload } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

interface ColorVariantProps {
  onRemove: () => void;
}

export function ColorVariant({ onRemove }: ColorVariantProps) {
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [selectedColor, setSelectedColor] = useState("#000000");

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size)
        ? prev.filter((s) => s !== size)
        : [...prev, size]
    );
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) => URL.createObjectURL(file));
      setImages((prev) => [...prev, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
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
        <div>
          <label className="block text-sm font-medium mb-2">Price Adjustment</label>
          <input
            type="number"
            className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-slate-950 transition-all"
            placeholder="0.00"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Available Sizes</label>
        <div className="flex flex-wrap gap-2">
          {SIZES.map((size) => (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              key={size}
              type="button"
              onClick={() => toggleSize(size)}
              className={`w-12 h-12 rounded-lg font-medium transition-colors ${
                selectedSizes.includes(size)
                  ? "bg-indigo-500 text-white"
                  : "border border-slate-200 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-500"
              }`}
            >
              {size}
            </motion.button>
          ))}
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
            <span className="text-sm text-slate-500">Click to upload images</span>
            <input
              id="images"
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleImageUpload}
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
                    onClick={() => removeImage(index)}
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