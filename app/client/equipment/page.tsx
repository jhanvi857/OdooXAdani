"use client"

import AuthLayout from "@/components/auth-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const mockEquipment = [
  { id: "1", name: "CNC Machine A", status: "operational", nextScheduled: "2026-01-20" },
  { id: "2", name: "Hydraulic Press B", status: "maintenance", nextScheduled: "2026-01-15" },
  { id: "3", name: "Air Compressor C", status: "operational", nextScheduled: "2026-01-10" },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "operational":
      return "bg-green-100 text-green-800"
    case "maintenance":
      return "bg-amber-100 text-amber-800"
    case "broken":
      return "bg-red-100 text-red-800"
    default:
      return ""
  }
}

export default function ClientEquipment() {
  return (
    <AuthLayout userRole="client">
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold text-[#5D3D55]">Equipment</h1>
          <p className="text-muted-foreground mt-2">Assets assigned to your account</p>
        </div>

        <div className="grid gap-4">
          {mockEquipment.map((e) => (
            <Card key={e.id} className="p-4">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-[#5D3D55]">{e.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">Next: {e.nextScheduled}</div>
                  <Badge className={getStatusColor(e.status)}>{e.status}</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AuthLayout>
  )
}
