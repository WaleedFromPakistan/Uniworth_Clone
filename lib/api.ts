import type { Product, ProductsResponse, StrapiImage } from "@/types/product";
import type { Category } from "@/types/Category";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!baseURL) {
  throw new Error("Missing NEXT_PUBLIC_API_BASE_URL in environment variables");
}

interface RawStrapiProduct {
  id: number;
  documentId: string;
  itemName: string;
  description: string | null;
  price: string;
  oldPrice?: string;
  size: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  image: StrapiImage[];
}

interface RawProductsResponse {
  data: RawStrapiProduct[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

function mapStrapiProduct(raw: RawStrapiProduct): Product {
  return {
    id: raw.id,
    documentId: raw.documentId,
    itemName: raw.itemName,
    description: raw.description,
    price: raw.price,
    oldPrice: raw.oldPrice,
    size: raw.size,
    createdAt: raw.createdAt,
    updatedAt: raw.updatedAt,
    publishedAt: raw.publishedAt,
    image: raw.image ?? [],
  };
}

export async function getProducts(): Promise<ProductsResponse> {
  try {
    const res = await fetch(`${baseURL}/api/products?populate=*`, {
      next: { revalidate: 60 },
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }

    const json: RawProductsResponse = await res.json();
    return {
      data: json.data.map(mapStrapiProduct),
      meta: json.meta,
    };
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return {
      data: [],
      meta: {
        pagination: { page: 1, pageSize: 0, pageCount: 0, total: 0 },
      },
    };
  }
}

export async function getProductById(documentId: string): Promise<Product | null> {
  try {
    const res = await fetch(
      `${baseURL}/api/products?filters[documentId][$eq]=${documentId}&populate=*`,
      { next: { revalidate: 60 } }
    );

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }

    const json: RawProductsResponse = await res.json();
    const product = json.data[0];
    return product ? mapStrapiProduct(product) : null;
  } catch (error) {
    console.error(`Failed to fetch product ${documentId}:`, error);
    return null;
  }
}

export async function getHomePageData(): Promise<Category[]> {
  try {
    const res = await fetch(`${baseURL}/api/homes?populate=*`, {
      next: { revalidate: 60 },
    });
    const json = await res.json();
    console.log(res);
    return json?.data ?? [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}
