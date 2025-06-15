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

export interface NewArrivalProduct {
  id: number
  documentId: string
  itemName: string
  price: string
  oldPrice: string
  image: StrapiImage[]
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export interface NewArrivalsResponse {
  data: NewArrivalProduct[]
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
export async function fetchNewArrivals(): Promise<NewArrivalProduct[]> {
  try {
    const response = await fetch(`${baseURL}/api/new-arrivals?populate=*`, {
      next: { revalidate: 3600 },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch new arrivals: ${response.status}`)
    }

    const json: NewArrivalsResponse = await response.json()
    return json.data
  } catch (error) {
    console.error("Error fetching new arrivals:", error)
    return []
  }
}

// === Utilities ===

/**
 * Get the preferred image URL from the first image of the product.
 */
export function getImageUrl(image: StrapiImage | undefined): string {
  if (!image) return "/placeholder.svg"

  // If image has a full absolute URL from Strapi Cloud, use it directly
  return image.formats?.small?.url || image.url || "/placeholder.svg"
}

/**
 * Convert a price string like "Rs.3,995.00" into a number.
 */
export function parsePrice(priceString: string): number {
  return parseFloat(priceString.replace(/Rs\.|,/g, "").trim())
}

/**
 * Calculate the discount percentage between oldPrice and price.
 */
export function calculateDiscount(price: string, oldPrice: string): number {
  const newP = parsePrice(price)
  const oldP = parsePrice(oldPrice)
  if (!oldP || oldP <= newP) return 0
  return Math.round(((oldP - newP) / oldP) * 100)
}
