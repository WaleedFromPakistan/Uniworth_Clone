import { getProducts } from "@/lib/api"
import ProductDetailClient from "@/components/product-detail-client"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Suspense } from "react"
import type { Product } from "@/types/product"

export default async function ProductDetailPage({ params }: { params: { documentId: string } }) {
  const { documentId } = params

  try {
    // Fetch all products
    const productsResponse = await getProducts()
    const products = productsResponse.data || []

    // Find the product with matching documentId
    let product: Product | null = null

    // Search for product with matching documentId
    for (const p of products) {
      // Check both formats - direct documentId or nested in attributes
      if (
        p.documentId === documentId ||
        p.id.toString() === documentId ||
        (p && p.documentId === documentId)
      ) {
        product = p
        break
      }
    }

    if (!product) {
      return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h1 className="text-2xl font-medium text-gray-900">Product not found</h1>
          <p className="mt-2 text-gray-500">The product you are looking for does not exist or has been removed.</p>
          <Link href="/" className="mt-6 inline-flex items-center text-gray-600 hover:text-gray-900">
            <ArrowLeft size={16} className="mr-2" />
            Back to products
          </Link>
        </div>
      )
    }

    return (
      <Suspense fallback={<ProductDetailSkeleton />}>
        <ProductDetailClient product={product} />
      </Suspense>
    )
  } catch (error) {
    console.error("Error fetching product:", error)
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-2xl font-medium text-gray-900">Something went wrong</h1>
        <p className="mt-2 text-gray-500">We could not load the product information. Please try again later.</p>
        <Link href="/" className="mt-6 inline-flex items-center text-gray-600 hover:text-gray-900">
          <ArrowLeft size={16} className="mr-2" />
          Back to products
        </Link>
      </div>
    )
  }
}

// Loading skeleton for product detail page
function ProductDetailSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="grid grid-cols-4 gap-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="aspect-[3/4] bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex gap-2 mb-8">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-12 h-12 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
