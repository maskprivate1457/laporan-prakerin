import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import {
  BarChart3,
  Users,
  Eye,
  Clock,
  BarChart as BarChartIcon,
  RefreshCcw, // Icon tambahan untuk indikasi reset
} from "lucide-react";
import { getSessionStats, getAllSessions } from "@/lib/tracking";

interface SessionStats {
  totalSessions: number;
  adminSessions: number;
  visitorSessions: number;
  totalPageViews: number;
  avgSessionDuration: number;
  mostVisitedPages: { path: string; visits: number }[];
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState<SessionStats | null>(null);
  const [sessions, setSessions] = useState<any[]>([]);
  const [isAdmin, setIsAdmin] = useState(
    localStorage.getItem("isAdmin") === "true"
  );

  // State untuk angka yang ditampilkan (setelah limit & animasi)
  const [displayStats, setDisplayStats] = useState({
    totalSessions: 0,
    adminSessions: 0,
    visitorSessions: 0,
    totalPageViews: 0,
  });

  const LIMIT = 20000;

  useEffect(() => {
    if (!isAdmin) {
      navigate("/");
      return;
    }

    const statsData = getSessionStats();
    setStats(statsData);

    const allSessions = getAllSessions();
    setSessions(allSessions.slice(0, 10));

    // LOGIKA LIMIT: Menggunakan Modulo agar angka reset ke 0 setelah 20.000
    const limitedStats = {
      totalSessions: statsData.totalSessions % (LIMIT + 1),
      adminSessions: statsData.adminSessions % (LIMIT + 1),
      visitorSessions: statsData.visitorSessions % (LIMIT + 1),
      totalPageViews: statsData.totalPageViews % (LIMIT + 1),
    };

    // ANIMASI ANGKA BERJALAN (Count Up)
    let start = 0;
    const duration = 1000; // 1 detik animasi
    const increment = Math.ceil(LIMIT / 60); // Kecepatan langkah

    const timer = setInterval(() => {
      start += increment;
      
      setDisplayStats({
        totalSessions: Math.min(start, limitedStats.totalSessions),
        adminSessions: Math.min(start, limitedStats.adminSessions),
        visitorSessions: Math.min(start, limitedStats.visitorSessions),
        totalPageViews: Math.min(start, limitedStats.totalPageViews),
      });

      if (start >= LIMIT) {
        clearInterval(timer);
        // Pastikan angka terakhir tepat sesuai data limited
        setDisplayStats(limitedStats);
      }
    }, 16); // ~60 FPS

    return () => clearInterval(timer);
  }, [isAdmin, navigate]);

  if (!isAdmin) return null;

  if (!stats) {
    return (
      <Layout>
        <div className="text-center py-12">
          <p className="text-foreground/70">Loading dashboard...</p>
        </div>
      </Layout>
    );
  }

  const formatDuration = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
    return `${seconds}s`;
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto animate-slide-in-left">
        <div className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Admin Dashboard
            </h1>
            <p className="text-foreground/70">
              Analitik pengunjung dengan sistem reset otomatis (Limit: 20k)
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2 text-[10px] font-mono text-primary/50 uppercase tracking-widest bg-primary/5 px-3 py-1 rounded-full border border-primary/10">
            <RefreshCcw className="w-3 h-3 animate-spin-slow" />
            System Auto-Reset Active
          </div>
        </div>

        {/* Stats Cards - Menggunakan displayStats yang sudah diolah */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Card Total Sessions */}
          <div className="bg-card border border-border rounded-xl p-6 shadow-lg hover:border-primary/50 transition-colors group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-foreground/70 text-sm">Total Sessions</p>
                <p className="text-2xl font-bold text-foreground font-mono">
                  {displayStats.totalSessions.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* Card Admin Sessions */}
          <div className="bg-card border border-border rounded-xl p-6 shadow-lg hover:border-primary/50 transition-colors group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-foreground/70 text-sm">Admin Sessions</p>
                <p className="text-2xl font-bold text-primary font-mono">
                  {displayStats.adminSessions.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* Card Visitor Sessions */}
          <div className="bg-card border border-border rounded-xl p-6 shadow-lg hover:border-secondary/50 transition-colors group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <Eye className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <p className="text-foreground/70 text-sm">Visitor Sessions</p>
                <p className="text-2xl font-bold text-secondary font-mono">
                  {displayStats.visitorSessions.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* Card Page Views */}
          <div className="bg-card border border-border rounded-xl p-6 shadow-lg hover:border-primary/50 transition-colors group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <BarChartIcon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-foreground/70 text-sm">Page Views</p>
                <p className="text-2xl font-bold text-foreground font-mono">
                  {displayStats.totalPageViews.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Info Box untuk Rata-rata Durasi (Tanpa Limit karena satuan waktu) */}
        <div className="mb-8 p-4 bg-muted/50 border border-border rounded-xl flex items-center gap-3">
          <Clock className="w-5 h-5 text-primary" />
          <span className="text-sm font-medium">Rata-rata Durasi Sesi: </span>
          <span className="text-sm text-primary font-bold">{formatDuration(stats.avgSessionDuration)}</span>
        </div>

        {/* Sisanya (Most Visited & Recent Sessions) tetap seperti sebelumnya */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 bg-card border border-border rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    Populer
                </h3>
                <div className="space-y-4">
                    {stats.mostVisitedPages.map((page, idx) => (
                        <div key={idx} className="group">
                            <div className="flex justify-between text-xs mb-1">
                                <span className="text-foreground/70 truncate max-w-[150px]">{page.path || "/"}</span>
                                <span className="font-bold text-primary">{(page.visits % (LIMIT + 1)).toLocaleString()}</span>
                            </div>
                            <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                                <div 
                                    className="h-full bg-primary transition-all duration-1000"
                                    style={{ width: `${Math.min((page.visits / (stats.totalPageViews || 1)) * 100, 100)}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6 shadow-lg overflow-hidden">
                <h3 className="text-lg font-bold text-foreground mb-4">Aktivitas Terakhir</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-muted/50">
                            <tr>
                                <th className="text-left p-3 text-xs font-bold uppercase tracking-tighter">Session</th>
                                <th className="text-left p-3 text-xs font-bold uppercase tracking-tighter">Type</th>
                                <th className="text-left p-3 text-xs font-bold uppercase tracking-tighter">Duration</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sessions.map((session, idx) => (
                                <tr key={idx} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                                    <td className="p-3 font-mono text-[10px] text-foreground/60">{session.id.substring(0, 8)}...</td>
                                    <td className="p-3">
                                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${session.userType === 'admin' ? 'bg-primary/20 text-primary' : 'bg-muted text-foreground/70'}`}>
                                            {session.userType}
                                        </span>
                                    </td>
                                    <td className="p-3 text-xs">{formatDuration(session.lastActivity - session.startTime)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
      </div>
    </Layout>
  );
}
