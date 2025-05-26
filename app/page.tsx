import Hero from "@/components/hero";
import { getHomePageData } from "@/lib/home-data";
import dynamic from "next/dynamic";

// Dynamically import CategoryCard to split bundle (optional)
const CategoryCard = dynamic(() => import("@/components/category-card"), {
  loading: () => (
    <div className="aspect-[4/5] bg-gray-200 animate-pulse rounded" />
  ),
});

export default async function HomePage() {
  const categories = await getHomePageData();

  return (
    <>
      <Hero/>
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="py-8 sm:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Page Header */}
            <header className="text-center mb-8 sm:mb-12">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-medium text-gray-900 mb-3">
                Uniworth Collection
              </h1>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                Discover our premium clothing collection designed for the modern
                gentleman
              </p>
            </header>

            {/* Categories Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {categories.length > 0
                ? categories.map((category) => (
                    <CategoryCard key={category.id} category={category} />
                  ))
                : Array.from({ length: 3 }).map((_, i) => (
                    <div
                      key={`skeleton-${i}`}
                      className="aspect-[4/5] bg-gray-200 rounded animate-pulse flex items-center justify-center"
                    >
                      <span className="text-gray-400">Loading...</span>
                    </div>
                  ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
