"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import { useSessionStore } from "@/hooks/use-session-store"
import { motion } from "framer-motion"

interface Property {
  name: string
  type: "string" | "number" | "boolean" | "color" | "select" | "textarea"
  value: any
  options?: string[]
  min?: number
  max?: number
  step?: number
}

export function PropertyPanel() {
  const { currentSession, updateComponentProperties } = useSessionStore()
  const [properties, setProperties] = useState<Property[]>([
    { name: "text", type: "string", value: "Hello World" },
    { name: "color", type: "color", value: "#3b82f6" },
    { name: "size", type: "select", value: "medium", options: ["small", "medium", "large"] },
    { name: "disabled", type: "boolean", value: false },
    { name: "padding", type: "number", value: 16, min: 0, max: 100, step: 1 },
    { name: "description", type: "textarea", value: "Component description" }
  ])

  const handlePropertyChange = (index: number, value: any) => {
    const newProperties = [...properties]
    newProperties[index].value = value
    setProperties(newProperties)
    
    // Update the session with new properties
    if (currentSession) {
      updateComponentProperties(newProperties)
    }
  }

  const renderPropertyInput = (property: Property, index: number) => {
    switch (property.type) {
      case "string":
        return (
          <Input
            value={property.value}
            onChange={(e) => handlePropertyChange(index, e.target.value)}
            placeholder={`Enter ${property.name}`}
          />
        )
      
      case "number":
        return (
          <div className="space-y-2">
            <Slider
              value={[property.value]}
              onValueChange={(value) => handlePropertyChange(index, value[0])}
              min={property.min || 0}
              max={property.max || 100}
              step={property.step || 1}
              className="w-full"
            />
            <Input
              type="number"
              value={property.value}
              onChange={(e) => handlePropertyChange(index, Number(e.target.value))}
              min={property.min}
              max={property.max}
              step={property.step}
            />
          </div>
        )
      
      case "boolean":
        return (
          <Switch
            checked={property.value}
            onCheckedChange={(checked) => handlePropertyChange(index, checked)}
          />
        )
      
      case "color":
        return (
          <div className="flex items-center space-x-2">
            <Input
              type="color"
              value={property.value}
              onChange={(e) => handlePropertyChange(index, e.target.value)}
              className="w-12 h-10 p-1"
            />
            <Input
              value={property.value}
              onChange={(e) => handlePropertyChange(index, e.target.value)}
              placeholder="#000000"
            />
          </div>
        )
      
      case "select":
        return (
          <Select value={property.value} onValueChange={(value) => handlePropertyChange(index, value)}>
            <SelectTrigger>
              <SelectValue placeholder={`Select ${property.name}`} />
            </SelectTrigger>
            <SelectContent>
              {property.options?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )
      
      case "textarea":
        return (
          <Textarea
            value={property.value}
            onChange={(e) => handlePropertyChange(index, e.target.value)}
            placeholder={`Enter ${property.name}`}
            rows={3}
          />
        )
      
      default:
        return <Input value={property.value} onChange={(e) => handlePropertyChange(index, e.target.value)} />
    }
  }

  return (
    <div className="h-full bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 overflow-y-auto">
      <div className="p-4 space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Component Properties</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {properties.map((property, index) => (
                <motion.div
                  key={property.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.1 }}
                  className="space-y-2"
                >
                  <Label htmlFor={property.name} className="text-sm font-medium capitalize">
                    {property.name}
                  </Label>
                  {renderPropertyInput(property, index)}
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        <Separator />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                Reset Properties
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Export Properties
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Import Properties
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
} 