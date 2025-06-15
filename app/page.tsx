import Banner from "@/components/banner";
import FeaturesSection from "@/components/feature-section";
import Hero from "@/components/hero";
import NewArrivals from "@/components/new-arrival";
import { getHomePageData } from "@/lib/home-data";
import dynamicImport from "next/dynamic";

// Inform Next.js this page should be statically generated
export const dynamic = "force-static";

// Dynamically import CategoryCard to split bundle (optional)
const CategoryCard = dynamicImport(() => import("@/components/category-card"), {
  loading: () => (
    <div className="aspect-[4/5] bg-gray-200 animate-pulse rounded" />
  ),
});

export default async function HomePage() {
  const categories = await getHomePageData(); // fetches data at build time

  return (
    <>
      <Hero />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="py-8 sm:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
      <NewArrivals />
      <Banner/>
      <FeaturesSection/>
    </>
  );
}