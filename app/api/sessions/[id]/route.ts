import { type NextRequest, NextResponse } from "next/server"
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://vbptvktbnwsxkljmcvzj.supabase.co'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

// Create Supabase client with service role key for server-side operations
const supabase = createClient(supabaseUrl, supabaseServiceKey)

// GET - Fetch specific session
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
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

    // For now, return a mock session since we're using local storage
    // In the future, you can implement Supabase database storage
    const session = {
      id: params.id,
      userId: user.id,
      sessionName: "Mock Session",
      chatHistory: [],
      generatedCode: { jsx: "", css: "" },
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString(),
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

    // For now, just return success since we're using local storage
    // In the future, you can implement Supabase database storage
    return NextResponse.json({ message: "Session updated successfully" })
  } catch (error) {
    console.error("Update session error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
