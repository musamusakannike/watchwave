import { NextResponse } from "next/server"
import { fetchTopRatedMovies } from "@/lib/api"

export async function GET() {
  try {
    const results = await fetchTopRatedMovies()
    return NextResponse.json({ results })
  } catch (error) {
    console.error("Error fetching top rated movies:", error)
    return NextResponse.json({ error: "Failed to fetch top rated movies" }, { status: 500 })
  }
}

