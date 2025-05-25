"use client"

import { useState, useEffect, useMemo } from "react"
import Image from "next/image"
import type { ProductImage } from "@/types/product"

interface ProductImageCarouselProps {
  images: ProductImage[]
  productName: string
}

export default function ProductImageCarousel({ images, productName }: ProductImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setCurrentIndex(0)
    setIsLoading(true)
  }, [images])

  const goToSlide = (index: number) => {
    if (index !== currentIndex) {
      setIsLoading(true)
      setCurrentIndex(index)
    }
  }

  const getImageUrl = (image: ProductImage | null): string => {
    if (!image?.url) return "/placeholder.svg"
    return image.url.startsWith("http") || image.url.startsWith("/placeholder")
      ? image.url
      : `http://localhost:1337${image.url}`
  }

  const getThumbnailUrl = (image: ProductImage | null): string => {
    const url = image?.formats?.thumbnail?.url
    if (!url) return "/placeholder.svg"
    return url.startsWith("http") || url.startsWith("/placeholder")
      ? url
      : `http://localhost:1337${url}`
  }

  const mainImageUrl = useMemo(() => getImageUrl(images[currentIndex]), [images, currentIndex])

  if (images.length === 0) {
    return (
      <div className="relative aspect-[4/5] bg-gray-50 border border-gray-200 flex items-center justify-center">
        <p className="text-gray-500">No images available</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-[4/5] bg-white border border-gray-200 rounded-sm overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-10">
            <div className="w-8 h-8 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
          </div>
        )}
        <Image
          src={mainImageUrl}
          alt={`${productName} - image ${currentIndex + 1}`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className={`object-contain object-center p-6 transition-opacity duration-300 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
          priority={currentIndex === 0}
          loading={currentIndex === 0 ? "eager" : "lazy"}
          onLoad={() => setIsLoading(false)}
          onError={() => setIsLoading(false)}
        />
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {images.map((image, index) => {
          const thumbUrl = getThumbnailUrl(image)
          return (
            <button
              key={image.id}
              className={`relative w-20 h-20 flex-shrink-0 overflow-hidden border-2 rounded-sm transition-all duration-200 ${
                currentIndex === index ? "border-black shadow-sm" : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`View image ${index + 1}`}
            >
              <Image
                src={thumbUrl}
                alt={`${productName} - thumbnail ${index + 1}`}
                fill
                sizes="80px"
                className="object-contain object-center p-2"
                loading="lazy"
              />
            </button>
          )
        })}
      </div>
    </div>
  )
}
