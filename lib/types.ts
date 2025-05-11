export interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  stock: number
  rating: number
  reviewCount: number
  discount: number
}

export interface CartItem extends Product {
  quantity: number
}
