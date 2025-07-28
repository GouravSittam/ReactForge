"use client"

import { create } from "zustand"

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
      // For now, use local storage since we're not using database storage
      // In the future, you can implement Supabase database storage
      const storedSession = localStorage.getItem(`session_${sessionId}`)
      if (storedSession) {
        const session = JSON.parse(storedSession)
        set({
          currentSession: session,
          chatHistory: session.chatHistory || [],
          generatedCode: session.generatedCode || { jsx: "", css: "" },
          componentProperties: session.componentProperties || [],
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
      // For now, save to local storage since we're not using database storage
      // In the future, you can implement Supabase database storage
      const updatedSession = {
        ...currentSession,
        chatHistory,
        generatedCode,
        componentProperties,
        lastModified: new Date().toISOString(),
      }
      localStorage.setItem(`session_${currentSession._id}`, JSON.stringify(updatedSession))
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
      // For now, update local storage since we're not using database storage
      // In the future, you can implement Supabase database storage
      const updatedSession = {
        ...currentSession,
        sessionName: name,
        lastModified: new Date().toISOString(),
      }
      localStorage.setItem(`session_${currentSession._id}`, JSON.stringify(updatedSession))
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
