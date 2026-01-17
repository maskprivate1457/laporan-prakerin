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

  useEffect(() => {
    const root = window.document.documentElement;
    theme === "dark" ? root.classList.add("dark") : root.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  const location = useLocation();
  const OWNER_PHOTO_URL =
    "https://img.freepik.com/free-vector/gradient-abstract-logo-template_23-2148204610.jpg";

  useEffect(() => initializeTracking(), []);
  useEffect(() => trackPageView(location.pathname), [location.pathname]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
    window.location.reload();
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

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
        html {
          font-size: clamp(14px, 1.1vw, 16px);
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          touch-action: manipulation;
        }

        body {
          max-width: 100vw;
          overflow-x: hidden;
          line-height: 1.6;
        }

        * {
          box-sizing: border-box;
        }

        .dark {
          --background: 240 10% 4%;
          --foreground: 0 0% 98%;
          --card: 240 10% 6%;
          --border: 240 5% 15%;
          --primary: 190 100% 50%;
        }
      `}</style>

      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="container mx-auto px-[clamp(12px,4vw,24px)] py-3 md:py-4">
          <div className="flex items-center justify-between">

            {/* LOGO */}
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <img
                src={OWNER_PHOTO_URL}
                alt="Logo"
                className="w-10 h-10 md:w-12 md:h-12 rounded-full border object-cover"
              />
              <span className="font-bold text-[clamp(16px,2vw,20px)]">
                Portal <span className="text-primary">PKL</span>
              </span>
            </Link>

            {/* DESKTOP NAV */}
            <nav className="hidden lg:flex gap-6">
              {navItems.map(item => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={isActive(item.path)
                    ? "text-primary font-semibold"
                    : "text-foreground/70 hover:text-foreground"}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* ACTIONS */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg border border-border"
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              {isAdmin && (
                <Link
                  to="/admin"
                  className="px-3 py-2 bg-secondary rounded-lg text-xs font-bold"
                >
                  Dashboard
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="px-3 py-2 bg-destructive text-white rounded-lg text-xs font-bold"
              >
                Logout
              </button>

              <button
                onClick={toggleMenu}
                className="lg:hidden p-2 border rounded-lg"
              >
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>

          {/* MOBILE NAV */}
          {isMenuOpen && (
            <nav className="lg:hidden mt-4 pt-4 border-t border-border">
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {navItems.map(item => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex flex-col items-center p-3 rounded-xl border ${
                      isActive(item.path)
                        ? "bg-primary/10 border-primary text-primary"
                        : "bg-card border-border text-foreground/70"
                    }`}
                  >
                    {item.icon}
                    <span className="text-[10px] mt-1 font-bold truncate">
                      {item.label}
                    </span>
                  </Link>
                ))}
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* CONTENT */}
      <main className="flex-1 container mx-auto px-[clamp(12px,4vw,24px)] py-6 md:py-8 w-full max-w-screen-xl">
        {children}
      </main>

      {/* FOOTER */}
      <footer className="bg-muted/30 border-t border-border">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-xs text-foreground/60">
            © 2025 Portal PKL System. All rights reserved.
          </p>
        </div>
      </footer>

      {/* ADMIN INDICATOR */}
      {isAdmin && (
        <div className="fixed bottom-4 left-4 bg-primary/10 border border-primary text-primary px-4 py-2 rounded-xl text-xs font-bold">
          Admin Access Granted
        </div>
      )}
    </div>
  );
}
