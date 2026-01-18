import { Link } from "react-router-dom";
import {
  Users,
  BookOpen,
  Image,
  FileText,
  Briefcase,
  BarChart3,
  CheckCircle,
  ArrowRight,
  Zap,
  Shield,
  Globe,
} from "lucide-react";
import Layout from "@/components/Layout";

export default function Home() {
  const features = [
    {
      icon: Users,
      title: "Profil Mahasiswa",
      description: "Kelola informasi pribadi dan akademik Anda dengan lengkap",
      path: "/profile",
    },
    {
      icon: Briefcase,
      title: "Informasi Perusahaan",
      description: "Lihat detail tempat magang dan deskripsi pekerjaan",
      path: "/company",
    },
    {
      icon: BookOpen,
      title: "Jurnal Harian",
      description:
        "Catat aktivitas setiap hari dengan mudah menggunakan penyimpanan lokal",
      path: "/journal",
    },
    {
      icon: Image,
      title: "Galeri Foto",
      description: "Unggah dan kelola dokumentasi visual dari aktivitas magang",
      path: "/gallery",
    },
    {
      icon: BarChart3,
      title: "Laporan Bulanan",
      description: "Buat laporan komprehensif untuk setiap bulan magang",
      path: "/report",
    },
    {
      icon: Briefcase,
      title: "Portofolio",
      description: "Pamerkan hasil kerja dan pencapaian selama magang",
      path: "/portfolio",
    },
  ];

  const benefits = [
    {
      icon: CheckCircle,
      title: "Terorganisir",
      description: "Semua dokumentasi dalam satu tempat yang mudah diakses",
    },
    {
      icon: Shield,
      title: "Profesional",
      description: "Tampilan modern yang mengesankan untuk pengunjung",
    },
    {
      icon: Zap,
      title: "Efisien",
      description: "Proses pelaporan yang cepat dan terstruktur dengan baik",
    },
    {
      icon: Globe,
      title: "Terintegrasi",
      description: "Sistem tracking pengunjung dan manajemen akses admin",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-12 md:py-20 mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-6 animate-slide-in-left">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 leading-tight">
                Portal Dokumentasi{" "}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Magang Profesional
                </span>
              </h1>
              <p className="text-lg text-foreground/70 leading-relaxed">
                Kelola semua kebutuhan dokumentasi PKL Anda dalam satu platform
                terpadu. Dari profil hingga portofolio, catat setiap momen
                berharga dalam perjalanan magang Anda.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/profile"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-semibold hover:opacity-90 transition-all duration-200 shadow-lg hover:shadow-xl group"
              >
                Mulai Sekarang
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/documentation"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/5 transition-all duration-200"
              >
                Pelajari Lebih Lanjut
              </Link>
            </div>
          </div>

          {/* Hero Illustration */}
          <div className="relative h-80 lg:h-96 animate-slide-in-right">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl"></div>
            <div className="absolute inset-4 border-2 border-primary/30 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full mb-4 shadow-lg animate-float">
                  <span className="text-white text-3xl font-bold font-poppins">
                    PKL
                  </span>
                </div>
                <p className="text-foreground/60 font-medium">
                  Dokumentasi Magang Terpercaya
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-12 md:py-20 mb-12">
        <div className="text-center mb-12">
          <h2 className="section-title text-center">Fitur Unggulan</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Akses lengkap ke semua tools yang Anda butuhkan untuk mengelola
            dokumentasi magang
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Link
                key={index}
                to={feature.path}
                className="group"
              >
                <div className="h-full p-6 bg-card border border-border rounded-xl card-hover cursor-pointer">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg mb-4 group-hover:from-primary/30 group-hover:to-secondary/30 transition-colors">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-foreground/70 text-sm mb-4">
                    {feature.description}
                  </p>
                  <div className="flex items-center text-primary font-semibold text-sm group-hover:translate-x-1 transition-transform">
                    Akses <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 md:py-20 mb-12">
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 md:p-12 border border-primary/20">
          <h2 className="section-title mb-4">Mengapa Memilih Portal PKL?</h2>
          <p className="text-foreground/70 mb-10 max-w-2xl">
            Platform kami dirancang khusus untuk memudahkan mahasiswa dalam
            mengelola dokumentasi magang mereka
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary text-white">
                      <IconComponent className="w-6 h-6" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      {benefit.title}
                    </h3>
                    <p className="text-foreground/70 text-sm">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 bg-gradient-to-r from-primary to-secondary text-white rounded-2xl p-8 md:p-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Siap Mulai Dokumentasi Magang Anda?
        </h2>
        <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
          Bergabunglah dengan ribuan mahasiswa yang telah menggunakan Portal PKL
          untuk mengorganisir dokumentasi magang mereka
        </p>
        <Link
          to="/profile"
          className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary rounded-lg font-semibold hover:bg-white/90 transition-all duration-200 shadow-lg hover:shadow-xl group"
        >
          Buat Profil Anda
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </section>
    </Layout>
  );
}
