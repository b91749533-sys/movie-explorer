"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, Info, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Movie, getTMDBImageUrl } from "@/lib/tmdb";
import RatingBadge from "./RatingBadge";

interface HeroSectionProps {
  movies: Movie[];
}

export default function HeroSection({ movies }: HeroSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const featured = movies.slice(0, 4); // Take top 4 trending movies

  useEffect(() => {
    if (featured.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featured.length);
    }, 8000); // Rotate every 8 seconds
    return () => clearInterval(timer);
  }, [featured.length]);

  if (!featured || featured.length === 0) return null;

  const currentMovie = featured[currentIndex];
  const backdropUrl = getTMDBImageUrl(currentMovie.backdrop_path, "original");
  const releaseYear = currentMovie.release_date
    ? new Date(currentMovie.release_date).getFullYear()
    : "N/A";

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + featured.length) % featured.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % featured.length);
  };

  return (
    <div className="relative w-full h-[70vh] sm:h-[80vh] md:h-[85vh] lg:h-[90vh] overflow-hidden bg-black">
      {/* Background Backdrops Carousel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentMovie.id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 w-full h-full"
        >
          <Image
            src={backdropUrl}
            alt={currentMovie.title}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-65 md:opacity-75"
          />
        </motion.div>
      </AnimatePresence>

      {/* Cinematic Vignette Overlay Gradients */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#030014] via-[#030014]/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-transparent to-[#030014]/25" />

      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-center">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
          <div className="max-w-2xl space-y-4 md:space-y-6">
            {/* Badges Info */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center gap-3 flex-wrap"
            >
              <RatingBadge rating={currentMovie.vote_average} size="md" />
              <span className="text-gray-300 text-sm font-semibold tracking-wider bg-white/10 backdrop-blur-md px-3 py-1 rounded-xl border border-white/10">
                {releaseYear}
              </span>
              <span className="text-rose-400 text-xs font-bold uppercase tracking-widest bg-rose-500/10 border border-rose-500/20 px-3 py-1 rounded-xl box-glow">
                Trending # {currentIndex + 1}
              </span>
            </motion.div>

            {/* Glowing Movie Title */}
            <AnimatePresence mode="wait">
              <motion.h1
                key={currentMovie.id}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -25 }}
                transition={{ duration: 0.5 }}
                className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-tight drop-shadow-xl text-glow-primary"
              >
                {currentMovie.title}
              </motion.h1>
            </AnimatePresence>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-gray-300 text-sm sm:text-base md:text-lg line-clamp-3 md:line-clamp-4 leading-relaxed max-w-xl text-shadow"
            >
              {currentMovie.overview}
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-center gap-4 flex-wrap pt-2"
            >
              <Link href={`/movie/${currentMovie.id}?play=true`}>
                <button className="px-6 py-3.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm tracking-wider flex items-center gap-2 transition-all duration-300 cursor-pointer box-glow hover:scale-105 active:scale-95">
                  <Play className="w-4.5 h-4.5 fill-current" />
                  PLAY TRAILER
                </button>
              </Link>
              <Link href={`/movie/${currentMovie.id}`}>
                <button className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-sm tracking-wider flex items-center gap-2 border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer backdrop-blur-md hover:scale-105 active:scale-95">
                  <Info className="w-4.5 h-4.5" />
                  MORE INFO
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Manual Slide Selectors (Dots & Chevrons) */}
      <div className="absolute right-4 md:right-8 bottom-8 z-30 flex items-center gap-3">
        <button
          onClick={handlePrev}
          className="p-2 rounded-xl bg-black/40 border border-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors backdrop-blur-md cursor-pointer"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div className="flex gap-2">
          {featured.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentIndex ? "w-6 bg-rose-500 box-glow" : "w-1.5 bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        <button
          onClick={handleNext}
          className="p-2 rounded-xl bg-black/40 border border-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors backdrop-blur-md cursor-pointer"
          aria-label="Next slide"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
