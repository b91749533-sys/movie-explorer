"use client";

import React, { useState, useMemo } from "react";
import { Movie, Genre } from "@/lib/tmdb";
import HeroSection from "./HeroSection";
import GenreSelector from "./GenreSelector";
import MovieRow from "./MovieRow";
import MovieCard from "./MovieCard";
import { motion, AnimatePresence } from "framer-motion";

interface HomePageClientProps {
  initialTrending: Movie[];
  initialPopular: Movie[];
  initialTopRated: Movie[];
  initialUpcoming: Movie[];
  initialNowPlaying: Movie[];
  genres: Genre[];
}

export default function HomePageClient({
  initialTrending,
  initialPopular,
  initialTopRated,
  initialUpcoming,
  initialNowPlaying,
  genres,
}: HomePageClientProps) {
  const [selectedGenreId, setSelectedGenreId] = useState<number | null>(null);

  // Combine all movies to filter by genre when a genre is selected
  const allFetchedMovies = useMemo(() => {
    const combined = [
      ...initialTrending,
      ...initialPopular,
      ...initialTopRated,
      ...initialUpcoming,
      ...initialNowPlaying,
    ];
    // De-duplicate movies by ID
    const uniqueMap = new Map<number, Movie>();
    combined.forEach((movie) => {
      uniqueMap.set(movie.id, movie);
    });
    return Array.from(uniqueMap.values());
  }, [
    initialTrending,
    initialPopular,
    initialTopRated,
    initialUpcoming,
    initialNowPlaying,
  ]);

  // Filter movies based on selected genre ID
  const filteredMovies = useMemo(() => {
    if (selectedGenreId === null) return [];
    return allFetchedMovies.filter((movie) =>
      movie.genre_ids.includes(selectedGenreId)
    );
  }, [allFetchedMovies, selectedGenreId]);

  return (
    <div className="space-y-12 pb-20">
      {/* 1. Hero Showcase Carousel */}
      <HeroSection movies={initialTrending} />

      {/* 2. Genre Categories Badge Selector */}
      <div className="max-w-7xl mx-auto pt-6">
        <GenreSelector
          genres={genres}
          selectedGenreId={selectedGenreId}
          onGenreSelect={setSelectedGenreId}
        />
      </div>

      {/* 3. Movie Display Section */}
      <div className="max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {selectedGenreId === null ? (
            /* Category Rows Layout */
            <motion.div
              key="rows"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-12"
            >
              <MovieRow title="Trending Today" movies={initialTrending} />
              <MovieRow title="Popular Hits" movies={initialPopular} />
              <MovieRow title="Top Rated Classics" movies={initialTopRated} />
              <MovieRow title="Now Playing in Theaters" movies={initialNowPlaying} />
              <MovieRow title="Highly Anticipated Upcoming" movies={initialUpcoming} />
            </motion.div>
          ) : (
            /* Filtered Genre Grid Layout */
            <motion.div
              key="grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="px-4 md:px-8 space-y-6"
            >
              <div className="flex items-center gap-2">
                <h3 className="text-lg md:text-xl font-semibold text-gray-400">
                  Showing movies in{" "}
                  <span className="text-white font-bold">
                    {genres.find((g) => g.id === selectedGenreId)?.name}
                  </span>
                </h3>
                <span className="text-xs font-bold text-rose-500 bg-rose-500/10 px-2 py-0.5 rounded-md border border-rose-500/20">
                  {filteredMovies.length} found
                </span>
              </div>

              {filteredMovies.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                  {filteredMovies.map((movie, index) => (
                    <MovieCard key={movie.id} movie={movie} index={index} />
                  ))}
                </div>
              ) : (
                /* Empty state for filtered movies */
                <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                    <span className="text-2xl">🎬</span>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-lg font-bold text-white">No Movies Found</h4>
                    <p className="text-gray-400 text-sm max-w-xs">
                      We couldn&apos;t find any cached movies for this genre. Try another category!
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
