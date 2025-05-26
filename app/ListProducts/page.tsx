import { getProducts } from "@/lib/api"
import ProductCard from "@/components/product-card"

export default async function PoloShirtsPage() {
  const productsResponse = await getProducts()
  const products = productsResponse.data || []

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto mt-[5%] px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        
        {/* Page title */}
        {/* <div className="text-center mb-8 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl font-serif font-medium text-gray-900">
            Polo T-Shirts
          </h1>
          <p className="mt-4 text-sm sm:text-base text-gray-500 max-w-3xl mx-auto">
            Our polo shirts are the go-to choice for all seasons and an absolute wardrobe essential.
            Made with premium pique fabric for comfort and durability.
          </p>
        </div> */}

        {/* Filters */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 border-b border-gray-200 pb-4">
          <span className="text-sm text-gray-500">{products.length} Products</span>
        </div>

        {/* Product grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No products found. Please try again later.</p>
          </div>
        )}
      </div>
    </div>
  )
}
