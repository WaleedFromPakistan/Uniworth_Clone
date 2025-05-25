import { getHomePageData } from "@/lib/home-data"
import CategoryCard from "@/components/category-card"

export default async function HomePage() {
  // Fetch dynamic data from Strapi API
  const categories = await getHomePageData()
  //console.log(categories);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-medium text-gray-900 mb-3">
              Uniworth Collection
            </h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our premium clothing collection designed for the modern gentleman
            </p>
          </div>

          {/* Categories Grid */}
          {categories.length > 0 ? (
            <div className="grid grid-cols- sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {categories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="aspect-[4/5] bg-gray-200 rounded animate-pulse flex items-center justify-center"
                >
                  <div className="text-gray-400">Loading...</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      {/* <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-xl sm:text-2xl font-serif font-medium text-gray-900 mb-3">Why Choose Uniworth</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
              Experience the difference with our commitment to quality, comfort, and style
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-gray-900 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Premium Quality</h3>
              <p className="text-gray-600 text-sm">
                Crafted with the finest materials and attention to detail for lasting durability
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-gray-900 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Timeless Style</h3>
              <p className="text-gray-600 text-sm">
                Classic designs that never go out of style, perfect for any occasion
              </p>
            </div>

            <div className="text-center sm:col-span-2 lg:col-span-1">
              <div className="w-12 h-12 mx-auto mb-4 bg-gray-900 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Perfect Fit</h3>
              <p className="text-gray-600 text-sm">
                Designed for comfort and tailored to provide the perfect fit for every body type
              </p>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  )
}
