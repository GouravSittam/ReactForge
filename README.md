# 🚀 ReactForge

<div align="center">

![ReactForge Logo](https://img.shields.io/badge/ReactForge-AI%20Powered%20React%20Components-blue?style=for-the-badge&logo=react)
![Next.js](https://img.shields.io/badge/Next.js-14.2.16-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)
![Bun](https://img.shields.io/badge/Bun-Fast%20JavaScript%20Runtime-black?style=for-the-badge&logo=bun)

**AI-Driven React Component Playground** - Generate, customize, and export beautiful responsive React components with the power of AI.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-View%20Project-green?style=for-the-badge)](https://reactforge.vercel.app)
[![GitHub Stars](https://img.shields.io/github/stars/GouravSittam/ReactForge?style=for-the-badge)](https://github.com/GouravSittam/ReactForge)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

</div>

---

## ✨ Features

### 🎨 **Modern UI Components**
- **Gradient Bar Hero Section** - Animated hero with dynamic gradient bars
- **Advanced Features Grid** - Interactive feature showcase with hover effects
- **Testimonial Slider** - Auto-playing testimonial carousel with drag support
- **CTA Section** - Engaging call-to-action with glow effects
- **Stacked Circular Footer** - Modern footer with newsletter signup

### 🤖 **AI-Powered Generation**
- **Smart Component Creation** - AI understands your requirements
- **Real-time Preview** - See changes instantly with responsive preview controls
- **Fully Responsive Components** - Mobile-first design that works on all devices
- **Customizable Templates** - Tailor components to your needs
- **Export Ready** - Production-ready code output

### 📱 **Responsive Design System**
- **Mobile-First Approach** - Optimized for phones, tablets, and desktops
- **Responsive Preview Controls** - Test components on different screen sizes
- **Adaptive Layouts** - Flexible grids and flexbox layouts
- **Dark Mode Support** - Automatic theme adaptation
- **Accessibility Features** - WCAG compliant with focus states and ARIA labels

### 🛠️ **Developer Experience**
- **TypeScript Support** - Full type safety
- **Bun Runtime** - Lightning-fast package management and development
- **Performance Optimized** - Fast loading and smooth animations
- **Hot Reload** - Instant feedback during development

### 🔐 **Authentication & Storage**
- **Supabase Integration** - Secure user authentication
- **Session Management** - Persistent user sessions
- **Cloud Sync** - Access your data anywhere
- **Local Storage Fallback** - Works offline

---

## 🎯 Quick Start

### Prerequisites
- **Bun Runtime** (Recommended) or Node.js 18+
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/GouravSittam/ReactForge.git

# Navigate to project directory
cd ReactForge

# Install dependencies with Bun (Recommended)
bun install

# Or with npm (Alternative)
npm install
# Or with yarn
yarn install
# Or with pnpm
pnpm install

# Set up environment variables
cp .env.example .env.local
```

### Environment Setup

Create a `.env.local` file with the following variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# AI Configuration
GOOGLE_API_KEY=your_google_ai_api_key

# Database
MONGODB_URI=mongodb://localhost:27017/reactforge

# JWT Secret
JWT_SECRET=your_jwt_secret
```

### Running the Application

```bash
# Development mode with Bun (Recommended)
bun dev

# Or with npm
npm run dev

# Build for production with Bun
bun run build

# Or with npm
npm run build

# Start production server with Bun
bun start

# Or with npm
npm start

# Lint code with Bun
bun run lint

# Or with npm
npm run lint
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

---

## 🏗️ Project Structure

```
ReactForge/
├── app/                          # Next.js 14 App Router
│   ├── api/                      # API routes
│   │   ├── generate/             # AI component generation
│   │   └── sessions/             # Session management
│   ├── dashboard/                # Dashboard pages
│   ├── login/                    # Authentication pages
│   ├── register/                 # Registration pages
│   ├── session/                  # Component editing sessions
│   └── page.tsx                  # Main landing page
├── components/                   # React components
│   ├── ui/                       # UI components (shadcn/ui)
│   ├── auth-provider.tsx         # Authentication context
│   ├── chat/                     # AI chat interface
│   ├── editor/                   # Code editor
│   ├── preview/                  # Responsive component preview
│   └── property-panel/           # Component customization
├── hooks/                        # Custom React hooks
├── lib/                          # Utility libraries
├── styles/                       # Global styles
└── public/                       # Static assets
```

---

## 🎨 Component Showcase

### AI-Generated Responsive Components
Every component generated by ReactForge is:
- **Mobile-First** - Optimized for small screens first
- **Fully Responsive** - Adapts to all device sizes
- **Accessible** - WCAG compliant with proper ARIA labels
- **Dark Mode Ready** - Automatic theme adaptation
- **Performance Optimized** - Efficient CSS and minimal JavaScript

### Responsive Preview Features
- **Multi-Device Testing** - Preview components on mobile, tablet, and desktop
- **Real-time Responsive Controls** - Toggle between screen sizes instantly
- **Live Component Rendering** - See changes in real-time
- **Export Options** - Download components as JSX/CSS files

### Hero Section
A stunning animated hero section with:
- Dynamic gradient bars
- Trust indicators
- Email signup form
- Responsive navigation

### Features Grid
Interactive feature showcase featuring:
- Customizable components
- Security features
- Lightning-fast generation
- Team collaboration tools

### Testimonial Slider
Auto-playing testimonial carousel with:
- Drag support
- Responsive design
- Smooth animations
- User avatars

### CTA Section
Engaging call-to-action with:
- Glow effects
- Staggered animations
- Clear messaging
- Action buttons

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Beautiful icons

### UI Components
- **shadcn/ui** - Modern component library
- **Radix UI** - Accessible component primitives
- **Class Variance Authority** - Component variant management

### Backend & Database
- **Supabase** - Backend-as-a-Service
- **MongoDB** - NoSQL database
- **Google AI** - AI component generation

### Authentication
- **Supabase Auth** - User authentication
- **JWT** - Token-based authentication
- **Local Storage** - Session persistence

### Package Management
- **Bun** - Fast JavaScript runtime and package manager
- **Alternative**: npm, yarn, or pnpm

---

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
bun add -g vercel

# Deploy
vercel

# Or connect your GitHub repository for automatic deployments
```

### Other Platforms

The application can be deployed to any platform that supports Next.js:
- **Netlify**
- **Railway**
- **DigitalOcean App Platform**
- **AWS Amplify**

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Install dependencies with Bun: `bun install`
4. Start development server: `bun dev`
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Code Style

- Use TypeScript for all new code
- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Ensure components are responsive and accessible

---

## 📚 Documentation

- [Environment Setup](ENVIRONMENT_SETUP.md)
- [Supabase Configuration](SUPABASE_SETUP.md)
- [Migration Guide](MIGRATION_GUIDE.md)
- [Bun Migration Guide](migrate-to-bun.md)
- [API Documentation](docs/API.md)

---

## 🎯 Roadmap

### Phase 1 - Core Features ✅
- [x] AI-powered component generation
- [x] Real-time responsive preview
- [x] User authentication
- [x] Component export
- [x] Mobile-first responsive design
- [x] Bun runtime integration

### Phase 2 - Enhanced Features 🚧
- [ ] Component marketplace
- [ ] Team collaboration
- [ ] Advanced customization
- [ ] Performance analytics
- [ ] More AI models support

### Phase 3 - Enterprise Features 📋
- [ ] White-label solutions
- [ ] Advanced AI models
- [ ] Enterprise integrations
- [ ] Custom branding
- [ ] Advanced responsive tools

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **shadcn/ui** - For the amazing component library
- **Vercel** - For the excellent Next.js framework
- **Supabase** - For the powerful backend services
- **Tailwind CSS** - For the utility-first CSS framework
- **Framer Motion** - For the smooth animations
- **Bun** - For the lightning-fast JavaScript runtime
- **[Gourav Chaudhary](https://gouravsittam.vercel.app)** - Project creator and developer

---

## 📞 Support

- **Documentation**: [docs.reactforge.dev](https://docs.reactforge.dev)
- **Issues**: [GitHub Issues](https://github.com/GouravSittam/ReactForge/issues)
- **Discussions**: [GitHub Discussions](https://github.com/GouravSittam/ReactForge/discussions)
- **Email**: [gouravsittam@gmail.com](mailto:gouravsittam@gmail.com)

---

<div align="center">

**Made with ❤️ by the ReactForge Team**

[![GitHub](https://img.shields.io/badge/GitHub-Follow%20us-black?style=for-the-badge&logo=github)](https://github.com/GouravSittam)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/gouravsittam/)
[![Facebook](https://img.shields.io/badge/Facebook-Follow%20us-blue?style=for-the-badge&logo=facebook)](https://www.facebook.com/profile.php?id=100011433522248)
[![Instagram](https://img.shields.io/badge/Instagram-Follow%20us-pink?style=for-the-badge&logo=instagram)](https://www.instagram.com/gouravv.c/)
[![Email](https://img.shields.io/badge/Email-Contact%20us-red?style=for-the-badge&logo=gmail)](mailto:gouravsittam@gmail.com)

</div>
