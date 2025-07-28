import { type NextRequest, NextResponse } from "next/server"

// GET - Fetch specific session
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Return a mock session since we're using local storage
    const session = {
      id: params.id,
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
    const updateData = await request.json()

    // Just return success since we're using local storage
    return NextResponse.json({ message: "Session updated successfully" })
  } catch (error) {
    console.error("Update session error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
