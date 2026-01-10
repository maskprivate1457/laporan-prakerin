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
  MapPin
} from "lucide-react";
import {
  getSessionStats,
  getAllSessions,
} from "@/lib/tracking";

/* ============================= */
/* ADD: DEVICE + OS DETECTION */
/* ============================= */

function detectLinuxDistro(ua: string) {
  if (/kali/i.test(ua)) return "Kali Linux";
  if (/ubuntu/i.test(ua)) return "Ubuntu";
  if (/debian/i.test(ua)) return "Debian";
  if (/arch/i.test(ua)) return "Arch Linux";
  if (/fedora/i.test(ua)) return "Fedora";
  if (/centos/i.test(ua)) return "CentOS";
  if (/manjaro/i.test(ua)) return "Manjaro";
  if (/mint/i.test(ua)) return "Linux Mint";
  return "Generic Linux";
}

function detectDeviceType() {
  const ua = navigator.userAgent;
  if (/tablet|ipad/i.test(ua)) return "Tablet";
  if (/mobile|android|iphone/i.test(ua)) return "Mobile";
  return "Desktop / Laptop";
}

function getDeviceOSFullInfo() {
  const ua = navigator.userAgent;
  const platform = navigator.platform;

  let os = "Unknown";
  let version = "";
  let distro = "-";

  if (/Windows NT 10.0/.test(ua)) {
    os = "Windows";
    version = "10 / 11";
  } else if (/Windows NT 6.3/.test(ua)) {
    os = "Windows 8.1";
  } else if (/Windows NT 6.1/.test(ua)) {
    os = "Windows 7";
  } else if (/Mac OS X/.test(ua)) {
    os = "macOS";
    version = ua.match(/Mac OS X ([0-9_]+)/)?.[1]?.replace(/_/g, ".") || "";
  } else if (/Android/.test(ua)) {
    os = "Android";
    version = ua.match(/Android ([0-9.]+)/)?.[1] || "";
  } else if (/Linux/.test(platform)) {
    os = "Linux";
    distro = detectLinuxDistro(ua);
  } else if (/iPhone|iPad/.test(ua)) {
    os = "iOS";
    version = ua.match(/OS ([0-9_]+)/)?.[1]?.replace(/_/g, ".") || "";
  }

  return {
    os,
    version,
    distro,
    deviceType: detectDeviceType(),
    architecture: /64/.test(ua) ? "64-bit" : "32-bit",
    cpuCores: navigator.hardwareConcurrency || "Unknown",
    language: navigator.language,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    platform,
    userAgent: ua,
  };
}

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

  /* ADD */
  const [deviceInfo, setDeviceInfo] = useState<any | null>(null);

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

    /* ADD */
    setDeviceInfo(getDeviceOSFullInfo());

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

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-10 space-y-10">

        {/* HEADER */}
        <div className="flex items-center gap-4">
          <div className={`w-4 h-4 rounded-full ${isOnline ? "bg-green-500 animate-pulse" : "bg-red-500 animate-ping"}`} />
          <h1 className="text-4xl font-bold">Realtime Analytics</h1>
          {isOnline ? <Wifi /> : <WifiOff />}
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Total Visitors" value={stats.totalVisitors} icon={<Users />} />
          <StatCard title="Active Visitors" value={stats.activeVisitors} icon={<Activity />} highlight />
          <StatCard title="Page Views" value={stats.totalPageViews} icon={<Eye />} />
          <StatCard title="Avg Duration" value={formatDuration(stats.avgSessionDuration)} icon={<Clock />} />
        </div>

        {/* SESSIONS */}
        <div className="bg-card border rounded-2xl p-6">
          <h3 className="font-semibold mb-4">Sesi Terakhir</h3>

          <table className="w-full text-sm">
            <tbody>
              {sessions.map((s, i) => (
                <tr key={i} onClick={() => setSelectedSession(s)} className="cursor-pointer hover:bg-muted/40">
                  <td className="py-2">{s.id.slice(0, 16)}…</td>
                  <td>{s.userType}</td>
                  <td className="text-center">{s.pages.length}</td>
                  <td className="text-right">{formatDuration(s.lastActivity - s.startTime)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* DETAIL PENGUNJUNG */}
        {selectedSession && ipInfo && (
          <div className="bg-card border rounded-2xl p-6">
            <h3 className="font-semibold mb-4 flex gap-2"><MapPin /> Detail Pengunjung</h3>

            <p><b>IP:</b> {ipInfo.ip}</p>
            <p><b>Negara:</b> {ipInfo.country_name}</p>
            <p><b>Provinsi:</b> {ipInfo.region}</p>
            <p><b>Kota:</b> {ipInfo.city}</p>
            <p><b>ISP:</b> {ipInfo.org}</p>

            {/* ADD */}
            {deviceInfo && (
              <div className="mt-4 border-t pt-4 text-sm">
                <p className="font-semibold">🖥️ Informasi Perangkat</p>
                <p>Device: {deviceInfo.deviceType}</p>
                <p>OS: {deviceInfo.os}</p>
                <p>Versi: {deviceInfo.version || "-"}</p>
                {deviceInfo.os === "Linux" && <p>Distro: {deviceInfo.distro}</p>}
                <p>Arsitektur: {deviceInfo.architecture}</p>
                <p>CPU Threads: {deviceInfo.cpuCores}</p>
                <p>Bahasa: {deviceInfo.language}</p>
                <p>Timezone: {deviceInfo.timezone}</p>
                <p className="text-xs break-all">UA: {deviceInfo.userAgent}</p>
              </div>
            )}

            <iframe
              className="w-full h-64 mt-4 rounded-xl"
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${ipInfo.longitude - 0.05},${ipInfo.latitude - 0.05},${ipInfo.longitude + 0.05},${ipInfo.latitude + 0.05}&marker=${ipInfo.latitude},${ipInfo.longitude}`}
            />
          </div>
        )}
      </div>
    </Layout>
  );
}

function StatCard({ title, value, icon, highlight = false }: any) {
  return (
    <div className={`p-6 border rounded-2xl ${highlight ? "ring-1 ring-primary" : ""}`}>
      <p className="text-sm">{title}</p>
      <p className="text-3xl font-bold">{value}</p>
      {icon}
    </div>
  );
}
