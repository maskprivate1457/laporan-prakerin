import { useState, useEffect, useRef } from "react";
import { 
  Edit2, 
  Save, 
  X, 
  Camera, 
  Download, 
  Printer, 
  Upload, 
  Link as LinkIcon, 
  Play, 
  Pause,
  Mail,
  Phone,
  Instagram,
  GraduationCap,
  Briefcase,
  Calendar,
  User as UserIcon
} from "lucide-react";
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
  const [isAdmin, setIsAdmin] = useState(
    localStorage.getItem("isAdmin") === "true"
  );
  
  // --- LOGIKA AUDIO DJ & ANIMASI ---
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
      audioRef.current?.play().catch((err) => console.log("Playback error:", err));
      setIsPlaying(true);
      localStorage.setItem("musicPlaying", "true");
    }
  };
  
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
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);
  
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

  // Helper component untuk item detail agar kode tetap bersih
  const InfoBox = ({ icon: Icon, label, value, colorClass = "text-primary" }: any) => (
    <div className="group p-4 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-md dark:hover:bg-primary/5">
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-lg bg-muted ${colorClass}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">{label}</p>
          <p className="font-semibold text-foreground leading-tight">{value || "-"}</p>
        </div>
      </div>
    </div>
  );

  if (isEditing && isAdmin) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="mb-8">
            <h1 className="text-4xl font-black text-foreground mb-2 tracking-tight">EDIT PROFILE</h1>
            <p className="text-muted-foreground font-mono text-sm">Update your student credential data</p>
          </div>

          <div className="bg-card border border-border rounded-3xl p-8 shadow-2xl relative overflow-hidden">
            <div className="space-y-8 relative z-10">
              {/* Avatar Upload */}
              <div className="flex flex-col md:flex-row gap-8 items-center pb-8 border-b border-border">
                <div className="relative group">
                  <div className="w-40 h-40 rounded-3xl overflow-hidden bg-muted border-2 border-dashed border-primary/50 flex items-center justify-center transition-all group-hover:border-primary">
                    {editData.avatar ? (
                      <img src={editData.avatar} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <Camera className="w-12 h-12 text-muted-foreground" />
                    )}
                  </div>
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute -bottom-3 -right-3 p-3 bg-primary text-white rounded-2xl shadow-lg hover:scale-110 active:scale-95 transition-all"
                  >
                    <Upload className="w-5 h-5" />
                  </button>
                  <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
                </div>
                
                <div className="flex-1 w-full space-y-4">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-bold text-foreground mb-2 uppercase tracking-tighter">
                      <LinkIcon className="w-4 h-4" /> Avatar Image URL
                    </label>
                    <input
                      type="text"
                      name="avatar"
                      placeholder="https://example.com/photo.jpg"
                      value={editData.avatar}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-border rounded-xl bg-background focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Form Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-muted-foreground ml-1">Full Name</label>
                  <input type="text" name="name" value={editData.name} onChange={handleInputChange} className="w-full px-4 py-3 border border-border rounded-xl bg-background focus:border-primary outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-muted-foreground ml-1">NIS Number</label>
                  <input type="text" name="nis" value={editData.nis} onChange={handleInputChange} className="w-full px-4 py-3 border border-border rounded-xl bg-background focus:border-primary outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-muted-foreground ml-1">Email Address</label>
                  <input type="email" name="email" value={editData.email} onChange={handleInputChange} className="w-full px-4 py-3 border border-border rounded-xl bg-background focus:border-primary outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-muted-foreground ml-1">Phone Number</label>
                  <input type="text" name="phone" value={editData.phone} onChange={handleInputChange} className="w-full px-4 py-3 border border-border rounded-xl bg-background focus:border-primary outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-muted-foreground ml-1">School Name</label>
                  <input type="text" name="school" value={editData.school} onChange={handleInputChange} className="w-full px-4 py-3 border border-border rounded-xl bg-background focus:border-primary outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-muted-foreground ml-1">Major / Program</label>
                  <input type="text" name="major" value={editData.major} onChange={handleInputChange} className="w-full px-4 py-3 border border-border rounded-xl bg-background focus:border-primary outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-muted-foreground ml-1">Company Name</label>
                  <input type="text" name="companyName" value={editData.companyName} onChange={handleInputChange} className="w-full px-4 py-3 border border-border rounded-xl bg-background focus:border-primary outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-muted-foreground ml-1">Position</label>
                  <input type="text" name="position" value={editData.position} onChange={handleInputChange} className="w-full px-4 py-3 border border-border rounded-xl bg-background focus:border-primary outline-none transition-all" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-muted-foreground ml-1">Bio / Description</label>
                <textarea
                  name="bio"
                  value={editData.bio}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-border rounded-xl bg-background focus:border-primary outline-none transition-all resize-none"
                />
              </div>

              <div className="flex gap-4 pt-6 border-t border-border">
                <button
                  onClick={handleSave}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-primary text-primary-foreground rounded-2xl font-bold hover:opacity-90 transition-all shadow-lg"
                >
                  <Save className="w-5 h-5" /> SAVE CHANGES
                </button>
                <button
                  onClick={handleCancel}
                  className="px-8 py-4 bg-muted text-foreground rounded-2xl font-bold hover:bg-muted/80 transition-all"
                >
                  CANCEL
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
      <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000">
        {/* Header Actions */}
        <div className="mb-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h1 className="text-5xl font-black text-foreground tracking-tighter">MY PROFILE</h1>
            <p className="text-primary font-mono text-sm tracking-[0.2em] mt-1">VERIFIED STUDENT ID</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-5 py-3 bg-card border border-border rounded-2xl font-bold hover:border-primary transition-all shadow-sm"
            >
              <Download className="w-4 h-4 text-primary" /> Download
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-5 py-3 bg-card border border-border rounded-2xl font-bold hover:border-primary transition-all shadow-sm"
            >
              <Printer className="w-4 h-4 text-primary" /> Print
            </button>
            {isAdmin && (
              <button
                onClick={handleEdit}
                className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-2xl font-bold hover:scale-105 transition-all shadow-[0_10px_20px_rgba(var(--primary),0.3)]"
              >
                <Edit2 className="w-4 h-4" /> Edit Profile
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Side Card: Avatar & Basic Info */}
          <div className="lg:col-span-4 space-y-6">
            <div className="relative group">
              {/* Neon Glow Animation for DJ Mode */}
              <div className={`absolute -inset-1.5 rounded-[2.5rem] bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-yellow-400 blur-xl transition-opacity duration-500 z-0 ${isPlaying ? 'opacity-100 animate-pulse' : 'opacity-0'}`}></div>
              
              <div className="relative z-10 bg-card border border-border rounded-[2.5rem] p-8 text-center shadow-xl overflow-hidden">
                <div 
                  onClick={toggleMusic}
                  className={`relative w-48 h-48 mx-auto rounded-3xl bg-muted mb-6 overflow-hidden cursor-pointer transition-all duration-500 ${isPlaying ? 'scale-105 rotate-2 shadow-2xl ring-4 ring-primary/30' : 'hover:scale-105'}`}
                >
                  {profile.avatar ? (
                    <img src={profile.avatar} alt={profile.name} className={`w-full h-full object-cover transition-all duration-700 ${isPlaying ? 'brightness-110 contrast-125' : ''}`} />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-primary text-white text-6xl font-black">
                      {profile.name.charAt(0)}
                    </div>
                  )}
                  
                  {/* Music Overlay */}
                  <div className={`absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity duration-300 ${isPlaying ? 'opacity-0 hover:opacity-100' : 'opacity-0 hover:opacity-100'}`}>
                    {isPlaying ? <Pause className="w-12 h-12 text-white fill-current" /> : <Play className="w-12 h-12 text-white fill-current" />}
                  </div>

                  {/* Audio Visualizer Bars */}
                  {isPlaying && (
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1 h-6">
                      {[1,2,3,4,5].map(i => (
                        <div key={i} className="w-1 bg-white/80 rounded-full animate-bar-bounce" style={{ animationDelay: `${i*0.1}s` }} />
                      ))}
                    </div>
                  )}
                </div>

                <h2 className="text-2xl font-black text-foreground leading-tight">{profile.name}</h2>
                <p className="text-primary font-mono text-xs font-bold mt-2 tracking-widest uppercase">{profile.position}</p>
                
                <div className="mt-8 flex justify-center gap-4">
                  <div className="text-center">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase">NIS</p>
                    <p className="font-bold text-foreground">{profile.nis}</p>
                  </div>
                  <div className="w-px h-8 bg-border"></div>
                  <div className="text-center">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase">Year</p>
                    <p className="font-bold text-foreground">{profile.year}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-[2rem] p-6 shadow-lg">
              <h3 className="text-sm font-black text-foreground mb-4 flex items-center gap-2">
                <UserIcon className="w-4 h-4 text-primary" /> BIOGRAPHY
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed italic">
                "{profile.bio}"
              </p>
            </div>
          </div>

          {/* Main Content: Details Grid */}
          <div className="lg:col-span-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Personal Section */}
              <div className="space-y-4 md:col-span-2">
                 <h3 className="text-xs font-black text-muted-foreground tracking-[0.3em] uppercase ml-1">Contact & Academic</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InfoBox icon={Mail} label="Personal Email" value={profile.email} />
                    <InfoBox icon={Phone} label="Phone / WhatsApp" value={profile.phone} colorClass="text-green-500" />
                    <InfoBox icon={GraduationCap} label="School" value={profile.school} />
                    <InfoBox icon={Briefcase} label="Major" value={profile.major} colorClass="text-orange-500" />
                 </div>
              </div>

              {/* Internship Section */}
              <div className="space-y-4 md:col-span-2">
                 <h3 className="text-xs font-black text-muted-foreground tracking-[0.3em] uppercase ml-1">Internship Details</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InfoBox icon={Briefcase} label="Company" value={profile.companyName} colorClass="text-cyan-500" />
                    <InfoBox icon={Calendar} label="Period" value={profile.internshipPeriod} colorClass="text-purple-500" />
                    <InfoBox icon={UserIcon} label="Ind. Supervisor" value={profile.supervisor1} />
                    <InfoBox icon={Mail} label="Company Email" value={profile.emailcompany} />
                 </div>
              </div>

              {/* Socials & Others */}
              <div className="space-y-4 md:col-span-2">
                 <h3 className="text-xs font-black text-muted-foreground tracking-[0.3em] uppercase ml-1">Social Connection</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InfoBox icon={Instagram} label="Instagram" value={`@${profile.instagram}`} colorClass="text-fuchsia-500" />
                    <InfoBox icon={Mail} label="School Email" value={profile.emailSchool} />
                 </div>
              </div>
            </div>

            {!isAdmin && (
              <div className="p-6 bg-muted/50 rounded-3xl border border-border text-center">
                <p className="text-sm font-medium text-muted-foreground">
                   Viewing in <span className="text-primary font-bold">PREVIEW MODE</span>. Login as admin to modify data.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        /* Global & Dark Mode Styling */
        :root {
          --primary: 200 100% 50%;
        }

        .dark {
          --background: 240 10% 4%;
          --card: 240 10% 7%;
          --border: 240 5% 15%;
          --muted: 240 5% 10%;
          --foreground: 0 0% 98%;
        }

        @keyframes bar-bounce {
          0%, 100% { height: 4px; }
          50% { height: 20px; }
        }
        .animate-bar-bounce {
          animation: bar-bounce 0.6s ease-in-out infinite;
        }

        /* Modern Print CSS */
        @media print {
          .no-print { display: none; }
          body { background: white; color: black; }
          .bg-card { border: 1px solid #ddd !important; box-shadow: none !important; }
        }
      `}</style>
    </Layout>
  );
}
