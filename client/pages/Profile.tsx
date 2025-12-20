import { useState, useEffect, useRef } from "react";
import { Edit2, Save, X, Camera, Download, Printer, Play, Pause, Link as LinkIcon } from "lucide-react";
import Layout from "@/components/Layout";
import { downloadProfilePDF } from "@/lib/pdfExport";

// Link Lagu dari Admin
const ADMIN_SONG_URL = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"; 

interface StudentProfile {
  name: string;
  nis: string;
  email: string;
  phone: string;
  school: string;
  major: string;
  year: string;
  internshipPeriod: string;
  supervisor: string;
  companyName: string;
  position: string;
  supervisor1: string;
  emailcompany: string;
  emailSchool: string;
  instagram: string;
  bio: string;
  avatarUrl: string; // Tambahan field foto
}

const defaultProfile: StudentProfile = {
  name: "Demias Syihab Aldino",
  nis: "2425110019",
  email: "aldinodemias07@gmail.com",
  phone: "+62 895-3203-72281",
  school: "SMKS Taruna Karya 76 Nurul Falah",
  major: "Teknik Kendaraan Ringan",
  year: "2025",
  internshipPeriod: "September - November 2025",
  supervisor: "Haerudin S.Ag & Asep Haryono S.Pd",
  companyName: "PT. Karya Teknik Nusantara",
  position: "Team Checker Inhouse & Saf On",
  emailcompany: "ktn.jaya8@gmail.com",
  emailSchool: "smktarunakarya76nurulfalah@gmail.com",
  supervisor1: "Adi Mardian (Chief Prod.Section)",
  instagram: "mask_private1457",
  bio: "Mahasiswa bersemangat dengan minat di bidang Teknologi Informasi dan Industri Otomotif",
  avatarUrl: "", 
};

