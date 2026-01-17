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
  
  // --- LOGIKA DARK MODE ---
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "dark";
    }
    return "dark";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const location = useLocation();
  const OWNER_PHOTO_URL =
    "https://img.freepik.com/free-vector/gradient-abstract-logo-template_23-2148204610.jpg";

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
    <div className="flex flex-col min-h-screen bg-background text-foreground overflow-x-hidden transition-colors duration-500">
      <style>{`
        @keyframes hue-glow {
          0% { filter: hue-rotate(0deg); }
          100% { filter: hue-rotate(360deg); }
        }

        .menu-glow-wrapper {
          position: relative;
        }

        .menu-glow-bg {
          position: absolute;
          inset: -6px;
          border-radius: 18px;
          background: linear-gradient(
            90deg,
            #ff004c,
            #ffe600,
            #00ffd5,
            #7a5cff,
            #ff004c
          );
          filter: blur(14px);
          opacity: 0.85;
          animation: hue-glow 6s linear infinite;
          z-index: 0;
        }

        .menu-glow-content {
          position: relative;
          z-index: 1;
        }

        .dark {
          --background: 240 10% 4%;
          --foreground: 0 0% 98%;
          --card: 240 10% 6%;
          --border: 240 5% 15%;
          --primary: 190 100% 50%;
        }
      `}</style>

      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex items-center justify-between">
            
            <Link to="/" className="flex items-center gap-2">
              <img
                src={OWNER_PHOTO_URL}
                className="w-10 h-10 rounded-full border-2"
              />
              <span className="font-bold">Portal <span className="text-primary">PKL</span></span>
            </Link>

            <div className="flex gap-2">
              <button onClick={toggleTheme} className="p-2 border rounded-xl">
                {theme === "light" ? <Moon /> : <Sun />}
              </button>
              <button onClick={toggleMenu} className="lg:hidden p-2 border rounded-xl">
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <nav className="lg:hidden mt-4 pt-4 border-t border-border">
              <div className="menu-glow-wrapper">
                <div className="menu-glow-bg" />
                <div className="menu-glow-content grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className="flex flex-col items-center justify-center p-3 rounded-xl border bg-background"
                    >
                      {item.icon}
                      <span className="text-[10px] mt-1">{item.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </nav>
          )}
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-6">
        {children}
      </main>

      <footer className="border-t border-border text-center text-xs py-6">
        © 2025 Portal PKL System. All rights reserved.
      </footer>
    </div>
  );
}
