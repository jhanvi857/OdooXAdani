"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertCircle } from "lucide-react"

interface MaintenanceRequestCardProps {
  request: {
    id: string
    subject: string
    equipment: string
    technician: string
    avatar: string
    stage: string
    type: "corrective" | "preventive"
    isOverdue: boolean
  }
}

export function MaintenanceRequestCard({ request }: MaintenanceRequestCardProps) {
  return (
    <Card className="p-3 cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow">
      {request.isOverdue && (
        <div className="flex items-center gap-1 mb-2 text-destructive text-xs font-semibold">
          <AlertCircle className="w-3 h-3" />
          Overdue
        </div>
      )}

      <h5 className="font-semibold text-sm text-[#5D3D55] line-clamp-2 mb-2">{request.subject}</h5>

      <div className="space-y-2">
        <p className="text-xs text-muted-foreground">
          Equipment: <span className="font-medium text-[#5D3D55]">{request.equipment}</span>
        </p>

        <div className="flex items-center justify-between pt-2 border-[#5D3D55]">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-primary-foreground">
              {request.avatar}
            </div>
            <span className="text-xs text-muted-foreground">{request.technician}</span>
          </div>
          <Badge variant={request.type === "corrective" ? "destructive" : "default"} className="text-xs">
            {request.type === "corrective" ? "Fix" : "Prev"}
          </Badge>
        </div>
      </div>
    </Card>
  )
}
