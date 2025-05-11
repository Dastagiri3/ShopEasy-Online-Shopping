import type { Product } from "./types"

// Mock data for products
const products: Product[] = [
  {
    id: "1",
    name: "Wireless Bluetooth Headphones",
    description: "Premium noise-cancelling headphones with 30-hour battery life",
    price: 12999,
    image: "/placeholder.svg?height=400&width=400",
    category: "electronics",
    stock: 50,
    rating: 4.5,
    reviewCount: 128,
    discount: 15,
  },
  {
    id: "2",
    name: "Smartphone Pro Max",
    description: "Latest flagship smartphone with advanced camera system",
    price: 89999,
    image: "/placeholder.svg?height=400&width=400",
    category: "electronics",
    stock: 25,
    rating: 4.8,
    reviewCount: 256,
    discount: 0,
  },
  {
    id: "3",
    name: 'Ultra HD Smart TV 55"',
    description: "4K Ultra HD Smart TV with HDR and built-in streaming apps",
    price: 49999,
    image: "/placeholder.svg?height=400&width=400",
    category: "electronics",
    stock: 15,
    rating: 4.6,
    reviewCount: 89,
    discount: 10,
  },
  {
    id: "4",
    name: "Men's Running Shoes",
    description: "Lightweight and comfortable running shoes for all terrains",
    price: 3999,
    image: "/placeholder.svg?height=400&width=400",
    category: "fashion",
    stock: 100,
    rating: 4.3,
    reviewCount: 75,
    discount: 20,
  },
  {
    id: "5",
    name: "Women's Casual Dress",
    description: "Elegant casual dress perfect for any occasion",
    price: 2499,
    image: "/placeholder.svg?height=400&width=400",
    category: "fashion",
    stock: 80,
    rating: 4.4,
    reviewCount: 62,
    discount: 0,
  },
  {
    id: "6",
    name: "Stainless Steel Cookware Set",
    description: "10-piece stainless steel cookware set for all your cooking needs",
    price: 7999,
    image: "/placeholder.svg?height=400&width=400",
    category: "home-kitchen",
    stock: 30,
    rating: 4.7,
    reviewCount: 45,
    discount: 5,
  },
  {
    id: "7",
    name: "Robot Vacuum Cleaner",
    description: "Smart robot vacuum with mapping technology and app control",
    price: 24999,
    image: "/placeholder.svg?height=400&width=400",
    category: "home-kitchen",
    stock: 20,
    rating: 4.5,
    reviewCount: 38,
    discount: 0,
  },
  {
    id: "8",
    name: "Premium Skincare Set",
    description: "Complete skincare routine with cleanser, toner, and moisturizer",
    price: 3499,
    image: "/placeholder.svg?height=400&width=400",
    category: "beauty",
    stock: 60,
    rating: 4.6,
    reviewCount: 92,
    discount: 10,
  },
  {
    id: "9",
    name: "Fitness Tracker Watch",
    description: "Advanced fitness tracker with heart rate monitoring and GPS",
    price: 8999,
    image: "/placeholder.svg?height=400&width=400",
    category: "electronics",
    stock: 40,
    rating: 4.4,
    reviewCount: 67,
    discount: 0,
  },
  {
    id: "10",
    name: "Portable Bluetooth Speaker",
    description: "Waterproof portable speaker with 20-hour battery life",
    price: 4999,
    image: "/placeholder.svg?height=400&width=400",
    category: "electronics",
    stock: 55,
    rating: 4.3,
    reviewCount: 83,
    discount: 15,
  },
  {
    id: "11",
    name: "Leather Wallet",
    description: "Genuine leather wallet with multiple card slots",
    price: 1499,
    image: "/placeholder.svg?height=400&width=400",
    category: "fashion",
    stock: 120,
    rating: 4.2,
    reviewCount: 48,
    discount: 0,
  },
  {
    id: "12",
    name: "Coffee Maker",
    description: "Programmable coffee maker with thermal carafe",
    price: 5999,
    image: "/placeholder.svg?height=400&width=400",
    category: "home-kitchen",
    stock: 35,
    rating: 4.5,
    reviewCount: 56,
    discount: 5,
  },
]

// Function to get all products
export async function getProducts(): Promise<Product[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return products
}

// Function to get a product by ID
export async function getProductById(id: string): Promise<Product | undefined> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return products.find((product) => product.id === id)
}

// Function to get related products by category
export async function getRelatedProducts(category: string): Promise<Product[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return products.filter((product) => product.category === category)
}
