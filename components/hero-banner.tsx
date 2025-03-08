"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Info, Play, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { fetchTrendingMovies } from "@/lib/api"
import type { Movie } from "@/lib/types"

export function HeroBanner() {
  const [movie, setMovie] = useState<Movie | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getRandomTrendingMovie = async () => {
      try {
        const movies = await fetchTrendingMovies()
        // Get a random movie from the top 10 trending
        const randomMovie = movies[Math.floor(Math.random() * 10)]
        setMovie(randomMovie)
      } catch (error) {
        console.error("Failed to fetch trending movie for banner:", error)
      } finally {
        setLoading(false)
      }
    }

    getRandomTrendingMovie()
  }, [])

  if (loading || !movie) {
    return <div className="h-[60vh] bg-muted/50" />
  }

  const backdropUrl = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`

  return (
    <div className="relative h-[70vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={backdropUrl || "/placeholder.svg"}
          alt={movie.title || movie.name || "Movie backdrop"}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background to-transparent" />
      </div>

      <div className="container relative flex flex-col justify-end h-full px-4 pb-16 mx-auto">
        <div className="max-w-2xl space-y-4 animate-fade-in">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">{movie.title || movie.name}</h1>

          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              <span className="ml-1 font-medium">{movie.vote_average.toFixed(1)}</span>
            </div>
            <div className="text-sm text-muted-foreground">
              {new Date(movie.release_date || movie.first_air_date || "").getFullYear()}
            </div>
          </div>

          <p className="text-lg text-muted-foreground line-clamp-3">{movie.overview}</p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Button className="gap-2 animate-slide-up" size="lg">
              <Play className="w-5 h-5" />
              Watch Trailer
            </Button>
            <Link href={`/movie/${movie.id}`}>
              <Button variant="outline" className="gap-2 animate-slide-up" size="lg">
                <Info className="w-5 h-5" />
                More Info
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

