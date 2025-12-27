"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import AuthLayout from "@/components/auth-layout"
import { GripVertical, AlertCircle, Calendar, Zap, CheckCircle2, AlertTriangle } from "lucide-react"

interface Task {
  id: string
  equipment: string
  priority: "low" | "medium" | "high"
  assignee: string
  dueDate: string
  overdue: boolean
  type: "corrective" | "preventive"
}

export default function TechnicianDashboard() {
  const [viewMode, setViewMode] = useState<"kanban" | "calendar">("kanban")
  const [tasks] = useState<{ [key: string]: Task[] }>({
    new: [
      {
        id: "1",
        equipment: "CNC Machine A",
        priority: "high",
        assignee: "You",
        dueDate: "2025-12-28",
        overdue: false,
        type: "corrective",
      },
      {
        id: "4",
        equipment: "Welding Robot D",
        priority: "high",
        assignee: "You",
        dueDate: "2025-12-29",
        overdue: false,
        type: "corrective",
      },
    ],
    inProgress: [
      {
        id: "2",
        equipment: "Hydraulic Press B",
        priority: "medium",
        assignee: "You",
        dueDate: "2025-12-27",
        overdue: false,
        type: "preventive",
      },
      {
        id: "5",
        equipment: "Conveyor Belt E",
        priority: "medium",
        assignee: "You",
        dueDate: "2025-12-30",
        overdue: false,
        type: "preventive",
      },
    ],
    repaired: [
      {
        id: "3",
        equipment: "Air Compressor C",
        priority: "low",
        assignee: "You",
        dueDate: "2025-12-20",
        overdue: false,
        type: "corrective",
      },
    ],
    scrap: [],
  })

  const columns = [
    {
      id: "new",
      title: "New",
      count: tasks.new.length,
      color: "bg-secondary/40",
      icon: <AlertCircle className="h-4 w-4 text-accent" />,
    },
    {
      id: "inProgress",
      title: "In Progress",
      count: tasks.inProgress.length,
      color: "bg-accent/10",
      icon: <Zap className="h-4 w-4 text-accent" />,
    },
    {
      id: "repaired",
      title: "Repaired",
      count: tasks.repaired.length,
      color: "corrective",
      icon: <CheckCircle2 className="h-4 w-4 text-green-500" />,
    },
    {
      id: "scrap",
      title: "Scrap",
      count: tasks.scrap.length,
      color: "corrective",
      icon: <AlertTriangle className="h-4 w-4 text-red-500" />,
    },
  ]

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

  const getTypeColor = (type: string) => {
    return type === "corrective" ? "bg-primary/10 border-primary/30" : "bg-accent/10 border-accent/30"
  }

  return (
    <AuthLayout userRole="technician">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-[#5D3D55]">My Tasks</h1>
            <p className="text-muted-foreground mt-2">Manage and track your maintenance work</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant={viewMode === "kanban" ? "default" : "outline"}
              size="sm"
              className={viewMode === "kanban" ? "bg-primary hover:bg-primary/90" : ""}
              onClick={() => setViewMode("kanban")}
            >
              Kanban
            </Button>
            <Button
              variant={viewMode === "calendar" ? "default" : "outline"}
              size="sm"
              className={viewMode === "calendar" ? "bg-primary hover:bg-primary/90" : ""}
              onClick={() => setViewMode("calendar")}
            >
              <Calendar className="mr-2 h-4 w-4" />
              Calendar
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="border-secondary shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary">5</div>
              <p className="text-sm text-muted-foreground mt-1">Tasks Assigned</p>
            </CardContent>
          </Card>
          <Card className="border-secondary shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-accent">2</div>
              <p className="text-sm text-muted-foreground mt-1">In Progress</p>
            </CardContent>
          </Card>
          <Card className="border-secondary shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-green-500">1</div>
              <p className="text-sm text-muted-foreground mt-1">Completed Today</p>
            </CardContent>
          </Card>
          <Card className="border-secondary shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-red-500">0</div>
              <p className="text-sm text-muted-foreground mt-1">Overdue</p>
            </CardContent>
          </Card>
        </div>

        {/* Kanban View */}
        {viewMode === "kanban" && (
          <div>
            <p className="mb-4 text-sm text-muted-foreground">Drag cards between columns to update status</p>
            <div className="grid gap-4 lg:grid-cols-2 overflow-x-auto pb-4">
              {columns.map((column) => (
                <div
                  key={column.id}
                  className={`rounded-xl ${column.color} p-4 w-full lg:w-auto shadow-lg`}
                >
                  <div className="mb-4 flex items-center gap-2">
                    {column.icon}
                    <div>
                      <h2 className="font-semibold text-[#5D3D55]">{column.title}</h2>
                      <p className="text-xs text-muted-foreground">{column.count} tasks</p>
                    </div>
                  </div>

                  <div className="space-y-3 min-h-96">
                    {tasks[column.id as keyof typeof tasks]?.map((task) => (
                      <Card
                        key={task.id}
                        className={`cursor-grab rounded-lg shadow-lg hover:shadow-xl transition-all border-l-4 ${getTypeColor(task.type)} border-secondary`}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start gap-2">
                            <GripVertical className="mt-1 h-4 w-4 text-muted-foreground shrink-0" />
                            <div className="flex-1 min-w-0">
                              <h3 className="font-medium text-sm wrap-break-word text-[#5D3D55]">{task.equipment}</h3>
                              <p className="text-xs text-muted-foreground mt-1">{task.assignee}</p>
                              <div className="mt-3 flex items-center justify-between gap-2 flex-wrap">
                                <Badge className={getPriorityColor(task.priority)} variant="default">
                                  {task.priority}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {task.type === "corrective" ? "Urgent" : "Scheduled"}
                                </Badge>
                              </div>
                              <p className="text-xs text-muted-foreground mt-3">{task.dueDate}</p>
                              {task.overdue && (
                                <div className="mt-2 flex items-center gap-1 text-red-500">
                                  <AlertCircle className="h-3 w-3" />
                                  <span className="text-xs">Overdue</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Calendar View */}
        {viewMode === "calendar" && (
          <Card className="border-secondary shadow-sm">
            <CardContent className="pt-6">
              <div className="text-center py-12 text-muted-foreground">
                <Calendar className="mx-auto h-12 w-12 mb-4 opacity-50" />
                <p>Calendar view showing scheduled maintenance tasks</p>
                <div className="mt-8 grid gap-4 md:grid-cols-2">
                  {Object.entries(tasks).flatMap(([status, statusTasks]) =>
                    statusTasks.map((task) => (
                      <div
                        key={task.id}
                        className="rounded-lg border border-secondary bg-card p-4 text-left hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-medium text-[#5D3D55]">{task.equipment}</h4>
                            <p className="text-sm text-muted-foreground">{task.dueDate}</p>
                          </div>
                          <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                        </div>
                      </div>
                    )),
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </AuthLayout>
  )
}
