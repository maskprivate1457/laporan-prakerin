import { useState, useEffect } from 
"react";
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
/* ADD ONLY: DEVICE + OS DETECTION */
/* ============================= */
function detectLinuxDistro(ua: string) {
  if (/kali/i.test(ua)) return "Kali Linux";
  if (/ubuntu/i.test(ua)) return "Ubuntu";
  if (/debian/i.test(ua)) return "Debian";
  if (/arch/i.test(ua)) return "Arch Linux";
  if (/fedora/i.test(ua)) return "Fedora";
  if (/manjaro/i.test(ua)) return "Manjaro";
  if (/mint/i.test(ua)) return "Linux Mint";
  return "Generic Linux";
}

function getAutoDeviceSpec() {
  const ua = navigator.userAgent;

  let os = "Unknown";
  let distro = "-";

  if (/Windows NT/.test(ua)) os = "Windows";
  else if (/Mac OS X/.test(ua)) os = "macOS";
  else if (/Android/.test(ua)) os = "Android";
  else if (/Linux/.test(ua)) {
    os = "Linux";
    distro = detectLinuxDistro(ua);
  } else if (/iPhone|iPad/.test(ua)) os = "iOS";

  return {
    device:
      /mobile|android|iphone/i.test(ua)
        ? "Mobile"
        : /tablet|ipad/i.test(ua)
        ? "Tablet"
        : "Desktop / Laptop",
    os,
    distro,
    arch: /64/.test(ua) ? "64-bit" : "32-bit",
    cpu: navigator.hardwareConcurrency,
    lang: navigator.language,
    tz: Intl.DateTimeFormat().resolvedOptions().timeZone,
    ua
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

  /* ADD ONLY */
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

    /* ADD ONLY */
    setDeviceSpec(getAutoDeviceSpec());

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
                {sessions.length > 0 ? (
                  sessions.map((s, i) => {
                    const isSelected = selectedSession?.id === s.id;

                    return (
                      <tr
                        key={i}
                        onClick={() => setSelectedSession(s)}
                        className={`cursor-pointer transition ${
                          isSelected ? "bg-primary/10" : "hover:bg-muted/40"
                        }`}
                      >
                        <td className="py-3 px-2 font-mono text-xs">
                          {s.id.slice(0, 16)}…
                        </td>

                        <td className="py-3 px-2">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              s.userType === "admin"
                                ? "bg-primary/20 text-primary"
                                : "bg-muted text-foreground"
                            }`}
                          >
                            {s.userType}
                          </span>
                        </td>

                        <td className="py-3 px-2 text-center font-semibold">
                          {s.pages.length}
                        </td>

                        <td className="py-3 px-2 text-right text-foreground/80">
                          {formatDuration(s.lastActivity - s.startTime)}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={4} className="py-6 text-center text-foreground/60">
                      Belum ada sesi tercatat
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* SESSION DETAIL + MAP */}
        {selectedSession && ipInfo && (
          <div className="bg-card border rounded-2xl p-6 shadow-lg animate-slide-up">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <MapPin /> Detail Pengunjung
            </h3>

            <p><b>IP:</b> {ipInfo.ip}</p>
            <p><b>Negara:</b> {ipInfo.country_name}</p>
            <p><b>Kota:</b> {ipInfo.city}</p>
            <p><b>ISP:</b> {ipInfo.org}</p>

            {/* ADD ONLY */}
            {deviceSpec && (
              <div className="mt-4 border-t border-border pt-4 text-sm">
                <p className="font-semibold">🖥️ Informasi Perangkat</p>
                <p>Device: {deviceSpec.device}</p>
                <p>OS: {deviceSpec.os}</p>
                {deviceSpec.os === "Linux" && <p>Distro: {deviceSpec.distro}</p>}
                <p>Arsitektur: {deviceSpec.arch}</p>
                <p>CPU Threads: {deviceSpec.cpu}</p>
                <p>Bahasa: {deviceSpec.lang}</p>
                <p>Timezone: {deviceSpec.tz}</p>
                <p className="text-xs break-all">UA: {deviceSpec.ua}</p>
              </div>
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
