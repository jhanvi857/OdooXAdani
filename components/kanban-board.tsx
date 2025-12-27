"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { MaintenanceRequestCard } from "@/components/maintenance-request-card"

interface MaintenanceRequest {
  id: string
  subject: string
  equipment: string
  technician: string
  avatar: string
  stage: "new" | "in-progress" | "repaired" | "scrap"
  type: "corrective" | "preventive"
  isOverdue: boolean
}

const mockRequests: MaintenanceRequest[] = [
  {
    id: "1",
    subject: "Oil change and filter replacement",
    equipment: "Compressor A1",
    technician: "John Doe",
    avatar: "👤",
    stage: "new",
    type: "preventive",
    isOverdue: false,
  },
  {
    id: "2",
    subject: "Emergency hydraulic leak fix",
    equipment: "Hydraulic Press",
    technician: "Sarah Smith",
    avatar: "👤",
    stage: "in-progress",
    type: "corrective",
    isOverdue: true,
  },
  {
    id: "3",
    subject: "Belt replacement",
    equipment: "Conveyor Belt System",
    technician: "Mike Johnson",
    avatar: "👤",
    stage: "repaired",
    type: "corrective",
    isOverdue: false,
  },
  {
    id: "4",
    subject: "Quarterly inspection",
    equipment: "CNC Machine",
    technician: "Emma Wilson",
    avatar: "👤",
    stage: "new",
    type: "preventive",
    isOverdue: false,
  },
]

const stages = [
  { id: "new", label: "New", color: "bg-blue-50 dark:bg-blue-950" },
  { id: "in-progress", label: "In Progress", color: "bg-amber-50 dark:bg-amber-950" },
  { id: "repaired", label: "Repaired", color: "bg-green-50 dark:bg-green-950" },
  { id: "scrap", label: "Scrap", color: "bg-red-50 dark:bg-red-950" },
]

export function KanbanBoard() {
  const [requests, setRequests] = useState<MaintenanceRequest[]>(mockRequests)

  const getRequestsByStage = (stage: string) => {
    return requests.filter((r) => r.stage === stage)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-foreground">Maintenance Requests</h3>
          <p className="text-sm text-muted-foreground">Organize and track all maintenance requests</p>
        </div>
        <Button className="gap-2 bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4" />
          New Request
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {stages.map((stage) => {
          const stageRequests = getRequestsByStage(stage.id)
          return (
            <div key={stage.id} className={`rounded-lg p-4 ${stage.color}`}>
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-foreground">{stage.label}</h4>
                <Badge variant="secondary" className="text-xs">
                  {stageRequests.length}
                </Badge>
              </div>

              <div className="space-y-3 min-h-96">
                {stageRequests.map((request) => (
                  <MaintenanceRequestCard key={request.id} request={request} />
                ))}

                {stageRequests.length === 0 && (
                  <div className="h-96 flex items-center justify-center text-muted-foreground text-sm">No requests</div>
                )}
              </div>

              <Button variant="outline" className="w-full mt-4 gap-2 text-xs bg-transparent">
                <Plus className="w-3 h-3" />
                Add Request
              </Button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
