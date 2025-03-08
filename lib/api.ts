const API_KEY = "b0c0f500a0ad17caed12cc738bf37518"
const BASE_URL = "https://api.themoviedb.org/3"

// Helper function to make API requests
async function fetchFromTMDB(endpoint: string, params: Record<string, string> = {}) {
  const queryParams = new URLSearchParams({
    api_key: API_KEY,
    ...params,
  })

  const url = `${BASE_URL}${endpoint}?${queryParams}`

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`TMDB API error: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

// Movies
export async function fetchTrendingMovies() {
  const data = await fetchFromTMDB("/trending/movie/day")
  return data.results
}

export async function fetchPopularMovies() {
  const data = await fetchFromTMDB("/movie/popular")
  return data.results
}

export async function fetchTopRatedMovies() {
  const data = await fetchFromTMDB("/movie/top_rated")
  return data.results
}

export async function fetchUpcomingMovies() {
  const data = await fetchFromTMDB("/movie/upcoming")
  return data.results
}

export async function fetchNowPlayingMovies() {
  const data = await fetchFromTMDB("/movie/now_playing")
  return data.results
}

export async function fetchMovieDetails(id: string) {
  return fetchFromTMDB(`/movie/${id}`, {
    append_to_response: "videos,credits,similar,recommendations,reviews",
  })
}

// TV Shows
export async function fetchTrendingTVShows() {
  const data = await fetchFromTMDB("/trending/tv/day")
  return data.results
}

export async function fetchPopularTVShows() {
  const data = await fetchFromTMDB("/tv/popular")
  return data.results
}

export async function fetchTopRatedTVShows() {
  const data = await fetchFromTMDB("/tv/top_rated")
  return data.results
}

export async function fetchAiringTodayTVShows() {
  const data = await fetchFromTMDB("/tv/airing_today")
  return data.results
}

export async function fetchOnTheAirTVShows() {
  const data = await fetchFromTMDB("/tv/on_the_air")
  return data.results
}

export async function fetchTVDetails(id: string) {
  return fetchFromTMDB(`/tv/${id}`, {
    append_to_response: "videos,credits,similar,recommendations,reviews",
  })
}

// Search
export async function searchMulti(query: string) {
  const data = await fetchFromTMDB("/search/multi", { query })
  return data.results
}

export async function searchMovies(query: string) {
  const data = await fetchFromTMDB("/search/movie", { query })
  return data.results
}

export async function searchTVShows(query: string) {
  const data = await fetchFromTMDB("/search/tv", { query })
  return data.results
}

// Genres
export async function fetchMovieGenres() {
  const data = await fetchFromTMDB("/genre/movie/list")
  return data.genres
}

export async function fetchTVGenres() {
  const data = await fetchFromTMDB("/genre/tv/list")
  return data.genres
}

// Discover
export async function discoverMovies(params: Record<string, string> = {}) {
  const data = await fetchFromTMDB("/discover/movie", params)
  return data.results
}

export async function discoverTVShows(params: Record<string, string> = {}) {
  const data = await fetchFromTMDB("/discover/tv", params)
  return data.results
}

// Person
export async function fetchPersonDetails(id: string) {
  return fetchFromTMDB(`/person/${id}`, {
    append_to_response: "movie_credits,tv_credits,images",
  })
}

