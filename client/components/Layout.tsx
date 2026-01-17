import { ReactNode, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  LogOut,
  BarChart3,
  Home,
  User,
  Building2,
  BookText,
  ImageIcon,
  FileText,
  Briefcase,
  Folder,
  Sun,
  Moon,
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

  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "dark";
    }
    return "dark";
  });

  const OWNER_PHOTO_URL =
    "https://img.freepik.com/free-vector/gradient-abstract-logo-template_23-2148204610.jpg";

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    initializeTracking();
  }, []);

  useEffect(() => {
    trackPageView(location.pathname);
  }, [location.pathname]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

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
    {
      path: "/company",
      label: "Perusahaan",
      icon: <Building2 className="w-5 h-5" />,
    },
    { path: "/journal", label: "Jurnal", icon: <BookText className="w-5 h-5" /> },
    { path: "/gallery", label: "Galeri", icon: <ImageIcon className="w-5 h-5" /> },
    { path: "/report", label: "Laporan", icon: <FileText className="w-5 h-5" /> },
    {
      path: "/portfolio",
      label: "Portofolio",
      icon: <Briefcase className="w-5 h-5" />,
    },
    {
      path: "/documentation",
      label: "Dokumen",
      icon: <Folder className="w-5 h-5" />,
    },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground overflow-x-hidden transition-colors duration-500">
      <style>{`
        /* =========================
           FIX WARNA HALAMAN (BALIK KE ASLI)
           TIDAK MENGUBAH LOGIC LAIN
        ========================== */

        body {
          background-color: hsl(222 47% 11%);
        }

        .bg-background {
          background-color: hsl(222 47% 11%) !important;
        }

        @keyframes logo-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes rainbow-glow {
          0% { filter: drop-shadow(0 0 6px #ff004c); }
          25% { filter: drop-shadow(0 0 6px #00ffe0); }
          50% { filter: drop-shadow(0 0 6px #ffe600); }
          75% { filter: drop-shadow(0 0 6px #7cff00); }
          100% { filter: drop-shadow(0 0 6px #ff004c); }
        }

        .animate-owner-custom {
          animation: logo-float 3s ease-in-out infinite,
                     rainbow-glow 4s linear infinite;
        }
      `}</style>

      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <img
                src={OWNER_PHOTO_URL}
                alt="Logo"
                className="w-11 h-11 rounded-full border-2 animate-owner-custom"
              />
              <span className="font-bold text-lg">
                Portal <span className="text-primary">PKL</span>
              </span>
            </Link>

            <nav className="hidden lg:flex gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative font-medium ${
                    isActive(item.path)
                      ? "text-primary"
                      : "text-foreground/70 hover:text-foreground"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all ${
                      isActive(item.path) ? "w-full" : "w-0"
                    }`}
                  />
                </Link>
              ))}
            </nav>

            <div className="flex gap-2">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-xl border border-border"
              >
                {theme === "dark" ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
              </button>

              {isAdmin && (
                <Link
                  to="/admin"
                  className="px-3 py-2 bg-secondary rounded-xl text-xs font-bold"
                >
                  <BarChart3 className="w-4 h-4 inline mr-1" />
                  Dashboard
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="px-3 py-2 bg-destructive text-white rounded-xl text-xs font-bold"
              >
                <LogOut className="w-4 h-4 inline mr-1" />
                Logout
              </button>

              <button
                onClick={toggleMenu}
                className="lg:hidden p-2 rounded-xl border border-border"
              >
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <nav className="lg:hidden mt-4 grid grid-cols-3 gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="p-3 border rounded-xl flex flex-col items-center"
                >
                  {item.icon}
                  <span className="text-[10px] mt-1">{item.label}</span>
                </Link>
              ))}
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

      {isAdmin && (
        <div className="fixed bottom-6 left-6 bg-primary/10 border border-primary px-4 py-2 rounded-xl text-xs">
          Admin Access Granted
        </div>
      )}
    </div>
  );
}
