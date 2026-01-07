import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { 
  Users, Eye, Clock, BarChart, RefreshCw, 
  ShieldCheck, Activity, Zap, Cloud 
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
    setSessions(all.reverse().slice(0, 10));
    setLoading(false);
  };

  useEffect(() => {
    if (localStorage.getItem("isAdmin") !== "true") { navigate("/"); return; }
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  const formatDuration = (ms: number) => {
    const s = Math.floor(ms / 1000);
    return s > 60 ? `${Math.floor(s/60)}m ${s%60}s` : `${s}s`;
  };

  if (loading) return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-primary">
        <Cloud className="w-12 h-12 animate-pulse mb-4" />
        <p className="font-mono text-xs tracking-[0.3em]">FETCHING FROM CLOUD BIN...</p>
      </div>
    </Layout>
  );

  return (
    <Layout>
      <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500">
        
        {/* Header Dashboard */}
        <div className="flex justify-between items-center bg-card p-8 rounded-[2rem] border border-border shadow-2xl">
          <div>
            <h1 className="text-4xl font-black italic tracking-tighter uppercase">Cloud <span className="text-primary">Terminal</span></h1>
            <div className="flex items-center gap-2 text-[10px] font-bold text-blue-500 mt-2">
              <Activity className="w-3 h-3 animate-spin-slow" /> DATA PERSISTENT - NO LIMIT MODE
            </div>
          </div>
          <div className="hidden md:block text-right">
            <p className="text-[10px] font-bold opacity-30 uppercase">System Status</p>
            <p className="text-sm font-black text-green-500">ENCRYPTED & SYNCED</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { label: "Visitors", val: stats.visitorSessions, icon: Eye, color: "text-blue-500" },
            { label: "Admins", val: stats.adminSessions, icon: ShieldCheck, color: "text-purple-500" },
            { label: "Total Hits", val: stats.totalPageViews, icon: BarChart, color: "text-orange-500" },
            { label: "Avg Stay", val: formatDuration(stats.avgDuration), icon: Clock, color: "text-green-500" },
            { label: "Reset Loop", val: stats.totalSessions, icon: Zap, color: "text-yellow-500" },
          ].map((c, i) => (
            <div key={i} className="bg-card border border-border p-6 rounded-[1.5rem] relative overflow-hidden group hover:bg-primary/5 transition-all">
              <c.icon className={`w-12 h-12 absolute -right-3 -bottom-3 opacity-5 ${c.color}`} />
              <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest">{c.label}</p>
              <p className="text-3xl font-black mt-2 tabular-nums tracking-tighter">{c.val?.toLocaleString()}</p>
              <div className="mt-2 text-[9px] font-bold text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                <RefreshCw className="w-2 h-2 animate-spin" /> Live update
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Log */}
          <div className="lg:col-span-2 bg-card border border-border rounded-[1.5rem] overflow-hidden">
            <div className="p-6 border-b border-border bg-muted/20">
              <h3 className="text-xs font-black uppercase tracking-widest">Global Traffic Log</h3>
            </div>
            <div className="overflow-x-auto text-sm">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[10px] font-bold opacity-30 border-b border-border uppercase bg-muted/5">
                    <th className="px-6 py-4">ID</th>
                    <th className="px-6 py-4">Role</th>
                    <th className="px-6 py-4">Hits</th>
                    <th className="px-6 py-4">Duration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {sessions.map((s) => (
                    <tr key={s.id} className="hover:bg-muted/30 transition-colors">
                      <td className="px-6 py-4 font-mono text-[10px] opacity-60">{s.id.slice(-10)}</td>
                      <td className="px-6 py-4 uppercase text-[9px] font-black tracking-tighter">
                        <span className={s.userType === 'admin' ? 'text-primary' : 'opacity-40'}>{s.userType}</span>
                      </td>
                      <td className="px-6 py-4 font-bold">{s.pages.length} Pages</td>
                      <td className="px-6 py-4 text-xs font-mono opacity-50">{formatDuration(s.lastActivity - s.startTime)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Popular Pages */}
          <div className="bg-card border border-border rounded-[1.5rem] p-6 shadow-sm">
            <h3 className="text-xs font-black uppercase tracking-widest mb-8 text-primary">Popular Route</h3>
            <div className="space-y-6">
              {stats.mostVisited.map((p: any, i: number) => (
                <div key={i} className="group">
                  <div className="flex justify-between text-[10px] font-bold mb-2">
                    <span className="opacity-40 group-hover:opacity-100 transition-opacity">{p.path}</span>
                    <span className="text-primary">{p.visits} hits</span>
                  </div>
                  <div className="h-1 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary transition-all duration-1000" style={{ width: `${(p.visits / (stats.totalPageViews || 1)) * 100}%` }} />
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
