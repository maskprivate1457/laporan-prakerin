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
  Cpu,
  MemoryStick,
  Globe,
  Info
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
  const [selectedSession, setSelectedSession] = useState<any | null>(null);
  const [ipInfo, setIpInfo] = useState<any | null>(null);

  /* ============================= */
  /* OS & DEVICE INFO (NEW) */
  /* ============================= */
  const [osInfo, setOsInfo] = useState<any | null>(null);
  const [sessionUptime, setSessionUptime] = useState(0);

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

  /* ============================= */
  /* IP GEO */
  /* ============================= */
  useEffect(() => {
    if (!selectedSession) return;

    fetch("https://ipapi.co/json/")
      .then(res => res.json())
      .then(data => setIpInfo(data));
  }, [selectedSession]);

  /* ============================= */
  /* OS DETECTION (NEW) */
  /* ============================= */
  useEffect(() => {
    if (!selectedSession) return;

    const ua = navigator.userAgent;
    const platform = navigator.platform;

    const getOSName = () => {
      if (ua.includes("Win")) return "Windows";
      if (ua.includes("Mac")) return "macOS";
      if (ua.includes("Linux")) return "Linux";
      if (ua.includes("Android")) return "Android";
      if (ua.includes("iPhone") || ua.includes("iPad")) return "iOS";
      return "Unknown OS";
    };

    const getBrowser = () => {
      if (ua.includes("Chrome") && !ua.includes("Edg")) return "Chrome";
      if (ua.includes("Firefox")) return "Firefox";
      if (ua.includes("Safari") && !ua.includes("Chrome")) return "Safari";
      if (ua.includes("Edg")) return "Edge";
      return "Unknown Browser";
    };

    setOsInfo({
      os: getOSName(),
      platform,
      browser: getBrowser(),
      vendor: navigator.vendor || "Unknown",
      language: navigator.language,
      cores: navigator.hardwareConcurrency || "N/A",
      memory: (navigator as any).deviceMemory
        ? `${(navigator as any).deviceMemory} GB`
        : "N/A",
      screen: `${window.screen.width} x ${window.screen.height}`,
      userAgent: ua,
    });
  }, [selectedSession]);

  /* ============================= */
  /* SESSION UPTIME */
  /* ============================= */
  useEffect(() => {
    if (!selectedSession) return;

    const timer = setInterval(() => {
      setSessionUptime(Date.now() - selectedSession.startTime);
    }, 1000);

    return () => clearInterval(timer);
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

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-10 space-y-10">

        {/* HEADER */}
        <div className="flex items-center gap-4 animate-fade-in">
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
        <div className="bg-card border rounded-2xl p-6 shadow-lg">
          <h3 className="font-semibold text-lg mb-4">Sesi Terakhir</h3>
          <table className="w-full text-sm">
            <tbody>
              {sessions.map((s, i) => (
                <tr key={i} onClick={() => setSelectedSession(s)} className="cursor-pointer hover:bg-muted/40">
                  <td>{s.id.slice(0, 14)}…</td>
                  <td>{s.userType}</td>
                  <td>{s.pages.length}</td>
                  <td>{formatDuration(s.lastActivity - s.startTime)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* DETAIL PENGUNJUNG */}
        {selectedSession && ipInfo && osInfo && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-slide-up">

            {/* OS INFO */}
            <div className="bg-card border rounded-2xl p-6 shadow-lg">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <Monitor /> Spesifikasi Sistem
              </h3>

              <p><b>OS:</b> {osInfo.os}</p>
              <p><b>Platform:</b> {osInfo.platform}</p>
              <p><b>Browser:</b> {osInfo.browser}</p>
              <p><b>Vendor:</b> {osInfo.vendor}</p>
              <p className="flex gap-2 items-center"><Cpu /> {osInfo.cores} Cores</p>
              <p className="flex gap-2 items-center"><MemoryStick /> {osInfo.memory}</p>
              <p><b>Resolution:</b> {osInfo.screen}</p>
              <p className="flex gap-2 items-center"><Globe /> {osInfo.language}</p>
              <p><b>Session Uptime:</b> {formatDuration(sessionUptime)}</p>

              <details className="mt-3 text-xs">
                <summary className="cursor-pointer flex items-center gap-1">
                  <Info className="w-4 h-4" /> User Agent
                </summary>
                <p className="mt-2 break-all">{osInfo.userAgent}</p>
              </details>
            </div>

            {/* LOCATION */}
            <div className="bg-card border rounded-2xl p-6 shadow-lg">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <MapPin /> Lokasi Pengunjung
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
