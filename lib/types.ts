export interface Movie {
  id: number
  title: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  release_date: string
  vote_average: number
  vote_count: number
  genre_ids: number[]
  popularity: number
  original_language: string
  adult: boolean
  video: boolean
}

export interface TV {
  id: number
  name: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  first_air_date: string
  vote_average: number
  vote_count: number
  genre_ids: number[]
  popularity: number
  original_language: string
  origin_country: string[]
}

export interface Genre {
  id: number
  name: string
}

export interface Video {
  id: string
  key: string
  name: string
  site: string
  type: string
}

export interface Cast {
  id: number
  name: string
  character: string
  profile_path: string | null
}

export interface Crew {
  id: number
  name: string
  job: string
  department: string
  profile_path: string | null
}

export interface Credits {
  cast: Cast[]
  crew: Crew[]
}

export interface Review {
  id: string
  author: string
  content: string
  created_at: string
  url: string
  author_details: {
    name: string
    username: string
    avatar_path: string | null
    rating: number | null
  }
}

export interface MovieDetails extends Movie {
  genres: Genre[]
  runtime: number
  status: string
  tagline: string
  videos: {
    results: Video[]
  }
  credits: Credits
  similar: {
    results: Movie[]
  }
  recommendations: {
    results: Movie[]
  }
  reviews: {
    results: Review[]
  }
}

export interface TVDetails extends TV {
  genres: Genre[]
  episode_run_time: number[]
  number_of_seasons: number
  number_of_episodes: number
  status: string
  tagline: string
  videos: {
    results: Video[]
  }
  credits: Credits
  similar: {
    results: TV[]
  }
  recommendations: {
    results: TV[]
  }
  reviews: {
    results: Review[]
  }
}

