import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { 
  BarChart3, Users, Eye, Clock, BarChart as BarChartIcon, 
  RefreshCcw, ShieldAlert, Zap, Globe 
} from "lucide-react";
import { getSessionStats, getAllSessions, VisitorSession } from "@/lib/tracking";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState<any>(null);
  const [sessions, setSessions] = useState<VisitorSession[]>([]);
  const [loading, setLoading] = useState(true);

  // Fungsi fetch data dari tracking.ts (REST API)
  const syncData = async () => {
    const statsData = await getSessionStats();
    const sessionData = await getAllSessions();
    setStats(statsData);
    setSessions(sessionData.reverse().slice(0, 10)); // Sesi terbaru di atas
    setLoading(false);
  };

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin") === "true";
    if (!isAdmin) { navigate("/"); return; }

    syncData();
    // AUTO SYNC SETIAP 5 DETIK
    const timer = setInterval(syncData, 5000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (ms: number) => {
    const sec = Math.floor(ms / 1000);
    return sec > 60 ? `${Math.floor(sec/60)}m ${sec%60}s` : `${sec}s`;
  };

  if (loading) return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-primary">
        <RefreshCcw className="w-12 h-12 animate-spin mb-4" />
        <p className="font-mono text-xs tracking-[0.3em] animate-pulse">ESTABLISHING API CONNECTION...</p>
      </div>
    </Layout>
  );

  return (
    <Layout>
      <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-card p-6 rounded-3xl border border-border shadow-2xl shadow-primary/5">
          <div>
            <h1 className="text-4xl font-black tracking-tighter">METRIC <span className="text-primary italic">CORE</span></h1>
            <p className="text-xs text-foreground/50 font-mono mt-1 flex items-center gap-2">
              <Globe className="w-3 h-3 text-green-500 animate-pulse" /> REST API REAL-TIME SYNC ACTIVE
            </p>
          </div>
          <div className="flex gap-4">
            <div className="text-right">
              <p className="text-[10px] font-bold opacity-40 uppercase">Reset Cycle</p>
              <p className="text-sm font-mono font-bold text-primary">20,000 LIMIT</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { label: "Public Visitor", val: stats.visitorSessions, icon: Eye, color: "text-blue-500" },
            { label: "Admin Access", val: stats.adminSessions, icon: ShieldAlert, color: "text-purple-500" },
            { label: "Total Page View", val: stats.totalPageViews, icon: BarChartIcon, color: "text-orange-500" },
            { label: "Avg Duration", val: formatTime(stats.avgSessionDuration), icon: Clock, color: "text-green-500" },
            { label: "Session Loop", val: stats.totalSessions, icon: Zap, color: "text-yellow-500" },
          ].map((card, i) => (
            <div key={i} className="bg-card border border-border p-6 rounded-3xl relative overflow-hidden hover:scale-105 transition-transform duration-300">
              <card.icon className={`w-12 h-12 absolute -right-2 -bottom-2 opacity-5 ${card.color}`} />
              <p className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest mb-2">{card.label}</p>
              <p className="text-3xl font-black tabular-nums">{card.val?.toLocaleString()}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Traffic Monitor */}
          <div className="lg:col-span-2 bg-card border border-border rounded-3xl overflow-hidden shadow-xl">
            <div className="p-6 border-b border-border flex justify-between items-center bg-muted/20">
              <h3 className="font-bold flex items-center gap-2 uppercase text-xs tracking-widest"><Users className="w-4 h-4" /> Live Traffic Log</h3>
              <span className="text-[10px] bg-green-500/20 text-green-500 px-2 py-1 rounded-md font-bold animate-pulse">LIVE</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="text-[10px] text-foreground/30 uppercase font-bold border-b border-border">
                  <tr>
                    <th className="px-6 py-4">ID Sesi</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Hits</th>
                    <th className="px-6 py-4">Durasi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {sessions.map((s) => (
                    <tr key={s.id} className="hover:bg-primary/5 transition-colors">
                      <td className="px-6 py-4 font-mono text-[10px] opacity-60">{s.id.slice(-15)}</td>
                      <td className="px-6 py-4">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${s.userType === 'admin' ? 'bg-primary/10 text-primary' : 'bg-muted text-foreground/40'}`}>
                          {s.userType}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-bold">{s.pages.length} Pages</td>
                      <td className="px-6 py-4 text-xs opacity-60">{formatTime(s.lastActivity - s.startTime)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Popular Pages */}
          <div className="bg-card border border-border rounded-3xl p-6 shadow-xl">
            <h3 className="font-bold mb-8 uppercase text-xs tracking-widest flex items-center gap-2"><BarChart3 className="w-4 h-4 text-primary" /> Popular Path</h3>
            <div className="space-y-6">
              {stats.mostVisitedPages.map((page: any, i: number) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="opacity-50">{page.path}</span>
                    <span className="text-primary">{page.visits} hits</span>
                  </div>
                  <div className="h-1 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: `${(page.visits/stats.totalPageViews)*100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
