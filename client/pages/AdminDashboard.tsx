import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { 
  Users, Eye, Clock, BarChart, RefreshCw, 
  ShieldCheck, Activity, Zap, Server 
} from "lucide-react";
import { getSessionStats, getAllSessions, VisitorSession } from "@/lib/tracking";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState<any>(null);
  const [sessions, setSessions] = useState<VisitorSession[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const s = await getSessionStats();
      const list = await getAllSessions();
      setStats(s);
      setSessions(list.slice().reverse().slice(0, 10)); // 10 Sesi terbaru
    } catch (err) {
      console.error("Fetch Error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin") === "true";
    if (!isAdmin) { navigate("/"); return; }

    loadData();
    // INTERVAL SYNC: 5 Detik agar visitor terlihat bekerja
    const timer = setInterval(loadData, 5000);
    return () => clearInterval(timer);
  }, [navigate]);

  const fmtDur = (ms: number) => {
    const s = Math.floor(ms / 1000);
    return s > 60 ? `${Math.floor(s/60)}m ${s%60}s` : `${s}s`;
  };

  if (loading) return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <Server className="w-12 h-12 text-primary animate-bounce mb-4" />
        <p className="font-mono text-[10px] tracking-widest animate-pulse text-primary">CONNECTING TO MOCKAPI...</p>
      </div>
    </Layout>
  );

  return (
    <Layout>
      <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-card border border-border p-6 rounded-3xl shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tighter uppercase">Admin <span className="text-primary">Metric</span></h1>
              <div className="flex items-center gap-2 text-[10px] font-bold text-green-500">
                <Activity className="w-3 h-3 animate-pulse" /> SINKRONISASI AKTIF (URL: 695e59cf)
              </div>
            </div>
          </div>
          <div className="bg-muted/50 px-4 py-2 rounded-xl border border-border">
            <p className="text-[10px] font-bold opacity-50 uppercase tracking-widest text-right">Reset Status</p>
            <p className="text-sm font-mono font-black text-primary italic">CYCLE: 20,000 LIMIT</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { label: "Public Visitor", val: stats.visitorSessions, icon: Eye, color: "text-blue-500" },
            { label: "Admin Mode", val: stats.adminSessions, icon: Zap, color: "text-yellow-500" },
            { label: "Total Page View", val: stats.totalPageViews, icon: BarChart, color: "text-orange-500" },
            { label: "Avg Stay", val: fmtDur(stats.avgDuration), icon: Clock, color: "text-green-500" },
            { label: "Session Loop", val: stats.totalSessions, icon: RefreshCw, color: "text-primary" },
          ].map((c, i) => (
            <div key={i} className="bg-card border border-border p-6 rounded-3xl relative overflow-hidden shadow-sm group hover:border-primary/50 transition-all">
              <c.icon className={`w-12 h-12 absolute -right-3 -bottom-3 opacity-5 group-hover:opacity-10 transition-opacity ${c.color}`} />
              <p className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest mb-1">{c.label}</p>
              <p className="text-3xl font-black tabular-nums tracking-tighter">{c.val?.toLocaleString()}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Logs Table */}
          <div className="lg:col-span-2 bg-card border border-border rounded-3xl overflow-hidden shadow-lg">
            <div className="p-6 border-b border-border bg-muted/20 flex items-center justify-between">
              <h3 className="font-bold flex items-center gap-2 text-xs uppercase tracking-tighter"><Users className="w-4 h-4 text-primary" /> Traffic Monitor (Live)</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="text-[10px] uppercase font-bold text-foreground/30 border-b border-border bg-muted/10">
                    <th className="px-6 py-4">Session Hash</th>
                    <th className="px-6 py-4">Type</th>
                    <th className="px-6 py-4">Activity</th>
                    <th className="px-6 py-4">Stay Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {sessions.map((s) => (
                    <tr key={s.id} className="hover:bg-muted/50 transition-colors group">
                      <td className="px-6 py-4 font-mono text-[10px] opacity-60 group-hover:text-primary">{s.id.slice(-12)}</td>
                      <td className="px-6 py-4">
                        <span className={`text-[9px] font-black px-2 py-0.5 rounded uppercase ${s.userType === 'admin' ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-foreground/40'}`}>
                          {s.userType}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-bold text-xs">{s.pages.length} Pages Hit</td>
                      <td className="px-6 py-4 text-xs font-mono opacity-50">{fmtDur(s.lastActivity - s.startTime)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Popular Pages */}
          <div className="bg-card border border-border rounded-3xl p-6 shadow-lg">
            <h3 className="font-bold mb-6 uppercase text-xs tracking-widest flex items-center gap-2"><BarChart className="w-4 h-4 text-primary" /> Popular Path</h3>
            <div className="space-y-6">
              {stats.mostVisited.map((p: any, i: number) => (
                <div key={i} className="space-y-2 group">
                  <div className="flex justify-between text-[11px] font-bold">
                    <span className="opacity-50 group-hover:opacity-100 transition-opacity truncate w-40 italic">{p.path}</span>
                    <span className="text-primary">{p.visits} hits</span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-primary to-blue-500 transition-all duration-1000" style={{ width: `${(p.visits / (stats.totalPageViews || 1)) * 100}%` }} />
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
