"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import AuthLayout from "@/components/auth-layout"
import { EmptyState } from "@/components/empty-state"
import { Plus, Clock, CheckCircle2, AlertCircle, TrendingUp } from "lucide-react"
interface MaintenanceRequest {
  id: string
  equipment: string
  requestType: "corrective" | "preventive"
  status: "new" | "in-progress" | "repaired"
  requestDate: string
  priority: "low" | "medium" | "high"
}

export default function ClientDashboard() {
  const [requests] = useState<MaintenanceRequest[]>([
    {
      id: "1",
      equipment: "CNC Machine A",
      requestType: "corrective",
      status: "new",
      requestDate: "2025-12-27",
      priority: "high",
    },
    {
      id: "2",
      equipment: "Hydraulic Press B",
      requestType: "preventive",
      status: "in-progress",
      requestDate: "2025-12-25",
      priority: "medium",
    },
    {
      id: "3",
      equipment: "Air Compressor C",
      requestType: "corrective",
      status: "repaired",
      requestDate: "2025-12-20",
      priority: "low",
    },
  ])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "new":
        return <AlertCircle className="h-4 w-4 text-accent" />
      case "in-progress":
        return <Clock className="h-4 w-4 text-accent" />
      case "repaired":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      default:
        return null
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-200"
      case "medium":
        return "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200"
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-200"
      default:
        return ""
    }
  }

  return (
    <>
    <AuthLayout userRole="client">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-[#5D3D55]">Maintenance Requests</h1>
            <p className="text-muted-foreground mt-2">Track and manage your equipment maintenance</p>
          </div>
          <Button className="bg-[#604058] text-white hover:scale-105 w-full md:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            New Request
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                Total Requests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[#5D3D55]">12</div>
              <p className="text-xs text-muted-foreground mt-1">All submitted requests</p>
            </CardContent>
          </Card>
          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Clock className="h-4 w-4 text-accent" />
                In Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-accent">3</div>
              <p className="text-xs text-muted-foreground mt-1">Currently being worked on</p>
            </CardContent>
          </Card>
          <Card className=" shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                Completed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-500">9</div>
              <p className="text-xs text-muted-foreground mt-1">Successfully resolved</p>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">Your Requests</CardTitle>
            <CardDescription>All maintenance requests you've submitted</CardDescription>
          </CardHeader>
          <CardContent>
            {requests.length > 0 ? (
              <div className="space-y-3">
                {requests.map((request) => (
                  <div
                    key={request.id}
                    className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 rounded-xl shadow-lg bg-card p-4 hover:shadow-xl transition-all"
                  >
                    <div className="flex items-center gap-4">
                      {getStatusIcon(request.status)}
                      <div>
                        <h3 className="font-semibold text-[#5D3D55]">{request.equipment}</h3>
                        <p className="text-sm text-muted-foreground">{request.requestDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge className={getPriorityColor(request.priority)}>{request.priority}</Badge>
                      <Badge variant="outline" className="bg-secondary/50">
                        {request.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                title="No requests yet"
                description="You haven't submitted any maintenance requests. Create one to get started."
                action={{ label: "Create Request", onClick: () => {} }}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </AuthLayout>
    </>
  )
}
