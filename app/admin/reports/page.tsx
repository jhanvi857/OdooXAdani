"use client"

import AuthLayout from "@/components/auth-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3 } from "lucide-react"

export default function AdminReports() {
  return (
    <AuthLayout userRole="manager">
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold text-[#5D3D55]">Reports</h1>
          <p className="text-muted-foreground mt-2">Export and view maintenance analytics</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              <span>Placeholder for reports (charts, CSV export, KPIs)</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </AuthLayout>
  )
}
