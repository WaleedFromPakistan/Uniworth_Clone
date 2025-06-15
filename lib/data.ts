// import type { Product } from "./types"

// export const products: Product[] = [
//   {
//     id: "P001",
//     name: "Classic Polo Shirt",
//     description:
//       "A timeless classic polo shirt made from premium cotton fabric. Perfect for casual and semi-formal occasions. Features a comfortable fit and durable construction that will last for years.",
//     price: 2499,
//     originalPrice: 2999,
//     images: [
//       "/placeholder.svg?height=800&width=600",
//       "/placeholder.svg?height=800&width=600&text=Image+2",
//       "/placeholder.svg?height=800&width=600&text=Image+3",
//       "/placeholder.svg?height=800&width=600&text=Image+4",
//     ],
//     category: "Polo Shirts",
//     colors: ["Navy", "Black", "Gray", "White"],
//     sleeve: "Short Sleeve",
//     fit: "Regular Fit",
//     style: "Classic",
//   },
//   {
//     id: "P002",
//     name: "Formal Business Shirt",
//     description:
//       "Premium formal shirt designed for the modern professional. Made with high-quality cotton blend for comfort during long work days. Features a tailored fit and wrinkle-resistant fabric.",
//     price: 3499,
//     originalPrice: 3999,
//     images: [
//       "/placeholder.svg?height=800&width=600&text=Formal+Shirt",
//       "/placeholder.svg?height=800&width=600&text=Formal+Shirt+2",
//       "/placeholder.svg?height=800&width=600&text=Formal+Shirt+3",
//       "/placeholder.svg?height=800&width=600&text=Formal+Shirt+4",
//     ],
//     category: "Formal Shirts",
//     colors: ["White", "Light Blue", "Pink"],
//     sleeve: "Full Sleeve",
//     fit: "Slim Fit",
//     style: "Business",
//   },
//   {
//     id: "P003",
//     name: "Casual Linen Shirt",
//     description:
//       "Breathable linen shirt perfect for warm weather and casual outings. The natural fabric keeps you cool and comfortable all day long. Features a relaxed fit and contemporary styling.",
//     price: 2799,
//     images: [
//       "/placeholder.svg?height=800&width=600&text=Linen+Shirt",
//       "/placeholder.svg?height=800&width=600&text=Linen+Shirt+2",
//       "/placeholder.svg?height=800&width=600&text=Linen+Shirt+3",
//       "/placeholder.svg?height=800&width=600&text=Linen+Shirt+4",
//     ],
//     category: "Casual Shirts",
//     colors: ["Beige", "White", "Light Green"],
//     sleeve: "Full Sleeve",
//     fit: "Regular Fit",
//     style: "Casual",
//   },
//   {
//     id: "P004",
//     name: "Premium Wool Blazer",
//     description:
//       "Sophisticated wool blazer crafted for the discerning gentleman. Perfect for formal events and business meetings. Features expert tailoring and premium materials for a distinguished look.",
//     price: 12999,
//     originalPrice: 14999,
//     images: [
//       "/placeholder.svg?height=800&width=600&text=Wool+Blazer",
//       "/placeholder.svg?height=800&width=600&text=Wool+Blazer+2",
//       "/placeholder.svg?height=800&width=600&text=Wool+Blazer+3",
//       "/placeholder.svg?height=800&width=600&text=Wool+Blazer+4",
//     ],
//     category: "Blazers",
//     colors: ["Navy", "Black", "Charcoal"],
//     fit: "Tailored Fit",
//     style: "Formal",
//   },
//   {
//     id: "P005",
//     name: "Cotton Chino Pants",
//     description:
//       "Versatile chino pants made from soft cotton twill. Perfect for both casual and semi-formal occasions. Features a comfortable waistband and durable construction for everyday wear.",
//     price: 3299,
//     images: [
//       "/placeholder.svg?height=800&width=600&text=Chino+Pants",
//       "/placeholder.svg?height=800&width=600&text=Chino+Pants+2",
//       "/placeholder.svg?height=800&width=600&text=Chino+Pants+3",
//       "/placeholder.svg?height=800&width=600&text=Chino+Pants+4",
//     ],
//     category: "Pants",
//     colors: ["Khaki", "Navy", "Olive", "Gray"],
//     fit: "Slim Fit",
//     style: "Casual",
//   },
//   {
//     id: "P006",
//     name: "Striped Business Shirt",
//     description:
//       "Classic striped business shirt for the professional wardrobe. Made with premium cotton for all-day comfort. Features a tailored fit and wrinkle-resistant finish.",
//     price: 3799,
//     originalPrice: 4299,
//     images: [
//       "/placeholder.svg?height=800&width=600&text=Striped+Shirt",
//       "/placeholder.svg?height=800&width=600&text=Striped+Shirt+2",
//       "/placeholder.svg?height=800&width=600&text=Striped+Shirt+3",
//       "/placeholder.svg?height=800&width=600&text=Striped+Shirt+4",
//     ],
//     category: "Formal Shirts",
//     colors: ["Blue Stripe", "Pink Stripe", "Gray Stripe"],
//     sleeve: "Full Sleeve",
//     fit: "Regular Fit",
//     style: "Business",
//   },
//   {
//     id: "P007",
//     name: "Merino Wool Sweater",
//     description:
//       "Luxurious merino wool sweater designed for comfort and warmth. Perfect for layering during colder months. Features a soft texture and excellent temperature regulation.",
//     price: 4999,
//     images: [
//       "/placeholder.svg?height=800&width=600&text=Wool+Sweater",
//       "/placeholder.svg?height=800&width=600&text=Wool+Sweater+2",
//       "/placeholder.svg?height=800&width=600&text=Wool+Sweater+3",
//       "/placeholder.svg?height=800&width=600&text=Wool+Sweater+4",
//     ],
//     category: "Knitwear",
//     colors: ["Navy", "Burgundy", "Gray", "Forest Green"],
//     fit: "Regular Fit",
//     style: "Classic",
//   },
//   {
//     id: "P008",
//     name: "Silk Tie Collection",
//     description:
//       "Premium silk ties to complete your formal attire. Made from 100% pure silk with meticulous attention to detail. Features classic patterns that pair well with any formal shirt.",
//     price: 1999,
//     originalPrice: 2499,
//     images: [
//       "/placeholder.svg?height=800&width=600&text=Silk+Tie",
//       "/placeholder.svg?height=800&width=600&text=Silk+Tie+2",
//       "/placeholder.svg?height=800&width=600&text=Silk+Tie+3",
//       "/placeholder.svg?height=800&width=600&text=Silk+Tie+4",
//     ],
//     category: "Accessories",
//     colors: ["Navy Pattern", "Red Pattern", "Gray Pattern", "Green Pattern"],
//     style: "Formal",
//   },
// ]

// export function getProductById(id: string): Product | undefined {
//   return products.find((product) => product.id === id)
// }
