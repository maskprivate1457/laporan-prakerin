import { useState, useEffect, useRef } from "react";
import { Edit2, Save, X, Camera, Download, Printer, Upload, Link as LinkIcon, Play, Pause } from "lucide-react";
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
  avatar: string;
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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // --- LOGIKA AUDIO ---
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio("https://l.top4top.io/m_3641o6a861.mp3");
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

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
      localStorage.setItem("musicPlaying", "false");
    } else {
      audioRef.current?.play();
      setIsPlaying(true);
      localStorage.setItem("musicPlaying", "true");
    }
  };

  // --- LOGIKA SINKRONISASI OTOMATIS ---
  useEffect(() => {
    const loadData = () => {
      const saved = localStorage.getItem("studentProfile");
      if (saved) {
        const parsed = JSON.parse(saved);
        setProfile(parsed);
        setEditData(parsed);
      }
      setIsAdmin(localStorage.getItem("isAdmin") === "true");
    };

    loadData();

    // Listener untuk mendeteksi perubahan storage
    window.addEventListener("storage", loadData);
    // Listener custom untuk perubahan di halaman yang sama
    window.addEventListener("profileUpdated", loadData);

    return () => {
      window.removeEventListener("storage", loadData);
      window.removeEventListener("profileUpdated", loadData);
    };
  }, []);

  const handleEdit = () => {
    setEditData(profile);
    setIsEditing(true);
  };

  const handleSave = () => {
    // 1. Simpan ke LocalStorage
    localStorage.setItem("studentProfile", JSON.stringify(editData));
    
    // 2. Trigger Custom Event agar mode preview langsung update
    window.dispatchEvent(new Event("profileUpdated"));
    
    // 3. Update State Lokal
    setProfile(editData);
    setIsEditing(false);
  };

  const handleCancel = () => setIsEditing(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditData(prev => ({ ...prev, avatar: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePrint = () => window.print();
  const handleDownload = () => downloadProfilePDF(profile);

  // --- TAMPILAN FORM EDIT ---
  if (isEditing && isAdmin) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto p-4 animate-slide-in-left">
          <h1 className="text-3xl font-bold mb-6">Edit Profil Mahasiswa</h1>
          <div className="bg-card border border-border rounded-xl p-6 space-y-6">
            
            {/* Upload Foto */}
            <div className="flex flex-col items-center gap-4 p-4 border-b border-border">
                <div className="relative w-32 h-32 rounded-xl overflow-hidden bg-muted border-2 border-dashed border-primary/30 flex items-center justify-center">
                    {editData.avatar ? (
                        <img src={editData.avatar} className="w-full h-full object-cover" />
                    ) : (
                        <Camera className="w-10 h-10 text-muted-foreground" />
                    )}
                </div>
                <div className="flex gap-2">
                    <button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm">
                        <Upload className="w-4 h-4" /> Upload File
                    </button>
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
                </div>
                <input 
                    type="text" 
                    name="avatar" 
                    placeholder="Atau masukkan URL gambar..." 
                    value={editData.avatar} 
                    onChange={handleInputChange} 
                    className="w-full max-w-md px-4 py-2 border border-border rounded-lg bg-background text-sm"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Nama Lengkap</label>
                <input type="text" name="name" value={editData.name} onChange={handleInputChange} className="w-full px-4 py-2 border border-border rounded-lg bg-background" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">NIS</label>
                <input type="text" name="nis" value={editData.nis} onChange={handleInputChange} className="w-full px-4 py-2 border border-border rounded-lg bg-background" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Pribadi</label>
                <input type="email" name="email" value={editData.email} onChange={handleInputChange} className="w-full px-4 py-2 border border-border rounded-lg bg-background" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Nomor Telepon</label>
                <input type="text" name="phone" value={editData.phone} onChange={handleInputChange} className="w-full px-4 py-2 border border-border rounded-lg bg-background" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Sekolah</label>
                <input type="text" name="school" value={editData.school} onChange={handleInputChange} className="w-full px-4 py-2 border border-border rounded-lg bg-background" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Program Studi</label>
                <input type="text" name="major" value={editData.major} onChange={handleInputChange} className="w-full px-4 py-2 border border-border rounded-lg bg-background" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Tahun</label>
                <input type="text" name="year" value={editData.year} onChange={handleInputChange} className="w-full px-4 py-2 border border-border rounded-lg bg-background" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Instagram</label>
                <input type="text" name="instagram" value={editData.instagram} onChange={handleInputChange} className="w-full px-4 py-2 border border-border rounded-lg bg-background" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Nama Perusahaan</label>
                <input type="text" name="companyName" value={editData.companyName} onChange={handleInputChange} className="w-full px-4 py-2 border border-border rounded-lg bg-background" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Posisi Magang</label>
                <input type="text" name="position" value={editData.position} onChange={handleInputChange} className="w-full px-4 py-2 border border-border rounded-lg bg-background" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Biodata / Deskripsi</label>
              <textarea name="bio" value={editData.bio} onChange={handleInputChange} rows={4} className="w-full px-4 py-2 border border-border rounded-lg bg-background" />
            </div>

            <div className="flex gap-4 pt-4">
              <button onClick={handleSave} className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-lg hover:opacity-90">
                <Save className="w-4 h-4" /> Simpan Perubahan
              </button>
              <button onClick={handleCancel} className="flex items-center gap-2 px-6 py-2 bg-muted text-foreground rounded-lg">
                <X className="w-4 h-4" /> Batal
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // --- TAMPILAN UTAMA (PREVIEW) ---
  return (
    <Layout>
      <div className="max-w-4xl mx-auto animate-slide-in-left px-4">
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold text-foreground">Profil Mahasiswa</h1>
            <p className="text-foreground/70">Mode {isAdmin ? 'Administrator' : 'Pengunjung'}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={handleDownload} className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg text-sm">
              <Download className="w-4 h-4" /> PDF
            </button>
            <button onClick={handlePrint} className="flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-lg text-sm">
              <Printer className="w-4 h-4" /> Print
            </button>
            {isAdmin && (
              <button onClick={handleEdit} className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm">
                <Edit2 className="w-4 h-4" /> Edit Profil
              </button>
            )}
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-8 shadow-xl mb-6">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
            
            {/* Avatar DJ Logic */}
            <div className="relative group">
              <div className={`absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-400 to-fuchsia-500 blur-lg transition-opacity ${isPlaying ? 'opacity-100 animate-pulse' : 'opacity-0'}`}></div>
              <div onClick={toggleMusic} className="relative w-40 h-40 rounded-2xl overflow-hidden cursor-pointer border-4 border-card shadow-2xl bg-muted flex items-center justify-center">
                {profile.avatar ? (
                  <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-5xl font-bold">{profile.name[0]}</span>
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                   {isPlaying ? <Pause className="text-white w-10 h-10" /> : <Play className="text-white w-10 h-10" />}
                </div>
              </div>
            </div>

            <div className="flex-1 space-y-4">
              <h2 className="text-3xl font-bold tracking-tight">{profile.name}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-sm">
                <div><p className="text-muted-foreground">NIS</p><p className="font-medium">{profile.nis}</p></div>
                <div><p className="text-muted-foreground">Email</p><p className="font-medium">{profile.email}</p></div>
                <div><p className="text-muted-foreground">Telepon</p><p className="font-medium">{profile.phone}</p></div>
                <div><p className="text-muted-foreground">Sekolah</p><p className="font-medium">{profile.school}</p></div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="font-bold mb-4 text-primary">Informasi Akademik</h3>
                <ul className="space-y-2 text-sm">
                    <li><span className="text-muted-foreground">Jurusan:</span> {profile.major}</li>
                    <li><span className="text-muted-foreground">Angkatan:</span> {profile.year}</li>
                    <li><span className="text-muted-foreground">Instagram:</span> @{profile.instagram}</li>
                </ul>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="font-bold mb-4 text-secondary">Pengalaman Magang</h3>
                <ul className="space-y-2 text-sm">
                    <li><span className="text-muted-foreground">Perusahaan:</span> {profile.companyName}</li>
                    <li><span className="text-muted-foreground">Posisi:</span> {profile.position}</li>
                    <li><span className="text-muted-foreground">Periode:</span> {profile.internshipPeriod}</li>
                </ul>
            </div>
        </div>

        <div className="mt-6 bg-primary/5 border border-primary/20 rounded-xl p-6">
            <h3 className="font-bold mb-2">Biodata</h3>
            <p className="text-sm leading-relaxed text-foreground/80">{profile.bio}</p>
        </div>
      </div>
    </Layout>
  );
}
