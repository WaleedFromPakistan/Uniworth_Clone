'use client'

import dynamic from 'next/dynamic'
import type { Product } from '@/types/product'
import ProductDetailSkeleton from './ProductDetailSkeleton' // adjust path if needed

// Dynamically load the client component with fallback skeleton
const ProductDetailClient = dynamic(() => import('@/components/product-detail-client'), {
  loading: () => <ProductDetailSkeleton />,
  ssr: false,
})

export default function ProductDetailWrapper({ product }: { product: Product }) {
  return <ProductDetailClient product={product} />
}
