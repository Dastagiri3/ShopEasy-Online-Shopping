"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Heart, ShoppingCart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/components/cart-provider"
import type { Product } from "@/lib/types"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const { addToCart } = useCart()

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsWishlisted(!isWishlisted)
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addToCart(product)
  }

  return (
    <Link href={`/product/${product.id}`}>
      <div className="group relative flex flex-col overflow-hidden rounded-lg border bg-background transition-all hover:shadow-md">
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden bg-muted">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
          {product.discount > 0 && (
            <Badge variant="destructive" className="absolute top-2 left-2">
              {product.discount}% OFF
            </Badge>
          )}
          <Button
            variant="ghost"
            size="icon"
            className={`absolute top-2 right-2 h-8 w-8 rounded-full bg-background/80 ${
              isWishlisted ? "text-red-500" : "text-muted-foreground"
            }`}
            onClick={toggleWishlist}
          >
            <Heart className={`h-4 w-4 ${isWishlisted ? "fill-red-500" : ""}`} />
            <span className="sr-only">Add to wishlist</span>
          </Button>
        </div>

        {/* Product Info */}
        <div className="flex flex-1 flex-col p-4">
          <h3 className="font-medium line-clamp-2 mb-2 text-sm">{product.name}</h3>

          {/* Rating */}
          <div className="flex items-center mb-2">
            <div className="flex items-center">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3 w-3 ${i < product.rating ? "fill-primary text-primary" : "text-muted"}`}
                  />
                ))}
            </div>
            <span className="ml-1 text-xs text-muted-foreground">({product.reviewCount})</span>
          </div>

          {/* Price */}
          <div className="mb-2 flex items-center">
            <span className="font-semibold">₹{product.price.toLocaleString()}</span>
            {product.discount > 0 && (
              <span className="ml-2 text-sm text-muted-foreground line-through">
                ₹{((product.price * 100) / (100 - product.discount)).toFixed(0)}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <Button className="mt-auto w-full" size="sm" onClick={handleAddToCart}>
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      </div>
    </Link>
  )
}
