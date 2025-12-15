import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Calendar, X, Save, Download } from "lucide-react";
import Layout from "@/components/Layout";
import { downloadJournalPDF } from "@/lib/pdfExport";

interface JournalEntry {
  id: string;
  date: string;
  title: string;
  content: string;
  activities: string[];
  mood: "produktif" | "normal" | "lelah";
  image?: string;
  createdAt: number;
}

export default function Journal() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [isAddingEntry, setIsAddingEntry] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(
    localStorage.getItem("isAdmin") === "true"
  );

  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    title: "",
    content: "",
    activities: "",
    mood: "normal" as const,
    image: "",
  });

  useEffect(() => {
    const saved = localStorage.getItem("journalEntries");
    if (saved) {
      setEntries(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAdmin(localStorage.getItem("isAdmin") === "true");
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const saveEntries = (newEntries: JournalEntry[]) => {
    localStorage.setItem("journalEntries", JSON.stringify(newEntries));
    setEntries(newEntries);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData({ ...formData, image: event.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddEntry = () => {
    if (!formData.title.trim() || !formData.content.trim()) {
      alert("Judul dan konten harus diisi");
      return;
    }

    if (editingId) {
      const updated = entries.map((entry) =>
        entry.id === editingId
          ? {
              ...entry,
              date: formData.date,
              title: formData.title,
              content: formData.content,
              activities: formData.activities
                .split("\n")
                .filter((a) => a.trim()),
              mood: formData.mood,
              image: formData.image || entry.image,
            }
          : entry
      );
      saveEntries(updated);
      setEditingId(null);
    } else {
      const newEntry: JournalEntry = {
        id: Date.now().toString(),
        date: formData.date,
        title: formData.title,
        content: formData.content,
        activities: formData.activities
          .split("\n")
          .filter((a) => a.trim()),
        mood: formData.mood,
        image: formData.image,
        createdAt: Date.now(),
      };
      saveEntries([newEntry, ...entries]);
    }

    resetForm();
    setIsAddingEntry(false);
  };

  const handleEditEntry = (entry: JournalEntry) => {
    setFormData({
      date: entry.date,
      title: entry.title,
      content: entry.content,
      activities: entry.activities.join("\n"),
      mood: entry.mood,
      image: entry.image || "",
    });
    setEditingId(entry.id);
    setIsAddingEntry(true);
  };

  const handleDeleteEntry = (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus entri ini?")) {
      saveEntries(entries.filter((e) => e.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({
      date: new Date().toISOString().split("T")[0],
      title: "",
      content: "",
      activities: "",
      mood: "normal",
      image: "",
    });
    setEditingId(null);
  };

  const handleExportPDF = () => {
    if (entries.length === 0) {
      alert("Belum ada entri untuk diekspor");
      return;
    }
    downloadJournalPDF(entries);
  };

  const moodColors = {
    produktif: "bg-green-100 text-green-700 border-green-300",
    normal: "bg-blue-100 text-blue-700 border-blue-300",
    lelah: "bg-orange-100 text-orange-700 border-orange-300",
  };

  const sortedEntries = [...entries].sort((a, b) => b.createdAt - a.createdAt);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto animate-slide-in-left">
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Jurnal Harian
            </h1>
            <p className="text-foreground/70">
              Catat aktivitas dan pengalaman harian magang Anda
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleExportPDF}
              className="flex items-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-semibold hover:opacity-90 transition-all shadow-lg"
            >
              <Download className="w-5 h-5" />
              Export PDF
            </button>
            {isAdmin && (
              <button
                onClick={() => {
                  if (isAddingEntry) {
                    resetForm();
                  }
                  setIsAddingEntry(!isAddingEntry);
                }}
                className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-all shadow-lg"
              >
                <Plus className="w-5 h-5" />
                {isAddingEntry ? "Batal" : "Entri Baru"}
              </button>
            )}
          </div>
        </div>

        {isAddingEntry && isAdmin && (
          <div className="bg-card border border-border rounded-xl p-8 shadow-lg mb-8 animate-slide-in-left">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              {editingId ? "Edit Entri" : "Tambah Entri Baru"}
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Tanggal
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Mood Kerja
                </label>
                <div className="flex gap-3">
                  {(["produktif", "normal", "lelah"] as const).map((mood) => (
                    <button
                      key={mood}
                      onClick={() => setFormData({ ...formData, mood })}
                      className={`px-4 py-2 rounded-lg font-medium capitalize transition-all ${
                        formData.mood === mood
                          ? moodColors[mood] + " ring-2 ring-offset-2 ring-current"
                          : "bg-muted text-foreground"
                      }`}
                    >
                      {mood}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Judul Entri
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Mengerjakan dashboard analytics"
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
                  placeholder="Tuliskan deskripsi lengkap tentang kegiatan Anda hari ini..."
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  rows={6}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Unggah Foto
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                {formData.image && (
                  <div className="mt-4">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="max-w-xs rounded-lg"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Aktivitas (satu baris per aktivitas)
                </label>
                <textarea
                  placeholder="Aktivitas 1&#10;Aktivitas 2&#10;Aktivitas 3"
                  value={formData.activities}
                  onChange={(e) =>
                    setFormData({ ...formData, activities: e.target.value })
                  }
                  rows={4}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                />
              </div>

              <div className="flex gap-4 pt-4 border-t border-border">
                <button
                  onClick={handleAddEntry}
                  className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-all"
                >
                  <Save className="w-5 h-5" />
                  {editingId ? "Simpan Perubahan" : "Tambah Entri"}
                </button>
                <button
                  onClick={() => {
                    resetForm();
                    setIsAddingEntry(false);
                  }}
                  className="flex items-center gap-2 px-6 py-3 bg-muted text-foreground rounded-lg font-semibold hover:bg-muted/80 transition-all"
                >
                  <X className="w-5 h-5" />
                  Batal
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-6">
          {sortedEntries.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="w-12 h-12 text-foreground/30 mx-auto mb-4" />
              <p className="text-foreground/60 text-lg">
                Belum ada entri jurnal.{" "}
                {isAdmin && "Mulai dengan menambah entri baru!"}
              </p>
            </div>
          ) : (
            sortedEntries.map((entry) => (
              <div
                key={entry.id}
                className="bg-card border border-border rounded-xl p-6 shadow-lg card-hover"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex items-center gap-2 text-foreground/70 text-sm">
                        <Calendar className="w-4 h-4" />
                        {new Date(entry.date).toLocaleDateString("id-ID", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold border capitalize ${
                          moodColors[entry.mood]
                        }`}
                      >
                        {entry.mood}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">
                      {entry.title}
                    </h3>
                  </div>

                  {isAdmin && (
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => handleEditEntry(entry)}
                        className="p-2 hover:bg-muted rounded-lg transition-colors text-primary"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteEntry(entry.id)}
                        className="p-2 hover:bg-muted rounded-lg transition-colors text-destructive"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </div>

                {entry.image && (
                  <div className="mb-4">
                    <img
                      src={entry.image}
                      alt={entry.title}
                      className="max-w-md rounded-lg"
                    />
                  </div>
                )}

                <p className="text-foreground/80 mb-4 leading-relaxed whitespace-pre-wrap">
                  {entry.content}
                </p>

                {entry.activities.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-semibold text-foreground mb-2 text-sm">
                      Aktivitas:
                    </h4>
                    <ul className="space-y-2">
                      {entry.activities.map((activity, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-foreground/80"
                        >
                          <span className="text-primary font-bold mt-0.5">
                            •
                          </span>
                          <span>{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {!isAdmin && (
          <div className="mt-8 p-4 bg-muted/50 rounded-lg border border-border text-center text-foreground/70">
            <p>Mode Preview - Anda melihat halaman ini sebagai pengunjung.</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
