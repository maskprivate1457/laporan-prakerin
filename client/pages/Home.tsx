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

          {/* Hero Illustration - Ultra Modern with Verified Badge */}
          <div className="flex flex-col lg:flex-row items-stretch justify-center gap-8 mt-12 lg:mt-0 animate-slide-in-right">
            
            {/* KARTU KIRI: Profile Card */}
            <div className="flex-1 relative group">
              {/* Glow Effect Background */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-3xl blur opacity-30 group-hover-opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
              
              <div className="relative bg-[#0d1117]/90 backdrop-blur-xl border border-white/10 rounded-3xl p-8 flex flex-col items-center text-center h-full shadow-2xl">
                {/* Profile Image dengan Centang Biru Instagram */}
                <div className="relative w-32 h-32 mb-8 animate-float">
                  <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400 to-blue-500 rounded-full animate-spin-slow p-1">
                    <div className="w-full h-full bg-[#0d1117] rounded-full"></div>
                  </div>
                  <img 
                    src="https://via.placeholder.com/150" 
                    alt="User" 
                    className="relative z-10 w-full h-full rounded-full object-cover grayscale p-2"
                  />
                  
                  {/* Verified Badge (Centang Biru Instagram Style) */}
                  <div className="absolute bottom-1 right-2 z-20 shadow-lg animate-bounce">
                    <svg viewBox="0 0 24 24" className="w-7 h-7 fill-[#0095f6]">
                      <path d="M12.001 0c-1.341 0-2.394 1.054-3.735 1.054s-2.394-1.054-3.735-1.054-2.394 1.054-3.735 1.054v1.867c0 1.341-1.054 2.394-1.054 3.735s1.054 2.394 1.054 3.735H1.054c-1.341 0-2.394 1.054-2.394 2.394s1.054 2.394 2.394 2.394h1.867c0 1.341 1.054 2.394 1.054 3.735s-1.054 2.394-1.054 3.735c1.341 0 2.394-1.054 3.735-1.054s2.394 1.054 3.735 1.054 2.394-1.054 3.735-1.054 2.394 1.054 3.735 1.054c1.341 0 2.394-1.054 3.735-1.054s2.394 1.054 3.735 1.054 2.394-1.054 3.735-1.054v-1.867c0-1.341 1.054-2.394 1.054-3.735s-1.054-2.394-1.054-3.735h1.867c1.341 0 2.394-1.054 2.394-2.394s-1.054-2.394-2.394-2.394h-1.867c0-1.341-1.054-2.394-1.054-3.735s1.054-2.394 1.054-3.735c-1.341 0-2.394 1.054-3.735 1.054s-2.394-1.054-3.735-1.054z" transform="translate(1.1 1.1) scale(0.9)"/>
                      <path fill="white" d="M10.4 14.7l-3.3-3.3 1.1-1.1 2.2 2.2 4.9-4.9 1.1 1.1z"/>
                    </svg>
                  </div>
                </div>

                {/* Bio Text */}
                <p className="text-slate-300 text-[13px] leading-relaxed mb-8 font-medium">
                  <span className="text-primary font-bold">+</span> Crazy programmer Professional & Ambitious. Focus the wide range of Frontend, Backend Engineering that includes Frontend, Backend, and DevOps <span className="text-secondary font-bold">+</span>
                </p>

                {/* Social Icons */}
                <div className="flex gap-5 mb-10">
                  {[
                    { d: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.298 24 12c0-6.627-5.373-12-12-12" },
                    { d: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" },
                    { d: "M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" },
                    { d: "M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 8.165h-18.796l5.53-8.16zm6.497 1.583l4.712-3.817v9.46l-4.712-5.643z" }
                  ].map((icon, i) => (
                    <div key={i} className="p-2.5 bg-white/5 rounded-xl hover:bg-cyan-500/20 hover:scale-110 transition-all cursor-pointer border border-white/5">
                      <svg className="w-5 h-5 fill-cyan-400" viewBox="0 0 24 24"><path d={icon.d}/></svg>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button className="relative overflow-hidden group flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full text-xs font-bold uppercase tracking-widest shadow-lg shadow-cyan-500/25 transition-all active:scale-95">
                  <span className="relative z-10">Get Resume</span>
                  <FileText className="w-4 h-4 relative z-10 group-hover:rotate-12 transition-transform" />
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                </button>
              </div>
            </div>

            {/* KARTU KANAN: Code Editor */}
            <div className="flex-[1.2] relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-3xl blur opacity-20 group-hover:opacity-60 transition duration-1000"></div>
              
              <div className="relative bg-[#050816] border border-white/10 rounded-3xl overflow-hidden h-full flex flex-col shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 bg-[#0d1117] border-b border-white/5">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.5)]"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                  </div>
                </div>

                {/* Code Content */}
                <div className="p-8 font-mono text-sm leading-7 overflow-x-auto">
                  <div className="mb-2"><span className="text-cyan-400 font-bold">const</span> <span className="text-white">coder</span> = <span className="text-white">{'{'}</span></div>
                  
                  <table className="ml-6 border-separate border-spacing-y-1">
                    <tbody className="text-slate-300">
                      <tr><td className="pr-4 opacity-50">01</td><td className="text-white/70">name:</td><td className="text-cyan-400 italic">'Abu SaiD',</td></tr>
                      <tr><td className="pr-4 opacity-50">02</td><td className="text-white/70">company:</td><td className="text-cyan-400 italic">'Tekon Private Limited',</td></tr>
                      <tr><td className="pr-4 opacity-50">03</td><td className="text-white/70">location:</td><td className="text-cyan-400 italic">'Dhaka, Bangladesh',</td></tr>
                      <tr><td className="pr-4 opacity-50">04</td><td className="text-white/70">followers:</td><td className="text-cyan-400 font-bold">164,</td></tr>
                      <tr><td className="pr-4 opacity-50">05</td><td className="text-white/70">skills:</td><td className="text-white">[</td></tr>
                      <tr><td className="pr-4 opacity-50">06</td><td></td><td className="text-cyan-400 italic">'React', 'NextJS', 'Tailwind',</td></tr>
                      <tr><td className="pr-4 opacity-50">07</td><td></td><td className="text-cyan-400 italic">'NodeJS', 'Express', 'AWS'],</td></tr>
                      <tr><td className="pr-4 opacity-50">08</td><td className="text-white/70">hireable:</td><td className="text-cyan-400 font-bold">true</td></tr>
                    </tbody>
                  </table>
                  <div className="mt-2 text-white">{'}'};</div>
                </div>
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
