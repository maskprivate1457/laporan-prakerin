import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Users, Eye, Clock, BarChart, RefreshCw, Activity, ShieldCheck } from "lucide-react";
import { getSessionStats, getAllSessions } from "@/lib/tracking";

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const syncStats = async () => {
    const data = await getSessionStats();
    const all = await getAllSessions();
    setStats(data);
    setSessions(all.reverse().slice(0, 10));
    setLoading(false);
  };

  useEffect(() => {
    syncStats();
    const interval = setInterval(syncStats, 5000); // Sinkronisasi otomatis
    return () => clearInterval(interval);
  }, []);

  const formatDuration = (ms: number) => {
    const s = Math.floor(ms / 1000);
    return s > 60 ? `${Math.floor(s/60)}m ${s%60}s` : `${s}s`;
  };

  if (loading) return (
    <Layout>
      <div className="flex flex-col items-center justify-center py-20 text-primary">
        <RefreshCw className="animate-spin mb-4 w-10 h-10" />
        <p className="animate-pulse font-mono text-xs tracking-widest">CONNECTING TO PUBLIC CLOUD...</p>
      </div>
    </Layout>
  );

  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
        
        {/* Header */}
        <div className="bg-card border border-border p-6 rounded-3xl flex flex-col md:flex-row justify-between items-center gap-4 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-2xl text-primary"><ShieldCheck /></div>
            <div>
              <h1 className="text-3xl font-black tracking-tighter">TRACKING <span className="text-primary">ENGINE</span></h1>
              <p className="text-[10px] font-bold text-green-500 flex items-center gap-1 uppercase">
                <Activity className="w-3 h-3 animate-pulse" /> Public API Mode (No Login Required)
              </p>
            </div>
          </div>
          <div className="text-right bg-muted px-4 py-2 rounded-xl">
            <p className="text-[10px] font-bold opacity-40 uppercase">Limit Reset</p>
            <p className="text-sm font-mono font-bold text-primary italic">20,000 CYCLES</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total Visitor" val={stats.visitorSessions} icon={<Eye />} color="text-blue-500" />
          <StatCard label="Admin Mode" val={stats.adminSessions} icon={<ShieldCheck />} color="text-purple-500" />
          <StatCard label="Page Views" val={stats.totalPageViews} icon={<BarChart />} color="text-orange-500" />
          <StatCard label="System Loop" val={stats.totalSessions} icon={<RefreshCw />} color="text-primary" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Log */}
          <div className="lg:col-span-2 bg-card border border-border rounded-2xl overflow-hidden shadow-lg">
            <div className="p-5 border-b border-border bg-muted/30 font-bold text-xs uppercase tracking-widest flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" /> Global User Activity
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="text-[10px] font-bold opacity-30 uppercase border-b border-border">
                    <th className="px-6 py-4">Session</th>
                    <th className="px-6 py-4">Role</th>
                    <th className="px-6 py-4">Hits</th>
                    <th className="px-6 py-4">Stay</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {sessions.map((s: any) => (
                    <tr key={s.id} className="hover:bg-muted/50 transition-colors">
                      <td className="px-6 py-4 font-mono text-[10px] opacity-60 italic">{s.id}</td>
                      <td className="px-6 py-4">
                        <span className={`text-[9px] font-black px-2 py-0.5 rounded ${s.userType === 'admin' ? 'bg-primary/20 text-primary' : 'bg-muted text-foreground/40'}`}>
                          {s.userType}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-bold">{s.pages?.length || 0}</td>
                      <td className="px-6 py-4 text-xs opacity-50">{formatDuration(s.lastActivity - s.startTime)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Popular */}
          <div className="bg-card border border-border rounded-2xl p-6 shadow-lg">
            <h3 className="text-xs font-black uppercase tracking-widest mb-6 flex items-center gap-2">
              <BarChart className="w-4 h-4 text-primary" /> Top Path
            </h3>
            <div className="space-y-6">
              {stats.mostVisited.map((p: any, i: number) => (
                <div key={i} className="space-y-2 group">
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-tighter">
                    <span className="opacity-40 group-hover:opacity-100 transition-opacity">{p.path}</span>
                    <span className="text-primary">{p.visits} Hits</span>
                  </div>
                  <div className="h-1 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: `${(p.visits / (stats.totalPageViews || 1)) * 100}%` }} />
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

function StatCard({ label, val, icon, color }: any) {
  return (
    <div className="bg-card border border-border p-6 rounded-3xl relative overflow-hidden group hover:border-primary/50 transition-all">
      <div className={`w-12 h-12 absolute -right-3 -bottom-3 opacity-5 ${color}`}>{icon}</div>
      <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest mb-1">{label}</p>
      <p className="text-3xl font-black tabular-nums">{val?.toLocaleString()}</p>
    </div>
  );
    }
