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
      title: "Tentang Saya",
      description: "Mengenal lebih dekat profil, minat, dan latar belakang saya",
      path: "/profile",
    },
    {
      icon: Briefcase,
      title: "Pengalaman & Aktivitas",
      description: "Riwayat pengalaman, aktivitas, dan perjalanan yang saya jalani",
      path: "/experience",
    },
    {
      icon: BookOpen,
      title: "Catatan & Cerita",
      description:
        "Tulisan, pemikiran, dan dokumentasi perjalanan belajar saya",
      path: "/notes",
    },
    {
      icon: Image,
      title: "Galeri Pribadi",
      description: "Kumpulan visual yang merekam proses dan karya saya",
      path: "/gallery",
    },
    {
      icon: BarChart3,
      title: "Perkembangan Diri",
      description: "Tracking progres, skill, dan pencapaian yang terus bertumbuh",
      path: "/progress",
    },
    {
      icon: Briefcase,
      title: "Portofolio Karya",
      description: "Koleksi karya, proyek, dan hasil eksplorasi saya",
      path: "/portfolio",
    },
  ];

  const benefits = [
    {
      icon: CheckCircle,
      title: "Autentik",
      description: "Merepresentasikan diri saya apa adanya dengan jujur",
    },
    {
      icon: Shield,
      title: "Profesional",
      description: "Dikemas dengan pendekatan modern dan rapi",
    },
    {
      icon: Zap,
      title: "Dinamis",
      description: "Terus berkembang seiring perjalanan dan pengalaman baru",
    },
    {
      icon: Globe,
      title: "Terhubung",
      description: "Menjadi jembatan antara saya dan dunia luar",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-12 md:py-20 mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-6 animate-slide-in-left">
            <div className="animate-fade-in-up">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 leading-tight">
                Selamat Datang di{" "}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Ruang Pribadi Saya
                </span>
              </h1>
              <p className="text-lg text-foreground/70 leading-relaxed animate-fade-in-up delay-150">
                Ini adalah tempat saya merangkai cerita, karya, dan perjalanan.
                Sebuah representasi digital tentang siapa saya dan apa yang saya bangun.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-300">
              <Link
                to="/profile"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-semibold hover:opacity-90 transition-all duration-200 shadow-lg hover:shadow-xl group"
              >
                Jelajahi Profil
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/portfolio"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/5 transition-all duration-200"
              >
                Lihat Karya
              </Link>
            </div>
          </div>

          {/* Hero Illustration */}
          <div className="relative h-80 lg:h-96 animate-slide-in-right">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl animate-pulse"></div>
            <div className="absolute inset-4 border-2 border-primary/30 rounded-xl flex items-center justify-center animate-fade-in">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full mb-4 shadow-lg animate-float">
                  <span className="text-white text-3xl font-bold font-poppins">
                    ME
                  </span>
                </div>
                <p className="text-foreground/60 font-medium animate-fade-in-up">
                  Personal Space & Digital Identity
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-12 md:py-20 mb-12">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="section-title text-center">Eksplorasi Diri</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Setiap bagian merepresentasikan sisi berbeda dari perjalanan saya
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Link key={index} to={feature.path} className="group">
                <div className="h-full p-6 bg-card border border-border rounded-xl card-hover cursor-pointer animate-fade-in-up">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg mb-4 group-hover:from-primary/30 group-hover:to-secondary/30 transition-colors animate-float">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-foreground/70 text-sm mb-4">
                    {feature.description}
                  </p>
                  <div className="flex items-center text-primary font-semibold text-sm group-hover:translate-x-1 transition-transform">
                    Jelajahi <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 md:py-20 mb-12">
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 md:p-12 border border-primary/20 animate-fade-in-up">
          <h2 className="section-title mb-4">
            Mengapa Halaman Ini Ada?
          </h2>
          <p className="text-foreground/70 mb-10 max-w-2xl animate-fade-in-up delay-150">
            Karena setiap perjalanan layak untuk diceritakan dan ditunjukkan
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div key={index} className="flex gap-4 animate-fade-in-up">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary text-white animate-float">
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
          Mari Mengenal Saya Lebih Jauh
        </h2>
        <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
          Jelajahi cerita, karya, dan perjalanan yang saya bangun dengan sepenuh hati
        </p>
        <Link
          to="/profile"
          className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary rounded-lg font-semibold hover:bg-white/90 transition-all duration-200 shadow-lg hover:shadow-xl group"
        >
          Buka Profil
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </section>
    </Layout>
  );
}
