import Layout from "@/components/Layout";
import { FileText, Plus, Download, Eye } from "lucide-react";
import { Link } from "react-router-dom";

export default function Reports() {
  const sampleReports = [
    {
      id: 1,
      title: "Laporan Januari 2024",
      period: "1 - 31 Januari 2024",
      status: "Siap",
      description: "Laporan bulanan aktivitas magang bulan pertama",
    },
    {
      id: 2,
      title: "Laporan Februari 2024",
      period: "1 - 29 Februari 2024",
      status: "Siap",
      description: "Laporan bulanan aktivitas magang bulan kedua",
    },
    {
      id: 3,
      title: "Laporan Maret 2024",
      period: "1 - 31 Maret 2024",
      status: "Dalam Proses",
      description: "Laporan bulanan aktivitas magang bulan ketiga",
    },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
              Laporan Bulanan
            </h1>
            <p className="text-muted-foreground">
              Buat, lihat, dan kelola laporan bulanan aktivitas magang Anda
            </p>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary-100 rounded-lg">
                  <FileText className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Laporan</p>
                  <p className="text-2xl font-bold text-foreground">
                    {sampleReports.length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-secondary-100 rounded-lg">
                  <FileText className="w-6 h-6 text-secondary-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Laporan Siap</p>
                  <p className="text-2xl font-bold text-foreground">2</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-accent-100 rounded-lg">
                  <FileText className="w-6 h-6 text-accent-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Dalam Proses</p>
                  <p className="text-2xl font-bold text-foreground">1</p>
                </div>
              </div>
            </div>
          </div>

          {/* Reports List */}
          <div className="space-y-4 mb-12">
            {sampleReports.map((report) => (
              <div
                key={report.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="p-6 border-b border-border flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {report.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {report.period}
                    </p>
                    <p className="text-foreground">{report.description}</p>
                  </div>
                  <div className="ml-4">
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-semibold ${
                        report.status === "Siap"
                          ? "bg-secondary-100 text-secondary-700"
                          : "bg-accent-100 text-accent-700"
                      }`}
                    >
                      {report.status}
                    </span>
                  </div>
                </div>
                <div className="px-6 py-4 bg-muted/30 flex gap-4">
                  <button className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors">
                    <Eye className="w-4 h-4" /> Lihat
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 border-2 border-primary-600 text-primary-600 rounded-lg font-semibold hover:bg-primary-50 transition-colors">
                    <Download className="w-4 h-4" /> Download
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Action Button */}
          <div className="text-center">
            <button className="inline-flex items-center gap-2 px-8 py-4 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors shadow-lg">
              <Plus className="w-5 h-5" /> Buat Laporan Baru
            </button>
          </div>

          {/* Info Box */}
          <div className="mt-12 bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-4">
              Tentang Laporan Bulanan
            </h3>
            <p className="text-muted-foreground mb-4">
              Laporan bulanan adalah ringkasan terstruktur dari semua aktivitas,
              pembelajaran, dan pencapaian yang Anda capai selama bermagang.
              Laporan ini biasanya mencakup:
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="text-primary-600 font-bold">•</span>
                <span>Ringkasan aktivitas harian dan mingguan</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-secondary-600 font-bold">•</span>
                <span>Daftar tugas dan tanggung jawab yang diberikan</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary-600 font-bold">•</span>
                <span>Pencapaian dan keterampilan yang dipelajari</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-secondary-600 font-bold">•</span>
                <span>Kendala atau tantangan yang dihadapi dan solusinya</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary-600 font-bold">•</span>
                <span>Dokumentasi dengan foto dan bukti pekerjaan</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}
