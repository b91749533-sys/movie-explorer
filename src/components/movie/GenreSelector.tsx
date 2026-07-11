"use client";

import React from "react";
import { motion } from "framer-motion";
import { Genre } from "@/lib/tmdb";

interface GenreSelectorProps {
  genres: Genre[];
  selectedGenreId?: number | null;
  onGenreSelect?: (id: number | null) => void;
}

export default function GenreSelector({
  genres,
  selectedGenreId = null,
  onGenreSelect,
}: GenreSelectorProps) {
  return (
    <div className="space-y-4 px-4 md:px-8">
      <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
        Popular Categories
        <span className="h-1.5 w-1.5 rounded-full bg-rose-500 box-glow" />
      </h2>
      <div className="flex flex-wrap gap-2.5">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onGenreSelect?.(null)}
          className={`px-4.5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider border transition-all duration-350 cursor-pointer ${
            selectedGenreId === null
              ? "bg-rose-600 border-rose-500 text-white box-glow"
              : "bg-white/5 border-white/10 text-gray-300 hover:border-white/20 hover:text-white"
          }`}
        >
          All Genres
        </motion.button>

        {genres.map((genre, index) => {
          const isSelected = selectedGenreId === genre.id;
          return (
            <motion.button
              key={genre.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: Math.min(index * 0.02, 0.3) }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onGenreSelect?.(genre.id)}
              className={`px-4.5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider border transition-all duration-350 cursor-pointer ${
                isSelected
                  ? "bg-rose-600 border-rose-500 text-white box-glow"
                  : "bg-white/5 border-white/10 text-gray-300 hover:border-white/20 hover:text-white"
              }`}
            >
              {genre.name}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
