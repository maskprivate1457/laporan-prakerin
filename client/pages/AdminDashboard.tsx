import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import {
  Users,
  Eye,
  Activity,
  Clock,
  BarChart3,
  Wifi,
  WifiOff,
} from "lucide-react";
import {
  getSessionStats,
  getAllSessions,
} from "@/lib/tracking";

interface SessionStats {
  totalSessions: number;
  totalVisitors: number;
  activeVisitors: number;
  adminSessions: number;
  visitorSessions: number;
  totalPageViews: number;
  avgSessionDuration: number;
  mostVisitedPages: { path: string; visits: number }[];
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  const [stats, setStats] = useState<SessionStats | null>(null);
  const [sessions, setSessions] = useState<any[]>([]);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const refreshData = () => {
    setStats(getSessionStats());
    setSessions(getAllSessions().slice(0, 10));
  };

  useEffect(() => {
    if (!isAdmin) {
      navigate("/");
      return;
    }

    refreshData();

    const interval = setInterval(refreshData, 2000);

    window.addEventListener("storage", refreshData);
    window.addEventListener("online", () => setIsOnline(true));
    window.addEventListener("offline", () => setIsOnline(false));

    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", refreshData);
    };
  }, [isAdmin, navigate]);

  if (!stats) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-[60vh]">
          <div className="animate-pulse text-foreground/70">
            Loading realtime analytics...
          </div>
        </div>
      </Layout>
    );
  }

  const formatDuration = (ms: number) => {
    const s = Math.floor(ms / 1000);
    const m = Math.floor(s / 60);
    return m > 0 ? `${m}m ${s % 60}s` : `${s}s`;
  };

  /* ============================= */
  /* ONLINE STATUS PER SESSION     */
  /* ============================= */
  const isSessionOnline = (session: any) => {
    return Date.now() - session.lastActivity < 8000;
  };

  /* ============================= */
  /* AUTO FLAG ENGINE              */
  /* ============================= */
  const calculateRiskScore = (session: any) => {
    let score = 0;
    const now = Date.now();
    const idle = now - session.lastActivity;

    if (idle > 15000) score += 1;
    if (idle > 30000) score += 2;

    if (session.pages.length > 10) score += 2;
    if (session.pages.length > 20) score += 3;

    if (session.pages.length >= 2) {
      const last = session.pages.at(-1)?.timestamp;
      const prev = session.pages.at(-2)?.timestamp;
      if (last && prev && last - prev < 1000) score += 2;
    }

    if (!isOnline) score += 2;

    return score;
  };

  const getRiskLabel = (score: number) => {
    if (score >= 6)
      return { label: "HIGH RISK", color: "text-red-500" };
    if (score >= 3)
      return { label: "SUSPICIOUS", color: "text-yellow-500" };
    return { label: "NORMAL", color: "text-green-500" };
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-10 space-y-10">

        {/* HEADER */}
        <div className="flex items-center gap-4">
          <div
            className={`w-4 h-4 rounded-full ${
              isOnline
                ? "bg-green-500 animate-pulse"
                : "bg-red-500 animate-ping"
            }`}
          />
          <h1 className="text-4xl font-bold tracking-tight">
            Realtime Analytics
          </h1>
          {isOnline ? (
            <Wifi className="text-green-500" />
          ) : (
            <WifiOff className="text-red-500" />
          )}
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Total Visitors" value={stats.totalVisitors} icon={<Users />} />
          <StatCard title="Active Visitors" value={stats.activeVisitors} icon={<Activity />} highlight />
          <StatCard title="Page Views" value={stats.totalPageViews} icon={<Eye />} />
          <StatCard title="Avg Duration" value={formatDuration(stats.avgSessionDuration)} icon={<Clock />} />
        </div>

        {/* MOST VISITED */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-lg">
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Halaman Paling Dikunjungi
          </h3>

          {stats.mostVisitedPages.map((page, i) => (
            <div key={i} className="mb-3">
              <div className="flex justify-between text-sm">
                <span>{page.path || "/"}</span>
                <span>{page.visits}x</span>
              </div>
              <div className="h-2 bg-muted rounded-full">
                <div
                  className="h-full bg-gradient-to-r from-primary to-secondary transition-all"
                  style={{ width: `${(page.visits / stats.totalPageViews) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* ============================= */}
        {/* SESI TERAKHIR (LIVE + FLAG)   */}
        {/* ============================= */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-lg">
          <h3 className="font-semibold text-lg mb-4">Sesi Terakhir</h3>

          <div className="space-y-2">
            {sessions.map((s, i) => {
              const online = isSessionOnline(s);
              const riskScore = calculateRiskScore(s);
              const risk = getRiskLabel(riskScore);
              const lastPage = s.pages.at(-1)?.path;

              return (
                <div
                  key={i}
                  className={`flex items-center gap-4 p-3 rounded-xl transition-all
                    ${
                      riskScore >= 6
                        ? "bg-red-500/10"
                        : riskScore >= 3
                        ? "bg-yellow-500/10"
                        : "hover:bg-muted/40"
                    }
                  `}
                >
                  {/* ONLINE DOT */}
                  <div className="flex flex-col items-center">
                    <span
                      className={`w-3 h-3 rounded-full ${
                        online
                          ? "bg-green-500 animate-pulse"
                          : "bg-muted"
                      }`}
                    />
                    <span className="text-xs mt-1">
                      {online ? "online" : "offline"}
                    </span>
                  </div>

                  {/* INFO */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-sm font-mono">
                      {s.id.slice(0, 12)}…
                      <span className="px-2 py-0.5 text-xs rounded-full bg-muted">
                        {s.userType}
                      </span>
                      <span className={`text-xs font-semibold ${risk.color}`}>
                        {risk.label}
                      </span>
                    </div>

                    <div className="text-xs text-foreground/70 mt-1">
                      Live page: <b>{lastPage || "/"}</b>
                    </div>

                    <div className="text-xs text-foreground/50">
                      Risk score: {riskScore}
                    </div>
                  </div>

                  {/* DURATION */}
                  <div className="text-sm">
                    {formatDuration(s.lastActivity - s.startTime)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}

/* ============================= */
/* STAT CARD                     */
/* ============================= */

function StatCard({ title, value, icon, highlight = false }: any) {
  return (
    <div
      className={`rounded-2xl p-6 border bg-card shadow-lg ${
        highlight ? "ring-1 ring-primary" : ""
      }`}
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-foreground/60">{title}</p>
          <p className="text-3xl font-bold">{value}</p>
        </div>
        {icon}
      </div>
    </div>
  );
}
