"use client"
import Link from "next/link"
import { Button } from "./ui/button"
export default function Navbar() {
    return(
        <>
        <header className="sticky top-0 z-50 bg-gray-100 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-linear-to-br from-primary to-accent" />
              <Link href="/" className="text-2xl font-bold text-[#5D3D55]">GearGuard</Link>
            </div>
            <nav className="flex items-center gap-2 sm:gap-4">
              <Link href="/login">
                <Button variant="ghost" className="text-[#5D3D55] hover:bg-secondary">
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <button className="bg-[#5D3D55] p-2 rounded-lg text-white hover:scale-105">Get Started</button>
              </Link>
            </nav>
          </div>
        </div>
      </header>
        </>
    )
}