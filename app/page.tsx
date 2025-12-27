"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Check, Zap, Layers, BarChart3, Clock } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function LandingPage() {
  const features = [
    {
      icon: <BarChart3 className="h-8 w-8 text-primary" />,
      title: "Equipment Management",
      description: "Track all assets and maintenance history in one place",
    },
    {
      icon: <Layers className="h-8 w-8 text-primary" />,
      title: "Kanban Workflow",
      description: "Organize maintenance tasks with intuitive drag-and-drop boards",
    },
    {
      icon: <Clock className="h-8 w-8 text-primary" />,
      title: "Preventive Maintenance",
      description: "Schedule and automate routine maintenance tasks",
    },
    {
      icon: <Zap className="h-8 w-8 text-primary" />,
      title: "Smart Automation",
      description: "Reduce downtime with intelligent task assignment",
    },
  ]

  const benefits = [
    {
      role: "Client / Employee",
      items: ["Request maintenance with one click", "Track repair status in real-time", "View equipment history"],
    },
    {
      role: "Technician / Maintainer",
      items: ["Organized work queue", "Priority-based task management", "Quick status updates"],
    },
    {
      role: "Manager / Admin",
      items: ["Full system control", "Team performance analytics", "Preventive maintenance scheduling"],
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Navbar/>

      {/* Hero Section */}
      <section className="min-h-screen relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-8 inline-block rounded-full bg-accent/10 px-4 py-2 text-sm font-medium text-accent">
            ✨ Enterprise Maintenance Management
          </div>
          <h1 className="mb-6 text-balance text-5xl font-bold leading-tight md:text-6xl lg:text-7xl text-[#5D3D55]">
            Smarter Maintenance.
            <span className="block text-primary"> Zero Downtime.</span>
          </h1>
          <p className="mb-10 text-balance text-lg text-muted-foreground md:text-xl">
            GearGuard streamlines equipment maintenance with intelligent asset tracking, automated workflows, and
            real-time collaboration. Keep your operations running smoothly.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link href="/signup">
              <Button size="lg" className="w-full text-white bg-[#5D3D55] hover:scale-105 border border-[#5D3D55] sm:w-auto">
                Start Free <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                Login to Account
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-100 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-[#5D3D55]">Powerful Features</h2>
            <p className="text-lg text-muted-foreground">Everything you need to manage maintenance operations</p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border bg-card p-8 text-center shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="mb-4 flex justify-center">{feature.icon}</div>
                <h3 className="mb-3 text-lg font-semibold text-[#5D3D55]">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-[#5D3D55]">Built for Every Role</h2>
            <p className="text-lg text-muted-foreground">Tailored workflows for your organization</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {benefits.map((benefit) => (
              <div
                key={benefit.role}
                className="rounded-xl border bg-card p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="mb-6 text-xl font-bold text-primary">{benefit.role}</h3>
                <ul className="space-y-4">
                  {benefit.items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Check className="mt-1 h-5 w-5 shrink-0 text-primary" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-100 from-primary to-accent px-4 py-20 text-center text-primary-foreground sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-6 text-4xl font-bold">Ready to get started?</h2>
          <p className="mb-10 text-lg opacity-90">
            Join teams worldwide who are transforming their maintenance operations.
          </p>
          <Link href="/signup">
            <Button className="bg-[#593B51] p-2 rounded-lg text-white hover:scale-105">
              Create Free Account <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <Footer/>
    </div>
  )
}
