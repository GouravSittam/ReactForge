import { StackedCircularFooter } from "@/components/ui/stacked-circular-footer";

const FooterDemoPage = () => {
  return (
    <div className="w-full min-h-screen bg-white dark:bg-gray-900">
      <div className="flex flex-col min-h-screen">
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Footer Demo</h1>
            <p className="text-lg text-muted-foreground">
              Scroll down to see the stacked circular footer component
            </p>
          </div>
        </main>
        <StackedCircularFooter />
      </div>
    </div>
  );
};

export default FooterDemoPage; 