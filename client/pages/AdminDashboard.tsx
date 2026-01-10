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

  /* ============================= */
  /* STATE ORIGINAL */
  /* ============================= */
  const [stats, setStats] = useState<SessionStats | null>(null);
  const [sessions, setSessions] = useState<any[]>([]);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [selectedSession, setSelectedSession] = useState<any | null>(null);
  const [ipInfo, setIpInfo] = useState<any | null>(null);

  /* ============================= */
  /* ADD-ONLY STATE */
  /* ============================= */
  const [deviceSpec, setDeviceSpec] = useState<any | null>(null);
  const [networkType, setNetworkType] = useState<string>("unknown");

  const refreshData = () => {
    setStats(getSessionStats());
    setSessions(getAllSessions().slice(0, 8));
  };

  /* ============================= */
  /* EFFECT ORIGINAL */
  /* ============================= */
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
  /* ADD-ONLY NETWORK TRACKING */
  /* ============================= */
  useEffect(() => {
    const conn =
      (navigator as any).connection ||
      (navigator as any).mozConnection ||
      (navigator as any).webkitConnection;

    const updateNetwork = () => {
      if (!conn) return;
      setNetworkType(conn.type || conn.effectiveType || "unknown");
    };

    updateNetwork();
    conn?.addEventListener?.("change", updateNetwork);

    return () => {
      conn?.removeEventListener?.("change", updateNetwork);
    };
  }, []);

  /* ============================= */
  /* DETAIL SESSION */
  /* ============================= */
  useEffect(() => {
    if (!selectedSession) return;

    fetch("https://ipapi.co/json/")
      .then(res => res.json())
      .then(data => setIpInfo(data));

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

        {/* HEADER */}
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

        {/* HALAMAN PALING DIKUNJUNGI */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-lg">
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5" /> Halaman Paling Dikunjungi
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

        {/* SESI TERAKHIR */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-lg">
          <h3 className="font-semibold text-lg mb-4">Sesi Terakhir</h3>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead className="border-b border-border">
                <tr className="text-left text-foreground/70">
                  <th className="py-3 px-2 text-center">Status</th>
                  <th className="py-3 px-2">Session ID</th>
                  <th className="py-3 px-2">Tipe</th>
                  <th className="py-3 px-2 text-center">Halaman</th>
                  <th className="py-3 px-2 text-right">Durasi</th>
                  <th className="py-3 px-2 text-center">Jaringan</th>
                </tr>
              </thead>

              <tbody>
                {sessions.map((s, i) => (
                  <tr
                    key={i}
                    onClick={() => setSelectedSession(s)}
                    className="cursor-pointer hover:bg-muted/40"
                  >
                    {/* STATUS */}
                    <td className="py-3 px-2 text-center">
                      {navigator.onLine ? (
                        <span className="relative inline-flex">
                          <span className="absolute inline-flex h-3 w-3 rounded-full bg-green-400 opacity-75 animate-ping" />
                          <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
                        </span>
                      ) : (
                        <span className="inline-flex h-3 w-3 rounded-full bg-gray-500 opacity-50" />
                      )}
                    </td>

                    <td className="py-3 px-2 font-mono text-xs">
                      {s.id.slice(0, 16)}…
                    </td>

                    <td className="py-3 px-2">{s.userType}</td>

                    <td className="py-3 px-2 text-center">{s.pages.length}</td>

                    <td className="py-3 px-2 text-right">
                      {formatDuration(s.lastActivity - s.startTime)}
                    </td>

                    {/* JARINGAN */}
                    <td className="py-3 px-2 text-center">
                      {networkType === "wifi" && (
                        <span className="relative inline-flex">
                          <span className="absolute h-3 w-3 rounded-full bg-blue-400 opacity-75 animate-ping" />
                          <Wifi className="w-4 h-4 text-blue-400 relative" />
                        </span>
                      )}

                      {networkType === "cellular" && (
                        <span className="relative inline-flex">
                          <span className="absolute h-3 w-3 rounded-full bg-yellow-400 opacity-75 animate-ping" />
                          <Activity className="w-4 h-4 text-yellow-400 relative" />
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* DETAIL PENGUNJUNG + MAP */}
        {selectedSession && ipInfo && (
          <div className="bg-card border rounded-2xl p-6 shadow-lg">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <MapPin /> Detail Pengunjung
            </h3>

            <p><b>IP:</b> {ipInfo.ip}</p>
            <p><b>Negara:</b> {ipInfo.country_name}</p>
            <p><b>Kota:</b> {ipInfo.city}</p>
            <p><b>ISP:</b> {ipInfo.org}</p>

            {/* DEVICE SPEC */}
            {deviceSpec && (
              <>
                <p><b>Device:</b> {deviceSpec.device}</p>
                <p><b>OS:</b> {deviceSpec.os}</p>
                <p><b>Android Version:</b> {deviceSpec.androidVersion}</p>
                <p><b>Brand / Model:</b> {deviceSpec.brandModel}</p>
                <p><b>CPU Threads:</b> {deviceSpec.cpuThreads}</p>
                <p><b>RAM:</b> {deviceSpec.ram}</p>
                <p><b>Bahasa:</b> {deviceSpec.language}</p>
                <p><b>Timezone:</b> {deviceSpec.timezone}</p>
              </>
            )}

            {/* MAP */}
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
/* ADD-ONLY HELPERS */
/* ============================= */
async function getExtendedDeviceSpec() {
  const ua = navigator.userAgent;
  const uaData = (navigator as any).userAgentData;

  return {
    device: /Mobile/i.test(ua) ? "Mobile" : "Desktop / Laptop",
    os: uaData?.platform || "Unknown",
    androidVersion: ua.match(/Android ([0-9.]+)/)?.[1] || "-",
    brandModel: uaData?.brands?.map((b: any) => b.brand).join(", ") || "-",
    cpuThreads: navigator.hardwareConcurrency || "-",
    ram: navigator.deviceMemory ? `${navigator.deviceMemory} GB` : "-",
    language: navigator.language,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
  };
}

/* ============================= */
/* STAT CARD ORIGINAL */
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
