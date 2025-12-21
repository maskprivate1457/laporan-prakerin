import { useState, useEffect, useRef } from "react";
import { 
  Edit2, Save, X, Camera, Download, Printer, 
  Upload, Link as LinkIcon, Play, Pause, CheckCircle, 
  Mail, Phone, GraduationCap, Building2, User, Instagram 
} from "lucide-react";
import Layout from "@/components/Layout";
import { downloadProfilePDF } from "@/lib/pdfExport";

// --- INTERFACE DATA ---
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

// --- DATA DEFAULT ---
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
  // --- STATE MANAGEMENT ---
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<StudentProfile>(defaultProfile); // Data Tampilan Preview
  const [editData, setEditData] = useState<StudentProfile>(defaultProfile); // Data Form Input
  const [isAdmin, setIsAdmin] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // --- 1. INITIAL LOAD (Sinkronisasi Data & Admin) ---
  useEffect(() => {
    // Ambil data dari LocalStorage jika ada
    const saved = localStorage.getItem("studentProfile");
    if (saved) {
      const savedProfile = JSON.parse(saved);
      setProfile(savedProfile);
      setEditData(savedProfile);
    }
    
    // Cek status Admin
    setIsAdmin(localStorage.getItem("isAdmin") === "true");

    // Inisialisasi Audio (Singleton)
    if (!audioRef.current) {
      audioRef.current = new Audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3");
      audioRef.current.loop = true;
    }

    // Cek status musik sebelumnya
    const savedMusicStatus = localStorage.getItem("musicPlaying") === "true";
    if (savedMusicStatus) {
      setIsPlaying(true);
      audioRef.current.play().catch(() => setIsPlaying(false));
    }

    // Listener untuk perubahan status Admin di tab lain
    const handleStorageChange = () => {
      setIsAdmin(localStorage.getItem("isAdmin") === "true");
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // --- 2. LOGIKA AUDIO DJ ---
  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
      localStorage.setItem("musicPlaying", "false");
    } else {
      audioRef.current?.play().catch((err) => console.log("Audio play blocked", err));
      setIsPlaying(true);
      localStorage.setItem("musicPlaying", "true");
    }
  };

  // --- 3. LOGIKA CRUD (Edit, Save, Cancel) ---
  const handleEdit = () => {
    setEditData(profile); // Sinkronkan data form dengan data saat ini
    setIsEditing(true);
  };

  const handleSave = () => {
    // Tampilkan Notifikasi
    setShowToast(true);
    
    // Simpan ke State Utama (Preview) & LocalStorage
    setProfile(editData);
    localStorage.setItem("studentProfile", JSON.stringify(editData));
    
    // Delay sebentar agar user bisa melihat notifikasi sebelum pindah mode
    setTimeout(() => {
      setIsEditing(false);
      setShowToast(false);
    }, 1200);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
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

  const handlePrint = () => window.print();
  const handleDownload = () => downloadProfilePDF(profile);

  // --- 4. RENDER MODE: EDIT (ADMIN) ---
  if (isEditing && isAdmin) {
    return (
      <Layout>
        {/* Toast Notifikasi */}
        {showToast && (
          <div className="fixed top-6 right-6 z-[100] bg-green-600 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-slide-in-right">
            <CheckCircle className="w-6 h-6" />
            <span className="font-bold">Data Berhasil Diperbarui!</span>
          </div>
        )}

        <div className="max-w-4xl mx-auto animate-slide-in-left pb-12">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Edit Profil Mahasiswa</h1>
            <p className="text-foreground/70">Mode Admin: Perubahan akan otomatis tersimpan ke tampilan publik.</p>
          </div>

          <div className="bg-card border border-border rounded-2xl p-8 shadow-xl">
            <div className="space-y-8">
              {/* Edit Foto */}
              <section>
                <h3 className="text-lg font-bold flex items-center gap-2 mb-4 text-primary">
                  <Camera className="w-5 h-5" /> Foto Profil
                </h3>
                <div className="flex flex-col md:flex-row gap-6 items-center bg-muted/30 p-4 rounded-xl">
                  <div className="relative group">
                    <div className="w-32 h-32 rounded-2xl overflow-hidden bg-background border-2 border-dashed border-primary/30 flex items-center justify-center">
                      {editData.avatar ? (
                        <img src={editData.avatar} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <User className="w-12 h-12 text-muted-foreground" />
                      )}
                    </div>
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute -bottom-2 -right-2 p-2 bg-primary text-white rounded-full shadow-lg hover:scale-110 transition-transform"
                    >
                      <Upload className="w-4 h-4" />
                    </button>
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
                  </div>
                  <div className="flex-1 w-full">
                    <label className="text-sm font-semibold mb-2 block">Link URL Foto</label>
                    <input
                      type="text"
                      name="avatar"
                      placeholder="https://..."
                      value={editData.avatar}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                </div>
              </section>

              {/* Info Pribadi */}
              <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-full border-b pb-2"><h3 className="font-bold">Informasi Pribadi</h3></div>
                <div>
                  <label className="text-xs font-bold uppercase text-muted-foreground">Nama Lengkap</label>
                  <input type="text" name="name" value={editData.name} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg bg-background" />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase text-muted-foreground">NIS</label>
                  <input type="text" name="nis" value={editData.nis} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg bg-background" />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase text-muted-foreground">Email</label>
                  <input type="email" name="email" value={editData.email} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg bg-background" />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase text-muted-foreground">Telepon</label>
                  <input type="tel" name="phone" value={editData.phone} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg bg-background" />
                </div>
              </section>

              {/* Info Akademik */}
              <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-full border-b pb-2"><h3 className="font-bold">Akademik & Sekolah</h3></div>
                <div className="md:col-span-2">
                  <label className="text-xs font-bold uppercase text-muted-foreground">Nama Sekolah</label>
                  <input type="text" name="school" value={editData.school} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg bg-background" />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase text-muted-foreground">Program Studi</label>
                  <input type="text" name="major" value={editData.major} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg bg-background" />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase text-muted-foreground">Tahun</label>
                  <input type="text" name="year" value={editData.year} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg bg-background" />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase text-muted-foreground">Email Sekolah</label>
                  <input type="text" name="emailSchool" value={editData.emailSchool} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg bg-background" />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase text-muted-foreground">Instagram</label>
                  <input type="text" name="instagram" value={editData.instagram} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg bg-background" />
                </div>
              </section>

              {/* Info Magang */}
              <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-full border-b pb-2"><h3 className="font-bold">Informasi Magang (PKL)</h3></div>
                <div className="md:col-span-2">
                  <label className="text-xs font-bold uppercase text-muted-foreground">Nama Perusahaan</label>
                  <input type="text" name="companyName" value={editData.companyName} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg bg-background" />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase text-muted-foreground">Posisi</label>
                  <input type="text" name="position" value={editData.position} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg bg-background" />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase text-muted-foreground">Periode</label>
                  <input type="text" name="internshipPeriod" value={editData.internshipPeriod} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg bg-background" />
                </div>
              </section>

              <section>
                <label className="text-xs font-bold uppercase text-muted-foreground">Biodata / Deskripsi</label>
                <textarea name="bio" value={editData.bio} onChange={handleInputChange} rows={4} className="w-full px-4 py-2 border rounded-lg bg-background resize-none" />
              </section>

              {/* Tombol Aksi */}
              <div className="flex gap-4 pt-6 border-t">
                <button onClick={handleSave} className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-primary text-white rounded-xl font-bold hover:opacity-90 transition-all shadow-lg shadow-primary/25">
                  <Save className="w-5 h-5" /> Simpan Perubahan
                </button>
                <button onClick={handleCancel} className="flex items-center gap-2 px-6 py-4 bg-muted text-foreground rounded-xl font-bold hover:bg-muted/80 transition-all">
                  <X className="w-5 h-5" /> Batal
                </button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // --- 5. RENDER MODE: PREVIEW (PENGUNJUNG) ---
  return (
    <Layout>
      <div className="max-w-4xl mx-auto animate-slide-in-left pb-10">
        <div className="mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-foreground tracking-tight">Profil Mahasiswa</h1>
            <p className="text-foreground/60">Digital Profile & Internship Identity</p>
          </div>
          <div className="flex gap-2">
            <button onClick={handleDownload} className="flex items-center gap-2 px-5 py-2.5 bg-secondary text-secondary-foreground rounded-xl font-semibold hover:opacity-80 transition-all"><Download size={18}/> PDF</button>
            <button onClick={handlePrint} className="flex items-center gap-2 px-5 py-2.5 bg-accent text-accent-foreground rounded-xl font-semibold hover:opacity-80 transition-all"><Printer size={18}/> Print</button>
            {isAdmin && (
              <button onClick={handleEdit} className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-xl font-bold hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20">
                <Edit2 className="w-5 h-5" /> Edit Mode
              </button>
            )}
          </div>
        </div>

        {/* Card Profil Utama */}
        <div className="bg-card border border-border rounded-3xl p-8 shadow-2xl relative overflow-hidden mb-8">
          <div className="flex flex-col md:flex-row gap-10 items-center relative z-10">
            
            {/* Foto Profile & Efek DJ */}
            <div className="relative group">
              <div className={`absolute -inset-4 rounded-full bg-gradient-to-tr from-cyan-400 via-fuchsia-500 to-yellow-400 blur-2xl transition-opacity duration-700 ${isPlaying ? 'opacity-70 animate-spin-slow' : 'opacity-0'}`}></div>
              <div 
                onClick={toggleMusic}
                className={`relative w-44 h-44 rounded-2xl overflow-hidden cursor-pointer border-4 border-background shadow-2xl transition-all duration-500 ${isPlaying ? 'scale-105 ring-4 ring-primary/20' : ''}`}
              >
                {profile.avatar ? (
                  <img src={profile.avatar} className={`w-full h-full object-cover transition-all duration-700 ${isPlaying ? 'brightness-110 saturate-150' : ''}`} alt={profile.name} />
                ) : (
                  <div className="w-full h-full bg-primary flex items-center justify-center text-6xl font-black text-white">{profile.name[0]}</div>
                )}
                
                {/* Visualizer & Overlay */}
                <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity ${isPlaying ? 'opacity-0 hover:opacity-100' : 'opacity-0 hover:opacity-100'}`}>
                  {isPlaying ? <Pause className="text-white w-12 h-12" /> : <Play className="text-white w-12 h-12 fill-white" />}
                </div>
                {isPlaying && (
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1 h-8 items-end">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="w-1.5 bg-white/90 rounded-full animate-bar-bounce" style={{ animationDelay: `${i * 0.1}s` }}></div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-3">Student Intern</div>
              <h2 className="text-4xl font-black text-foreground mb-2 leading-tight">{profile.name}</h2>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
                <span className="flex items-center gap-1.5 text-sm font-medium bg-muted px-3 py-1.5 rounded-lg border border-border"><User size={14}/> {profile.nis}</span>
                <span className="flex items-center gap-1.5 text-sm font-medium bg-muted px-3 py-1.5 rounded-lg border border-border"><Building2 size={14}/> {profile.companyName}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Grid Detail Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Kontak Section */}
          <div className="md:col-span-1 space-y-6">
            <div className="bg-card border border-border rounded-2xl p-6 shadow-lg">
              <h3 className="font-bold mb-4 text-primary flex items-center gap-2"><Mail size={18}/> Kontak</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-[10px] font-bold uppercase text-muted-foreground">Email Pribadi</p>
                  <p className="text-sm font-semibold truncate">{profile.email}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase text-muted-foreground">WhatsApp</p>
                  <p className="text-sm font-semibold">{profile.phone}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase text-muted-foreground">Instagram</p>
                  <p className="text-sm font-semibold flex items-center gap-1 text-pink-500"><Instagram size={14}/> @{profile.instagram}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-card border border-border rounded-2xl p-6 shadow-lg">
              <h3 className="font-bold mb-4 text-primary flex items-center gap-2"><GraduationCap size={18}/> Sekolah</h3>
              <p className="text-sm font-bold">{profile.school}</p>
              <p className="text-xs text-muted-foreground mt-1">{profile.major}</p>
            </div>
          </div>

          {/* Info Magang & Bio */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-card border border-border rounded-2xl p-6 shadow-lg">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold mb-4 border-b pb-2">Detail Magang</h3>
                  <div className="space-y-3">
                    <p className="text-xs"><span className="text-muted-foreground block uppercase font-bold text-[10px]">Posisi</span> <span className="font-semibold">{profile.position}</span></p>
                    <p className="text-xs"><span className="text-muted-foreground block uppercase font-bold text-[10px]">Periode</span> <span className="font-semibold">{profile.internshipPeriod}</span></p>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold mb-4 border-b pb-2">Pembimbing</h3>
                  <div className="space-y-3">
                    <p className="text-xs"><span className="text-muted-foreground block uppercase font-bold text-[10px]">Industri</span> <span className="font-semibold">{profile.supervisor1}</span></p>
                    <p className="text-xs"><span className="text-muted-foreground block uppercase font-bold text-[10px]">Sekolah</span> <span className="font-semibold">{profile.supervisor}</span></p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/20 rounded-2xl p-8">
              <h3 className="text-lg font-bold mb-4">Biodata Singkat</h3>
              <p className="text-foreground/80 leading-relaxed italic">"{profile.bio}"</p>
            </div>
          </div>
        </div>

        {!isAdmin && (
          <div className="mt-12 p-4 bg-muted/30 rounded-xl border border-dashed border-border text-center text-xs text-muted-foreground">
            Kamu sedang berada dalam mode pengunjung.
          </div>
        )}
      </div>

      {/* --- ANIMASI & STYLE --- */}
      <style jsx>{`
        @keyframes slide-in-right {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes bar-bounce {
          0%, 100% { height: 20%; }
          50% { height: 100%; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-slide-in-right { animation: slide-in-right 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
        .animate-bar-bounce { animation: bar-bounce 0.6s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }
      `}</style>
    </Layout>
  );
}
