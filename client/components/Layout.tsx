import { ReactNode, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, LogOut, BarChart3, Home, User, Building2, BookText, ImageIcon, FileText, Briefcase, Folder } from "lucide-react";
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

  // Menambahkan Icon untuk tampilan mobile yang lebih intuitif
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
    <div className="flex flex-col min-h-screen bg-background overflow-x-hidden">
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
        /* Responsif DPI: Memastikan teks tidak pecah di layar resolusi tinggi */
        html { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
      `}</style>

      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex items-center justify-between">
            
            {/* LOGO AREA */}
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

            {/* Desktop Navigation (Layar Lebar) */}
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

            {/* Action Buttons */}
            <div className="flex items-center gap-2 md:gap-4">
              {isAdmin && (
                <Link
                  to="/admin"
                  className="flex items-center gap-2 px-3 py-2 bg-secondary text-secondary-foreground rounded-lg font-medium text-xs md:text-sm hover:opacity-90 transition-all"
                >
                  <BarChart3 className="w-4 h-4" />
                  <span className="hidden sm:inline">Dashboard</span>
                </Link>
              )}
              
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 bg-destructive text-white rounded-lg font-medium text-xs md:text-sm hover:opacity-90 shadow-sm"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={toggleMenu}
                className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors border border-border"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation (Responsive Grid) */}
          {isMenuOpen && (
            <nav className="lg:hidden mt-4 pt-4 border-t border-border animate-in fade-in slide-in-from-top-4 duration-300">
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all border ${
                      isActive(item.path)
                        ? "bg-primary/10 border-primary text-primary shadow-sm"
                        : "bg-card border-border text-foreground/70 hover:bg-muted"
                    }`}
                  >
                    <div className={`${isActive(item.path) ? "scale-110" : ""} transition-transform`}>
                      {item.icon}
                    </div>
                    <span className="text-[10px] md:text-xs mt-1.5 font-medium text-center truncate w-full">
                      {item.label}
                    </span>
                  </Link>
                ))}
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6 md:py-8 w-full max-w-full">
        {children}
      </main>

      {/* Footer */}
      <footer className="mt-auto bg-muted/30 border-t border-border">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8 text-center sm:text-left">
            <div className="sm:col-span-2 md:col-span-1">
              <h3 className="font-bold text-lg mb-2 font-poppins text-primary">Portal PKL</h3>
              <p className="text-foreground/70 text-sm max-w-xs mx-auto sm:mx-0">
                Platform dokumentasi dan pelaporan aktivitas magang profesional.
              </p>
            </div>
            <div className="hidden sm:block">
              <h4 className="font-semibold mb-3 text-sm">Navigasi</h4>
              <div className="grid grid-cols-2 gap-2 text-xs text-foreground/70">
                {navItems.slice(0, 4).map(item => <Link key={item.path} to={item.path} className="hover:text-primary transition-colors">{item.label}</Link>)}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-sm">Informasi</h4>
              <p className="text-xs text-foreground/70 italic">Managed by Owner</p>
              <p className="text-xs text-foreground/70 mt-1">Laporan Sidang Prakerin - 2025</p>
            </div>
          </div>
          <div className="border-t border-border pt-6 text-center text-[10px] md:text-xs text-foreground/50">
            <p>&copy; 2025 Laporan Prakerin. Semua hak dilindungi.</p>
          </div>
        </div>
      </footer>

      {/* Admin Indicator - Adjusted for Mobile */}
      {isAdmin && (
        <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 bg-primary text-primary-foreground px-3 py-1.5 md:px-4 md:py-2 rounded-full text-[10px] md:text-sm font-bold shadow-2xl animate-bounce z-[60] border-2 border-background">
          Mode Admin Aktif
        </div>
      )}
    </div>
  );
}
