"use client"

import { useState } from "react"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-provider"
import type { Product } from "@/lib/types"

interface AddToCartButtonProps {
  product: Product
  quantity?: number
  className?: string
}

export function AddToCartButton({ product, quantity = 1, className = "" }: AddToCartButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    setIsLoading(true)

    // Simulate a delay to show loading state
    setTimeout(() => {
      addToCart(product, quantity)
      setIsLoading(false)
    }, 500)
  }

  return (
    <Button onClick={handleAddToCart} disabled={isLoading || product.stock <= 0} className={className}>
      {isLoading ? (
        "Adding..."
      ) : (
        <>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </>
      )}
    </Button>
  )
}
