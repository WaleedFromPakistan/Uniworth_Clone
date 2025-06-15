import type { ImageFormats } from "@/types/product"

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL

export interface HeroImage {
  id: number
  documentId: string
  name: string
  alternativeText: string | null
  caption: string | null
  width: number
  height: number
  formats: ImageFormats
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl: string | null
  provider: string
  provider_metadata: unknown
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export interface Hero {
  id: number
  documentId: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  images: HeroImage[]
}

export interface HeroApiResponse {
  data: Hero[]
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export async function fetchHeroes(): Promise<HeroImage[]> {
  try {
    const response = await fetch(`${baseURL}/api/heroes?populate=images`, {
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch heroes: ${response.status}`)
    }

    const json: HeroApiResponse = await response.json()

    // Flatten all hero images from all hero entries (not just the first one)
    const allImages = json.data.flatMap((hero) => hero.images ?? [])

    return allImages
  } catch (error) {
    console.error("Error fetching heroes:", error)
    return []
  }
}
