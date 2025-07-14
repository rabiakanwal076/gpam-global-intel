import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Dashboard } from "@/pages/Dashboard";
import { Prices } from "@/pages/Prices";
import { Policies } from "@/pages/Policies";
import { Calculators } from "@/pages/Calculators";
import { NotFound } from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/prices" element={<Prices />} />
              <Route path="/policies" element={<Policies />} />
              <Route path="/investments" element={<div className="min-h-screen bg-background flex items-center justify-center"><div className="text-center"><h1 className="text-2xl font-bold text-foreground mb-2">Investment Tracker</h1><p className="text-muted-foreground">Coming soon...</p></div></div>} />
              <Route path="/impact" element={<div className="min-h-screen bg-background flex items-center justify-center"><div className="text-center"><h1 className="text-2xl font-bold text-foreground mb-2">Policy Impact Analyzer</h1><p className="text-muted-foreground">Coming soon...</p></div></div>} />
              <Route path="/calculators" element={<Calculators />} />
              <Route path="/blog" element={<div className="min-h-screen bg-background flex items-center justify-center"><div className="text-center"><h1 className="text-2xl font-bold text-foreground mb-2">AI Insights Blog</h1><p className="text-muted-foreground">Coming soon...</p></div></div>} />
              <Route path="/alerts" element={<div className="min-h-screen bg-background flex items-center justify-center"><div className="text-center"><h1 className="text-2xl font-bold text-foreground mb-2">Market Alerts</h1><p className="text-muted-foreground">Coming soon...</p></div></div>} />
              <Route path="/country/:slug" element={<div className="min-h-screen bg-background flex items-center justify-center"><div className="text-center"><h1 className="text-2xl font-bold text-foreground mb-2">Country Dashboard</h1><p className="text-muted-foreground">Coming soon...</p></div></div>} />
              <Route path="/about" element={<div className="min-h-screen bg-background flex items-center justify-center"><div className="text-center"><h1 className="text-2xl font-bold text-foreground mb-2">About GPAM</h1><p className="text-muted-foreground">Global Policy & Analytics Monitor - Real-time financial intelligence platform</p></div></div>} />
              <Route path="/contact" element={<div className="min-h-screen bg-background flex items-center justify-center"><div className="text-center"><h1 className="text-2xl font-bold text-foreground mb-2">Contact Us</h1><p className="text-muted-foreground">Get in touch with our team</p></div></div>} />
              <Route path="/privacy" element={<div className="min-h-screen bg-background flex items-center justify-center"><div className="text-center"><h1 className="text-2xl font-bold text-foreground mb-2">Privacy Policy</h1><p className="text-muted-foreground">Your privacy is important to us</p></div></div>} />
              <Route path="/terms" element={<div className="min-h-screen bg-background flex items-center justify-center"><div className="text-center"><h1 className="text-2xl font-bold text-foreground mb-2">Terms of Service</h1><p className="text-muted-foreground">Terms and conditions for using GPAM.site</p></div></div>} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;