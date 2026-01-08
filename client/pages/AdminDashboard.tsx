import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Users, Eye, Zap, Activity, ShieldCheck, BarChart3, Fingerprint, RefreshCcw, Globe, MousePointerClick } from "lucide-react";
import { getStats, initializeTracking } from "@/lib/tracking";

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    initializeTracking();
    const data = getStats();
    setStats(data);

    const interval = setInterval(() => {
      setStats(getStats());
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  if (!stats) return <div className="p-20 text-center uppercase font-mono">Loading Dashboard...</div>;

  return (
    <Layout>
      <div className="max-w-6xl mx-auto p-4 space-y-8 animate-in fade-in duration-500">
        
        {/* Header Section */}
        <div className="bg-card border border-border p-8 rounded-[2.5rem] shadow-2xl flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-primary/10 rounded-3xl text-primary animate-pulse">
              <ShieldCheck size={32} />
            </div>
            <div>
              <h1 className="text-4xl font-black tracking-tighter italic uppercase">Admin <span className="text-primary">Monitor</span></h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="h-2 w-2 rounded-full bg-green-500 animate-ping" />
                <p className="text-[10px] font-bold text-green-500 uppercase tracking-widest">{stats.liveNow} User Aktif</p>
              </div>
            </div>
          </div>

          <div className="bg-muted px-6 py-4 rounded-2xl border border-border w-full md:w-64">
            <div className="flex justify-between text-[9px] font-black uppercase opacity-40 mb-2">
              <span>Reset Milestone</span>
              <span>20,000</span>
            </div>
            <div className="h-2 w-full bg-background rounded-full overflow-hidden">
              <div className="h-full bg-primary" style={{ width: `${(stats.visitorCount / 20000) * 100}%` }} />
            </div>
            <p className="text-xs font-mono font-bold text-primary mt-2 text-right">{stats.visitorCount} Hits</p>
          </div>
        </div>

        {/* Analytics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatBox label="Unique Visitors" val={stats.visitorCount} icon={<Users/>} color="text-blue-500" />
          <StatBox label="Total Page Views" val={stats.viewCount} icon={<BarChart3/>} color="text-orange-500" />
          <StatBox label="Admin Logins" val={stats.adminCount} icon={<Zap/>} color="text-purple-500" />
          <StatBox label="Sync Rate" val="Active" icon={<Globe/>} color="text-green-500" />
        </div>

        {/* Identity & Session */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-card border border-border p-8 rounded-[2.5rem] relative overflow-hidden">
            <Fingerprint className="absolute -right-4 -bottom-4 w-32 h-32 opacity-5 text-primary" />
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
               <Fingerprint size={16} className="text-primary" /> Session ID (No-Repeat)
            </h3>
            <p className="text-sm font-mono bg-muted p-5 rounded-2xl border border-border break-all text-primary/80 italic">
              {stats.sessionId}
            </p>
          </div>

          <div className="bg-card border border-border p-8 rounded-[2.5rem] flex flex-col items-center justify-center text-center group">
             <div className="p-4 rounded-full mb-3 bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <MousePointerClick size={24} className="text-primary" />
             </div>
             <p className="text-[10px] font-black uppercase opacity-40">Build Status</p>
             <p className="text-sm font-bold text-primary mt-1 uppercase">Production Ready</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

function StatBox({ label, val, icon, color }: any) {
  return (
    <div className="bg-card border border-border p-8 rounded-[2.5rem] relative overflow-hidden group hover:border-primary/50 transition-all shadow-sm">
      <div className={`absolute -right-4 -bottom-4 w-20 h-20 opacity-5 group-hover:opacity-10 transition-all duration-500 ${color}`}>{icon}</div>
      <p className="text-[10px] font-black text-foreground/40 uppercase tracking-widest mb-2">{label}</p>
      <p className="text-5xl font-black tracking-tighter italic">{val}</p>
    </div>
  );
}
