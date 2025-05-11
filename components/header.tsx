"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Search, ShoppingCart, User, Menu, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useCart } from "@/components/cart-provider"
import { useAuth } from "@/components/auth-provider"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { cartItems } = useCart()
  const { user, logout } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        isScrolled ? "bg-background/95 backdrop-blur shadow-sm" : "bg-background"
      }`}
    >
      {/* Top Bar */}
      <div className="border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-primary">ShopEasy</span>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 mx-6">
            <div className="relative w-full max-w-2xl">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for products, brands and more..."
                className="w-full pl-10 pr-4"
              />
            </div>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-4">
            <Link href="/wishlist">
              <Button variant="ghost" size="icon">
                <Heart className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItems.length > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {cartItems.length}
                  </Badge>
                )}
              </Button>
            </Link>
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/account/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/account/orders">Orders</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/account/wishlist">Wishlist</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login">
                <Button variant="outline">Login</Button>
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItems.length > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {cartItems.length}
                  </Badge>
                )}
              </Button>
            </Link>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col h-full">
                  <div className="py-4">
                    <div className="relative mb-4">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input type="search" placeholder="Search..." className="w-full pl-10 pr-4" />
                    </div>
                    <nav className="flex flex-col space-y-4">
                      <Link href="/" className="py-2 hover:text-primary">
                        Home
                      </Link>
                      <Link href="/products" className="py-2 hover:text-primary">
                        All Products
                      </Link>
                      <Link href="/categories" className="py-2 hover:text-primary">
                        Categories
                      </Link>
                      <Link href="/deals" className="py-2 hover:text-primary">
                        Deals
                      </Link>
                      <Link href="/wishlist" className="py-2 hover:text-primary">
                        Wishlist
                      </Link>
                    </nav>
                  </div>
                  <div className="mt-auto">
                    {user ? (
                      <>
                        <div className="flex flex-col space-y-2">
                          <Link href="/account/profile">
                            <Button variant="outline" className="w-full justify-start">
                              <User className="mr-2 h-4 w-4" />
                              My Profile
                            </Button>
                          </Link>
                          <Link href="/account/orders">
                            <Button variant="outline" className="w-full justify-start">
                              Orders
                            </Button>
                          </Link>
                          <Button variant="outline" className="w-full justify-start" onClick={logout}>
                            Logout
                          </Button>
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col space-y-2">
                        <Link href="/login">
                          <Button className="w-full">Login</Button>
                        </Link>
                        <Link href="/signup">
                          <Button variant="outline" className="w-full">
                            Sign Up
                          </Button>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Categories Navigation */}
      <div className="border-b">
        <div className="container mx-auto px-4">
          <nav className="hidden md:flex items-center space-x-8 overflow-x-auto py-2">
            <Link
              href="/category/electronics"
              className={`text-sm whitespace-nowrap ${
                pathname === "/category/electronics"
                  ? "font-medium text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Electronics
            </Link>
            <Link
              href="/category/fashion"
              className={`text-sm whitespace-nowrap ${
                pathname === "/category/fashion"
                  ? "font-medium text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Fashion
            </Link>
            <Link
              href="/category/home-kitchen"
              className={`text-sm whitespace-nowrap ${
                pathname === "/category/home-kitchen"
                  ? "font-medium text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Home & Kitchen
            </Link>
            <Link
              href="/category/beauty"
              className={`text-sm whitespace-nowrap ${
                pathname === "/category/beauty"
                  ? "font-medium text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Beauty
            </Link>
            <Link
              href="/category/toys"
              className={`text-sm whitespace-nowrap ${
                pathname === "/category/toys"
                  ? "font-medium text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Toys & Games
            </Link>
            <Link
              href="/category/sports"
              className={`text-sm whitespace-nowrap ${
                pathname === "/category/sports"
                  ? "font-medium text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Sports & Outdoors
            </Link>
            <Link
              href="/category/books"
              className={`text-sm whitespace-nowrap ${
                pathname === "/category/books"
                  ? "font-medium text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Books
            </Link>
            <Link
              href="/deals"
              className={`text-sm whitespace-nowrap ${
                pathname === "/deals" ? "font-medium text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Today's Deals
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
