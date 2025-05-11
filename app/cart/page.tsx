"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Trash2, ArrowLeft, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/components/cart-provider"
import { useToast } from "@/components/ui/use-toast"

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, subtotal, clearCart } = useCart()
  const [couponCode, setCouponCode] = useState("")
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false)
  const { toast } = useToast()

  const handleApplyCoupon = () => {
    setIsApplyingCoupon(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Invalid coupon",
        description: "The coupon code you entered is invalid or expired.",
        variant: "destructive",
      })
      setIsApplyingCoupon(false)
    }, 1000)
  }

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return
    updateQuantity(productId, newQuantity)
  }

  // Calculate order summary
  const shipping = subtotal > 500 ? 0 : 50
  const tax = subtotal * 0.18
  const total = subtotal + shipping + tax

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">Looks like you haven't added anything to your cart yet.</p>
          <Link href="/products">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="rounded-lg border">
              <div className="p-6">
                <div className="flow-root">
                  <ul className="divide-y">
                    {cartItems.map((item) => (
                      <li key={item.id} className="py-6 first:pt-0 last:pb-0">
                        <div className="flex items-center">
                          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              width={96}
                              height={96}
                              className="h-full w-full object-cover"
                            />
                          </div>

                          <div className="ml-4 flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between text-base font-medium">
                                <h3>
                                  <Link href={`/product/${item.id}`} className="hover:text-primary">
                                    {item.name}
                                  </Link>
                                </h3>
                                <p className="ml-4">₹{item.price.toLocaleString()}</p>
                              </div>
                              <p className="mt-1 text-sm text-muted-foreground">Category: {item.category}</p>
                            </div>

                            <div className="flex flex-1 items-end justify-between text-sm">
                              <div className="flex items-center">
                                <button
                                  type="button"
                                  className="h-8 w-8 rounded-md border flex items-center justify-center"
                                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                >
                                  -
                                </button>
                                <span className="mx-2 w-8 text-center">{item.quantity}</span>
                                <button
                                  type="button"
                                  className="h-8 w-8 rounded-md border flex items-center justify-center"
                                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                >
                                  +
                                </button>
                              </div>

                              <Button variant="ghost" size="sm" onClick={() => removeFromCart(item.id)}>
                                <Trash2 className="h-4 w-4 text-muted-foreground" />
                                <span className="sr-only">Remove</span>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="border-t px-6 py-4 flex justify-between">
                <Link href="/products">
                  <Button variant="outline" className="flex items-center">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Continue Shopping
                  </Button>
                </Link>
                <Button variant="outline" onClick={clearCart}>
                  Clear Cart
                </Button>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="rounded-lg border p-6 space-y-6">
              <h2 className="text-lg font-semibold">Order Summary</h2>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax (18%)</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>

                <Separator />

                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>

              <div className="pt-4">
                <div className="flex space-x-2 mb-4">
                  <Input placeholder="Coupon code" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} />
                  <Button variant="outline" onClick={handleApplyCoupon} disabled={!couponCode || isApplyingCoupon}>
                    {isApplyingCoupon ? "Applying..." : "Apply"}
                  </Button>
                </div>

                <Link href="/checkout">
                  <Button className="w-full">Proceed to Checkout</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
