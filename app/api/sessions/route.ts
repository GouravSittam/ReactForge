import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { connectDB } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

const JWT_SECRET = "Gourav@2004"

// GET - Fetch user sessions
export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 })
    }

    const token = authHeader.substring(7)
    const decoded = jwt.verify(token, JWT_SECRET) as any

    const { db } = await connectDB()
    const sessions = await db
      .collection("sessions")
      .find({ userId: new ObjectId(decoded.userId) })
      .sort({ lastModified: -1 })
      .toArray()

    return NextResponse.json({ sessions })
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
    const decoded = jwt.verify(token, JWT_SECRET) as any
    const { sessionName } = await request.json()

    const { db } = await connectDB()
    const result = await db.collection("sessions").insertOne({
      userId: new ObjectId(decoded.userId),
      sessionName: sessionName || "New Session",
      chatHistory: [],
      generatedCode: { jsx: "", css: "" },
      createdAt: new Date(),
      lastModified: new Date(),
    })

    const session = await db.collection("sessions").findOne({ _id: result.insertedId })

    return NextResponse.json({ session })
  } catch (error) {
    console.error("Create session error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
