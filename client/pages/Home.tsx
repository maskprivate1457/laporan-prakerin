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
          {/* Hero Illustration - Portofolio Style */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center animate-slide-in-right">
            
            {/* KARTU KIRI: Profile Card (Flexbox) */}
            <div className="bg-card/50 backdrop-blur-sm border border-primary/20 rounded-3xl p-8 flex flex-col items-center text-center shadow-xl">
              {/* Profile Image Wrap */}
              <div className="relative w-32 h-32 mb-6">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary to-secondary rounded-full animate-pulse opacity-20"></div>
                <div className="w-full h-full rounded-full border-2 border-primary/30 p-1">
                  <img 
                    src="https://via.placeholder.com/150" 
                    alt="User" 
                    className="w-full h-full rounded-full object-cover grayscale"
                  />
                </div>
              </div>

              {/* Bio Text */}
              <p className="text-foreground/80 text-sm leading-relaxed mb-6 max-w-[320px]">
                + Crazy programmer Professional & Ambitious. Focus the wide range of Frontend, Backend Engineering that includes Frontend, Backend, and DevOps +
              </p>

              {/* Social Icons (SVG) - Menggunakan Warna Primary Website */}
              <div className="flex gap-5 mb-8">
                <svg className="w-5 h-5 text-primary fill-current hover:text-secondary cursor-pointer transition-colors" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.298 24 12c0-6.627-5.373-12-12-12"/></svg>
                <svg className="w-5 h-5 text-primary fill-current hover:text-secondary cursor-pointer transition-colors" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                <svg className="w-5 h-5 text-primary fill-current hover:text-secondary cursor-pointer transition-colors" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>
                <svg className="w-5 h-5 text-primary fill-current hover:text-secondary cursor-pointer transition-colors" viewBox="0 0 24 24"><path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 8.165h-18.796l5.53-8.16zm6.497 1.583l4.712-3.817v9.46l-4.712-5.643z"/></svg>
              </div>

              {/* CTA Button - Sinkron dengan warna Primary/Secondary website */}
              <button className="flex items-center gap-2 px-6 py-2 border border-primary text-primary rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-all duration-300 group">
                Get Resume 
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* KARTU KANAN: Code Editor (Table) */}
            <div className="bg-card/50 backdrop-blur-sm border border-primary/20 rounded-3xl overflow-hidden shadow-xl flex flex-col font-mono text-xs md:text-sm leading-6">
              {/* Window Header */}
              <div className="flex p-4 gap-1.5 border-b border-primary/10 bg-muted/50">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>

              {/* Code Area with Sinkronisasi Warna Website */}
              <div className="p-6 text-foreground/90">
                <div className="mb-1">
                  <span className="text-secondary font-semibold">const</span> <span className="text-primary font-semibold">coder</span> = {'{'}
                </div>
                
                <table className="ml-4 md:ml-6 border-separate border-spacing-y-1">
                  <tbody>
                    <tr>
                      <td className="pr-3 text-foreground/60 align-top">name:</td>
                      <td className="text-secondary">'Abu SaiD',</td>
                    </tr>
                    <tr>
                      <td className="pr-3 text-foreground/60 align-top">company:</td>
                      <td className="text-secondary">'Tekon Private Limited',</td>
                    </tr>
                    <tr>
                      <td className="pr-3 text-foreground/60 align-top">location:</td>
                      <td className="text-secondary">'Dhaka, Bangladesh',</td>
                    </tr>
                    <tr>
                      <td className="pr-3 text-foreground/60 align-top">followers:</td>
                      <td className="text-primary font-bold">164,</td>
                    </tr>
                    <tr>
                      <td className="pr-3 text-foreground/60 align-top">skills:</td>
                      <td className="text-foreground/80">
                        [<span className="text-secondary">'React'</span>, <span className="text-secondary">'NextJS'</span>, <span className="text-secondary">'Tailwind'</span>,
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td className="text-secondary">'Express', 'NodeJS', 'PostgreSQL'],</td>
                    </tr>
                    <tr>
                      <td className="pr-3 text-foreground/60 align-top">hireable:</td>
                      <td className="text-primary font-bold">true,</td>
                    </tr>
                  </tbody>
                </table>
                
                <div className="mt-1">{'}'};</div>
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
