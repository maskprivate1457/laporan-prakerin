export interface VisitorSession {
  id: string;
  userType: "admin" | "visitor";
  startTime: number;
  lastActivity: number;
  pages: { path: string; timestamp: number; }[];
  device: { userAgent: string; language: string; };
}

// Menggunakan JSONBin.io (Public/Anonymous mode - Tanpa Login)
// Catatan: Data ini tersimpan di server awan secara publik.
const BIN_ID = "659d4c18dc746540188fc873"; // ID Contoh publik
const API_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;
const MASTER_KEY = "$2a$10$URGetmNRweKXZKpp4EGZneRhop6pLwJdaaDG55VGx49eDEtne.JNy"; // Jika butuh privasi, gunakan API Key. Jika tidak, pakai endpoint publik.

const CURRENT_SESSION_KEY = "currentSession";
const LIMIT_RESET = 20000;

function generateSessionId(): string {
  return `sess_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Inisialisasi: Melaporkan pengunjung baru
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
      device: { userAgent: navigator.userAgent, language: navigator.language },
    };
    
    localStorage.setItem(CURRENT_SESSION_KEY, JSON.stringify(newSession));

    // Update data ke Cloud (Membaca dulu, lalu menambah, lalu update)
    await syncToCloud(newSession);
  }
}

async function syncToCloud(session: VisitorSession) {
  try {
    // 1. Ambil data lama
    const res = await fetch(API_URL + "/latest");
    const currentData = await res.json();
    let allSessions = Array.isArray(currentData.record) ? currentData.record : [];

    // 2. Tambah atau Update sesi ini
    const index = allSessions.findIndex((s: any) => s.id === session.id);
    if (index > -1) {
      allSessions[index] = session;
    } else {
      allSessions.push(session);
    }

    // 3. Simpan kembali (PUT)
    await fetch(API_URL, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(allSessions)
    });
  } catch (e) {
    console.error("Cloud Sync Error");
  }
}

export async function trackPageView(path: string): Promise<void> {
  const sessionStr = localStorage.getItem(CURRENT_SESSION_KEY);
  if (sessionStr) {
    const session: VisitorSession = JSON.parse(sessionStr);
    session.lastActivity = Date.now();
    session.pages.push({ path, timestamp: Date.now() });
    localStorage.setItem(CURRENT_SESSION_KEY, JSON.stringify(session));
    await syncToCloud(session);
  }
}

export async function getAllSessions(): Promise<VisitorSession[]> {
  try {
    const res = await fetch(API_URL + "/latest");
    const data = await res.json();
    return Array.isArray(data.record) ? data.record : [];
  } catch (e) { return []; }
}

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
  return Object.entries(counts).sort((a,b) => b[1]-a[1]).slice(0,5).map(([path, visits]) => ({path, visits}));
    }
