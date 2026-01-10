import { useState, useEffect, useMemo } from "react";
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
  ShieldAlert,
  Smartphone,
  Laptop
} from "lucide-react";
import {
  getSessionStats,
  getAllSessions,
} from "@/lib/tracking";

/* ============================= */
/* TYPES */
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

/* ============================= */
/* UTILS */
/* ============================= */

function getOSInfo() {
  const ua = navigator.userAgent;
  let os = "Unknown";
  let device = "Desktop";

  if (/android/i.test(ua)) {
    os = "Android";
    device = "Mobile";
  } else if (/iphone|ipad/i.test(ua)) {
    os = "iOS";
    device = "Mobile";
  } else if (/win/i.test(ua)) os = "Windows";
  else if (/mac/i.test(ua)) os = "macOS";
  else if (/linux/i.test(ua)) os = "Linux";

  let browser = "Unknown";
  if (/chrome/i.test(ua)) browser = "Chrome";
  else if (/firefox/i.test(ua)) browser = "Firefox";
  else if (/safari/i.test(ua)) browser = "Safari";

  return {
    os,
    device,
    browser,
    cores: navigator.hardwareConcurrency || "N/A",
    memory: navigator.deviceMemory
      ? `${navigator.deviceMemory} GB`
      : "N/A",
    resolution: `${window.screen.width}x${window.screen.height}`,
    language: navigator.language,
    platform: navigator.platform,
  };
}

function calculateRisk(session: any) {
  let score = 0;

  if (session.pages.length > 15) score += 25;
  if (session.lastActivity - session.startTime < 5000) score += 30;
  if (!navigator.webdriver) score += 0;
  else score += 40;

  return Math.min(score, 100);
}

/* ============================= */
/* MAIN */
/* ============================= */

export default function AdminDashboard() {
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  const [stats, setStats] = useState<SessionStats | null>(null);
  const [sessions, setSessions] = useState<any[]>([]);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [selectedSession, setSelectedSession] = useState<any | null>(null);
  const [ipInfo, setIpInfo] = useState<any | null>(null);

  const osInfo = useMemo(getOSInfo, []);

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

    window.addEventListener("online", () => setIsOnline(true));
    window.addEventListener("offline", () => setIsOnline(false));

    return () => clearInterval(interval);
  }, [isAdmin, navigate]);

  useEffect(() => {
    if (!selectedSession) return;

    fetch("https://ipapi.co/json/")
      .then(res => res.json())
      .then(data => setIpInfo(data));
  }, [selectedSession]);

  if (!stats) return null;

  const formatDuration = (ms: number) => {
    const s = Math.floor(ms / 1000);
    const m = Math.floor(s / 60);
    return m > 0 ? `${m}m ${s % 60}s` : `${s}s`;
  };

  const riskScore = selectedSession ? calculateRisk(selectedSession) : 0;
  const isFlagged = riskScore >= 70;

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-10 space-y-10">

        {/* HEADER */}
        <div className="flex items-center gap-4">
          <div className={`w-4 h-4 rounded-full ${isOnline ? "bg-green-500 animate-pulse" : "bg-red-500"}`} />
          <h1 className="text-4xl font-bold">Realtime Analytics</h1>
          {isOnline ? <Wifi /> : <WifiOff />}
        </div>

        {/* SESSIONS */}
        <div className="bg-card border rounded-2xl p-6">
          <h3 className="font-semibold mb-4">Sesi Terakhir</h3>

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

        {/* DETAIL */}
        {selectedSession && ipInfo && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* OS DETAIL */}
            <div className="bg-card border rounded-2xl p-6 space-y-3">
              <h3 className="font-semibold flex items-center gap-2">
                <ShieldAlert />
                Detail Operating System
              </h3>

              <p>OS: {osInfo.os}</p>
              <p>Browser: {osInfo.browser}</p>
              <p>CPU Cores: {osInfo.cores}</p>
              <p>Memory: {osInfo.memory}</p>
              <p>Resolution: {osInfo.resolution}</p>
              <p>Language: {osInfo.language}</p>
              <p>Platform: {osInfo.platform}</p>

              <div className="flex justify-center mt-4 animate-bounce">
                {osInfo.device === "Mobile" ? (
                  <Smartphone size={48} />
                ) : (
                  <Laptop size={48} />
                )}
              </div>

              <div className={`mt-4 p-2 rounded text-sm ${
                isFlagged ? "bg-red-500/20 text-red-500" : "bg-green-500/20 text-green-500"
              }`}>
                Risk Score: {riskScore}%
              </div>
            </div>

            {/* LOCATION */}
            <div className="bg-card border rounded-2xl p-6 space-y-2">
              <h3 className="font-semibold flex items-center gap-2">
                <MapPin />
                Detail Pengunjung
              </h3>

              <p>IP: {ipInfo.ip}</p>
              <p>Negara: {ipInfo.country_name}</p>
              <p>Kota: {ipInfo.city}</p>
              <p>ISP: {ipInfo.org}</p>

              <iframe
                className="w-full h-48 rounded-xl mt-3"
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${ipInfo.longitude - 0.05},${ipInfo.latitude - 0.05},${ipInfo.longitude + 0.05},${ipInfo.latitude + 0.05}&marker=${ipInfo.latitude},${ipInfo.longitude}`}
              />
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
