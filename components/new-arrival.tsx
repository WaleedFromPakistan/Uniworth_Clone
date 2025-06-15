import { fetchNewArrivals, getImageUrl } from "@/lib/newArrivals"
import ProductCard from "@/components/productCard"

export default async function NewArrivals() {
  const products = await fetchNewArrivals()

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 tracking-wide">
          NEW ARRIVALS
        </h2>
        <div className="w-16 h-1 bg-red-500 mx-auto" />
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {products.map((product) => {
            const {
              id,
              documentId,
              itemName,
              price,
              oldPrice,
              image,
            } = product

            const imageUrl = image?.[0]
              ? getImageUrl(image[0])
              : "/placeholder.svg?height=400&width=300"

            const discount = calculateDiscount(price, oldPrice)

            return (
              <ProductCard
                key={id}
                id={id}
                title={itemName}
                price={price}
                originalPrice={oldPrice}
                discount={discount}
                image={imageUrl}
                slug={documentId}
              />
            )
          })}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No new arrivals available at the moment.
          </p>
        </div>
      )}
    </section>
  )
}

// Optional helper function if prices are in format "Rs.4,995.00"
function calculateDiscount(priceStr: string, originalPriceStr: string) {
  const price = parseFloat(priceStr.replace(/[^\d.]/g, ""))
  const original = parseFloat(originalPriceStr.replace(/[^\d.]/g, ""))
  if (!original || isNaN(price) || isNaN(original)) return 0
  return Math.round(((original - price) / original) * 100)
}
