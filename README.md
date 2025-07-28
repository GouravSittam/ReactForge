# 🚀 ReactForge

<div align="center">

![ReactForge Logo](https://img.shields.io/badge/ReactForge-AI%20Powered%20React%20Components-blue?style=for-the-badge&logo=react)
![Next.js](https://img.shields.io/badge/Next.js-14.2.16-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)

**AI-Driven React Component Playground** - Generate, customize, and export beautiful React components with the power of AI.

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
- **Real-time Preview** - See changes instantly
- **Customizable Templates** - Tailor components to your needs
- **Export Ready** - Production-ready code output

### 🛠️ **Developer Experience**
- **TypeScript Support** - Full type safety
- **Responsive Design** - Works on all devices
- **Dark Mode** - Beautiful dark theme throughout
- **Performance Optimized** - Fast loading and smooth animations

### 🔐 **Authentication & Storage**
- **Supabase Integration** - Secure user authentication
- **Session Management** - Persistent user sessions
- **Cloud Sync** - Access your data anywhere
- **Local Storage Fallback** - Works offline

---

## 🎯 Quick Start

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/GouravSittam/ReactForge.git

# Navigate to project directory
cd ReactForge

# Install dependencies
npm install
# or
yarn install
# or
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
# Development mode
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

---

## 🏗️ Project Structure

```
ReactForge/
├── app/                          # Next.js 14 App Router
│   ├── api/                      # API routes
│   ├── dashboard/                # Dashboard pages
│   ├── login/                    # Authentication pages
│   ├── register/                 # Registration pages
│   └── page.tsx                  # Main landing page
├── components/                   # React components
│   ├── ui/                       # UI components (shadcn/ui)
│   ├── auth-provider.tsx         # Authentication context
│   ├── chat/                     # Chat interface
│   ├── editor/                   # Code editor
│   └── preview/                  # Component preview
├── hooks/                        # Custom React hooks
├── lib/                          # Utility libraries
├── styles/                       # Global styles
└── public/                       # Static assets
```

---

## 🎨 Component Showcase

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

---

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

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
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

- Use TypeScript for all new code
- Follow the existing code style
- Add tests for new features
- Update documentation as needed

---

## 📚 Documentation

- [Environment Setup](ENVIRONMENT_SETUP.md)
- [Supabase Configuration](SUPABASE_SETUP.md)
- [Migration Guide](MIGRATION_GUIDE.md)
- [API Documentation](docs/API.md)

---

## 🎯 Roadmap

### Phase 1 - Core Features ✅
- [x] AI-powered component generation
- [x] Real-time preview
- [x] User authentication
- [x] Component export

### Phase 2 - Enhanced Features 🚧
- [ ] Component marketplace
- [ ] Team collaboration
- [ ] Advanced customization
- [ ] Performance analytics

### Phase 3 - Enterprise Features 📋
- [ ] White-label solutions
- [ ] Advanced AI models
- [ ] Enterprise integrations
- [ ] Custom branding

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

---

## 📞 Support

- **Documentation**: [docs.reactforge.dev](https://docs.reactforge.dev)
- **Issues**: [GitHub Issues](https://github.com/GouravSittam/ReactForge/issues)
- **Discussions**: [GitHub Discussions](https://github.com/GouravSittam/ReactForge/discussions)
- **Email**: support@reactforge.dev

---

<div align="center">

**Made with ❤️ by the ReactForge Team**

[![GitHub](https://img.shields.io/badge/GitHub-Follow%20us-black?style=for-the-badge&logo=github)](https://github.com/GouravSittam)
[![Twitter](https://img.shields.io/badge/Twitter-Follow%20us-blue?style=for-the-badge&logo=twitter)](https://twitter.com/reactforge)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?style=for-the-badge&logo=linkedin)](https://linkedin.com/company/reactforge)

</div>
