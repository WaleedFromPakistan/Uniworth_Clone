import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getProductById, getProducts } from "@/lib/api";
import type { Product } from "@/types/product";
import ProductDetailWrapper from "./productDetailWrapper";
import type { Metadata } from "next";

export const revalidate = 60; // Enable ISR: revalidate every 60 seconds

// ✅ Pre-generate dynamic paths (SSG)
export async function generateStaticParams() {
  const { data: products } = await getProducts();

  return products.map((product) => ({
    documentId: product.documentId,
  }));
}

// ✅ Generate SEO metadata per page (SSG)
export async function generateMetadata({
  params,
}: {
  params: { documentId: string };
}): Promise<Metadata> {
  const product = await getProductById(params.documentId);

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The product you're looking for does not exist.",
    };
  }

  return {
    title: product.itemName,
    description: product.description || "Explore product details.",
    openGraph: {
      images: [product.image?.[0]?.formats?.medium?.url || product.image?.[0]?.url || ""],
    },
  };
}

// ✅ Main page component
export default async function ProductDetailPage({ params }: { params: { documentId: string } }) {
  const { documentId } = params;

  try {
    const product = await getProductById(documentId);

    if (!product) return <NotFound />;
    return <ProductDetailWrapper product={product as Product} />;
  } catch (error) {
    console.error("Error fetching product:", error);
    return <ErrorPage />;
  }
}

// ✅ Error + Fallback UI
function NotFound() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
      <h1 className="text-2xl font-medium text-gray-900">Product not found</h1>
      <p className="mt-2 text-gray-500">
        The product you are looking for does not exist or has been removed.
      </p>
      <BackLink />
    </div>
  );
}

function ErrorPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
      <h1 className="text-2xl font-medium text-gray-900">Something went wrong</h1>
      <p className="mt-2 text-gray-500">
        We could not load the product information. Please try again later.
      </p>
      <BackLink />
    </div>
  );
}

function BackLink() {
  return (
    <Link href="/" className="mt-6 inline-flex items-center text-gray-600 hover:text-gray-900">
      <ArrowLeft size={16} className="mr-2" />
      Back to products
    </Link>
  );
}
