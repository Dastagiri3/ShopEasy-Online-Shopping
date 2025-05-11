import Link from "next/link"
import Image from "next/image"

interface CategoryCardProps {
  name: string
  image: string
  href: string
}

export function CategoryCard({ name, image, href }: CategoryCardProps) {
  return (
    <Link href={href} className="group">
      <div className="relative overflow-hidden rounded-lg">
        <div className="aspect-square bg-muted">
          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            width={200}
            height={200}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
          <h3 className="text-white font-medium">{name}</h3>
        </div>
      </div>
    </Link>
  )
}
