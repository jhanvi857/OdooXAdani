"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"

interface FormInputProps {
  label: string
  type?: string
  placeholder?: string
  value: string
  onChange: (value: string) => void
  error?: string
  required?: boolean
}

export function FormInput({ label, type = "text", placeholder, value, onChange, error, required }: FormInputProps) {
  const [touched, setTouched] = useState(false)

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </label>
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={() => setTouched(true)}
        className={error && touched ? "border-destructive" : ""}
      />
      {error && touched && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
}
