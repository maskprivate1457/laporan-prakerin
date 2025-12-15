import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import {
  User,
  Building2,
  BookOpen,
  Image,
  FileText,
  Briefcase,
  ArrowRight,
  CheckCircle2,
  Clock,
  Target,
} from "lucide-react";

export default function Index() {
  const features = [
    {
      icon: User,
      title: "Profil Mahasiswa",
      description:
        "Kelola data pribadi dan informasi akademik Anda dengan lengkap dan terstruktur.",
      path: "/profile",
    },
    {
      icon: Building2,
      title: "Informasi Perusahaan",
      description:
        "Dokumentasi lengkap tentang perusahaan tempat magang dan struktur organisasi.",
      path: "/company",
    },
    {
      icon: BookOpen,
      title: "Jurnal Harian",
      description:
        "Catat aktivitas harian magang dengan mudah. Tambah, edit, dan kelola entri jurnal.",
      path: "/journal",
    },
    {
      icon: Image,
      title: "Galeri Dokumentasi",
      description:
        "Unggah dan kelola foto dokumentasi kegiatan magang di perusahaan.",
      path: "/gallery",
    },
    {
      icon: FileText,
      title: "Laporan Bulanan",
      description:
        "Buat dan lihat laporan bulanan yang tersusun rapi dengan ringkasan aktivitas.",
      path: "/reports",
    },
    {
      icon: Briefcase,
      title: "Portofolio Kerja",
      description:
        "Pamerkan hasil karya dan pencapaian Anda selama melaksanakan magang.",
      path: "/portfolio",
    },
  ];

  const benefits = [
    {
      icon: CheckCircle2,
      title: "Terorganisir",
      description: "Semua dokumentasi magang tersimpan dalam satu platform",
    },
    {
      icon: Clock,
      title: "Efisien",
      description: "Hemat waktu dengan sistem input dan pencatatan yang mudah",
    },
    {
      icon: Target,
      title: "Profesional",
      description:
        "Laporan terstruktur dan siap untuk presentasi kepada institusi",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <div className="inline-block">
                <span className="px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-semibold">
                  Platform Magang Profesional
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Dokumentasi Magang yang
                <span className="text-primary-600"> Profesional</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg">
                PKL Hub adalah platform komprehensif untuk mendokumentasikan dan
                melaporkan kegiatan Praktik Kerja Lapangan Anda dengan
                terstruktur dan profesional.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/profile"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors shadow-lg"
                >
                  Mulai Sekarang <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/journal"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-primary-600 text-primary-600 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
                >
                  Lihat Jurnal
                </Link>
              </div>
            </div>
            <div className="hidden md:flex justify-center">
              <div className="relative w-full max-w-md aspect-square">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-3xl transform rotate-6 opacity-20"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-primary-300 to-secondary-300 rounded-3xl transform -rotate-3 opacity-30"></div>
                <div className="relative bg-white rounded-3xl shadow-2xl p-8 space-y-4">
                  <div className="h-3 w-20 bg-primary-200 rounded-full"></div>
                  <div className="space-y-3">
                    <div className="h-3 bg-primary-100 rounded-full w-full"></div>
                    <div className="h-3 bg-primary-100 rounded-full w-5/6"></div>
                    <div className="h-3 bg-secondary-100 rounded-full w-4/5"></div>
                  </div>
                  <div className="pt-4 space-y-2">
                    <div className="h-2 bg-primary-50 rounded-full"></div>
                    <div className="h-2 bg-primary-50 rounded-full w-3/4"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Fitur Lengkap untuk
              <span className="text-primary-600"> Dokumentasi Magang</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Semua yang Anda butuhkan untuk mencatat, mendokumentasikan, dan
              melaporkan kegiatan magang dalam satu platform terpadu.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Link
                  key={feature.path}
                  to={feature.path}
                  className="group p-8 rounded-2xl border border-border hover:border-primary-300 hover:shadow-lg hover:shadow-primary-100 transition-all duration-300 bg-white hover:bg-primary-50"
                  style={{
                    animationDelay: `${index * 50}ms`,
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary-100 rounded-xl group-hover:bg-primary-200 transition-colors">
                      <Icon className="w-6 h-6 text-primary-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary-600 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        {feature.description}
                      </p>
                      <div className="flex items-center gap-2 text-primary-600 font-semibold text-sm group-hover:gap-3 transition-all">
                        Akses <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-primary-700 to-primary-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Keuntungan Menggunakan PKL Hub
            </h2>
            <p className="text-lg text-primary-100 max-w-2xl mx-auto">
              Sistem dokumentasi magang yang dirancang untuk memudahkan proses
              pelaporan dan meningkatkan profesionalisme.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={index}
                  className="p-8 rounded-2xl bg-primary-600/30 backdrop-blur-sm border border-primary-500/50"
                >
                  <div className="p-3 bg-white/20 rounded-xl w-fit mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                  <p className="text-primary-100">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Siap Memulai Dokumentasi Magang Anda?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Mulai dari profil pribadi Anda dan lengkapi semua informasi yang
            diperlukan untuk dokumentasi magang yang profesional.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/profile"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors shadow-lg"
            >
              Buat Profil Saya <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/journal"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-secondary-600 text-white rounded-lg font-semibold hover:bg-secondary-700 transition-colors shadow-lg"
            >
              Mulai Jurnal <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
