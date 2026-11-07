import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Route, Routes } from "react-router-dom";
import { ServicesDrawerProvider } from "@/components/ServicesDrawerProvider";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import ProjectPage from "./pages/ProjectPage.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter>
        <ServicesDrawerProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* Shareable section links, e.g. /#/showreel lands on the showreel */}
            <Route path="/portfolio" element={<Index />} />
            <Route path="/showreel" element={<Index />} />
            <Route path="/about" element={<Index />} />
            <Route path="/contact" element={<Index />} />
            <Route path="/project/:slug" element={<ProjectPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ServicesDrawerProvider>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
