"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface Color {
  ColorId: string;
  ColorName: string;
  ColorCode: string;
}

interface ColorSelectorProps {
  colors: Color[];
  selectedColor: string;
  onColorSelect: (colorId: string) => void;
}

export function ColorSelector({
  colors,
  selectedColor,
  onColorSelect,
}: ColorSelectorProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {colors.map((color) => (
        <motion.button
          key={color.ColorId}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onColorSelect(color.ColorId)}
          className={`group relative w-12 h-12 rounded-full ${
            selectedColor === color.ColorId
              ? "ring-2 ring-indigo-500 ring-offset-2"
              : "hover:ring-2 hover:ring-gray-300 hover:ring-offset-2"
          }`}
        >
          <span
            className="absolute inset-0 rounded-full border-2 border-gray-200"
            style={{ backgroundColor: color.ColorCode }}
          />
          {selectedColor === color.ColorId && (
            <span className="absolute inset-0 flex items-center justify-center">
              <Check
                className={`h-6 w-6 ${
                  isLightColor(color.ColorCode) ? "text-gray-800" : "text-white"
                }`}
              />
            </span>
          )}
          <span className="sr-only">{color.ColorName}</span>

          {/* Tooltip */}
          <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity">
            {color.ColorName}
          </span>
        </motion.button>
      ))}
    </div>
  );
}

// Helper function to determine if a color is light
function isLightColor(color: string): boolean {
  const hex = color.replace("#", "");
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 128;
}
