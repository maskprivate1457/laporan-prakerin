import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Users, Eye, Zap, Activity, Shield, BarChart3, Fingerprint, RefreshCcw, Globe, MousePointer2 } from "lucide-react";
import { getStats, initializeTracking } from "@/lib/tracking";

export default function AdminDashboard() {
  const [data, setData] = useState<any>(null);

  const sync = async () => {
    const res = await getStats();
    setData(res);
  };

  useEffect(() => {
    initializeTracking(); // Pastikan tracking jalan
    sync();
    const timer = setInterval(sync, 5000); // Sinkronisasi otomatis tiap 5 detik
    return () => clearInterval(timer);
  }, []);

  if (!data) return <div className="p-20 text-center animate-pulse font-mono">CONNECTING TO API...</div>;

  return (
    <Layout>
      <div className="max-w-6xl mx-auto p-4 space-y-6">
        
        {/* 1. Header & Reset Progress */}
        <div className="bg-card border border-border p-8 rounded-[2.5rem] shadow-xl flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-primary/10 rounded-3xl text-primary animate-bounce">
              <Shield size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tighter italic uppercase">Admin <span className="text-primary">Terminal</span></h1>
              <p className="text-[10px] font-bold text-green-500 flex items-center gap-2">
                <Activity size={12} className="animate-pulse" /> REST API: CONNECTED (NO-LIMIT)
              </p>
            </div>
          </div>
          <div className="bg-muted px-6 py-3 rounded-2xl text-right min-w-[200px]">
            <p className="text-[10px] font-bold opacity-40 uppercase mb-1">Reset Milestone (20k)</p>
            <div className="h-1.5 w-full bg-background rounded-full overflow-hidden">
               <div className="h-full bg-primary" style={{ width: `${(data.visitorCount / 20000) * 100}%` }} />
            </div>
            <p className="text-xs font-mono mt-1 font-bold text-primary">{data.visitorCount.toLocaleString()} / 20,000</p>
          </div>
        </div>

        {/* 2-5. Utama: Visitor, Views, Admin, Live */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatBox label="Total Visitors" val={data.visitorCount} icon={<Users/>} color="text-blue-500" />
          <StatBox label="Page Views" val={data.viewCount} icon={<BarChart3/>} color="text-orange-500" />
          <StatBox label="Admin Log" val={data.adminCount} icon={<Zap/>} color="text-purple-500" />
          <StatBox label="Active Now" val={data.liveNow} icon={<Globe/>} color="text-green-500" />
        </div>

        {/* 6-10. Detail: Session ID, Device, Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 bg-card border border-border p-6 rounded-[2rem] flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4">
               <Fingerprint className="text-primary" />
               <h3 className="text-xs font-bold uppercase tracking-widest">Sesi Aktif Anda</h3>
            </div>
            <p className="text-xs font-mono bg-muted p-4 rounded-xl border border-border break-all">
              {data.sessionId}
            </p>
          </div>

          <div className="bg-card border border-border p-6 rounded-[2rem] flex flex-col items-center justify-center text-center">
            <MousePointer2 className="mb-2 text-primary opacity-20" size={40} />
            <p className="text-[10px] font-bold opacity-40 uppercase">Metode Tracking</p>
            <p className="text-sm font-bold mt-1">Cloud Hit Counter</p>
            <p className="text-[9px] opacity-50 mt-2 font-mono">api.countapi.xyz</p>
          </div>
        </div>

        <div className="bg-primary/5 p-4 rounded-2xl border border-primary/10 text-center">
           <p className="text-[9px] font-bold opacity-60 uppercase italic">Data diperbarui otomatis setiap 5 detik tanpa refresh halaman</p>
        </div>
      </div>
    </Layout>
  );
}

function StatBox({ label, val, icon, color }: any) {
  return (
    <div className="bg-card border border-border p-6 rounded-[2rem] relative overflow-hidden group hover:border-primary/50 transition-all shadow-sm">
      <div className={`absolute -right-2 -bottom-2 opacity-5 ${color}`}>{icon}</div>
      <p className="text-[10px] font-bold opacity-40 uppercase mb-1 tracking-tighter">{label}</p>
      <p className="text-3xl font-black tabular-nums">{val}</p>
    </div>
  );
}
