// Strapi API response interfaces - Updated to match actual response
export interface StrapiImage {
  id: number
  documentId: string
  name: string
  alternativeText: string | null
  caption: string | null
  width: number
  height: number
  formats?: {
    thumbnail?: { url: string; width: number; height: number }
    small?: { url: string; width: number; height: number }
    medium?: { url: string; width: number; height: number }
    large?: { url: string; width: number; height: number }
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

export interface StrapiHomeItem {
  id: number
  documentId: string
  title: string
  subtitle?: string
  buttonText?: string
  description?: string
  link?: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  image?: StrapiImage | null
}

export interface StrapiHomeResponse {
  data: StrapiHomeItem[]
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export interface CategoryCard {
  id: string
  title: string
  subtitle: string
  buttonText: string
  image: string
  link: string
  description: string
}

// Helper function to get image URL from Strapi response - Updated with better URL handling
function getStrapiImageUrl(imageData: StrapiImage | null): string {
  if (!imageData?.url) {
    console.log("No image data found, using placeholder")
    return "/placeholder.svg?height=600&width=400"
  }

  const url = imageData.url

  // If URL is already absolute, return as is
  if (url.startsWith("http")) {
    console.log("Using absolute URL:", url)
    return url
  }

  // If URL starts with /, it's relative to the media domain
  if (url.startsWith("/")) {
    const fullUrl = `https://superb-freedom-1e5f2d4367.media.strapiapp.com${url}`
    console.log("Constructed full URL:", fullUrl)
    return fullUrl
  }

  // Otherwise, prepend the full media domain
  const fullUrl = `https://superb-freedom-1e5f2d4367.media.strapiapp.com/${url}`
  console.log("Constructed full URL with slash:", fullUrl)
  return fullUrl
}

// Function to fetch home page data from Strapi API - Updated
export async function getHomePageData(): Promise<CategoryCard[]> {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000)

    const response = await fetch("https://superb-freedom-1e5f2d4367.strapiapp.com/api/homes?populate=*", {
      cache: "no-store",
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
      },
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`)
    }

    const data: StrapiHomeResponse = await response.json()

    // Transform Strapi data to CategoryCard format - Updated to match actual response structure
    const categories: CategoryCard[] = data.data.map((item) => ({
      id: item.documentId || item.id.toString(),
      title: item.title || "Untitled",
      subtitle: item.subtitle || "Premium Collection",
      buttonText: item.buttonText || "Shop Now",
      image: getStrapiImageUrl(item.image || null),
      link: item.link || "/ListProducts",
      description:
        item.description || `Discover our premium ${item.title?.toLowerCase()} collection made with finest materials`,
    }))

    console.log("Fetched categories:", categories)
    return categories
  } catch (error) {
    console.error("Failed to fetch home page data:", error)

    // Check if it's a timeout/abort error
    if (error instanceof Error && error.name === "AbortError") {
      console.error("Request timed out - API may be slow or unavailable")
    }

    // Return fallback data with the polo shirt card
    return [
      {
        id: "polo-shirts-fallback",
        title: "POLO SHIRTS",
        subtitle: "Premium Collection",
        buttonText: "Shop Now",
        image: "/placeholder.svg?height=600&width=400&text=Polo+Shirts",
        link: "/ListProducts",
        description: "Discover our premium polo shirt collection made with finest materials",
      },
      {
        id: "formal-shirts-fallback",
        title: "FORMAL SHIRTS",
        subtitle: "Business Collection",
        buttonText: "Explore",
        image: "/placeholder.svg?height=600&width=400&text=Formal+Shirts",
        link: "/formal-shirts",
        description: "Professional formal shirts for the modern workplace",
      },
      {
        id: "casual-wear-fallback",
        title: "CASUAL WEAR",
        subtitle: "Everyday Comfort",
        buttonText: "Browse",
        image: "/placeholder.svg?height=600&width=400&text=Casual+Wear",
        link: "/casual-wear",
        description: "Comfortable casual wear for your daily lifestyle",
      },
    ]
  }
}

// Function to get featured category (first one or polo shirts) - Updated
export async function getFeaturedCategory(): Promise<CategoryCard | null> {
  try {
    const categories = await getHomePageData()

    // Try to find polo shirts first, otherwise return the first category
    const poloShirts = categories.find(
      (cat) => cat.title.toLowerCase().includes("polo") || cat.link.includes("ListProducts"),
    )

    return poloShirts || categories[0] || null
  } catch (error) {
    console.error("Failed to get featured category:", error)
    return null
  }
}
