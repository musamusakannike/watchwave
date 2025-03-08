import { NextResponse } from "next/server"
import { fetchTrendingMovies } from "@/lib/api"

export async function GET() {
  try {
    const results = await fetchTrendingMovies()
    return NextResponse.json({ results })
  } catch (error) {
    console.error("Error fetching trending movies:", error)
    return NextResponse.json({ error: "Failed to fetch trending movies" }, { status: 500 })
  }
}

