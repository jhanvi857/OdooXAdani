"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Plus, Wrench, MoreVertical } from "lucide-react"

interface Equipment {
  id: string
  name: string
  serialNumber: string
  location: string
  department: string
  status: "active" | "scrapped"
  purchaseDate: string
  assignedEmployee?: string
  maintenanceRequests: number
  openRequests: number
}

const mockEquipment: Equipment[] = [
  {
    id: "1",
    name: "Compressor A1",
    serialNumber: "COMP-2023-001",
    location: "Building A, Floor 2",
    department: "Production",
    status: "active",
    purchaseDate: "2022-05-15",
    assignedEmployee: "John Smith",
    maintenanceRequests: 12,
    openRequests: 2,
  },
  {
    id: "2",
    name: "Hydraulic Press",
    serialNumber: "HYDR-2023-002",
    location: "Building B, Floor 1",
    department: "Production",
    status: "active",
    purchaseDate: "2021-08-20",
    assignedEmployee: "Sarah Johnson",
    maintenanceRequests: 8,
    openRequests: 1,
  },
  {
    id: "3",
    name: "CNC Machine",
    serialNumber: "CNC-2023-003",
    location: "Building A, Floor 3",
    department: "Production",
    status: "active",
    purchaseDate: "2023-01-10",
    maintenanceRequests: 5,
    openRequests: 0,
  },
  {
    id: "4",
    name: "Conveyor System",
    serialNumber: "CONV-2023-004",
    location: "Building B, Floor 2",
    department: "Logistics",
    status: "scrapped",
    purchaseDate: "2019-03-22",
    maintenanceRequests: 25,
    openRequests: 0,
  },
]

export function EquipmentList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [groupBy, setGroupBy] = useState<"department" | "employee">("department")
  const [selectedEquipment, setSelectedEquipment] = useState<string | null>(null)

  const filteredEquipment = mockEquipment.filter(
    (eq) =>
      eq.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      eq.serialNumber.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const groupedEquipment =
    groupBy === "department"
      ? Object.groupBy(filteredEquipment, (eq) => eq.department)
      : Object.groupBy(filteredEquipment, (eq) => eq.assignedEmployee || "Unassigned")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-[#5D3D55]">Equipment Management</h3>
          <p className="text-sm text-muted-foreground">Master database of company assets</p>
        </div>
        <Button className="gap-2 bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4" />
          Add Equipment
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or serial number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={groupBy === "department" ? "default" : "outline"}
            size="sm"
            onClick={() => setGroupBy("department")}
          >
            By Department
          </Button>
          <Button
            variant={groupBy === "employee" ? "default" : "outline"}
            size="sm"
            onClick={() => setGroupBy("employee")}
          >
            By Employee
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        {Object.entries(groupedEquipment).map(([group, items]) => (
          <div key={group}>
            <h4 className="text-sm font-semibold text-[#5D3D55] mb-3 px-4 py-2 bg-secondary rounded-lg">
              {group} ({items?.length || 0})
            </h4>

            <div className="grid grid-cols-1 gap-3">
              {items?.map((equipment) => (
                <Card
                  key={equipment.id}
                  className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                    selectedEquipment === equipment.id ? "ring-2 ring-primary" : ""
                  } ${equipment.status === "scrapped" ? "opacity-60" : ""}`}
                  onClick={() => setSelectedEquipment(equipment.id)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Wrench className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h5 className="font-semibold text-[#5D3D55]">{equipment.name}</h5>
                          {equipment.status === "scrapped" && (
                            <Badge variant="destructive" className="text-xs">
                              Scrapped
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">{equipment.serialNumber}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                    <div>
                      <p className="text-xs text-muted-foreground">Location</p>
                      <p className="text-[#5D3D55] font-medium">{equipment.location}</p>
                    </div>
                    {equipment.assignedEmployee && (
                      <div>
                        <p className="text-xs text-muted-foreground">Assigned To</p>
                        <p className="text-[#5D3D55] font-medium">{equipment.assignedEmployee}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-[#5D3D55] border-border">
                    <div className="flex gap-4 text-xs">
                      <div>
                        <p className="text-muted-foreground">Total Requests</p>
                        <p className="font-semibold text-[#5D3D55]">{equipment.maintenanceRequests}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Open</p>
                        <p
                          className={`font-semibold ${equipment.openRequests > 0 ? "text-destructive" : "text-[#5D3D55]"}`}
                        >
                          {equipment.openRequests}
                        </p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="text-xs bg-transparent">
                      View Maintenance
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
