"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/lib/supabase"
import type { User, Session } from '@supabase/supabase-js'

interface UserProfile {
  id: string
  email: string
  name?: string
  avatar?: string
  createdAt: string
}

interface AuthContextType {
  user: UserProfile | null
  session: Session | null
  login: (email: string, password: string) => Promise<boolean>
  register: (email: string, password: string, name?: string) => Promise<boolean>
  resendConfirmation: (email: string) => Promise<boolean>
  createDemoUser: () => Promise<boolean>
  loginWithGoogle: () => Promise<boolean>
  loginWithGithub: () => Promise<boolean>
  logout: () => Promise<void>
  updateProfile: (data: Partial<UserProfile>) => Promise<boolean>
  loading: boolean
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function MinimalSupabaseAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  const createUserProfileFromAuth = useCallback((authUser: User): UserProfile => {
    return {
      id: authUser.id,
      email: authUser.email || '',
      name: authUser.user_metadata?.name || '',
      avatar: authUser.user_metadata?.avatar_url || '',
      createdAt: authUser.created_at || new Date().toISOString(),
    }
  }, [])

  const checkAuth = useCallback(async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession()
      
      if (error) {
        console.error('Error getting session:', error)
        setLoading(false)
        return
      }

      if (session?.user) {
        setSession(session)
        const profile = createUserProfileFromAuth(session.user)
        setUser(profile)
        // Store user ID in localStorage for user-specific data
        localStorage.setItem('currentUserId', session.user.id)
      }
    } catch (error) {
      console.error('Auth check failed:', error)
    } finally {
      setLoading(false)
    }
  }, [createUserProfileFromAuth])

  useEffect(() => {
    checkAuth()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email)
        
        // Clear previous user data if switching users
        const currentUserId = localStorage.getItem('currentUserId')
        if (currentUserId && session?.user?.id !== currentUserId) {
          clearUserData(currentUserId)
        }
        
        setSession(session)
        
        if (session?.user) {
          const profile = createUserProfileFromAuth(session.user)
          setUser(profile)
          // Store user ID in localStorage for user-specific data
          localStorage.setItem('currentUserId', session.user.id)
        } else {
          setUser(null)
          // Clear user ID from localStorage
          localStorage.removeItem('currentUserId')
        }
        
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [checkAuth, createUserProfileFromAuth])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      console.log('Attempting login for:', email)
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        console.error('Login error:', error)
        
        // Handle specific error cases
        if (error.message === 'Email not confirmed') {
          toast({
            title: "Email not confirmed",
            description: "Please check your email and click the confirmation link. Use the 'Resend confirmation' button if you need a new email.",
            variant: "destructive",
          })
        } else {
          toast({
            title: "Login failed",
            description: error.message,
            variant: "destructive",
          })
        }
        return false
      }

      if (data.user) {
        console.log('Login successful for:', data.user.email)
        const profile = createUserProfileFromAuth(data.user)
        setUser(profile)
        setSession(data.session)
        toast({
          title: "Welcome back!",
          description: "You have been successfully logged in.",
        })
        return true
      }

      return false
    } catch (error) {
      console.error('Login failed:', error)
      toast({
        title: "Login failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
      return false
    }
  }

  const register = async (email: string, password: string, name?: string): Promise<boolean> => {
    try {
      console.log('Attempting registration for:', email)
      
      // Check if signups are disabled
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: name ? { name } : undefined,
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      })

      if (error) {
        console.error('Registration error:', error)
        
        // Handle specific error cases
        if (error.message === 'Signups not allowed for this instance') {
          toast({
            title: "Registration disabled",
            description: "User registration is currently disabled. Please contact the administrator or enable signups in Supabase settings.",
            variant: "destructive",
          })
        } else {
          toast({
            title: "Registration failed",
            description: error.message,
            variant: "destructive",
          })
        }
        return false
      }

      if (data.user) {
        console.log('Registration successful for:', data.user.email)
        
        // Check if email confirmation is required
        if (data.session) {
          // User is immediately signed in (email confirmation disabled)
          const profile = createUserProfileFromAuth(data.user)
          setUser(profile)
          setSession(data.session)
          
          toast({
            title: "Account created!",
            description: "Welcome to ComponentGen Pro!",
          })
          return true
        } else {
          // Email confirmation required - show helpful message
          toast({
            title: "Check your email!",
            description: "We've sent you a confirmation link. Please check your email and click the link to verify your account.",
          })
          return true
        }
      }

      return false
    } catch (error) {
      console.error('Registration failed:', error)
      toast({
        title: "Registration failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
      return false
    }
  }

  const createDemoUser = async (): Promise<boolean> => {
    try {
      // Create a demo user profile for development
      const demoUser: UserProfile = {
        id: 'demo-user-id',
        email: 'demo@example.com',
        name: 'Demo User',
        avatar: '',
        createdAt: new Date().toISOString(),
      }
      
      setUser(demoUser)
      // Store demo user ID in localStorage for user-specific data
      localStorage.setItem('currentUserId', 'demo-user-id')
      toast({
        title: "Demo mode activated!",
        description: "You're now logged in as a demo user for testing purposes.",
      })
      return true
    } catch (error) {
      console.error('Demo user creation failed:', error)
      toast({
        title: "Demo mode failed",
        description: "Failed to create demo user. Please try again.",
        variant: "destructive",
      })
      return false
    }
  }

  const resendConfirmation = async (email: string): Promise<boolean> => {
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email,
      })

      if (error) {
        // Handle rate limiting specifically
        if (error.message.includes('security purposes') || error.message.includes('Too Many Requests')) {
          toast({
            title: "Rate limit exceeded",
            description: "Please wait a minute before requesting another confirmation email.",
            variant: "destructive",
          })
        } else {
          toast({
            title: "Failed to resend confirmation",
            description: error.message,
            variant: "destructive",
          })
        }
        return false
      }

      toast({
        title: "Confirmation email sent!",
        description: "Please check your email for the confirmation link.",
      })
      return true
    } catch (error) {
      console.error('Resend confirmation failed:', error)
      toast({
        title: "Failed to resend confirmation",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
      return false
    }
  }

  const loginWithGoogle = async (): Promise<boolean> => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      })

      if (error) {
        toast({
          title: "Google login failed",
          description: error.message,
          variant: "destructive",
        })
        return false
      }

      return true
    } catch (error) {
      console.error('Google login failed:', error)
      toast({
        title: "Google login failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
      return false
    }
  }

  const loginWithGithub = async (): Promise<boolean> => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      })

      if (error) {
        toast({
          title: "GitHub login failed",
          description: error.message,
          variant: "destructive",
        })
        return false
      }

      return true
    } catch (error) {
      console.error('GitHub login failed:', error)
      toast({
        title: "GitHub login failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
      return false
    }
  }

  const updateProfile = async (data: Partial<UserProfile>): Promise<boolean> => {
    try {
      if (!user?.id) return false

      const { error } = await supabase.auth.updateUser({
        data: {
          name: data.name,
          avatar_url: data.avatar,
        }
      })

      if (error) {
        toast({
          title: "Update failed",
          description: error.message,
          variant: "destructive",
        })
        return false
      }

      setUser(prev => prev ? { ...prev, ...data } : null)
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      })
      return true
    } catch (error) {
      console.error('Profile update failed:', error)
      toast({
        title: "Update failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
      return false
    }
  }

  const logout = async (): Promise<void> => {
    try {
      const { error } = await supabase.auth.signOut()
      
      if (error) {
        console.error('Logout error:', error)
      }

      setUser(null)
      setSession(null)
      // Clear user ID from localStorage
      localStorage.removeItem('currentUserId')
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      })
      router.push("/login")
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  // Function to clear all user-specific data
  const clearUserData = (userId: string) => {
    const keysToRemove = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key && key.startsWith(`user_${userId}_`)) {
        keysToRemove.push(key)
      }
    }
    keysToRemove.forEach(key => localStorage.removeItem(key))
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        login,
        register,
        resendConfirmation,
        createDemoUser,
        loginWithGoogle,
        loginWithGithub,
        logout,
        updateProfile,
        loading,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useMinimalSupabaseAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useMinimalSupabaseAuth must be used within a MinimalSupabaseAuthProvider')
  }
  return context
} 