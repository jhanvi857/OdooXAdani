"use client"

import { Bell, User, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="border-b border-border bg-card px-6 py-4 flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-bold text-[#5D3D55]">Maintenance Management</h2>
        <p className="text-sm text-muted-foreground">Enterprise Asset & Maintenance System</p>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-[#5D3D55]">
          <Bell className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-[#5D3D55]">
          <Settings className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-[#5D3D55]">
          <User className="w-5 h-5" />
        </Button>
      </div>
    </header>
  )
}
