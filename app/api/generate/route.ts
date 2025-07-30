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

    // Validate input
    if (!message || !message.trim()) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // If genAI is not available, return a mock response
    if (!genAI || !model) {
      console.warn('Google AI not available, returning mock response')
      
      // Generate a more dynamic mock response based on the user's request
      const mockResponse = `Here's a React component based on your request: "${message}"

\`\`\`jsx
import React from 'react';

function ${message.includes('button') ? 'CustomButton' : message.includes('card') ? 'InfoCard' : message.includes('form') ? 'ContactForm' : 'SampleComponent'}() {
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        ${message.includes('button') ? 'Custom Button' : message.includes('card') ? 'Information Card' : message.includes('form') ? 'Contact Form' : 'Sample Component'}
      </h2>
      <p className="text-gray-600 mb-4">
        This is a component generated based on your request: "${message}"
      </p>
      <div className="flex gap-3">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
          Primary Action
        </button>
        <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors">
          Secondary Action
        </button>
      </div>
    </div>
  );
}

export default ${message.includes('button') ? 'CustomButton' : message.includes('card') ? 'InfoCard' : message.includes('form') ? 'ContactForm' : 'SampleComponent'};
\`\`\`

\`\`\`css
/* Custom styles for enhanced appearance */
.custom-component {
  transition: all 0.3s ease;
}

.custom-component:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}
\`\`\`

This component includes:
- Modern React functional component with dynamic naming
- Tailwind CSS classes for responsive styling
- Hover effects and transitions
- Accessible button elements
- Clean, semantic HTML structure`;

      return NextResponse.json({
        response: mockResponse,
        code: {
          jsx: `import React from 'react';

function ${message.includes('button') ? 'CustomButton' : message.includes('card') ? 'InfoCard' : message.includes('form') ? 'ContactForm' : 'SampleComponent'}() {
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        ${message.includes('button') ? 'Custom Button' : message.includes('card') ? 'Information Card' : message.includes('form') ? 'Contact Form' : 'Sample Component'}
      </h2>
      <p className="text-gray-600 mb-4">
        This is a component generated based on your request: "${message}"
      </p>
      <div className="flex gap-3">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
          Primary Action
        </button>
        <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors">
          Secondary Action
        </button>
      </div>
    </div>
  );
}

export default ${message.includes('button') ? 'CustomButton' : message.includes('card') ? 'InfoCard' : message.includes('form') ? 'ContactForm' : 'SampleComponent'};`,
          css: `/* Custom styles for enhanced appearance */
.custom-component {
  transition: all 0.3s ease;
}

.custom-component:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}`
        },
      });
    }

    // For now, use empty current code since we're using local storage
    // In the future, you can implement Supabase database storage
    const currentCode = "";
    const prompt = generateComponentPrompt(message, chatHistory, currentCode);

    try {
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

      return NextResponse.json({
        response,
        code: generatedCode,
      });
    } catch (aiError) {
      console.error("AI generation error:", aiError);
      // Fallback to mock response if AI fails
      const fallbackResponse = `I encountered an issue with the AI service, but here's a component based on your request: "${message}"

\`\`\`jsx
import React from 'react';

function FallbackComponent() {
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Fallback Component
      </h2>
      <p className="text-gray-600 mb-4">
        This is a fallback component generated for your request: "${message}"
      </p>
      <div className="flex gap-3">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
          Action Button
        </button>
      </div>
    </div>
  );
}

export default FallbackComponent;
\`\`\`

\`\`\`css
/* Fallback styles */
.fallback-component {
  transition: all 0.3s ease;
}
\`\`\`

Note: This is a fallback response due to AI service issues.`;

      return NextResponse.json({
        response: fallbackResponse,
        code: {
          jsx: `import React from 'react';

function FallbackComponent() {
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Fallback Component
      </h2>
      <p className="text-gray-600 mb-4">
        This is a fallback component generated for your request: "${message}"
      </p>
      <div className="flex gap-3">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
          Action Button
        </button>
      </div>
    </div>
  );
}

export default FallbackComponent;`,
          css: `/* Fallback styles */
.fallback-component {
  transition: all 0.3s ease;
}`
        },
      });
    }
  } catch (error) {
    console.error("Generate error:", error);
    return NextResponse.json(
      { error: "Failed to generate component" },
      { status: 500 }
    );
  }
}
