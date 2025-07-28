"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Edit2, Save, X } from "lucide-react"
import Link from "next/link"
import { useSessionStore } from "@/hooks/use-session-store"

interface Session {
  id?: string
  _id?: string
  session_name?: string
  sessionName?: string
  last_modified?: string
  lastModified?: string
  chat_history?: any[]
  chatHistory?: any[]
}

interface SessionHeaderProps {
  session: Session
}

export function SessionHeader({ session }: SessionHeaderProps) {
  // Extract session properties with fallbacks
  const sessionName = session.session_name || session.sessionName || "Untitled Session"
  const lastModified = session.last_modified || session.lastModified || new Date().toISOString()
  const chatHistory = session.chat_history || session.chatHistory || []
  
  const [isEditing, setIsEditing] = useState(false)
  const [editingName, setEditingName] = useState(sessionName)
  const { updateSessionName, saveSession } = useSessionStore()

  const handleSave = async () => {
    if (editingName.trim() && editingName !== sessionName) {
      await updateSessionName(editingName.trim())
    }
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditingName(sessionName)
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
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
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
          <Badge variant="secondary">{chatHistory.length} messages</Badge>
          <Badge variant="outline">Last saved: {new Date(lastModified).toLocaleTimeString()}</Badge>
          <Button variant="outline" size="sm" onClick={saveSession}>
            Save Session
          </Button>
        </div>
      </div>
    </header>
  )
}
