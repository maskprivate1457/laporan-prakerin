import { ReactNode, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, LogOut, LogIn, BarChart3 } from "lucide-react";
import { initializeTracking, trackPageView } from "@/lib/tracking";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(
    localStorage.getItem("isAdmin") === "true"
  );
  const location = useLocation();

  // Initialize tracking on mount
  useEffect(() => {
    initializeTracking();
  }, []);

  // Track page views
  useEffect(() => {
    trackPageView(location.pathname);
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleAdminToggle = () => {
    const newAdminStatus = !isAdmin;
    setIsAdmin(newAdminStatus);
    localStorage.setItem("isAdmin", String(newAdminStatus));
  };

  const navItems = [
    { path: "/", label: "Beranda" },
    { path: "/profile", label: "Profil" },
    { path: "/company", label: "Perusahaan" },
    { path: "/journal", label: "Jurnal" },
    { path: "/gallery", label: "Galeri" },
    { path: "/report", label: "Laporan" },
    { path: "/portfolio", label: "Portofolio" },
    { path: "/documentation", label: "Dokumentasi" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-background border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                <span className="text-white font-bold text-lg font-poppins">
                  PKL
                </span>
              </div>
              <span className="font-bold text-xl text-foreground hidden sm:inline font-poppins">
                Portal PKL
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm font-medium transition-colors duration-200 relative group ${
                    isActive(item.path)
                      ? "text-primary font-semibold"
                      : "text-foreground/70 hover:text-foreground"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary transition-all duration-300 ${
                      isActive(item.path) ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              ))}
            </nav>

            {/* Right side - Admin toggle and Mobile menu */}
            <div className="flex items-center gap-4">
              {isAdmin && (
                <Link
                  to="/admin"
                  className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg font-medium text-sm transition-all duration-200 hover:opacity-90"
                >
                  <BarChart3 className="w-4 h-4" />
                  <span className="hidden sm:inline">Dashboard</span>
                </Link>
              )}
              <button
                onClick={() => {
                  localStorage.removeItem("isAdmin");
                  localStorage.removeItem("userEmail");
                  localStorage.removeItem("userName");
                  window.location.href = "/login";
                }}
                className="flex items-center gap-2 px-4 py-2 bg-destructive text-white rounded-lg font-medium text-sm transition-all duration-200 hover:opacity-90"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMenu}
                className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="md:hidden mt-4 pt-4 border-t border-border flex flex-col gap-3 animate-slide-in-left">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                    isActive(item.path)
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground/70 hover:bg-muted"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8 w-full">{children}</main>

      {/* Footer */}
      <footer className="mt-auto bg-foreground/5 border-t border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div>
              <h3 className="font-bold text-lg mb-2 font-poppins">
                Portal PKL
              </h3>
              <p className="text-foreground/70 text-sm">
                Platform dokumentasi dan pelaporan aktivitas magang yang
                profesional dan terintegrasi.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4">Menu Cepat</h4>
              <ul className="space-y-2 text-sm text-foreground/70">
                <li>
                  <Link to="/" className="hover:text-primary transition-colors">
                    Beranda
                  </Link>
                </li>
                <li>
                  <Link
                    to="/profile"
                    className="hover:text-primary transition-colors"
                  >
                    Profil
                  </Link>
                </li>
                <li>
                  <Link
                    to="/portfolio"
                    className="hover:text-primary transition-colors"
                  >
                    Portofolio
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold mb-4">Informasi</h4>
              <p className="text-sm text-foreground/70">
                Platform Dokumentasi PKL - Tahun 2024
              </p>
              <p className="text-sm text-foreground/70 mt-2">
                Untuk pertanyaan, hubungi admin.
              </p>
            </div>
          </div>

          <div className="border-t border-border pt-8 text-center text-sm text-foreground/60">
            <p>
              &copy; 2024 Portal PKL. Semua hak dilindungi. | Portal
              Dokumentasi Magang Profesional
            </p>
          </div>
        </div>
      </footer>

      {/* Admin Status Indicator */}
      {isAdmin && (
        <div className="fixed bottom-6 right-6 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold shadow-lg animate-pulse-glow">
          Mode Admin Aktif
        </div>
      )}
    </div>
  );
}
