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

interface Session {
  _id: string
  sessionName: string
  lastModified: string
  chatHistory: ChatMessage[]
  generatedCode: GeneratedCode
}

interface SessionStore {
  currentSession: Session | null
  chatHistory: ChatMessage[]
  generatedCode: GeneratedCode
  isLoading: boolean

  // Actions
  loadSession: (sessionId: string) => Promise<void>
  saveSession: () => Promise<void>
  addChatMessage: (message: ChatMessage) => void
  updateCode: (code: GeneratedCode) => void
  updateSessionName: (name: string) => Promise<void>
  clearSession: () => void
}

export const useSessionStore = create<SessionStore>((set, get) => ({
  currentSession: null,
  chatHistory: [],
  generatedCode: { jsx: "", css: "" },
  isLoading: false,

  loadSession: async (sessionId: string) => {
    set({ isLoading: true })
    try {
      const token = localStorage.getItem("token")
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
          chatHistory: session.chatHistory || [],
          generatedCode: session.generatedCode || { jsx: "", css: "" },
        })
      }
    } catch (error) {
      console.error("Failed to load session:", error)
    } finally {
      set({ isLoading: false })
    }
  },

  saveSession: async () => {
    const { currentSession, chatHistory, generatedCode } = get()
    if (!currentSession) return

    try {
      const token = localStorage.getItem("token")
      await fetch(`/api/sessions/${currentSession._id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chatHistory,
          generatedCode,
          lastModified: new Date().toISOString(),
        }),
      })
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
      const token = localStorage.getItem("token")
      const response = await fetch(`/api/sessions/${currentSession._id}`, {
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
        set((state) => ({
          currentSession: state.currentSession
            ? {
                ...state.currentSession,
                sessionName: name,
              }
            : null,
        }))
      }
    } catch (error) {
      console.error("Failed to update session name:", error)
    }
  },

  clearSession: () => {
    set({
      currentSession: null,
      chatHistory: [],
      generatedCode: { jsx: "", css: "" },
    })
  },
}))
