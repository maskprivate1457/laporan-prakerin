import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import {
  BarChart3,
  Users,
  Eye,
  Clock,
  BarChart as BarChartIcon,
} from "lucide-react";
import { getSessionStats, getAllSessions } from "@/lib/tracking";

interface SessionStats {
  totalSessions: number;
  adminSessions: number;
  visitorSessions: number;
  totalPageViews: number;
  avgSessionDuration: number;
  mostVisitedPages: { path: string; visits: number }[];
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState<SessionStats | null>(null);
  const [sessions, setSessions] = useState<any[]>([]);
  const [isAdmin, setIsAdmin] = useState(
    localStorage.getItem("isAdmin") === "true"
  );

  useEffect(() => {
    if (!isAdmin) {
      navigate("/");
      return;
    }

    const statsData = getSessionStats();
    setStats(statsData);

    const allSessions = getAllSessions();
    setSessions(allSessions.slice(0, 10)); // Show last 10 sessions
  }, [isAdmin, navigate]);

  if (!isAdmin) {
    return null;
  }

  if (!stats) {
    return (
      <Layout>
        <div className="text-center py-12">
          <p className="text-foreground/70">Loading dashboard...</p>
        </div>
      </Layout>
    );
  }

  const formatDuration = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    if (minutes > 0) {
      return `${minutes}m ${seconds % 60}s`;
    }
    return `${seconds}s`;
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto animate-slide-in-left">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Admin Dashboard
          </h1>
          <p className="text-foreground/70">
            Analitik pengunjung dan tracking aktivitas platform
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <div className="bg-card border border-border rounded-xl p-6 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-foreground/70 text-sm">Total Sessions</p>
                <p className="text-2xl font-bold text-foreground">
                  {stats.totalSessions}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-foreground/70 text-sm">Admin Sessions</p>
                <p className="text-2xl font-bold text-primary">
                  {stats.adminSessions}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                <Eye className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-foreground/70 text-sm">Visitor Sessions</p>
                <p className="text-2xl font-bold text-secondary">
                  {stats.visitorSessions}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                <BarChartIcon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-foreground/70 text-sm">Page Views</p>
                <p className="text-2xl font-bold text-foreground">
                  {stats.totalPageViews}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-foreground/70 text-sm">Avg Duration</p>
                <p className="text-xl font-bold text-foreground">
                  {formatDuration(stats.avgSessionDuration)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Most Visited Pages */}
        <div className="bg-card border border-border rounded-xl p-6 shadow-lg mb-8">
          <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Halaman Paling Dikunjungi
          </h3>
          <div className="space-y-3">
            {stats.mostVisitedPages.length > 0 ? (
              stats.mostVisitedPages.map((page, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <span className="text-foreground">{page.path || "/"}</span>
                  <div className="flex items-center gap-3">
                    <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-secondary transition-all"
                        style={{
                          width: `${(page.visits / stats.totalPageViews) * 100}%`,
                        }}
                      />
                    </div>
                    <span className="font-semibold text-primary min-w-12">
                      {page.visits}x
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-foreground/70">No data available</p>
            )}
          </div>
        </div>

        {/* Recent Sessions */}
        <div className="bg-card border border-border rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-bold text-foreground mb-4">
            Sesi Terakhir
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-border">
                <tr>
                  <th className="text-left py-3 text-foreground/70 font-semibold">
                    Session ID
                  </th>
                  <th className="text-left py-3 text-foreground/70 font-semibold">
                    Tipe
                  </th>
                  <th className="text-left py-3 text-foreground/70 font-semibold">
                    Halaman
                  </th>
                  <th className="text-left py-3 text-foreground/70 font-semibold">
                    Durasi
                  </th>
                </tr>
              </thead>
              <tbody>
                {sessions.map((session, idx) => (
                  <tr key={idx} className="border-b border-border last:border-0">
                    <td className="py-3 text-foreground text-xs font-mono">
                      {session.id.substring(0, 20)}...
                    </td>
                    <td className="py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          session.userType === "admin"
                            ? "bg-primary/20 text-primary"
                            : "bg-muted text-foreground"
                        }`}
                      >
                        {session.userType}
                      </span>
                    </td>
                    <td className="py-3 text-foreground">
                      {session.pages.length}
                    </td>
                    <td className="py-3 text-foreground">
                      {formatDuration(session.lastActivity - session.startTime)}
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
