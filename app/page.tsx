import { Suspense } from "react"
import { HeroBanner } from "@/components/hero-banner"
import { MovieRow } from "@/components/movie-row"
import { SiteHeader } from "@/components/site-header"
import { Skeleton } from "@/components/ui/skeleton"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <SiteHeader />
      <main>
        <Suspense fallback={<div className="h-[60vh] bg-muted/50" />}>
          <HeroBanner />
        </Suspense>

        <div className="container px-4 py-8 mx-auto space-y-12">
          <Suspense fallback={<MovieRowSkeleton title="Trending Movies" />}>
            <MovieRow title="Trending Movies" endpoint="/api/movies/trending" />
          </Suspense>

          <Suspense fallback={<MovieRowSkeleton title="Popular Movies" />}>
            <MovieRow title="Popular Movies" endpoint="/api/movies/popular" />
          </Suspense>

          <Suspense fallback={<MovieRowSkeleton title="Upcoming Movies" />}>
            <MovieRow title="Upcoming Movies" endpoint="/api/movies/upcoming" />
          </Suspense>

          <Suspense fallback={<MovieRowSkeleton title="Top Rated Movies" />}>
            <MovieRow title="Top Rated Movies" endpoint="/api/movies/top-rated" />
          </Suspense>

          <Suspense fallback={<MovieRowSkeleton title="Popular TV Shows" />}>
            <MovieRow title="Popular TV Shows" endpoint="/api/tv/popular" />
          </Suspense>
        </div>
      </main>
    </div>
  )
}

function MovieRowSkeleton({ title }: { title: string }) {
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

