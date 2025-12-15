import Layout from "@/components/Layout";
import { FileText, Download, Plus, Edit2, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { downloadReportPDF } from "@/lib/pdfExport";

interface Report {
  id: string;
  month: string;
  status: "Draft" | "Selesai";
  summary: string;
  achievements: string;
  challenges: string;
  createdAt: number;
}

const defaultReports: Report[] = [
  {
    id: "1",
    month: "Januari 2024",
    status: "Selesai",
    summary: "Onboarding dan pembelajaran sistem perusahaan",
    achievements: "Memahami struktur organisasi dan workflow",
    challenges: "Adaptasi dengan tools baru",
    createdAt: Date.now() - 86400000 * 30,
  },
];

export default function MonthlyReport() {
  const [reports, setReports] = useState<Report[]>(defaultReports);
  const [isAdmin] = useState(localStorage.getItem("isAdmin") === "true");
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    month: "",
    status: "Draft" as const,
    summary: "",
    achievements: "",
    challenges: "",
  });

  useEffect(() => {
    const saved = localStorage.getItem("monthlyReports");
    if (saved) {
      setReports(JSON.parse(saved));
    }
  }, []);

  const saveReports = (newReports: Report[]) => {
    localStorage.setItem("monthlyReports", JSON.stringify(newReports));
    setReports(newReports);
  };

  const handleAddReport = () => {
    if (!formData.month.trim()) {
      alert("Bulan harus diisi");
      return;
    }

    if (editingId) {
      const updated = reports.map((report) =>
        report.id === editingId
          ? {
              ...report,
              month: formData.month,
              status: formData.status,
              summary: formData.summary,
              achievements: formData.achievements,
              challenges: formData.challenges,
            }
          : report
      );
      saveReports(updated);
      setEditingId(null);
    } else {
      const newReport: Report = {
        id: Date.now().toString(),
        month: formData.month,
        status: formData.status,
        summary: formData.summary,
        achievements: formData.achievements,
        challenges: formData.challenges,
        createdAt: Date.now(),
      };
      saveReports([newReport, ...reports]);
    }

    resetForm();
    setIsAdding(false);
  };

  const handleEditReport = (report: Report) => {
    setFormData({
      month: report.month,
      status: report.status,
      summary: report.summary,
      achievements: report.achievements,
      challenges: report.challenges,
    });
    setEditingId(report.id);
    setIsAdding(true);
  };

  const handleDeleteReport = (id: string) => {
    if (confirm("Hapus laporan ini?")) {
      saveReports(reports.filter((r) => r.id !== id));
    }
  };

  const handleDownload = (report: Report) => {
    downloadReportPDF(report);
  };

  const resetForm = () => {
    setFormData({
      month: "",
      status: "Draft",
      summary: "",
      achievements: "",
      challenges: "",
    });
    setEditingId(null);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto animate-slide-in-left">
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Laporan Bulanan
            </h1>
            <p className="text-foreground/70">
              Laporan komprehensif untuk setiap bulan magang
            </p>
          </div>
          {isAdmin && (
            <button
              onClick={() => {
                if (isAdding) resetForm();
                setIsAdding(!isAdding);
              }}
              className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-all shadow-lg"
            >
              <Plus className="w-5 h-5" />
              {isAdding ? "Batal" : "Laporan Baru"}
            </button>
          )}
        </div>

        {isAdding && isAdmin && (
          <div className="bg-card border border-border rounded-xl p-8 shadow-lg mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              {editingId ? "Edit Laporan" : "Buat Laporan Baru"}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Bulan
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Januari 2024"
                  value={formData.month}
                  onChange={(e) =>
                    setFormData({ ...formData, month: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      status: e.target.value as "Draft" | "Selesai",
                    })
                  }
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option value="Draft">Draft</option>
                  <option value="Selesai">Selesai</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Ringkasan Aktivitas
                </label>
                <textarea
                  placeholder="Ringkasan aktivitas yang dilakukan..."
                  value={formData.summary}
                  onChange={(e) =>
                    setFormData({ ...formData, summary: e.target.value })
                  }
                  rows={3}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Pencapaian
                </label>
                <textarea
                  placeholder="Pencapaian yang telah diraih..."
                  value={formData.achievements}
                  onChange={(e) =>
                    setFormData({ ...formData, achievements: e.target.value })
                  }
                  rows={3}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Tantangan
                </label>
                <textarea
                  placeholder="Tantangan yang dihadapi dan cara mengatasinya..."
                  value={formData.challenges}
                  onChange={(e) =>
                    setFormData({ ...formData, challenges: e.target.value })
                  }
                  rows={3}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                />
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleAddReport}
                  className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-all"
                >
                  {editingId ? "Simpan" : "Buat"}
                </button>
                <button
                  onClick={() => {
                    resetForm();
                    setIsAdding(false);
                  }}
                  className="flex-1 px-6 py-3 bg-muted text-foreground rounded-lg font-semibold hover:bg-muted/80 transition-all"
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {reports.length === 0 ? (
            <div className="text-center py-12 bg-card border border-border rounded-xl">
              <FileText className="w-12 h-12 text-foreground/30 mx-auto mb-4" />
              <p className="text-foreground/60 text-lg">
                Belum ada laporan. {isAdmin && "Mulai dengan membuat laporan!"}
              </p>
            </div>
          ) : (
            reports.map((report) => (
              <div
                key={report.id}
                className="bg-card border border-border rounded-xl p-6 shadow-lg card-hover"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      {report.month}
                    </h3>
                    <div className="space-y-2 text-sm text-foreground/70 mb-3">
                      <p>
                        <strong>Ringkasan:</strong> {report.summary}
                      </p>
                      <p>
                        <strong>Pencapaian:</strong> {report.achievements}
                      </p>
                      <p>
                        <strong>Tantangan:</strong> {report.challenges}
                      </p>
                    </div>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        report.status === "Selesai"
                          ? "bg-green-100 text-green-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {report.status}
                    </span>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => handleDownload(report)}
                      className="p-2 hover:bg-muted rounded-lg transition-colors text-secondary"
                    >
                      <Download className="w-5 h-5" />
                    </button>
                    {isAdmin && (
                      <>
                        <button
                          onClick={() => handleEditReport(report)}
                          className="p-2 hover:bg-muted rounded-lg transition-colors text-primary"
                        >
                          <Edit2 className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteReport(report.id)}
                          className="p-2 hover:bg-muted rounded-lg transition-colors text-destructive"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
}
