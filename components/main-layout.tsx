"use client"

import type React from "react"

import { Sidebar } from "./sidebar"
import { Header } from "./header"

interface MainLayoutProps {
  children: React.ReactNode
  currentView: "kanban" | "equipment" | "calendar" | "teams"
  onViewChange: (view: "kanban" | "equipment" | "calendar" | "teams") => void
}

export function MainLayout({ children, currentView, onViewChange }: MainLayoutProps) {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar currentView={currentView} onViewChange={onViewChange} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  )
}
