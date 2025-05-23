export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  images: string[]
  category: string
  colors?: string[]
  sleeve?: string
  fit?: string
  style?: string
}
