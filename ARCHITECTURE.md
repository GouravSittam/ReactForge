# 🏗️ ReactForge Architecture Documentation

## System Overview

ReactForge is a modern, AI-driven React component generation platform built with Next.js 14, featuring real-time component creation, user authentication, and cloud-based data persistence.

## 🏛️ High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        ReactForge Platform                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────┐    ┌─────────────────┐    ┌──────────────┐ │
│  │   Frontend      │    │   Backend       │    │   External   │ │
│  │   (Next.js)     │◄──►│   (API Routes)  │◄──►│   Services   │ │
│  └─────────────────┘    └─────────────────┘    └──────────────┘ │
│           │                       │                       │     │
│           ▼                       ▼                       ▼     │
│  ┌─────────────────┐    ┌─────────────────┐    ┌──────────────┐ │
│  │   UI Components │    │   Authentication│    │   Google AI  │ │
│  │   (Shadcn/UI)   │    │   (Supabase)    │    │   (Gemini)   │ │
│  └─────────────────┘    └─────────────────┘    └──────────────┘ │
│           │                       │                       │     │
│           ▼                       ▼                       ▼     │
│  ┌─────────────────┐    ┌─────────────────┐    ┌──────────────┐ │
│  │   State Mgmt    │    │   Database      │    │   File Storage│ │
│  │   (Zustand)     │    │   (Supabase)    │    │   (Local)    │ │
│  └─────────────────┘    └─────────────────┘    └──────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

## 🧩 Component Architecture

### Frontend Layer (Next.js 14 App Router)

```
app/
├── layout.tsx                 # Root layout with providers
├── page.tsx                   # Landing page with new components
├── dashboard/                 # Main application dashboard
│   ├── page.tsx              # Dashboard interface
│   └── loading.tsx           # Loading states
├── session/[id]/             # Component session pages
│   └── page.tsx              # Individual session view
├── auth/                     # Authentication pages
│   ├── callback/             # OAuth callback handling
│   └── login/                # Login interface
├── register/                 # User registration
└── api/                      # API routes
    ├── generate/             # AI component generation
    ├── sessions/             # Session management
    └── auth/                 # Authentication endpoints
```

### Component Library (Shadcn/UI)

```
components/
├── ui/                       # Base UI components
│   ├── button.tsx           # Reusable button component
│   ├── card.tsx             # Card layout component
│   ├── input.tsx            # Form input component
│   └── ...                  # 50+ other UI components
├── auth-provider.tsx         # Authentication context
├── session-provider.tsx      # Session management
├── theme-provider.tsx        # Theme management
└── error-boundary.tsx        # Error handling
```

## 🔐 Authentication Architecture

### Supabase Authentication Flow

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   User      │    │  Frontend   │    │  Supabase   │    │  Database   │
│  Browser    │    │  (Next.js)  │    │   Auth      │    │  (PostgreSQL)│
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
       │                   │                   │                   │
       │ 1. Login Request  │                   │                   │
       │──────────────────►│                   │                   │
       │                   │ 2. Auth Request   │                   │
       │                   │──────────────────►│                   │
       │                   │                   │ 3. Verify User   │
       │                   │                   │──────────────────►│
       │                   │                   │ 4. JWT Token     │
       │                   │◄──────────────────│                   │
       │ 5. Session Token  │                   │                   │
       │◄──────────────────│                   │                   │
       │                   │                   │                   │
```

### Authentication Providers

- **SupabaseAuthProvider**: Full-featured authentication with profile management
- **SimpleSupabaseAuthProvider**: Simplified auth with basic user data
- **MinimalSupabaseAuthProvider**: Minimal auth with localStorage fallback
- **AuthProvider**: Legacy custom authentication system

## 🤖 AI Component Generation Architecture

### Google AI Integration Flow

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   User      │    │  Frontend   │    │  API Route  │    │  Google AI  │
│  Interface  │    │  (React)    │    │  (/api/generate)│  (Gemini)   │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
       │                   │                   │                   │
       │ 1. Component      │                   │                   │
       │    Request        │                   │                   │
       │──────────────────►│                   │                   │
       │                   │ 2. API Call       │                   │
       │                   │──────────────────►│                   │
       │                   │                   │ 3. AI Request    │
       │                   │                   │──────────────────►│
       │                   │                   │ 4. Generated     │
       │                   │                   │    Component     │
       │                   │◄──────────────────│                   │
       │ 5. Component      │                   │                   │
       │    Response       │                   │                   │
       │◄──────────────────│                   │                   │
       │                   │                   │                   │
```

