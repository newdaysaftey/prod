"use client";
import React from "react";
import { Star, StarHalf } from "lucide-react";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  title: string;
  image: string;
  rating: number;
  reviews: number;
  price: number;
  mrp: number;
  discount: number;
  deliveryDate: string;
  deliveryTime: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  image,
  rating,
  reviews,
  price,
  mrp,
  discount,
  deliveryDate,
  deliveryTime,
}) => {
  const router = useRouter();

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star
          key={`star-${i}`}
          className="w-4 h-4 fill-yellow-400 text-yellow-400"
        />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <StarHalf
          key="half-star"
          className="w-4 h-4 fill-yellow-400 text-yellow-400"
        />
      );
    }

    return stars;
  };
  const handleViewNow = () => {
    // Navigate to checkout page
    router.push("/products/edb7f379-4bc0-471b-a113-cc5c0d4af497");
  };

  const handleAddToCart = () => {
    // Navigate to cart page
    router.push("/cart");
  };
  return (
    <div className="w-[100%] sm:w-[95%] bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Image Container */}
      <div className="w-full h-[280px] sm:h-[200px] p-4 bg-gray-50 flex items-center justify-center">
        <img src={image} alt={title} className="w-full h-full object-contain" />
      </div>

      {/* Content Container */}
      <div className="p-4">
        {/* Title */}
        <h3 className="text-sm font-medium text-gray-800 line-clamp-2 h-10">
          {title}
        </h3>

        {/* Rating */}
        <div className="flex items-center mt-2 space-x-1">
          <div className="flex">{renderStars(rating)}</div>
          <span className="text-sm text-gray-500 ml-1">{reviews}</span>
        </div>

        {/* Price */}
        <div className="mt-2 flex items-baseline space-x-2">
          <span className="text-2xl font-bold">${price}</span>
          <div className="flex items-center space-x-1">
            <span className="text-sm text-gray-500 line-through">
              MRP ${mrp}
            </span>
            <span className="text-sm text-green-600">({discount}% off)</span>
          </div>
        </div>

        {/* Delivery Info */}
        <div className="mt-3 text-xs text-gray-600">
          <p>FREE delivery by {deliveryDate},</p>
          <p>{deliveryTime}</p>
        </div>

        {/* Add to Cart Button */}
        <div className="flex gap-6 ">
          <button
            className="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-800 transition-colors duration-200 font-medium"
            onClick={handleViewNow}
          >
            View Item
          </button>
          <button
            className="mt-4 w-full bg-blue-700 text-white py-2 px-4 rounded-md hover:bg-blue-800 transition-colors duration-200 font-medium"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
