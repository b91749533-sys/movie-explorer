"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Bookmark, Heart, Play } from "lucide-react";
import { Movie, getTMDBImageUrl } from "@/lib/tmdb";
import RatingBadge from "./RatingBadge";

interface MovieCardProps {
  movie: Movie;
  index?: number;
}

export default function MovieCard({ movie, index = 0 }: MovieCardProps) {
  const imageUrl = getTMDBImageUrl(movie.poster_path, "w500");
  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "N/A";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.4) }}
      whileHover={{ y: -8 }}
      className="group relative flex flex-col rounded-xl overflow-hidden bg-white/5 border border-white/5 hover:border-rose-500/30 hover:box-glow transition-all duration-300"
    >
      {/* Aspect ratio box for standard poster size */}
      <Link href={`/movie/${movie.id}`} className="relative aspect-[2/3] w-full overflow-hidden block">
        <Image
          src={imageUrl}
          alt={movie.title}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Backdrop Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <div className="flex gap-2 mb-3 justify-center">
            {/* Quick Actions (Mocked for Phase 1) */}
            <button
              onClick={(e) => {
                e.preventDefault();
                // To be wired to database in later phases
              }}
              className="p-2 rounded-full bg-white/10 hover:bg-rose-600 text-white transition-colors duration-200"
              title="Add to Watchlist"
            >
              <Bookmark className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                // To be wired to database in later phases
              }}
              className="p-2 rounded-full bg-white/10 hover:bg-rose-600 text-white transition-colors duration-200"
              title="Add to Favorites"
            >
              <Heart className="w-4 h-4" />
            </button>
            <div className="p-2 rounded-full bg-rose-600 text-white" title="View details">
              <Play className="w-4 h-4 fill-current ml-0.5" />
            </div>
          </div>
        </div>

        {/* Floating Rating Badge */}
        <div className="absolute top-3 left-3 z-10">
          <RatingBadge rating={movie.vote_average} size="sm" />
        </div>
      </Link>

      {/* Info details */}
      <div className="p-3.5 flex flex-col flex-grow bg-gradient-to-b from-transparent to-[#0d0b21]/20">
        <span className="text-gray-500 text-[10px] font-bold tracking-wider uppercase mb-1">
          {releaseYear}
        </span>
        <Link href={`/movie/${movie.id}`}>
          <h3 className="font-semibold text-sm text-white line-clamp-1 group-hover:text-rose-400 transition-colors duration-200">
            {movie.title}
          </h3>
        </Link>
      </div>
    </motion.div>
  );
}
