import { Link } from "react-router-dom";
import { Home, AlertCircle, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";

export default function NotFound() {
  return (
    <Layout>
      <div className="max-w-2xl mx-auto text-center py-20 animate-slide-in-left">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-destructive/20 to-destructive/10 rounded-full mb-6">
          <AlertCircle className="w-10 h-10 text-destructive" />
        </div>
        
        <h1 className="text-5xl font-bold text-foreground mb-3">404</h1>
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Halaman Tidak Ditemukan
        </h2>
        
        <p className="text-lg text-foreground/70 mb-8">
          Maaf, halaman yang Anda cari tidak ada. Mungkin telah dipindahkan atau tidak pernah ada.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-all shadow-lg group"
          >
            <Home className="w-5 h-5" />
            Kembali ke Beranda
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="mt-12 p-6 bg-card border border-border rounded-xl">
          <p className="text-foreground/70 mb-4">
            Navigasi Cepat:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {[
              { path: "/profile", label: "Profil" },
              { path: "/journal", label: "Jurnal" },
              { path: "/gallery", label: "Galeri" },
              { path: "/portfolio", label: "Portofolio" },
            ].map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
