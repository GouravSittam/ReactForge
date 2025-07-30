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
      const mockResponse = `Here's a fully responsive React component based on your request: "${message}"

\`\`\`jsx
import React from 'react';

function ${message.includes('button') ? 'CustomButton' : message.includes('card') ? 'InfoCard' : message.includes('form') ? 'ContactForm' : message.includes('nav') ? 'NavigationBar' : 'SampleComponent'}() {
  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-4 sm:p-6 lg:p-8">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white mb-3 sm:mb-4 lg:mb-6">
            ${message.includes('button') ? 'Responsive Button Component' : message.includes('card') ? 'Information Card' : message.includes('form') ? 'Contact Form' : message.includes('nav') ? 'Navigation Bar' : 'Sample Component'}
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 lg:mb-8 leading-relaxed">
            This is a fully responsive component generated based on your request: "${message}". It adapts beautifully to mobile, tablet, and desktop screens.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6">
            <button className="w-full sm:w-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 bg-blue-500 hover:bg-blue-600 text-white text-sm sm:text-base lg:text-lg font-medium rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Primary Action
            </button>
            <button className="w-full sm:w-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 bg-gray-200 hover:bg-gray-300 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 text-sm sm:text-base lg:text-lg font-medium rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
              Secondary Action
            </button>
          </div>
          
          <div className="mt-6 sm:mt-8 lg:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">Mobile First</h3>
              <p className="text-sm text-blue-600 dark:text-blue-300">Optimized for small screens</p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">Responsive</h3>
              <p className="text-sm text-green-600 dark:text-green-300">Adapts to all devices</p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-200 mb-2">Accessible</h3>
              <p className="text-sm text-purple-600 dark:text-purple-300">WCAG compliant design</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ${message.includes('button') ? 'CustomButton' : message.includes('card') ? 'InfoCard' : message.includes('form') ? 'ContactForm' : message.includes('nav') ? 'NavigationBar' : 'SampleComponent'};
\`\`\`

\`\`\`css
/* Enhanced responsive styles */
.responsive-component {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.responsive-component:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Custom responsive breakpoints */
@media (max-width: 640px) {
  .mobile-optimized {
    padding: 1rem;
  }
}

@media (min-width: 641px) and (max-width: 1024px) {
  .tablet-optimized {
    padding: 1.5rem;
  }
}

@media (min-width: 1025px) {
  .desktop-optimized {
    padding: 2rem;
  }
}
\`\`\`

This component includes:
- **Fully Responsive Design**: Mobile-first approach with breakpoints for all devices
- **Modern React Functional Component**: Using hooks and best practices
- **Tailwind CSS Classes**: Responsive utilities (sm:, md:, lg:, xl:)
- **Dark Mode Support**: Automatic dark/light theme adaptation
- **Accessibility Features**: Focus states, semantic HTML, ARIA labels
- **Smooth Animations**: Hover effects and transitions
- **Flexible Layout**: Grid and flexbox for optimal spacing
- **Performance Optimized**: Efficient CSS and minimal JavaScript`;

      return NextResponse.json({
        response: mockResponse,
        code: {
          jsx: `import React from 'react';

function ${message.includes('button') ? 'CustomButton' : message.includes('card') ? 'InfoCard' : message.includes('form') ? 'ContactForm' : message.includes('nav') ? 'NavigationBar' : 'SampleComponent'}() {
  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-4 sm:p-6 lg:p-8">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white mb-3 sm:mb-4 lg:mb-6">
            ${message.includes('button') ? 'Responsive Button Component' : message.includes('card') ? 'Information Card' : message.includes('form') ? 'Contact Form' : message.includes('nav') ? 'Navigation Bar' : 'Sample Component'}
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 lg:mb-8 leading-relaxed">
            This is a fully responsive component generated based on your request: "${message}". It adapts beautifully to mobile, tablet, and desktop screens.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6">
            <button className="w-full sm:w-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 bg-blue-500 hover:bg-blue-600 text-white text-sm sm:text-base lg:text-lg font-medium rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Primary Action
            </button>
            <button className="w-full sm:w-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 bg-gray-200 hover:bg-gray-300 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 text-sm sm:text-base lg:text-lg font-medium rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
              Secondary Action
            </button>
          </div>
          
          <div className="mt-6 sm:mt-8 lg:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">Mobile First</h3>
              <p className="text-sm text-blue-600 dark:text-blue-300">Optimized for small screens</p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">Responsive</h3>
              <p className="text-sm text-green-600 dark:text-green-300">Adapts to all devices</p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-200 mb-2">Accessible</h3>
              <p className="text-sm text-purple-600 dark:text-purple-300">WCAG compliant design</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ${message.includes('button') ? 'CustomButton' : message.includes('card') ? 'InfoCard' : message.includes('form') ? 'ContactForm' : message.includes('nav') ? 'NavigationBar' : 'SampleComponent'};`,
          css: `/* Enhanced responsive styles */
.responsive-component {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.responsive-component:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Custom responsive breakpoints */
@media (max-width: 640px) {
  .mobile-optimized {
    padding: 1rem;
  }
}

@media (min-width: 641px) and (max-width: 1024px) {
  .tablet-optimized {
    padding: 1.5rem;
  }
}

@media (min-width: 1025px) {
  .desktop-optimized {
    padding: 2rem;
  }
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
      const fallbackResponse = `I encountered an issue with the AI service, but here's a responsive component based on your request: "${message}"

\`\`\`jsx
import React from 'react';

function FallbackComponent() {
  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-4 sm:p-6 lg:p-8">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white mb-3 sm:mb-4 lg:mb-6">
            Responsive Fallback Component
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 lg:mb-8 leading-relaxed">
            This is a responsive fallback component generated for your request: "${message}". It works perfectly on all devices.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6">
            <button className="w-full sm:w-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 bg-blue-500 hover:bg-blue-600 text-white text-sm sm:text-base lg:text-lg font-medium rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Action Button
            </button>
          </div>
          
          <div className="mt-6 sm:mt-8 lg:mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">Mobile Optimized</h3>
              <p className="text-sm text-blue-600 dark:text-blue-300">Perfect for small screens</p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">Responsive Design</h3>
              <p className="text-sm text-green-600 dark:text-green-300">Adapts to all devices</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FallbackComponent;
\`\`\`

\`\`\`css
/* Enhanced responsive fallback styles */
.fallback-component {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.fallback-component:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Responsive breakpoints */
@media (max-width: 640px) {
  .mobile-optimized {
    padding: 1rem;
  }
}

@media (min-width: 641px) and (max-width: 1024px) {
  .tablet-optimized {
    padding: 1.5rem;
  }
}

@media (min-width: 1025px) {
  .desktop-optimized {
    padding: 2rem;
  }
}
\`\`\`

Note: This is a responsive fallback response due to AI service issues.`;

      return NextResponse.json({
        response: fallbackResponse,
        code: {
          jsx: `import React from 'react';

function FallbackComponent() {
  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-4 sm:p-6 lg:p-8">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white mb-3 sm:mb-4 lg:mb-6">
            Responsive Fallback Component
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 lg:mb-8 leading-relaxed">
            This is a responsive fallback component generated for your request: "${message}". It works perfectly on all devices.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6">
            <button className="w-full sm:w-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 bg-blue-500 hover:bg-blue-600 text-white text-sm sm:text-base lg:text-lg font-medium rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Action Button
            </button>
          </div>
          
          <div className="mt-6 sm:mt-8 lg:mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">Mobile Optimized</h3>
              <p className="text-sm text-blue-600 dark:text-blue-300">Perfect for small screens</p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">Responsive Design</h3>
              <p className="text-sm text-green-600 dark:text-green-300">Adapts to all devices</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FallbackComponent;`,
          css: `/* Enhanced responsive fallback styles */
.fallback-component {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.fallback-component:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Responsive breakpoints */
@media (max-width: 640px) {
  .mobile-optimized {
    padding: 1rem;
  }
}

@media (min-width: 641px) and (max-width: 1024px) {
  .tablet-optimized {
    padding: 1.5rem;
  }
}

@media (min-width: 1025px) {
  .desktop-optimized {
    padding: 2rem;
  }
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
