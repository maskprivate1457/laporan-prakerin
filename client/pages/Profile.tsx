import { useState, useEffect, useRef } from "react";
import { Edit2, Save, X, Camera, Download, Printer, Upload, Play, Pause } from "lucide-react";

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
  const [isAdmin, setIsAdmin] = useState(
    localStorage.getItem("isAdmin") === "true"
  );
  
  // --- KODE EDITAN: LOGIKA DJ SET AUDIO & ANIMASI ---
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
  
  // ===== FITUR BARU: AUTO-SYNC ANTAR MODE ADMIN & VISITOR =====
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      // Detect perubahan isAdmin
      if (e.key === "isAdmin") {
        setIsAdmin(localStorage.getItem("isAdmin") === "true");
      }
      
      // Detect perubahan studentProfile dan auto-refresh
      if (e.key === "studentProfile" && e.newValue) {
        const updatedProfile = JSON.parse(e.newValue);
        setProfile(updatedProfile);
        setEditData(updatedProfile);
      }
    };
    
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);
  
  // Custom event untuk sync dalam tab yang sama
  useEffect(() => {
    const handleProfileUpdate = (e: CustomEvent) => {
      const updatedProfile = e.detail;
      setProfile(updatedProfile);
      setEditData(updatedProfile);
    };
    
    window.addEventListener("profileUpdated", handleProfileUpdate as EventListener);
    return () => window.removeEventListener("profileUpdated", handleProfileUpdate as EventListener);
  }, []);
  // ============================================================
  
  const handleEdit = () => {
    setEditData(profile);
    setIsEditing(true);
  };
  
  const handleSave = () => {
    setProfile(editData);
    localStorage.setItem("studentProfile", JSON.stringify(editData));
    
    // ===== TRIGGER EVENT UNTUK SYNC REAL-TIME =====
    window.dispatchEvent(new CustomEvent("profileUpdated", { detail: editData }));
    // Trigger storage event secara manual untuk tab yang sama
    window.dispatchEvent(new StorageEvent("storage", {
      key: "studentProfile",
      newValue: JSON.stringify(editData),
      url: window.location.href
    }));
    // ==============================================
    
    setIsEditing(false);
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
    // Implementasi download PDF
    alert("Download PDF feature");
  };
  
  if (isEditing && isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-6">
        <div className="max-w-4xl mx-auto animate-slide-in-left">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
              Edit Profil Mahasiswa
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Perbarui informasi pribadi dan foto profil Anda
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-8 shadow-lg">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 pb-3 border-b border-slate-200 dark:border-slate-700">
                  Foto Profil
                </h3>
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="relative group">
                    <div className="w-32 h-32 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-700 border-2 border-dashed border-slate-300 dark:border-slate-600 flex items-center justify-center">
                      {editData.avatar ? (
                        <img src={editData.avatar} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <Camera className="w-10 h-10 text-slate-400" />
                      )}
                    </div>
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute -bottom-2 -right-2 p-2 bg-blue-600 text-white rounded-full shadow-lg hover:scale-110 transition-transform"
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
                    <label className="flex items-center gap-2 text-sm font-medium text-slate-900 dark:text-white mb-2">
                      🔗 Atau Tempel URL Gambar
                    </label>
                    <input
                      type="text"
                      name="avatar"
                      placeholder="https://example.com/foto.jpg"
                      value={editData.avatar}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 italic">
                      * Mendukung format file (PNG, JPG) atau link langsung dari internet.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 pb-3 border-b border-slate-200 dark:border-slate-700">
                  Informasi Pribadi
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={editData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                      NIS
                    </label>
                    <input
                      type="text"
                      name="nis"
                      value={editData.nis}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={editData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                      Nomor Telepon
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={editData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 pb-3 border-b border-slate-200 dark:border-slate-700">
                  Informasi Akademik
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                      Sekolah
                    </label>
                    <input
                      type="text"
                      name="school"
                      value={editData.school}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                      Program Studi
                    </label>
                    <input
                      type="text"
                      name="major"
                      value={editData.major}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                      Tahun
                    </label>
                    <input
                      type="text"
                      name="year"
                      value={editData.year}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                      Periode Magang
                    </label>
                    <input
                      type="text"
                      name="internshipPeriod"
                      value={editData.internshipPeriod}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                      Pembimbing Sekolah
                    </label>
                    <input
                      type="text"
                      name="supervisor"
                      value={editData.supervisor}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                      Instagram
                    </label>
                    <input
                      type="text"
                      name="instagram"
                      value={editData.instagram}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                      Email Sekolah
                    </label>
                    <input
                      type="text"
                      name="emailSchool"
                      value={editData.emailSchool}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 pb-3 border-b border-slate-200 dark:border-slate-700">
                  Informasi Magang
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                      Nama Perusahaan
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={editData.companyName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                      Posisi
                    </label>
                    <input
                      type="text"
                      name="position"
                      value={editData.position}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                      Pembimbing Industri
                    </label>
                    <input
                      type="text"
                      name="supervisor1"
                      value={editData.supervisor1}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                      Email Perusahaan
                    </label>
                    <input
                      type="text"
                      name="emailcompany"
                      value={editData.emailcompany}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 pb-3 border-b border-slate-200 dark:border-slate-700">
                  Biodata
                </h3>
                <div>
                  <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                    Deskripsi Singkat
                  </label>
                  <textarea
                    name="bio"
                    value={editData.bio}
                    onChange={handleInputChange}
                    rows={5}
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-6 border-t border-slate-200 dark:border-slate-700">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all"
                >
                  <Save className="w-5 h-5" />
                  Simpan Perubahan
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 px-6 py-3 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg font-semibold hover:bg-slate-300 dark:hover:bg-slate-600 transition-all"
                >
                  <X className="w-5 h-5" />
                  Batal
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-6">
      <div className="max-w-4xl mx-auto animate-slide-in-left">
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
              Profil Mahasiswa
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Informasi pribadi dan akademik
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all shadow-lg"
            >
              <Download className="w-5 h-5" />
              Download
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-all shadow-lg"
            >
              <Printer className="w-5 h-5" />
              Print
            </button>
            {isAdmin && (
              <button
                onClick={handleEdit}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all shadow-lg"
              >
                <Edit2 className="w-5 h-5" />
                Edit
              </button>
            )}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-8 shadow-lg mb-6">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            
            <div className="flex-shrink-0 relative group">
              <div className={`absolute -inset-2 rounded-2xl bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-yellow-400 blur-xl transition-opacity duration-500 z-0 ${isPlaying ? 'opacity-100 animate-neon-flash' : 'opacity-0'}`}></div>
              
              <div 
                onClick={toggleMusic}
                className={`relative w-32 h-32 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg overflow-hidden cursor-pointer z-10 transition-all duration-300 ${isPlaying ? 'scale-105 shadow-2xl ring-2 ring-white/50' : 'scale-100 border border-slate-300 dark:border-slate-600'}`}
              >
                {profile.avatar ? (
                  <img src={profile.avatar} alt={profile.name} className={`w-full h-full object-cover transition-all duration-700 ${isPlaying ? 'brightness-110 contrast-110' : 'brightness-100'}`} />
                ) : (
                  <span className="text-white text-5xl font-bold">
                    {profile.name.charAt(0)}
                  </span>
                )}

                <div className={`absolute inset-0 flex items-center justify-center bg-black/40 transition-all duration-300 ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                  {isPlaying ? (
                    <Pause className="w-12 h-12 text-white fill-current animate-pulse" />
                  ) : (
                    <Play className="w-12 h-12 text-white fill-current" />
                  )}
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
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                {profile.name}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-slate-600 dark:text-slate-400">NIS</p>
                  <p className="font-semibold text-slate-900 dark:text-white">{profile.nis}</p>
                </div>
                <div>
                  <p className="text-slate-600 dark:text-slate-400">Email</p>
                  <p className="font-semibold text-slate-900 dark:text-white">{profile.email}</p>
                </div>
                <div>
                  <p className="text-slate-600 dark:text-slate-400">Nomor Telepon</p>
                  <p className="font-semibold text-slate-900 dark:text-white">{profile.phone}</p>
                </div>
                <div>
                  <p className="text-slate-600 dark:text-slate-400">Sekolah</p>
                  <p className="font-semibold text-slate-900 dark:text-white">{profile.school}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 pb-3 border-b border-slate-200 dark:border-slate-700">
              Akademik
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-slate-600 dark:text-slate-400 text-sm">Program Studi</p>
                <p className="font-semibold text-slate-900 dark:text-white">{profile.
