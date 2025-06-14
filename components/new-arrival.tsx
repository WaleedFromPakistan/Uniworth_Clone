import { fetchNewArrivals, getImageUrl, calculateDiscount } from "@/lib/api"
import ProductCard from "@/components/productCard"

export default async function NewArrivals() {
  const products = await fetchNewArrivals()

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 tracking-wide">NEW ARRIVALS</h2>
        <div className="w-16 h-1 bg-red-500 mx-auto"></div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {products.map((product) => {
          const discount = calculateDiscount(product.price, product.oldPrice)

          return (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.itemName}
              price={product.price}
              originalPrice={product.oldPrice}
              discount={discount}
              image={
                product.image && product.image.length > 0
                  ? getImageUrl(product.image[0])
                  : "/placeholder.svg?height=400&width=300"
              }
              slug={product.documentId}
            />
          )
        })}
      </div>

      {/* Fallback for empty state */}
      {products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No new arrivals available at the moment.</p>
        </div>
      )}
    </section>
  )
}
