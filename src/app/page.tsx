import React from "react";
import {
  getTrendingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  getNowPlayingMovies,
  getGenres,
} from "@/lib/tmdb";
import HomePageClient from "@/components/movie/HomePageClient";

// Force dynamic rendering to ensure fresh data fetching
export const dynamic = "force-dynamic";

export default async function Home() {
  // Fetch data in parallel on the server
  const [
    trending,
    popular,
    topRated,
    upcoming,
    nowPlaying,
    genres,
  ] = await Promise.all([
    getTrendingMovies(),
    getPopularMovies(),
    getTopRatedMovies(),
    getUpcomingMovies(),
    getNowPlayingMovies(),
    getGenres(),
  ]);

  return (
    <HomePageClient
      initialTrending={trending}
      initialPopular={popular}
      initialTopRated={topRated}
      initialUpcoming={upcoming}
      initialNowPlaying={nowPlaying}
      genres={genres}
    />
  );
}
