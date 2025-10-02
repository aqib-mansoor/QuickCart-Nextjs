"use client"

import React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, ShoppingCart, Star, Plus, Minus, Heart, Share2, Truck, Shield, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { useCart, type Product } from "@/contexts/cart-context"

// Extended product data with details
const productDetails: Record<
  number,
  Product & {
    description?: string
    features?: string[]
    specifications?: Record<string, string>
  }
> = {
  1: {
    id: 1,
    name: "Wireless Bluetooth Headphones",
     price: 3499,
    originalPrice: 7999,
    image: "/wireless-bluetooth-headphones.png",
    rating: 4.5,
    reviews: 128,
    category: "Electronics",
    inStock: true,
    description:
      "Experience premium sound quality with these wireless Bluetooth headphones. Featuring active noise cancellation, 30-hour battery life, and comfortable over-ear design perfect for music lovers and professionals.",
    features: [
      "Active Noise Cancellation",
      "30-hour battery life",
      "Quick charge: 15 min = 3 hours playback",
      "Premium drivers for rich sound",
      "Comfortable over-ear design",
      "Built-in microphone for calls",
    ],
    specifications: {
      "Driver Size": "40mm",
      "Frequency Response": "20Hz - 20kHz",
      "Battery Life": "30 hours",
      "Charging Time": "2 hours",
      Weight: "250g",
      Connectivity: "Bluetooth 5.0",
    },
  },
  2: {
    id: 2,
    name: "Premium Coffee Beans",
     price: 1499,
    image: "/premium-coffee-beans-bag.png",
    rating: 4.8,
    reviews: 89,
    category: "Food & Beverage",
    inStock: true,
    description:
      "Ethically sourced premium coffee beans from the highlands of Colombia. Medium roast with notes of chocolate and caramel, perfect for espresso or drip coffee.",
    features: [
      "Single-origin Colombian beans",
      "Medium roast profile",
      "Ethically sourced",
      "Freshly roasted weekly",
      "Notes of chocolate and caramel",
      "Perfect for espresso and drip",
    ],
    specifications: {
      Origin: "Colombia",
      "Roast Level": "Medium",
      Weight: "12oz (340g)",
      Processing: "Washed",
      Altitude: "1,200-1,800m",
      Harvest: "2024",
    },
  },
  3: {
    id: 3,
    name: "Ergonomic Office Chair",
   price: 9999,
    originalPrice: 13999,
    image: "/ergonomic-office-chair-black.png",
    rating: 4.3,
    reviews: 67,
    category: "Furniture",
    inStock: true,
    description:
      "Professional ergonomic office chair designed for all-day comfort. Features adjustable lumbar support, breathable mesh back, and premium materials for durability.",
    features: [
      "Adjustable lumbar support",
      "Breathable mesh backrest",
      "Height adjustable seat",
      "360-degree swivel",
      "Smooth-rolling casters",
      "Weight capacity: 300lbs",
    ],
    specifications: {
      "Seat Height": "17-21 inches",
      "Seat Width": "20 inches",
      "Backrest Height": "26 inches",
      "Weight Capacity": "300 lbs",
      Material: "Mesh & Fabric",
      Warranty: "5 years",
    },
  },
  4:{
  id: 4,
  name: "Smartphone Case",
  price: 1999,
  image: "/smartphone-protective-case.png",
  rating: 4.2,
  reviews: 203,
  category: "Accessories",
  inStock: false,
  description:
    "Durable protective smartphone case designed to safeguard your device from drops, scratches, and daily wear. Slim design ensures easy grip and pocket-friendly use.",
  features: [
    "Shock-absorbing TPU material",
    "Scratch-resistant coating",
    "Raised edges for screen protection",
    "Slim and lightweight design",
    "Precise cutouts for all ports and buttons",
    "Supports wireless charging",
  ],
  specifications: {
    Compatibility: "Available for multiple smartphone models",
    Material: "TPU + Polycarbonate",
    Thickness: "2mm",
    Colors: "Black, Blue, Transparent",
    Weight: "50g",
    Warranty: "6 months",
  },
},
5:{
  id: 5,
  name: "Fitness Tracker Watch",
  price: 2399,
  image: "/fitness-tracker-smartwatch.png",
  rating: 4.6,
  reviews: 156,
  category: "Electronics",
  inStock: true,
  description:
    "Compact fitness tracker watch with advanced health monitoring features. Tracks steps, heart rate, sleep, and workouts while keeping you connected with smart notifications.",
  features: [
    "Heart rate and sleep monitoring",
    "Step and calorie tracking",
    "Multiple sports modes",
    "Water-resistant (IP67)",
    "Smart notifications (calls, texts, apps)",
    "Long battery life up to 7 days",
  ],
  specifications: {
    Display: "1.3-inch color LCD",
    Battery: "120mAh (7 days standby)",
    Compatibility: "iOS & Android",
    Connectivity: "Bluetooth 5.0",
    WaterResistance: "IP67",
    Warranty: "1 year",
  },
},
6:{
  id: 6,
  name: "Organic Skincare Set",
  price: 4999,
  originalPrice: 9000,
  image: "/organic-skincare-products-set.png",
  rating: 4.7,
  reviews: 94,
  category: "Beauty",
  inStock: true,
  description:
    "Premium organic skincare set made from natural ingredients for healthy and radiant skin. Includes cleanser, toner, moisturizer, and serum to complete your skincare routine.",
  features: [
    "100% organic and cruelty-free",
    "Suitable for all skin types",
    "Hydrating and nourishing formula",
    "Free from parabens and sulfates",
    "Dermatologist tested",
    "Eco-friendly packaging",
  ],
  specifications: {
    SetIncludes: "Cleanser, Toner, Moisturizer, Serum",
    SkinType: "All skin types",
    Ingredients: "Aloe Vera, Green Tea, Rose Extract, Vitamin E",
    Volume: "4 x 100ml bottles",
    ShelfLife: "24 months",
    Warranty: "Satisfaction Guarantee",
  },
},
   7: {
   id: 7,
    name: "Gaming Desk",
    price: 2799,
    originalPrice: 3499,
    image: "/table.png",
    rating: 4.8,
    reviews: 77,
    category: "Furniture",
    inStock: true,
  description:
    "Spacious and durable gaming desk designed for pro-level setups. Features a sturdy steel frame, large surface area for monitors and accessories, and cable management system for a clutter-free experience.",
  features: [
    "Large surface area for dual/triple monitors",
    "Sturdy steel frame construction",
    "Carbon fiber textured desktop",
    "Built-in cable management grommets",
    "Headphone and cup holder attachments",
    "Ergonomic Z-shaped design for stability",
  ],
  specifications: {
    "Desk Dimensions": "55 x 25 x 30 inches",
    "Weight Capacity": "200 lbs",
    "Material": "Carbon Fiber + Steel",
    "Surface Finish": "Scratch-resistant",
    "Cable Management": "Yes",
    "Warranty": "2 years",
  },
  },
  8:{
  id: 8,
  name: "Laptop Stand",
  price: 1599,
  image: "/Laptop.png",
  rating: 4.1,
  reviews: 32,
  category: "Accessories",
  inStock: true,
  description:
    "Ergonomic laptop stand designed to improve posture and cooling while working. Lightweight yet sturdy, suitable for home, office, or travel use.",
  features: [
    "Adjustable height and angle",
    "Sturdy aluminum alloy build",
    "Foldable and portable design",
    "Non-slip silicone pads for stability",
    "Ventilated design for better airflow",
    "Supports laptops up to 17 inches",
  ],
  specifications: {
    Compatibility: "Fits laptops 10–17 inches",
    Material: "Aluminum Alloy + Silicone",
    WeightCapacity: "20 kg",
    Adjustability: "6 height levels",
    Dimensions: "10 x 9 x 1.5 inches (folded)",
    Warranty: "1 year",
  },
}

}

