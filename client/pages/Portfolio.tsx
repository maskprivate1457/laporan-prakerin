import Layout from "@/components/Layout";
import { Briefcase, Plus, ExternalLink, Trash2, Code2, Zap } from "lucide-react";
import { useState, useEffect } from "react";

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  url?: string;
  createdAt: string;
}

export default function Portfolio() {
  const [items, setItems] = useState<PortfolioItem[]>(() => {
    const saved = localStorage.getItem("portfolioItems");
    return saved ? JSON.parse(saved) : [];
  });

  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    technologies: [] as string[],
    url: "",
  });
  const [techInput, setTechInput] = useState("");

  useEffect(() => {
    localStorage.setItem("portfolioItems", JSON.stringify(items));
  }, [items]);

  const handleAddItem = () => {
    if (!formData.title.trim() || !formData.description.trim()) {
      alert("Judul dan deskripsi harus diisi");
      return;
    }

    const newItem: PortfolioItem = {
      id: Date.now().toString(),
      ...formData,
      createdAt: new Date().toISOString(),
    };

    setItems([newItem, ...items]);
    resetForm();
    setIsAdding(false);
  };

  const handleDeleteItem = (id: string) => {
    if (confirm("Hapus item portofolio ini?")) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  const handleAddTech = () => {
    if (techInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        technologies: [...prev.technologies, techInput],
      }));
      setTechInput("");
    }
  };

  const handleRemoveTech = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      technologies: prev.technologies.filter((_, i) => i !== index),
    }));
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      technologies: [],
      url: "",
    });
    setTechInput("");
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8 flex justify-between items-start">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                Portofolio Kerja
              </h1>
              <p className="text-muted-foreground">
                Pamerkan hasil karya dan pencapaian selama magang
              </p>
            </div>
            <button
              onClick={() => {
                resetForm();
                setIsAdding(!isAdding);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              <Plus className="w-5 h-5" /> Tambah Karya
            </button>
          </div>

          {/* Add Form */}
          {isAdding && (
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Tambah Karya Baru
              </h2>

              <div className="space-y-6">
                {/* Title */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Judul Proyek/Karya
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    placeholder="Contoh: Website E-commerce, Mobile App"
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Deskripsi
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    placeholder="Jelaskan proyek ini, tujuan, dan peran Anda..."
                    rows={4}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                  />
                </div>

                {/* Technologies */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Teknologi yang Digunakan
                  </label>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={techInput}
                      onChange={(e) => setTechInput(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          handleAddTech();
                        }
                      }}
                      placeholder="Contoh: React, Node.js, MongoDB"
                      className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                    <button
                      onClick={handleAddTech}
                      className="px-4 py-2 bg-primary-100 text-primary-600 rounded-lg font-semibold hover:bg-primary-200 transition-colors"
                    >
                      Tambah
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.technologies.map((tech, index) => (
                      <div
                        key={index}
                        className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm flex items-center gap-2"
                      >
                        {tech}
                        <button
                          onClick={() => handleRemoveTech(index)}
                          className="hover:text-primary-900"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* URL */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Link (Opsional)
                  </label>
                  <input
                    type="url"
                    value={formData.url}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        url: e.target.value,
                      }))
                    }
                    placeholder="https://contoh.com"
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                {/* Buttons */}
                <div className="flex gap-4 pt-4">
                  <button
                    onClick={handleAddItem}
                    className="flex-1 px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                  >
                    Simpan Karya
                  </button>
                  <button
                    onClick={() => {
                      resetForm();
                      setIsAdding(false);
                    }}
                    className="flex-1 px-6 py-3 bg-muted text-foreground rounded-lg font-semibold hover:bg-muted/80 transition-colors"
                  >
                    Batal
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Portfolio Grid */}
          {items.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <Briefcase className="w-16 h-16 text-primary-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Belum ada karya di portofolio
              </h3>
              <p className="text-muted-foreground">
                Mulai dengan menambahkan proyek atau karya yang telah Anda
                selesaikan selama magang
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all group"
                >
                  {/* Header */}
                  <div className="p-6 bg-gradient-to-r from-primary-50 to-secondary-50 border-b border-border">
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {item.title}
                    </h3>
                    <div className="flex gap-2">
                      {item.url && (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-primary-100 text-primary-600 rounded-lg hover:bg-primary-200 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors ml-auto"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4">
                    <p className="text-muted-foreground text-sm">
                      {item.description}
                    </p>

                    {/* Technologies */}
                    {item.technologies.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Code2 className="w-4 h-4 text-primary-600" />
                          <p className="text-xs font-semibold text-foreground">
                            Teknologi
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {item.technologies.map((tech, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-primary-100 text-primary-700 rounded text-xs font-semibold"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Date */}
                    <p className="text-xs text-muted-foreground">
                      Ditambahkan{" "}
                      {new Date(item.createdAt).toLocaleDateString("id-ID")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Info Box */}
          <div className="mt-12 bg-white rounded-2xl p-8 shadow-lg">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-accent-100 rounded-lg">
                <Zap className="w-6 h-6 text-accent-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Tips Portofolio yang Menarik
                </h3>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  <li>
                    • Cantumkan proyek-proyek nyata yang telah Anda selesaikan
                  </li>
                  <li>
                    • Jelaskan peran dan kontribusi Anda dalam setiap proyek
                  </li>
                  <li>
                    • Gunakan teknologi dan tools yang relevan untuk industri
                  </li>
                  <li>
                    • Sertakan link jika proyek dapat diakses secara online
                  </li>
                  <li>
                    • Tambahkan deskripsi yang jelas dan singkat namun padat
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
