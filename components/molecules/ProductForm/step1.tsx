import { motion, AnimatePresence } from "framer-motion";
const Step1 = ({
  register,
  errors,
  mutation,
  handleSubmit,
  onSubmit1,
}: any) => {
  return (
    <motion.div
      key="step1"
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -20, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-6 sm:p-8 space-y-6"
    >
      <div>
        <label className="block text-sm font-medium mb-2">Product Name</label>
        <input
          {...register("Name")}
          className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-slate-950 transition-all"
          placeholder="Enter product name"
        />
        {errors.Name && (
          <p className="text-red-500 text-sm mt-1">{errors.Name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Description</label>
        <textarea
          {...register("Description")}
          className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-slate-950 transition-all min-h-[120px]"
          placeholder="Enter product description"
        />
        {errors.Description && (
          <p className="text-red-500 text-sm mt-1">
            {errors.Description.message}
          </p>
        )}
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        <div>
          <label className="block text-sm font-medium mb-2">Base Price</label>
          <input
            type="number"
            step="0.01"
            {...register("Base_price", { valueAsNumber: true })}
            className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-slate-950 transition-all"
            placeholder="0.00"
          />
          {errors.Base_price && (
            <p className="text-red-500 text-sm mt-1">
              {errors.Base_price.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Discount (%)</label>
          <input
            type="number"
            min="0"
            max="100"
            {...register("discount", { valueAsNumber: true })}
            className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-slate-950 transition-all"
            placeholder="0"
          />
          {errors.discount && (
            <p className="text-red-500 text-sm mt-1">
              {errors.discount.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Initial Quantity
          </label>
          <input
            type="number"
            min="0"
            {...register("Available", { valueAsNumber: true })}
            className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-slate-950 transition-all"
            placeholder="0"
          />
          {errors.Available && (
            <p className="text-red-500 text-sm mt-1">
              {errors.Available.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Category ID</label>
        <input
          {...register("CategoryId")}
          className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-slate-950 transition-all"
          placeholder="Enter category ID"
        />
        {errors.CategoryId && (
          <p className="text-red-500 text-sm mt-1">
            {errors.CategoryId.message}
          </p>
        )}
      </div>

      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        type="button"
        className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
        disabled={mutation.isPending}
        onClick={() => {
          handleSubmit(onSubmit1)();
        }}
      >
        {mutation.isPending ? "Saving..." : "Continue to Color Variants"}
        <motion.span
          animate={{ x: [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          →
        </motion.span>
      </motion.button>
    </motion.div>
  );
};

export default Step1;
