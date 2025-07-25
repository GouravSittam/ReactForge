import { type NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { connectDB } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

const JWT_SECRET = process.env.JWT_SECRET!;
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
  generationConfig: {
    temperature: 0.7,
    topP: 0.8,
    maxOutputTokens: 4096,
  },
});

const generateComponentPrompt = (
  userPrompt: string,
  chatHistory: any[],
  currentCode: string
) => {
  const historyContext = chatHistory
    .slice(-5) // Last 5 messages for context
    .map((msg) => `${msg.role}: ${msg.content}`)
    .join("\n");

  return `You are an expert React developer. Generate clean, modern React components.

Previous Context: 
${historyContext}

Current Code: 
${currentCode}

User Request: 
${userPrompt}

Requirements:
- Use modern React hooks (useState, useEffect, etc.)
- Include Tailwind CSS classes for styling
- Ensure accessibility (ARIA labels, semantic HTML)
- Make it responsive and mobile-friendly
- Use TypeScript when beneficial
- Follow React best practices

Format your response as:
\`\`\`jsx
// Component code here
function Component() {
  // Your component implementation
  return (
    // JSX here
  );
}
\`\`\`

\`\`\`css
/* Additional custom styles if needed */
\`\`\`

Provide a brief explanation of what you created and any key features.`;
};

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    const token = authHeader.substring(7);
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    const { sessionId, message, chatHistory } = await request.json();

    const { db } = await connectDB();

    // Get current session to access existing code
    const session = await db.collection("sessions").findOne({
      _id: new ObjectId(sessionId),
      userId: new ObjectId(decoded.userId),
    });

    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    const currentCode = session.generatedCode?.jsx || "";
    const prompt = generateComponentPrompt(message, chatHistory, currentCode);

    // Generate response with Gemini
    const result = await model.generateContent(prompt);
    const response = result.response.text();

    // Extract code from response
    const jsxMatch = response.match(/```jsx\n([\s\S]*?)\n```/);
    const cssMatch = response.match(/```css\n([\s\S]*?)\n```/);

    const generatedCode = {
      jsx: jsxMatch ? jsxMatch[1] : "",
      css: cssMatch ? cssMatch[1] : "",
    };

    // Update session with new chat message and code
    await db.collection("sessions").updateOne(
      { _id: new ObjectId(sessionId) },
      {
        $set: {
          chatHistory: [
            ...chatHistory,
            {
              role: "assistant",
              content: response,
              timestamp: new Date(),
            },
          ],
          generatedCode,
          lastModified: new Date(),
        },
      }
    );

    return NextResponse.json({
      response,
      code: generatedCode,
    });
  } catch (error) {
    console.error("Generate error:", error);
    return NextResponse.json(
      { error: "Failed to generate component" },
      { status: 500 }
    );
  }
}
