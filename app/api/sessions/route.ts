import { type NextRequest, NextResponse } from "next/server"
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://vbptvktbnwsxkljmcvzj.supabase.co'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

// Create Supabase client with service role key for server-side operations
const supabase = createClient(supabaseUrl, supabaseServiceKey)

// GET - Fetch user sessions
export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 })
    }

    const token = authHeader.substring(7)
    
    // Verify the token with Supabase
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)
    
    if (authError || !user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    // For now, return empty sessions since we're using local storage
    // In the future, you can implement Supabase database storage
    return NextResponse.json({ sessions: [] })
  } catch (error) {
    console.error("Fetch sessions error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// POST - Create new session
export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 })
    }

    const token = authHeader.substring(7)
    
    // Verify the token with Supabase
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)
    
    if (authError || !user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const { sessionName } = await request.json()

    // For now, return a mock session since we're using local storage
    // In the future, you can implement Supabase database storage
    const session = {
      id: Date.now().toString(),
      userId: user.id,
      sessionName: sessionName || "New Session",
      chatHistory: [],
      generatedCode: { jsx: "", css: "" },
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString(),
    }

    return NextResponse.json({ session })
  } catch (error) {
    console.error("Create session error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
