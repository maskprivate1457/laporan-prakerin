export interface VisitorSession {
  id: string;
  userType: "admin" | "visitor";
  startTime: number;
  lastActivity: number;
  pages: {
    path: string;
    timestamp: number;
  }[];
  device: {
    userAgent: string;
    language: string;
  };
}

// GANTI URL INI dengan endpoint REST API asli Anda (MockAPI/Firebase/Supabase)
const API_URL = "https://677d248d4496159da732789d.mockapi.io/api/v1/tracking"; 
const CURRENT_SESSION_KEY = "currentSession";
const LIMIT_RESET = 20000;

/**
 * Generator ID Sesi Unik
 */
function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Inisialisasi Tracking saat pertama kali web dibuka
 */
export async function initializeTracking(): Promise<void> {
  const existingSession = localStorage.getItem(CURRENT_SESSION_KEY);
  
  if (!existingSession) {
    const isAdmin = localStorage.getItem("isAdmin") === "true";
    const newSession: VisitorSession = {
      id: generateSessionId(),
      userType: isAdmin ? "admin" : "visitor",
      startTime: Date.now(),
      lastActivity: Date.now(),
      pages: [{ path: window.location.pathname, timestamp: Date.now() }],
      device: {
        userAgent: navigator.userAgent,
        language: navigator.language,
      },
    };
    
    localStorage.setItem(CURRENT_SESSION_KEY, JSON.stringify(newSession));

    // POST ke REST API
    try {
      await fetch(`${API_URL}/sessions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSession)
      });
    } catch (e) { console.error("API Offline"); }
  }
}

/**
 * Mencatat perpindahan halaman secara Real-time
 */
export async function trackPageView(path: string): Promise<void> {
  const sessionStr = localStorage.getItem(CURRENT_SESSION_KEY);
  if (sessionStr) {
    const session: VisitorSession = JSON.parse(sessionStr);
    session.lastActivity = Date.now();
    session.pages.push({ path, timestamp: Date.now() });
    
    localStorage.setItem(CURRENT_SESSION_KEY, JSON.stringify(session));

    // Sync ke REST API agar dashboard admin terupdate
    try {
      await fetch(`${API_URL}/sessions/${session.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(session)
      });
    } catch (e) { console.log("Tracking sync error"); }
  }
}

/**
 * Mengambil semua sesi dari REST API
 */
export async function getAllSessions(): Promise<VisitorSession[]> {
  try {
    const response = await fetch(`${API_URL}/sessions`);
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    return [];
  }
}

/**
 * Mengolah statistik dengan fungsi MODULO 20.000 (Reset Otomatis)
 */
export async function getSessionStats() {
  const allSessions = await getAllSessions();
  
  const rawStats = {
    totalSessions: allSessions.length,
    adminSessions: allSessions.filter(s => s.userType === "admin").length,
    visitorSessions: allSessions.filter(s => s.userType === "visitor").length,
    totalPageViews: allSessions.reduce((sum, s) => sum + s.pages.length, 0),
    avgSessionDuration: allSessions.length > 0 
      ? Math.round(allSessions.reduce((sum, s) => sum + (s.lastActivity - s.startTime), 0) / allSessions.length) 
      : 0,
    mostVisitedPages: getMostVisitedPages(allSessions)
  };

  // LOGIKA RESET 20.000
  return {
    ...rawStats,
    totalSessions: rawStats.totalSessions % LIMIT_RESET,
    adminSessions: rawStats.adminSessions % LIMIT_RESET,
    visitorSessions: rawStats.visitorSessions % LIMIT_RESET,
    totalPageViews: rawStats.totalPageViews % LIMIT_RESET,
  };
}

function getMostVisitedPages(sessions: VisitorSession[]) {
  const pageVisits: { [key: string]: number } = {};
  sessions.forEach(s => s.pages.forEach(p => pageVisits[p.path] = (pageVisits[p.path] || 0) + 1));
  return Object.entries(pageVisits)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([path, visits]) => ({ path, visits }));
      }
