"use client"

import { useEffect, useState } from "react"
import { useMinimalSupabaseAuth } from "@/components/minimal-supabase-auth-provider"
import { useRouter } from "next/navigation"
import { ChatInterface } from "@/components/chat/chat-interface"
import { ComponentPreview } from "@/components/preview/component-preview"
import { CodeEditor } from "@/components/editor/code-editor"
import { PropertyPanel } from "@/components/property-panel"
import { SessionHeader } from "@/components/session/session-header"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { useSessionStore } from "@/hooks/use-session-store"
import { motion } from "framer-motion"

interface SessionPageProps {
  params: {
    id: string
  }
}

export default function SessionPage({ params }: SessionPageProps) {
  const { user, loading } = useMinimalSupabaseAuth()
  const router = useRouter()
  const { currentSession, loadSession, saveSession } = useSessionStore()
  const [showPropertyPanel, setShowPropertyPanel] = useState(false)

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
      return
    }
    if (user && params.id) {
      loadSession(params.id)
    }
  }, [user, loading, params.id, router, loadSession])

  // Auto-save every 30 seconds
  useEffect(() => {
    if (!currentSession) return

    const interval = setInterval(() => {
      saveSession()
    }, 30000)

    return () => clearInterval(interval)
  }, [currentSession, saveSession])

  // Save on beforeunload
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (currentSession) {
        saveSession()
      }
    }

    window.addEventListener("beforeunload", handleBeforeUnload)
    return () => window.removeEventListener("beforeunload", handleBeforeUnload)
  }, [currentSession, saveSession])

  if (loading || !currentSession) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <div className="spinner h-12 w-12 mx-auto mb-4"></div>
          <p className="text-lg">Loading session...</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Preparing your workspace</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <SessionHeader
        session={currentSession}
        onTogglePropertyPanel={() => setShowPropertyPanel(!showPropertyPanel)}
        showPropertyPanel={showPropertyPanel}
      />

      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal" className="h-full">
          {/* Chat Panel */}
          <ResizablePanel defaultSize={25} minSize={20} maxSize={40}>
            <ChatInterface sessionId={params.id} />
          </ResizablePanel>

          <ResizableHandle className="resize-handle" />

          {/* Main Content */}
          <ResizablePanel defaultSize={showPropertyPanel ? 50 : 75}>
            <ResizablePanelGroup direction="vertical">
              {/* Preview Panel */}
              <ResizablePanel defaultSize={60} minSize={40}>
                <ComponentPreview />
              </ResizablePanel>

              <ResizableHandle className="resize-handle" />

              {/* Code Editor Panel */}
              <ResizablePanel defaultSize={40} minSize={30}>
                <CodeEditor />
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>

          {/* Property Panel */}
          {showPropertyPanel && (
            <>
              <ResizableHandle className="resize-handle" />
              <ResizablePanel defaultSize={25} minSize={20} maxSize={35}>
                <PropertyPanel />
              </ResizablePanel>
            </>
          )}
        </ResizablePanelGroup>
      </div>
    </div>
  )
}
