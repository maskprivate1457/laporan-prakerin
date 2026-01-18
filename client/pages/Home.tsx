import React, { useState } from "react"; // Tambahkan useState
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
  X, // Tambahkan X untuk close button
  Download,
} from "lucide-react";
import Layout from "@/components/Layout";

export default function Home() {
  // State untuk mengontrol Modal CV
  const [showCV, setShowCV] = useState(false);

  const features = [
    {
      icon: Users,
      title: "Profil Diri Selama PKL",
      description: "Informasi tentang saya, peran, dan tanggung jawab yang saya jalani selama Praktik Kerja Lapangan",
      path: "/profile",
    },
    {
      icon: Briefcase,
      title: "Tempat & Lingkungan PKL",
      description: "Gambaran perusahaan, divisi, serta budaya kerja yang saya rasakan selama PKL",
      path: "/company",
    },
    {
      icon: BookOpen,
      title: "Catatan Harian PKL",
      description: "Ringkasan aktivitas, tugas, dan pembelajaran yang saya alami setiap hari selama PKL",
      path: "/journal",
    },
    {
      icon: Image,
      title: "Dokumentasi Kegiatan",
      description: "Kumpulan foto dan visual aktivitas saya selama menjalani PKL",
      path: "/gallery",
    },
    {
      icon: BarChart3,
      title: "Progres & Evaluasi",
      description: "Perkembangan kemampuan dan pencapaian saya dari awal hingga akhir PKL",
      path: "/report",
    },
    {
      icon: Briefcase,
      title: "Hasil & Portofolio",
      description: "Karya, proyek, dan kontribusi nyata yang saya hasilkan selama PKL",
      path: "/portfolio",
    },
  ];

  const benefits = [
    {
      icon: CheckCircle,
      title: "Terstruktur",
      description: "Perjalanan PKL saya terdokumentasi rapi dari awal hingga akhir",
    },
    {
      icon: Shield,
      title: "Representatif",
      description: "Menampilkan citra diri yang profesional selama menjalani PKL",
    },
    {
      icon: Zap,
      title: "Berkembang",
      description: "Menunjukkan peningkatan skill dan pengalaman yang saya dapatkan",
    },
    {
      icon: Globe,
      title: "Terintegrasi",
      description: "Semua cerita, hasil, dan dokumentasi PKL saya dalam satu platform",
    },
  ];

  return (
    <Layout>
      {/* MODAL CV OVERLAY - Full Animation Effect */}
      {showCV && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-4xl bg-[#0d1117] border border-cyan-500/30 rounded-[2.5rem] overflow-hidden shadow-[0_0_50px_rgba(6,182,212,0.2)] animate-scale-in">
            
            {/* Close Button */}
            <button 
              onClick={() => setShowCV(false)}
              className="absolute top-6 right-6 z-[110] p-2 bg-white/5 hover:bg-red-500/20 rounded-full transition-colors group"
            >
              <X className="w-6 h-6 text-white group-hover:text-red-500" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-12 h-full max-h-[90vh] overflow-y-auto">
              {/* Sisi Kiri CV */}
              <div className="md:col-span-4 bg-gradient-to-b from-[#161b22] to-[#0d1117] p-8 border-r border-white/5 flex flex-col items-center text-center">
                <div className="relative w-32 h-32 mb-6 group">
                   <div className="absolute inset-0 bg-cyan-500 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                   <img src="https://via.placeholder.com/150" alt="Rizky" className="relative w-full h-full rounded-2xl object-cover border-2 border-cyan-500/50" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">Rizky Pratama</h3>
                <p className="text-cyan-400 text-sm font-medium mb-6">TKRO Specialist</p>
                
                <div className="w-full space-y-4 text-xs text-slate-400 text-left bg-white/5 p-4 rounded-2xl">
                   <div className="flex items-center gap-3"><Globe className="w-4 h-4 text-cyan-500" /> Bandung, 12 Mei 2007</div>
                   <div className="flex items-center gap-3"><Zap className="w-4 h-4 text-cyan-500" /> rizky.oto07@gmail.com</div>
                   <div className="flex items-center gap-3"><Shield className="w-4 h-4 text-cyan-500" /> 0812-xxxx-xxxx</div>
                </div>

                <div className="w-full mt-8 space-y-4">
                  <h4 className="text-[10px] uppercase font-bold tracking-widest text-slate-500 text-left">Expertise</h4>
                  {['Tune Up', 'Electrical', 'Braking'].map(s => (
                    <div key={s} className="space-y-1">
                      <div className="flex justify-between text-[10px] text-white"><span>{s}</span><span>90%</span></div>
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-cyan-500 w-[90%] shadow-[0_0_10px_#06b6d4]"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sisi Kanan CV */}
              <div className="md:col-span-8 p-8 md:p-12 space-y-8 bg-[#0d1117]">
                <section>
                  <h4 className="text-cyan-500 text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></div> Deskripsi Diri
                  </h4>
                  <p className="text-slate-400 text-sm leading-relaxed italic blockquote border-l-2 border-white/10 pl-4">
                    "Siswa SMK Negeri 2 Bandung jurusan Teknik Kendaraan Ringan Otomotif. Memiliki ketertarikan besar di bidang perbengkelan, servis ringan, dan sistem kelistrikan."
                  </p>
                </section>

                <div className="grid grid-cols-2 gap-8">
                  <section className="space-y-4">
                    <h4 className="text-white text-xs font-bold uppercase tracking-widest">Pendidikan</h4>
                    <div className="text-[13px] space-y-3">
                      <div className="text-slate-300">● SMKN 2 Bandung <br/><span className="text-[11px] text-slate-500">(2022-Sekarang)</span></div>
                      <div className="text-slate-300">● SMPN 5 Bandung <br/><span className="text-[11px] text-slate-500">(2019-2022)</span></div>
                    </div>
                  </section>
                  <section className="space-y-4">
                    <h4 className="text-white text-xs font-bold uppercase tracking-widest">Keterampilan</h4>
                    <div className="flex flex-wrap gap-2">
                      {['Ganti Oli', 'Sistem Rem', 'Teamwork'].map(t => (
                        <span key={t} className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-[10px] text-cyan-400">{t}</span>
                      ))}
                    </div>
                  </section>
                </div>

                <button className="w-full py-4 bg-cyan-600 hover:bg-cyan-500 text-white rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-900/20">
                  <Download className="w-5 h-5" /> Download PDF Resume
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
                selama Praktik Kerja Lapangan.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/profile" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-semibold hover:opacity-90 transition-all duration-200 shadow-lg hover:shadow-xl group">
                Lihat Profil Saya
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row items-stretch justify-center gap-8 mt-12 lg:mt-0 animate-slide-in-right">
            {/* KARTU KIRI: Profile Card */}
            <div className="flex-1 relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-3xl blur opacity-30 group-hover:opacity-100 transition duration-1000 animate-pulse"></div>
              <div className="relative bg-[#0d1117]/90 backdrop-blur-xl border border-white/10 rounded-3xl p-8 flex flex-col items-center text-center h-full shadow-2xl">
                <div className="relative w-32 h-32 mb-8 animate-float">
                  <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400 to-blue-500 rounded-full animate-spin-slow p-1">
                    <div className="w-full h-full bg-[#0d1117] rounded-full"></div>
                  </div>
                  <img src="https://via.placeholder.com/150" alt="User" className="relative z-10 w-full h-full rounded-full object-cover grayscale p-2" />
                  <div className="absolute bottom-1 right-2 z-20 shadow-lg animate-bounce">
                    <svg viewBox="0 0 24 24" className="w-7 h-7 fill-[#0095f6]">
                      <path d="M12.001 0c-1.341 0-2.394 1.054-3.735 1.054s-2.394-1.054-3.735-1.054-2.394 1.054-3.735 1.054v1.867c0 1.341-1.054 2.394-1.054 3.735s1.054 2.394 1.054 3.735H1.054c-1.341 0-2.394 1.054-2.394 2.394s1.054 2.394 2.394 2.394h1.867c0 1.341 1.054 2.394 1.054 3.735s-1.054 2.394-1.054 3.735c1.341 0 2.394-1.054 3.735-1.054s2.394 1.054 3.735 1.054 2.394-1.054 3.735-1.054 2.394 1.054 3.735 1.054c1.341 0 2.394-1.054 3.735-1.054s2.394 1.054 3.735 1.054 2.394-1.054 3.735-1.054v-1.867c0-1.341 1.054-2.394 1.054-3.735s-1.054-2.394-1.054-3.735h1.867c1.341 0 2.394-1.054 2.394-2.394s-1.054-2.394-2.394-2.394h-1.867c0-1.341-1.054-2.394-1.054-3.735s1.054-2.394 1.054-3.735c-1.341 0-2.394 1.054-3.735 1.054s-2.394-1.054-3.735-1.054z" />
                      <path fill="white" d="M10.4 14.7l-3.3-3.3 1.1-1.1 2.2 2.2 4.9-4.9 1.1 1.1z" />
                    </svg>
                  </div>
                </div>
                <p className="text-slate-300 text-[13px] leading-relaxed mb-8 font-medium italic">
                  "Crazy programmer Professional & Ambitious. Focus on Automotive Specialist & Engineering."
                </p>
                
                {/* CTA BUTTON - Trigger CV Modal */}
                <button 
                  onClick={() => setShowCV(true)}
                  className="relative overflow-hidden group flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full text-xs font-bold uppercase tracking-widest shadow-lg shadow-cyan-500/25 transition-all active:scale-95"
                >
                  <span className="relative z-10">Show Full CV</span>
                  <FileText className="w-4 h-4 relative z-10 group-hover:rotate-12 transition-transform" />
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                </button>
              </div>
            </div>

            {/* KARTU KANAN: Code Editor */}
            <div className="flex-[1.2] relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-3xl blur opacity-20 group-hover:opacity-60 transition duration-1000"></div>
              <div className="relative bg-[#050816] border border-white/10 rounded-3xl overflow-hidden h-full flex flex-col shadow-2xl">
                <div className="flex items-center justify-between px-6 py-4 bg-[#0d1117] border-b border-white/5">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                </div>
                <div className="p-8 font-mono text-sm leading-7 overflow-x-auto text-slate-300">
                  <div className="mb-2"><span className="text-cyan-400 font-bold">const</span> <span className="text-white">internInfo</span> = {'{'}</div>
                  <div className="ml-6">
                    name: <span className="text-cyan-400">'Rizky Pratama'</span>,<br/>
                    major: <span className="text-cyan-400">'TKRO'</span>,<br/>
                    status: <span className="text-cyan-400">'Active'</span>,<br/>
                    hireable: <span className="text-cyan-400 font-bold">true</span>
                  </div>
                  <div>{'}'};</div>
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
