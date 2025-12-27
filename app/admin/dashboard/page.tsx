"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AuthLayout from "@/components/auth-layout"
import { Plus, BarChart3, Users, Zap, TrendingUp, AlertTriangle } from "lucide-react"

interface Equipment {
  id: string
  name: string
  department: string
  status: "operational" | "maintenance" | "broken"
  lastMaintenance: string
  nextScheduled: string
  mtbf: number
}

interface TeamMember {
  id: string
  name: string
  role: string
  assignedTasks: number
  availability: "available" | "busy"
  efficiency: number
}

interface MaintenanceData {
  month: string
  corrective: number
  preventive: number
  total: number
}

export default function AdminDashboard() {
  const [selectedTab, setSelectedTab] = useState("overview")

  const [equipment] = useState<Equipment[]>([
    {
      id: "1",
      name: "CNC Machine A",
      department: "Production",
      status: "maintenance",
      lastMaintenance: "2025-12-20",
      nextScheduled: "2026-01-20",
      mtbf: 720,
    },
    {
      id: "2",
      name: "Hydraulic Press B",
      department: "Assembly",
      status: "operational",
      lastMaintenance: "2025-12-15",
      nextScheduled: "2026-01-15",
      mtbf: 960,
    },
    {
      id: "3",
      name: "Air Compressor C",
      department: "Utilities",
      status: "operational",
      lastMaintenance: "2025-12-10",
      nextScheduled: "2026-01-10",
      mtbf: 850,
    },
    {
      id: "4",
      name: "Welding Robot D",
      department: "Assembly",
      status: "broken",
      lastMaintenance: "2025-12-18",
      nextScheduled: "2026-01-18",
      mtbf: 640,
    },
    {
      id: "5",
      name: "Conveyor Belt E",
      department: "Logistics",
      status: "operational",
      lastMaintenance: "2025-12-12",
      nextScheduled: "2026-01-12",
      mtbf: 1080,
    },
  ])

  const [team] = useState<TeamMember[]>([
    {
      id: "1",
      name: "John Smith",
      role: "Senior Technician",
      assignedTasks: 3,
      availability: "busy",
      efficiency: 92,
    },
    {
      id: "2",
      name: "Sarah Johnson",
      role: "Maintenance Tech",
      assignedTasks: 1,
      availability: "available",
      efficiency: 88,
    },
    {
      id: "3",
      name: "Mike Davis",
      role: "Maintenance Tech",
      assignedTasks: 2,
      availability: "available",
      efficiency: 85,
    },
    {
      id: "4",
      name: "Lisa Chen",
      role: "Equipment Specialist",
      assignedTasks: 2,
      availability: "busy",
      efficiency: 94,
    },
  ])

  const [maintenanceData] = useState<MaintenanceData[]>([
    { month: "Oct", corrective: 8, preventive: 12, total: 20 },
    { month: "Nov", corrective: 6, preventive: 14, total: 20 },
    { month: "Dec", corrective: 5, preventive: 15, total: 20 },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational":
        return "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-200"
      case "maintenance":
        return "bg-accent/20 text-accent dark:bg-accent/20 dark:text-accent"
      case "broken":
        return "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-200"
      default:
        return ""
    }
  }

  const operationalCount = equipment.filter((e) => e.status === "operational").length
  const maintenanceCount = equipment.filter((e) => e.status === "maintenance").length
  const brokenCount = equipment.filter((e) => e.status === "broken").length
  const avgEfficiency = Math.round(team.reduce((sum, m) => sum + m.efficiency, 0) / team.length)

  return (
    <>
    <AuthLayout userRole="manager">
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold text-[#5D3D55]">System Dashboard</h1>
          <p className="text-muted-foreground mt-2">Monitor, manage, and optimize maintenance operations</p>
        </div>

        <div className="grid gap-4 md:grid-cols-5">
          <Card className="border-secondary shadow-sm hover:shadow-md transition-shadow bg-linear-to-br from-card to-secondary/10">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
                <Zap className="h-4 w-4 text-green-500" />
                Operational
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-500">{operationalCount}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {Math.round((operationalCount / equipment.length) * 100)}% uptime
              </p>
            </CardContent>
          </Card>

          <Card className="border-secondary shadow-sm hover:shadow-md transition-shadow bg-linear-to-br from-card to-accent/10">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
                <BarChart3 className="h-4 w-4 text-accent" />
                In Maintenance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-accent">{maintenanceCount}</div>
              <p className="text-xs text-muted-foreground mt-1">Scheduled work</p>
            </CardContent>
          </Card>

          <Card className="border-secondary shadow-sm hover:shadow-md transition-shadow bg-linear-to-br from-card to-red-100/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2 text-destructive">
                <AlertTriangle className="h-4 w-4" />
                Issues
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-500">{brokenCount}</div>
              <p className="text-xs text-muted-foreground mt-1">Requires attention</p>
            </CardContent>
          </Card>

          <Card className="border-secondary shadow-sm hover:shadow-md transition-shadow bg-linear-to-br from-card to-primary/10">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
                <Users className="h-4 w-4 text-primary" />
                Team Efficiency
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{avgEfficiency}%</div>
              <p className="text-xs text-muted-foreground mt-1">Average performance</p>
            </CardContent>
          </Card>

          <Card className="border-secondary shadow-sm hover:shadow-md transition-shadow bg-linear-to-br from-card to-purple-100/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
                <TrendingUp className="h-4 w-4 text-purple-500" />
                Preventive
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-500">75%</div>
              <p className="text-xs text-muted-foreground mt-1">Of all maintenance</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 bg-secondary/40">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="equipment">Equipment</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Maintenance Trends */}
              <Card className="border-secondary shadow-sm">
                <CardHeader>
                  <CardTitle>Maintenance Trends</CardTitle>
                  <CardDescription>Last 3 months performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {maintenanceData.map((data) => (
                      <div key={data.month} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium">{data.month}</span>
                          <span className="text-muted-foreground">{data.total} tasks</span>
                        </div>
                        <div className="flex gap-2 h-8 rounded-lg overflow-hidden bg-secondary">
                          <div
                            className="bg-primary"
                            style={{ width: `${(data.corrective / data.total) * 100}%` }}
                            title={`Corrective: ${data.corrective}`}
                          />
                          <div
                            className="bg-green-500"
                            style={{ width: `${(data.preventive / data.total) * 100}%` }}
                            title={`Preventive: ${data.preventive}`}
                          />
                        </div>
                      </div>
                    ))}
                    <div className="flex gap-4 pt-4 text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded bg-primary" />
                        <span>Corrective</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded bg-green-500" />
                        <span>Preventive</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* System Health */}
              <Card className="border-secondary shadow-sm">
                <CardHeader>
                  <CardTitle>System Health</CardTitle>
                  <CardDescription>Overall equipment status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Equipment Health</span>
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-200">98.5%</Badge>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-3 overflow-hidden">
                      <div className="bg-green-500 h-full" style={{ width: "98.5%" }} />
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Uptime</span>
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-200">99.2%</Badge>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-3 overflow-hidden">
                      <div className="bg-green-500 h-full" style={{ width: "99.2%" }} />
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Team Utilization</span>
                      <Badge className="bg-accent/20 text-accent dark:bg-accent/20">87%</Badge>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-3 overflow-hidden">
                      <div className="bg-accent h-full" style={{ width: "87%" }} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Equipment Tab */}
          <TabsContent value="equipment">
            <Card className="border-secondary shadow-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Equipment Management</CardTitle>
                    <CardDescription>All assets and their maintenance status</CardDescription>
                  </div>
                  <Button size="sm" className="bg-primary hover:bg-primary/90">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Equipment
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {equipment.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 rounded-xl border border-secondary bg-card p-4 hover:border-primary/30 hover:shadow-md transition-all"
                    >
                      <div className="flex-1">
                        <h3 className="font-semibold text-[#5D3D55]">{item.name}</h3>
                        <div className="flex gap-4 mt-2 text-sm text-muted-foreground flex-wrap">
                          <span>{item.department}</span>
                          <span>MTBF: {item.mtbf}h</span>
                          <span>Next: {item.nextScheduled}</span>
                        </div>
                      </div>
                      <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Team Tab */}
          <TabsContent value="team">
            <Card className="border-secondary shadow-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Team Management</CardTitle>
                    <CardDescription>Technician workload and performance</CardDescription>
                  </div>
                  <Button size="sm" className="bg-primary hover:bg-primary/90">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Team Member
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {team.map((member) => (
                    <div
                      key={member.id}
                      className="rounded-xl border border-secondary bg-card p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-[#5D3D55]">{member.name}</h3>
                          <p className="text-sm text-muted-foreground">{member.role}</p>
                        </div>
                        <Badge
                          className={
                            member.availability === "available"
                              ? "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-200"
                              : "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200"
                          }
                        >
                          {member.availability}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Efficiency</span>
                          <span className="font-semibold text-[#5D3D55]">{member.efficiency}%</span>
                        </div>
                        <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-primary h-full transition-all"
                            style={{ width: `${member.efficiency}%` }}
                          />
                        </div>
                        <div className="text-xs text-muted-foreground pt-1">{member.assignedTasks} tasks assigned</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AuthLayout>
    </>
  )
}
