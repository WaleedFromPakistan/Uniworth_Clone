"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, ShoppingCart, Minus, Plus, Phone } from "lucide-react"
import { Product, StrapiImage } from "@/types/product"
import ProductImageCarousel from "@/components/product-image-crousel"

interface ProductDetailClientProps {
  product: Product
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [selectedSize, setSelectedSize] = useState("")
  const [quantity, setQuantity] = useState(1)

  const images: StrapiImage[] = product.image || []
  const productName = product.itemName || "Unnamed Product"
  const productPrice = product.price || ""
  const productOldPrice = product.oldPrice || ""
  const productDescription = product.description || ""

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1)
  }

  const increaseQuantity = () => setQuantity(quantity + 1)

  const discountPercent = calculateDiscount(productPrice, productOldPrice)

  const formatPrice = (price: string) =>
    new Intl.NumberFormat("en-PK", { style: "currency", currency: "PKR" }).format(
      Number(price.replace(/[^\d.]/g, "")) || 0
    )

  return (
    <div className="max-w-7xl mx-auto mt-[6%] px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
      {/* Breadcrumb */}
      <nav className="mb-4 sm:mb-6">
        <Link href="/" className="text-gray-500 hover:text-gray-900 flex items-center text-sm">
          <ChevronLeft size={16} className="mr-1" />
          Back to Products
        </Link>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
        {/* Product Images */}
        <div className="order-1">
          <ProductImageCarousel images={images} productName={productName} />
        </div>

        {/* Product Info */}
        <div className="order-2 space-y-4 sm:space-y-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
              {productOldPrice && (
                <span className="text-base sm:text-lg text-gray-500 line-through">{formatPrice(productOldPrice)}</span>
              )}
              <span className="text-xl sm:text-2xl font-semibold text-gray-900">{formatPrice(productPrice)}</span>
              {discountPercent > 0 && (
                <span className="bg-red-100 text-red-600 px-2 py-1 text-sm font-medium rounded">
                  {discountPercent}% off
                </span>
              )}
            </div>
          </div>

          {/* Size Chart Button */}
          <div className="flex justify-start sm:justify-end">
            <button className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-2">
              Size Chart
            </button>
          </div>

          {/* Size Selector */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">Select Size:</h3>
            <div className="flex flex-wrap gap-2">
              {["S", "M", "L", "XL", "XXL"].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center border text-sm font-medium ${
                    selectedSize === size
                      ? "border-black bg-black text-white"
                      : "border-gray-300 text-gray-700 hover:border-gray-400"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">Quantity</h3>
            <div className="flex items-center border border-gray-300 w-fit">
              <button onClick={decreaseQuantity} className="w-10 h-10 flex items-center justify-center hover:bg-gray-50">
                <Minus size={16} />
              </button>
              <div className="w-12 h-10 flex items-center justify-center border-x border-gray-300 text-sm font-medium">
                {quantity}
              </div>
              <button onClick={increaseQuantity} className="w-10 h-10 flex items-center justify-center hover:bg-gray-50">
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Add to Cart */}
          <button
            className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-3 px-6 font-medium flex items-center justify-center gap-2"
            disabled={selectedSize === ""}
          >
            <ShoppingCart size={18} />
            ADD TO CART
          </button>

          {/* Product Description */}
          <div className="bg-gray-50 p-4 sm:p-6 rounded">
            <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-4 uppercase">Product Detail</h3>
            <p className="text-sm text-gray-700 mb-6 leading-relaxed">{productDescription}</p>
          </div>

          {/* Shipping Info */}
          <div className="bg-gray-50 p-4 rounded">
            <h3 className="text-sm font-medium text-gray-900 mb-2 uppercase">Shipping & Returns</h3>
            <p className="text-sm text-gray-700">Free shipping on orders over Rs. 2,000. Returns accepted within 30 days.</p>
          </div>

          {/* Contact Info */}
          <div className="pt-4 border-t border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <Phone size={16} className="text-gray-600" />
              <span className="text-sm font-medium text-gray-900">Need Help?</span>
            </div>
            <p className="text-sm text-gray-600 font-medium">+92 42 111 789 456</p>
            <p className="text-xs text-gray-500">Mon-Sat: (10:00 AM to 06:00 PM)</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function calculateDiscount(currentPrice: string, oldPrice: string): number {
  const current = Number.parseFloat(currentPrice.replace(/[^\d.]/g, ""))
  const old = Number.parseFloat(oldPrice.replace(/[^\d.]/g, ""))
  if (isNaN(current) || isNaN(old) || old <= current) return 0
  return Math.round(((old - current) / old) * 100)
}
