"use client";

import { Star, StarHalf } from "lucide-react";

interface RatingProps {
  value: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
}

export function Rating({
  value,
  max = 5,
  size = "md",
  showValue = false,
}: RatingProps) {
  const fullStars = Math.floor(value);
  const hasHalfStar = value % 1 >= 0.5;
  const emptyStars = max - fullStars - (hasHalfStar ? 1 : 0);

  const starSizes = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  const textSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {[...Array(fullStars)].map((_, i) => (
          <Star
            key={`full-${i}`}
            className={`${starSizes[size]} fill-yellow-400 text-yellow-400`}
          />
        ))}
        {hasHalfStar && (
          <StarHalf
            className={`${starSizes[size]} fill-yellow-400 text-yellow-400`}
          />
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <Star
            key={`empty-${i}`}
            className={`${starSizes[size]} text-gray-300`}
          />
        ))}
      </div>
      {showValue && (
        <span className={`${textSizes[size]} text-gray-600 dark:text-gray-400`}>
          ({value.toFixed(1)})
        </span>
      )}
    </div>
  );
}
