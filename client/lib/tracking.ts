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

// URL API yang telah diintegrasikan (Menggunakan resource /sessions)
const BASE_URL = "https://695e59cf2556fd22f6782fac.mockapi.io/api/v1";
const API_URL = `${BASE_URL}/sessions`; 
const CURRENT_SESSION_KEY = "currentSession";
const LIMIT_RESET = 20000;

function generateSessionId(): string {
  return `sess_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
}

/**
 * Inisialisasi: Melaporkan pengunjung baru ke MockAPI
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

    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSession)
      });
    } catch (e) {
      console.error("Gagal inisialisasi API. Pastikan resource 'sessions' sudah dibuat di MockAPI.");
    }
  }
}

/**
 * Update Aktivitas: Sinkronisasi setiap pindah halaman
 */
export async function trackPageView(path: string): Promise<void> {
  const sessionStr = localStorage.getItem(CURRENT_SESSION_KEY);
  if (sessionStr) {
    const session: VisitorSession = JSON.parse(sessionStr);
    session.lastActivity = Date.now();
    session.pages.push({ path, timestamp: Date.now() });
    
    localStorage.setItem(CURRENT_SESSION_KEY, JSON.stringify(session));

    try {
      // MockAPI menggunakan ID untuk update (PUT)
      await fetch(`${API_URL}/${session.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(session)
      });
    } catch (e) {
      // Jika PUT gagal (karena ID tidak ditemukan di server), coba POST ulang
      try {
        await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(session)
        });
      } catch (err) { console.log("API Sync Error"); }
    }
  }
}

/**
 * Ambil semua data dari MockAPI
 */
export async function getAllSessions(): Promise<VisitorSession[]> {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) return [];
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    return [];
  }
}

/**
 * Hitung Statistik dengan Fungsi MODULO 20.000
 */
export async function getSessionStats() {
  const allSessions = await getAllSessions();
  
  const raw = {
    totalSessions: allSessions.length,
    adminSessions: allSessions.filter(s => s.userType === "admin").length,
    visitorSessions: allSessions.filter(s => s.userType === "visitor").length,
    totalPageViews: allSessions.reduce((sum, s) => sum + s.pages.length, 0),
    avgDuration: allSessions.length > 0 
      ? Math.round(allSessions.reduce((sum, s) => sum + (s.lastActivity - s.startTime), 0) / allSessions.length) 
      : 0,
    mostVisited: getMostVisited(allSessions)
  };

  // LOGIKA RESET OTOMATIS 20.000
  return {
    ...raw,
    totalSessions: raw.totalSessions % LIMIT_RESET,
    adminSessions: raw.adminSessions % LIMIT_RESET,
    visitorSessions: raw.visitorSessions % LIMIT_RESET,
    totalPageViews: raw.totalPageViews % LIMIT_RESET,
  };
}

function getMostVisited(sessions: VisitorSession[]) {
  const counts: { [key: string]: number } = {};
  sessions.forEach(s => s.pages.forEach(p => counts[p.path] = (counts[p.path] || 0) + 1));
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([path, visits]) => ({ path, visits }));
}
