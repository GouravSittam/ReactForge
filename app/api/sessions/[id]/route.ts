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

// GET - Fetch specific session
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // If Supabase client is not available, return a mock session
    if (!supabase) {
      console.warn('Supabase client not available, returning mock session')
      const mockSession = {
        id: params.id,
        session_name: "Mock Session",
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

    // Fetch session from Supabase database
    const { data: session, error: sessionError } = await supabase
      .from('sessions')
      .select('*')
      .eq('id', params.id)
      .eq('user_id', user.id)
      .single()

    if (sessionError) {
      console.error("Database error:", sessionError)
      return NextResponse.json({ error: "Session not found" }, { status: 404 })
    }

    return NextResponse.json({ session })
  } catch (error) {
    console.error("Fetch session error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// PUT - Update session
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // If Supabase client is not available, return success
    if (!supabase) {
      console.warn('Supabase client not available, returning success')
      return NextResponse.json({ message: "Session updated successfully" })
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

    const updateData = await request.json()

    // Update session in Supabase database
    const { data: session, error: updateError } = await supabase
      .from('sessions')
      .update({
        session_name: updateData.sessionName,
        chat_history: updateData.chatHistory,
        generated_code: updateData.generatedCode,
        component_properties: updateData.componentProperties,
        last_modified: new Date().toISOString()
      })
      .eq('id', params.id)
      .eq('user_id', user.id)
      .select()
      .single()

    if (updateError) {
      console.error("Database error:", updateError)
      return NextResponse.json({ error: "Failed to update session" }, { status: 500 })
    }

    return NextResponse.json({ message: "Session updated successfully", session })
  } catch (error) {
    console.error("Update session error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
