// "use client";

// import { motion } from "framer-motion";
// import Image from "next/image";
// import Link from "next/link";
// import { Eye, Package, Tag } from "lucide-react";
// import type { Product } from "@/lib/FE/types/product";

// interface ProductCardProps {
//   product: Product;
// }

// export function ProductCard({ product }: ProductCardProps) {
//   const mainImage = product.Colors[0]?.Images[0];
//   const lowestPrice = product.Base_price;
//   const highestPrice =
//     product.Base_price +
//     Math.max(
//       ...product.Colors.flatMap((color: any) =>
//         color.Sizes.map((size: any) => size.PriceAdjustment)
//       )
//     );

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
//     >
//       <Link href={`/products/${product.ProductId}`}>
//         <div className="relative aspect-square overflow-hidden rounded-t-xl">
//           {mainImage ? (
//             <Image
//               src={mainImage}
//               alt={product.Name}
//               fill
//               className="object-cover transform group-hover:scale-105 transition-transform duration-200"
//             />
//           ) : (
//             <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
//               <Package className="w-12 h-12 text-gray-400" />
//             </div>
//           )}

//           {/* Tags */}
//           <div className="absolute top-2 left-2 flex flex-wrap gap-1">
//             {product.Tags.map(({ tag }: { tag: any }) => (
//               <span
//                 key={tag.id}
//                 className="inline-flex items-center gap-1 bg-black/70 text-white text-xs px-2 py-1 rounded-full"
//               >
//                 <Tag className="w-3 h-3" />
//                 {tag.name}
//               </span>
//             ))}
//           </div>

//           {/* Quick view button */}
//           <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
//             <motion.div
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="bg-white text-gray-900 px-4 py-2 rounded-full font-medium flex items-center gap-2"
//             >
//               <Eye className="w-4 h-4" />
//               Quick View
//             </motion.div>
//           </div>
//         </div>

//         <div className="p-4">
//           <h3 className="font-semibold text-lg mb-1 group-hover:text-indigo-500 transition-colors">
//             {product.Name}
//           </h3>

//           <div className="flex items-baseline gap-2">
//             <span className="text-lg font-bold">${lowestPrice.toFixed(2)}</span>
//             {highestPrice > lowestPrice && (
//               <span className="text-sm text-gray-500">
//                 - ${highestPrice.toFixed(2)}
//               </span>
//             )}
//           </div>

//           <div className="mt-2 flex flex-wrap gap-1">
//             {product.Colors.map((color: any) => (
//               <div
//                 key={color.ColorId}
//                 className="w-4 h-4 rounded-full border border-gray-200"
//                 style={{ backgroundColor: color.ColorCode }}
//                 title={color.ColorName}
//               />
//             ))}
//           </div>
//         </div>
//       </Link>
//     </motion.div>
//   );
// }
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Eye, Tag, Package, Heart } from "lucide-react";
import type { Product } from "@/lib/FE/types/product";
import { Rating } from "@/components/ui/rating";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const mainImage = product.Colors[0]?.Images[0];
  const lowestPrice = product.Base_price;
  const highestPrice =
    product.Base_price +
    Math.max(
      ...product.Colors.flatMap((color: any) =>
        color.Sizes.map((size: any) => size.PriceAdjustment)
      )
    );

  // Temporary rating data - to be replaced with real data
  const rating = 4.5;
  const reviewCount = 128;
  const discount = 15; // Percentage

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
    >
      <div className="relative">
        <Link href={`/products/${product.ProductId}`}>
          <div className="relative aspect-square overflow-hidden rounded-t-xl">
            {mainImage ? (
              <Image
                src={mainImage}
                alt={product.Name}
                fill
                className="object-cover transform group-hover:scale-105 transition-transform duration-200"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <Package className="w-12 h-12 text-gray-400" />
              </div>
            )}

            {/* Discount Badge */}
            {/* {discount > 0 && (
              <div className="absolute top-2 right-2 bg-red-500 text-white text-sm font-bold px-2 py-1 rounded-full">
                -{discount}%
              </div>
            )} */}

            {/* Tags */}
            <div className="absolute top-2 left-2 flex flex-wrap gap-1">
              {product.Tags.map(({ tag }: { tag: any }) => (
                <span
                  key={tag.id}
                  className="inline-flex items-center gap-1 bg-black/70 text-white text-xs px-2 py-1 rounded-full"
                >
                  <Tag className="w-3 h-3" />
                  {tag.name}
                </span>
              ))}
            </div>

            {/* Quick view overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-gray-900 px-4 py-2 rounded-full font-medium flex items-center gap-2"
              >
                <Eye className="w-4 h-4" />
                Quick View
              </motion.div>
            </div>
          </div>
        </Link>

        {/* Wishlist Button */}
        <button
          className="absolute top-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white shadow-sm transition-colors"
          onClick={() => console.log("Add to wishlist")}
        >
          <Heart className="w-4 h-4 text-gray-600 hover:text-red-500 transition-colors" />
        </button>
      </div>

      <div className="p-4">
        <Link href={`/products/${product.ProductId}`}>
          <h3 className="font-semibold text-lg mb-1 group-hover:text-indigo-500 transition-colors line-clamp-2">
            {product.Name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-2">
          <Rating value={rating} size="sm" />
          <span className="text-sm text-gray-500">({reviewCount})</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline flex-wrap gap-2 mb-2">
          <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
            ${lowestPrice.toFixed(2)}
          </span>
          {/* {highestPrice > lowestPrice && (
            <span className="text-sm text-gray-500">
              - ${highestPrice.toFixed(2)}
            </span>
          )} */}
          {discount > 0 && (
            <span className="text-sm text-gray-500 line-through">
              ${(lowestPrice * (1 + discount / 100)).toFixed(2)}
            </span>
          )}
        </div>

        {/* Color Options */}
        <div className="flex flex-wrap gap-1">
          {product.Colors.map((color: any) => (
            <div
              key={color.ColorId}
              className="w-4 h-4 rounded-full border border-gray-200 cursor-pointer hover:scale-110 transition-transform"
              style={{ backgroundColor: color.ColorCode }}
              title={color.ColorName}
            />
          ))}
        </div>

        {/* Stock Status */}
        <div className="mt-2 text-sm">
          {product.Colors.some((color: any) =>
            color.Sizes.some((size: any) => size.Stock > 0)
          ) ? (
            <span className="text-green-600 dark:text-green-400">In Stock</span>
          ) : (
            <span className="text-red-600 dark:text-red-400">Out of Stock</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
