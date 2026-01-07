import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import {
  BarChart3,
  Users,
  Eye,
  Clock,
  BarChart as BarChartIcon,
  RefreshCw,
  Activity
} from "lucide-react";
import { getSessionStats, getAllSessions, trackPageView } from "@/lib/tracking";

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
  
  // State untuk refresh data otomatis
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const LIMIT_RESET = 20000;

  // Fungsi untuk mengambil dan memproses data
  const fetchData = () => {
    const statsData = getSessionStats();
    const allSessions = getAllSessions();

    // Logika Reset 20.000: Angka akan kembali ke 0 jika mencapai limit
    const processedStats: SessionStats = {
      ...statsData,
      totalSessions: statsData.totalSessions % LIMIT_RESET,
      visitorSessions: statsData.visitorSessions % LIMIT_RESET,
      adminSessions: statsData.adminSessions % LIMIT_RESET,
      totalPageViews: statsData.totalPageViews % LIMIT_RESET,
    };

    setStats(processedStats);
    setSessions(allSessions.slice(0, 10));
    setLastUpdated(new Date());
  };

  useEffect(() => {
    if (!isAdmin) {
      navigate("/");
      return;
    }

    // Tracking kunjungan admin ke dashboard ini
    trackPageView("/admin-dashboard");

    // Load data pertama kali
    fetchData();

    // SETUP LIVE TRACKING: Berjalan setiap 5 detik untuk memantau pengunjung masuk
    const interval = setInterval(() => {
      fetchData();
    }, 5000);

    return () => clearInterval(interval);
  }, [isAdmin, navigate]);

  if (!isAdmin) return null;

  if (!stats) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center py-20">
          <RefreshCw className="w-10 h-10 text-primary animate-spin mb-4" />
          <p className="text-foreground/70 animate-pulse">Sinkronisasi Data Pengunjung...</p>
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
      <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-foreground mb-2 tracking-tight">
              Admin <span className="text-primary">Dashboard</span>
            </h1>
            <div className="flex items-center gap-2 text-foreground/70">
              <Activity className="w-4 h-4 text-green-500" />
              <p className="text-sm">Monitoring Aktivitas Real-time (Auto-refresh 5s)</p>
            </div>
          </div>
          
          <div className="bg-card border border-border px-4 py-2 rounded-lg flex items-center gap-3 shadow-sm">
            <div className="text-right">
              <p className="text-[10px] text-foreground/50 uppercase font-bold">Terakhir Diupdate</p>
              <p className="text-xs font-mono">{lastUpdated.toLocaleTimeString()}</p>
            </div>
            <RefreshCw className="w-4 h-4 text-primary cursor-pointer hover:rotate-180 transition-transform duration-500" onClick={fetchData} />
          </div>
        </div>

        {/* Info Limit Reset */}
        <div className="mb-6 p-3 bg-primary/5 border border-primary/20 rounded-xl flex items-center gap-3">
          <div className="w-2 h-2 bg-primary rounded-full animate-ping" />
          <p className="text-xs text-primary font-medium">
            Sistem Aktif: Statistik akan otomatis kembali ke 0 (reset) setiap mencapai 20.000 kunjungan.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {[
            { label: "Total Sessions", value: stats.totalSessions, icon: Users, color: "text-primary" },
            { label: "Admin Mode", value: stats.adminSessions, icon: Users, color: "text-blue-500" },
            { label: "Public Visitor", value: stats.visitorSessions, icon: Eye, color: "text-secondary" },
            { label: "Total Page Views", value: stats.totalPageViews, icon: BarChartIcon, color: "text-orange-500" },
            { label: "Avg Duration", value: formatDuration(stats.avgSessionDuration), icon: Clock, color: "text-green-500" },
          ].map((item, i) => (
            <div key={i} className="bg-card border border-border rounded-2xl p-6 shadow-md hover:shadow-primary/5 transition-all group">
              <div className="flex flex-col gap-3">
                <div className={`w-10 h-10 rounded-xl bg-muted flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                </div>
                <div>
                  <p className="text-foreground/60 text-xs font-medium uppercase tracking-wider">{item.label}</p>
                  <p className="text-2xl font-bold text-foreground mt-1">
                    {typeof item.value === 'number' ? item.value.toLocaleString() : item.value}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Most Visited Pages */}
          <div className="lg:col-span-1 bg-card border border-border rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              Populer Halaman
            </h3>
            <div className="space-y-5">
              {stats.mostVisitedPages.length > 0 ? (
                stats.mostVisitedPages.map((page, idx) => (
                  <div key={idx} className="group">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-foreground truncate max-w-[150px]">{page.path || "/"}</span>
                      <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-md">
                        {page.visits} hits
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-1000"
                        style={{ width: `${Math.min((page.visits / 100) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-foreground/70 text-center py-10 italic">Belum ada data</p>
              )}
            </div>
          </div>

          {/* Recent Sessions Table */}
          <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-foreground">Log Sesi Pengunjung</h3>
              <span className="text-[10px] bg-green-500/10 text-green-500 px-2 py-1 rounded-full animate-pulse">LIVE TRACKING</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-foreground/50">
                    <th className="text-left py-3 font-semibold uppercase text-[10px] tracking-widest">ID Sesi</th>
                    <th className="text-left py-3 font-semibold uppercase text-[10px] tracking-widest">Status</th>
                    <th className="text-left py-3 font-semibold uppercase text-[10px] tracking-widest">Aktivitas</th>
                    <th className="text-left py-3 font-semibold uppercase text-[10px] tracking-widest">Durasi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {sessions.map((session, idx) => (
                    <tr key={idx} className="hover:bg-muted/50 transition-colors">
                      <td className="py-4 text-foreground/80 font-mono text-[10px]">
                        {session.id.substring(0, 15)}...
                      </td>
                      <td className="py-4">
                        <span
                          className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-tighter ${
                            session.userType === "admin"
                              ? "bg-primary/20 text-primary border border-primary/20"
                              : "bg-muted text-foreground/60 border border-border"
                          }`}
                        >
                          {session.userType}
                        </span>
                      </td>
                      <td className="py-4 text-foreground font-medium">
                        {session.pages.length} <span className="text-[10px] text-foreground/50">Laman</span>
                      </td>
                      <td className="py-4 text-foreground/70 font-mono text-xs">
                        {formatDuration(session.lastActivity - session.startTime)}
                      </td>
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
