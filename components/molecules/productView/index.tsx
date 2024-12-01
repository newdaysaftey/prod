"use client";
import { motion } from "framer-motion";
import { Package, Edit, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function ProductView({ product }: any) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4 sm:p-8">
      <div className="w-[90%] mx-auto">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-6 sm:p-8 mb-8"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <Link
                href="/admin/products"
                className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 mb-4"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Products
              </Link>
              <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
                <Package className="h-8 w-8 text-indigo-500" />
                {product.Name}
              </h1>
              <p className="text-slate-500 dark:text-slate-400">
                Product Details
              </p>
            </div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href={`/admin/products/${product.ProductId}/edit`}
                className="inline-flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                <Edit className="h-5 w-5" />
                Edit Product
              </Link>
            </motion.div>
          </div>
        </motion.div>

        <div className="grid gap-8 ">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="space-y-8"
          >
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-6 sm:p-8">
              <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
              <dl className="space-y-4">
                <div>
                  <dt className="text-sm font-medium text-slate-500">
                    Description
                  </dt>
                  <dd className="mt-1">{product.Description}</dd>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <dt className="text-sm font-medium text-slate-500">
                      Base Price
                    </dt>
                    <dd className="mt-1 text-2xl font-semibold">
                      ${product.Base_price}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-slate-500">
                      Stock
                    </dt>
                    <dd className="mt-1 text-2xl font-semibold">
                      {product.stock}
                    </dd>
                  </div>
                </div>
              </dl>
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            {product?.Colors?.map((variant: any, index: number) => (
              <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-6 sm:p-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">
                    Color Variant {index + 1}
                  </h2>
                  <div
                    className="w-6 h-6 rounded-full border border-slate-200"
                    style={{ backgroundColor: variant.colorCode }}
                  />
                </div>
                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm font-medium text-slate-500">
                      Color Name
                    </dt>
                    <dd className="mt-1">{variant.ColorName}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-slate-500">
                      Available Sizes
                    </dt>
                    <dd className="mt-2">
                      <div className="flex flex-wrap gap-2">
                        {variant.Sizes.map((size: any) => (
                          <span
                            key={size}
                            className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 font-medium"
                          >
                            {size.Size}
                          </span>
                        ))}
                      </div>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-slate-500">
                      Images
                    </dt>
                    <dd className="mt-2">
                      <div className="grid grid-cols-2 gap-4">
                        {variant.Images.map(
                          (image: any, imageIndex: number) => (
                            <div
                              key={imageIndex}
                              className="relative aspect-square"
                            >
                              <Image
                                src={image}
                                alt={`${variant.color} variant ${
                                  imageIndex + 1
                                }`}
                                fill
                                className="rounded-lg object-cover"
                              />
                            </div>
                          )
                        )}
                      </div>
                    </dd>
                  </div>
                </dl>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
