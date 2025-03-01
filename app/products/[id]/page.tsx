"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Package, Tag, Truck, Shield, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getProductById } from "@/lib/FE/api";
import { ImageGallery } from "@/components/molecules/products/ImageGallery";
import { ColorSelector } from "@/components/molecules/products/ColorSelector";
import { SizeSelector } from "@/components/molecules/products/SizeSelector";
import { QuantitySelector } from "@/components/molecules/products/QuantitySelector";
import { AddToCartButton } from "@/components/molecules/products/AddToCartButton";

export default function ProductPage({ params }: { params: { id: string } }) {
  const [selectedColorId, setSelectedColorId] = useState<string>("");
  const [selectedSizeId, setSelectedSizeId] = useState<string>("");
  const [quantity, setQuantity] = useState(1);

  const { data, isLoading, error } = useQuery({
    queryKey: ["product", params.id],
    queryFn: () => getProductById(params.id),
  });

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Error: {(error as Error).message}
      </div>
    );

  const product = data.data;
  const productType = product?.ProductType || "SHIRTS";
  const selectedColor =
    product.Colors.find((c: any) => c.ColorId === selectedColorId) ||
    product.Colors[0];
  const selectedSize = selectedColor.Sizes.find(
    (s: any) => s.SizeId === selectedSizeId
  );
  const finalPrice = selectedSize
    ? product.Base_price + selectedSize.PriceAdjustment
    : product.Base_price;

  const maxQuantity = selectedSize?.Stock || 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 group"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Products
        </Link>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left Column - Images */}
            <div className="p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-gray-700">
              <ImageGallery images={selectedColor.Images} />
            </div>

            {/* Right Column - Product Details */}
            <div className="p-6 lg:p-8">
              <div className="space-y-6">
                {/* Header */}
                <div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                    <span>SKU: {product.ProductId.slice(0, 8)}</span>
                    <span>•</span>
                    <span className="inline-flex items-center gap-1">
                      <Tag className="h-4 w-4" />
                      {product.Category.Name}
                    </span>
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {product.Name}
                  </h1>
                </div>

                {/* Price */}
                <div className="border-t border-b border-gray-200 dark:border-gray-700 py-4">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">
                    ${finalPrice.toFixed(2)}
                  </div>
                  {selectedSize?.PriceAdjustment > 0 && (
                    <div className="text-sm text-gray-500 mt-1">
                      Base price: ${product.Base_price.toFixed(2)} + Size
                      adjustment: ${selectedSize.PriceAdjustment.toFixed(2)}
                    </div>
                  )}
                </div>

                {/* Colors */}
                <div>
                  <h2 className="text-lg font-semibold mb-3">
                    Available Colors
                  </h2>
                  <ColorSelector
                    colors={product.Colors}
                    selectedColor={selectedColor.ColorId}
                    onColorSelect={setSelectedColorId}
                  />
                </div>

                {/* Sizes */}
                <div>
                  <h2 className="text-lg font-semibold mb-3">Select Size</h2>
                  <SizeSelector
                    sizes={selectedColor.Sizes}
                    selectedSize={selectedSizeId}
                    onSizeSelect={setSelectedSizeId}
                    productType={productType}
                  />
                </div>

                {/* Quantity */}
                {selectedSize && (
                  <div>
                    <h2 className="text-lg font-semibold mb-3">Quantity</h2>
                    <QuantitySelector
                      quantity={quantity}
                      onQuantityChange={setQuantity}
                      maxQuantity={maxQuantity}
                      showButton={true}
                    />
                  </div>
                )}

                {/* Add to Cart */}
                <div>
                  <AddToCartButton
                    disabled={!selectedSizeId || maxQuantity === 0}
                    productId={product.ProductId}
                    colorId={selectedColor.ColorId}
                    sizeId={selectedSizeId}
                    price={finalPrice}
                    quantity={quantity}
                  />
                </div>

                {/* Stock Info */}
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                  <h2 className="text-lg font-semibold mb-3">
                    Stock Information
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {selectedColor.Sizes.map((size: any) => (
                      <div
                        key={size.SizeId}
                        className="bg-white dark:bg-gray-800 p-3 rounded-md shadow-sm"
                      >
                        <div className="text-sm font-medium">
                          Size {size.Size}
                        </div>
                        <div
                          className={`text-sm ${
                            size.Stock > 0
                              ? "text-green-600 dark:text-green-400"
                              : "text-red-600 dark:text-red-400"
                          }`}
                        >
                          {size.Stock > 0
                            ? `${size.Stock} in stock`
                            : "Out of stock"}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Product Features */}
                <div className="grid grid-cols-2 gap-4 border-t border-gray-200 dark:border-gray-700 pt-6">
                  <div className="flex items-start gap-3">
                    <Truck className="h-5 w-5 text-gray-400" />
                    <div>
                      <h3 className="font-medium">Fast Shipping</h3>
                      <p className="text-sm text-gray-500">2-3 business days</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-gray-400" />
                    <div>
                      <h3 className="font-medium">Quality Guarantee</h3>
                      <p className="text-sm text-gray-500">
                        30-day return policy
                      </p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                  <h2 className="text-lg font-semibold mb-3">
                    Product Description
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">
                    {product.Description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
