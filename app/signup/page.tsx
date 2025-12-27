"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/app/providers"
import { Zap } from "lucide-react"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"

type Role = "client" | "technician" | "manager"

export default function SignupPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    company: "",
    role: "client" as Role,
  })
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleRoleChange = (value: string) => {
    setFormData({ ...formData, role: value as Role })
  }

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    const { fullName, email, password, company } = formData

    if (!fullName || !email || !password || !company) {
      setError("Please fill in all fields")
      return
    }

    login(email, password, formData.role)

    const dashboards = {
      client: "/client/dashboard",
      technician: "/tech/dashboard",
      manager: "/admin/dashboard",
    }
    router.push(dashboards[formData.role])
  }

  return (
    <>
    <Navbar/>
    <div className="min-h-screen flex items-center justify-center from-background via-secondary/20 to-background px-4">
      <Card className="w-full max-w-md border-secondary shadow-lg">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="h-12 w-12 rounded-lg  from-primary to-accent flex items-center justify-center">
              <Zap className="h-6 w-6 text-primary-foreground" />
            </div>
          </div>
          <div>
            <CardTitle className="text-2xl">Create Account</CardTitle>
            <CardDescription>Start managing maintenance smarter today</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className="space-y-4">
            {error && (
              <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive border border-destructive/20">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-semibold text-[#5D3D55]">Full Name</label>
              <Input
                name="fullName"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={handleChange}
                className="border-secondary"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-[#5D3D55]">Email</label>
              <Input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                className="border-secondary"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-[#5D3D55]">Password</label>
              <Input
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="border-secondary"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-[#5D3D55]">Company / Organization</label>
              <Input
                name="company"
                placeholder="Your Company"
                value={formData.company}
                onChange={handleChange}
                className="border-secondary"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-[#5D3D55]">Role</label>
              <Select value={formData.role} onValueChange={handleRoleChange}>
                <SelectTrigger className="border-secondary">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="client">Client / Employee</SelectItem>
                  <SelectItem value="technician">Technician / Maintainer</SelectItem>
                  <SelectItem value="manager">Manager / Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" className="w-full bg-[#5D3D55] text-white hover:scale-105 h-10 font-semibold">
              Create Account
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-primary hover:underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
    <Footer/>
    </>
  )
}
