import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Clock, Star, Calendar, Film, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { fetchMovieDetails } from "@/lib/api"
import { formatRuntime, formatDate } from "@/lib/utils"
import type { MovieDetails } from "@/lib/types"

interface MoviePageProps {
  params: {
    id: string
  }
}

export default async function MoviePage({ params }: MoviePageProps) {
  let movie: MovieDetails

  try {
    movie = await fetchMovieDetails(params.id)
  } catch (error) {
    console.error("Error fetching movie details:", error)
    notFound()
  }

  const backdropUrl = movie.backdrop_path ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` : null

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/placeholder.svg?height=750&width=500"

  // Find trailer
  const trailer =
    movie.videos?.results.find(
      (video) => video.site === "YouTube" && video.type === "Trailer" && video.name.toLowerCase().includes("trailer"),
    ) ||
    movie.videos?.results.find((video) => video.site === "YouTube" && video.type === "Trailer") ||
    movie.videos?.results.find((video) => video.site === "YouTube")

  const trailerUrl = trailer ? `https://www.youtube.com/embed/${trailer.key}?autoplay=0&rel=0` : null

  // Get director
  const director = movie.credits?.crew.find((person) => person.job === "Director")

  // Get top cast (limit to 6)
  const topCast = movie.credits?.cast.slice(0, 6) || []

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <SiteHeader />

      {/* Hero Section with Backdrop */}
      <div className="relative w-full h-[50vh] md:h-[70vh]">
        {backdropUrl ? (
          <>
            <Image src={backdropUrl || "/placeholder.svg"} alt={movie.title} fill priority className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-background to-transparent" />
          </>
        ) : (
          <div className="absolute inset-0 bg-muted/50" />
        )}
      </div>

      {/* Movie Details */}
      <div className="container relative px-4 mx-auto -mt-40 md:-mt-60">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-4">
          {/* Poster */}
          <div className="hidden md:block">
            <div className="sticky top-20 overflow-hidden rounded-lg glass-card glass-card-dark animate-fade-in">
              <Image
                src={posterUrl || "/placeholder.svg"}
                alt={movie.title}
                width={500}
                height={750}
                className="object-cover w-full"
              />
            </div>
          </div>

          {/* Details */}
          <div className="md:col-span-2 lg:col-span-3">
            <div className="space-y-6 animate-fade-in">
              {/* Title and Basic Info */}
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">{movie.title}</h1>

                {movie.tagline && <p className="text-xl italic text-muted-foreground">{movie.tagline}</p>}

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  {movie.release_date && (
                    <div className="flex items-center gap-1 text-sm">
                      <Calendar className="w-4 h-4" />
                      {formatDate(movie.release_date)}
                    </div>
                  )}

                  {movie.runtime > 0 && (
                    <div className="flex items-center gap-1 text-sm">
                      <Clock className="w-4 h-4" />
                      {formatRuntime(movie.runtime)}
                    </div>
                  )}

                  <div className="flex items-center gap-1 text-sm">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    {movie.vote_average.toFixed(1)} ({movie.vote_count.toLocaleString()} votes)
                  </div>
                </div>

                {/* Genres */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {movie.genres.map((genre) => (
                    <Link
                      key={genre.id}
                      href={`/discover?genre=${genre.id}`}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
                    >
                      {genre.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3">
                <Button className="gap-2 animate-slide-up">
                  <Heart className="w-5 h-5" />
                  Add to Favorites
                </Button>
                <Button variant="outline" className="gap-2 animate-slide-up">
                  <Film className="w-5 h-5" />
                  Add to Watchlist
                </Button>
              </div>

              {/* Overview */}
              <div className="p-6 space-y-4 rounded-lg glass-card glass-card-dark">
                <h2 className="text-2xl font-bold">Overview</h2>
                <p className="text-lg">{movie.overview}</p>

                <div className="grid grid-cols-1 gap-4 pt-4 sm:grid-cols-2">
                  {director && (
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Director</h3>
                      <p>{director.name}</p>
                    </div>
                  )}

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
                    <p>{movie.status}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Original Language</h3>
                    <p>{new Intl.DisplayNames(["en"], { type: "language" }).of(movie.original_language)}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Budget</h3>
                    <p>{movie.budget ? `$${movie.budget.toLocaleString()}` : "N/A"}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Revenue</h3>
                    <p>{movie.revenue ? `$${movie.revenue.toLocaleString()}` : "N/A"}</p>
                  </div>
                </div>
              </div>

              {/* Trailer */}
              {trailerUrl && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">Trailer</h2>
                  <div className="overflow-hidden rounded-lg aspect-video">
                    <iframe
                      src={trailerUrl}
                      title={`${movie.title} Trailer`}
                      width="100%"
                      height="100%"
                      allowFullScreen
                      className="border-0"
                    ></iframe>
                  </div>
                </div>
              )}

              {/* Cast */}
              {topCast.length > 0 && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">Top Cast</h2>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6">
                    {topCast.map((person) => (
                      <Link
                        key={person.id}
                        href={`/person/${person.id}`}
                        className="overflow-hidden transition-transform rounded-lg glass-card glass-card-dark hover:scale-105"
                      >
                        <div className="relative aspect-[2/3]">
                          {person.profile_path ? (
                            <Image
                              src={`https://image.tmdb.org/t/p/w300${person.profile_path}`}
                              alt={person.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="flex items-center justify-center w-full h-full bg-muted">
                              <span className="text-muted-foreground">No Image</span>
                            </div>
                          )}
                        </div>
                        <div className="p-3">
                          <h3 className="font-medium line-clamp-1">{person.name}</h3>
                          <p className="text-xs text-muted-foreground line-clamp-1">{person.character}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Similar Movies */}
              {movie.similar?.results.length > 0 && (
                <div className="pt-8">
                  <h2 className="text-2xl font-bold mb-4">Similar Movies</h2>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {movie.similar.results.slice(0, 10).map((similarMovie) => (
                      <Link
                        key={similarMovie.id}
                        href={`/movie/${similarMovie.id}`}
                        className="overflow-hidden transition-transform rounded-lg glass-card glass-card-dark hover:scale-105"
                      >
                        <div className="relative aspect-[2/3]">
                          {similarMovie.poster_path ? (
                            <Image
                              src={`https://image.tmdb.org/t/p/w300${similarMovie.poster_path}`}
                              alt={similarMovie.title}
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
                            {similarMovie.vote_average.toFixed(1)}
                          </div>
                        </div>
                        <div className="p-3">
                          <h3 className="font-medium line-clamp-1">{similarMovie.title}</h3>
                          <p className="text-xs text-muted-foreground">
                            {similarMovie.release_date ? new Date(similarMovie.release_date).getFullYear() : ""}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

