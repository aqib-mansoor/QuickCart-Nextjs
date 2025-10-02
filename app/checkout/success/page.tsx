"use client"

import { useRouter } from "next/navigation"
import { CheckCircle, Package, Truck, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function CheckoutSuccessPage() {
  const router = useRouter()

  // Generate a mock order number
  const orderNumber = `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center">
            <h1 className="text-xl font-bold text-foreground">QuickCart</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="mb-8">
            <CheckCircle className="h-24 w-24 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-foreground mb-2">Order Confirmed!</h1>
            <p className="text-lg text-muted-foreground">
              Thank you for your purchase. Your order has been successfully placed.
            </p>
          </div>

          {/* Order Details */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Order Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Order Number:</span>
                <span className="font-mono text-primary">{orderNumber}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Estimated Delivery:</span>
                <span>3-5 business days</span>
              </div>
            </CardContent>
          </Card>

          {/* What's Next */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>What happens next?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="space-y-2">
                  <Mail className="h-8 w-8 text-primary mx-auto" />
                  <h3 className="font-medium">Confirmation Email</h3>
                  <p className="text-sm text-muted-foreground">You'll receive an order confirmation email shortly</p>
                </div>
                <div className="space-y-2">
                  <Package className="h-8 w-8 text-primary mx-auto" />
                  <h3 className="font-medium">Processing</h3>
                  <p className="text-sm text-muted-foreground">We'll prepare your items for shipment</p>
                </div>
                <div className="space-y-2">
                  <Truck className="h-8 w-8 text-primary mx-auto" />
                  <h3 className="font-medium">Shipping</h3>
                  <p className="text-sm text-muted-foreground">Your order will be shipped within 1-2 business days</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => router.push("/")} size="lg">
              Continue Shopping
            </Button>
            <Button variant="outline" size="lg" onClick={() => window.print()}>
              Print Receipt
            </Button>
          </div>

          {/* Support */}
          <div className="mt-12 p-6 bg-muted rounded-lg">
            <h3 className="font-medium mb-2">Need Help?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              If you have any questions about your order, please don't hesitate to contact us.
            </p>
            <Button variant="outline" size="sm">
              Contact Support
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
