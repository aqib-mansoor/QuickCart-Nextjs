"use client"

import type React from "react"

import { useState } from "react"
import { Star, Plus, Heart, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { useCart, type Product } from "@/contexts/cart-context"
import { useRouter } from "next/navigation"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const router = useRouter()
  const { addItem } = useCart()
  const [isLoading, setIsLoading] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsLoading(true)

    // Simulate loading for better UX
    await new Promise((resolve) => setTimeout(resolve, 300))

    addItem(product)
    setIsLoading(false)
  }

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsWishlisted(!isWishlisted)
  }

  const viewProductDetails = () => {
    router.push(`/product/${product.id}`)
  }

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      <CardContent className="p-0">
        <div className="relative overflow-hidden cursor-pointer" onClick={viewProductDetails}>
          {/* Image with loading state */}
          <div className="relative h-64 bg-muted">
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <LoadingSpinner size="md" />
              </div>
            )}
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className={`w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setImageLoaded(true)}
            />

            {/* Overlay actions */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 space-y-2">
              <Button
                size="sm"
                variant="secondary"
                className="h-8 w-8 p-0 rounded-full bg-background/90 hover:bg-background"
                onClick={handleWishlist}
              >
                <Heart className={`h-4 w-4 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
              </Button>
              <Button
                size="sm"
                variant="secondary"
                className="h-8 w-8 p-0 rounded-full bg-background/90 hover:bg-background"
                onClick={(e) => {
                  e.stopPropagation()
                  viewProductDetails()
                }}
              >
                <Eye className="h-4 w-4" />
              </Button>
            </div>

            {/* Badges */}
            <div className="absolute top-3 left-3 space-y-1">
              {product.originalPrice && (
                <Badge className="bg-destructive text-destructive-foreground">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                </Badge>
              )}
              {!product.inStock && <Badge variant="secondary">Out of Stock</Badge>}
            </div>
          </div>

          <div className="p-4 space-y-3">
            <h3
              className="font-semibold text-foreground line-clamp-2 cursor-pointer hover:text-primary transition-colors leading-tight"
              onClick={viewProductDetails}
            >
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3.5 w-3.5 ${
                      i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">
                {product.rating} ({product.reviews})
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-foreground">Rs.{product.price}</span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">Rs.{product.originalPrice}</span>
              )}
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full touch-manipulation"
          onClick={handleAddToCart}
          disabled={!product.inStock || isLoading}
          size="sm"
        >
          {isLoading ? <LoadingSpinner size="sm" className="mr-2" /> : <Plus className="h-4 w-4 mr-2" />}
          {product.inStock ? (isLoading ? "Adding..." : "Add to Cart") : "Out of Stock"}
        </Button>
      </CardFooter>
    </Card>
  )
}
