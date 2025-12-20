import { useState, useEffect, useRef } from "react";
import { Edit2, Save, X, Camera, Download, Printer, Play, Pause, Link as LinkIcon } from "lucide-react";
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
  profileImage: string; // Tambahan field gambar
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
  profileImage: "", // Default kosong (menggunakan inisial nama)
};

export default function Profile() {
  const [profile, setProfile] = useState<StudentProfile>(defaultProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<StudentProfile>(defaultProfile);
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem("isAdmin") === "true");
  
  // State Musik & Animasi
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // KONFIGURASI LAGU OLEH ADMIN
  const SONG_URL = "https://l.top4top.io/m_3641o6a861.mp3"; 

  useEffect(() => {
    const saved = localStorage.getItem("studentProfile");
    if (saved) {
      const savedProfile = JSON.parse(saved);
      setProfile(savedProfile);
      setEditData(savedProfile);
    }
    // Inisialisasi Audio
    audioRef.current = new Audio(SONG_URL);
    audioRef.current.onended = () => setIsPlaying(false);

    return () => {
      audioRef.current?.pause();
    };
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAdmin(localStorage.getItem("isAdmin") === "true");
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play().catch(err => console.log("Audio play blocked by browser"));
    }
    setIsPlaying(!isPlaying);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditData({ ...editData, profileImage: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
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

  const handleCancel = () => setIsEditing(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handlePrint = () => window.print();
  const handleDownload = () => downloadProfilePDF(profile);

  if (isEditing && isAdmin) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto animate-slide-in-left">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Edit Profil Mahasiswa</h1>
            <p className="text-foreground/70">Perbarui informasi pribadi dan akademik Anda</p>
          </div>

          <div className="bg-card border border-border rounded-xl p-8 shadow-lg">
            <div className="space-y-6">
              {/* EDIT GAMBAR SECTION */}
              <div className="pb-6 border-b border-border">
                <h3 className="text-lg font-semibold mb-4">Foto Profil</h3>
                <div className="flex flex-col sm:flex-row gap-6 items-center">
                  <div className="w-28 h-28 rounded-xl overflow-hidden bg-muted border-2 border-primary/30 flex items-center justify-center">
                    {editData.profileImage ? (
                      <img src={editData.profileImage} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <Camera className="w-8 h-8 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1 space-y-3 w-full">
                    <button 
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center gap-2 text-sm bg-secondary px-4 py-2 rounded-lg hover:opacity-80 transition-all w-full justify-center font-medium"
                    >
                      <Camera className="w-4 h-4" /> Upload dari Perangkat
                    </button>
                    <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
                    
                    <div className="relative">
                      <LinkIcon className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                      <input 
                        type="text" 
                        name="profileImage"
                        placeholder="Atau tempel URL gambar di sini..."
                        value={editData.profileImage}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4 pb-3 border-b border-border">Informasi Pribadi</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Nama Lengkap</label>
                    <input type="text" name="name" value={editData.name} onChange={handleInputChange} className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/50" />
                  </div>
                  <div>
                    <label className="flex items-center pl-2 gap-2 text-sm font-medium text-foreground mb-2">
                      <img src="https://cdn-icons-png.flaticon.com/512/6522/6522516.png" className="w-4 h-4 filter hue-rotate-180 brightness-110" alt="NIS" />
                      NIS
                    </label>
                    <input type="text" name="nis" value={editData.nis} onChange={handleInputChange} className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/50" />
                  </div>
                  <div>
                    <label className="flex items-center pl-2 gap-2 text-sm font-medium text-foreground mb-2">
                      <img src="https://cdn-icons-png.flaticon.com/512/732/732200.png" className="w-4 h-4 filter hue-rotate-180 brightness-110" alt="Email" />
                      Email
                    </label>
                    <input type="email" name="email" value={editData.email} onChange={handleInputChange} className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/50" />
                  </div>
                  <div>
                    <label className="flex items-center pl-2 gap-2 text-sm font-medium text-foreground mb-2">
                      <img src="https://cdn-icons-png.flaticon.com/512/724/724664.png" className="w-4 h-4 filter hue-rotate-180 brightness-110" alt="Phone" />
                      Nomor Telepon
                    </label>
                    <input type="tel" name="phone" value={editData.phone} onChange={handleInputChange} className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/50" />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4 pb-3 border-b border-border">Informasi Akademik</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center pl-2 gap-2 text-sm font-medium text-foreground mb-2">
                      <img src="https://cdn-icons-png.flaticon.com/512/8074/8074788.png" className="w-4 h-4 filter hue-rotate-180 brightness-110" alt="School" />
                      Sekolah
                    </label>
                    <input type="text" name="school" value={editData.school} onChange={handleInputChange} className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/50" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Program Studi</label>
                    <input type="text" name="major" value={editData.major} onChange={handleInputChange} className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/50" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Tahun</label>
                    <input type="text" name="year" value={editData.year} onChange={handleInputChange} className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/50" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Periode Magang</label>
                    <input type="text" name="internshipPeriod" value={editData.internshipPeriod} onChange={handleInputChange} className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/50" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Pembimbing Sekolah</label>
                    <input type="text" name="supervisor" value={editData.supervisor} onChange={handleInputChange} className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/50" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Instagram</label>
                    <input type="text" name="instagram" value={editData.instagram} onChange={handleInputChange} className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/50" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Email Sekolah</label>
                    <input type="text" name="emailSchool" value={editData.emailSchool} onChange={handleInputChange} className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/50" />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4 pb-3 border-b border-border">Informasi Magang</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Nama Perusahaan</label>
                    <input type="text" name="companyName" value={editData.companyName} onChange={handleInputChange} className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/50" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Posisi</label>
                    <input type="text" name="position" value={editData.position} onChange={handleInputChange} className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/50" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Pembimbing Industri</label>
                    <input type="text" name="supervisor1" value={editData.supervisor1} onChange={handleInputChange} className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/50" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Email Perusahaan</label>
                    <input type="text" name="emailcompany" value={editData.emailcompany} onChange={handleInputChange} className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/50" />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4 pb-3 border-b border-border">Biodata</h3>
                <textarea name="bio" value={editData.bio} onChange={handleInputChange} rows={5} className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" />
              </div>

              <div className="flex gap-4 pt-6 border-t border-border">
                <button onClick={handleSave} className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-all"><Save className="w-5 h-5" /> Simpan Perubahan</button>
                <button onClick={handleCancel} className="flex items-center gap-2 px-6 py-3 bg-muted text-foreground rounded-lg font-semibold hover:bg-muted/80 transition-all"><X className="w-5 h-5" /> Batal</button>
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

        <div className="bg-card border border-border rounded-xl p-8 shadow-lg mb-6 relative overflow-hidden">
          <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
            <div className="flex-shrink-0 relative group">
              {/* DJ ANIMATION BORDER */}
              <div className={`absolute -inset-2 rounded-2xl bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 opacity-50 blur-md transition-opacity duration-500 ${isPlaying ? 'opacity-100 animate-pulse' : 'opacity-0'}`}></div>
              <div className={`absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-indigo-500 ${isPlaying ? 'animate-[spin_3s_linear_infinite] opacity-100' : 'opacity-0 transition-opacity'}`}></div>
              
              {/* AVATAR & AUDIO TOGGLE */}
              <div 
                onClick={toggleMusic}
                className="relative w-32 h-32 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg cursor-pointer overflow-hidden border-2 border-background"
              >
                {profile.profileImage ? (
                  <img src={profile.profileImage} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-white text-5xl font-bold font-poppins">{profile.name.charAt(0)}</span>
                )}
                
                {/* PLAY/PAUSE ICON OVERLAY */}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  {!isPlaying ? (
                    <Play className="text-white w-10 h-10 fill-current" />
                  ) : (
                    <Pause className="text-white w-10 h-10 fill-current" />
                  )}
                </div>

                {/* EDM VISUALIZER BARS (Hanya muncul saat Play) */}
                {isPlaying && (
                  <div className="absolute bottom-1 left-0 right-0 flex items-end justify-center gap-[2px] h-10 px-2 pointer-events-none">
                    {[...Array(10)].map((_, i) => (
                      <div 
                        key={i} 
                        className="w-[3px] bg-white rounded-t-full animate-[bounce_0.6s_infinite_ease-in-out]"
                        style={{ 
                          animationDelay: `${i * 0.05}s`,
                          height: `${Math.floor(Math.random() * 60) + 40}%` 
                        }}
                      ></div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex-1">
              <h2 className="text-3xl font-bold text-foreground mb-2">{profile.name}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-foreground/70">NIS</p>
                  <p className="font-semibold text-foreground">{profile.nis}</p>
                </div>
                <div>
                  <p className="text-foreground/70">Email</p>
                  <p className="font-semibold text-foreground">{profile.email}</p>
                </div>
                <div>
                  <p className="text-foreground/70">Nomor Telepon</p>
                  <p className="font-semibold text-foreground">{profile.phone}</p>
                </div>
                <div>
                  <p className="text-foreground/70">Sekolah</p>
                  <p className="font-semibold text-foreground">{profile.school}</p>
                </div>
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
              <div><p className="text-foreground/70 text-sm">Email Sekolah</p><p className="font-semibold text-foreground">{profile.emailSchool}</p></div>
              <div><p className="text-foreground/70 text-sm">Instagram Sekolah</p><p className="font-semibold text-foreground">{profile.instagram}</p></div>
              <div><p className="text-foreground/70 text-sm">Pembimbing Sekolah</p><p className="font-semibold text-foreground">{profile.supervisor}</p></div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-foreground mb-4 pb-3 border-b border-border">Magang</h3>
            <div className="space-y-3">
              <div><p className="text-foreground/70 text-sm">Periode</p><p className="font-semibold text-foreground">{profile.internshipPeriod}</p></div>
              <div><p className="text-foreground/70 text-sm">Perusahaan</p><p className="font-semibold text-foreground">{profile.companyName}</p></div>
              <div><p className="text-foreground/70 text-sm">Posisi</p><p className="font-semibold text-foreground">{profile.position}</p></div>
              <div><p className="text-foreground/70 text-sm">Email Perusahaan</p><p className="font-semibold text-foreground">{profile.emailcompany}</p></div>
              <div><p className="text-foreground/70 text-sm">Pembimbing Perusahaan</p><p className="font-semibold text-foreground">{profile.supervisor1}</p></div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-foreground mb-4">Deskripsi Singkat</h3>
          <p className="text-foreground/80 leading-relaxed">{profile.bio}</p>
        </div>

        {!isAdmin && (
          <div className="mt-8 p-4 bg-muted/50 rounded-lg border border-border text-center text-foreground/70">
            <p>Mode Preview - Klik foto profil untuk mendengarkan lagu EDM.</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