### AI Prompt Engineering

The system uses sophisticated prompt engineering to generate React components:

```typescript
const generateComponentPrompt = (
  userPrompt: string,
  chatHistory: any[],
  currentCode: string
) => {
  // Context from previous conversations
  const historyContext = chatHistory
    .slice(-5)
    .map((msg) => `${msg.role}: ${msg.content}`)
    .join("\n");

  return `You are an expert React developer. Generate clean, modern React components.
  
  Previous Context: ${historyContext}
  Current Code: ${currentCode}
  User Request: ${userPrompt}
  
  Requirements:
  - Use modern React hooks (useState, useEffect, etc.)
  - Include Tailwind CSS classes for styling
  - Ensure accessibility (ARIA labels, semantic HTML)
  - Make it responsive and mobile-friendly
  - Use TypeScript when beneficial
  - Follow React best practices`;
};
```

## 🗄️ Database Architecture

### Supabase Database Schema

```sql
-- User Profiles Table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  avatar TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Component Sessions Table
CREATE TABLE sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  session_name TEXT NOT NULL,
  last_modified TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  chat_history JSONB DEFAULT '[]',
  generated_code JSONB DEFAULT '{"jsx": "", "css": ""}',
  component_properties JSONB DEFAULT '[]',
  tags TEXT[],
  is_starred BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Row Level Security (RLS)

```sql
-- Users can only access their own data
CREATE POLICY "Users can view own sessions" ON sessions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own sessions" ON sessions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own sessions" ON sessions
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own sessions" ON sessions
  FOR DELETE USING (auth.uid() = user_id);
```

## 🔄 State Management Architecture

### Zustand Store Structure

```typescript
interface SessionStore {
  // Session Management
  sessions: Session[]
  currentSession: Session | null
  isLoading: boolean
  
  // Actions
  createSession: (name: string) => Promise<void>
  updateSession: (id: string, updates: Partial<Session>) => Promise<void>
  deleteSession: (id: string) => Promise<void>
  loadSessions: () => Promise<void>
  
  // Chat Management
  addMessage: (message: ChatMessage) => void
  clearChat: () => void
  
  // Component Management
  updateGeneratedCode: (code: GeneratedCode) => void
  updateProperties: (properties: ComponentProperty[]) => void
}
```

## 🎨 UI/UX Architecture

### Design System

- **Framework**: Tailwind CSS with custom design tokens
- **Component Library**: Shadcn/UI with Radix UI primitives
- **Icons**: Lucide React icon library
- **Animations**: Framer Motion for smooth interactions
- **Theme**: Dark/Light mode support with next-themes

### Responsive Design

```css
/* Mobile-first responsive design */
.container {
  @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
}

/* Breakpoint system */
sm: 640px   /* Small devices */
md: 768px   /* Medium devices */
lg: 1024px  /* Large devices */
xl: 1280px  /* Extra large devices */
2xl: 1536px /* 2X large devices */
```

## 🔧 API Architecture

### RESTful API Endpoints

```
/api/
├── generate/          # POST - Generate components with AI
├── sessions/          # CRUD operations for sessions
│   ├── GET           # List user sessions
│   ├── POST          # Create new session
│   └── [id]/
│       ├── GET       # Get specific session
│       ├── PUT       # Update session
│       └── DELETE    # Delete session
└── auth/             # Authentication endpoints
    ├── login         # User login
    ├── register      # User registration
    └── verify        # Token verification
```

### API Response Format

```typescript
interface APIResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

