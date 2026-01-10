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
  Laptop,
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
/* OSINT PARSER */
/* ============================= */
function parseOSINT() {
  const ua = navigator.userAgent;
  const platform = navigator.platform;

  let os = "Unknown OS";
  let model = "Generic Device";
  let browser = "Unknown Browser";
  let deviceType: "mobile" | "desktop" = "desktop";

  if (/Android/i.test(ua)) {
    os = "Android";
    model = "Android Device";
    deviceType = "mobile";
  } else if (/iPhone/i.test(ua)) {
    os = "iOS";
    model = "iPhone";
    deviceType = "mobile";
  } else if (/iPad/i.test(ua)) {
    os = "iPadOS";
    model = "iPad";
    deviceType = "mobile";
  } else if (/Windows/i.test(ua)) {
    os = "Windows";
    model = "PC";
  } else if (/Mac/i.test(ua)) {
    os = "macOS";
    model = "Mac";
  } else if (/Linux/i.test(ua)) {
    os = "Linux";
    model = "Linux Machine";
  }

  if (/Chrome/i.test(ua) && !/Edg/i.test(ua)) browser = "Chrome";
  else if (/Firefox/i.test(ua)) browser = "Firefox";
  else if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) browser = "Safari";
  else if (/Edg/i.test(ua)) browser = "Edge";

  const memory =
    (performance as any).memory?.usedJSHeapSize
      ? `${Math.round((performance as any).memory.usedJSHeapSize / 1024 / 1024)} MB`
      : "N/A (Browser-limited)";

  return {
    os,
    model,
    browser,
    deviceType,
    host: platform,
    kernel: "N/A (Browser-limited)",
    packages: "N/A (Browser-limited)",
    shell: "N/A (Browser-limited)",
    cpu: deviceType === "mobile" ? "ARM-based (Estimated)" : "x86_64 (Estimated)",
    memory,
    resolution: `${screen.width}x${screen.height}`
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

  const osint = parseOSINT();

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

        {/* OS TRACKING + LOCATION */}
        {selectedSession && ipInfo && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* OS TRACKING */}
            <div className="bg-card border rounded-2xl p-6 shadow-lg">
              <h3 className="font-semibold mb-4">OS Tracking</h3>

              <div className="grid grid-cols-2 gap-2 text-sm">
                <p><b>OS:</b> {osint.os}</p>
                <p><b>Model:</b> {osint.model}</p>
                <p><b>Host:</b> {ipInfo.org}</p>
                <p><b>Kernel:</b> {osint.kernel}</p>
                <p><b>Uptime:</b> {formatDuration(Date.now() - selectedSession.startTime)}</p>
                <p><b>Packages:</b> {osint.packages}</p>
                <p><b>Shell:</b> {osint.shell}</p>
                <p><b>CPU:</b> {osint.cpu}</p>
                <p><b>Memory:</b> {osint.memory}</p>
                <p><b>Browser:</b> {osint.browser}</p>
                <p><b>Resolution:</b> {osint.resolution}</p>
              </div>

              <div className="mt-4 flex items-center gap-2">
                {osint.deviceType === "mobile" ? (
                  <Smartphone className="animate-bounce text-primary" />
                ) : (
                  <Laptop className="animate-pulse text-primary" />
                )}
                <span className="text-sm">
                  {osint.deviceType === "mobile" ? "Mobile Device Detected" : "Desktop Device Detected"}
                </span>
              </div>
            </div>

            {/* LOCATION */}
            <div className="bg-card border rounded-2xl p-6 shadow-lg">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
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
