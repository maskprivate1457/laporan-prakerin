import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Users, Eye, BarChart, RefreshCw, Activity, ShieldCheck, Zap } from "lucide-react";
import { getSessionStats, initializeTracking } from "@/lib/tracking";

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentSid, setCurrentSid] = useState("");

  const refreshStats = async () => {
    const data = await getSessionStats();
    setStats(data);
    setLoading(false);
  };

  useEffect(() => {
    // Pastikan tracking terinisialisasi
    initializeTracking();
    setCurrentSid(sessionStorage.getItem("current_sid") || "Unknown");

    refreshStats();
    // Interval refresh 5 detik untuk melihat perubahan angka
    const interval = setInterval(refreshStats, 5000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <RefreshCw className="w-10 h-10 text-primary animate-spin mb-4" />
        <p className="font-mono text-xs animate-pulse">CONNECTING TO COUNT-API...</p>
      </div>
    </Layout>
  );

  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
        
        {/* Header Dashboard */}
        <div className="bg-card border border-border p-8 rounded-[2rem] shadow-2xl flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-primary/10 rounded-2xl text-primary animate-bounce">
              <ShieldCheck size={32} />
            </div>
            <div>
              <h1 className="text-4xl font-black tracking-tighter uppercase italic">
                Live <span className="text-primary">Monitor</span>
              </h1>
              <p className="text-[10px] font-bold text-green-500 flex items-center gap-2">
                <Activity size={12} className="animate-pulse" /> REST API STATUS: OPERATIONAL
              </p>
            </div>
          </div>
          <div className="bg-muted px-6 py-3 rounded-2xl border border-border text-right">
            <p className="text-[10px] font-bold opacity-40 uppercase">Your Session ID</p>
            <p className="text-xs font-mono font-bold text-primary truncate w-40 md:w-auto">{currentSid}</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-card border border-border p-8 rounded-[2rem] relative overflow-hidden group hover:border-primary/50 transition-all">
            <Eye className="absolute -right-4 -bottom-4 w-24 h-24 opacity-5 text-blue-500" />
            <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest mb-2">Total Visitor</p>
            <p className="text-4xl font-black tracking-tighter">{stats.visitorSessions.toLocaleString()}</p>
            <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-blue-500 uppercase">
              <Zap size={10} /> Syncing Live
            </div>
          </div>

          <div className="bg-card border border-border p-8 rounded-[2rem] relative overflow-hidden group hover:border-primary/50 transition-all">
            <ShieldCheck className="absolute -right-4 -bottom-4 w-24 h-24 opacity-5 text-purple-500" />
            <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest mb-2">Admin Logins</p>
            <p className="text-4xl font-black tracking-tighter">{stats.adminSessions.toLocaleString()}</p>
            <p className="mt-4 text-[10px] font-bold text-purple-500 uppercase">Secured Access</p>
          </div>

          <div className="bg-card border border-border p-8 rounded-[2rem] relative overflow-hidden group hover:border-primary/50 transition-all">
            <BarChart className="absolute -right-4 -bottom-4 w-24 h-24 opacity-5 text-orange-500" />
            <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest mb-2">Page Views</p>
            <p className="text-4xl font-black tracking-tighter">{stats.totalPageViews.toLocaleString()}</p>
            <p className="mt-4 text-[10px] font-bold text-orange-500 uppercase">Across All Pages</p>
          </div>

          <div className="bg-card border border-border p-8 rounded-[2rem] relative overflow-hidden group hover:border-primary/50 transition-all">
            <RefreshCw className="absolute -right-4 -bottom-4 w-24 h-24 opacity-5 text-primary" />
            <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest mb-2">System Reset</p>
            <p className="text-4xl font-black tracking-tighter">{stats.totalSessions.toLocaleString()}</p>
            <p className="mt-4 text-[10px] font-bold text-primary uppercase">Loop at 20,000</p>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-primary/5 border border-primary/20 p-6 rounded-[2rem] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-ping" />
            <p className="text-sm font-bold">Sistem sedang menghitung pengunjung secara real-time melalui REST API.</p>
          </div>
          <p className="text-xs font-mono opacity-50 hidden md:block text-primary">ENDPOINT: countapi.xyz/hit/{API_NAMESPACE}</p>
        </div>
      </div>
    </Layout>
  );
}
