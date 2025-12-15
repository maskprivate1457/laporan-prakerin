import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  User,
  Building2,
  BookOpen,
  Image,
  FileText,
  Briefcase,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: "/", label: "Beranda", icon: Home },
    { path: "/profile", label: "Profil", icon: User },
    { path: "/company", label: "Perusahaan", icon: Building2 },
    { path: "/journal", label: "Jurnal", icon: BookOpen },
    { path: "/gallery", label: "Galeri", icon: Image },
    { path: "/reports", label: "Laporan", icon: FileText },
    { path: "/portfolio", label: "Portofolio", icon: Briefcase },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-700 rounded-lg flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-primary-700">PKL Hub</h1>
                <p className="text-xs text-muted-foreground">
                  Sistem Dokumentasi Magang
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 rounded-lg transition-colors",
                      isActive(item.path)
                        ? "text-primary-600 bg-primary-50 font-semibold"
                        : "text-foreground hover:text-primary-600 hover:bg-primary-50"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm">{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden mt-4 pt-4 border-t border-border flex flex-col gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 rounded-lg transition-colors",
                      isActive(item.path)
                        ? "text-primary-600 bg-primary-50 font-semibold"
                        : "text-foreground hover:text-primary-600 hover:bg-primary-50"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm">{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-primary-700 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4">PKL Hub</h3>
              <p className="text-primary-100 text-sm">
                Platform dokumentasi dan pelaporan untuk Praktik Kerja Lapangan
                (PKL) yang profesional dan terintegrasi.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Menu Utama</h4>
              <ul className="space-y-2 text-sm text-primary-100">
                <li>
                  <Link to="/" className="hover:text-white transition-colors">
                    Beranda
                  </Link>
                </li>
                <li>
                  <Link
                    to="/profile"
                    className="hover:text-white transition-colors"
                  >
                    Profil Mahasiswa
                  </Link>
                </li>
                <li>
                  <Link
                    to="/journal"
                    className="hover:text-white transition-colors"
                  >
                    Jurnal Harian
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Dokumentasi</h4>
              <ul className="space-y-2 text-sm text-primary-100">
                <li>
                  <Link
                    to="/gallery"
                    className="hover:text-white transition-colors"
                  >
                    Galeri Foto
                  </Link>
                </li>
                <li>
                  <Link
                    to="/reports"
                    className="hover:text-white transition-colors"
                  >
                    Laporan Bulanan
                  </Link>
                </li>
                <li>
                  <Link
                    to="/portfolio"
                    className="hover:text-white transition-colors"
                  >
                    Portofolio
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Informasi</h4>
              <ul className="space-y-2 text-sm text-primary-100">
                <li>
                  <Link
                    to="/company"
                    className="hover:text-white transition-colors"
                  >
                    Perusahaan
                  </Link>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Bantuan
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Kontak
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-primary-600 pt-8">
            <p className="text-center text-primary-100 text-sm">
              &copy; 2025 Laporan Prakerin. Semua hak dilindungi. | Sistem Dokumentasi Praktek Kerja Lapangan
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
