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
        @keyframes rainbow-glow {
          0% { box-shadow: 0 0 8px #ff004c; }
          25% { box-shadow: 0 0 14px #00f7ff; }
          50% { box-shadow: 0 0 18px #00ff6a; }
          75% { box-shadow: 0 0 14px #ffe600; }
          100% { box-shadow: 0 0 8px #ff004c; }
        }

        .nav-glow-active {
          position: relative;
          z-index: 1;
        }

        .nav-glow-active::before {
          content: "";
          position: absolute;
          inset: -6px;
          border-radius: 14px;
          animation: rainbow-glow 3.5s linear infinite;
          z-index: -1;
        }
      `}</style>

      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex items-center justify-between">

            <Link to="/" className="flex items-center gap-3">
              <img
                src={OWNER_PHOTO_URL}
                className="w-10 h-10 rounded-full border-2"
              />
              <span className="font-bold text-lg">
                Portal <span className="text-primary">PKL</span>
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm font-medium ${
                    isActive(item.path)
                      ? "nav-glow-active text-primary"
                      : "text-foreground/70 hover:text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <button onClick={toggleTheme} className="p-2 border rounded-xl">
                {theme === "light" ? <Moon /> : <Sun />}
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
                className="lg:hidden p-2 border rounded-xl"
              >
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <nav className="lg:hidden mt-4 pt-4 border-t">
              <div className="grid grid-cols-3 gap-2">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex flex-col items-center p-3 border rounded-xl ${
                      isActive(item.path) ? "nav-glow-active" : ""
                    }`}
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

      <main className="flex-1 container mx-auto px-4 py-6">
        {children}
      </main>

      <footer className="border-t py-6 text-center text-xs">
        © 2025 Portal PKL System. All rights reserved.
      </footer>

      {isAdmin && (
        <div className="fixed bottom-6 left-6 px-4 py-2 border rounded-xl text-xs">
          Admin Access Granted
        </div>
      )}
    </div>
  );
}
