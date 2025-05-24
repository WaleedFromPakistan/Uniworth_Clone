import type { ProductsResponse, Product } from "@/types/product"

// Function to fetch products with guaranteed fallback
export async function getProducts(): Promise<ProductsResponse> {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000) // Increased to 10 seconds

    const response = await fetch("https://superb-freedom-1e5f2d4367.strapiapp.com/api/products?populate=*", {
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

    const data = await response.json()

    // Check if the response matches the expected format
    if (data && data.data) {
      return data
    } else if (data && Array.isArray(data)) {
      // Handle alternative format where data is directly an array
      return {
        data: data,
        meta: {
          pagination: {
            page: 1,
            pageSize: data.length,
            pageCount: 1,
            total: data.length,
          },
        },
      }
    }

    throw new Error("Invalid API response format")
  } catch (error) {
    console.error("Failed to fetch products:", error)

    // Check if it's a timeout/abort error
    if (error instanceof Error && error.name === "AbortError") {
      console.error("Request timed out - API may be slow or unavailable")
    }

    // Return minimal mock structure with some sample data for development
    return {
      data: [
        {
          id: 1,
          documentId: "sample-1",
          attributes: {
            itemName: "Classic Polo Shirt",
            description:
              "Our polo shirt is the go-to choice for all seasons and an absolute wardrobe essential. Its pique fabric gives it a naturally mechanical stretch for a soft wrinkle-free look, also making it durable and comfortable to wear for long hours. It is suitable to style with a variety of combinations and layers.",
            price: "Rs.3,580.00",
            oldPrice: "Rs.4,475.00",
            size: "M",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            publishedAt: new Date().toISOString(),
            image: {
              data: [
                {
                  id: 1,
                  name: "polo-shirt.jpg",
                  alternativeText: "Classic Polo Shirt",
                  caption: null,
                  width: 800,
                  height: 1000,
                  formats: {
                    thumbnail: {
                      name: "thumbnail_polo-shirt.jpg",
                      hash: "thumbnail_polo",
                      ext: ".jpg",
                      mime: "image/jpeg",
                      path: null,
                      width: 156,
                      height: 195,
                      size: 8.5,
                      url: "/placeholder.svg?height=195&width=156",
                    },
                    small: {
                      name: "small_polo-shirt.jpg",
                      hash: "small_polo",
                      ext: ".jpg",
                      mime: "image/jpeg",
                      path: null,
                      width: 400,
                      height: 500,
                      size: 25.2,
                      url: "/placeholder.svg?height=500&width=400",
                    },
                  },
                  hash: "polo_shirt",
                  ext: ".jpg",
                  mime: "image/jpeg",
                  size: 85.6,
                  url: "/placeholder.svg?height=1000&width=800",
                  previewUrl: null,
                  provider: "local",
                  provider_metadata: null,
                  createdAt: new Date().toISOString(),
                  updatedAt: new Date().toISOString(),
                  publishedAt: new Date().toISOString(),
                },
              ],
            },
          },
        },
      ],
      meta: {
        pagination: {
          page: 1,
          pageSize: 25,
          pageCount: 1,
          total: 1,
        },
      },
    }
  }
}

// Function to fetch a single product by ID
export async function getProductById(id: number): Promise<Product | null> {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 3000)

    const response = await fetch(`http://localhost:1337/api/products/${id}?populate=*`, {
      cache: "no-store",
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const data = await response.json()

    // Handle both API response formats
    if (data && data.data) {
      // Standard Strapi format
      return data.data
    } else if (data && data.id) {
      // Alternative format where product is directly returned
      return data
    }

    throw new Error("Invalid API response format")
  } catch (error) {
    console.error(`Failed to fetch product with ID ${id}:`, error)
    return null
  }
}
