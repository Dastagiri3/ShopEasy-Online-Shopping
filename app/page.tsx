import { Button } from "@/components/ui/button"
import { CategoryCard } from "@/components/category-card"
import { HeroCarousel } from "@/components/hero-carousel"
import { FeaturedProducts } from "@/components/featured-products"
import { getProducts } from "@/lib/data"
import Link from "next/link"

export default async function Home() {
  const products = await getProducts()
  const featuredProducts = products.slice(0, 8)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="mb-12">
        <HeroCarousel />
      </section>

      {/* Categories Section */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Shop by Category</h2>
          <Link href="/categories">
            <Button variant="link">View All</Button>
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <CategoryCard name="Electronics" image="/placeholder.svg?height=200&width=200" href="/category/electronics" />
          <CategoryCard name="Fashion" image="/placeholder.svg?height=200&width=200" href="/category/fashion" />
          <CategoryCard
            name="Home & Kitchen"
            image="/placeholder.svg?height=200&width=200"
            href="/category/home-kitchen"
          />
          <CategoryCard name="Beauty" image="/placeholder.svg?height=200&width=200" href="/category/beauty" />
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Featured Products</h2>
          <Link href="/products">
            <Button variant="link">View All</Button>
          </Link>
        </div>
        <FeaturedProducts products={featuredProducts} />
      </section>

      {/* Deals Section */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Today's Deals</h2>
          <Link href="/deals">
            <Button variant="link">View All</Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative rounded-lg overflow-hidden">
            <img
              src="/placeholder.svg?height=300&width=600"
              alt="Special Deal"
              className="w-full h-[200px] object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6">
              <h3 className="text-white text-xl font-bold mb-2">Up to 50% Off Electronics</h3>
              <Button>Shop Now</Button>
            </div>
          </div>
          <div className="relative rounded-lg overflow-hidden">
            <img
              src="/placeholder.svg?height=300&width=600"
              alt="Special Deal"
              className="w-full h-[200px] object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6">
              <h3 className="text-white text-xl font-bold mb-2">Fashion Sale - Limited Time</h3>
              <Button>Shop Now</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
