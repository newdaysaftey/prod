import { motion } from "framer-motion";
import { Size } from "../../../../lib/FE/types/product";

interface SizeSelectorProps {
  size: string;
  selectedSize: Size | undefined;
  onSizeToggle: (size: string) => void;
  onStockChange: (size: string, value: number) => void;
  onPriceAdjustmentChange: (size: string, value: number) => void;
}

export function SizeSelector({
  size,
  selectedSize,
  onSizeToggle,
  onStockChange,
  onPriceAdjustmentChange,
}: SizeSelectorProps) {
  return (
    <div className="w-full items-center flex gap-2">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        type="button"
        onClick={() => onSizeToggle(size)}
        className={`w-12 h-12 rounded-lg font-medium transition-colors ${
          selectedSize && !selectedSize.isDeleted
            ? "bg-indigo-500 text-white"
            : "border border-slate-200 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-500"
        }`}
      >
        {size}
      </motion.button>
      <input
        type="number"
        className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-slate-950 transition-all"
        placeholder="Price Adjustment"
        value={selectedSize?.PriceAdjustment || ""}
        onChange={(e) =>
          onPriceAdjustmentChange(size, parseFloat(e.target.value) || 0)
        }
      />
      <input
        type="number"
        placeholder="Stock"
        value={selectedSize?.Stock || ""}
        className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-slate-950 transition-all"
        onChange={(e) => onStockChange(size, parseFloat(e.target.value) || 0)}
      />
    </div>
  );
}