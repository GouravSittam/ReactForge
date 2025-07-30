import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { MinimalSupabaseAuthProvider } from "@/components/minimal-supabase-auth-provider"
import { SessionProvider } from "@/components/session-provider"
import { ErrorBoundary } from "@/components/error-boundary"
import { LenisProvider } from "@/components/lenis-provider"
import { ScrollToTop } from "@/components/ui/scroll-to-top"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
      title: "ReactForge - AI-Driven React Component Playground",
  description: "Generate, customize, and export beautiful React components with AI assistance",
  keywords: ["React", "AI", "Component Generator", "Next.js", "TypeScript"],
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ErrorBoundary>
          <LenisProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
              <MinimalSupabaseAuthProvider>
                <SessionProvider>
                                  {children}
                <ScrollToTop />
                <Toaster />
                </SessionProvider>
              </MinimalSupabaseAuthProvider>
            </ThemeProvider>
          </LenisProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
