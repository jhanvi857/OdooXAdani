"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"

interface CalendarEvent {
  date: string
  requests: Array<{
    id: string
    subject: string
    equipment: string
    technician: string
  }>
}

const mockEvents: CalendarEvent[] = [
  {
    date: "2024-01-15",
    requests: [
      { id: "1", subject: "Oil change and filter replacement", equipment: "Compressor A1", technician: "John" },
      { id: "2", subject: "Quarterly inspection", equipment: "CNC Machine", technician: "Emma" },
    ],
  },
  {
    date: "2024-01-18",
    requests: [{ id: "3", subject: "Belt replacement", equipment: "Conveyor System", technician: "Mike" }],
  },
  {
    date: "2024-01-25",
    requests: [{ id: "4", subject: "Preventive maintenance", equipment: "Hydraulic Press", technician: "Sarah" }],
  },
]

export function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 0, 1))

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const daysInMonth = getDaysInMonth(currentDate)
  const firstDay = getFirstDayOfMonth(currentDate)
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const emptyDays = Array.from({ length: firstDay }, (_, i) => i)

  const getEventsForDate = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    return mockEvents.find((e) => e.date === dateStr)?.requests || []
  }

  const monthName = currentDate.toLocaleString("default", { month: "long", year: "numeric" })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-[#5D3D55]">Preventive Maintenance Calendar</h3>
          <p className="text-sm text-muted-foreground">Schedule and manage preventive maintenance tasks</p>
        </div>
        <Button className="gap-2 bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4" />
          Schedule Maintenance
        </Button>
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-lg font-semibold text-[#5D3D55]">{monthName}</h4>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2 mb-4">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="text-center font-semibold text-xs text-muted-foreground py-2">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {emptyDays.map((i) => (
            <div key={`empty-${i}`} className="aspect-square" />
          ))}
          {days.map((day) => {
            const events = getEventsForDate(day)
            return (
              <div
                key={day}
                className="aspect-square border border-border rounded-lg p-2 cursor-pointer hover:bg-secondary transition-colors flex flex-col"
              >
                <div className="font-semibold text-sm text-[#5D3D55] mb-1">{day}</div>
                <div className="flex-1 space-y-1 overflow-hidden">
                  {events.slice(0, 2).map((event) => (
                    <div key={event.id} className="text-xs bg-primary/20 text-primary px-1 py-0.5 rounded truncate">
                      {event.subject.split(" ")[0]}
                    </div>
                  ))}
                  {events.length > 2 && <div className="text-xs text-muted-foreground">+{events.length - 2} more</div>}
                </div>
              </div>
            )
          })}
        </div>
      </Card>

      <div className="space-y-4">
        <h4 className="font-semibold text-[#5D3D55]">Upcoming Scheduled Maintenance</h4>
        {mockEvents.map((event) => (
          <Card key={event.date} className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h5 className="font-semibold text-[#5D3D55]">{event.date}</h5>
                <p className="text-xs text-muted-foreground">{event.requests.length} maintenance task(s)</p>
              </div>
              <Badge variant="outline">{event.requests.length} Tasks</Badge>
            </div>
            <div className="space-y-2">
              {event.requests.map((request) => (
                <div key={request.id} className="flex items-start gap-3 p-2 bg-secondary rounded">
                  <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#5D3D55]">{request.subject}</p>
                    <p className="text-xs text-muted-foreground">
                      {request.equipment} • {request.technician}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
