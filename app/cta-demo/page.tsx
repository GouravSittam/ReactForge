import { CTASection } from "@/components/ui/cta-with-rectangle";

const CTADemoPage = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 text-white">
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
    </div>
  );
};

export default CTADemoPage; 