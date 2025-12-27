"use client"

import AuthLayout from "@/components/auth-layout"
import { TeamManagement } from "@/components/team-management"

export default function AdminTeam() {
  return (
    <AuthLayout userRole="manager">
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold text-[#5D3D55]">Team Management</h1>
          <p className="text-muted-foreground mt-2">Manage technicians and teams</p>
        </div>

        <TeamManagement />
      </div>
    </AuthLayout>
  )
}
