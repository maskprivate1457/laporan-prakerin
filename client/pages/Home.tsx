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

          {/* Hero Illustration */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start max-w-4xl mx-auto p-4 lg:p-6">
          {/* Left Side: Profile Photo and Bio */}
            <div className="relative bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 lg:p-8 text-white shadow-2xl">
              <div className="w-32 h-32 lg:w-40 lg:h-40 mx-auto rounded-full overflow-hidden border-4 border-white/30 shadow-lg mb-6"></div>
              <img 
                src="/path-to-your-photo.jpg" 
                alt="Profile Photo" 
                className="w-full h-full object-cover"
                />
            </div>
          <div className="text-center space-y-3">
            <h3 className="text-2xl lg:text-3xl font-bold font-poppins">Nama Anda</h3>
            <p className="text-indigo-100 text-lg lg:text-xl font-medium leading-relaxed">
              Crazy Programmer Profesional & Ambitious. Focus on include Frontend, Backend Engineering +
            </p>
            <div className="flex gap-2 justify-center flex-wrap pt-4">
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
                GET
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
                CV
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
                HIRE
              </div>
            </div>
          </div>
        </div>
          
          {/* Right Side: Company Info and Skills Code Block */}
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-gray-700/50 shadow-2xl">
            <div className="flex items-center gap-3 mb-6 p-4 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-xl border border-indigo-500/30">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <div>
                <h4 className="font-bold text-white text-lg">Abc Ltd</h4>
                <p className="text-gray-300 text-sm">Company: Dhaka, Bangladesh</p>
              </div>
            </div>
            {/* Skills Code Block */}
            <div className="bg-black/80 border-2 border-gray-700 rounded-xl overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-600/50 to-purple-600/50 px-6 py-4 border-b border-gray-700">
                <span className="text-indigo-100 text-sm font-mono tracking-wider">skills:</span>
              </div>
              <pre className="p-6 bg-gray-900/50 text-green-400 text-sm lg:text-base font-mono overflow-x-auto">
                <code>[
                  "Tailwind",
                  "Express", 
                  "HTML",
                  "CSS",
                  "Node",
                  "React"
                  ]</code>
              </pre>
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
