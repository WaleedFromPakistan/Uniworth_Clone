import Link from "next/link"
import Image from "next/image"

interface ProductCardProps {
  id: number
  title: string
  price: string
  originalPrice?: string
  discount?: number
  image: string
  slug: string
}

export default function ProductCard({  title, price, originalPrice, discount, image, slug }: ProductCardProps) {
  return (
    <Link href={`/products/${slug}`} className="group relative bg-white block">
      {/* Product Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-gray-100 mb-4">
        {/* Discount Badge */}
        {discount && discount > 0 && (
          <div className="absolute top-3 left-3 z-10">
            <div className="bg-red-500 text-white text-sm font-bold px-2 py-1 transform -rotate-45 origin-center">
              {discount}%
            </div>
          </div>
        )}

        {/* Product Image */}
        <Image
          src={image || "/placeholder.svg?height=400&width=300"}
          alt={title}
          width={300}
          height={400}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Product Info */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-900 leading-tight">{title}</h3>

        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-gray-900">{price}</span>
          {originalPrice && <span className="text-sm text-gray-500 line-through">{originalPrice}</span>}
        </div>
      </div>
    </Link>
  )
}
