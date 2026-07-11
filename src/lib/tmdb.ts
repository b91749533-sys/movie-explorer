export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  vote_count: number;
  release_date: string;
  genre_ids: number[];
  adult: boolean;
  video: boolean;
  popularity: number;
  runtime?: number;
  tagline?: string;
  budget?: number;
  revenue?: number;
  genres?: { id: number; name: string }[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface MovieCredits {
  cast: {
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
    order: number;
  }[];
  crew: {
    id: number;
    name: string;
    job: string;
    profile_path: string | null;
  }[];
}

export interface MovieVideo {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
}

const TMDB_BASE_URL = "https://api.themoviedb.org/3";

// Premium Mock Movies with real TMDB asset paths for elegant fallback
export const MOCK_MOVIES: Movie[] = [
  {
    id: 693134,
    title: "Dune: Part Two",
    overview: "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, he endeavors to prevent a terrible future only he can foresee.",
    poster_path: "/czemb57g5G1k54q268v3zZDX5bF.jpg",
    backdrop_path: "/xOM4Z62K7lhJD6488jVj6qdEv66.jpg",
    vote_average: 8.3,
    vote_count: 4230,
    release_date: "2024-02-27",
    genre_ids: [878, 12],
    adult: false,
    video: false,
    popularity: 980.5,
    runtime: 166,
    tagline: "Long live the fighters.",
    budget: 190000000,
    revenue: 712000000,
    genres: [{ id: 878, name: "Science Fiction" }, { id: 12, name: "Adventure" }]
  },
  {
    id: 27205,
    title: "Inception",
    overview: "Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets, is offered a chance to regain his old life as payment for a task considered to be impossible: \"inception\", the implantation of another person's idea into a target's subconscious.",
    poster_path: "/o04gWNrmaaHYhOI5781IePG1fbs.jpg",
    backdrop_path: "/8Zg0iBSX1hC85vD2V0Eegk2010L.jpg",
    vote_average: 8.4,
    vote_count: 34500,
    release_date: "2010-07-15",
    genre_ids: [878, 28, 12],
    adult: false,
    video: false,
    popularity: 120.4,
    runtime: 148,
    tagline: "Your mind is the scene of the crime.",
    budget: 160000000,
    revenue: 825532764,
    genres: [{ id: 878, name: "Science Fiction" }, { id: 28, name: "Action" }, { id: 12, name: "Adventure" }]
  },
  {
    id: 157336,
    title: "Interstellar",
    overview: "The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage.",
    poster_path: "/gEU2QvJW5afxWjR2kyC4qE3xtfA.jpg",
    backdrop_path: "/xJHokZbljvjC1OHzWvC462nJe96.jpg",
    vote_average: 8.4,
    vote_count: 32000,
    release_date: "2014-11-05",
    genre_ids: [12, 18, 878],
    adult: false,
    video: false,
    popularity: 145.2,
    runtime: 169,
    tagline: "Mankind was born on Earth. It was never meant to die here.",
    budget: 165000000,
    revenue: 675120017,
    genres: [{ id: 12, name: "Adventure" }, { id: 18, name: "Drama" }, { id: 878, name: "Science Fiction" }]
  },
  {
    id: 155,
    title: "The Dark Knight",
    overview: "Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets. The partnership proves to be effective, but they soon find themselves prey to a reign of chaos unleashed by a rising criminal mastermind known to the terrified citizens of Gotham as the Joker.",
    poster_path: "/qJ2tWw3nqRVKNscZ216suZJmC45.jpg",
    backdrop_path: "/nMKdUU7J05yG44F1pS1IrBE0c4a.jpg",
    vote_average: 8.5,
    vote_count: 30800,
    release_date: "2008-07-16",
    genre_ids: [18, 28, 80],
    adult: false,
    video: false,
    popularity: 110.8,
    runtime: 152,
    tagline: "Why So Serious?",
    budget: 185000000,
    revenue: 1004558444,
    genres: [{ id: 18, name: "Drama" }, { id: 28, name: "Action" }, { id: 80, name: "Crime" }]
  },
  {
    id: 324857,
    title: "Spider-Man: Into the Spider-Verse",
    overview: "Struggling to find his place in the world while adjusting to his new school, Brooklyn teenager Miles Morales is bitten by a radioactive spider and develops unique superpowers. After meeting Peter Parker, Miles must learn to harness his abilities to defeat Kingpin, who has opened portals to other dimensions, bringing multiple alternate versions of Spider-Man to his world.",
    poster_path: "/iiIKc62ee4mq2w7j26OV44FS5gV.jpg",
    backdrop_path: "/7d686GZns5wIEGY6mR3xyV5tCj6.jpg",
    vote_average: 8.4,
    vote_count: 14200,
    release_date: "2018-12-06",
    genre_ids: [16, 28, 12, 878],
    adult: false,
    video: false,
    popularity: 88.5,
    runtime: 117,
    tagline: "More than one wears the mask.",
    budget: 90000000,
    revenue: 375540831,
    genres: [{ id: 16, name: "Animation" }, { id: 28, name: "Action" }, { id: 12, name: "Adventure" }]
  },
  {
    id: 19995,
    title: "Avatar",
    overview: "In the 22nd century, a paraplegic Marine is dispatched to the moon Pandora on a unique mission, but becomes torn between following his orders and protecting the world he feels is his home.",
    poster_path: "/kyeqWdyUXW608JVs0Zk2RLfeF6d.jpg",
    backdrop_path: "/vL51688BTUgiu152n3n4R0i4ff1.jpg",
    vote_average: 7.6,
    vote_count: 29800,
    release_date: "2009-12-10",
    genre_ids: [28, 12, 14, 878],
    adult: false,
    video: false,
    popularity: 95.4,
    runtime: 162,
    tagline: "Enter the world.",
    budget: 237000000,
    revenue: 2923706026,
    genres: [{ id: 28, name: "Action" }, { id: 12, name: "Adventure" }, { id: 14, name: "Fantasy" }, { id: 878, name: "Science Fiction" }]
  }
];

export const MOCK_GENRES: Genre[] = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 10770, name: "TV Movie" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" }
];

