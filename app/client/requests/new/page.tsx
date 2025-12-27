"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import AuthLayout from "@/components/auth-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function NewRequestPage() {
  const [equipment, setEquipment] = useState("")
  const [requestType, setRequestType] = useState("corrective")
  const [priority, setPriority] = useState("medium")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Placeholder: integrate with API later
    console.log({ equipment, requestType, priority })
    // Redirect back to requests list
    router.push("/client/requests")
  }

  return (
    <AuthLayout userRole="client">
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold text-[#5D3D55]">Create New Request</h1>
          <p className="text-muted-foreground mt-2">Fill in the details to submit a maintenance request</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>New Maintenance Request</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#5D3D55] mb-1">Equipment</label>
                <input
                  required
                  value={equipment}
                  onChange={(e) => setEquipment(e.target.value)}
                  placeholder="e.g. CNC Machine A"
                  className="w-full border border-secondary rounded-lg px-3 py-2 bg-card"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#5D3D55] mb-1">Request Type</label>
                <select
                  value={requestType}
                  onChange={(e) => setRequestType(e.target.value)}
                  className="w-full border border-secondary rounded-lg px-3 py-2 bg-card"
                >
                  <option value="corrective">Corrective</option>
                  <option value="preventive">Preventive</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#5D3D55] mb-1">Priority</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full border border-secondary rounded-lg px-3 py-2 bg-card"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div className="flex justify-end">
                <Button type="button" variant="ghost" onClick={() => router.push('/client/requests')} className="mr-2">
                  Cancel
                </Button>
                <Button type="submit" className="bg-[#604058] text-white hover:scale-105">
                  Submit Request
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AuthLayout>
  )
}
