export interface ImageFormat {
  name: string
  hash: string
  ext: string
  mime: string
  path: string | null
  width: number
  height: number
  size: number
  sizeInBytes?: number
  url: string
}

export interface ProductImage {
  id: number
  documentId?: string
  name: string
  alternativeText: string | null
  caption: string | null
  width: number
  height: number
  formats: {
    thumbnail: ImageFormat
    small: ImageFormat
    medium?: ImageFormat
    large?: ImageFormat
  }
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl: string | null
  provider: string
  provider_metadata: unknown
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export interface Product {
  id: number
  documentId?: string
  attributes?: {
    itemName: string
    description: string
    price: string
    size: string
    createdAt: string
    updatedAt: string
    publishedAt: string
    oldPrice: string | null
    image: {
      data: ProductImage[]
    }
  }
  // Direct properties for the alternative API response format
  itemName?: string
  description?: string
  price?: string
  size?: string
  createdAt?: string
  updatedAt?: string
  publishedAt?: string
  oldPrice?: string | null
  image?: ProductImage[]
}

export interface ProductsResponse {
  data: Product[]
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}
