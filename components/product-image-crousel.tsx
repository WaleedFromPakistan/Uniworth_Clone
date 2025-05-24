"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import type { ProductImage } from "@/types/product"

interface ProductImageCarouselProps {
  images: ProductImage[]
  productName: string
}

export default function ProductImageCarousel({ images, productName }: ProductImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  // Reset state when images change
  useEffect(() => {
    setCurrentIndex(0)
    setIsLoading(true)
  }, [images])

  // Function to go to a specific slide
  const goToSlide = (index: number) => {
    if (index !== currentIndex) {
      setIsLoading(true)
      setCurrentIndex(index)
    }
  }

  // Get image URL with error handling
  const getImageUrl = (image: ProductImage | null) => {
    if (!image) return "/placeholder.svg"

    // Handle different image URL formats
    const url = image.url
    if (!url) return "/placeholder.svg"

    // Return full URL if it's already absolute, otherwise prepend the API base URL
    return url.startsWith("http") || url.startsWith("/placeholder") ? url : `http://localhost:1337${url}`
  }

  // Get thumbnail URL with error handling
  const getThumbnailUrl = (image: ProductImage | null) => {
    if (!image || !image.formats?.thumbnail?.url) return "/placeholder.svg"

    // Handle different image URL formats
    const url = image.formats.thumbnail.url

    // Return full URL if it's already absolute, otherwise prepend the API base URL
    return url.startsWith("http") || url.startsWith("/placeholder") ? url : `http://localhost:1337${url}`
  }

  if (images.length === 0) {
    return (
      <div className="relative aspect-[4/5] overflow-hidden bg-gray-50 flex items-center justify-center border border-gray-200">
        <p className="text-gray-500">No images available</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Main image */}
      <div className="relative aspect-[4/5] overflow-hidden bg-white border border-gray-200 rounded-sm">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-10">
            <div className="w-8 h-8 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
          </div>
        )}
        <Image
          src={getImageUrl(images[currentIndex]) || "/placeholder.svg"}
          alt={`${productName} - image ${currentIndex + 1}`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className={`object-contain object-center p-6 transition-opacity duration-300 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
          priority
          onLoad={() => setIsLoading(false)}
          onError={() => setIsLoading(false)}
        />
      </div>

      {/* Thumbnail navigation */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {images.map((image, index) => (
          <button
            key={image.id}
            className={`relative w-20 h-20 flex-shrink-0 overflow-hidden border-2 rounded-sm transition-all duration-200 ${
              currentIndex === index ? "border-black shadow-sm" : "border-gray-200 hover:border-gray-300"
            }`}
            onClick={() => goToSlide(index)}
          >
            <Image
              src={getThumbnailUrl(image) || "/placeholder.svg"}
              alt={`${productName} - thumbnail ${index + 1}`}
              fill
              sizes="80px"
              className="object-contain object-center p-2"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
