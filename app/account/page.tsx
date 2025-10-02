"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft, User, Mail, Phone, MapPin, Calendar, LifeBuoy, FileText, LogOut } from "lucide-react"

export default function AccountPage() {
  const router = useRouter()

  const accountInfo = [
    { icon: <User size={20} />, label: "Name", value: "Aqib Mansoor" },
    { icon: <Mail size={20} />, label: "Email", value: "aqib@example.com" },
    { icon: <Phone size={20} />, label: "Phone", value: "+92 300 1234567" },
    { icon: <MapPin size={20} />, label: "Address", value: "123 Main Street, Islamabad" },
    { icon: <Calendar size={20} />, label: "Joined On", value: "2023-05-12" },
  ]

  const options = [
    { icon: <LifeBuoy size={20} />, label: "Help Center", onClick: () => router.push("/help") },
    { icon: <FileText size={20} />, label: "Terms & Policies", onClick: () => router.push("/terms") },
    { icon: <LogOut size={20} />, label: "Logout", onClick: () => console.log("Logout clicked") },
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
        <h1 className="text-lg font-bold">My Account</h1>
      </header>

      {/* Account Info Cards */}
      <main className="px-4 py-6 max-w-3xl mx-auto space-y-6">
        <div className="space-y-4">
          {accountInfo.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-5 rounded-xl bg-[var(--card)] border border-[var(--border)] shadow-md hover:shadow-xl transition"
            >
              <div className="p-3 bg-[var(--primary)]/20 text-[var(--primary)] rounded-lg flex items-center justify-center">
                {item.icon}
              </div>
              <div>
                <p className="text-sm text-[var(--muted-foreground)]">{item.label}</p>
                <p className="font-semibold text-[var(--foreground)]">{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Options Section */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4 text-[var(--primary)]">More Options</h2>
          <div className="space-y-3">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={option.onClick}
                className="w-full flex items-center gap-4 p-4 bg-[var(--card)] border border-[var(--border)] rounded-xl shadow hover:shadow-md transition text-left"
              >
                <div className="p-3 bg-[var(--accent)]/20 text-[var(--accent)] rounded-lg flex items-center justify-center">
                  {option.icon}
                </div>
                <span className="font-medium text-[var(--foreground)]">{option.label}</span>
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
