import dynamic from "next/dynamic"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { getProducts } from "@/lib/api"
//import type { Product } from "@/types/product"

// Dynamically import client component to defer loading
const ProductDetailClient = dynamic(() => import("@/components/product-detail-client"), {
  loading: () => <ProductDetailSkeleton />,
   // If the component is client-only
})

export default async function ProductDetailPage({ params }: { params: { documentId: string } }) {
  const { documentId } = params

  try {
    const productsResponse = await getProducts()
    const products = productsResponse.data || []

    const product = products.find((p) =>
      p.documentId === documentId ||
      p.id.toString() === documentId ||
      (p.attributes && p.documentId === documentId)
    )

    if (!product) return <NotFound />

    return <ProductDetailClient product={product} />
  } catch (error) {
    console.error("Error fetching product:", error)
    return <ErrorPage />
  }
}

// 🔹 Extracted fallback UI components
function NotFound() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
      <h1 className="text-2xl font-medium text-gray-900">Product not found</h1>
      <p className="mt-2 text-gray-500">
        The product you are looking for does not exist or has been removed.
      </p>
      <BackLink />
    </div>
  )
}

function ErrorPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
      <h1 className="text-2xl font-medium text-gray-900">Something went wrong</h1>
      <p className="mt-2 text-gray-500">
        We could not load the product information. Please try again later.
      </p>
      <BackLink />
    </div>
  )
}

function BackLink() {
  return (
    <Link href="/" className="mt-6 inline-flex items-center text-gray-600 hover:text-gray-900">
      <ArrowLeft size={16} className="mr-2" />
      Back to products
    </Link>
  )
}

// ✅ Keep lightweight skeleton with reduced div depth and minimal DOM nodes
function ProductDetailSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-pulse space-y-6">
      <div className="h-4 w-32 bg-gray-200 rounded" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="aspect-[3/4] bg-gray-200 rounded" />
          <div className="grid grid-cols-4 gap-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="aspect-[3/4] bg-gray-200 rounded" />
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <div className="h-8 bg-gray-200 rounded w-3/4" />
          <div className="h-6 bg-gray-200 rounded w-1/4" />
          <div className="h-4 bg-gray-200 rounded w-1/3" />
          <div className="h-24 bg-gray-200 rounded" />
          <div className="h-6 bg-gray-200 rounded w-1/4" />
          <div className="flex gap-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-12 h-12 bg-gray-200 rounded" />
            ))}
          </div>
          <div className="h-12 bg-gray-200 rounded" />
          <div className="space-y-2 border-t border-gray-200 pt-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 rounded" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
