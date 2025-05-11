"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const slides = [
  {
    id: 1,
    image: "/placeholder.svg?height=500&width=1200",
    title: "Summer Sale",
    description: "Up to 50% off on all summer essentials",
    buttonText: "Shop Now",
    buttonLink: "/deals",
  },
  {
    id: 2,
    image: "/placeholder.svg?height=500&width=1200",
    title: "New Electronics",
    description: "Discover the latest gadgets and tech",
    buttonText: "Explore",
    buttonLink: "/category/electronics",
  },
  {
    id: 3,
    image: "/placeholder.svg?height=500&width=1200",
    title: "Fashion Collection",
    description: "Trendy styles for every occasion",
    buttonText: "View Collection",
    buttonLink: "/category/fashion",
  },
]

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative overflow-hidden rounded-lg">
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="w-full flex-shrink-0">
            <div className="relative h-[300px] md:h-[400px] w-full">
              <img src={slide.image || "/placeholder.svg"} alt={slide.title} className="h-full w-full object-cover" />
              <div className="absolute inset-0 flex flex-col justify-center bg-gradient-to-r from-black/60 to-transparent p-8 text-white">
                <h2 className="mb-2 text-3xl font-bold md:text-4xl">{slide.title}</h2>
                <p className="mb-4 max-w-md text-lg">{slide.description}</p>
                <div>
                  <Button size="lg">{slide.buttonText}</Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="absolute left-2 top-1/2 h-10 w-10 -translate-y-1/2 rounded-full bg-background/80 text-foreground"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
        <span className="sr-only">Previous slide</span>
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-1/2 h-10 w-10 -translate-y-1/2 rounded-full bg-background/80 text-foreground"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
        <span className="sr-only">Next slide</span>
      </Button>

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full ${currentSlide === index ? "bg-primary" : "bg-white/50"}`}
            onClick={() => setCurrentSlide(index)}
          >
            <span className="sr-only">Go to slide {index + 1}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
