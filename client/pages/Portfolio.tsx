import Layout from "@/components/Layout";
import { Code, ExternalLink, Plus, Edit2, Trash2, Download } from "lucide-react";
import { useState, useEffect } from "react";
import { downloadPortfolioPDF } from "@/lib/pdfExport";

interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  url: string;
}

export default function Portfolio() {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      title: "Dashboard Analytics",
      description: "Aplikasi dashboard untuk visualisasi data real-time",
      tech: ["React", "TypeScript", "Tailwind CSS"],
      url: "#",
    },
    {
      id: "2",
      title: "API Integration",
      description: "Integrasi REST API dengan sistem backend",
      tech: ["Node.js", "Express", "MongoDB"],
      url: "#",
    },
  ]);

  const [isAdmin] = useState(localStorage.getItem("isAdmin") === "true");
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tech: "",
    url: "",
  });

  useEffect(() => {
    const saved = localStorage.getItem("portfolioProjects");
    if (saved) {
      setProjects(JSON.parse(saved));
    }
  }, []);

  const saveProjects = (newProjects: Project[]) => {
    localStorage.setItem("portfolioProjects", JSON.stringify(newProjects));
    setProjects(newProjects);
  };

  const handleAddProject = () => {
    if (!formData.title.trim() || !formData.description.trim()) {
      alert("Judul dan deskripsi harus diisi");
      return;
    }

    if (editingId) {
      const updated = projects.map((project) =>
        project.id === editingId
          ? {
              ...project,
              title: formData.title,
              description: formData.description,
              tech: formData.tech
                .split(",")
                .map((t) => t.trim())
                .filter((t) => t),
              url: formData.url,
            }
          : project
      );
      saveProjects(updated);
      setEditingId(null);
    } else {
      const newProject: Project = {
        id: Date.now().toString(),
        title: formData.title,
        description: formData.description,
        tech: formData.tech
          .split(",")
          .map((t) => t.trim())
          .filter((t) => t),
        url: formData.url,
      };
      saveProjects([...projects, newProject]);
    }

    resetForm();
    setIsAdding(false);
  };

  const handleEditProject = (project: Project) => {
    setFormData({
      title: project.title,
      description: project.description,
      tech: project.tech.join(", "),
      url: project.url,
    });
    setEditingId(project.id);
    setIsAdding(true);
  };

  const handleDeleteProject = (id: string) => {
    if (confirm("Hapus proyek ini?")) {
      saveProjects(projects.filter((p) => p.id !== id));
    }
  };

  const handleDownload = () => {
    const portfolioData = {
      projects,
      achievements:
        "Berhasil mengimplementasikan berbagai proyek dengan teknologi terkini",
    };
    downloadPortfolioPDF(portfolioData);
  };

  const resetForm = () => {
    setFormData({ title: "", description: "", tech: "", url: "" });
    setEditingId(null);
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto animate-slide-in-left">
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Portofolio
            </h1>
            <p className="text-foreground/70">
              Pamerkan hasil kerja dan pencapaian selama magang
            </p>
          </div>
          <div className="flex gap-3">
            {isAdmin && (
              <>
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-semibold hover:opacity-90 transition-all shadow-lg"
                >
                  <Download className="w-5 h-5" />
                  Download
                </button>
                <button
                  onClick={() => {
                    if (isAdding) resetForm();
                    setIsAdding(!isAdding);
                  }}
                  className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-all shadow-lg"
                >
                  <Plus className="w-5 h-5" />
                  {isAdding ? "Batal" : "Proyek Baru"}
                </button>
              </>
            )}
          </div>
        </div>

        {isAdding && isAdmin && (
          <div className="bg-card border border-border rounded-xl p-8 shadow-lg mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              {editingId ? "Edit Proyek" : "Tambah Proyek Baru"}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Judul Proyek
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Dashboard Analytics"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Deskripsi
                </label>
                <textarea
                  placeholder="Deskripsi proyek..."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={4}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Teknologi (pisahkan dengan koma)
                </label>
                <input
                  type="text"
                  placeholder="React, TypeScript, Tailwind CSS"
                  value={formData.tech}
                  onChange={(e) =>
                    setFormData({ ...formData, tech: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  URL Proyek
                </label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={formData.url}
                  onChange={(e) =>
                    setFormData({ ...formData, url: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleAddProject}
                  className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-all"
                >
                  {editingId ? "Simpan" : "Tambah"}
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-card border border-border rounded-xl overflow-hidden shadow-lg card-hover flex flex-col"
            >
              <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <Code className="w-16 h-16 text-primary" />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {project.title}
                </h3>
                <p className="text-foreground/70 mb-4 flex-1">
                  {project.description}
                </p>
                <div className="mb-4 flex flex-wrap gap-2">
                  {project.tech.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <a
                    href={project.url}
                    className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold transition-colors"
                  >
                    Lihat Proyek
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  {isAdmin && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditProject(project)}
                        className="p-2 hover:bg-muted rounded-lg transition-colors text-primary"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteProject(project.id)}
                        className="p-2 hover:bg-muted rounded-lg transition-colors text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-xl p-8">
          <h3 className="text-xl font-bold text-foreground mb-4">
            Highlights & Pencapaian
          </h3>
          <div className="space-y-3 text-foreground/80">
            <p className="flex items-start gap-3">
              <span className="text-primary font-bold text-lg">✓</span>
              <span>
                Berhasil mengimplementasikan fitur dashboard dalam 2 minggu
              </span>
            </p>
            <p className="flex items-start gap-3">
              <span className="text-primary font-bold text-lg">✓</span>
              <span>Meningkatkan performa aplikasi sebesar 40%</span>
            </p>
            <p className="flex items-start gap-3">
              <span className="text-primary font-bold text-lg">✓</span>
              <span>
                Menguasai teknologi baru: TypeScript dan React Hooks
              </span>
            </p>
            <p className="flex items-start gap-3">
              <span className="text-primary font-bold text-lg">✓</span>
              <span>
                Kolaborasi tim yang efektif menggunakan Git dan Agile
              </span>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
