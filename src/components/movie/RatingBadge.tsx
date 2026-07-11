import React from "react";
import { Star } from "lucide-react";

interface RatingBadgeProps {
  rating: number;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function RatingBadge({ rating, className = "", size = "md" }: RatingBadgeProps) {
  const isHigh = rating >= 8.0;
  const isMedium = rating >= 6.0 && rating < 8.0;

  const sizeClasses = {
    sm: "px-1.5 py-0.5 text-[10px] gap-0.5 rounded-md",
    md: "px-2 py-0.5 text-xs gap-1 rounded-lg",
    lg: "px-2.5 py-1.5 text-sm gap-1.5 rounded-xl",
  };

  const starSizes = {
    sm: "w-3 h-3",
    md: "w-3.5 h-3.5",
    lg: "w-4 h-4",
  };

  const colorClasses = isHigh
    ? "bg-rose-500/20 text-rose-500 border border-rose-500/30"
    : isMedium
    ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
    : "bg-blue-500/20 text-blue-400 border border-blue-500/30";

  return (
    <div className={`inline-flex items-center font-bold ${sizeClasses[size]} ${colorClasses} ${className}`}>
      <Star className={`${starSizes[size]} fill-current`} />
      <span>{rating.toFixed(1)}</span>
    </div>
  );
}
