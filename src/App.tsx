import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Thesis from "./pages/Thesis";
import ThesisDemo from "./pages/ThesisDemo";
import NotFound from "./pages/NotFound";
import { LanguageRedirect } from "./components/LanguageRedirect";
import "./i18n";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <LanguageRedirect />
        <Routes>
          {/* Root redirects to /en */}
          <Route path="/" element={<Navigate to="/en" replace />} />
          
          {/* English routes */}
          <Route path="/en" element={<Index />} />
          <Route path="/en/thesis" element={<Thesis />} />
          <Route path="/en/demo" element={<ThesisDemo />} />
          
          {/* Portuguese routes */}
          <Route path="/pt" element={<Index />} />
          <Route path="/pt/thesis" element={<Thesis />} />
          <Route path="/pt/demo" element={<ThesisDemo />} />
          
          {/* Legacy routes - redirect to English */}
          <Route path="/thesis" element={<Navigate to="/en/thesis" replace />} />
          
          {/* Demo route for new sidebar */}
          <Route path="/demo" element={<ThesisDemo />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
