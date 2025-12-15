import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import {
  BookOpen,
  Plus,
  Edit2,
  Trash2,
  X,
  Save,
  Calendar,
  Clock,
} from "lucide-react";

interface JournalEntry {
  id: string;
  date: string;
  time: string;
  title: string;
  content: string;
  activities: string[];
  createdAt: string;
}

export default function Journal() {
  const [entries, setEntries] = useState<JournalEntry[]>(() => {
    const saved = localStorage.getItem("journalEntries");
    return saved ? JSON.parse(saved) : [];
  });

  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<JournalEntry, "id" | "createdAt">>({
    date: new Date().toISOString().split("T")[0],
    time: new Date().toTimeString().slice(0, 5),
    title: "",
    content: "",
    activities: [],
  });
  const [activityInput, setActivityInput] = useState("");

  // Save to localStorage whenever entries change
  useEffect(() => {
    localStorage.setItem("journalEntries", JSON.stringify(entries));
  }, [entries]);

  const handleAddEntry = () => {
    if (!formData.title.trim() || !formData.content.trim()) {
      alert("Judul dan konten tidak boleh kosong");
      return;
    }

    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      ...formData,
      createdAt: new Date().toISOString(),
    };

    setEntries([newEntry, ...entries]);
    resetForm();
    setIsAdding(false);
  };

  const handleUpdateEntry = () => {
    if (!formData.title.trim() || !formData.content.trim()) {
      alert("Judul dan konten tidak boleh kosong");
      return;
    }

    setEntries(
      entries.map((entry) =>
        entry.id === editingId
          ? { ...entry, ...formData }
          : entry
      )
    );
    resetForm();
    setEditingId(null);
  };

  const handleDeleteEntry = (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus entri ini?")) {
      setEntries(entries.filter((entry) => entry.id !== id));
    }
  };

  const handleAddActivity = () => {
    if (activityInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        activities: [...prev.activities, activityInput],
      }));
      setActivityInput("");
    }
  };

  const handleRemoveActivity = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      activities: prev.activities.filter((_, i) => i !== index),
    }));
  };

  const resetForm = () => {
    setFormData({
      date: new Date().toISOString().split("T")[0],
      time: new Date().toTimeString().slice(0, 5),
      title: "",
      content: "",
      activities: [],
    });
    setActivityInput("");
  };

  const startEdit = (entry: JournalEntry) => {
    setFormData({
      date: entry.date,
      time: entry.time,
      title: entry.title,
      content: entry.content,
      activities: [...entry.activities],
    });
    setEditingId(entry.id);
  };

  const sortedEntries = [...entries].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8 flex justify-between items-start">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                Jurnal Harian
              </h1>
              <p className="text-muted-foreground">
                Catat dan kelola aktivitas harian magang Anda
              </p>
            </div>
            <button
              onClick={() => {
                resetForm();
                setEditingId(null);
                setIsAdding(!isAdding);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              <Plus className="w-5 h-5" /> Entri Baru
            </button>
          </div>

          {/* Add/Edit Form */}
          {(isAdding || editingId) && (
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {editingId ? "Edit Entri" : "Entri Jurnal Baru"}
              </h2>

              <div className="space-y-6">
                {/* Date and Time */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Tanggal
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          date: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Waktu
                    </label>
                    <input
                      type="time"
                      value={formData.time}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          time: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>

                {/* Title */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Judul Kegiatan
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
                    placeholder="Contoh: Pertemuan tim, Meeting dengan supervisor"
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                {/* Content */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Deskripsi Kegiatan
                  </label>
                  <textarea
                    value={formData.content}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        content: e.target.value,
                      }))
                    }
                    placeholder="Jelaskan secara detail kegiatan yang Anda lakukan hari ini..."
                    rows={6}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                  />
                </div>

                {/* Activities */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Daftar Aktivitas
                  </label>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={activityInput}
                      onChange={(e) => setActivityInput(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          handleAddActivity();
                        }
                      }}
                      placeholder="Tambahkan aktivitas..."
                      className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                    <button
                      onClick={handleAddActivity}
                      className="px-4 py-2 bg-primary-100 text-primary-600 rounded-lg font-semibold hover:bg-primary-200 transition-colors"
                    >
                      Tambah
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.activities.map((activity, index) => (
                      <div
                        key={index}
                        className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm flex items-center gap-2"
                      >
                        {activity}
                        <button
                          onClick={() => handleRemoveActivity(index)}
                          className="hover:text-primary-900"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-4 pt-4">
                  <button
                    onClick={editingId ? handleUpdateEntry : handleAddEntry}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                  >
                    <Save className="w-5 h-5" />
                    {editingId ? "Update Entri" : "Simpan Entri"}
                  </button>
                  <button
                    onClick={() => {
                      resetForm();
                      setEditingId(null);
                      setIsAdding(false);
                    }}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-muted text-foreground rounded-lg font-semibold hover:bg-muted/80 transition-colors"
                  >
                    <X className="w-5 h-5" /> Batal
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Entries List */}
          {entries.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <BookOpen className="w-16 h-16 text-primary-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Belum ada entri jurnal
              </h3>
              <p className="text-muted-foreground">
                Mulai dengan membuat entri pertama Anda tentang aktivitas hari
                ini
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {sortedEntries.map((entry) => (
                <div
                  key={entry.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  {/* Entry Header */}
                  <div className="p-6 border-b border-border bg-gradient-to-r from-primary-50 to-secondary-50">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-foreground">
                          {entry.title}
                        </h3>
                        <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(entry.date).toLocaleDateString("id-ID", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {entry.time}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => startEdit(entry)}
                          className="p-2 bg-primary-100 text-primary-600 rounded-lg hover:bg-primary-200 transition-colors"
                        >
                          <Edit2 className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteEntry(entry.id)}
                          className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Entry Content */}
                  <div className="p-6 space-y-4">
                    <div>
                      <p className="text-foreground whitespace-pre-wrap">
                        {entry.content}
                      </p>
                    </div>

                    {/* Activities */}
                    {entry.activities.length > 0 && (
                      <div>
                        <h4 className="text-sm font-semibold text-foreground mb-3">
                          Aktivitas:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {entry.activities.map((activity, index) => (
                            <div
                              key={index}
                              className="px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-sm"
                            >
                              {activity}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
