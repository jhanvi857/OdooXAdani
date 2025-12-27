"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Zap } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email || !password) {
      setError("Please fill in all fields")
      return
    }

    try {
      setLoading(true)

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.message || "Login failed")
        return
      }

      // ✅ Save token
      localStorage.setItem("token", data.token)

      // ✅ Redirect based on BACKEND role
      if (data.role === "ADMIN") router.push("/admin/dashboard")
      else if (data.role === "TECH") router.push("/tech/dashboard")
      else router.push("/client/dashboard")

    } catch (err) {
      setError("Something went wrong. Try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-background via-secondary/20 to-background px-4">
        <Card className="w-full max-w-md border-secondary shadow-lg">
          <CardHeader className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="h-12 w-12 rounded-lg bg-linear-to-br from-primary to-accent flex items-center justify-center">
                <Zap className="h-6 w-6 text-primary-foreground" />
              </div>
            </div>
            <div>
              <CardTitle className="text-2xl text-[#5D3D55]">Welcome Back</CardTitle>
              <CardDescription>
                Sign in to your maintenance tracker account
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">

              {error && (
                <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive border border-destructive/20">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#5D3D55]">
                  Email
                </label>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-secondary"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#5D3D55]">
                  Password
                </label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-secondary"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-[#5D3D55] hover:scale-105 text-white h-10 font-semibold"
              >
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link href="/signup" className="font-semibold text-primary hover:underline">
                Create one
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </>
  )
}
