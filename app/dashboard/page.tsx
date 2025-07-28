"use client"

import { useEffect, useState } from "react"
import { useMinimalSupabaseAuth } from "@/components/minimal-supabase-auth-provider"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Plus,
  Code,
  Calendar,
  Search,
  LogOut,
  Settings,
  User,
  Bell,
  Filter,
  Grid,
  List,
  Sparkles,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

interface Session {
  _id: string
  sessionName: string
  lastModified: string
  chatHistory: any[]
  generatedCode: {
    jsx: string
    css: string
  }
  tags?: string[]
  isStarred?: boolean
}

export default function DashboardPage() {
  const { user, logout, loading } = useMinimalSupabaseAuth()
  const router = useRouter()
  const [sessions, setSessions] = useState<Session[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loadingSessions, setLoadingSessions] = useState(true)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [filterBy, setFilterBy] = useState<"all" | "recent" | "starred">("all")

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
      return
    }
    if (user) {
      fetchSessions()
    }
  }, [user, loading, router])

  const fetchSessions = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch("/api/sessions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (response.ok) {
        const data = await response.json()
        setSessions(data.sessions)
      }
    } catch (error) {
      console.error("Failed to fetch sessions:", error)
    } finally {
      setLoadingSessions(false)
    }
  }

  const createNewSession = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch("/api/sessions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionName: `New Session ${sessions.length + 1}`,
        }),
      })

      if (response.ok) {
        const responseData = await response.json()
        router.push(`/session/${responseData.session._id}`)
      }
    } catch (error) {
      console.error("Failed to create session:", error)
    }
  }

  const filteredSessions = sessions.filter((session) => {
    const matchesSearch = session.sessionName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter =
      filterBy === "all" ||
      (filterBy === "recent" && new Date(session.lastModified) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) ||
      (filterBy === "starred" && session.isStarred)

    return matchesSearch && matchesFilter
  })

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  if (loading || loadingSessions) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="spinner h-12 w-12 mx-auto mb-4"></div>
          <p className="text-lg">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-3"
          >
            <div className="relative">
              <Code className="h-8 w-8 text-blue-600" />
              <Sparkles className="h-4 w-4 text-yellow-500 absolute -top-1 -right-1" />
            </div>
            <h1 className="text-2xl font-bold gradient-text">ComponentGen Pro</h1>
          </motion.div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name || user?.email} />
                    <AvatarFallback className="bg-blue-600 text-white">
                      {getInitials(user?.name || user?.email || "U")}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">{user?.name || "User"}</p>
                    <p className="w-[200px] truncate text-sm text-muted-foreground">{user?.email}</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name?.split(" ")[0] || "Developer"}! 👋</h1>
              <p className="text-gray-600 dark:text-gray-300">Ready to create some amazing components today?</p>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="px-3 py-1">
                <TrendingUp className="h-4 w-4 mr-1" />
                {sessions.length} Sessions
              </Badge>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="card-hover">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Sessions</p>
                    <p className="text-2xl font-bold">{sessions.length}</p>
                  </div>
                  <Code className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card className="card-hover">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Components Generated</p>
                    <p className="text-2xl font-bold">{sessions.filter((s) => s.generatedCode.jsx).length}</p>
                  </div>
                  <Sparkles className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
            <Card className="card-hover">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">This Week</p>
                    <p className="text-2xl font-bold">
                      {
                        sessions.filter(
                          (s) => new Date(s.lastModified) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
                        ).length
                      }
                    </p>
                  </div>
                  <Calendar className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            <Card className="card-hover">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg. Messages</p>
                    <p className="text-2xl font-bold">
                      {sessions.length > 0
                        ? Math.round(sessions.reduce((acc, s) => acc + s.chatHistory.length, 0) / sessions.length)
                        : 0}
                    </p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Actions Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col sm:flex-row gap-4 mb-8"
        >
          <Button onClick={createNewSession} className="btn-hover-lift">
            <Plus className="h-4 w-4 mr-2" />
            New Session
          </Button>

          <div className="flex-1 flex items-center space-x-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search sessions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  {filterBy === "all" ? "All" : filterBy === "recent" ? "Recent" : "Starred"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setFilterBy("all")}>All Sessions</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterBy("recent")}>Recent (7 days)</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterBy("starred")}>Starred</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="flex border rounded-lg">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="rounded-r-none"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="rounded-l-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Sessions Grid/List */}
        {filteredSessions.length === 0 ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="text-center py-16">
              <CardContent>
                <div className="relative mb-6">
                  <Code className="h-20 w-20 text-gray-400 mx-auto" />
                  <Sparkles className="h-8 w-8 text-yellow-500 absolute top-0 right-1/2 transform translate-x-6" />
                </div>
                <h3 className="text-2xl font-semibold mb-2">{searchTerm ? "No sessions found" : "No sessions yet"}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
                  {searchTerm
                    ? `No sessions match "${searchTerm}". Try a different search term.`
                    : "Create your first session to start generating components with AI"}
                </p>
                {!searchTerm && (
                  <Button onClick={createNewSession} size="lg" className="btn-hover-lift">
                    <Plus className="h-5 w-5 mr-2" />
                    Create Your First Session
                  </Button>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={viewMode === "grid" ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}
          >
            {filteredSessions.map((session, index) => (
              <motion.div
                key={session._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
              >
                <Card className="card-hover cursor-pointer group">
                  <Link href={`/session/${session._id}`}>
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg truncate group-hover:text-blue-600 transition-colors">
                          {session.sessionName}
                        </CardTitle>
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary" className="text-xs">
                            {session.chatHistory.length} msgs
                          </Badge>
                          {session.isStarred && (
                            <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                              ⭐
                            </Badge>
                          )}
                        </div>
                      </div>
                      <CardDescription className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(session.lastModified).toLocaleDateString()}</span>
                        <span className="text-xs">{new Date(session.lastModified).toLocaleTimeString()}</span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {session.generatedCode.jsx ? (
                        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 text-sm font-mono">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs text-gray-500 uppercase tracking-wide">Generated Code</span>
                            <Badge variant="outline" className="text-xs">
                              JSX
                            </Badge>
                          </div>
                          <code className="text-gray-800 dark:text-gray-200 line-clamp-3">
                            {session.generatedCode.jsx.substring(0, 120)}
                            {session.generatedCode.jsx.length > 120 && "..."}
                          </code>
                        </div>
                      ) : (
                        <div className="text-center py-8 text-gray-500 italic">
                          <Code className="h-8 w-8 mx-auto mb-2 opacity-50" />
                          <p>No code generated yet</p>
                        </div>
                      )}

                      {session.tags && session.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-3">
                          {session.tags.slice(0, 3).map((tag, tagIndex) => (
                            <Badge key={tagIndex} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {session.tags.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{session.tags.length - 3}
                            </Badge>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Link>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}
