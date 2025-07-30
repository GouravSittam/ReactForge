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
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-2 sm:space-x-4 w-full sm:w-auto">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="text-xs sm:text-sm">
              <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Back to Dashboard</span>
              <span className="sm:hidden">Back</span>
            </Button>
          </Link>

          <div className="flex items-center space-x-2 flex-1 sm:flex-none">
            {isEditing ? (
              <div className="flex items-center space-x-2 w-full sm:w-auto">
                <Input
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                  className="h-8 w-full sm:w-64 text-sm"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSave()
                    if (e.key === "Escape") handleCancel()
                  }}
                  autoFocus
                />
                <Button size="sm" onClick={handleSave} className="shrink-0">
                  <Save className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
                <Button size="sm" variant="ghost" onClick={handleCancel} className="shrink-0">
                  <X className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2 min-w-0 flex-1">
                <h1 className="text-base sm:text-lg font-semibold truncate">{session.sessionName}</h1>
                <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)} className="shrink-0">
                  <Edit2 className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4 w-full sm:w-auto justify-between sm:justify-end">
          <Badge variant="secondary" className="text-xs">
            <span className="hidden sm:inline">{chatHistory.length} messages</span>
            <span className="sm:hidden">{chatHistory.length} msgs</span>
          </Badge>
          <Badge variant="outline" className="text-xs hidden sm:inline-flex">
            Last saved: {new Date(lastModified).toLocaleTimeString()}
          </Badge>
          <Badge variant="outline" className="text-xs sm:hidden">
            {new Date(lastModified).toLocaleTimeString()}
          </Badge>
          <Button variant="outline" size="sm" onClick={saveSession} className="text-xs">
            <span className="hidden sm:inline">Save Session</span>
            <span className="sm:hidden">Save</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
