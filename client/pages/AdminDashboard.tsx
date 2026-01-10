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
  Cpu,
  Monitor
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
/* OS TRACKING (NEOFETCH STYLE)  */
/* ============================= */
function getOSInfo(session: any) {
  const ua = navigator.userAgent;
  const platform = navigator.platform;

  let os = "Unknown";
  let browser = "Unknown";
  let cpu = "Unknown";

  if (/Android/i.test(ua)) {
    os = "Android";
    cpu = "ARM (Mobile)";
  } else if (/iPhone|iPad/i.test(ua)) {
    os = "iOS";
    cpu = "ARM (Apple)";
  } else if (/Windows/i.test(ua)) {
    os = "Windows";
    cpu = "x86_64";
  } else if (/Mac/i.test(ua)) {
    os = "macOS";
    cpu = "Apple Silicon / Intel";
  } else if (/Linux/i.test(ua)) {
    os = "Linux";
    cpu = "x86_64 / ARM";
  }

  if (/Chrome/i.test(ua)) browser = "Chrome";
  else if (/Firefox/i.test(ua)) browser = "Firefox";
  else if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) browser = "Safari";
  else if (/Edg/i.test(ua)) browser = "Edge";

  const memory =
    (performance as any).memory?.usedJSHeapSize
      ? `${Math.round((performance as any).memory.usedJSHeapSize / 1024 / 1024)} MB`
      : "Browser-limited";

  return {
    os,
    host: platform,
    kernel: "Browser-limited",
    uptime: `${Math.floor((Date.now() - session.startTime) / 1000)}s`,
    packages: "Browser-limited",
    shell: "Browser-limited",
    cpu,
    memory,
    browser
  };
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

  const osInfo = selectedSession ? getOSInfo(selectedSession) : null;

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-10 space-y-10">

        {/* HEADER */}
        <div className="flex items-center gap-4">
          <div className={`w-4 h-4 rounded-full ${isOnline ? "bg-green-500 animate-pulse" : "bg-red-500 animate-ping"}`} />
          <h1 className="text-4xl font-bold">Realtime Analytics</h1>
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
        <div className="bg-card border rounded-2xl p-6 shadow-lg">
          <h3 className="font-semibold text-lg mb-4">Sesi Terakhir</h3>
          <table className="w-full text-sm">
            <tbody>
              {sessions.map((s, i) => (
                <tr
                  key={i}
                  onClick={() => setSelectedSession(s)}
                  className="cursor-pointer hover:bg-muted/40"
                >
                  <td>{s.id.slice(0, 12)}…</td>
                  <td>{s.userType}</td>
                  <td>{s.pages.length}</td>
                  <td>{formatDuration(s.lastActivity - s.startTime)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* OS DETAIL + LOCATION DETAIL */}
        {selectedSession && ipInfo && osInfo && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-slide-up">

            {/* OS DETAIL */}
            <div className="bg-card border rounded-2xl p-6 shadow-lg">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <Cpu /> Detail Operating System
              </h3>

              <ul className="text-sm space-y-1">
                <li><b>OS:</b> {osInfo.os}</li>
                <li><b>Host:</b> {osInfo.host}</li>
                <li><b>Kernel:</b> {osInfo.kernel}</li>
                <li><b>Uptime:</b> {osInfo.uptime}</li>
                <li><b>Packages:</b> {osInfo.packages}</li>
                <li><b>Shell:</b> {osInfo.shell}</li>
                <li><b>CPU:</b> {osInfo.cpu}</li>
                <li><b>Memory:</b> {osInfo.memory}</li>
                <li><b>Browser:</b> {osInfo.browser}</li>
              </ul>
            </div>

            {/* LOCATION DETAIL */}
            <div className="bg-card border rounded-2xl p-6 shadow-lg">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <MapPin /> Detail Lokasi
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
