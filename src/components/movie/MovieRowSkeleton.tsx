import React from "react";

export default function MovieRowSkeleton() {
  return (
    <div className="space-y-4 px-4 md:px-8 py-2">
      {/* Title skeleton */}
      <div className="h-7 w-48 bg-white/5 border border-white/5 rounded-lg animate-pulse" />
      
      {/* Cards row skeleton */}
      <div className="flex gap-4 overflow-x-hidden py-2">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-[160px] sm:w-[180px] md:w-[220px] aspect-[2/3] bg-white/5 border border-white/5 rounded-xl animate-pulse relative overflow-hidden"
          >
            {/* Ambient inner shimmer */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
          </div>
        ))}
      </div>
    </div>
  );
}
