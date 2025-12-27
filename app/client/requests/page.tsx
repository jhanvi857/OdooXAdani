"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import AuthLayout from "@/components/auth-layout"
import { Clock, CheckCircle2, AlertCircle, Plus } from "lucide-react"

interface MaintenanceRequest {
  id: string
  equipment: string
  status: "new" | "in-progress" | "repaired"
  requestDate: string
  priority: "low" | "medium" | "high"
}

export default function ClientRequests() {
  const requests: MaintenanceRequest[] = [
    { id: "1", equipment: "CNC Machine A", status: "new", requestDate: "2025-12-27", priority: "high" },
    { id: "2", equipment: "Hydraulic Press B", status: "in-progress", requestDate: "2025-12-25", priority: "medium" },
    { id: "3", equipment: "Air Compressor C", status: "repaired", requestDate: "2025-12-20", priority: "low" },
  ]

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

  const router = useRouter()

  return (
    <AuthLayout userRole="client">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-[#5D3D55]">My Requests</h1>
            <p className="text-muted-foreground mt-2">All maintenance requests you submitted</p>
          </div>
          <Button onClick={() => router.push('/client/requests/new')} className="bg-primary">
            <Plus className="mr-2 h-4 w-4" />
            New Request
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Requests</CardTitle>
            <CardDescription>Recent maintenance requests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {requests.map((r) => (
                <div key={r.id} className="flex items-center justify-between gap-4 rounded-xl border border-secondary p-4 bg-card">
                  <div className="flex items-center gap-4">
                    {getStatusIcon(r.status)}
                    <div>
                      <h3 className="font-semibold text-[#5D3D55]">{r.equipment}</h3>
                      <p className="text-sm text-muted-foreground">{r.requestDate}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge className={getPriorityColor(r.priority)}>{r.priority}</Badge>
                    <Badge variant="outline" className="bg-secondary/50">
                      {r.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AuthLayout>
  )
}
