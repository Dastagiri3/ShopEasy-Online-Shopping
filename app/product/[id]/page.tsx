import { notFound } from "next/navigation"
import Image from "next/image"
import { Star, Truck, ShieldCheck, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { getProductById, getRelatedProducts } from "@/lib/data"
import { ProductCard } from "@/components/product-card"
import { AddToCartButton } from "@/components/add-to-cart-button"
import Link from "next/link"

interface ProductPageProps {
  params: {
    id: string
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductById(params.id)

  if (!product) {
    notFound()
  }

  const relatedProducts = await getRelatedProducts(product.category)

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/products" className="inline-flex items-center text-sm font-medium mb-6 hover:text-primary">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg border bg-muted">
            <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
            {product.discount > 0 && (
              <Badge variant="destructive" className="absolute top-4 left-4">
                {product.discount}% OFF
              </Badge>
            )}
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="relative aspect-square overflow-hidden rounded-md border bg-muted">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={`Product image ${i}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center mt-2">
              <div className="flex items-center">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < product.rating ? "fill-primary text-primary" : "text-muted"}`}
                    />
                  ))}
              </div>
              <span className="ml-2 text-sm text-muted-foreground">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>
          </div>

          <div className="flex items-center">
            <span className="text-3xl font-bold">₹{product.price.toLocaleString()}</span>
            {product.discount > 0 && (
              <span className="ml-2 text-lg text-muted-foreground line-through">
                ₹{((product.price * 100) / (100 - product.discount)).toFixed(0)}
              </span>
            )}
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-24 text-sm">Availability:</div>
              <Badge variant={product.stock > 0 ? "outline" : "destructive"}>
                {product.stock > 0 ? "In Stock" : "Out of Stock"}
              </Badge>
            </div>

            {product.stock > 0 && (
              <div className="flex items-center">
                <div className="w-24 text-sm">Quantity:</div>
                <div className="flex items-center">
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    -
                  </Button>
                  <span className="w-12 text-center">1</span>
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    +
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <AddToCartButton product={product} className="flex-1" />
            <Button variant="outline" className="flex-1">
              Add to Wishlist
            </Button>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-start">
              <Truck className="h-5 w-5 mr-2 text-primary shrink-0" />
              <div>
                <p className="font-medium">Free Delivery</p>
                <p className="text-sm text-muted-foreground">Free delivery on orders above ₹500</p>
              </div>
            </div>
            <div className="flex items-start">
              <ShieldCheck className="h-5 w-5 mr-2 text-primary shrink-0" />
              <div>
                <p className="font-medium">Warranty</p>
                <p className="text-sm text-muted-foreground">1 year manufacturer warranty</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <Tabs defaultValue="description" className="mb-12">
        <TabsList className="w-full justify-start border-b rounded-none">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="specifications">Specifications</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value="description" className="py-4">
          <div className="prose max-w-none">
            <p>{product.description}</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat.
            </p>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
              laborum.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="specifications" className="py-4">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-medium mb-2">General</h4>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Brand</span>
                    <span>ShopEasy</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Model</span>
                    <span>SE-{product.id}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Color</span>
                    <span>Black</span>
                  </li>
                </ul>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-medium mb-2">Dimensions</h4>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Height</span>
                    <span>10 cm</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Width</span>
                    <span>15 cm</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Weight</span>
                    <span>500 g</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="reviews" className="py-4">
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border-b pb-6 last:border-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-muted mr-3"></div>
                    <div>
                      <p className="font-medium">Customer {i}</p>
                      <p className="text-xs text-muted-foreground">{new Date().toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {Array(5)
                      .fill(0)
                      .map((_, j) => (
                        <Star key={j} className={`h-4 w-4 ${j < 4 ? "fill-primary text-primary" : "text-muted"}`} />
                      ))}
                  </div>
                </div>
                <p className="text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip ex ea commodo consequat.
                </p>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Related Products */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Related Products</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {relatedProducts.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}
