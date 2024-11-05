"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Package, ArrowLeft, Save } from "lucide-react";
import { ColorVariant } from "./ColorVariant";

export function ProductForm() {
  const [step, setStep] = useState(1);
  const [colorVariants, setColorVariants] = useState([0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      console.log("Form submitted");
    }
  };

  const addColorVariant = () => {
    setColorVariants((prev) => [...prev, prev.length]);
  };

  const removeColorVariant = (index: number) => {
    setColorVariants((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-6 sm:p-8 mb-8"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
                <Package className="h-8 w-8 text-indigo-500" />
                Add New Product
              </h1>
              <p className="text-slate-500 dark:text-slate-400">
                Complete the form below to add a new product to your store
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

        <form onSubmit={handleSubmit}>
          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div
                key="step1"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-6 sm:p-8 space-y-6"
              >
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Product Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-slate-950 transition-all"
                    placeholder="Enter product name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Description
                  </label>
                  <textarea
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-slate-950 transition-all min-h-[120px]"
                    placeholder="Enter product description"
                    required
                  />
                </div>

                <div className="grid gap-6 sm:grid-cols-3">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Base Price
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-slate-950 transition-all"
                      placeholder="0.00"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Discount (%)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-slate-950 transition-all"
                      placeholder="0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Initial Quantity
                    </label>
                    <input
                      type="number"
                      min="0"
                      className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-slate-950 transition-all"
                      placeholder="0"
                      required
                    />
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                >
                  Continue to Color Variants
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    →
                  </motion.span>
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                key="step2"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 20, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {colorVariants.map((_, index) => (
                  <ColorVariant
                    key={index}
                    onRemove={() => removeColorVariant(index)}
                  />
                ))}

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="button"
                  onClick={addColorVariant}
                  className="w-full py-4 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors flex items-center justify-center gap-2 text-slate-600 dark:text-slate-400 hover:text-indigo-500 dark:hover:text-indigo-400"
                >
                  <Plus className="h-5 w-5" />
                  Add Color Variant
                </motion.button>

                <div className="flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 border border-slate-200 dark:border-slate-700 py-3 rounded-lg font-medium transition-colors hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-center gap-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Previous Step
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    type="submit"
                    className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <Save className="h-4 w-4" />
                    Save Product
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>
    </div>
  );
}
