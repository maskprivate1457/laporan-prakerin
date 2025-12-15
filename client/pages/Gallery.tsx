import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Image, Plus, Trash2, ZoomIn, X } from "lucide-react";

interface GalleryItem {
  id: string;
  src: string;
  title: string;
  description: string;
  uploadDate: string;
}

export default function Gallery() {
  const [items, setItems] = useState<GalleryItem[]>(() => {
    const saved = localStorage.getItem("galleryItems");
    return saved ? JSON.parse(saved) : [];
  });

  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  // Save to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem("galleryItems", JSON.stringify(items));
  }, [items]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!formData.title.trim()) {
      alert("Silakan masukkan judul foto");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const imageData = event.target?.result as string;
      const newItem: GalleryItem = {
        id: Date.now().toString(),
        src: imageData,
        title: formData.title,
        description: formData.description,
        uploadDate: new Date().toISOString(),
      };

      setItems([newItem, ...items]);
      setFormData({ title: "", description: "" });
      setIsUploading(false);
    };

    reader.readAsDataURL(file);
  };

  const handleDelete = (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus foto ini?")) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8 flex justify-between items-start">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                Galeri Dokumentasi
              </h1>
              <p className="text-muted-foreground">
                Unggah dan kelola foto-foto dokumentasi kegiatan magang Anda
              </p>
            </div>
            <button
              onClick={() => setIsUploading(!isUploading)}
              className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              <Plus className="w-5 h-5" /> Unggah Foto
            </button>
          </div>

          {/* Upload Form */}
          {isUploading && (
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Unggah Foto Baru
              </h2>

              <div className="space-y-6">
                {/* Title */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Judul Foto
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
                    placeholder="Contoh: Meeting dengan Tim"
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
                    placeholder="Jelaskan isi foto ini..."
                    rows={3}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                  />
                </div>

                {/* File Upload */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Pilih Foto
                  </label>
                  <div className="border-2 border-dashed border-primary-300 rounded-lg p-8 text-center bg-primary-50 hover:bg-primary-100 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer flex flex-col items-center gap-3"
                    >
                      <Image className="w-8 h-8 text-primary-600" />
                      <div>
                        <p className="font-semibold text-foreground">
                          Klik untuk memilih atau drag & drop
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Format: JPG, PNG (Max 5MB)
                        </p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Cancel Button */}
                <button
                  onClick={() => {
                    setIsUploading(false);
                    setFormData({ title: "", description: "" });
                  }}
                  className="w-full px-6 py-3 bg-muted text-foreground rounded-lg font-semibold hover:bg-muted/80 transition-colors"
                >
                  Batal
                </button>
              </div>
            </div>
          )}

          {/* Gallery Grid */}
          {items.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <Image className="w-16 h-16 text-primary-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Belum ada foto
              </h3>
              <p className="text-muted-foreground">
                Mulai dengan mengunggah foto dokumentasi kegiatan magang Anda
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all"
                >
                  {/* Image Container */}
                  <div className="relative overflow-hidden bg-muted h-64">
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                      <button
                        onClick={() => setSelectedImage(item)}
                        className="p-3 bg-white rounded-full hover:bg-primary-100 transition-colors"
                      >
                        <ZoomIn className="w-6 h-6 text-primary-600" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-3 bg-white rounded-full hover:bg-red-100 transition-colors"
                      >
                        <Trash2 className="w-6 h-6 text-red-600" />
                      </button>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {item.description}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(item.uploadDate).toLocaleDateString("id-ID", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Image Preview Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white hover:text-primary-300 transition-colors"
              >
                <X className="w-8 h-8" />
              </button>
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="w-full h-auto rounded-2xl"
              />
              <div className="mt-4 bg-white rounded-lg p-4">
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {selectedImage.title}
                </h3>
                <p className="text-muted-foreground">{selectedImage.description}</p>
                <p className="text-xs text-muted-foreground mt-3">
                  {new Date(selectedImage.uploadDate).toLocaleDateString(
                    "id-ID",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
