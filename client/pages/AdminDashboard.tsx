import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { 
  Users, Eye, BarChart, RefreshCw, Activity, 
  Smartphone, Monitor, Layers, ShieldCheck, Zap 
} from "lucide-react";
import { getAdvancedStats, initializeTracking } from "@/lib/tracking";

export default function AdminDashboard() {
  const [s, setS] = useState<any>(null);

  const refresh = async () => {
    const data = await getAdvancedStats();
    if (data) setS(data);
  };

  useEffect(() => {
    initializeTracking();
    refresh();
    const inv = setInterval(refresh, 5000); // Sinkronisasi otomatis setiap 5 detik
    return () => clearInterval(inv);
  }, []);

  if (!s) return (
    <Layout>
      <div className="flex justify-center items-center min-h-[50vh] animate-pulse">
        <RefreshCw className="animate-spin text-primary mr-2" />
        <span className="font-mono text-xs uppercase tracking-tighter">Syncing Supabase Engine...</span>
      </div>
    </Layout>
  );

  return (
    <Layout>
      <div className="max-w-7xl mx-auto space-y-8 p-4">
        
        {/* Fitur 1: Live Pulse Header */}
        <div className="bg-card border border-border p-8 rounded-[2.5rem] flex flex-col md:flex-row justify-between items-center shadow-2xl">
          <div className="flex items-center gap-5">
            <div className="p-4 bg-primary/10 rounded-3xl text-primary animate-pulse"><Zap size={30}/></div>
            <div>
              <h1 className="text-3xl font-black tracking-tighter uppercase italic">Supabase <span className="text-primary text-xl font-normal">Analytics</span></h1>
              <p className="text-[10px] font-bold text-green-500 mt-1 uppercase flex items-center gap-1">
                <Activity size={12}/> {s.live} User Online Saat Ini
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold opacity-30 uppercase tracking-[0.2em] mb-1">Reset Milestone</p>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black text-primary tabular-nums">{s.total}</span>
              <span className="text-xs opacity-40 font-bold italic">/ 20,000</span>
            </div>
          </div>
        </div>

        {/* Fitur 2-5: Card Statistik Utana */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Widget label="Visitor Log" val={s.visitors} icon={<Users/>} />
          <Widget label="Admin Log" val={s.admins} icon={<ShieldCheck/>} />
          <Widget label="Total Clicks" val={s.views} icon={<Eye/>} />
          <Widget label="Page Depth" val={`${s.avgDepth} Pgs`} icon={<Layers/>} />
        </div>

        {/* Fitur 6-10: Analitik Mendalam */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-card border border-border rounded-[2rem] overflow-hidden">
             <div className="p-6 border-b border-border bg-muted/30 font-bold text-xs uppercase tracking-widest flex items-center gap-2">
               <Activity className="w-4 h-4 text-primary" /> Traffic Monitor (Supabase REST)
             </div>
             <table className="w-full text-left text-sm">
                <thead className="text-[10px] opacity-30 uppercase font-bold border-b border-border">
                  <tr>
                    <th className="px-6 py-4 italic font-mono">Session ID</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Path Terakhir</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {s.recent.map((sess: any) => (
                    <tr key={sess.id} className="hover:bg-primary/5 transition-colors">
                      <td className="px-6 py-4 font-mono text-[10px] opacity-60 truncate max-w-[100px]">{sess.id}</td>
                      <td className="px-6 py-4">
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${sess.user_type === 'admin' ? 'bg-primary/20 text-primary' : 'bg-muted'}`}>
                          {sess.user_type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-[10px] italic opacity-50 truncate max-w-[150px]">
                        {sess.pages[sess.pages.length - 1].path}
                      </td>
                    </tr>
                  ))}
                </tbody>
             </table>
          </div>

          <div className="bg-card border border-border rounded-[2rem] p-8 text-center space-y-6">
             <h3 className="text-xs font-bold uppercase tracking-widest opacity-50">Device Fingerprint</h3>
             <div className="flex justify-around items-center h-full">
                <div className="flex flex-col items-center">
                   <Smartphone className={s.mobile > 50 ? 'text-primary' : ''} />
                   <p className="text-xl font-black mt-2">{s.mobile}%</p>
                   <p className="text-[10px] opacity-50 uppercase font-bold">Mobile</p>
                </div>
                <div className="w-[1px] h-12 bg-border" />
                <div className="flex flex-col items-center">
                   <Monitor className={s.mobile <= 50 ? 'text-primary' : ''} />
                   <p className="text-xl font-black mt-2">{100 - s.mobile}%</p>
                   <p className="text-[10px] opacity-50 uppercase font-bold">Desktop</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

function Widget({ label, val, icon }: any) {
  return (
    <div className="bg-card border border-border p-8 rounded-[2rem] relative group overflow-hidden hover:border-primary/50 transition-all shadow-sm">
      <div className="absolute -right-2 -bottom-2 opacity-5 text-primary group-hover:scale-125 transition-transform">{icon}</div>
      <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest mb-2">{label}</p>
      <p className="text-3xl font-black tabular-nums tracking-tighter">{val}</p>
    </div>
  );
                      }
