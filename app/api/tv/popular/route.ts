import { NextResponse } from "next/server"
import { fetchPopularTVShows } from "@/lib/api"

export async function GET() {
  try {
    const results = await fetchPopularTVShows()
    return NextResponse.json({ results })
  } catch (error) {
    console.error("Error fetching popular TV shows:", error)
    return NextResponse.json({ error: "Failed to fetch popular TV shows" }, { status: 500 })
  }
}

