import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Users, Eye, Zap, Activity, ShieldCheck, Fingerprint, RefreshCcw } from "lucide-react";
import { getSessionStats, initializeTracking } from "@/lib/tracking";

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    initializeTracking();
    const sync = async () => {
      const data = await getSessionStats();
      setStats(data);
    };
    sync();
    const interval = setInterval(sync, 5000); // Sync tiap 5 detik
    return () => clearInterval(interval);
  }, []);

  if (!stats) return <div className="p-20 text-center animate-pulse italic">Connecting to Cloud Server...</div>;

  return (
    <Layout>
      <div className="max-w-6xl mx-auto p-6 space-y-8 animate-in fade-in duration-700">
        
        {/* Header & Milestone (Fitur 1, 2, 3) */}
        <div className="bg-card border border-border p-8 rounded-[2.5rem] flex flex-col md:flex-row justify-between items-center shadow-xl">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-primary/10 rounded-2xl text-primary animate-pulse"><ShieldCheck size={32}/></div>
            <div>
              <h1 className="text-3xl font-black italic tracking-tighter">ADMIN <span className="text-primary">ANALYTICS</span></h1>
              <p className="text-[10px] font-bold text-green-500 flex items-center gap-2"><Activity size={12}/> SYSTEM ACTIVE (GLOBAL SYNC)</p>
            </div>
          </div>
          <div className="w-full md:w-64 bg-muted p-4 rounded-xl">
             <div className="flex justify-between text-[9px] font-black uppercase mb-1 opacity-50"><span>Cycle Progress</span><span>20,000</span></div>
             <div className="h-1.5 w-full bg-background rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: `${(stats.totalSessions / 20000) * 100}%` }} />
             </div>
             <p className="text-right text-[10px] mt-1 font-bold text-primary">{stats.totalSessions} / 20.000</p>
          </div>
        </div>

        {/* Statistik Grid (Fitur 4, 5, 6, 7) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard label="Total Visitor" val={stats.totalSessions} icon={<Users/>} />
          <StatCard label="Page Views" val={stats.totalPageViews} icon={<Eye/>} />
          <StatCard label="Admin Hit" val={stats.adminSessions} icon={<Zap/>} />
          <StatCard label="Live Now" val={stats.liveNow} icon={<Activity/>} color="text-green-500" />
        </div>

        {/* Identity & Session (Fitur 8, 9, 10) */}
        <div className="bg-card border border-border p-8 rounded-[2.5rem] relative overflow-hidden group">
          <Fingerprint className="absolute -right-4 -bottom-4 w-32 h-32 opacity-5 text-primary" />
          <h3 className="text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
             <Fingerprint size={16} className="text-primary" /> Current Session Identity
          </h3>
          <p className="text-xs font-mono bg-muted p-5 rounded-xl border border-border break-all italic opacity-70">
            {stats.currentSession.id || "Anonymous_Session"}
          </p>
          <div className="mt-4 text-[9px] uppercase font-bold opacity-30 tracking-widest">Update: Every 5 Seconds • No Database Mode</div>
        </div>
      </div>
    </Layout>
  );
}

function StatCard({ label, val, icon, color = "text-primary" }: any) {
  return (
    <div className="bg-card border border-border p-8 rounded-[2rem] relative overflow-hidden group hover:border-primary/50 transition-all">
      <div className={`absolute -right-2 -bottom-2 opacity-5 ${color}`}>{icon}</div>
      <p className="text-[10px] font-black opacity-40 uppercase mb-2 tracking-widest">{label}</p>
      <p className="text-4xl font-black italic">{val}</p>
    </div>
  );
}
