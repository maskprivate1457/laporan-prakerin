import { useState, useEffect, useRef } from "react";
import { Edit2, Save, X, Camera, Download, Printer, Upload, Link as LinkIcon, Play, Pause, CheckCircle2 } from "lucide-react";
import Layout from "@/components/Layout";
import { downloadProfilePDF } from "@/lib/pdfExport";

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
  avatar?: string;
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
  avatar: "",
};

export default function Profile() {
  const [profile, setProfile] = useState<StudentProfile>(defaultProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<StudentProfile>(defaultProfile);
  const [showToast, setShowToast] = useState(false); // State baru untuk Toast
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isAdmin, setIsAdmin] = useState(
    localStorage.getItem("isAdmin") === "true"
  );

  // --- KODE EDITAN: LOGIKA DJ SET AUDIO & ANIMASI ---
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3");
      audioRef.current.loop = true;
    }

    const savedMusicStatus = localStorage.getItem("musicPlaying") === "true";
    if (savedMusicStatus) {
      setIsPlaying(true);
      audioRef.current.play().catch(() => {
        setIsPlaying(false);
        localStorage.setItem("musicPlaying", "false");
      });
    }
  }, []);

  const handlePlay = () => {
    audioRef.current?.play().catch((err) => console.log("Playback error:", err));
    setIsPlaying(true);
    localStorage.setItem("musicPlaying", "true");
  };

  const handlePause = () => {
    audioRef.current?.pause();
    setIsPlaying(false);
    localStorage.setItem("musicPlaying", "false");
  };

  const toggleMusic = () => {
    if (isPlaying) handlePause();
    else handlePlay();
  };
  // ---------------------------------------------------

  useEffect(() => {
    const saved = localStorage.getItem("studentProfile");
    if (saved) {
      const savedProfile = JSON.parse(saved);
      setProfile(savedProfile);
      setEditData(savedProfile);
    }
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAdmin(localStorage.getItem("isAdmin") === "true");
      // Memastikan pengunjung melihat data terbaru jika ada perubahan di tab lain
      const saved = localStorage.getItem("studentProfile");
      if (saved) {
        setProfile(JSON.parse(saved));
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleEdit = () => {
    setEditData(profile);
    setIsEditing(true);
  };

  const handleSave = () => {
    // Update profil di state supaya langsung terlihat di mode pengunjung
    setProfile(editData);
    localStorage.setItem("studentProfile", JSON.stringify(editData));
    setIsEditing(false);
    
    // Tampilkan Toast Notification
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000); // Hilang setelah 3 detik
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditData({
      ...editData,
      [name]: value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditData({ ...editData, avatar: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    downloadProfilePDF(profile);
  };

  if (isEditing && isAdmin) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto animate-slide-in-left">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Edit Profil Mahasiswa
            </h1>
            <p className="text-foreground/70">
              Perbarui informasi pribadi dan foto profil Anda
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl p-8 shadow-lg">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4 pb-3 border-b border-border">
                  Foto Profil
                </h3>
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="relative group">
                    <div className="w-32 h-32 rounded-xl overflow-hidden bg-muted border-2 border-dashed border-border flex items-center justify-center">
                      {editData.avatar ? (
                        <img src={editData.avatar} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <Camera className="w-10 h-10 text-muted-foreground" />
                      )}
                    </div>
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute -bottom-2 -right-2 p-2 bg-primary text-white rounded-full shadow-lg hover:scale-110 transition-transform"
                    >
                      <Upload className="w-4 h-4" />
                    </button>
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleFileChange} 
                      className="hidden" 
                      accept="image/*" 
                    />
                  </div>
                  
                  <div className="flex-1 w-full">
                    <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                      <LinkIcon className="w-4 h-4" />
                      Atau Tempel URL Gambar
                    </label>
                    <input
                      type="text"
                      name="avatar"
                      placeholder="https://example.com/foto.jpg"
                      value={editData.avatar}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                    <p className="text-xs text-foreground/50 mt-2 italic">
                      * Mendukung format file (PNG, JPG) atau link langsung dari internet.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4 pb-3 border-b border-border">
                  Informasi Pribadi
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Nama Lengkap</label>
                    <input type="text" name="name" value={editData.name} onChange={handleInputChange} className="w-full px-4 py-2 border border-border rounded-lg bg-background" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">NIS</label>
                    <input type="text" name="nis" value={editData.nis} onChange={handleInputChange} className="w-full px-4 py-2 border border-border rounded-lg bg-background" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                    <input type="email" name="email" value={editData.email} onChange={handleInputChange} className="w-full px-4 py-2 border border-border rounded-lg bg-background" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Nomor Telepon</label>
                    <input type="tel" name="phone" value={editData.phone} onChange={handleInputChange} className="w-full px-4 py-2 border border-border rounded-lg bg-background" />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4 pb-3 border-b border-border">Akademik & Magang</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" name="school" placeholder="Sekolah" value={editData.school} onChange={handleInputChange} className="w-full px-4 py-2 border border-border rounded-lg bg-background" />
                  <input type="text" name="major" placeholder="Program Studi" value={editData.major} onChange={handleInputChange} className="w-full px-4 py-2 border border-border rounded-lg bg-background" />
                  <input type="text" name="companyName" placeholder="Perusahaan" value={editData.companyName} onChange={handleInputChange} className="w-full px-4 py-2 border border-border rounded-lg bg-background" />
                  <input type="text" name="position" placeholder="Posisi" value={editData.position} onChange={handleInputChange} className="w-full px-4 py-2 border border-border rounded-lg bg-background" />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4 pb-3 border-b border-border">Biodata</h3>
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
      {/* --- NOTIFIKASI TOAST --- */}
      {showToast && (
        <div className="fixed bottom-10 right-10 z-[100] animate-toast-in">
          <div className="bg-primary text-primary-foreground px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 border border-white/20 backdrop-blur-md">
            <CheckCircle2 className="w-6 h-6 animate-bounce" />
            <span className="font-bold tracking-wide">Profil Berhasil Diperbarui!</span>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto animate-slide-in-left">
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Profil Mahasiswa</h1>
            <p className="text-foreground/70">Informasi pribadi dan akademik</p>
          </div>
          <div className="flex gap-3">
            <button onClick={handleDownload} className="flex items-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-semibold hover:opacity-90 transition-all shadow-lg">
              <Download className="w-5 h-5" /> Download
            </button>
            <button onClick={handlePrint} className="flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:opacity-90 transition-all shadow-lg">
              <Printer className="w-5 h-5" /> Print
            </button>
            {isAdmin && (
              <button onClick={handleEdit} className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-all shadow-lg">
                <Edit2 className="w-5 h-5" /> Edit
              </button>
            )}
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-8 shadow-lg mb-6">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-shrink-0 relative group">
              <div className={`absolute -inset-2 rounded-2xl bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-yellow-400 blur-xl transition-opacity duration-500 z-0 ${isPlaying ? 'opacity-100 animate-neon-flash' : 'opacity-0'}`}></div>
              <div onClick={toggleMusic} className={`relative w-32 h-32 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg overflow-hidden cursor-pointer z-10 transition-all duration-300 ${isPlaying ? 'scale-105 shadow-2xl ring-2 ring-white/50' : 'scale-100 border border-border'}`}>
                {profile.avatar ? (
                  <img src={profile.avatar} alt={profile.name} className={`w-full h-full object-cover transition-all duration-700 ${isPlaying ? 'brightness-110 contrast-110' : 'brightness-100'}`} />
                ) : (
                  <span className="text-white text-5xl font-bold font-poppins">{profile.name.charAt(0)}</span>
                )}
                <div className={`absolute inset-0 flex items-center justify-center bg-black/40 transition-all duration-300 ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                  {isPlaying ? <Pause className="w-12 h-12 text-white fill-current animate-pulse" /> : <Play className="w-12 h-12 text-white fill-current" />}
                </div>
                {isPlaying && (
                   <div className="absolute bottom-2 flex gap-1 items-end h-8">
                      <div className="w-1.5 bg-white/80 animate-bar-bounce rounded-full" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-1.5 bg-white/80 animate-bar-bounce rounded-full" style={{ animationDelay: '0.3s' }}></div>
                      <div className="w-1.5 bg-white/80 animate-bar-bounce rounded-full" style={{ animationDelay: '0.2s' }}></div>
                   </div>
                )}
              </div>
            </div>

            <div className="flex-1">
              <h2 className="text-3xl font-bold text-foreground mb-2">{profile.name}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div><p className="text-foreground/70">NIS</p><p className="font-semibold text-foreground">{profile.nis}</p></div>
                <div><p className="text-foreground/70">Email</p><p className="font-semibold text-foreground">{profile.email}</p></div>
                <div><p className="text-foreground/70">Nomor Telepon</p><p className="font-semibold text-foreground">{profile.phone}</p></div>
                <div><p className="text-foreground/70">Sekolah</p><p className="font-semibold text-foreground">{profile.school}</p></div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-card border border-border rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-foreground mb-4 pb-3 border-b border-border">Akademik</h3>
            <div className="space-y-3">
              <div><p className="text-foreground/70 text-sm">Program Studi</p><p className="font-semibold text-foreground">{profile.major}</p></div>
              <div><p className="text-foreground/70 text-sm">Tahun</p><p className="font-semibold text-foreground">{profile.year}</p></div>
              <div><p className="text-foreground/70 text-sm">Pembimbing Sekolah</p><p className="font-semibold text-foreground">{profile.supervisor}</p></div>
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-foreground mb-4 pb-3 border-b border-border">Magang</h3>
            <div className="space-y-3">
              <div><p className="text-foreground/70 text-sm">Perusahaan</p><p className="font-semibold text-foreground">{profile.companyName}</p></div>
              <div><p className="text-foreground/70 text-sm">Posisi</p><p className="font-semibold text-foreground">{profile.position}</p></div>
              <div><p className="text-foreground/70 text-sm">Periode</p><p className="font-semibold text-foreground">{profile.internshipPeriod}</p></div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-foreground mb-4">Deskripsi Singkat</h3>
          <p className="text-foreground/80 leading-relaxed italic">"{profile.bio}"</p>
        </div>

        {!isAdmin && (
          <div className="mt-8 p-4 bg-muted/50 rounded-lg border border-border text-center text-foreground/70">
            <p>Mode Preview - Anda melihat halaman ini sebagai pengunjung.</p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes toast-in {
          0% { transform: translateY(100%) scale(0.9); opacity: 0; }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }
        .animate-toast-in { animation: toast-in 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }

        @keyframes neon-flash {
          0%, 100% { opacity: 0.6; filter: blur(15px) brightness(1); }
          50% { opacity: 1; filter: blur(25px) brightness(1.8) saturate(150%); }
        }
        .animate-neon-flash { animation: neon-flash 0.6s ease-in-out infinite; }

        @keyframes bar-bounce {
          0%, 100% { height: 20%; }
          50% { height: 80%; }
        }
        .animate-bar-bounce { animation: bar-bounce 0.6s ease-in-out infinite; }
      `}</style>
    </Layout>
  );
}
