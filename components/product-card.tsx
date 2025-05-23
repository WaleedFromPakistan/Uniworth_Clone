"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import type { Product, ProductImage } from "@/types/product"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovering, setIsHovering] = useState(false)

  // Handle both API response formats
  let images: ProductImage[] = []

  if (product.attributes?.image?.data) {
    // Standard Strapi format
    images = product.attributes.image.data
  } else if (product.image) {
    // Alternative format from the API
    images = product.image
  }

  // Get main and hover images with fallbacks
  const mainImage = images[0] || null
  const hoverImage = images[1] || mainImage

  // Get image URL with proper error handling
  const getImageUrl = (image: ProductImage | null) => {
    if (!image) return "/placeholder.svg"

    // Handle different image URL formats
    const url = image.url
    if (!url) return "/placeholder.svg"

    // Return full URL if it's already absolute, otherwise prepend the API base URL
    return url.startsWith("http") || url.startsWith("/placeholder") ? url : `http://localhost:1337${url}`
  }

  // Get product name from either format
  const productName = product.attributes?.itemName || product.itemName || "Unnamed Product"

  // Get product price from either format
  const productPrice = product.attributes?.price || product.price || "N/A"

  // Get product old price from either format
  const productOldPrice = product.attributes?.oldPrice || product.oldPrice || null

  // Get product ID or documentId for the URL
  const productUrlId = product.documentId || product.id || product.documentId || product.id

  // Check if product is on sale
  const isOnSale = !!productOldPrice

  return (
    <Link href={`/products/${productUrlId}`} className="group block">
      <div className="relative bg-white border border-gray-100  h-full rounded-sm overflow-hidden">
        {/* Sale tag */}
        {isOnSale && (
          <div className="absolute top-0 left-3 z-10 bg-red-500 text-white text-xs font-bold py-1 px-2 rotate-[-45deg] translate-x-[-30%] translate-y-[30%] shadow-sm">
            SALE
          </div>
        )}

        {/* Product image container */}
        <div
          className="relative aspect-[4/5] overflow-hidden bg-gray-50"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Main image */}
          <div
            className={`absolute inset-0 transition-opacity duration-300 ${isHovering ? "opacity-0" : "opacity-100"}`}
          >
            <Image
              src={getImageUrl(mainImage) || "/placeholder.svg"}
              alt={productName}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-contain object-center p-4"
              priority={false}
            />
          </div>

          {/* Hover image */}
          {hoverImage && (
            <div
              className={`absolute inset-0 transition-opacity duration-300 ${isHovering ? "opacity-100" : "opacity-0"}`}
            >
              <Image
                src={getImageUrl(hoverImage) || "/placeholder.svg"}
                alt={`${productName} - alternate view`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-contain object-center p-4"
                loading="lazy"
              />
            </div>
          )}

          {/* Quick view overlay */}
          <div
            className={`absolute inset-x-0 bottom-0 bg-black bg-opacity-70 text-white py-2 text-center text-xs font-medium transition-all duration-300 transform ${
              isHovering ? "translate-y-0" : "translate-y-full"
            }`}
          >
            Quick View
          </div>
        </div>

        {/* Product info */}
        <div className="p-3 text-left border-t border-gray-100">
          <h3 className="text-sm text-gray-800 font-medium line-clamp-1 mb-1">{productName}</h3>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-900">{productPrice}</span>
            {productOldPrice && <span className="text-xs text-gray-500 line-through">{productOldPrice}</span>}
          </div>
        </div>
      </div>
    </Link>
  )
}
