"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Edit2, Save, X } from "lucide-react"
import Link from "next/link"
import { useSessionStore } from "@/hooks/use-session-store"

interface Session {
  _id: string
  sessionName: string
  lastModified: string
  chatHistory: any[]
}

interface SessionHeaderProps {
  session: Session
}

export function SessionHeader({ session }: SessionHeaderProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [sessionName, setSessionName] = useState(session.sessionName)
  const { updateSessionName, saveSession } = useSessionStore()

  const handleSave = async () => {
    if (sessionName.trim() && sessionName !== session.sessionName) {
      await updateSessionName(sessionName.trim())
    }
    setIsEditing(false)
  }

  const handleCancel = () => {
    setSessionName(session.sessionName)
    setIsEditing(false)
  }

  return (
    <header className="bg-white dark:bg-gray-800 border-b px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>

          <div className="flex items-center space-x-2">
            {isEditing ? (
              <div className="flex items-center space-x-2">
                <Input
                  value={sessionName}
                  onChange={(e) => setSessionName(e.target.value)}
                  className="h-8 w-64"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSave()
                    if (e.key === "Escape") handleCancel()
                  }}
                  autoFocus
                />
                <Button size="sm" onClick={handleSave}>
                  <Save className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost" onClick={handleCancel}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <h1 className="text-lg font-semibold">{session.sessionName}</h1>
                <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
                  <Edit2 className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Badge variant="secondary">{session.chatHistory.length} messages</Badge>
          <Badge variant="outline">Last saved: {new Date(session.lastModified).toLocaleTimeString()}</Badge>
          <Button variant="outline" size="sm" onClick={saveSession}>
            Save Session
          </Button>
        </div>
      </div>
    </header>
  )
}
