"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Users, MoreVertical } from "lucide-react"

interface Technician {
  id: string
  name: string
  avatar: string
  role: string
  activeRequests: number
}

interface Team {
  id: string
  name: string
  description: string
  technicians: Technician[]
  totalRequests: number
}

const mockTeams: Team[] = [
  {
    id: "1",
    name: "Mechanics",
    description: "Mechanical equipment maintenance and repair",
    totalRequests: 24,
    technicians: [
      { id: "1", name: "John Doe", avatar: "JD", role: "Senior Technician", activeRequests: 3 },
      { id: "2", name: "Mike Johnson", avatar: "MJ", role: "Technician", activeRequests: 2 },
    ],
  },
  {
    id: "2",
    name: "Electricians",
    description: "Electrical systems and controls",
    totalRequests: 18,
    technicians: [
      { id: "3", name: "Sarah Smith", avatar: "SS", role: "Lead Electrician", activeRequests: 4 },
      { id: "4", name: "Emma Wilson", avatar: "EW", role: "Electrician", activeRequests: 1 },
      { id: "5", name: "David Lee", avatar: "DL", role: "Electrician", activeRequests: 2 },
    ],
  },
  {
    id: "3",
    name: "IT Support",
    description: "Computer and network equipment",
    totalRequests: 12,
    technicians: [{ id: "6", name: "Alex Brown", avatar: "AB", role: "IT Specialist", activeRequests: 3 }],
  },
]

export function TeamManagement() {
  const [teams, setTeams] = useState(mockTeams)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-foreground">Maintenance Teams</h3>
          <p className="text-sm text-muted-foreground">Manage teams and assign technicians</p>
        </div>
        <Button className="gap-2 bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4" />
          New Team
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {teams.map((team) => (
          <Card key={team.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  {team.name}
                </h4>
                <p className="text-sm text-muted-foreground mt-1">{team.description}</p>
              </div>
              <Button variant="ghost" size="icon">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex items-center gap-4 mb-6 p-4 bg-secondary rounded-lg">
              <div>
                <p className="text-xs text-muted-foreground">Team Members</p>
                <p className="text-2xl font-bold text-primary">{team.technicians.length}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Active Requests</p>
                <p className="text-2xl font-bold text-primary">
                  {team.technicians.reduce((sum, t) => sum + t.activeRequests, 0)}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Total Requests</p>
                <p className="text-2xl font-bold text-primary">{team.totalRequests}</p>
              </div>
            </div>

            <div className="space-y-3">
              <h5 className="font-semibold text-foreground text-sm">Team Members</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {team.technicians.map((tech) => (
                  <div key={tech.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-primary-foreground">
                        {tech.avatar}
                      </div>
                      <div>
                        <p className="font-medium text-foreground text-sm">{tech.name}</p>
                        <p className="text-xs text-muted-foreground">{tech.role}</p>
                      </div>
                    </div>
                    <Badge variant="secondary">{tech.activeRequests} active</Badge>
                  </div>
                ))}
              </div>
            </div>

            <Button variant="outline" className="w-full mt-4 bg-transparent">
              <Plus className="w-4 h-4 mr-2" />
              Add Technician
            </Button>
          </Card>
        ))}
      </div>
    </div>
  )
}
