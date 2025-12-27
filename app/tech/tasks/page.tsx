"use client"

import AuthLayout from "@/components/auth-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar as CalIcon } from "lucide-react"

export default function TechTasks() {
  return (
    <AuthLayout userRole="technician">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-[#5D3D55]">My Tasks</h1>
            <p className="text-muted-foreground mt-2">Track and manage your assigned maintenance tasks</p>
          </div>
          <div>
            <Button className="bg-primary">Open Kanban</Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Task List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground flex items-center gap-2">
              <CalIcon className="h-4 w-4" />
              <span>Switch to calendar view to see scheduled tasks.</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </AuthLayout>
  )
}
