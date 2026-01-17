import { ReactNode, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  Menu, X, LogOut, BarChart3, Home, User, Building2, 
  BookText, ImageIcon, FileText, Briefcase, Folder, 
  Sun, Moon, Monitor 
} from "lucide-react";
import { initializeTracking, trackPageView } from "@/lib/tracking";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(
    localStorage.getItem("isAdmin") === "true"
  );

  /* =====================================================
     🔥 TAMBAHAN SAJA: AUTO DPI RESPONSIVE (GLOBAL)
     ===================================================== */
  useEffect(() => {
    const applyDPIScale = () => {
      const vw = window.visualViewport?.width || window.innerWidth;

      let scale = 1;

      if (vw <= 280) scale = 0.78;
      else if (vw <= 320) scale = 0.85;
      else if (vw <= 360) scale = 0.9;
      else if (vw <= 390) scale = 0.93;
      else if (vw <= 430) scale = 0.96;
      else scale = 1;

      document.documentElement.style.setProperty(
        "--dpi-scale",
        scale.toString()
      );
    };

    applyDPIScale();
    window.addEventListener("resize", applyDPIScale);
    window.visualViewport?.addEventListener("resize", applyDPIScale);

    return () => {
      window.removeEventListener("resize", applyDPIScale);
      window.visualViewport?.removeEventListener("resize", applyDPIScale);
    };
  }, []);
  /* ===================================================== */

  // --- LOGIKA DARK MODE ---
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "dark"; // Default dark untuk kesan teknologi
    }
    return "dark";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  // -------------------------

  const location = useLocation();
  const OWNER_PHOTO_URL = "https://img.freepik.com/free-vector/gradient-abstract-logo-template_23-2148204610.jpg";

  useEffect(() => {
    initializeTracking();
  }, []);

  useEffect(() => {
    trackPageView(location.pathname);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
    window.location.reload();
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { path: "/", label: "Beranda", icon: <Home className="w-5 h-5" /> },
    { path: "/profile", label: "Profil", icon: <User className="w-5 h-5" /> },
    { path: "/company", label: "Perusahaan", icon: <Building2 className="w-5 h-5" /> },
    { path: "/journal", label: "Jurnal", icon: <BookText className="w-5 h-5" /> },
    { path: "/gallery", label: "Galeri", icon: <ImageIcon className="w-5 h-5" /> },
    { path: "/report", label: "Laporan", icon: <FileText className="w-5 h-5" /> },
    { path: "/portfolio", label: "Portofolio", icon: <Briefcase className="w-5 h-5" /> },
    { path: "/documentation", label: "Dokumen", icon: <Folder className="w-5 h-5" /> },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div
      className="flex flex-col min-h-screen bg-background text-foreground overflow-x-hidden transition-colors duration-500"
      style={{
        transform: "scale(var(--dpi-scale, 1))",
        transformOrigin: "top center"
      }}
    >
      <style>{`
        @keyframes logo-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes rainbow-glow {
          0% { filter: drop-shadow(0 0 5px #ff0000); border-color: #ff0000; }
          33% { filter: drop-shadow(0 0 8px #00ff00); border-color: #00ff00; }
          66% { filter: drop-shadow(0 0 5px #0000ff); border-color: #0000ff; }
          100% { filter: drop-shadow(0 0 5px #ff0000); border-color: #ff0000; }
        }
        .animate-owner-custom {
          animation: logo-float 3s ease-in-out infinite, rainbow-glow 4s linear infinite;
        }

        /* Dark Mode Technology Styles */
        .dark {
          --background: 240 10% 4%;
          --foreground: 0 0% 98%;
          --card: 240 10% 6%;
          --border: 240 5% 15%;
          --primary: 190 100% 50%;
        }

        .theme-toggle-btn {
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .dark .theme-toggle-btn {
          box-shadow: 0 0 15px rgba(0, 255, 255, 0.3);
          border-color: rgba(0, 255, 255, 0.5);
        }

        /* 🔥 TAMBAHAN DPI CSS (TANPA SENTUH YANG LAIN) */
        html {
          font-size: clamp(11px, 1.15vw, 16px);
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        @media (max-width: 320px) {
          html {
            font-size: 11px;
          }
        }

        * {
          touch-action: manipulation;
        }
      `}</style>

      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex items-center justify-between">

            <Link to="/" className="flex items-center gap-2 md:gap-3 group shrink-0">
              <div className="relative">
                <img 
                  src={OWNER_PHOTO_URL} 
                  alt="Owner Logo" 
                  className="relative w-10 h-10 md:w-12 md:h-12 rounded-full border-2 object-cover shadow-lg animate-owner-custom"
                />
              </div>
              <span className="font-bold text-lg md:text-xl text-foreground font-poppins tracking-tight">
                Portal <span className="text-primary">PKL</span>
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm font-medium transition-colors duration-200 relative group ${
                    isActive(item.path) ? "text-primary" : "text-foreground/70 hover:text-foreground"
                  }`}
                >
                  {item.label}
                  <span className={`absolute -bottom-1 left-0 right-0 h-0.5 bg-primary transition-all duration-300 ${isActive(item.path) ? "w-full" : "w-0 group-hover:w-full"}`} />
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2 md:gap-3">
              <button
                onClick={toggleTheme}
                className="theme-toggle-btn p-2.5 rounded-xl border border-border bg-card hover:bg-muted transition-all flex items-center justify-center group"
              >
                {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              </button>

              {isAdmin && (
                <Link
                  to="/admin"
                  className="flex items-center gap-2 px-3 py-2.5 bg-secondary text-secondary-foreground rounded-xl font-bold text-xs md:text-sm"
                >
                  <BarChart3 className="w-4 h-4" />
                  Dashboard
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2.5 bg-destructive text-white rounded-xl font-bold text-xs md:text-sm"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>

              <button
                onClick={toggleMenu}
                className="lg:hidden p-2.5 hover:bg-muted rounded-xl transition-colors border border-border"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <nav className="lg:hidden mt-4 pt-4 border-t border-border">
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex flex-col items-center justify-center p-3 rounded-xl border"
                  >
                    {item.icon}
                    <span className="text-[10px] mt-1">{item.label}</span>
                  </Link>
                ))}
              </div>
            </nav>
          )}
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-6 md:py-8 w-full max-w-full">
        {children}
      </main>

      <footer className="mt-auto bg-muted/30 border-t border-border">
        <div className="container mx-auto px-4 py-8 text-center text-xs">
          © 2025 Portal PKL System. All rights reserved.
        </div>
      </footer>

      {isAdmin && (
        <div className="fixed bottom-6 left-6 z-40 bg-primary/10 backdrop-blur-md border border-primary text-primary px-4 py-2 rounded-2xl text-xs font-black animate-pulse tracking-widest uppercase">
          Admin Access Granted
        </div>
      )}
    </div>
  );
}
