"use client"

import { motion } from "framer-motion"
import { Component as GradientBarHero } from "@/components/ui/gradient-bar-hero-section"
import { Features as Features8 } from "@/components/ui/features-8"
import TestimonialSlider from "@/components/ui/testimonial-slider"
import { CTASection } from "@/components/ui/cta-with-rectangle"
import { StackedCircularFooter } from "@/components/ui/stacked-circular-footer"
import { ClientOnly } from "@/components/ui/client-only"





export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-950" suppressHydrationWarning>


      {/* Hero Section */}
      <GradientBarHero />

      {/* Features */}
      <Features8 />

      {/* Testimonials */}
      <ClientOnly>
        <TestimonialSlider />
      </ClientOnly>

      {/* CTA Section */}
      <section className="bg-gray-900 text-white">
        <CTASection
          badge={{
            text: "Get Started"
          }}
          title="Ready to Build Amazing Components?"
          description="Join thousands of developers who are already creating with ReactForge. Start your free trial today!"
          action={{
            text: "Start Your Free Trial",
            href: "/register",
            variant: "default"
          }}
          withGlow={true}
          className="text-white"
        />
      </section>

      {/* Footer */}
      <StackedCircularFooter />
    </div>
  )
}
