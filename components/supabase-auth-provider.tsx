"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/lib/supabase"
import type { User, Session, AuthError } from '@supabase/supabase-js'

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
  loginWithGoogle: () => Promise<boolean>
  loginWithGithub: () => Promise<boolean>
  logout: () => Promise<void>
  updateProfile: (data: Partial<UserProfile>) => Promise<boolean>
  loading: boolean
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function SupabaseAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  const getUserProfile = useCallback(async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error)
        return null
      }

      return data || { id: userId, email: '', name: '', avatar: '', createdAt: new Date().toISOString() }
    } catch (error) {
      console.error('Error fetching profile:', error)
      return null
    }
  }, [])

  const createUserProfile = useCallback(async (userId: string, email: string, name?: string) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .insert([
          {
            id: userId,
            email,
            name: name || '',
            avatar: '',
            created_at: new Date().toISOString(),
          }
        ])

      if (error) {
        console.error('Error creating profile:', error)
        return false
      }

      return true
    } catch (error) {
      console.error('Error creating profile:', error)
      return false
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
        const profile = await getUserProfile(session.user.id)
        if (profile) {
          setUser(profile)
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error)
    } finally {
      setLoading(false)
    }
  }, [getUserProfile])

  useEffect(() => {
    checkAuth()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session)
        
        if (session?.user) {
          const profile = await getUserProfile(session.user.id)
          if (profile) {
            setUser(profile)
          }
        } else {
          setUser(null)
        }
        
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [checkAuth, getUserProfile])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        toast({
          title: "Login failed",
          description: error.message,
          variant: "destructive",
        })
        return false
      }

      if (data.user) {
        const profile = await getUserProfile(data.user.id)
        if (profile) {
          setUser(profile)
        }
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
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name || '',
          }
        }
      })

      if (error) {
        console.error('Supabase auth error:', error)
        toast({
          title: "Registration failed",
          description: error.message,
          variant: "destructive",
        })
        return false
      }

      if (data.user) {
        try {
          // Create user profile
          const profileCreated = await createUserProfile(data.user.id, email, name)
          if (profileCreated) {
            const profile = await getUserProfile(data.user.id)
            if (profile) {
              setUser(profile)
            }
          }
        } catch (profileError) {
          console.error('Profile creation error:', profileError)
          // Even if profile creation fails, the user is still created
          // We can handle this gracefully
        }
        
        toast({
          title: "Account created!",
          description: "Welcome to ReactForge!",
        })
        return true
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

      const { error } = await supabase
        .from('profiles')
        .update(data)
        .eq('id', user.id)

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
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      })
      router.push("/login")
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        login,
        register,
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

export function useSupabaseAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useSupabaseAuth must be used within a SupabaseAuthProvider')
  }
  return context
} 