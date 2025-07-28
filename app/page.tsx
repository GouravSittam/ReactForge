"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code, Palette, Zap, Users, ArrowRight, Star, Github, Play, Sparkles } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

const features = [
  {
    icon: Zap,
    title: "AI-Powered Generation",
    description: "Generate components instantly with natural language prompts using advanced AI",
    color: "text-blue-600",
    bgColor: "bg-blue-100 dark:bg-blue-900/20",
  },
  {
    icon: Code,
    title: "Live Preview",
    description: "See your components come to life with real-time preview and hot reload",
    color: "text-green-600",
    bgColor: "bg-green-100 dark:bg-green-900/20",
  },
  {
    icon: Palette,
    title: "Interactive Editor",
    description: "Fine-tune your components with our intuitive property editor and code editor",
    color: "text-purple-600",
    bgColor: "bg-purple-100 dark:bg-purple-900/20",
  },
  {
    icon: Users,
    title: "Session Management",
    description: "Auto-save your work and resume from anywhere with persistent sessions",
    color: "text-orange-600",
    bgColor: "bg-orange-100 dark:bg-orange-900/20",
  },
]

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Frontend Developer",
    content: "ComponentGen Pro has revolutionized my workflow. I can prototype components in minutes!",
    avatar: "/placeholder.svg?height=40&width=40&text=SC",
  },
  {
    name: "Mike Johnson",
    role: "UI/UX Designer",
    content: "The AI understands design patterns perfectly. It's like having a senior developer as a pair programmer.",
    avatar: "/placeholder.svg?height=40&width=40&text=MJ",
  },
  {
    name: "Alex Rodriguez",
    role: "Tech Lead",
    content: "Our team's productivity increased by 300% since we started using ComponentGen Pro.",
    avatar: "/placeholder.svg?height=40&width=40&text=AR",
  },
]

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm dark:bg-gray-900/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2"
          >
            <div className="relative">
              <Code className="h-8 w-8 text-blue-600" />
              <Sparkles className="h-4 w-4 text-yellow-500 absolute -top-1 -right-1" />
            </div>
            <h1 className="text-2xl font-bold gradient-text">ComponentGen Pro</h1>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-x-4">
            <Link href="/login">
              <Button variant="ghost" className="btn-hover-lift">
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button className="btn-hover-lift">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <Badge variant="secondary" className="mb-6 px-4 py-2">
            <Star className="h-4 w-4 mr-2" />
            Powered by Advanced AI
          </Badge>
          <h1 className="text-6xl font-bold mb-6 gradient-text leading-tight">AI-Driven React Component Playground</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
            Generate, customize, and export beautiful React components with the power of AI. Build faster, iterate
            smarter, and create stunning UIs effortlessly with our advanced component generation platform.
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="space-x-4 mb-12"
          >
            <Link href="/register">
              <Button size="lg" className="px-8 py-4 text-lg btn-hover-lift">
                <Play className="mr-2 h-5 w-5" />
                Start Creating
              </Button>
            </Link>
            <Link href="https://github.com/GouravSittam/ReactForge">
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-4 text-lg btn-hover-lift glass-effect bg-transparent"
              >
                <Github className="mr-2 h-5 w-5" />
                View Demo
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">10K+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Components Generated</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">500+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Active Developers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">99.9%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Uptime</div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
            Everything you need to generate, customize, and export professional React components
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
            >
              <Card className="text-center hover:shadow-xl transition-all duration-300 card-hover border-0 shadow-lg">
                <CardHeader>
                  <div
                    className={`h-16 w-16 ${feature.bgColor} rounded-2xl mx-auto mb-4 flex items-center justify-center`}
                  >
                    <feature.icon className={`h-8 w-8 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-50 dark:bg-gray-800/50 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Loved by Developers</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
              See what developers are saying about ComponentGen Pro
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
              >
                <Card className="card-hover border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <img
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={testimonial.name}
                        className="h-12 w-12 rounded-full mr-4"
                      />
                      <div>
                        <div className="font-semibold">{testimonial.name}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</div>
                      </div>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 italic">"{testimonial.content}"</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="container mx-auto px-4 text-center"
        >
          <h2 className="text-4xl font-bold mb-4">Ready to Build Amazing Components?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of developers who are already creating with ComponentGen Pro. Start your free trial today!
          </p>
          <Link href="/register">
            <Button size="lg" variant="secondary" className="px-8 py-4 text-lg btn-hover-lift">
              <Sparkles className="mr-2 h-5 w-5" />
              Start Your Free Trial
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white dark:bg-gray-900 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Code className="h-6 w-6 text-blue-600" />
                <span className="text-lg font-bold">ComponentGen Pro</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                The most advanced AI-powered React component generator.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>
                  <Link href="/features" className="hover:text-blue-600">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-blue-600">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/demo" className="hover:text-blue-600">
                    Demo
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>
                  <Link href="/docs" className="hover:text-blue-600">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/help" className="hover:text-blue-600">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-blue-600">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-blue-600">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-blue-600">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="hover:text-blue-600">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-gray-600 dark:text-gray-400">
            <p>&copy; 2024 ComponentGen Pro. Built with Next.js and AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
