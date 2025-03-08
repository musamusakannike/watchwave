import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format runtime from minutes to hours and minutes
export function formatRuntime(minutes: number): string {
  if (!minutes) return "N/A"

  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60

  if (hours === 0) return `${remainingMinutes}m`
  if (remainingMinutes === 0) return `${hours}h`

  return `${hours}h ${remainingMinutes}m`
}

// Format date to readable format
export function formatDate(dateString: string): string {
  if (!dateString) return "N/A"

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  }

  return new Date(dateString).toLocaleDateString("en-US", options)
}

// Get YouTube trailer URL
export function getTrailerUrl(videos: any[]): string | null {
  if (!videos || videos.length === 0) return null

  // First try to find an official trailer
  const trailer = videos.find(
    (video) =>
      video.site === "YouTube" &&
      (video.type === "Trailer" || video.type === "Teaser") &&
      video.name.toLowerCase().includes("trailer"),
  )

  // If no official trailer, get any trailer or teaser
  const anyTrailer = videos.find(
    (video) => video.site === "YouTube" && (video.type === "Trailer" || video.type === "Teaser"),
  )

  // If no trailer at all, get any YouTube video
  const anyVideo = videos.find((video) => video.site === "YouTube")

  const video = trailer || anyTrailer || anyVideo

  return video ? `https://www.youtube.com/watch?v=${video.key}` : null
}

// Local storage helpers
export function getFromLocalStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === "undefined") return defaultValue

  const stored = localStorage.getItem(key)
  if (!stored) return defaultValue

  try {
    return JSON.parse(stored) as T
  } catch (error) {
    console.error(`Error parsing stored value for key "${key}":`, error)
    return defaultValue
  }
}

export function setToLocalStorage<T>(key: string, value: T): void {
  if (typeof window === "undefined") return

  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error(`Error storing value for key "${key}":`, error)
  }
}

