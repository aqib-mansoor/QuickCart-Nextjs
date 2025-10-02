"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, CreditCard, Truck, Shield, Check, ChevronDown, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { useCart } from "@/contexts/cart-context"

interface CheckoutFormData {
  email: string
  firstName: string
  lastName: string
  address: string
  city: string
  state: string
  zipCode: string
  phone: string
  paymentMethod: string
  cardNumber: string
  expiryDate: string
  cvv: string
  nameOnCard: string
  saveInfo: boolean
}

interface ValidationErrors {
  [key: string]: string
}

export default function CheckoutPage() {
  const router = useRouter()
  const { items, total, itemCount, clearCart } = useCart()
  const [currentStep, setCurrentStep] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)
  const [showOrderSummary, setShowOrderSummary] = useState(false)
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({})

  const [formData, setFormData] = useState<CheckoutFormData>({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
    paymentMethod: "credit-card",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
    saveInfo: false,
  })

  // Redirect if cart is empty
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-muted-foreground mb-6">Add some items to your cart before checking out.</p>
          <Button onClick={() => router.push("/")}>Continue Shopping</Button>
        </div>
      </div>
    )
  }

  const validateField = (field: keyof CheckoutFormData, value: string): string => {
    switch (field) {
      case "email":
        if (!value) return "Email is required"
        if (!/\S+@\S+\.\S+/.test(value)) return "Please enter a valid email"
        return ""
      case "firstName":
        return !value ? "First name is required" : ""
      case "lastName":
        return !value ? "Last name is required" : ""
      case "address":
        return !value ? "Address is required" : ""
      case "city":
        return !value ? "City is required" : ""
      case "state":
        return !value ? "State is required" : ""
      case "zipCode":
        if (!value) return "ZIP code is required"
        if (!/^\d{5}(-\d{4})?$/.test(value)) return "Please enter a valid ZIP code"
        return ""
      case "phone":
        if (!value) return "Phone number is required"
        const phoneDigits = value.replace(/\D/g, "")
        if (phoneDigits.length !== 10) return "Please enter a valid 10-digit phone number"
        return ""
      case "cardNumber":
        if (formData.paymentMethod === "credit-card") {
          if (!value) return "Card number is required"
          const cardDigits = value.replace(/\s/g, "")
          if (cardDigits.length !== 16 || !/^\d+$/.test(cardDigits)) {
            return "Please enter a valid 16-digit card number"
          }
        }
        return ""
      case "expiryDate":
        if (formData.paymentMethod === "credit-card") {
          if (!value) return "Expiry date is required"
          if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(value)) return "Please enter MM/YY format"
        }
        return ""
      case "cvv":
        if (formData.paymentMethod === "credit-card") {
          if (!value) return "CVV is required"
          if (!/^\d{3,4}$/.test(value)) return "Please enter a valid CVV"
        }
        return ""
      case "nameOnCard":
        if (formData.paymentMethod === "credit-card") {
          return !value ? "Name on card is required" : ""
        }
        return ""
      default:
        return ""
    }
  }

  const handleInputChange = (field: keyof CheckoutFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    if (typeof value === "string" && validationErrors[field]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const validateStep = (step: number): { isValid: boolean; errors: ValidationErrors } => {
    const errors: ValidationErrors = {}

    switch (step) {
      case 1:
        const step1Fields: (keyof CheckoutFormData)[] = [
          "email",
          "firstName",
          "lastName",
          "address",
          "city",
          "state",
          "zipCode",
          "phone",
        ]
        step1Fields.forEach((field) => {
          const error = validateField(field, formData[field] as string)
          if (error) errors[field] = error
        })
        break
      case 2:
        if (formData.paymentMethod === "credit-card") {
          const step2Fields: (keyof CheckoutFormData)[] = ["cardNumber", "expiryDate", "cvv", "nameOnCard"]
          step2Fields.forEach((field) => {
            const error = validateField(field, formData[field] as string)
            if (error) errors[field] = error
          })
        }
        break
    }

    return { isValid: Object.keys(errors).length === 0, errors }
  }

  const nextStep = () => {
    console.log("[v0] Next step clicked, current step:", currentStep)
    const validation = validateStep(currentStep)
    console.log("[v0] Validation result:", validation)

    if (validation.isValid) {
      console.log("[v0] Validation passed, moving to next step")
      setValidationErrors({})
      setCurrentStep((prev) => Math.min(prev + 1, 3))
    } else {
      console.log("[v0] Validation failed, errors:", validation.errors)
      setValidationErrors(validation.errors)
    }
  }

  const prevStep = () => {
    setValidationErrors({})
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleSubmitOrder = async () => {
    setIsProcessing(true)

    // Simulate order processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Clear cart and redirect to success page
    clearCart()
    router.push("/checkout/success")
  }

  const subtotal = total
const shipping = subtotal > 5000 ? 0 : 99
  const tax = subtotal * 0.08
  const finalTotal = subtotal + shipping + tax

  const steps = [
    { number: 1, title: "Shipping", description: "Address information" },
    { number: 2, title: "Payment", description: "Payment details" },
    { number: 3, title: "Review", description: "Order confirmation" },
  ]

  const renderInputWithValidation = (
    id: keyof CheckoutFormData,
    label: string,
    type = "text",
    placeholder = "",
    className = "",
  ) => (
    <div className={className}>
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        value={formData[id] as string}
        onChange={(e) => handleInputChange(id, e.target.value)}
        placeholder={placeholder}
        className={`touch-manipulation ${validationErrors[id] ? "border-red-500 focus:border-red-500" : ""}`}
      />
      {validationErrors[id] && (
        <div className="flex items-center gap-1 mt-1 text-sm text-red-600">
          <AlertCircle className="h-3 w-3" />
          <span>{validationErrors[id]}</span>
        </div>
      )}
    </div>
  )

  const currentStepValidation = validateStep(currentStep)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => router.push("/cart")}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Back to Cart</span>
                <span className="sm:hidden">Back</span>
              </Button>
              <h1 className="text-lg sm:text-xl font-bold text-foreground">Checkout</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress Steps - Desktop */}
            <div className="hidden sm:flex items-center justify-between mb-8">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                      currentStep >= step.number
                        ? "bg-primary border-primary text-primary-foreground"
                        : "border-border text-muted-foreground"
                    }`}
                  >
                    {currentStep > step.number ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <span className="text-sm font-medium">{step.number}</span>
                    )}
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-foreground">{step.title}</p>
                    <p className="text-xs text-muted-foreground">{step.description}</p>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-16 h-0.5 mx-4 transition-colors ${
                        currentStep > step.number ? "bg-primary" : "bg-border"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Progress Steps - Mobile */}
            <div className="sm:hidden mb-6">
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                <span>
                  Step {currentStep} of {steps.length}
                </span>
                <span>{Math.round((currentStep / steps.length) * 100)}% Complete</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(currentStep / steps.length) * 100}%` }}
                />
              </div>
              <p className="text-sm font-medium mt-2">{steps[currentStep - 1].title}</p>
            </div>

            {/* Step 1: Shipping Information */}
            {currentStep === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Truck className="h-5 w-5" />
                    Shipping Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {renderInputWithValidation("email", "Email Address", "email", "your@email.com", "sm:col-span-2")}
                    {renderInputWithValidation("firstName", "First Name", "text", "John")}
                    {renderInputWithValidation("lastName", "Last Name", "text", "Doe")}
                    {renderInputWithValidation("address", "Address", "text", "123 Main Street", "sm:col-span-2")}
                    {renderInputWithValidation("city", "City", "text", "New York")}
                    {renderInputWithValidation("state", "State", "text", "NY")}
                    {renderInputWithValidation("zipCode", "ZIP Code", "text", "10001")}
                    {renderInputWithValidation("phone", "Phone Number", "tel", "(555) 123-4567")}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Payment Information */}
            {currentStep === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <CreditCard className="h-5 w-5" />
                    Payment Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <RadioGroup
                    value={formData.paymentMethod}
                    onValueChange={(value) => handleInputChange("paymentMethod", value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="credit-card" id="credit-card" />
                      <Label htmlFor="credit-card">Credit Card</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="paypal" id="paypal" />
                      <Label htmlFor="paypal">PayPal</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="cod" id="cod" />
                      <Label htmlFor="cod">Cash on Delivery (COD)</Label>
                    </div>
                  </RadioGroup>

                  {formData.paymentMethod === "credit-card" && (
                    <div className="space-y-4 pt-4">
                      {renderInputWithValidation("nameOnCard", "Name on Card", "text", "John Doe")}
                      {renderInputWithValidation("cardNumber", "Card Number", "text", "1234 5678 9012 3456")}

                      <div className="grid grid-cols-2 gap-4">
                        {renderInputWithValidation("expiryDate", "Expiry Date", "text", "MM/YY")}
                        {renderInputWithValidation("cvv", "CVV", "text", "123")}
                      </div>
                    </div>
                  )}

                  {formData.paymentMethod === "paypal" && (
                    <div className="p-4 bg-muted rounded-lg text-center">
                      <p className="text-sm text-muted-foreground">
                        You will be redirected to PayPal to complete your payment.
                      </p>
                    </div>
                  )}

                  {formData.paymentMethod === "cod" && (
                    <div className="p-4 bg-muted rounded-lg">
                      <h4 className="font-medium mb-2">Cash on Delivery</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Pay with cash when your order is delivered to your doorstep.
                      </p>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        <li>• No advance payment required</li>
                        <li>• Pay the exact amount to the delivery person</li>
                        <li>• Additional COD charges may apply</li>
                      </ul>
                    </div>
                  )}

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="saveInfo"
                      checked={formData.saveInfo}
                      onCheckedChange={(checked) => handleInputChange("saveInfo", checked as boolean)}
                    />
                    <Label htmlFor="saveInfo" className="text-sm">
                      Save this information for next time
                    </Label>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Order Review */}
            {currentStep === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Shield className="h-5 w-5" />
                    Order Review
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Shipping Address */}
                  <div>
                    <h4 className="font-medium mb-2">Shipping Address</h4>
                    <div className="text-sm text-muted-foreground">
                      <p>
                        {formData.firstName} {formData.lastName}
                      </p>
                      <p>{formData.address}</p>
                      <p>
                        {formData.city}, {formData.state} {formData.zipCode}
                      </p>
                      <p>{formData.phone}</p>
                    </div>
                  </div>

                  <Separator />

                  {/* Payment Method */}
                  <div>
                    <h4 className="font-medium mb-2">Payment Method</h4>
                    <div className="text-sm text-muted-foreground">
                      {formData.paymentMethod === "credit-card" ? (
                        <p>Credit Card ending in {formData.cardNumber.slice(-4)}</p>
                      ) : formData.paymentMethod === "paypal" ? (
                        <p>PayPal</p>
                      ) : (
                        <p>Cash on Delivery (COD)</p>
                      )}
                    </div>
                  </div>

                  <Separator />

                  {/* Order Items */}
                  <div>
                    <h4 className="font-medium mb-4">Order Items</h4>
                    <div className="space-y-3">
                      {items.map((item) => (
                        <div key={item.id} className="flex items-center gap-3">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div className="flex-1">
                            <p className="text-sm font-medium">{item.name}</p>
                            <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                          </div>
                          <p className="text-sm font-medium">Rs.{(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Navigation Buttons */}
            <div className="flex flex-col sm:flex-row justify-between gap-3 pt-4">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="touch-manipulation bg-transparent"
              >
                Previous
              </Button>

              {currentStep < 3 ? (
                <div className="flex flex-col items-end gap-2">
                  <Button
                    onClick={() => {
                      console.log("[v0] Continue button clicked")
                      nextStep()
                    }}
                    disabled={!currentStepValidation.isValid}
                    className="touch-manipulation w-full sm:w-auto"
                  >
                    Continue to {steps[currentStep - 1]?.title || "Next Step"}
                    {!currentStepValidation.isValid && (
                      <span className="ml-2 text-xs opacity-70">
                        ({Object.keys(currentStepValidation.errors).length} error
                        {Object.keys(currentStepValidation.errors).length !== 1 ? "s" : ""})
                      </span>
                    )}
                  </Button>
                  {Object.keys(validationErrors).length > 0 && (
                    <div className="text-sm text-red-600">
                      <div className="flex items-center gap-1 mb-1">
                        <AlertCircle className="h-3 w-3" />
                        <span>Please fix the errors above to continue</span>
                      </div>
                      <ul className="text-xs space-y-1 ml-4">
                        {Object.entries(validationErrors).map(([field, error]) => (
                          <li key={field}>
                            • {field}: {error}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <Button onClick={handleSubmitOrder} disabled={isProcessing} size="lg" className="touch-manipulation">
                  {isProcessing ? (
                    <>
                      <LoadingSpinner size="sm" className="mr-2" />
                      Processing Order...
                    </>
                  ) : (
                    `Place Order • Rs.${finalTotal.toFixed(2)}`
                  )}
                </Button>
              )}
            </div>
          </div>

          {/* Order Summary - Always visible on desktop, toggleable on mobile */}
          <div className="lg:col-span-1">
            {/* Mobile Order Summary Toggle */}
            <div className="lg:hidden mb-4">
              <Button
                variant="outline"
                onClick={() => setShowOrderSummary(!showOrderSummary)}
                className="w-full justify-between touch-manipulation"
              >
                <span>Order Summary • RS.{finalTotal.toFixed(2)}</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${showOrderSummary ? "rotate-180" : ""}`} />
              </Button>
            </div>

            <Card className={`sticky top-24 ${showOrderSummary || "hidden lg:block"} border-2 border-primary/20`}>
              <CardHeader className="bg-primary/5">
                <CardTitle className="text-lg flex items-center justify-between">
                  Order Summary
                  <span className="text-sm font-normal text-muted-foreground">
                    {itemCount} {itemCount === 1 ? "item" : "items"}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal ({itemCount} items)</span>
                    <span>Rs.{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span className={shipping === 0 ? "text-green-600 font-medium" : ""}>
                      {shipping === 0 ? "Free" : `Rs.${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax</span>
                    <span>Rs.{tax.toFixed(2)}</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between font-bold text-lg bg-primary/10 p-3 rounded-lg">
                  <span>Total</span>
                  <span>Rs.{finalTotal.toFixed(2)}</span>
                </div>

                {/* Security Features */}
                <div className="pt-4 space-y-2">
                  
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Truck className="h-3 w-3" />
                    <span>Free shipping on orders over Rs.5000</span>
                  </div>
                </div>

                {/* Order Items Preview */}
                <div className="pt-4 border-t border-border">
                  <h4 className="font-medium mb-3 text-sm">Items in your order</h4>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-center gap-2 text-xs">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-8 h-8 object-cover rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="truncate">{item.name}</p>
                          <p className="text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-medium">Rs.{(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
