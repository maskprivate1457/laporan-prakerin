import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import CompanyInfo from "./pages/CompanyInfo";
import Journal from "./pages/Journal";
import Gallery from "./pages/Gallery";
import MonthlyReport from "./pages/MonthlyReport";
import Portfolio from "./pages/Portfolio";
import Documentation from "./pages/Documentation";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import { useEffect, useState } from "react";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    //tracking
    initializeTracking();
    // Check if user is logged in
    const userEmail = localStorage.getItem("userEmail");
    setIsAuthenticated(!!userEmail);
    
    // Memberikan sedikit delay agar animasi loading terlihat
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); 
    
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black overflow-hidden font-mono">
        {/* Container Utama Loading */}
        <div className="relative flex flex-col items-center">
          
          {/* Teks Loading dengan Efek Kedip */}
          <div className="mb-4 text-[#39FF14] text-2xl font-bold tracking-[0.5em] animate-pulse uppercase">
            Loading
          </div>

          {/* Progress Bar Container */}
          <div className="flex gap-1.5 p-1 border-2 border-[#39FF14]/20 rounded-sm">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="w-3 h-8 bg-[#39FF14] shadow-[0_0_15px_#39FF14]"
                style={{
                  animation: `loadingBlocks 1.5s infinite ease-in-out`,
                  animationDelay: `${i * 0.1}s`,
                  opacity: 0
                }}
              />
            ))}
          </div>

          {/* Efek Scanline (Garis Layar Tua) */}
          <div className="pointer-events-none absolute inset-0 w-full h-full bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_4px,3px_100%]" />
        </div>

        {/* Gaya CSS Internal untuk Animasi Custom */}
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes loadingBlocks {
            0%, 100% { opacity: 0; transform: scaleY(0.8); }
            50% { opacity: 1; transform: scaleY(1); }
          }
        `}} />
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      {isAuthenticated ? (
        <>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/company" element={<CompanyInfo />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/report" element={<MonthlyReport />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/documentation" element={<Documentation />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<NotFound />} />
        </>
      ) : (
        <Route path="*" element={<Login />} />
      )}
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
