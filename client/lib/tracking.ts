// src/lib/tracking.ts - HIGH PERFORMANCE TRACKING

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

// MENGGUNAKAN FIREBASE REST API (Sangat stabil & Tanpa Limit MockAPI)
// Anda bisa mengganti URL ini dengan URL Realtime Database Anda sendiri nanti
const API_URL = "https://tracking-pkl-default-rtdb.firebaseio.com/tracking/sessions"; 
const CURRENT_SESSION_KEY = "currentSession";
const LIMIT_RESET = 20000;

function generateSessionId(): string {
  return `sess_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
}

/**
 * Inisialisasi: Melaporkan pengunjung baru ke Cloud
 */
export async function initializeTracking(): Promise<void> {
  const existingSession = localStorage.getItem(CURRENT_SESSION_KEY);
  
  if (!existingSession) {
    const isAdmin = localStorage.getItem("isAdmin") === "true";
    const sessionId = generateSessionId();
    const newSession: VisitorSession = {
      id: sessionId,
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
      // Firebase menggunakan .json di akhir URL REST-nya
      await fetch(`${API_URL}/${sessionId}.json`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSession)
      });
    } catch (e) {
      console.error("Cloud Error: Gagal mencatat visitor.");
    }
  }
}

/**
 * Update Aktivitas: Sinkronisasi Real-time
 */
export async function trackPageView(path: string): Promise<void> {
  const sessionStr = localStorage.getItem(CURRENT_SESSION_KEY);
  if (sessionStr) {
    const session: VisitorSession = JSON.parse(sessionStr);
    session.lastActivity = Date.now();
    session.pages.push({ path, timestamp: Date.now() });
    
    localStorage.setItem(CURRENT_SESSION_KEY, JSON.stringify(session));

    try {
      // Update spesifik ke ID sesi tersebut di Cloud
      await fetch(`${API_URL}/${session.id}.json`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lastActivity: session.lastActivity,
          pages: session.pages
        })
      });
    } catch (e) {
      console.log("Cloud Sync Offline");
    }
  }
}

/**
 * Ambil semua data sesi untuk Admin
 */
export async function getAllSessions(): Promise<VisitorSession[]> {
  try {
    const response = await fetch(`${API_URL}.json`);
    const data = await response.json();
    if (!data) return [];
    // Firebase mengembalikan objek, kita ubah jadi array
    return Object.values(data) as VisitorSession[];
  } catch (error) {
    return [];
  }
}

/**
 * Hitung Statistik + Modulo 20.000
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

  // LOGIKA RESET 20.000 (Angka kembali ke nol setelah mencapai limit)
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
