"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Download, Code, Palette } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface CodeEditorProps {
  jsx: string
  css: string
  onChange: (jsx: string, css: string) => void
}

export function CodeEditor({ jsx, css, onChange }: CodeEditorProps) {
  const [jsxCode, setJsxCode] = useState(jsx)
  const [cssCode, setCssCode] = useState(css)
  const { toast } = useToast()

  useEffect(() => {
    setJsxCode(jsx)
  }, [jsx])

  useEffect(() => {
    setCssCode(css)
  }, [css])

  const handleJsxChange = (value: string) => {
    setJsxCode(value)
    onChange(value, cssCode)
  }

  const handleCssChange = (value: string) => {
    setCssCode(value)
    onChange(jsxCode, value)
  }

  const handleCopy = async (code: string, type: string) => {
    try {
      await navigator.clipboard.writeText(code)
      toast({
        title: `${type} copied!`,
        description: `${type} code has been copied to clipboard.`,
      })
    } catch (error) {
      toast({
        title: "Failed to copy",
        description: "Could not copy code to clipboard.",
        variant: "destructive",
      })
    }
  }

  const handleDownload = (code: string, filename: string) => {
    const blob = new Blob([code], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "File downloaded!",
      description: `${filename} has been downloaded.`,
    })
  }

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-800 border-t">
      <Tabs defaultValue="jsx" className="h-full flex flex-col">
        <div className="p-2 sm:p-4 border-b flex justify-between items-center">
          <TabsList className="w-full sm:w-auto">
            <TabsTrigger value="jsx" className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm">
              <Code className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>JSX</span>
            </TabsTrigger>
            <TabsTrigger value="css" className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm">
              <Palette className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>CSS</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="jsx" className="flex-1 m-0">
          <div className="h-full flex flex-col">
            <div className="p-2 border-b flex justify-end space-x-1 sm:space-x-2">
              <Button variant="outline" size="sm" onClick={() => handleCopy(jsxCode, "JSX")} className="h-7 w-7 sm:h-8 sm:w-8 p-0">
                <Copy className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleDownload(jsxCode, "component.jsx")} className="h-7 w-7 sm:h-8 sm:w-8 p-0">
                <Download className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </div>
            <div className="flex-1 p-2 sm:p-4">
              <textarea
                value={jsxCode}
                onChange={(e) => handleJsxChange(e.target.value)}
                className="w-full h-full font-mono text-xs sm:text-sm bg-gray-50 dark:bg-gray-900 border rounded p-2 sm:p-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="JSX code will appear here..."
                spellCheck={false}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="css" className="flex-1 m-0">
          <div className="h-full flex flex-col">
            <div className="p-2 border-b flex justify-end space-x-1 sm:space-x-2">
              <Button variant="outline" size="sm" onClick={() => handleCopy(cssCode, "CSS")} className="h-7 w-7 sm:h-8 sm:w-8 p-0">
                <Copy className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleDownload(cssCode, "styles.css")} className="h-7 w-7 sm:h-8 sm:w-8 p-0">
                <Download className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </div>
            <div className="flex-1 p-2 sm:p-4">
              <textarea
                value={cssCode}
                onChange={(e) => handleCssChange(e.target.value)}
                className="w-full h-full font-mono text-xs sm:text-sm bg-gray-50 dark:bg-gray-900 border rounded p-2 sm:p-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="CSS styles will appear here..."
                spellCheck={false}
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
