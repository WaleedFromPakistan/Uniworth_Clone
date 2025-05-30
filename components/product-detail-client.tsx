"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, ShoppingCart, Minus, Plus, Phone } from "lucide-react"
import type { Product, ProductImage } from "@/types/product"
import ProductImageCarousel from "@/components/product-image-crousel"

interface ProductDetailClientProps {
  product: Product
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [selectedSize, setSelectedSize] = useState("")
  const [quantity, setQuantity] = useState(1)

  // Handle both API response formats
  let images: ProductImage[] = []

  if (product.attributes?.image?.data) {
    // Standard Strapi format
    images = product.attributes.image.data
  } else if (product.image) {
    // Alternative format from the API
    images = product.image
  }

  // Get product name from either format
  const productName = product.attributes?.itemName || product.itemName || "Unnamed Product"

  // Get product price from either format
  const productPrice = product.attributes?.price || product.price || "N/A"

  // Get product old price from either format
  const productOldPrice = product.attributes?.oldPrice || product.oldPrice || null

  // Get product description from either format
  const productDescription = product.attributes?.description || product.description || ""

  // Handle quantity changes
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }

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
        {/* Left side - Product images */}
        <div className="order-1 lg:order-1">
          <ProductImageCarousel images={images} productName={productName} />
        </div>

        {/* Right side - Product details */}
        <div className="order-2 lg:order-2 space-y-4 sm:space-y-6">
          {/* Top section with social icons and price */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
              {productOldPrice && (
                <span className="text-base sm:text-lg text-gray-500 line-through order-2 sm:order-1">
                  {productOldPrice}
                </span>
              )}
              <span className="text-xl sm:text-2xl font-semibold text-gray-900 order-1 sm:order-2">{productPrice}</span>
              {productOldPrice && (
                <span className="bg-red-100 text-red-600 px-2 py-1 text-sm font-medium rounded w-fit order-3">
                  {calculateDiscount(productPrice, productOldPrice)}% off
                </span>
              )}
            </div>

            {/* Social sharing icons */}
            <div className="flex gap-3 text-gray-600 justify-start sm:justify-end">
              <button className="hover:text-gray-900 p-1">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </button>
              <button className="hover:text-gray-900 p-1">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </button>
              <button className="hover:text-gray-900 p-1">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z" />
                </svg>
              </button>
              <button className="hover:text-gray-900 p-1">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Size Chart Link */}
          <div className="flex justify-start sm:justify-end">
            <button className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              Size Chart
            </button>
          </div>

          {/* Size selection */}
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

          {/* Quantity */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">Quantity</h3>
            <div className="flex items-center border border-gray-300 w-fit">
              <button
                onClick={decreaseQuantity}
                className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 touch-manipulation"
              >
                <Minus size={16} />
              </button>
              <div className="w-12 h-10 flex items-center justify-center border-x border-gray-300 text-sm font-medium">
                {quantity}
              </div>
              <button
                onClick={increaseQuantity}
                className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 touch-manipulation"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Add to cart button */}
          <button
            className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-3 px-6 font-medium transition-colors flex items-center justify-center gap-2 touch-manipulation"
            disabled={selectedSize === ""}
          >
            <ShoppingCart size={18} />
            ADD TO CART
          </button>

          {/* Large Product Details Section */}
          <div className="bg-gray-50 p-4 sm:p-6 rounded">
            <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-3 sm:mb-4 uppercase tracking-wide">
              Product Detail
            </h3>
            <p className="text-sm text-gray-700 mb-4 sm:mb-6 leading-relaxed">{productDescription}</p>

            <div className="grid grid-cols-1 gap-2 sm:gap-3 text-sm">
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600 font-medium">Color :</span>
                <span className="text-gray-900">Navy</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600 font-medium">Sleeve :</span>
                <span className="text-gray-900">Half Sleeves</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600 font-medium">Fit :</span>
                <span className="text-gray-900">Regular Fit</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600 font-medium">Cuff Style :</span>
                <span className="text-gray-900">Rib</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600 font-medium">Collar Style :</span>
                <span className="text-gray-900">Polo</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600 font-medium">Pattern :</span>
                <span className="text-gray-900">Plain</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600 font-medium">Style :</span>
                <span className="text-gray-900">Embriodery</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600 font-medium">Fabric :</span>
                <span className="text-gray-900">100% Cotton</span>
              </div>
            </div>
          </div>

          {/* Shipping & Returns */}
          <div className="bg-gray-50 p-4 rounded">
            <h3 className="text-sm font-medium text-gray-900 mb-2 uppercase tracking-wide">Shipping & Returns</h3>
            <p className="text-sm text-gray-700">
              Free shipping on orders over Rs. 2,000. Returns accepted within 30 days.
            </p>
          </div>

          {/* Need Help */}
          <div className="pt-4 border-t border-gray-200 sm:border-t-0 sm:pt-0">
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

// Helper function to calculate discount percentage
function calculateDiscount(currentPrice: string, oldPrice: string): number {
  try {
    // Extract numeric values from price strings (assuming format like "Rs.3,580.00")
    const current = Number.parseFloat(currentPrice.replace(/[^\d.]/g, ""))
    const old = Number.parseFloat(oldPrice.replace(/[^\d.]/g, ""))

    if (isNaN(current) || isNaN(old) || old <= current) return 0

    const discount = Math.round(((old - current) / old) * 100)
    return discount
  } catch (error) {
    console.log(error)
    return 0
  }
}
