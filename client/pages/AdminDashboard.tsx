// src/pages/AdminDashboard.tsx - MODERN CLOUD ANALYTICS

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { 
  Users, Eye, Clock, BarChart, RefreshCcw, 
  Activity, Zap, Database, TrendingUp
} from "lucide-react";
import { getSessionStats, getAllSessions, VisitorSession } from "@/lib/tracking";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState<any>(null);
  const [sessions, setSessions] = useState<VisitorSession[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const s = await getSessionStats();
    const all = await getAllSessions();
    setStats(s);
    setSessions(all.reverse().slice(0, 15)); // Tampilkan 15 sesi terakhir
    setLoading(false);
  };

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin") === "true";
    if (!isAdmin) { navigate("/"); return; }

    fetchData();
    // AUTO SYNC TIAP 5 DETIK: Memastikan fungsi Visitor bekerja Real-time
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, [navigate]);

  const formatDuration = (ms: number) => {
    const s = Math.floor(ms / 1000);
    return s > 60 ? `${Math.floor(s/60)}m ${s%60}s` : `${s}s`;
  };

  if (loading) return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-primary">
        <Database className="w-14 h-14 animate-pulse mb-4 text-primary/50" />
        <p className="font-mono text-[10px] tracking-[0.4em] animate-pulse">SYNCING WITH CLOUD DATABASE...</p>
      </div>
    </Layout>
  );

  return (
    <Layout>
      <div className="max-w-7xl mx-auto space-y-8 p-2 md:p-4 animate-in fade-in duration-1000">
        
        {/* Header Dashboard Modern */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-card/50 backdrop-blur-md border border-border p-8 rounded-[2.5rem] shadow-2xl overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl -mr-10 -mt-10" />
          <div className="relative z-10">
            <h1 className="text-5xl font-black tracking-tighter leading-none">V-CORE <span className="text-primary italic">TRACK</span></h1>
            <div className="flex items-center gap-2 mt-4 text-[10px] font-bold text-green-400 bg-green-500/10 px-3 py-1 rounded-full w-fit">
              <Activity className="w-3 h-3 animate-bounce" /> INFRASTRUKTUR CLOUD AKTIF (NO-LIMIT)
            </div>
          </div>
          <div className="mt-6 md:mt-0 text-right relative z-10">
            <p className="text-[10px] font-bold opacity-30 uppercase tracking-[0.2em] mb-1">Auto-Reset Threshold</p>
            <p className="text-xl font-mono font-black text-primary">20,000 VISITS</p>
          </div>
        </div>

        {/* Stats Grid 5 Kolom */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
          {[
            { label: "Public Visitor", val: stats.visitorSessions, icon: Eye, color: "text-blue-400" },
            { label: "Admin Access", val: stats.adminSessions, icon: Zap, color: "text-yellow-400" },
            { label: "Page View", val: stats.totalPageViews, icon: BarChart, color: "text-orange-400" },
            { label: "Avg Duration", val: formatDuration(stats.avgDuration), icon: Clock, color: "text-green-400" },
            { label: "System Loop", val: stats.totalSessions, icon: RefreshCcw, color: "text-primary" },
          ].map((card, i) => (
            <div key={i} className="bg-card border border-border p-7 rounded-[2rem] relative overflow-hidden group hover:border-primary/50 hover:bg-muted/30 transition-all duration-500 shadow-lg">
              <card.icon className={`w-16 h-16 absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-20 transition-opacity duration-700 ${card.color}`} />
              <p className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest mb-3">{card.label}</p>
              <p className="text-4xl font-black tracking-tighter tabular-nums">{card.val?.toLocaleString()}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Traffic Log Table */}
          <div className="lg:col-span-2 bg-card border border-border rounded-[2.5rem] overflow-hidden shadow-2xl shadow-primary/5">
            <div className="p-8 border-b border-border bg-muted/20 flex justify-between items-center">
              <h3 className="font-black text-sm uppercase tracking-widest flex items-center gap-2"><Users className="w-5 h-5 text-primary" /> Traffic Monitor</h3>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                <div className="w-2 h-2 bg-primary rounded-full animate-ping" />
                <span className="text-[9px] font-black text-primary uppercase">Live</span>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[10px] uppercase font-bold text-foreground/30 border-b border-border bg-muted/5">
                    <th className="px-8 py-5">UID Session</th>
                    <th className="px-8 py-5">Role</th>
                    <th className="px-8 py-5">Engagement</th>
                    <th className="px-8 py-5">Uptime</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {sessions.map((s) => (
                    <tr key={s.id} className="hover:bg-primary/5 transition-all duration-300 group">
                      <td className="px-8 py-5 font-mono text-[10px] opacity-40 group-hover:text-primary group-hover:opacity-100">{s.id}</td>
                      <td className="px-8 py-5">
                        <span className={`text-[9px] font-black px-3 py-1 rounded-lg uppercase tracking-wider ${s.userType === 'admin' ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-muted text-foreground/50 border border-border'}`}>
                          {s.userType}
                        </span>
                      </td>
                      <td className="px-8 py-5 font-bold text-xs">{s.pages.length} Pages</td>
                      <td className="px-8 py-5 text-xs font-mono text-foreground/50">{formatDuration(s.lastActivity - s.startTime)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Popular Path */}
          <div className="bg-card border border-border rounded-[2.5rem] p-8 shadow-2xl">
            <h3 className="font-black mb-8 uppercase text-xs tracking-[0.2em] flex items-center gap-2"><TrendingUp className="w-5 h-5 text-primary" /> Hot Path</h3>
            <div className="space-y-8">
              {stats.mostVisited.map((p: any, i: number) => (
                <div key={i} className="space-y-3 group">
                  <div className="flex justify-between text-[11px] font-black">
                    <span className="opacity-40 group-hover:text-primary group-hover:opacity-100 transition-all truncate w-44">{p.path}</span>
                    <span className="text-primary bg-primary/10 px-2 py-0.5 rounded-md">{p.visits}</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden border border-border/50">
                    <div className="h-full bg-gradient-to-r from-primary to-cyan-400 transition-all duration-1000" style={{ width: `${(p.visits / (stats.totalPageViews || 1)) * 100}%` }} />
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
