"use client"

import { create } from "zustand"
import { useMinimalSupabaseAuth } from "@/components/minimal-supabase-auth-provider"

interface ChatMessage {
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

interface GeneratedCode {
  jsx: string
  css: string
}

interface ComponentProperty {
  name: string
  type: "string" | "number" | "boolean" | "color" | "select" | "textarea"
  value: any
  options?: string[]
  min?: number
  max?: number
  step?: number
}

interface Session {
  id: string
  session_name: string
  last_modified: string
  chat_history: ChatMessage[]
  generated_code: GeneratedCode
  component_properties?: ComponentProperty[]
}

interface SessionStore {
  currentSession: Session | null
  chatHistory: ChatMessage[]
  generatedCode: GeneratedCode
  componentProperties: ComponentProperty[]
  isLoading: boolean

  // Actions
  loadSession: (sessionId: string) => Promise<void>
  saveSession: () => Promise<void>
  addChatMessage: (message: ChatMessage) => void
  updateCode: (code: GeneratedCode) => void
  updateSessionName: (name: string) => Promise<void>
  updateComponentProperties: (properties: ComponentProperty[]) => void
  clearSession: () => void
}

export const useSessionStore = create<SessionStore>((set, get) => ({
  currentSession: null,
  chatHistory: [],
  generatedCode: { jsx: "", css: "" },
  componentProperties: [],
  isLoading: false,

  loadSession: async (sessionId: string) => {
    set({ isLoading: true })
    try {
      // Get session from API
      const token = localStorage.getItem('supabase.auth.token')
      const response = await fetch(`/api/sessions/${sessionId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        const session = data.session
        set({
          currentSession: session,
          chatHistory: session.chat_history || [],
          generatedCode: session.generated_code || { jsx: "", css: "" },
          componentProperties: session.component_properties || [],
        })
      } else {
        // Create a new session if none exists
        const newSession = {
          id: sessionId,
          session_name: "New Session",
          last_modified: new Date().toISOString(),
          chat_history: [],
          generated_code: { jsx: "", css: "" },
          component_properties: [],
        }
        set({
          currentSession: newSession,
          chatHistory: [],
          generatedCode: { jsx: "", css: "" },
          componentProperties: [],
        })
      }
    } catch (error) {
      console.error("Failed to load session:", error)
    } finally {
      set({ isLoading: false })
    }
  },

  saveSession: async () => {
    const { currentSession, chatHistory, generatedCode, componentProperties } = get()
    if (!currentSession) return

    try {
      // Save session to API
      const token = localStorage.getItem('supabase.auth.token')
      const response = await fetch(`/api/sessions/${currentSession.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionName: currentSession.session_name,
          chatHistory,
          generatedCode,
          componentProperties,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        set({ currentSession: data.session })
      }
    } catch (error) {
      console.error("Failed to save session:", error)
    }
  },

  addChatMessage: (message: ChatMessage) => {
    set((state) => ({
      chatHistory: [...state.chatHistory, message],
    }))
  },

  updateCode: (code: GeneratedCode) => {
    set({ generatedCode: code })
  },

  updateSessionName: async (name: string) => {
    const { currentSession } = get()
    if (!currentSession) return

    try {
      // Update session name via API
      const token = localStorage.getItem('supabase.auth.token')
      const response = await fetch(`/api/sessions/${currentSession.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionName: name,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        set({ currentSession: data.session })
      }
    } catch (error) {
      console.error("Failed to update session name:", error)
    }
  },

  updateComponentProperties: (properties: ComponentProperty[]) => {
    set({ componentProperties: properties })
  },

  clearSession: () => {
    set({
      currentSession: null,
      chatHistory: [],
      generatedCode: { jsx: "", css: "" },
      componentProperties: [],
    })
  },
}))
