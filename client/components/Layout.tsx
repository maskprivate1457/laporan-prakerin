import { ReactNode, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  Menu, X, LogOut, BarChart3, Home, User, Building2, 
  BookText, ImageIcon, FileText, Briefcase, Folder, 
  Sun, Moon 
} from "lucide-react";
import { initializeTracking, trackPageView } from "@/lib/tracking";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(
    localStorage.getItem("isAdmin") === "true"
  );

  // ===== DARK MODE =====
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "dark";
    }
    return "dark";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    theme === "dark"
      ? root.classList.add("dark")
      : root.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  // =====================

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
    <div className="flex flex-col min-h-screen bg-background text-foreground overflow-x-hidden">
      <style>{`
        @keyframes active-rainbow {
          0% { box-shadow: 0 0 8px #ff0080; border-color: #ff0080; }
          25% { box-shadow: 0 0 12px #00eaff; border-color: #00eaff; }
          50% { box-shadow: 0 0 16px #00ff88; border-color: #00ff88; }
          75% { box-shadow: 0 0 12px #ffe600; border-color: #ffe600; }
          100% { box-shadow: 0 0 8px #ff0080; border-color: #ff0080; }
        }

        @keyframes gradient-move {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }

        .nav-active-glow {
          position: relative;
          padding: 0.35rem 0.75rem;
          border-radius: 0.75rem;
          font-weight: 700;
          color: white !important;
          border: 2px solid transparent;
          background: linear-gradient(
            270deg,
            #ff0080,
            #00eaff,
            #00ff88,
            #ffe600
          );
          background-size: 600% 600%;
          animation:
            active-rainbow 3s linear infinite,
            gradient-move 6s linear infinite;
        }

        .nav-active-glow::after {
          content: "";
          position: absolute;
          inset: -4px;
          border-radius: inherit;
          filter: blur(12px);
          background: inherit;
          opacity: 0.6;
          z-index: -1;
        }
      `}</style>

      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img
              src={OWNER_PHOTO_URL}
              className="w-12 h-12 rounded-full border-2"
            />
            <span className="font-bold text-xl">
              Portal <span className="text-primary">PKL</span>
            </span>
          </Link>

          <nav className="hidden lg:flex gap-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={
                  isActive(item.path)
                    ? "nav-active-glow"
                    : "text-foreground/70 hover:text-foreground transition"
                }
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl border"
            >
              {theme === "light" ? <Moon /> : <Sun />}
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-xl border"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <nav className="lg:hidden grid grid-cols-4 gap-2 p-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`flex flex-col items-center p-3 rounded-xl border ${
                  isActive(item.path) ? "nav-active-glow" : ""
                }`}
              >
                {item.icon}
                <span className="text-[10px]">{item.label}</span>
              </Link>
            ))}
          </nav>
        )}
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>

      <footer className="text-center py-6 text-xs border-t">
        © 2025 Portal PKL System. All rights reserved.
      </footer>

      {isAdmin && (
        <div className="fixed bottom-6 left-6 bg-primary/10 border border-primary px-4 py-2 rounded-xl text-xs">
          Admin Access Granted
        </div>
      )}
    </div>
  );
}
