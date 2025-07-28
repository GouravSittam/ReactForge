import { type NextRequest, NextResponse } from "next/server";
import { createClient } from '@supabase/supabase-js';
import { GoogleGenerativeAI } from "@google/generative-ai";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://vbptvktbnwsxkljmcvzj.supabase.co'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

// Create Supabase client with service role key for server-side operations
const supabase = createClient(supabaseUrl, supabaseServiceKey)
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
    
    // Verify the token with Supabase
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const { sessionId, message, chatHistory } = await request.json();

    // For now, use empty current code since we're using local storage
    // In the future, you can implement Supabase database storage
    const currentCode = "";
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

    // For now, just return the response since we're using local storage
    // In the future, you can implement Supabase database storage

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