export const MOCK_CREDITS: Record<number, MovieCredits> = {
  693134: {
    cast: [
      { id: 1190668, name: "Timothée Chalamet", character: "Paul Atreides", profile_path: "/BE7wX6vNrcf908q5vpe0PZcphc.jpg", order: 0 },
      { id: 505710, name: "Zendaya", character: "Chani", profile_path: "/j23887U6tBqK8Z50PZcphc.jpg", order: 1 },
      { id: 113, name: "Rebecca Ferguson", character: "Lady Jessica", profile_path: "/d57X1X6vNrcf908q5vpe0PZcphc.jpg", order: 2 }
    ],
    crew: [
      { id: 2724, name: "Denis Villeneuve", job: "Director", profile_path: "/DenisV.jpg" },
      { id: 282, name: "Hans Zimmer", job: "Original Music Composer", profile_path: "/HansZ.jpg" }
    ]
  }
};

// Helper function to build fetch headers
function getHeaders() {
  const token = process.env.TMDB_READ_ACCESS_TOKEN || process.env.NEXT_PUBLIC_TMDB_READ_ACCESS_TOKEN;
  const apiKey = process.env.TMDB_API_KEY || process.env.NEXT_PUBLIC_TMDB_API_KEY;

  const headers: Record<string, string> = {
    accept: "application/json"
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return { headers, apiKey };
}

export function isTMDBConfigured(): boolean {
  const token = process.env.TMDB_READ_ACCESS_TOKEN || process.env.NEXT_PUBLIC_TMDB_READ_ACCESS_TOKEN;
  const key = process.env.TMDB_API_KEY || process.env.NEXT_PUBLIC_TMDB_API_KEY;
  return !!(token || key);
}

// Fetch helper with Next.js revalidation cache
async function tmdbFetch<T>(endpoint: string, queryParams: Record<string, string | number> = {}): Promise<T> {
  const { headers, apiKey } = getHeaders();
  
  const url = new URL(`${TMDB_BASE_URL}${endpoint}`);
  
  if (apiKey) {
    url.searchParams.append("api_key", apiKey);
  }
  
  Object.entries(queryParams).forEach(([key, val]) => {
    url.searchParams.append(key, val.toString());
  });

  const response = await fetch(url.toString(), {
    headers,
    next: { revalidate: 3600 } // Cache results for 1 hour
  });

  if (!response.ok) {
    throw new Error(`TMDB Fetch failed: ${response.statusText} on ${endpoint}`);
  }

  return response.json() as Promise<T>;
}

// API Exported methods with mock fallback
export async function getTrendingMovies(): Promise<Movie[]> {
  if (!isTMDBConfigured()) return MOCK_MOVIES;
  try {
    const data = await tmdbFetch<{ results: Movie[] }>("/trending/movie/day");
    return data.results;
  } catch (error) {
    console.error("TMDB API Error, falling back to mock:", error);
    return MOCK_MOVIES;
  }
}

export async function getPopularMovies(page = 1): Promise<Movie[]> {
  if (!isTMDBConfigured()) return MOCK_MOVIES;
  try {
    const data = await tmdbFetch<{ results: Movie[] }>("/movie/popular", { page });
    return data.results;
  } catch (error) {
    console.error("TMDB API Error, falling back to mock:", error);
    return MOCK_MOVIES.slice().reverse();
  }
}

export async function getTopRatedMovies(page = 1): Promise<Movie[]> {
  if (!isTMDBConfigured()) return MOCK_MOVIES;
  try {
    const data = await tmdbFetch<{ results: Movie[] }>("/movie/top_rated", { page });
    return data.results;
  } catch (error) {
    console.error("TMDB API Error, falling back to mock:", error);
    return [MOCK_MOVIES[3], MOCK_MOVIES[1], MOCK_MOVIES[2], MOCK_MOVIES[0]];
  }
}

export async function getUpcomingMovies(page = 1): Promise<Movie[]> {
  if (!isTMDBConfigured()) return MOCK_MOVIES;
  try {
    const data = await tmdbFetch<{ results: Movie[] }>("/movie/upcoming", { page });
    return data.results;
  } catch (error) {
    console.error("TMDB API Error, falling back to mock:", error);
    return [MOCK_MOVIES[0], MOCK_MOVIES[4]];
  }
}

export async function getNowPlayingMovies(page = 1): Promise<Movie[]> {
  if (!isTMDBConfigured()) return MOCK_MOVIES;
  try {
    const data = await tmdbFetch<{ results: Movie[] }>("/movie/now_playing", { page });
    return data.results;
  } catch (error) {
    console.error("TMDB API Error, falling back to mock:", error);
    return MOCK_MOVIES;
  }
}

export async function getMovieDetails(id: number): Promise<Movie> {
  if (!isTMDBConfigured()) {
    const found = MOCK_MOVIES.find(m => m.id === id);
    if (!found) throw new Error("Movie not found in mocks");
    return found;
  }
  return tmdbFetch<Movie>(`/movie/${id}`);
}

export async function getMovieCredits(id: number): Promise<MovieCredits> {
  if (!isTMDBConfigured()) {
    return MOCK_CREDITS[id] || {
      cast: [
        { id: 1, name: "Famous Actor", character: "Lead Character", profile_path: null, order: 0 },
        { id: 2, name: "Co-Star Actor", character: "Sidekick", profile_path: null, order: 1 }
      ],
      crew: [
        { id: 3, name: "Great Director", job: "Director", profile_path: null }
      ]
    };
  }
  return tmdbFetch<MovieCredits>(`/movie/${id}/credits`);
}

export async function getMovieVideos(id: number): Promise<MovieVideo[]> {
  if (!isTMDBConfigured()) {
    return [
      {
        id: "mock_video_id",
        key: "dQw4w9WgXcQ", // Rickroll as a classic elegant fallback video
        name: "Official Trailer",
        site: "YouTube",
        type: "Trailer",
        official: true
      }
    ];
  }
  try {
    const data = await tmdbFetch<{ results: MovieVideo[] }>(`/movie/${id}/videos`);
    return data.results.filter(v => v.site === "YouTube" && (v.type === "Trailer" || v.type === "Teaser"));
  } catch {
    return [];
  }
}

export async function getSimilarMovies(id: number): Promise<Movie[]> {
  if (!isTMDBConfigured()) return MOCK_MOVIES.filter(m => m.id !== id);
  try {
    const data = await tmdbFetch<{ results: Movie[] }>(`/movie/${id}/similar`);
    return data.results;
  } catch {
    return MOCK_MOVIES.filter(m => m.id !== id);
  }
}

export async function getMovieRecommendations(id: number): Promise<Movie[]> {
  if (!isTMDBConfigured()) return MOCK_MOVIES.filter(m => m.id !== id);
  try {
    const data = await tmdbFetch<{ results: Movie[] }>(`/movie/${id}/recommendations`);
    return data.results;
  } catch {
    return MOCK_MOVIES.filter(m => m.id !== id);
  }
}

export async function getGenres(): Promise<Genre[]> {
  if (!isTMDBConfigured()) return MOCK_GENRES;
  try {
    const data = await tmdbFetch<{ genres: Genre[] }>("/genre/movie/list");
    return data.genres;
  } catch (error) {
    console.error("TMDB API Error, falling back to mock:", error);
    return MOCK_GENRES;
  }
}

export async function searchMovies(query: string, page = 1): Promise<Movie[]> {
  if (!isTMDBConfigured()) {
    if (!query) return [];
    return MOCK_MOVIES.filter(m => m.title.toLowerCase().includes(query.toLowerCase()));
  }
  try {
    const data = await tmdbFetch<{ results: Movie[] }>("/search/movie", { query, page });
    return data.results;
  } catch (error) {
    console.error("TMDB API Error, falling back to mock:", error);
    return MOCK_MOVIES.filter(m => m.title.toLowerCase().includes(query.toLowerCase()));
  }
}

export function getTMDBImageUrl(path: string | null, size: "w92" | "w154" | "w185" | "w342" | "w500" | "w780" | "original" = "w500"): string {
  if (!path) return "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=500&auto=format&fit=crop"; // Premium placeholder
  return `https://image.tmdb.org/t/p/${size}${path}`;
}
