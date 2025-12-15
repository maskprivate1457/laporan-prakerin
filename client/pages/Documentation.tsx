import Layout from "@/components/Layout";
import { FileText, Clock, CheckCircle, AlertCircle } from "lucide-react";

export default function Documentation() {
  const documents = [
    {
      title: "Panduan Penulisan Laporan",
      date: "2024-01-15",
      status: "Published",
      icon: FileText,
    },
    {
      title: "Template Jurnal Harian",
      date: "2024-01-10",
      status: "Published",
      icon: FileText,
    },
    {
      title: "Checklist Dokumentasi",
      date: "2024-01-05",
      status: "Updated",
      icon: CheckCircle,
    },
  ];

  return (
    <Layout>
      <div className="max-w-4xl mx-auto animate-slide-in-left">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Sistem Dokumentasi
          </h1>
          <p className="text-foreground/70">
            Panduan lengkap dan tools untuk pelaporan aktivitas harian
          </p>
        </div>

        <div className="space-y-6 mb-12">
          {documents.map((doc, idx) => {
            const IconComponent = doc.icon;
            return (
              <div
                key={idx}
                className="bg-card border border-border rounded-xl p-6 shadow-lg card-hover"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      {doc.title}
                    </h3>
                    <div className="flex items-center gap-4">
                      <span className="text-foreground/70 text-sm flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {new Date(doc.date).toLocaleDateString("id-ID")}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          doc.status === "Published"
                            ? "bg-green-100 text-green-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {doc.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-xl p-8">
          <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
            <AlertCircle className="w-6 h-6 text-primary" />
            Checklist Dokumentasi Lengkap
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-foreground mb-3">
                Harian
              </h4>
              <ul className="space-y-2">
                {[
                  "Jurnal aktivitas",
                  "Dokumentasi foto",
                  "Pencatatan mood kerja",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-foreground/80">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">
                Bulanan
              </h4>
              <ul className="space-y-2">
                {[
                  "Laporan ringkasan",
                  "Analisis pencapaian",
                  "Rencana pengembangan",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-foreground/80">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
