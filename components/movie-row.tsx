"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import type { Movie, TV } from "@/lib/types"

interface MovieRowProps {
  title: string
  endpoint: string
}

export function MovieRow({ title, endpoint }: MovieRowProps) {
  const [items, setItems] = useState<(Movie | TV)[]>([])
  const [loading, setLoading] = useState(true)
  const [scrollPosition, setScrollPosition] = useState(0)

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(endpoint)
        const data = await response.json()
        setItems(data.results || [])
      } catch (error) {
        console.error(`Failed to fetch ${title}:`, error)
      } finally {
        setLoading(false)
      }
    }

    fetchItems()
  }, [endpoint, title])

  const handleScroll = (direction: "left" | "right") => {
    const container = document.getElementById(`scroll-container-${title.replace(/\s+/g, "-")}`)
    if (!container) return

    const scrollAmount = 320 // Approximate width of a card + gap
    const maxScroll = container.scrollWidth - container.clientWidth

    const newPosition =
      direction === "right"
        ? Math.min(scrollPosition + scrollAmount, maxScroll)
        : Math.max(scrollPosition - scrollAmount, 0)

    container.scrollTo({
      left: newPosition,
      behavior: "smooth",
    })

    setScrollPosition(newPosition)
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="w-full h-64 rounded-lg" />
                <Skeleton className="w-full h-4" />
                <Skeleton className="w-2/3 h-4" />
              </div>
            ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{title}</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            onClick={() => handleScroll("left")}
            disabled={scrollPosition <= 0}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button variant="outline" size="icon" className="rounded-full" onClick={() => handleScroll("right")}>
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div
        id={`scroll-container-${title.replace(/\s+/g, "-")}`}
        className="flex gap-4 pb-4 overflow-x-auto scrollbar-hide"
        style={{ scrollbarWidth: "none" }}
      >
        {items.map((item) => (
          <MovieCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}

function MovieCard({ item }: { item: Movie | TV }) {
  const isMovie = "title" in item
  const title = isMovie ? item.title : item.name
  const releaseDate = isMovie ? item.release_date : item.first_air_date
  const posterPath = item.poster_path
  const year = releaseDate ? new Date(releaseDate).getFullYear() : ""
  const rating = item.vote_average
  const mediaType = isMovie ? "movie" : "tv"

  return (
    <Link
      href={`/${mediaType}/${item.id}`}
      className="flex-shrink-0 w-[160px] sm:w-[200px] transition-transform duration-300 hover:scale-105"
    >
      <div
        className={cn(
          "rounded-lg overflow-hidden glass-card glass-card-dark animate-fade-in",
          "transition-all duration-300 hover:shadow-xl",
        )}
      >
        <div className="relative aspect-[2/3]">
          {posterPath ? (
            <Image
              src={`https://image.tmdb.org/t/p/w500${posterPath}`}
              alt={title || "Movie poster"}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-muted">
              <span className="text-muted-foreground">No Image</span>
            </div>
          )}
          <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-background/80 backdrop-blur-sm">
            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
            {rating?.toFixed(1)}
          </div>
        </div>
        <div className="p-3">
          <h3 className="font-medium line-clamp-1">{title}</h3>
          <p className="text-xs text-muted-foreground">{year}</p>
        </div>
      </div>
    </Link>
  )
}

