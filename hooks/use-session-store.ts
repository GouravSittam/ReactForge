"use client"

import { create } from "zustand"
import { useMinimalSupabaseAuth } from "@/components/minimal-supabase-auth-provider"
import { getUserData, setUserData, getAllUserSessions } from "@/lib/user-storage"

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
  _id: string
  sessionName: string
  lastModified: string
  chatHistory: ChatMessage[]
  generatedCode: GeneratedCode
  componentProperties?: ComponentProperty[]
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
      // Use utility function to get user-specific session data
      const storedSession = getUserData(`session_${sessionId}`)
      if (storedSession) {
        set({
          currentSession: storedSession,
          chatHistory: storedSession.chatHistory || [],
          generatedCode: storedSession.generatedCode || { jsx: "", css: "" },
          componentProperties: storedSession.componentProperties || [],
        })
      } else {
        // Create a new session if none exists
        const newSession = {
          _id: sessionId,
          sessionName: "New Session",
          lastModified: new Date().toISOString(),
          chatHistory: [],
          generatedCode: { jsx: "", css: "" },
          componentProperties: [],
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
      // Save to user-specific local storage using utility function
      const updatedSession = {
        ...currentSession,
        chatHistory,
        generatedCode,
        componentProperties,
        lastModified: new Date().toISOString(),
      }
      setUserData(`session_${currentSession._id}`, updatedSession)
      set({ currentSession: updatedSession })
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
      // Update user-specific local storage using utility function
      const updatedSession = {
        ...currentSession,
        sessionName: name,
        lastModified: new Date().toISOString(),
      }
      setUserData(`session_${currentSession._id}`, updatedSession)
      set({ currentSession: updatedSession })
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