// Sample reviews data
const sampleReviews = [
  {
    id: 1,
    author: "Sarah M.",
    rating: 5,
    date: "2024-01-15",
    comment:
      "Absolutely love these headphones! The sound quality is incredible and the battery life is exactly as advertised.",
  },
  {
    id: 2,
    author: "Mike R.",
    rating: 4,
    date: "2024-01-10",
    comment: "Great value for money. Comfortable to wear for long periods and the noise cancellation works well.",
  },
  {
    id: 3,
    author: "Jennifer L.",
    rating: 5,
    date: "2024-01-08",
    comment: "Perfect for my daily commute. The quick charge feature is a lifesaver when I forget to charge overnight.",
  },
  
]
export default function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const resolvedParams = React.use(params)  // ← Add this line
  const productId = Number.parseInt(resolvedParams.id)  // ← Change this line
  const product = productDetails[productId]

  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)

  const { addItem, itemCount } = useCart()

  // If product not found, show error
  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <Button onClick={() => router.push("/")}>Back to Shop</Button>
        </div>
      </div>
    )
  }

  const handleQuantityChange = (change: number) => {
    setQuantity(Math.max(1, quantity + change))
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product)
    }
    setQuantity(1) // Reset quantity after adding
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => router.push("/")}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Shop
              </Button>
              <h1 className="text-xl font-bold text-foreground">QuickCart</h1>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="relative bg-transparent"
                onClick={() => router.push("/cart")}
              >
                <ShoppingCart className="h-4 w-4" />
                {itemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {itemCount}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-lg bg-card">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-96 lg:h-[500px] object-cover"
              />
              {product.originalPrice && (
                <Badge className="absolute top-4 left-4 bg-destructive">
                  Save Rs.{(product.originalPrice - product.price).toFixed(2)}
                </Badge>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-2">
                {product.category}
              </Badge>
              <h1 className="text-3xl font-bold text-foreground mb-4 text-balance">{product.name}</h1>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-muted-foreground">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold text-foreground">Rs.{product.price}</span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">Rs.{product.originalPrice}</span>
                )}
              </div>

              <p className="text-muted-foreground text-pretty leading-relaxed mb-6">{product.description}</p>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">Quantity:</span>
                <div className="flex items-center border border-border rounded-md">
                  <Button variant="ghost" size="sm" onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}>
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-4 py-2 text-sm font-medium">{quantity}</span>
                  <Button variant="ghost" size="sm" onClick={() => handleQuantityChange(1)}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex gap-3">
                <Button className="flex-1" onClick={handleAddToCart} disabled={!product.inStock}>
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {product.inStock ? "Add to Cart" : "Out of Stock"}
                </Button>
                <Button variant="outline" size="icon" onClick={() => setIsWishlisted(!isWishlisted)}>
                  <Heart className={`h-4 w-4 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Truck className="h-4 w-4" />
                <span>Free shipping on orders over Rs.5000</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4" />
                <span>1-year warranty included</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <RotateCcw className="h-4 w-4" />
                <span>30-day return policy</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Tabs defaultValue="features" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="features" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Key Features</h3>
                <ul className="space-y-2">
                  {product.features?.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="specifications" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Technical Specifications</h3>
                <div className="space-y-3">
                  {product.specifications &&
                    Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center py-2">
                        <span className="font-medium">{key}:</span>
                        <span className="text-muted-foreground">{value}</span>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">Customer Reviews</h3>
                  <Button variant="outline" size="sm">
                    Write a Review
                  </Button>
                </div>

                <div className="space-y-6">
                  {sampleReviews.map((review) => (
                    <div key={review.id}>
                      <div className="flex items-center gap-4 mb-2">
                        <span className="font-medium">{review.author}</span>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">{review.date}</span>
                      </div>
                      <p className="text-muted-foreground text-pretty">{review.comment}</p>
                      {review.id < sampleReviews.length && <Separator className="mt-4" />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
