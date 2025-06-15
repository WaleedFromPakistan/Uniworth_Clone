"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { fetchHeroes, type HeroImage } from "@/lib/heroes"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [slides, setSlides] = useState<HeroImage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadSlides = async () => {
      try {
        setLoading(true)
        const heroImages = await fetchHeroes()

        if (heroImages.length > 0) {
          setSlides(heroImages)
        } else {
          setError("No hero images found")
        }
      } catch (err) {
        setError("Failed to load hero images")
        console.error("Error loading hero images:", err)
      } finally {
        setLoading(false)
      }
    }

    loadSlides()
  }, [])

  const nextSlide = () => {
    if (slides.length > 0) {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }
  }

  const prevSlide = () => {
    if (slides.length > 0) {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    }
  }

  useEffect(() => {
    if (slides.length > 0) {
      const timer = setInterval(nextSlide, 10000)
      return () => clearInterval(timer)
    }
  }, [slides.length])

  if (loading) {
    return (
      <section className="relative h-screen overflow-hidden bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading hero images...</p>
        </div>
      </section>
    )
  }

  if (error || slides.length === 0) {
    return (
      <section className="relative h-screen overflow-hidden bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-xl">{error || "No hero images available"}</p>
        </div>
      </section>
    )
  }

  const currentImage = slides[currentSlide]

  const getImageUrl = (image: HeroImage) => {
    return (
      image.formats?.large?.url ||
      image.formats?.medium?.url ||
      image.url || // fallback to original image
      "/placeholder.svg"
    )
  }

  const imageUrl = getImageUrl(currentImage)
  const imageAlt = currentImage.alternativeText || currentImage.name || "Hero image"

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <Image
        src={imageUrl}
        alt={imageAlt}
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/30 hover:bg-black/50 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm z-10"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/30 hover:bg-black/50 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm z-10"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>
    </section>
  )
}
