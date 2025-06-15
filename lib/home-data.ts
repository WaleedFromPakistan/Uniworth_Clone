// Environment variables
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
const baseMediaUrl = process.env.NEXT_PUBLIC_MEDIA_BASE_URL || baseURL || "";

// Safety check
if (!baseURL) {
  throw new Error("Missing NEXT_PUBLIC_API_BASE_URL in environment variables");
}

// Strapi API response interfaces
export interface StrapiImage {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats?: {
    thumbnail?: { url: string; width: number; height: number };
    small?: { url: string; width: number; height: number };
    medium?: { url: string; width: number; height: number };
    large?: { url: string; width: number; height: number };
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: unknown;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface StrapiHomeItem {
  id: number;
  documentId: string;
  title: string;
  subtitle?: string;
  buttonText?: string;
  description?: string;
  link?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  image?: StrapiImage | null;
}

export interface StrapiHomeResponse {
  data: StrapiHomeItem[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface CategoryCard {
  id: string;
  title: string;
  subtitle: string;
  buttonText: string;
  image: string;
  link: string;
  description: string;
}

/**
 * Returns a fully qualified URL for a Strapi image.
 * Falls back to a placeholder image if no valid URL is found.
 */
function getStrapiImageUrl(imageData: StrapiImage | null): string {
  if (!imageData?.url) {
    return "/placeholder.svg?height=600&width=400";
  }

  const url = imageData.url.trim();

  if (url.startsWith("http")) {
    return url;
  }

  return `${baseMediaUrl.replace(/\/$/, "")}/${url.replace(/^\//, "")}`;
}

/**
 * Fetches home page categories from Strapi, transforms to CategoryCard.
 */
export async function getHomePageData(): Promise<CategoryCard[]> {
  const fallbackData: CategoryCard[] = [
    {
      id: "polo-shirts-fallback",
      title: "POLO SHIRTS",
      subtitle: "Premium Collection",
      buttonText: "Shop Now",
      image: "/placeholder.svg?height=600&width=400&text=Polo+Shirts",
      link: "/ListProducts",
      description:
        "Discover our premium polo shirt collection made with finest materials",
    },
    {
      id: "formal-shirts-fallback",
      title: "FORMAL SHIRTS",
      subtitle: "Business Collection",
      buttonText: "Explore",
      image: "/placeholder.svg?height=600&width=400&text=Formal+Shirts",
      link: "/formal-shirts",
      description: "Professional formal shirts for the modern workplace",
    },
    {
      id: "casual-wear-fallback",
      title: "CASUAL WEAR",
      subtitle: "Everyday Comfort",
      buttonText: "Browse",
      image: "/placeholder.svg?height=600&width=400&text=Casual+Wear",
      link: "/casual-wear",
      description: "Comfortable casual wear for your daily lifestyle",
    },
  ];

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(`${baseURL}/api/homes?populate=*`, {
      cache: "no-store",
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data: StrapiHomeResponse = await response.json();

    return data.data.map((item) => ({
      id: item.documentId ?? item.id.toString(),
      title: item.title ?? "Untitled",
      subtitle: item.subtitle ?? "Premium Collection",
      buttonText: item.buttonText ?? "Shop Now",
      image: getStrapiImageUrl(item.image ?? null),
      link: item.link ?? "/ListProducts",
      description:
        item.description ??
        `Discover our premium ${item.title?.toLowerCase() ?? "collection"} made with finest materials`,
    }));
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      console.error("Request timed out or aborted");
    } else {
      console.error("Failed to fetch home page data:", error);
    }
    return fallbackData;
  }
}

/**
 * Returns a featured category card.
 * Prefers "polo shirts" category, otherwise returns the first available.
 */
export async function getFeaturedCategory(): Promise<CategoryCard | null> {
  try {
    const categories = await getHomePageData();
    const featured =
      categories.find(
        (cat) =>
          cat.title.toLowerCase().includes("polo") ||
          cat.link.toLowerCase().includes("listproducts")
      ) ?? categories[0] ?? null;

    return featured;
  } catch (error) {
    console.error("Failed to get featured category:", error);
    return null;
  }
}
