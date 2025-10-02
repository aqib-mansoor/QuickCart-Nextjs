"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft, ShoppingBag } from "lucide-react"

export default function OrdersPage() {
  const router = useRouter()

  const orders = [
    {
      id: "ORD-PJNBPO4TB",
      status: "Shipped",
      total: "Rs. 4,999",
      date: "2025-08-25",
      items: [
        { name: "Gaming Desk", image: "/table.png" },
        { name: "Wireless Bluetooth Headphones", image: "/wireless-bluetooth-headphones.png" },
      ],
    },
    {
      id: "ORD-KLMZ92XQJ",
      status: "Processing",
      total: "Rs. 2,399",
      date: "2025-08-28",
      items: [{ name: "Fitness Tracker Watch", image: "/fitness-tracker-smartwatch.png" }],
    },
    {
      id: "ORD-QWER12TYU",
      status: "Delivered",
      total: "Rs. 9,999",
      date: "2025-08-30",
      items: [
        { name: "Ergonomic Office Chair", image: "/ergonomic-office-chair-black.png" },
        { name: "Laptop Stand", image: "/Laptop.png" },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      {/* Header */}
      <header className="relative flex items-center justify-center px-4 py-3 border-b border-[var(--border)] bg-[var(--card)]">
        <button
          onClick={() => router.push("/")}
          className="absolute left-4 flex items-center gap-1 text-sm text-[var(--muted-foreground)] hover:text-[var(--primary)] transition"
        >
          <ArrowLeft size={18} />
          Back
        </button>
        <h1 className="text-lg font-bold">QuickCart</h1>
        <button
          onClick={() => router.push("/cart")}
          className="absolute right-4 text-[var(--muted-foreground)] hover:text-[var(--primary)] transition"
        >
          <ShoppingBag size={20} />
        </button>
      </header>

      {/* Orders List */}
      <main className="px-4 py-6 max-w-4xl mx-auto space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="p-5 rounded-xl bg-[var(--card)] border border-[var(--border)] shadow-md hover:shadow-lg transition"
          >
            {/* Order Header */}
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm md:text-base font-semibold">{order.id}</span>
              <span
                className={`px-2 py-1 rounded-full text-xs md:text-sm font-medium ${
                  order.status === "Delivered"
                    ? "bg-green-600 text-white"
                    : order.status === "Shipped"
                    ? "bg-yellow-500 text-white"
                    : "bg-blue-500 text-white"
                }`}
              >
                {order.status}
              </span>
            </div>

            {/* Date & Total */}
            <div className="flex justify-between text-sm md:text-base mb-4 text-[var(--muted-foreground)]">
              <span>{order.date}</span>
              <span className="font-semibold text-[var(--foreground)]">{order.total}</span>
            </div>

            {/* Items List */}
            <div className="bg-[var(--background)] rounded-lg p-3 border border-[var(--border)]">
              <p className="text-sm md:text-base font-medium mb-3 text-[var(--primary)]">Items:</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {order.items.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 bg-[var(--card)] p-3 rounded-lg border border-[var(--border)]"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 md:w-20 md:h-20 object-cover rounded-md border border-[var(--border)]"
                    />
                    <span className="text-sm md:text-base text-[var(--muted-foreground)]">
                      {item.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </main>
    </div>
  )
}
