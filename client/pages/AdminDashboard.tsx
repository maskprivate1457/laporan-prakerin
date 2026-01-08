import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import {
  Users,
  Eye,
  Activity,
  Clock,
  BarChart3,
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

  const refreshData = () => {
    setStats(getSessionStats());
    setSessions(getAllSessions().slice(0, 8));
  };

  useEffect(() => {
    if (!isAdmin) {
      navigate("/");
      return;
    }

    refreshData();

    const interval = setInterval(refreshData, 2000);
    window.addEventListener("storage", refreshData);

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

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-10 space-y-10">

        {/* HEADER */}
        <div className="space-y-2 animate-fade-in">
          <h1 className="text-4xl font-bold tracking-tight">
            Realtime Analytics
          </h1>
          <p className="text-foreground/60">
            Monitoring pengunjung secara langsung
          </p>
        </div>

        {/* STATS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Visitors"
            value={stats.totalVisitors}
            icon={<Users />}
          />
          <StatCard
            title="Active Visitors"
            value={stats.activeVisitors}
            icon={<Activity />}
            highlight
          />
          <StatCard
            title="Page Views"
            value={stats.totalPageViews}
            icon={<Eye />}
          />
          <StatCard
            title="Avg Duration"
            value={formatDuration(stats.avgSessionDuration)}
            icon={<Clock />}
          />
        </div>

        {/* MOST VISITED */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-lg animate-slide-up">
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Halaman Paling Dikunjungi
          </h3>

          <div className="space-y-3">
            {stats.mostVisitedPages.map((page, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{page.path || "/"}</span>
                  <span className="font-semibold">
                    {page.visits}x
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-700"
                    style={{
                      width: `${
                        (page.visits /
                          stats.totalPageViews) *
                        100
                      }%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RECENT SESSIONS */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-lg animate-slide-up">
          <h3 className="font-semibold text-lg mb-4">
            Sesi Terakhir
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-border">
                <tr className="text-left text-foreground/60">
                  <th className="pb-3">Session</th>
                  <th className="pb-3">Type</th>
                  <th className="pb-3">Pages</th>
                  <th className="pb-3">Duration</th>
                </tr>
              </thead>
              <tbody>
                {sessions.map((s, i) => (
                  <tr
                    key={i}
                    className="border-b border-border last:border-0 hover:bg-muted/40 transition"
                  >
                    <td className="py-3 font-mono text-xs">
                      {s.id.slice(0, 16)}…
                    </td>
                    <td className="py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          s.userType === "admin"
                            ? "bg-primary/20 text-primary"
                            : "bg-muted text-foreground"
                        }`}
                      >
                        {s.userType}
                      </span>
                    </td>
                    <td className="py-3">
                      {s.pages.length}
                    </td>
                    <td className="py-3">
                      {formatDuration(
                        s.lastActivity - s.startTime
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}

/* ============================= */
/* COMPONENTS */
/* ============================= */

function StatCard({
  title,
  value,
  icon,
  highlight = false,
}: {
  title: string;
  value: string | number;
  icon: JSX.Element;
  highlight?: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
        highlight ? "ring-1 ring-primary/40" : ""
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-foreground/60">
            {title}
          </p>
          <p className="text-3xl font-bold mt-1">
            {value}
          </p>
        </div>
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
          {icon}
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
    </div>
  );
}
