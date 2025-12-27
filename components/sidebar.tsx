"use client"

import { Wrench, Users, Clipboard, Calendar } from "lucide-react"

interface SidebarProps {
  currentView: "kanban" | "equipment" | "calendar" | "teams"
  onViewChange: (view: "kanban" | "equipment" | "calendar" | "teams") => void
}

export function Sidebar({ currentView, onViewChange }: SidebarProps) {
  const menuItems = [
    { id: "kanban", label: "Maintenance Board", icon: Clipboard },
    { id: "equipment", label: "Equipment", icon: Wrench },
    { id: "teams", label: "Teams", icon: Users },
    { id: "calendar", label: "Calendar", icon: Calendar },
  ]

  return (
    <aside className="w-64 bg-card border-r border-border flex flex-col">
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
            <Wrench className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-[#5D3D55]">GearGuard</h1>
            <p className="text-xs text-muted-foreground">Maintenance Tracker</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = currentView === item.id
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id as any)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive ? "bg-primary text-primary-foreground" : "text-[#5D3D55] hover:bg-secondary"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium text-sm">{item.label}</span>
            </button>
          )
        })}
      </nav>

      <div className="p-4 border-[#5D3D55]">
        <div className="bg-secondary p-4 rounded-lg">
          <p className="text-xs font-semibold text-[#5D3D55] mb-2">Quick Stats</p>
          <div className="space-y-2 text-xs text-muted-foreground">
            <div className="flex justify-between">
              <span>Active Requests</span>
              <span className="font-bold text-primary">12</span>
            </div>
            <div className="flex justify-between">
              <span>Teams</span>
              <span className="font-bold text-primary">4</span>
            </div>
            <div className="flex justify-between">
              <span>Equipment</span>
              <span className="font-bold text-primary">28</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
