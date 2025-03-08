import { Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { Film, Star, Tv } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { Skeleton } from "@/components/ui/skeleton"
import { searchMulti } from "@/lib/api"

interface SearchPageProps {
  searchParams: {
    q?: string
  }
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || ""

  if (!query) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted">
        <SiteHeader />
        <div className="container px-4 py-16 mx-auto text-center">
          <h1 className="text-3xl font-bold">Search Movies & TV Shows</h1>
          <p className="mt-4 text-muted-foreground">
            Enter a search term in the search box above to find movies and TV shows.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <SiteHeader />
      <div className="container px-4 py-8 mx-auto">
        <h1 className="text-3xl font-bold">Search Results for "{query}"</h1>

        <Suspense fallback={<SearchResultsSkeleton />}>
          <SearchResults query={query} />
        </Suspense>
      </div>
    </div>
  )
}

async function SearchResults({ query }: { query: string }) {
  const results = await searchMulti(query)

  if (!results || results.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-muted-foreground">No results found for "{query}". Try a different search term.</p>
      </div>
    )
  }

  // Filter out results without poster or profile path
  const filteredResults = results.filter(
    (item) => (item.media_type === "movie" || item.media_type === "tv") && (item.poster_path || item.backdrop_path),
  )

  return (
    <div className="grid grid-cols-1 gap-6 py-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {filteredResults.map((item) => (
        <SearchResultCard key={item.id} item={item} />
      ))}
    </div>
  )
}

function SearchResultCard({ item }: { item: any }) {
  const isMovie = item.media_type === "movie"
  const title = isMovie ? item.title : item.name
  const releaseDate = isMovie ? item.release_date : item.first_air_date
  const posterPath = item.poster_path || item.backdrop_path
  const year = releaseDate ? new Date(releaseDate).getFullYear() : ""
  const rating = item.vote_average
  const mediaType = isMovie ? "movie" : "tv"

  return (
    <Link
      href={`/${mediaType}/${item.id}`}
      className="overflow-hidden transition-transform rounded-lg glass-card glass-card-dark hover:scale-105 animate-fade-in"
    >
      <div className="relative aspect-[2/3]">
        {posterPath ? (
          <Image
            src={`https://image.tmdb.org/t/p/w500${posterPath}`}
            alt={title || "Poster"}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-muted">
            <span className="text-muted-foreground">No Image</span>
          </div>
        )}
        <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-background/80 backdrop-blur-sm">
          {isMovie ? <Film className="w-3 h-3" /> : <Tv className="w-3 h-3" />}
          <span>{isMovie ? "Movie" : "TV"}</span>
        </div>
        {rating > 0 && (
          <div className="absolute bottom-2 left-2 flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-background/80 backdrop-blur-sm">
            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
            {rating.toFixed(1)}
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-medium line-clamp-1">{title}</h3>
        <p className="text-sm text-muted-foreground">{year}</p>
        <p className="mt-2 text-sm line-clamp-2">{item.overview}</p>
      </div>
    </Link>
  )
}

function SearchResultsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 py-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {Array(8)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="w-full h-80 rounded-lg" />
            <Skeleton className="w-full h-6" />
            <Skeleton className="w-1/3 h-4" />
            <Skeleton className="w-full h-16" />
          </div>
        ))}
    </div>
  )
}

