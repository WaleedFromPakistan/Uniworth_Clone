"use client"

import { useEffect, useState } from "react"
import { fetchBanners, getBannerImageUrl } from "@/lib/banner"

export default function Banner() {
  const [imageUrl, setImageUrl] = useState("/placeholder.svg")

  useEffect(() => {
    async function loadBanner() {
      const banners = await fetchBanners()
      const firstBannerImage = banners[0]?.banerImage
      const url = getBannerImageUrl(firstBannerImage)
      setImageUrl(url)
    }

    loadBanner()
  }, [])

  return (
    <section
      className="relative min-h-[80vh] flex items-center justify-center bg-fixed bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('${imageUrl}')`,
      }}
    >
      <div className="text-center px-4 max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-normal text-black mb-6">Accessories</h1>
        <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-8 max-w-xl mx-auto">
          Uniworth Accessories - Elevating Style Beyond Expectations! Our Essential Collection Curates A Range Of
          Accessory Must-Haves Catering To Every Occasion.
        </p>
        <button className="border border-black px-8 py-3 text-black bg-transparent hover:bg-black hover:text-white transition-colors duration-300">
          Shop
        </button>
      </div>
    </section>
  )
}
