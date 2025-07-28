import { type NextRequest, NextResponse } from "next/server"
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://vbptvktbnwsxkljmcvzj.supabase.co'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

// Create Supabase client with service role key for server-side operations
// If service role key is missing, use a fallback approach
let supabase: any = null
try {
  if (supabaseServiceKey) {
    supabase = createClient(supabaseUrl, supabaseServiceKey)
  }
} catch (error) {
  console.warn('Failed to create Supabase client with service role key:', error)
}

// GET - Fetch user sessions
export async function GET(request: NextRequest) {
  try {
    // If Supabase client is not available, return empty sessions
    if (!supabase) {
      console.warn('Supabase client not available, returning empty sessions')
      return NextResponse.json({ sessions: [] })
    }

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

    // Fetch sessions from Supabase database
    const { data: sessions, error: sessionsError } = await supabase
      .from('sessions')
      .select('*')
      .eq('user_id', user.id)
      .order('last_modified', { ascending: false })

    if (sessionsError) {
      console.error("Database error:", sessionsError)
      return NextResponse.json({ error: "Failed to fetch sessions" }, { status: 500 })
    }

    return NextResponse.json({ sessions: sessions || [] })
  } catch (error) {
    console.error("Fetch sessions error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// POST - Create new session
export async function POST(request: NextRequest) {
  try {
    // If Supabase client is not available, return a mock session
    if (!supabase) {
      console.warn('Supabase client not available, returning mock session')
      const { sessionName } = await request.json()
      const mockSession = {
        id: Date.now().toString(),
        session_name: sessionName || "New Session",
        chat_history: [],
        generated_code: { jsx: "", css: "" },
        component_properties: [],
        created_at: new Date().toISOString(),
        last_modified: new Date().toISOString(),
      }
      return NextResponse.json({ session: mockSession })
    }

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

    // Create session in Supabase database
    const { data: session, error: insertError } = await supabase
      .from('sessions')
      .insert({
        user_id: user.id,
        session_name: sessionName || "New Session",
        chat_history: [],
        generated_code: { jsx: "", css: "" },
        component_properties: []
      })
      .select()
      .single()

    if (insertError) {
      console.error("Database error:", insertError)
      return NextResponse.json({ error: "Failed to create session" }, { status: 500 })
    }

    return NextResponse.json({ session })
  } catch (error) {
    console.error("Create session error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
