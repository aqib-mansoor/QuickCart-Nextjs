"use client"

import { useState, useMemo } from "react"
import { Search, Grid, List, Sparkles, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MobileNav } from "@/components/mobile-nav"
import { ProductCard } from "@/components/product-card"
import { useCart, type Product } from "@/contexts/cart-context"
import { useRouter } from "next/navigation"

// Sample product data
const sampleProducts: Product[] = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    price: 3499,
    originalPrice: 7999,
    image: "/wireless-bluetooth-headphones.png",
    rating: 4.5,
    reviews: 128,
    category: "Electronics",
    inStock: true,
  },
  {
    id: 2,
    name: "Premium Coffee Beans",
    price: 1499,
    image: "/premium-coffee-beans-bag.png",
    rating: 4.8,
    reviews: 89,
    category: "Food & Beverage",
    inStock: true,
  },
  {
    id: 3,
    name: "Ergonomic Office Chair",
    price: 9999,
    originalPrice: 13999,
    image: "/ergonomic-office-chair-black.png",
    rating: 4.3,
    reviews: 67,
    category: "Furniture",
    inStock: true,
  },
  {
    id: 4,
    name: "Smartphone Case",
    price: 1999,
    image: "/smartphone-protective-case.png",
    rating: 4.2,
    reviews: 203,
    category: "Accessories",
    inStock: false,
  },
   {
    id: 8,
    name: "Laptop Stand",
    price: 1599,
    image: "/Laptop.png",
    rating: 4.1,
    reviews: 32,
     category: "Accessories",
    inStock: true,
  },
  
  {
    id: 6,
    name: "Organic Skincare Set",
    price: 4999,
    originalPrice: 9000,
    image: "/organic-skincare-products-set.png",
    rating: 4.7,
    reviews: 94,
    category: "Beauty",
    inStock: true,
  },
  {
    id: 7,
    name: "Gaming Desk",
    price: 2799,
    originalPrice: 3499,
    image: "/table.png",
    rating: 4.8,
    reviews: 77,
    category: "Furniture",
    inStock: true,
  },
  {
    id: 5,
    name: "Fitness Tracker Watch",
    price: 2399,
    image: "/fitness-tracker-smartwatch.png",
    rating: 4.6,
    reviews: 156,
    category: "Electronics",
    inStock: true,
  },
 
]

export default function EcommercePage() {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const { itemCount } = useCart()

  // Get unique categories
  const categories = ["All", ...Array.from(new Set(sampleProducts.map((p) => p.category)))]

  // Filter and search products
  const filteredProducts = useMemo(() => {
    let filtered = sampleProducts

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter((p) => p.category === selectedCategory)
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    return filtered
  }, [selectedCategory, searchQuery])

  const viewCart = () => {
    router.push("/cart")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80 border-b border-border shadow-realistic">
        <div className="container mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <MobileNav />
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-primary shadow-realistic flex items-center justify-center">
                  <ShoppingBag className="h-4 w-4 text-white" />
                </div>
                <h1 className="text-xl sm:text-2xl font-bold text-primary">QuickCart</h1>
              </div>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Desktop search */}
              <div className="hidden sm:flex relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64 bg-input border-border focus:border-primary transition-colors shadow-realistic"
                />
              </div>

              <Button
                variant="outline"
                size="sm"
                className="relative bg-card hover:bg-primary hover:text-primary-foreground border-border hover:border-primary transition-all duration-200 touch-manipulation shadow-realistic"
                onClick={viewCart}
              >
                <span className="sr-only">Shopping cart</span>
                <ShoppingBag className="h-4 w-4" />
                {itemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-accent hover:bg-accent">
                    {itemCount}
                  </Badge>
                )}
              </Button>
            </div>
          </div>

          {/* Mobile search */}
          <div className="sm:hidden mt-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-input border-border focus:border-primary transition-colors shadow-realistic"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 sm:py-8">
        {/* Hero Section */}
        <section className="text-center mb-8 sm:mb-12 relative overflow-hidden section-bg-1 rounded-2xl shadow-realistic">
          <div className="relative py-12 sm:py-16 px-6">
           
            <h2 className="text-3xl sm:text-5xl font-bold text-foreground mb-4 sm:mb-6 text-balance">
              Discover Amazing <span className="text-primary">Products</span>
            </h2>
            <p className="text-base sm:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
              Shop from our curated collection of high quality products with fast shipping and excellent customer
              service.
            </p>
          </div>
        </section>

        {/* Filters and Controls */}
        <section className="mb-6 sm:mb-8 section-bg-2 rounded-xl p-4 sm:p-6 shadow-realistic">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full text-xs sm:text-sm touch-manipulation transition-all duration-200 shadow-realistic ${
                    selectedCategory === category
                      ? "bg-primary hover:bg-primary/90 shadow-realistic-lg"
                      : "hover:bg-card hover:border-primary/30 bg-card"
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground hidden sm:inline font-medium">
                {filteredProducts.length} products
              </span>
              <div className="flex border border-border rounded-lg overflow-hidden bg-card shadow-realistic">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className={`rounded-none ${viewMode === "grid" ? "bg-primary" : "hover:bg-muted"}`}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className={`rounded-none ${viewMode === "list" ? "bg-primary" : "hover:bg-muted"}`}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Results info for mobile */}
          <div className="sm:hidden text-sm text-muted-foreground font-medium">
            {filteredProducts.length} products found
          </div>
        </section>

        {/* Product Grid */}
        <section className="section-bg-3 rounded-xl p-4 sm:p-6 shadow-realistic">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 bg-card rounded-2xl border border-border shadow-realistic">
              <div className="text-6xl mb-6 opacity-50">🔍</div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">No products found</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Try adjusting your search or filter criteria to find what you're looking for
              </p>
              <Button
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCategory("All")
                }}
                className="bg-primary hover:bg-primary/90 shadow-realistic-lg"
              >
                Clear filters
              </Button>
            </div>
          ) : (
            <div
              className={`grid gap-4 sm:gap-6 ${
                viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
              }`}
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>

        {/* Load More Button */}
        {filteredProducts.length > 0 && (
          <section className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              disabled
              className="border-border hover:bg-card transition-colors bg-card shadow-realistic"
            >
              Load More Products
            </Button>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="section-bg-1 border-t border-border mt-16 shadow-realistic">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-6 h-6 rounded-md bg-primary shadow-realistic flex items-center justify-center">
                  <ShoppingBag className="h-3 w-3 text-white" />
                </div>
                <h3 className="font-semibold text-foreground">QuickCart</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Your trusted online marketplace for quality products and exceptional service.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-3">Customer Service</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="hover:text-primary cursor-pointer transition-colors">Contact Us</li>
                <li className="hover:text-primary cursor-pointer transition-colors">FAQ</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Returns</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Shipping Info</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-3">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="hover:text-primary cursor-pointer transition-colors">About Us</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Careers</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Press</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Blog</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-3">Connect</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="hover:text-primary cursor-pointer transition-colors">Newsletter</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Social Media</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Reviews</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Community</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-6 text-center text-sm text-muted-foreground">
            © 2024 QuickCart. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
