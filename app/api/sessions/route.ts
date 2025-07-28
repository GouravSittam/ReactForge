import { type NextRequest, NextResponse } from "next/server"

// GET - Fetch user sessions
export async function GET(request: NextRequest) {
  try {
    // Since we're using local storage, return empty sessions
    // The frontend will handle session management
    return NextResponse.json({ sessions: [] })
  } catch (error) {
    console.error("Fetch sessions error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// POST - Create new session
export async function POST(request: NextRequest) {
  try {
    const { sessionName } = await request.json()

    // Return a mock session since we're using local storage
    const session = {
      id: Date.now().toString(),
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
