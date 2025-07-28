"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { useToast } from "@/hooks/use-toast"

export default function AuthCallback() {
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('Auth callback error:', error)
          toast({
            title: "Authentication failed",
            description: error.message,
            variant: "destructive",
          })
          router.push("/login")
          return
        }

        if (data.session) {
          toast({
            title: "Welcome!",
            description: "You have been successfully logged in.",
          })
          router.push("/dashboard")
        } else {
          router.push("/login")
        }
      } catch (error) {
        console.error('Auth callback error:', error)
        toast({
          title: "Authentication failed",
          description: "An unexpected error occurred. Please try again.",
          variant: "destructive",
        })
        router.push("/login")
      }
    }

    handleAuthCallback()
  }, [router, toast])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="spinner h-12 w-12 mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold mb-2">Completing authentication...</h2>
        <p className="text-gray-600 dark:text-gray-400">Please wait while we sign you in.</p>
      </div>
    </div>
  )
} 