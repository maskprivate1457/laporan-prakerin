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
  MapPin,
  Monitor,
  Smartphone
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

/* ============================= */
/* USER AGENT PARSER */
/* ============================= */
function parseUserAgent(ua: string) {
  let os = "Unknown OS";
  let browser = "Unknown Browser";
  let device: "mobile" | "desktop" = "desktop";

  if (/Android/i.test(ua)) {
    os = "Android";
    device = "mobile";
  } else if (/iPhone|iPad/i.test(ua)) {
    os = "iOS";
    device = "mobile";
  } else if (/Windows/i.test(ua)) {
    os = "Windows";
  } else if (/Linux/i.test(ua)) {
    os = "Linux";
  } else if (/Mac/i.test(ua)) {
    os = "macOS";
  }

  if (/Chrome/i.test(ua)) browser = "Chrome";
  else if (/Firefox/i.test(ua)) browser = "Firefox";
  else if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) browser = "Safari";
  else if (/Edg/i.test(ua)) browser = "Edge";

  return { os, browser, device };
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  const [stats, setStats] = useState<SessionStats | null>(null);
  const [sessions, setSessions] = useState<any[]>([]);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [selectedSession, setSelectedSession] = useState<any | null>(null);
  const [ipInfo, setIpInfo] = useState<any | null>(null);

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
    window.addEventListener("online", () => setIsOnline(true));
    window.addEventListener("offline", () => setIsOnline(false));

    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", refreshData);
    };
  }, [isAdmin, navigate]);

  useEffect(() => {
    if (!selectedSession) return;

    fetch("https://ipapi.co/json/")
      .then(res => res.json())
      .then(data => setIpInfo(data));
  }, [selectedSession]);

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

  const ua = selectedSession?.device?.userAgent || navigator.userAgent;
  const osInfo = parseUserAgent(ua);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-10 space-y-10">

        {/* HEADER */}
        <div className="flex items-center gap-4">
          <div className={`w-4 h-4 rounded-full ${isOnline ? "bg-green-500 animate-pulse" : "bg-red-500 animate-ping"}`} />
          <h1 className="text-4xl font-bold tracking-tight">Realtime Analytics</h1>
          {isOnline ? <Wifi className="text-green-500" /> : <WifiOff className="text-red-500" />}
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Total Visitors" value={stats.totalVisitors} icon={<Users />} />
          <StatCard title="Active Visitors" value={stats.activeVisitors} icon={<Activity />} highlight />
          <StatCard title="Page Views" value={stats.totalPageViews} icon={<Eye />} />
          <StatCard title="Avg Duration" value={formatDuration(stats.avgSessionDuration)} icon={<Clock />} />
        </div>

        {/* RECENT SESSIONS */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-lg">
          <h3 className="font-semibold text-lg mb-4">Sesi Terakhir</h3>

          <table className="w-full text-sm">
            <thead className="border-b">
              <tr className="text-left text-foreground/70">
                <th className="py-2">Session</th>
                <th>Tipe</th>
                <th className="text-center">Halaman</th>
                <th className="text-right">Durasi</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((s, i) => (
                <tr
                  key={i}
                  onClick={() => setSelectedSession(s)}
                  className="cursor-pointer hover:bg-muted/40 transition"
                >
                  <td className="py-3 font-mono text-xs">{s.id.slice(0, 14)}…</td>
                  <td>{s.userType}</td>
                  <td className="text-center">{s.pages.length}</td>
                  <td className="text-right">{formatDuration(s.lastActivity - s.startTime)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* DETAIL OS + LOCATION */}
        {selectedSession && ipInfo && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* DETAIL OPERATING SYSTEM */}
            <div className="bg-black text-green-400 rounded-2xl p-6 font-mono shadow-lg">
              <h3 className="text-green-300 mb-3">Detail Operating System</h3>

              <pre className="text-sm leading-relaxed">
OS: {osInfo.os}
Browser: {osInfo.browser}
Device: {osInfo.device === "mobile" ? "Mobile" : "Desktop"}
Uptime: {formatDuration(Date.now() - selectedSession.startTime)}
Pages: {selectedSession.pages.length}
              </pre>

              <div className="mt-4 flex items-center gap-2">
                {osInfo.device === "mobile" ? (
                  <Smartphone className="w-6 h-6 animate-bounce text-green-400" />
                ) : (
                  <Monitor className="w-6 h-6 animate-pulse text-green-400" />
                )}
                <span className="text-xs text-green-300">
                  {osInfo.device === "mobile" ? "Mobile Device Detected" : "Desktop Device Detected"}
                </span>
              </div>
            </div>

            {/* DETAIL LOKASI */}
            <div className="bg-card border rounded-2xl p-6 shadow-lg">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <MapPin /> Detail Lokasi Pengunjung
              </h3>

              <p><b>IP:</b> {ipInfo.ip}</p>
              <p><b>Negara:</b> {ipInfo.country_name}</p>
              <p><b>Kota:</b> {ipInfo.city}</p>
              <p><b>ISP:</b> {ipInfo.org}</p>

              <iframe
                className="w-full h-64 mt-4 rounded-xl"
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${ipInfo.longitude - 0.05},${ipInfo.latitude - 0.05},${ipInfo.longitude + 0.05},${ipInfo.latitude + 0.05}&layer=mapnik&marker=${ipInfo.latitude},${ipInfo.longitude}`}
              />
            </div>
          </div>
        )}

      </div>
    </Layout>
  );
}

/* ============================= */
/* STAT CARD */
/* ============================= */
function StatCard({ title, value, icon, highlight = false }: any) {
  return (
    <div className={`rounded-2xl p-6 border bg-card shadow-lg ${highlight ? "ring-1 ring-primary" : ""}`}>
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
