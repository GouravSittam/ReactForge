import { type NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Check if Google API key is available
const googleApiKey = process.env.GOOGLE_API_KEY
if (!googleApiKey) {
  console.warn('Google API key not found, using mock responses')
}

const genAI = googleApiKey ? new GoogleGenerativeAI(googleApiKey) : null;

// If genAI is not available, we'll use mock responses
const model = genAI?.getGenerativeModel({
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
    const { sessionId, message, chatHistory } = await request.json();

    // If genAI is not available, return a mock response
    if (!genAI || !model) {
      console.warn('Google AI not available, returning mock response')
      const mockResponse = `Here's a sample React component based on your request: "${message}"

\`\`\`jsx
import React from 'react';

function SampleComponent() {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-800 mb-2">
        Sample Component
      </h2>
      <p className="text-gray-600">
        This is a sample component generated based on your request.
      </p>
    </div>
  );
}

export default SampleComponent;
\`\`\`

\`\`\`css
/* Additional styles can be added here */
\`\`\`

This component includes:
- Modern React functional component
- Tailwind CSS classes for styling
- Responsive design
- Clean, accessible markup`;

      return NextResponse.json({
        response: mockResponse,
        code: {
          jsx: `import React from 'react';

function SampleComponent() {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-800 mb-2">
        Sample Component
      </h2>
      <p className="text-gray-600">
        This is a sample component generated based on your request.
      </p>
    </div>
  );
}

export default SampleComponent;`,
          css: `/* Additional styles can be added here */`
        },
      });
    }

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
