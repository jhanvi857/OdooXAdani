"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Menu, X, LogOut, Home } from "lucide-react"
import { useAuth } from "@/app/providers"
import Link from "next/link"
interface AuthLayoutProps {
  children: React.ReactNode
  userRole: "client" | "technician" | "manager"
}

export default function AuthLayout({ children, userRole }: AuthLayoutProps) {
  const router = useRouter()
  const { logout } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const navItems = {
    client: [
      { label: "Dashboard", href: "/client/dashboard" },
      { label: "My Requests", href: "#" },
      { label: "Equipment", href: "#" },
    ],
    technician: [
      { label: "Kanban Board", href: "/tech/dashboard" },
      { label: "Calendar", href: "#" },
      { label: "My Tasks", href: "#" },
    ],
    manager: [
      { label: "Overview", href: "/admin/dashboard" },
      { label: "Equipment", href: "#" },
      { label: "Team", href: "#" },
      { label: "Reports", href: "#" },
    ],
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#6c4863] text-white transform transition-transform duration-300 lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-slate-700">
            <Link href="/" className="text-2xl font-bold">GearGuard</Link>
            <p className="text-sm text-slate-400 mt-1 capitalize">{userRole} Account</p>
          </div>

          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-2">
              {navItems[userRole].map((item) => (
                <li key={item.label}>
                  <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-[#5D3D55] transition-colors">
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="p-4 border-[#5D3D55]">
            <Button
              variant="ghost"
              className="bg-white text-[#604058] w-full justify-start hover:scale-105"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white border-b sticky top-0 z-20">
          <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button className="lg:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
                {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
              <h2 className="text-xl font-semibold capitalize">{userRole} Dashboard</h2>
            </div>
            <Button variant="ghost" onClick={() => router.push("/")} size="sm">
              <Home className="h-4 w-4" />
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6 lg:p-8">{children}</div>
        </main>
      </div>
    </div>
  )
}
