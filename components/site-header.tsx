"use client"

import type React from "react"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import { Film, Home, Search, TrendingUp, Tv, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/theme-toggle"

export function SiteHeader() {
  const pathname = usePathname()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <Film className="w-6 h-6" />
            <span className="text-xl font-bold">WatchWave</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === "/" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Home
            </Link>
            <Link
              href="/movies"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === "/movies" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Movies
            </Link>
            <Link
              href="/tv"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === "/tv" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              TV Shows
            </Link>
            <Link
              href="/discover"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === "/discover" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Discover
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <form onSubmit={handleSearch} className="relative hidden md:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search movies & TV..."
              className="w-[200px] lg:w-[300px] pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>

          <ThemeToggle />

          <Button variant="ghost" size="icon" className="md:hidden">
            <Search className="w-5 h-5" />
          </Button>

          <Link href="/profile">
            <Button variant="ghost" size="icon">
              <User className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>

      <nav className="md:hidden border-t">
        <div className="container flex items-center justify-between px-4 mx-auto">
          <Link href="/" className="flex flex-col items-center py-2 flex-1">
            <Home className="w-5 h-5" />
            <span className="text-xs">Home</span>
          </Link>
          <Link href="/movies" className="flex flex-col items-center py-2 flex-1">
            <Film className="w-5 h-5" />
            <span className="text-xs">Movies</span>
          </Link>
          <Link href="/tv" className="flex flex-col items-center py-2 flex-1">
            <Tv className="w-5 h-5" />
            <span className="text-xs">TV</span>
          </Link>
          <Link href="/trending" className="flex flex-col items-center py-2 flex-1">
            <TrendingUp className="w-5 h-5" />
            <span className="text-xs">Trending</span>
          </Link>
        </div>
      </nav>
    </header>
  )
}

