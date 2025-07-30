"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { RefreshCw, Download, Copy, ExternalLink } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ComponentPreviewProps {
  code: string
  css?: string
}

export function ComponentPreview({ code, css }: ComponentPreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()



  const createPreviewHTML = (jsx: string, styles = "") => {
    // Clean up the JSX code for browser environment
    let cleanJsx = jsx
      .replace(/import\s+.*?from\s+['"][^'"]*['"];?\s*/g, '') // Remove imports
      .replace(/export\s+default\s+/g, '') // Remove export default
      .replace(/export\s+{.*?};?\s*/g, '') // Remove named exports
      .trim()

    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Component Preview</title>
  <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body {
      margin: 0;
      padding: 20px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
      background: white;
    }
    ${styles}
  </style>
</head>
<body>
  <div id="root"></div>
  <script type="text/babel">
    const { useState, useEffect, useRef } = React;
    
    ${cleanJsx}
    
    // Try to find and render the component
    const componentNames = Object.keys(window).filter(key => 
      typeof window[key] === 'function' && 
      key[0] === key[0].toUpperCase() &&
      key !== 'React' && 
      key !== 'ReactDOM' &&
      key !== 'useState' &&
      key !== 'useEffect' &&
      key !== 'useRef'
    );
    
    let ComponentToRender = null;
    
    // Look for exported component or use the last defined component
    if (typeof Component !== 'undefined') {
      ComponentToRender = Component;
    } else if (componentNames.length > 0) {
      ComponentToRender = window[componentNames[componentNames.length - 1]];
    }
    
    if (ComponentToRender) {
      const root = ReactDOM.createRoot(document.getElementById('root'));
      root.render(React.createElement(ComponentToRender));
    } else {
      document.getElementById('root').innerHTML = '<p style="color: #666; text-align: center; margin-top: 50px;">No component found to render. Available components: ' + componentNames.join(', ') + '</p>';
    }
  </script>
</body>
</html>
    `
  }

  const updatePreview = () => {
    if (!iframeRef.current || !code) return

    setIsLoading(true)
    const html = createPreviewHTML(code, css)
    const blob = new Blob([html], { type: "text/html" })
    const url = URL.createObjectURL(blob)

    iframeRef.current.src = url

    // Clean up the blob URL after iframe loads
    iframeRef.current.onload = () => {
      URL.revokeObjectURL(url)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    updatePreview()
  }, [code, css])

  const handleRefresh = () => {
    updatePreview()
  }

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(code)
      toast({
        title: "Code copied!",
        description: "Component code has been copied to clipboard.",
      })
    } catch (error) {
      toast({
        title: "Failed to copy",
        description: "Could not copy code to clipboard.",
        variant: "destructive",
      })
    }
  }

  const handleExport = () => {
    const fullCode = `${code}\n\n/* Styles */\n${css || ""}`
    const blob = new Blob([fullCode], { type: "text/javascript" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "component.jsx"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "Component exported!",
      description: "Component has been downloaded as component.jsx",
    })
  }

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-800">
      {/* Header */}
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="font-semibold text-lg">Component Preview</h2>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={handleRefresh}>
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={handleCopyCode}>
            <Copy className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Preview Area */}
      <div className="flex-1 p-4">
        {code ? (
          <Card className="h-full component-preview relative overflow-hidden">
            {isLoading && (
              <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                  <p className="text-sm text-gray-600">Rendering component...</p>
                </div>
              </div>
            )}
            <iframe
              ref={iframeRef}
              className="w-full h-full border-0"
              title="Component Preview"
              sandbox="allow-scripts allow-same-origin"
            />
          </Card>
        ) : (
          <Card className="h-full flex items-center justify-center">
            <div className="text-center text-gray-500">
              <ExternalLink className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium mb-2">No component to preview</p>
              <p className="text-sm">Start a conversation with the AI to generate a component</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
