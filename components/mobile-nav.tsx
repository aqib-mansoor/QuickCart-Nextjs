"use client"

import { useState } from "react"
import { Menu, X, ShoppingCart, Home, User, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useCart } from "@/contexts/cart-context"
import { useRouter } from "next/navigation"

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const { itemCount } = useCart()
  const router = useRouter()

  const navItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Package, label: "Orders", href: "/orders" },
    { icon: User, label: "Account", href: "/account" },
  ]

  const handleNavigation = (href: string) => {
    router.push(href)
    setIsOpen(false)
  }

  return (
    <div className="md:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="sm">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-lg font-bold">QuickCart</h2>
              <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <nav className="flex-1 space-y-2">
              {navItems.map((item) => (
                <Button
                  key={item.href}
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => handleNavigation(item.href)}
                >
                  <item.icon className="h-4 w-4 mr-3" />
                  {item.label}
                </Button>
              ))}

              <Button
                variant="ghost"
                className="w-full justify-start relative"
                onClick={() => handleNavigation("/cart")}
              >
                <ShoppingCart className="h-4 w-4 mr-3" />
                Cart
                {itemCount > 0 && (
                  <Badge className="ml-auto h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {itemCount}
                  </Badge>
                )}
              </Button>
            </nav>

            <div className="border-t pt-4 mt-4">
              <p className="text-xs text-muted-foreground text-center">
                © 2024 QuickCart. All rights reserved.
              </p>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
