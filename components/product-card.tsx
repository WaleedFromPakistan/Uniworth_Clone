"use client"

import { useState, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import type { Product, StrapiImage as ProductImage } from "@/types/product"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovering, setIsHovering] = useState(false)

  const handleMouseEnter = useCallback(() => setIsHovering(true), [])
  const handleMouseLeave = useCallback(() => setIsHovering(false), [])

  const images: ProductImage[] = product.image ?? []
  const mainImage = images[0] ?? null
  const hoverImage = images[1] ?? mainImage

  const getImageUrl = (image: ProductImage | null): string => {
    if (!image?.url) return "/placeholder.svg"
    return image.url.startsWith("http") || image.url.startsWith("/placeholder")
      ? image.url
      : `http://localhost:1337${image.url}`
  }

  const productName = product.itemName ?? "Unnamed Product"
  const productPrice = product.price ?? "N/A"
  const productOldPrice = product.oldPrice ?? null
  const productUrlId = product.documentId ?? product.id.toString()

  const isOnSale = Boolean(productOldPrice)

  return (
    <Link
      href={`/products/${productUrlId}`}
      className="group block"
      aria-label={`View details for ${productName}`}
    >
      <div className="relative bg-white border border-gray-100 h-full rounded-sm overflow-hidden">
        {isOnSale && (
          <div
            aria-label="Sale"
            className="absolute top-0 left-3 z-10 bg-red-500 text-white text-xs font-bold py-1 px-2 rotate-[-45deg] translate-x-[-30%] translate-y-[30%] shadow-sm"
          >
            SALE
          </div>
        )}

        <div
          className="relative aspect-[4/5] overflow-hidden bg-gray-50"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Image
            src={getImageUrl(mainImage)}
            alt={productName}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className={`object-contain object-center p-4 transition-opacity duration-300 ease-in-out ${
              isHovering ? "opacity-0" : "opacity-100"
            }`}
            loading="lazy"
            style={{ willChange: "opacity" }}
          />

          {hoverImage && (
            <Image
              src={getImageUrl(hoverImage)}
              alt={`${productName} - alternate view`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className={`object-contain object-center p-4 transition-opacity duration-300 ease-in-out absolute inset-0 ${
                isHovering ? "opacity-100" : "opacity-0"
              }`}
              loading="lazy"
              style={{ willChange: "opacity" }}
            />
          )}

          <div
            className={`absolute inset-x-0 bottom-0 bg-black bg-opacity-70 text-white py-2 text-center text-xs font-medium transition-transform duration-300 ease-in-out transform ${
              isHovering ? "translate-y-0" : "translate-y-full"
            }`}
            aria-hidden="true"
          >
            Quick View
          </div>
        </div>

        <div className="p-3 text-left border-t border-gray-100">
          <h3 className="text-sm text-gray-800 font-medium line-clamp-1 mb-1">{productName}</h3>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-900">{productPrice}</span>
            {productOldPrice && (
              <span className="text-xs text-gray-500 line-through">{productOldPrice}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
