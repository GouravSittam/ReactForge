"use client"

import type React from "react"
import { createContext, useContext, useEffect, useCallback } from "react"
import { useAuth } from "@/components/auth-provider"
import { useSessionStore } from "@/hooks/use-session-store"

interface SessionContextType {
  autoSave: boolean
  setAutoSave: (enabled: boolean) => void
}

const SessionContext = createContext<SessionContextType | undefined>(undefined)

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth()
  const { currentSession, saveSession } = useSessionStore()

  // Auto-save functionality
  const performAutoSave = useCallback(async () => {
    if (currentSession && isAuthenticated) {
      try {
        await saveSession()
      } catch (error) {
        console.error("Auto-save failed:", error)
      }
    }
  }, [currentSession, isAuthenticated, saveSession])

  // Auto-save every 30 seconds
  useEffect(() => {
    if (!isAuthenticated || !currentSession) return

    const interval = setInterval(performAutoSave, 30000)
    return () => clearInterval(interval)
  }, [isAuthenticated, currentSession, performAutoSave])

  // Save before page unload
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (currentSession) {
        performAutoSave()
        e.preventDefault()
        e.returnValue = ""
      }
    }

    window.addEventListener("beforeunload", handleBeforeUnload)
    return () => window.removeEventListener("beforeunload", handleBeforeUnload)
  }, [currentSession, performAutoSave])

  return (
    <SessionContext.Provider
      value={{
        autoSave: true,
        setAutoSave: () => {},
      }}
    >
      {children}
    </SessionContext.Provider>
  )
}

export function useSession() {
  const context = useContext(SessionContext)
  if (context === undefined) {
    throw new Error("useSession must be used within a SessionProvider")
  }
  return context
}
