import { ReactNode, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, LogOut, BarChart3 } from "lucide-react";
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
  const location = useLocation();

  // 1. URL FOTO DARI OWNER (Silakan ganti URL ini)
  const OWNER_PHOTO_URL = "https://img.freepik.com/free-vector/gradient-abstract-logo-template_23-2148204610.jpg";

  useEffect(() => {
    initializeTracking();
  }, []);

  useEffect(() => {
    trackPageView(location.pathname);
  }, [location.pathname]);

  // Fungsi Logout yang diperbarui
  const handleLogout = () => {
    localStorage.clear(); // Menghapus isAdmin, userName, dll
    navigate("/login");    // Kembali ke halaman login
    window.location.reload(); // Memastikan state benar-benar bersih
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
      {/* 2. Definisi Animasi Custom (Floating & Rainbow Glow) */}
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
      `}</style>

      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-background border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            
            {/* 3. LOGO AREA DENGAN FOTO & ANIMASI */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full animate-pulse"></div>
                <img 
                  src={OWNER_PHOTO_URL} 
                  alt="Owner Logo" 
                  className="relative w-12 h-12 rounded-full border-2 object-cover shadow-lg animate-owner-custom"
                />
              </div>
              <span className="font-bold text-xl text-foreground hidden sm:inline font-poppins tracking-tight">
                Portal <span className="text-primary">PKL</span>
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

            {/* Right side - Logout Button Updated */}
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
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-destructive text-white rounded-lg font-medium text-sm transition-all duration-200 hover:opacity-90 shadow-sm"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMenu}
                className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-center md:text-left">
            <div>
              <h3 className="font-bold text-lg mb-2 font-poppins">Portal PKL</h3>
              <p className="text-foreground/70 text-sm">
                Platform dokumentasi dan pelaporan aktivitas magang profesional.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Menu Cepat</h4>
              <ul className="space-y-2 text-sm text-foreground/70">
                <li><Link to="/" className="hover:text-primary transition-colors">Beranda</Link></li>
                <li><Link to="/profile" className="hover:text-primary transition-colors">Profil</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Informasi</h4>
              <p className="text-sm text-foreground/70">Laporan Sidang Prakerin - Tahun 2025</p>
              <p className="text-sm text-foreground/70 mt-2 italic text-primary">Managed by Owner</p>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-foreground/60">
            <p>&copy; 2025 Laporan Prakerin. Semua hak dilindungi oleh bapak saya.</p>
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
