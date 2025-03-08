import { NextResponse } from "next/server"
import { fetchUpcomingMovies } from "@/lib/api"

export async function GET() {
  try {
    const results = await fetchUpcomingMovies()
    return NextResponse.json({ results })
  } catch (error) {
    console.error("Error fetching upcoming movies:", error)
    return NextResponse.json({ error: "Failed to fetch upcoming movies" }, { status: 500 })
  }
}