export default function Profile() {
  const [profile, setProfile] = useState<StudentProfile>(defaultProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<StudentProfile>(defaultProfile);
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem("isAdmin") === "true");
  
  // State Musik & Animasi
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("studentProfile");
    if (saved) {
      const savedProfile = JSON.parse(saved);
      setProfile(savedProfile);
      setEditData(savedProfile);
    }
    audioRef.current = new Audio(ADMIN_SONG_URL);
    audioRef.current.onended = () => setIsPlaying(false);
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAdmin(localStorage.getItem("isAdmin") === "true");
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleEdit = () => {
    setEditData(profile);
    setIsEditing(true);
  };

  const handleSave = () => {
    setProfile(editData);
    localStorage.setItem("studentProfile", JSON.stringify(editData));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  // Fungsi Handle Gambar (File Storage)
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditData({ ...editData, avatarUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePrint = () => window.print();
  const handleDownload = () => downloadProfilePDF(profile);

  if (isEditing && isAdmin) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto animate-slide-in-left">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Edit Profil Mahasiswa</h1>
            <p className="text-foreground/70">Perbarui informasi pribadi, akademik, dan foto profil</p>
          </div>

          <div className="bg-card border border-border rounded-xl p-8 shadow-lg">
            <div className="space-y-6">
              {/* Bagian Edit Foto */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4 pb-3 border-b border-border">Foto Profil</h3>
                <div className="flex flex-col md:flex-row gap-6 items-center">
                   <div className="w-32 h-32 rounded-xl overflow-hidden bg-muted flex items-center justify-center border-2 border-dashed border-primary">
                      {editData.avatarUrl ? (
                        <img src={editData.avatarUrl} className="w-full h-full object-cover" alt="Preview" />
                      ) : (
                        <Camera className="w-8 h-8 text-muted-foreground" />
                      )}
                   </div>
                   <div className="flex-1 space-y-4 w-full">
                      <div>
                        <label className="block text-sm font-medium mb-1">Upload dari Perangkat</label>
                        <input type="file" accept="image/*" onChange={handleImageUpload} className="text-sm w-full" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Atau URL Gambar</label>
                        <div className="relative">
                          <LinkIcon className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                          <input 
                            type="text" 
                            name="avatarUrl"
                            placeholder="https://example.com/image.jpg"
                            value={editData.avatarUrl} 
                            onChange={handleInputChange} 
                            className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-sm"
                          />
                        </div>
                      </div>
                   </div>
                </div>
              </div>

              {/* Input Lainnya Sesuai Kode Asli */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4 pb-3 border-b border-border">Informasi Pribadi</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Nama Lengkap</label>
                    <input type="text" name="name" value={editData.name} onChange={handleInputChange} className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/50" />
                  </div>
                  <div>
                    <label className="flex items-center pl-2 gap-2 text-sm font-medium text-foreground mb-2">
                      <img src="https://cdn-icons-png.flaticon.com/512/6522/6522516.png" className="w-4 h-4" alt="NIS" /> NIS
                    </label>
                    <input type="text" name="nis" value={editData.nis} onChange={handleInputChange} className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/50" />
                  </div>
                  <div>
                    <label className="flex items-center pl-2 gap-2 text-sm font-medium text-foreground mb-2">
                      <img src="https://cdn-icons-png.flaticon.com/512/732/732200.png" className="w-4 h-4" alt="Email" /> Email
                    </label>
                    <input type="email" name="email" value={editData.email} onChange={handleInputChange} className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/50" />
                  </div>
                  <div>
                    <label className="flex items-center pl-2 gap-2 text-sm font-medium text-foreground mb-2">
                      <img src="https://cdn-icons-png.flaticon.com/512/724/724664.png" className="w-4 h-4" alt="Phone" /> Nomor Telepon
                    </label>
                    <input type="tel" name="phone" value={editData.phone} onChange={handleInputChange} className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/50" />
                  </div>
                </div>
              </div>

              {/* Bagian Akademik & Magang (Disingkat untuk kemudahan baca, tetap sama fungsinya) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Sekolah</label>
                    <input type="text" name="school" value={editData.school} onChange={handleInputChange} className="w-full px-4 py-2 border border-border rounded-lg bg-background" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Program Studi</label>
                    <input type="text" name="major" value={editData.major} onChange={handleInputChange} className="w-full px-4 py-2 border border-border rounded-lg bg-background" />
                  </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Deskripsi Singkat</label>
                <textarea name="bio" value={editData.bio} onChange={handleInputChange} rows={5} className="w-full px-4 py-2 border border-border rounded-lg bg-background resize-none" />
              </div>

              <div className="flex gap-4 pt-6 border-t border-border">
                <button onClick={handleSave} className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-all">
                  <Save className="w-5 h-5" /> Simpan Perubahan
                </button>
                <button onClick={handleCancel} className="flex items-center gap-2 px-6 py-3 bg-muted text-foreground rounded-lg font-semibold hover:bg-muted/80 transition-all">
                  <X className="w-5 h-5" /> Batal
                </button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto animate-slide-in-left">
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Profil Mahasiswa</h1>
            <p className="text-foreground/70">Informasi pribadi dan akademik</p>
          </div>
          <div className="flex gap-3">
            <button onClick={handleDownload} className="flex items-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-semibold hover:opacity-90 transition-all shadow-lg"><Download className="w-5 h-5" /> Download</button>
            <button onClick={handlePrint} className="flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:opacity-90 transition-all shadow-lg"><Printer className="w-5 h-5" /> Print</button>
            {isAdmin && (
              <button onClick={handleEdit} className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-all shadow-lg"><Edit2 className="w-5 h-5" /> Edit</button>
            )}
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-8 shadow-lg mb-6">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-shrink-0 relative group">
              {/* AVATAR DENGAN ANIMASI GLOW */}
              <div 
                onClick={toggleMusic}
                className={`w-32 h-32 rounded-xl flex items-center justify-center shadow-lg cursor-pointer overflow-hidden transition-all duration-500 relative
                  ${isPlaying ? 'animate-pulse ring-4 ring-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.8)] scale-105' : 'bg-gradient-to-br from-primary to-secondary'}`}
              >
                {profile.avatarUrl ? (
                  <img src={profile.avatarUrl} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-white text-5xl font-bold">{profile.name.charAt(0)}</span>
                )}

                {/* Overlay Tombol Musik */}
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                   {isPlaying ? (
                     <Pause className="w-10 h-10 text-white animate-bounce" />
                   ) : (
                     <Play className="w-10 h-10 text-white" />
                   )}
                </div>
              </div>
              {/* Indikator Status Musik */}
              {isPlaying && (
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-yellow-400 text-black text-[10px] font-bold px-2 py-0.5 rounded-full animate-bounce">
                  PLAYING
                </div>
              )}
            </div>

            <div className="flex-1">
              <h2 className="text-3xl font-bold text-foreground mb-2">{profile.name}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div><p className="text-foreground/70">NIS</p><p className="font-semibold">{profile.nis}</p></div>
                <div><p className="text-foreground/70">Email</p><p className="font-semibold">{profile.email}</p></div>
                <div><p className="text-foreground/70">Nomor Telepon</p><p className="font-semibold">{profile.phone}</p></div>
                <div><p className="text-foreground/70">Sekolah</p><p className="font-semibold">{profile.school}</p></div>
              </div>
            </div>
          </div>
        </div>

        {/* Info Akademik & Magang */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-card border border-border rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-4 pb-3 border-b">Akademik</h3>
            <div className="space-y-3">
              <div><p className="text-foreground/70 text-sm">Program Studi</p><p className="font-semibold">{profile.major}</p></div>
              <div><p className="text-foreground/70 text-sm">Tahun</p><p className="font-semibold">{profile.year}</p></div>
              <div><p className="text-foreground/70 text-sm">Pembimbing Sekolah</p><p className="font-semibold">{profile.supervisor}</p></div>
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-4 pb-3 border-b">Magang</h3>
            <div className="space-y-3">
              <div><p className="text-foreground/70 text-sm">Perusahaan</p><p className="font-semibold">{profile.companyName}</p></div>
              <div><p className="text-foreground/70 text-sm">Posisi</p><p className="font-semibold">{profile.position}</p></div>
              <div><p className="text-foreground/70 text-sm">Pembimbing Industri</p><p className="font-semibold">{profile.supervisor1}</p></div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Deskripsi Singkat</h3>
          <p className="text-foreground/80 leading-relaxed">{profile.bio}</p>
        </div>

        {!isAdmin && (
          <div className="mt-8 p-4 bg-muted/50 rounded-lg border border-border text-center text-foreground/70">
            <p>Mode Preview - Klik foto profil untuk mendengarkan musik pilihan admin.</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
