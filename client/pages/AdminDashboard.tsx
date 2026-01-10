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
/* INTERFACE ORIGINAL */
/* ============================= */

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
  /* ADD ONLY: DEVICE SPEC STATE */
  /* ============================= */
  const [deviceSpec, setDeviceSpec] = useState<any | null>(null);

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

    /* ============================= */
    /* ADD ONLY: DEVICE DETECTION */
    /* ============================= */
    getExtendedDeviceSpec().then(setDeviceSpec);

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

        {/* HEADER + ONLINE STATUS */}
        <div className="flex items-center gap-4 animate-fade-in">
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

        {/* STATS GRID */}
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
                  className="h-full bg-gradient-to-r from-primary to-secondary"
                  style={{ width: `${(page.visits / stats.totalPageViews) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* RECENT SESSIONS */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-lg">
          <h3 className="font-semibold text-lg mb-4">Sesi Terakhir</h3>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead className="border-b border-border">
                <tr className="text-left text-foreground/70">
                  <th className="py-3 px-2 font-medium">Session ID</th>
                  <th className="py-3 px-2 font-medium">Tipe</th>
                  <th className="py-3 px-2 font-medium text-center">Halaman</th>
                  <th className="py-3 px-2 font-medium text-right">Durasi</th>
                </tr>
              </thead>

              <tbody>
                {sessions.map((s, i) => (
                  <tr
                    key={i}
                    onClick={() => setSelectedSession(s)}
                    className="cursor-pointer hover:bg-muted/40"
                  >
                    <td className="py-3 px-2 font-mono text-xs">
                      {s.id.slice(0, 16)}…
                    </td>
                    <td className="py-3 px-2">{s.userType}</td>
                    <td className="py-3 px-2 text-center">{s.pages.length}</td>
                    <td className="py-3 px-2 text-right">
                      {formatDuration(s.lastActivity - s.startTime)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* DETAIL PENGUNJUNG */}
        {selectedSession && ipInfo && (
          <div className="bg-card border rounded-2xl p-6 shadow-lg">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <MapPin /> Detail Pengunjung
            </h3>

            <p><b>IP:</b> {ipInfo.ip}</p>
            <p><b>Negara:</b> {ipInfo.country_name}</p>
            <p><b>Kota:</b> {ipInfo.city}</p>
            <p><b>ISP:</b> {ipInfo.org}</p>

            {/* ============================= */}
            {/* ADD ONLY: DEVICE INFORMATION */}
            {/* ============================= */}
            {deviceSpec && (
              <>
                <p><b>Device:</b> {deviceSpec.device}</p>
                <p><b>OS:</b> {deviceSpec.os}</p>
                {deviceSpec.androidVersion !== "-" && (
                  <p><b>Android Version:</b> {deviceSpec.androidVersion}</p>
                )}
                {deviceSpec.brandModel !== "-" && (
                  <p><b>Brand / Model:</b> {deviceSpec.brandModel}</p>
                )}
                <p><b>Arsitektur:</b> {deviceSpec.arch}</p>
                <p><b>CPU Threads:</b> {deviceSpec.cpuThreads}</p>
                <p><b>RAM (Estimasi):</b> {deviceSpec.ramEstimate}</p>
                <p><b>Storage Terpakai:</b> {deviceSpec.storageUsed}</p>
                <p><b>Storage Kuota:</b> {deviceSpec.storageQuota}</p>
                <p><b>Bahasa:</b> {deviceSpec.language}</p>
                <p><b>Timezone:</b> {deviceSpec.timezone}</p>
              </>
            )}

            <iframe
              className="w-full h-64 mt-4 rounded-xl"
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${ipInfo.longitude - 0.05},${ipInfo.latitude - 0.05},${ipInfo.longitude + 0.05},${ipInfo.latitude + 0.05}&layer=mapnik&marker=${ipInfo.latitude},${ipInfo.longitude}`}
            />
          </div>
        )}
      </div>
    </Layout>
  );
}

/* ============================= */
/* ADD ONLY: DEVICE DETECTION */
/* ============================= */

async function getExtendedDeviceSpec() {
  const ua = navigator.userAgent;
  const uaData = (navigator as any).userAgentData;
  const storage = navigator.storage?.estimate
    ? await navigator.storage.estimate()
    : null;

  let os = "Unknown";
  let device = "Unknown";
  let androidVersion = "-";
  let brandModel = "-";

  if (uaData) {
    os = uaData.platform;
    device = uaData.mobile ? "Mobile" : "Desktop / Laptop";

    if (uaData.platform === "Android") {
      androidVersion = ua.match(/Android ([0-9.]+)/)?.[1] || "-";
      brandModel = uaData.brands?.map((b: any) => b.brand).join(", ");
    }
  } else if (/Android/i.test(ua)) {
    os = "Android";
    device = "Mobile";
    androidVersion = ua.match(/Android ([0-9.]+)/)?.[1] || "-";
  } else if (/Linux/i.test(ua)) {
    os = "Linux";
    device = "Desktop / Laptop";
  }

  return {
    device,
    os,
    androidVersion,
    brandModel,
    arch: /64/.test(ua) ? "64-bit" : "32-bit",
    cpuThreads: navigator.hardwareConcurrency || "Unknown",
    ramEstimate: navigator.deviceMemory
      ? `${navigator.deviceMemory} GB`
      : "Unknown",
    storageUsed: storage?.usage
      ? `${(storage.usage / 1024 / 1024).toFixed(1)} MB`
      : "Unknown",
    storageQuota: storage?.quota
      ? `${(storage.quota / 1024 / 1024).toFixed(1)} MB`
      : "Unknown",
    language: navigator.language,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
  };
}

/* ============================= */
/* STAT CARD (ORIGINAL) */
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
