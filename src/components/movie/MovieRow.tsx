"use client";

import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Movie } from "@/lib/tmdb";
import MovieCard from "./MovieCard";

interface MovieRowProps {
  title: string;
  movies: Movie[];
}

export default function MovieRow({ title, movies }: MovieRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  // Check scroll position to dynamically show/hide arrows
  const checkScroll = () => {
    if (rowRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
      setShowLeftArrow(scrollLeft > 10);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const row = rowRef.current;
    if (row) {
      row.addEventListener("scroll", checkScroll);
      // Run once initially
      checkScroll();
      
      // Recheck when window resizes
      window.addEventListener("resize", checkScroll);
    }
    return () => {
      if (row) {
        row.removeEventListener("scroll", checkScroll);
      }
      window.removeEventListener("resize", checkScroll);
    };
  }, [movies]);

  const handleScroll = (direction: "left" | "right") => {
    if (rowRef.current) {
      const { clientWidth } = rowRef.current;
      const scrollAmount = direction === "left" ? -clientWidth * 0.75 : clientWidth * 0.75;
      rowRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (!movies || movies.length === 0) return null;

  return (
    <div className="relative group/row space-y-4">
      {/* Row Title */}
      <div className="flex items-center justify-between px-4 md:px-8">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
          {title}
          <span className="h-1.5 w-1.5 rounded-full bg-rose-500 box-glow" />
        </h2>
      </div>

      {/* Row Container */}
      <div className="relative px-4 md:px-8">
        {/* Left Arrow Button */}
        {showLeftArrow && (
          <button
            onClick={() => handleScroll("left")}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-black/60 hover:bg-rose-600 text-white border border-white/5 opacity-0 group-hover/row:opacity-100 transition-all duration-300 backdrop-blur-md cursor-pointer hover:scale-110"
            aria-label="Scroll Left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        {/* Right Arrow Button */}
        {showRightArrow && (
          <button
            onClick={() => handleScroll("right")}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-black/60 hover:bg-rose-600 text-white border border-white/5 opacity-0 group-hover/row:opacity-100 transition-all duration-300 backdrop-blur-md cursor-pointer hover:scale-110"
            aria-label="Scroll Right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}

        {/* Horizontal Scrollable Area */}
        <div
          ref={rowRef}
          onScroll={checkScroll}
          className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth py-2 px-1"
        >
          {movies.map((movie, index) => (
            <div
              key={movie.id}
              className="flex-shrink-0 w-[160px] sm:w-[180px] md:w-[220px]"
            >
              <MovieCard movie={movie} index={index} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
