import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { BarChart3 } from "lucide-react";
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
  mostVisitedPages: {
    path: string;
    visits: number;
  }[];
}

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] =
    useState<SessionStats | null>(null);
  const [sessions, setSessions] = useState<any[]>([]);

  const isAdmin =
    localStorage.getItem("isAdmin") === "true";

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

    // 🔥 realtime polling
    const interval = setInterval(refreshData, 2000);

    // 🔥 realtime antar tab
    const handleStorage = () => refreshData();
    window.addEventListener("storage", handleStorage);

    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", handleStorage);
    };
  }, [isAdmin, navigate]);

  if (!stats) {
    return (
      <Layout>
        <p className="text-center py-12">
          Loading realtime dashboard...
        </p>
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
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">
          Admin Dashboard (Realtime)
        </h1>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-card rounded">
            <p>Total Visitors</p>
            <p className="text-2xl font-bold">
              {stats.totalVisitors}
            </p>
          </div>

          <div className="p-4 bg-card rounded">
            <p>Active Visitors</p>
            <p className="text-2xl font-bold text-primary">
              {stats.activeVisitors}
            </p>
          </div>

          <div className="p-4 bg-card rounded">
            <p>Page Views</p>
            <p className="text-2xl font-bold">
              {stats.totalPageViews}
            </p>
          </div>
        </div>

        <div className="bg-card p-4 rounded mb-6">
          <h3 className="font-bold mb-3 flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Most Visited Pages
          </h3>

          {stats.mostVisitedPages.map((p, i) => (
            <div key={i} className="flex justify-between">
              <span>{p.path}</span>
              <span>{p.visits}x</span>
            </div>
          ))}
        </div>

        <div className="bg-card p-4 rounded">
          <h3 className="font-bold mb-3">
            Recent Sessions
          </h3>

          <table className="w-full text-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Type</th>
                <th>Pages</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((s, i) => (
                <tr key={i}>
                  <td className="font-mono text-xs">
                    {s.id}
                  </td>
                  <td>{s.userType}</td>
                  <td>{s.pages.length}</td>
                  <td>
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
    </Layout>
  );
}
