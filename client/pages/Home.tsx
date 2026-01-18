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
              <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Side - Profile Section */}
        <div className="flex flex-col items-center justify-center text-center space-y-6 p-8">
          {/* Profile Image */}
          <div className="relative">
            <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-cyan-400/30 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop" 
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-3 max-w-md">
            <p className="text-cyan-100 text-lg leading-relaxed">
              <span className="text-cyan-400 font-bold">+</span> Crazy programmer Professional & Ambitious. Focus the
              <span className="block">ande range of Frendend, Backend Engineering that</span>
              <span className="block">incliuse Frotland, Backend, and DevOps <span className="text-cyan-400 font-bold">+</span></span>
            </p>
          </div>

          {/* Social Media Icons */}
          <div className="flex items-center justify-center gap-6 pt-4">
            {/* GitHub */}
            <a href="#" className="hover:scale-110 transition-transform">
              <svg className="w-8 h-8 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>

            {/* LinkedIn */}
            <a href="#" className="hover:scale-110 transition-transform">
              <svg className="w-8 h-8 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>

            {/* Facebook */}
            <a href="#" className="hover:scale-110 transition-transform">
              <svg className="w-8 h-8 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
              </svg>
            </a>

            {/* Portfolio/Globe */}
            <a href="#" className="hover:scale-110 transition-transform">
              <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
              </svg>
            </a>

            {/* Email */}
            <a href="#" className="hover:scale-110 transition-transform">
              <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
            </a>
          </div>

          {/* Get Resume Button */}
          <div className="pt-6">
            <button className="px-8 py-3 border-2 border-cyan-400/50 text-cyan-400 rounded-full font-medium hover:bg-cyan-400/10 transition-all duration-300 flex items-center gap-2">
              GET RESUME
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Right Side - Code Editor */}
        <div className="flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-slate-900/80 rounded-lg overflow-hidden shadow-2xl border border-slate-700/50">
            {/* Terminal Header */}
            <div className="bg-slate-800 px-4 py-3 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>

            {/* Code Content */}
            <div className="p-6 font-mono text-sm leading-relaxed">
              <div className="text-pink-400">const <span className="text-yellow-300">coder</span> = {'{'}</div>
              <div className="pl-4 text-cyan-300">name: <span className="text-green-300">'Abu Said'</span>,</div>
              <div className="pl-4 text-cyan-300">company: <span className="text-green-300">'Tekon Private Limited'</span>,</div>
              <div className="pl-4 text-cyan-300">location: <span className="text-green-300">'Dhaka, Bangladesh'</span>,</div>
              <div className="pl-4 text-cyan-300">AaliMeary: <span className="text-orange-400">164</span>,</div>
              <div className="pl-4 text-cyan-300">AoLLasdng: <span className="text-orange-400">0</span>,</div>
              <div className="pl-4 text-cyan-300">skielisgcten: <span className="text-orange-400">10</span>,</div>
              <div className="pl-4 text-cyan-300">skills: <span className="text-yellow-300">[</span><span className="text-green-300">'React', 'NextJS', 'Tailwind', 'Express',</span></div>
              <div className="pl-8 text-green-300">'NodeJS', 'NodeJS', 'PostgreSQL', 'Docuspa1',</div>
              <div className="pl-8 text-green-300">'Docker', 'meb'</span><span className="text-yellow-300">]</span>,</div>
              <div className="pl-4 text-cyan-300">hireable: <span className="text-orange-400">true</span>,</div>
              <div className="text-pink-400">{'}'}</div>
            </div>
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
