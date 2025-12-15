import Layout from "@/components/Layout";
import { Image, Plus, Trash2, Download } from "lucide-react";
import { useState, useEffect } from "react";

interface GalleryImage {
  id: string;
  data: string;
  title: string;
  uploadDate: string;
}

export default function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isAdmin] = useState(localStorage.getItem("isAdmin") === "true");
  const [uploadTitle, setUploadTitle] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("galleryImages");
    if (saved) {
      setImages(JSON.parse(saved));
    }
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const newImage: GalleryImage = {
            id: Date.now().toString() + Math.random(),
            data: event.target?.result as string,
            title: uploadTitle || file.name,
            uploadDate: new Date().toLocaleDateString("id-ID"),
          };
          const newImages = [...images, newImage];
          setImages(newImages);
          localStorage.setItem("galleryImages", JSON.stringify(newImages));
          setUploadTitle("");
        };
        reader.readAsDataURL(file);
      });
    }
    e.currentTarget.value = "";
  };

  const handleDeleteImage = (id: string) => {
    if (confirm("Hapus foto ini?")) {
      const newImages = images.filter((img) => img.id !== id);
      setImages(newImages);
      localStorage.setItem("galleryImages", JSON.stringify(newImages));
    }
  };

  const handleDownloadZip = () => {
    if (images.length === 0) {
      alert("Belum ada foto untuk diunduh");
      return;
    }

    // Create a simple ZIP file using canvas and blob
    let htmlContent = `
      <html>
      <head>
        <title>Galeri Foto</title>
        <style>
          body { font-family: Arial; margin: 20px; }
          h1 { text-align: center; }
          .gallery { display: flex; flex-wrap: wrap; gap: 20px; justify-content: center; }
          .photo { border: 1px solid #ccc; padding: 10px; border-radius: 5px; }
          .photo img { max-width: 300px; height: auto; }
          .photo p { margin: 10px 0 0 0; font-size: 12px; color: #666; }
        </style>
      </head>
      <body>
        <h1>Galeri Dokumentasi Magang</h1>
        <div class="gallery">
    `;

    images.forEach((img, idx) => {
      htmlContent += `
        <div class="photo">
          <img src="${img.data}" alt="Foto ${idx + 1}">
          <p>${img.title}</p>
          <p>${img.uploadDate}</p>
        </div>
      `;
    });

    htmlContent += `
        </div>
      </body>
      </html>
    `;

    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "galeri-dokumentasi.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto animate-slide-in-left">
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Galeri Foto
            </h1>
            <p className="text-foreground/70">
              Dokumentasi visual dari aktivitas magang
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleDownloadZip}
              className="flex items-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-semibold hover:opacity-90 transition-all shadow-lg"
            >
              <Download className="w-5 h-5" />
              Download
            </button>
            {isAdmin && (
              <label className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-all shadow-lg cursor-pointer">
                <Plus className="w-5 h-5" />
                Unggah Foto
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>
        </div>

        {isAdmin && (
          <div className="bg-card border border-border rounded-xl p-6 shadow-lg mb-8">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Informasi Foto
            </h3>
            <input
              type="text"
              placeholder="Judul/deskripsi foto (opsional)"
              value={uploadTitle}
              onChange={(e) => setUploadTitle(e.target.value)}
              className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <p className="text-sm text-foreground/70 mt-2">
              Masukkan judul sebelum mengunggah foto untuk memberikan deskripsi
            </p>
          </div>
        )}

        {images.length === 0 ? (
          <div className="text-center py-16 bg-card border border-border rounded-xl">
            <Image className="w-16 h-16 text-foreground/30 mx-auto mb-4" />
            <p className="text-foreground/60 text-lg">
              Belum ada foto di galeri.
              {isAdmin && " Mulai dengan mengunggah foto!"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((image) => (
              <div
                key={image.id}
                className="group relative rounded-xl overflow-hidden shadow-lg card-hover"
              >
                <img
                  src={image.data}
                  alt={image.title}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <p className="text-white font-semibold">{image.title}</p>
                  <p className="text-white/70 text-sm">{image.uploadDate}</p>
                </div>
                {isAdmin && (
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      onClick={() => handleDeleteImage(image.id)}
                      className="p-3 bg-destructive text-white rounded-lg hover:opacity-90"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {!isAdmin && images.length > 0 && (
          <div className="mt-8 p-4 bg-muted/50 rounded-lg border border-border text-center text-foreground/70">
            <p>Mode Preview - Anda melihat halaman ini sebagai pengunjung.</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
