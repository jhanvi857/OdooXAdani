"use client"

import AuthLayout from "@/components/auth-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "lucide-react"

export default function TechCalendar() {
  return (
    <AuthLayout userRole="technician">
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold text-[#5D3D55]">Calendar</h1>
          <p className="text-muted-foreground mt-2">Scheduled maintenance and assignments</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Calendar View</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12 text-muted-foreground">
              <Calendar className="mx-auto h-12 w-12 mb-4 opacity-50" />
              <p>Monthly calendar showing assigned jobs and scheduled maintenance.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AuthLayout>
  )
}
