"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Send, User, Bot, Loader2, Sparkles, Code, Palette, Zap, Copy, ThumbsUp, ThumbsDown } from "lucide-react"
import { useSessionStore } from "@/hooks/use-session-store"
import { useToast } from "@/hooks/use-toast"
import { motion, AnimatePresence } from "framer-motion"

interface ChatMessage {
  role: "user" | "assistant"
  content: string
  timestamp: Date
  id?: string
  isStreaming?: boolean
}

interface ChatInterfaceProps {
  sessionId: string
}

const suggestedPrompts = [
  {
    icon: Code,
    text: "Create a login form with email and password",
    category: "Forms",
  },
  {
    icon: Palette,
    text: "Build a pricing card component",
    category: "UI",
  },
  {
    icon: Zap,
    text: "Make a responsive navigation bar",
    category: "Navigation",
  },
  {
    icon: Sparkles,
    text: "Design a hero section with gradient background",
    category: "Layout",
  },
]

export function ChatInterface({ sessionId }: ChatInterfaceProps) {
  const [message, setMessage] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [streamingMessage, setStreamingMessage] = useState("")
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const { chatHistory, addChatMessage, updateCode } = useSessionStore()
  const { toast } = useToast()

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [chatHistory, streamingMessage])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim() || isGenerating) return

    const userMessage: ChatMessage = {
      role: "user",
      content: message.trim(),
      timestamp: new Date(),
      id: Date.now().toString(),
    }

    addChatMessage(userMessage)
    setMessage("")
    setIsGenerating(true)
    setStreamingMessage("")

    try {
      // For now, use a mock response since we're not using the API
      // In the future, you can implement proper API calls with Supabase auth
      const mockResponse = {
        response: `Here's a sample React component based on your request: "${userMessage.content}"

\`\`\`jsx
import React from 'react';

function SampleComponent() {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-800 mb-2">
        Sample Component
      </h2>
      <p className="text-gray-600">
        This is a sample component generated based on your request.
      </p>
    </div>
  );
}

export default SampleComponent;
\`\`\`

\`\`\`css
/* Additional styles can be added here */
\`\`\`

This component includes:
- Modern React functional component
- Tailwind CSS classes for styling
- Responsive design
- Clean, accessible markup`,
        code: {
          jsx: `import React from 'react';

function SampleComponent() {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-800 mb-2">
        Sample Component
      </h2>
      <p className="text-gray-600">
        This is a sample component generated based on your request.
      </p>
    </div>
  );
}

export default SampleComponent;`,
          css: `/* Additional styles can be added here */`
        }
      }

      // Simulate API response
      const data = mockResponse
      const assistantMessage: ChatMessage = {
        role: "assistant",
        content: data.response,
        timestamp: new Date(),
        id: Date.now().toString(),
      }

      addChatMessage(assistantMessage)

      if (data.code) {
        updateCode(data.code)
        toast({
          title: "Component generated!",
          description: "Your component has been updated in the preview.",
        })
      }
    } catch (error) {
      console.error("Error generating response:", error)
      const errorMessage: ChatMessage = {
        role: "assistant",
        content: "Sorry, I encountered an error while generating your component. Please try again.",
        timestamp: new Date(),
        id: Date.now().toString(),
      }
      addChatMessage(errorMessage)
      toast({
        title: "Generation failed",
        description: "Please try again or contact support if the issue persists.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
      setStreamingMessage("")
    }
  }

  const handleSuggestedPrompt = (prompt: string) => {
    setMessage(prompt)
    textareaRef.current?.focus()
  }

  const handleCopyMessage = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content)
      toast({
        title: "Copied!",
        description: "Message copied to clipboard.",
      })
    } catch (error) {
      toast({
        title: "Failed to copy",
        description: "Could not copy message to clipboard.",
        variant: "destructive",
      })
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e as any)
    }
  }

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-800 border-r">
      {/* Header */}
      <div className="p-4 border-b bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
        <div className="flex items-center space-x-2 mb-2">
          <Bot className="h-5 w-5 text-blue-600" />
          <h2 className="font-semibold text-lg">AI Assistant</h2>
          <Badge variant="secondary" className="text-xs">
            <Sparkles className="h-3 w-3 mr-1" />
            Pro
          </Badge>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300">Describe the component you want to create</p>
      </div>

      {/* Chat Messages */}
      <ScrollArea className="flex-1 p-4 custom-scrollbar" ref={scrollAreaRef}>
        <div className="space-y-4">
          {chatHistory.length === 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              <Card className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800">
                <div className="flex items-start space-x-3">
                  <Bot className="h-6 w-6 text-blue-600 mt-1" />
                  <div>
                    <p className="text-sm mb-3">
                      Hi! I'm your AI assistant. I can help you create React components. Try one of these suggestions:
                    </p>
                    <div className="grid gap-2">
                      {suggestedPrompts.map((prompt, index) => (
                        <motion.button
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          onClick={() => handleSuggestedPrompt(prompt.text)}
                          className="flex items-center space-x-2 p-2 rounded-lg bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors text-left border"
                        >
                          <prompt.icon className="h-4 w-4 text-blue-600" />
                          <div className="flex-1">
                            <p className="text-sm font-medium">{prompt.text}</p>
                            <p className="text-xs text-gray-500">{prompt.category}</p>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          <AnimatePresence>
            {chatHistory.map((msg, index) => (
              <motion.div
                key={msg.id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="chat-message"
              >
                <Card
                  className={`p-4 ${
                    msg.role === "user"
                      ? "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 ml-8"
                      : "bg-gray-50 dark:bg-gray-700 mr-8"
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    {msg.role === "user" ? (
                      <User className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                    ) : (
                      <Bot className="h-5 w-5 text-gray-600 mt-1 flex-shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">{msg.role === "user" ? "You" : "AI Assistant"}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-500">{new Date(msg.timestamp).toLocaleTimeString()}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleCopyMessage(msg.content)}
                            className="h-6 w-6 p-0"
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="prose prose-sm max-w-none dark:prose-invert">
                        <p className="whitespace-pre-wrap text-sm leading-relaxed">{msg.content}</p>
                      </div>
                      {msg.role === "assistant" && (
                        <div className="flex items-center space-x-2 mt-3">
                          <Button variant="ghost" size="sm" className="h-6 px-2">
                            <ThumbsUp className="h-3 w-3 mr-1" />
                            Helpful
                          </Button>
                          <Button variant="ghost" size="sm" className="h-6 px-2">
                            <ThumbsDown className="h-3 w-3 mr-1" />
                            Not helpful
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>

          {isGenerating && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="chat-message">
              <Card className="p-4 bg-gray-50 dark:bg-gray-700 mr-8">
                <div className="flex items-start space-x-3">
                  <Bot className="h-5 w-5 text-gray-600 mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-sm font-medium">AI Assistant</span>
                      <Badge variant="secondary" className="text-xs">
                        <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                        Generating
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="typing-indicator text-sm text-gray-600">Creating your component</div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </div>
      </ScrollArea>

      {/* Input Form */}
      <div className="p-4 border-t bg-gray-50 dark:bg-gray-800/50">
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="relative">
            <Textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Describe your component... (Shift+Enter for new line)"
              disabled={isGenerating}
              className="min-h-[60px] max-h-[120px] resize-none pr-12"
              rows={2}
            />
            <Button
              type="submit"
              disabled={isGenerating || !message.trim()}
              size="sm"
              className="absolute bottom-2 right-2 h-8 w-8 p-0"
            >
              {isGenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </div>

          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Press Enter to send, Shift+Enter for new line</span>
            <span>{message.length}/1000</span>
          </div>
        </form>
      </div>
    </div>
  )
}
