import { NextResponse } from "next/server"
import { fetchPopularMovies } from "@/lib/api"

export async function GET() {
  try {
    const results = await fetchPopularMovies()
    return NextResponse.json({ results })
  } catch (error) {
    console.error("Error fetching popular movies:", error)
    return NextResponse.json({ error: "Failed to fetch popular movies" }, { status: 500 })
  }
}

