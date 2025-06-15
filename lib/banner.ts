const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL
if (!baseURL) {
  throw new Error("Missing NEXT_PUBLIC_API_BASE_URL in environment variables")
}

// === Types ===

export interface StrapiImageFormat {
  ext: string
  url: string
  hash: string
  mime: string
  name: string
  path: string | null
  size: number
  width: number
  height: number
  sizeInBytes?: number
}

export interface StrapiImage {
  id: number
  documentId: string
  name: string
  alternativeText: string | null
  caption: string | null
  width: number
  height: number
  formats: {
    thumbnail?: StrapiImageFormat
    small?: StrapiImageFormat
    medium?: StrapiImageFormat
    large?: StrapiImageFormat
  }
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

export interface Banner {
  id: number
  documentId: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  banerImage: StrapiImage
}

export interface BannersResponse {
  data: Banner[]
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

// === API Fetch ===

export async function fetchBanners(): Promise<Banner[]> {
  try {
    const response = await fetch(`${baseURL}/api/banners?populate=*`, {
      next: { revalidate: 3600 },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch banners: ${response.status}`)
    }

    const json: BannersResponse = await response.json()
    return json.data
  } catch (error) {
    console.error("Error fetching banners:", error)
    return []
  }
}

// === Utility ===

export function getBannerImageUrl(image?: StrapiImage): string {
  if (!image) return "/placeholder.svg"

  return (
    image.formats?.large?.url ||
    image.formats?.medium?.url ||
    image.formats?.small?.url ||
    image.url ||
    "/placeholder.svg"
  )
}