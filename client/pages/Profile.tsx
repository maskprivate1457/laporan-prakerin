import { useState, useEffect, useRef } from "react";
import { Edit2, Save, X, Camera, Download, Printer, Upload, Link as LinkIcon, Play, Pause } from "lucide-react";
import Layout from "@/components/Layout";
import { downloadProfilePDF } from "@/lib/pdfExport";

// 1. DEFINISI INTERFACE
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

// 2. DATA DEFAULT
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
  // --- STATE UTAMA ---
  const [profile, setProfile] = useState<StudentProfile>(defaultProfile);
  const [editData, setEditData] = useState<StudentProfile>(defaultProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // --- EFFECT: INITIAL LOAD ---
  useEffect(() => {
    // Load Status Admin
    setIsAdmin(localStorage.getItem("isAdmin") === "true");

    // Load Data Profil
    const saved = localStorage.getItem("studentProfile");
    if (saved) {
      const savedProfile = JSON.parse(saved);
      setProfile(savedProfile);
      setEditData(savedProfile);
    }

    // Inisialisasi Audio
    if (!audioRef.current) {
      audioRef.current = new Audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3");
      audioRef.current.loop = true;
    }

    // Sinkronisasi Musik
    const savedMusicStatus = localStorage.getItem("musicPlaying") === "true";
    if (savedMusicStatus) {
      setIsPlaying(true);
      audioRef.current.play().catch(() => {
        setIsPlaying(false);
        localStorage.setItem("musicPlaying", "false");
      });
    }
  }, []);

  // --- EFFECT: STORAGE LISTENER ---
  useEffect(() => {
    const handleStorageChange = () => {
      setIsAdmin(localStorage.getItem("isAdmin") === "true");
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // --- LOGIKA AUDIO ---
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

  // --- LOGIKA EDIT & SAVE ---
  const handleEdit = () => {
    setEditData(profile);
    setIsEditing(true);
  };

  const handleSave = () => {
    // Update tampilan pengunjung
    setProfile(editData);
    // Simpan permanen
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

  // --- RENDER: MODE EDIT ---
  if (isEditing && isAdmin) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto animate-slide-in-left">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Edit Profil Mahasiswa</h1>
            <p className="text-foreground/70">Perbarui informasi pribadi dan foto profil Anda</p>
          </div>

          <div className="bg-card border border-border rounded-xl p-8 shadow-lg">
            <div className="space-y-6">
              {/* Edit Gambar */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4 pb-3 border-b border-border">Foto Profil</h3>
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="relative group">
                    <div className="w-32 h-32 rounded-xl overflow-hidden bg-muted border-2 border-dashed border-border flex items-center justify-center">
                      {editData.avatar ? (
                        <img src={editData.avatar} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <Camera className="w-10 h-10 text-muted-foreground" />
                      )}
                    </div>
                    <button onClick={() => fileInputRef.current?.click()} className="absolute -bottom-2 -right-2 p-2 bg-primary text-white rounded-full shadow-lg hover:scale-110 transition-transform">
                      <Upload className="w-4 h-4" />
                    </button>
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
                  </div>
                  <div className="flex-1 w-full">
                    <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2"><LinkIcon className="w-4 h-4" /> Atau Tempel URL Gambar</label>
                    <input type="text" name="avatar" placeholder="https://example.com/foto.jpg" value={editData.avatar} onChange={handleInputChange} className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/50" />
                  </div>
                </div>
              </div>

              {/* Form Input Pribadi */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2 text-sm font-bold text-primary uppercase tracking-wider">Informasi Dasar</div>
                <input type="text" name="name" placeholder="Nama Lengkap" value={editData.name} onChange={handleInputChange} className="w-full px-4 py-2 border border-border rounded-lg bg-background" />
                <input type="text" name="nis" placeholder="NIS" value={editData.nis} onChange={handleInputChange} className="w-full px-4 py-2 border border-border rounded-lg bg-background" />
                <input type="email" name="email" placeholder="Email" value={editData.email} onChange={handleInputChange} className="w-full px-4 py-2 border border-border rounded-lg bg-background" />
                <input type="tel" name="phone" placeholder="Nomor Telepon" value={editData.phone} onChange={handleInputChange} className="w-full px-4 py-2 border border-border rounded-lg bg-background" />
                
                <div className="md:col-span-2 text-sm font-bold text-primary uppercase tracking-wider mt-4">Akademik & Magang</div>
                <input type="text" name="school" placeholder="Sekolah" value={editData.school} onChange={handleInputChange} className="w-full px-4 py-2 border border-border rounded-lg bg-background" />
                <input type="text" name="major" placeholder="Jurusan" value={editData.major} onChange={handleInputChange} className="w-full px-4 py-2 border border-border rounded-lg bg-background" />
                <input type="text" name="companyName" placeholder="Perusahaan Magang" value={editData.companyName} onChange={handleInputChange} className="w-full px-4 py-2 border border-border rounded-lg bg-background" />
                <input type="text" name="position" placeholder="Posisi" value={editData.position} onChange={handleInputChange} className="w-full px-4 py-2 border border-border rounded-lg bg-background" />
                <input type="text" name="internshipPeriod" placeholder="Periode Magang" value={editData.internshipPeriod} onChange={handleInputChange} className="w-full px-4 py-2 border border-border rounded-lg bg-background" />
                <input type="text" name="supervisor1" placeholder="Pembimbing Industri" value={editData.supervisor1} onChange={handleInputChange} className="w-full px-4 py-2 border border-border rounded-lg bg-background" />
                
                <div className="md:col-span-2 text-sm font-bold text-primary uppercase tracking-wider mt-4">Biodata</div>
                <textarea name="bio" placeholder="Tulis bio singkat..." value={editData.bio} onChange={handleInputChange} rows={4} className="w-full px-4 py-2 border border-border rounded-lg bg-background md:col-span-2" />
              </div>

              <div className="flex gap-4 pt-6 border-t border-border">
                <button onClick={handleSave} className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-all shadow-lg"><Save className="w-5 h-5" /> PUBLISH PROFIL</button>
                <button onClick={handleCancel} className="flex items-center gap-2 px-6 py-3 bg-muted text-foreground rounded-lg font-semibold hover:bg-muted/80 transition-all"><X className="w-5 h-5" /> BATAL</button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // --- RENDER: MODE PENGUNJUNG ---
  return (
    <Layout>
      <div className="max-w-4xl mx-auto animate-slide-in-left">
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Profil Mahasiswa</h1>
            <p className="text-foreground/70">Informasi pribadi dan akademik</p>
          </div>
          <div className="flex gap-3">
            <button onClick={handleDownload} className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg font-semibold hover:opacity-90 transition-all"><Download size={18} /> Download</button>
            <button onClick={handlePrint} className="flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-lg font-semibold hover:opacity-90 transition-all"><Printer size={18} /> Print</button>
            {isAdmin && (
              <button onClick={handleEdit} className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-all shadow-lg"><Edit2 size={18} /> Edit Profil</button>
            )}
          </div>
        </div>

        {/* HEADER PROFIL */}
        <div className="bg-card border border-border rounded-xl p-8 shadow-lg mb-6">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-shrink-0 relative group">
              <div className={`absolute -inset-2 rounded-2xl bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-yellow-400 blur-xl transition-opacity duration-500 z-0 ${isPlaying ? 'opacity-100 animate-neon-flash' : 'opacity-0'}`}></div>
              <div onClick={toggleMusic} className={`relative w-32 h-32 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg overflow-hidden cursor-pointer z-10 transition-all duration-300 ${isPlaying ? 'scale-105 ring-2 ring-white/50' : 'scale-100 border border-border'}`}>
                {profile.avatar ? (
                  <img src={profile.avatar} alt={profile.name} className={`w-full h-full object-cover transition-all duration-700 ${isPlaying ? 'brightness-110 contrast-110' : 'brightness-100'}`} />
                ) : (
                  <span className="text-white text-5xl font-bold font-poppins">{profile.name.charAt(0)}</span>
                )}
                <div className={`absolute inset-0 flex items-center justify-center bg-black/40 transition-all duration-300 opacity-0 group-hover:opacity-100`}>
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-medium">
                <div><p className="text-foreground/50 text-xs uppercase">NIS</p> {profile.nis}</div>
                <div><p className="text-foreground/50 text-xs uppercase">Email</p> {profile.email}</div>
                <div><p className="text-foreground/50 text-xs uppercase">Telepon</p> {profile.phone}</div>
                <div><p className="text-foreground/50 text-xs uppercase">Sekolah</p> {profile.school}</div>
              </div>
            </div>
          </div>
        </div>

        {/* DETAIL INFO */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-card border border-border rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-foreground mb-4 pb-3 border-b border-border">Akademik</h3>
            <div className="space-y-3">
              <div><p className="text-foreground/70 text-xs">Program Studi</p><p className="font-semibold">{profile.major}</p></div>
              <div><p className="text-foreground/70 text-xs">Tahun</p><p className="font-semibold">{profile.year}</p></div>
              <div><p className="text-foreground/70 text-xs">Email Sekolah</p><p className="font-semibold text-primary">{profile.emailSchool}</p></div>
              <div><p className="text-foreground/70 text-xs">Pembimbing</p><p className="font-semibold">{profile.supervisor}</p></div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-foreground mb-4 pb-3 border-b border-border">Magang</h3>
            <div className="space-y-3">
              <div><p className="text-foreground/70 text-xs">Perusahaan</p><p className="font-semibold">{profile.companyName}</p></div>
              <div><p className="text-foreground/70 text-xs">Posisi</p><p className="font-semibold text-primary">{profile.position}</p></div>
              <div><p className="text-foreground/70 text-xs">Periode</p><p className="font-semibold">{profile.internshipPeriod}</p></div>
              <div><p className="text-foreground/70 text-xs">Pembimbing Industri</p><p className="font-semibold">{profile.supervisor1}</p></div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-foreground mb-4">Biodata</h3>
          <p className="text-foreground/80 leading-relaxed whitespace-pre-wrap">{profile.bio}</p>
        </div>

        {!isAdmin && (
          <div className="mt-8 p-4 bg-muted/50 rounded-lg border border-border text-center text-foreground/70">
            <p>Mode Preview - Anda melihat halaman ini sebagai pengunjung.</p>
          </div>
        )}
      </div>

      <style jsx>{`
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
