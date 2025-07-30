import { Component } from "@/components/ui/gradient-bar-hero-section";
import { SmoothScrollLink } from "@/components/ui/smooth-scroll-link";

const DemoPage = () => {
  return (
    <div className="w-full min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen">
        <Component />
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Smooth Scrolling Features
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Experience buttery smooth scrolling powered by LENIS. Navigate through sections seamlessly with enhanced performance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                <span className="text-white text-xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Lightning Fast
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Optimized performance with 60fps smooth scrolling using LENIS library.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4">
                <span className="text-white text-xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Precise Navigation
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Smooth anchor link navigation with custom easing and duration control.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4">
                <span className="text-white text-xl">📱</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Mobile Optimized
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Touch-friendly scrolling with optimized behavior for mobile devices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Section */}
      <section id="interactive" className="py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Try It Yourself
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Click the buttons below to experience smooth scrolling in action.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <SmoothScrollLink 
              href="#features" 
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Scroll to Features
            </SmoothScrollLink>
            
            <SmoothScrollLink 
              href="#interactive" 
              className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Scroll to Interactive
            </SmoothScrollLink>
            
            <SmoothScrollLink 
              href="#showcase" 
              className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Scroll to Showcase
            </SmoothScrollLink>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Smooth Scroll Benefits
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  Enhanced user experience
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  Professional feel
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                  Better performance
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                  Mobile optimized
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Technical Details
              </h3>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <p><strong>Library:</strong> @studio-freight/lenis</p>
                <p><strong>Duration:</strong> 1.2 seconds</p>
                <p><strong>Easing:</strong> Custom exponential</p>
                <p><strong>Performance:</strong> 60fps target</p>
                <p><strong>Touch Support:</strong> Optimized</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Showcase Section */}
      <section id="showcase" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Component Showcase
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              See how smooth scrolling enhances the overall user experience across different components.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Navigation Links
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  All navigation links now use smooth scrolling for a premium feel.
                </p>
                <div className="flex flex-wrap gap-2">
                  <SmoothScrollLink 
                    href="#features" 
                    className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-md text-sm hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                  >
                    Features
                  </SmoothScrollLink>
                  <SmoothScrollLink 
                    href="#interactive" 
                    className="px-4 py-2 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-md text-sm hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
                  >
                    Interactive
                  </SmoothScrollLink>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Scroll to Top
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  A floating scroll-to-top button appears when scrolling down, using LENIS for smooth navigation back to the top.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Performance Optimized
                </h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• RAF (RequestAnimationFrame) loop</li>
                  <li>• Hardware acceleration</li>
                  <li>• Touch gesture support</li>
                  <li>• Wheel event optimization</li>
                  <li>• Memory efficient</li>
                </ul>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Cross-Browser Compatible
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Works seamlessly across all modern browsers with fallback support for older versions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-2xl font-bold mb-4">ReactForge</h3>
          <p className="text-gray-400 mb-6">
            AI-Driven React Component Playground with Smooth Scrolling
          </p>
          <div className="flex justify-center space-x-4">
            <SmoothScrollLink 
              href="#features" 
              className="text-gray-400 hover:text-white transition-colors"
            >
              Features
            </SmoothScrollLink>
            <SmoothScrollLink 
              href="#interactive" 
              className="text-gray-400 hover:text-white transition-colors"
            >
              Interactive
            </SmoothScrollLink>
            <SmoothScrollLink 
              href="#showcase" 
              className="text-gray-400 hover:text-white transition-colors"
            >
              Showcase
            </SmoothScrollLink>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DemoPage; 