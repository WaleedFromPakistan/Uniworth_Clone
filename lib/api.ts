import type { ProductsResponse, Product } from "@/types/product"

// Function to fetch products with guaranteed fallback
export async function getProducts(): Promise<ProductsResponse> {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 3000)

    const response = await fetch("https://superb-freedom-1e5f2d4367.strapiapp.com/api/products?populate=*", {
      cache: "no-store",
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
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

    // Return minimal mock structure
    return {
      data: [],
      meta: {
        pagination: {
          page: 1,
          pageSize: 25,
          pageCount: 0,
          total: 0,
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

    const response = await fetch(`https://superb-freedom-1e5f2d4367.strapiapp.com/api/products/${id}?populate=*`, {
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
