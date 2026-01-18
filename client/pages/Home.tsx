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
      title: "Profil Diri Selama PKL",
      description:
        "Informasi tentang saya, peran, dan tanggung jawab yang saya jalani selama Praktik Kerja Lapangan",
      path: "/profile",
    },
    {
      icon: Briefcase,
      title: "Tempat & Lingkungan PKL",
      description:
        "Gambaran perusahaan, divisi, serta budaya kerja yang saya rasakan selama PKL",
      path: "/company",
    },
    {
      icon: BookOpen,
      title: "Catatan Harian PKL",
      description:
        "Ringkasan aktivitas, tugas, dan pembelajaran yang saya alami setiap hari selama PKL",
      path: "/journal",
    },
    {
      icon: Image,
      title: "Dokumentasi Kegiatan",
      description:
        "Kumpulan foto dan visual aktivitas saya selama menjalani PKL",
      path: "/gallery",
    },
    {
      icon: BarChart3,
      title: "Progres & Evaluasi",
      description:
        "Perkembangan kemampuan dan pencapaian saya dari awal hingga akhir PKL",
      path: "/report",
    },
    {
      icon: Briefcase,
      title: "Hasil & Portofolio",
      description:
        "Karya, proyek, dan kontribusi nyata yang saya hasilkan selama PKL",
      path: "/portfolio",
    },
  ];

  const benefits = [
    {
      icon: CheckCircle,
      title: "Terstruktur",
      description:
        "Perjalanan PKL saya terdokumentasi rapi dari awal hingga akhir",
    },
    {
      icon: Shield,
      title: "Representatif",
      description:
        "Menampilkan citra diri yang profesional selama menjalani PKL",
    },
    {
      icon: Zap,
      title: "Berkembang",
      description:
        "Menunjukkan peningkatan skill dan pengalaman yang saya dapatkan",
    },
    {
      icon: Globe,
      title: "Terintegrasi",
      description:
        "Semua cerita, hasil, dan dokumentasi PKL saya dalam satu platform",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-12 md:py-20 mb-12 animate-fade-in-up">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-6 animate-slide-in-left">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 leading-tight">
                Perjalanan PKL{" "}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Saya
                </span>
              </h1>
              <p className="text-lg text-foreground/70 leading-relaxed">
                Website ini berisi dokumentasi lengkap tentang pengalaman saya
                selama Praktik Kerja Lapangan, mulai dari peran, aktivitas,
                pembelajaran, hingga hasil yang saya capai.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/profile"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-semibold hover:opacity-90 transition-all duration-200 shadow-lg hover:shadow-xl group"
              >
                Lihat Profil Saya
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/documentation"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/5 transition-all duration-200"
              >
                Cerita PKL Saya
              </Link>
            </div>
          </div>

          {/* Hero Illustration - Developer Profile Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center animate-fade-in-up">
            
            {/* Sisi Kiri: Profile Card */}
            <div className="bg-[#050816] border border-gray-800 rounded-[2rem] p-10 flex flex-col items-center shadow-2xl relative overflow-hidden">
              {/* Profile Image dengan Ring */}
              <div className="relative mb-8 animate-float">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#1f2937] bg-[#111827]">
                  <img 
                    src="/your-photo.jpg" 
                    alt="Abu Said" 
                    className="w-full h-full object-cover grayscale brightness-90 hover:grayscale-0 transition-all duration-500"
                  />
                </div>
              </div>
              
              {/* Deskripsi Bio */}
              <div className="text-center mb-10">
                <p className="text-gray-300 text-[15px] md:text-base leading-relaxed font-light">
                  <span className="text-[#10b981] font-bold mr-1">+</span> 
                  Crazy programmer Professional & Ambitious. Fous the ande range of Frendent, Backend Engineering that Inclluse Frordand, Backend, and DevOps 
                  <span className="text-[#10b981] font-bold ml-1">+</span>
                </p>
              </div>

              {/* Ikon Media Sosial - Dipastikan muncul di Mobile & Desktop */}
              <div className="flex items-center justify-center gap-6 mb-12">
                <a href="#" className="text-[#10b981] text-2xl hover:scale-125 transition-transform duration-300"><i className="fab fa-github"></i></a>
                <a href="#" className="text-[#10b981] text-2xl hover:scale-125 transition-transform duration-300"><i className="fab fa-linkedin"></i></a>
                <a href="#" className="text-[#10b981] text-2xl hover:scale-125 transition-transform duration-300"><i className="fab fa-facebook"></i></a>
                <a href="#" className="text-[#10b981] text-2xl hover:scale-125 transition-transform duration-300"><i className="fab fa-twitter"></i></a>
                <a href="#" className="text-[#10b981] text-2xl hover:scale-125 transition-transform duration-300"><i className="fas fa-envelope"></i></a>
              </div>

              {/* Tombol Get Resume */}
              <button className="group relative px-8 py-2.5 rounded-full border border-[#ec4899] text-white text-[11px] font-bold tracking-[0.2em] flex items-center gap-3 hover:bg-[#ec4899] transition-all duration-300 shadow-[0_0_20px_rgba(236,72,153,0.2)]">
                GET RESUME 
                <span className="text-base group-hover:translate-y-1 transition-transform">↓</span>
              </button>
            </div>

            {/* Sisi Kanan: Code Snippet (VS Code Style) */}
            <div className="bg-[#050816] border border-gray-800 rounded-[1.5rem] p-6 md:p-8 font-mono text-[13px] md:text-sm shadow-2xl relative animate-slide-in-right">
              {/* Header Window: Dots & Line */}
              <div className="flex items-center gap-2 mb-8 border-b border-gray-800 pb-4 -mx-6 px-8">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
              </div>

              {/* Konten Kode dengan Syntax Highlighting Persis Gambar */}
              <div className="space-y-1.5 overflow-x-auto">
                <div>
                  <span className="text-[#c678dd] italic">const</span> <span className="text-[#61afef]">coder</span> <span className="text-[#abb2bf]">=</span> {' {'}
                </div>
                <div className="pl-6">
                  <span className="text-[#abb2bf]">name:</span> <span className="text-[#98c379]">'Abu SaiD'</span>,
                </div>
                <div className="pl-6">
                  <span className="text-[#abb2bf]">company:</span> <span className="text-[#98c379]">'Tekon Private Limited'</span>,
                </div>
                <div className="pl-6">
                  <span className="text-[#abb2bf]">location:</span> <span className="text-[#98c379]">'Dhaka, Bangladesh'</span>,
                </div>
                <div className="pl-6">
                  <span className="text-[#abb2bf]">Aallowary:</span> <span className="text-[#d19a66]">164</span>,
                </div>
                <div className="pl-6">
                  <span className="text-[#abb2bf]">Aallowing:</span> <span className="text-[#d19a66]">0</span>,
                </div>
                <div className="pl-6">
                  <span className="text-[#abb2bf]">skiellscceten:</span> <span className="text-[#d19a66]">10</span>,
                </div>
                <div className="pl-6">
                  <span className="text-[#abb2bf]">skills:</span> [
                    <span className="text-[#98c379]">'React'</span>, <span className="text-[#98c379]">'NextJS'</span>, <span className="text-[#98c379]">'Tailwind'</span>, <span className="text-[#98c379]">'Expresa'</span>,
                  <div className="pl-4">
                    <span className="text-[#98c379]">'NodeIS'</span>, <span className="text-[#98c379]">'NodeJS'</span>, <span className="text-[#98c379]">'PostgCCQW'</span>, <span className="text-[#98c379]">'Doctgrai'</span>,
                  </div>
                  <div className="pl-4">
                    <span className="text-[#98c379]">'Docker'</span>, <span className="text-[#98c379]">'web'</span>
                  </div>
                  ] ,
                </div>
                <div className="pl-6">
                  <span className="text-[#abb2bf]">hiraable:</span> <span className="text-[#d19a66]">true</span>,
                </div>
                <div>{'};'}</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-12 md:py-20 mb-12">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="section-title text-center">
            Tentang Saya Selama PKL
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Ringkasan bagian-bagian penting dari perjalanan PKL yang saya jalani
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Link
                key={index}
                to={feature.path}
                className="group animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
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
                    Lihat Detail <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 md:py-20 mb-12 animate-fade-in-up">
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 md:p-12 border border-primary/20">
          <h2 className="section-title mb-4">
            Apa yang Saya Dapatkan dari PKL?
          </h2>
          <p className="text-foreground/70 mb-10 max-w-2xl">
            PKL bukan hanya tentang bekerja, tapi tentang proses belajar dan
            membentuk diri
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div
                  key={index}
                  className="flex gap-4 animate-fade-in-up"
                  style={{ animationDelay: `${index * 120}ms` }}
                >
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
      <section className="py-12 md:py-20 bg-gradient-to-r from-primary to-secondary text-white rounded-2xl p-8 md:p-16 text-center animate-fade-in-up">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Inilah Perjalanan PKL Saya
        </h2>
        <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
          Website ini menjadi bukti proses, usaha, dan hasil yang saya capai
          selama menjalani Praktik Kerja Lapangan
        </p>
        <Link
          to="/profile"
          className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary rounded-lg font-semibold hover:bg-white/90 transition-all duration-200 shadow-lg hover:shadow-xl group"
        >
          Lihat Profil Saya
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </section>
    </Layout>
  );
}