interface GenerateResponse {
  response: string
  code: {
    jsx: string
    css: string
  }
}
```

## 🚀 Deployment Architecture

### Production Stack

```
┌─────────────────────────────────────────────────────────────────┐
│                        Production Environment                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────┐    ┌─────────────────┐    ┌──────────────┐ │
│  │   CDN/Edge      │    │   Application   │    │   Database   │ │
│  │   (Vercel)      │◄──►│   (Next.js)     │◄──►│  (Supabase)  │ │
│  └─────────────────┘    └─────────────────┘    └──────────────┘ │
│           │                       │                       │     │
│           ▼                       ▼                       ▼     │
│  ┌─────────────────┐    ┌─────────────────┐    ┌──────────────┐ │
│  │   Static Assets │    │   API Routes    │    │   File Storage│ │
│  │   (Images/CSS)  │    │   (Serverless)  │    │   (Supabase)  │ │
│  └─────────────────┘    └─────────────────┘    └──────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

### Environment Variables

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# AI Configuration
GOOGLE_API_KEY=your-google-ai-key

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/reactforge

# Authentication
JWT_SECRET=your-jwt-secret
```

## 🔒 Security Architecture

### Security Layers

1. **Authentication**: Supabase JWT-based authentication
2. **Authorization**: Row Level Security (RLS) policies
3. **Data Validation**: Zod schema validation
4. **Input Sanitization**: Automatic XSS protection
5. **CORS**: Configured for production domains
6. **Rate Limiting**: API route protection

### Security Best Practices

- Environment variables for sensitive data
- HTTPS-only in production
- Content Security Policy (CSP) headers
- Regular dependency updates
- Input validation and sanitization
- Secure session management

## 📊 Performance Architecture

### Optimization Strategies

1. **Static Generation**: Pre-rendered pages where possible
2. **Code Splitting**: Automatic Next.js code splitting
3. **Image Optimization**: Next.js Image component
4. **Caching**: CDN and browser caching strategies
5. **Bundle Optimization**: Tree shaking and minification
6. **Lazy Loading**: Component and route lazy loading

### Performance Metrics

- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

## 🔄 Data Flow Architecture

### Component Generation Flow

```
1. User Input → 2. Frontend Validation → 3. API Request → 4. AI Processing
     ↓                    ↓                    ↓              ↓
8. UI Update ← 7. Response Processing ← 6. Database Save ← 5. Code Generation
```

### Session Management Flow

```
1. User Action → 2. State Update → 3. API Call → 4. Database Operation
     ↓                ↓              ↓            ↓
8. UI Refresh ← 7. Success Response ← 6. Data Validation ← 5. RLS Check
```

## 🛠️ Development Architecture

### Development Workflow

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Local     │    │   Git       │    │   CI/CD     │    │   Production│
│ Development │───►│ Repository  │───►│ Pipeline    │───►│ Deployment  │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
```

### Development Tools

- **TypeScript**: Type safety and developer experience
- **ESLint**: Code quality and consistency
- **Prettier**: Code formatting
- **Husky**: Git hooks for quality assurance
- **Jest**: Unit testing framework
- **Cypress**: End-to-end testing

## 📈 Scalability Architecture

### Horizontal Scaling

- **Stateless API**: Serverless functions scale automatically
- **Database**: Supabase handles scaling automatically
- **CDN**: Global content delivery network
- **Caching**: Multi-layer caching strategy

### Vertical Scaling

- **Memory Optimization**: Efficient state management
- **Bundle Size**: Code splitting and tree shaking
- **Database Queries**: Optimized queries with indexes
- **Asset Optimization**: Compressed images and assets

## 🔍 Monitoring & Analytics

### Application Monitoring

- **Error Tracking**: Automatic error reporting
- **Performance Monitoring**: Core Web Vitals tracking
- **User Analytics**: Usage patterns and behavior
- **Database Monitoring**: Query performance and health

### Health Checks

- **API Endpoints**: Regular health check endpoints
- **Database Connectivity**: Connection pool monitoring
- **External Services**: AI service availability checks
- **Uptime Monitoring**: Service availability tracking

---

*This architecture documentation provides a comprehensive overview of the ReactForge platform's technical implementation, security measures, and scalability considerations.* 